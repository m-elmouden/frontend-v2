import {Component, OnInit} from '@angular/core';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DemandeService } from '../../../../../../controller/service/Demande.service';

import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-commentaire-list-comptable',
  templateUrl: './commentaire-list-comptable.component.html',
  styleUrls: ['./commentaire-list-comptable.component.css']
})
export class CommentaireListComptableComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Commentaire';
    demandes :Array<DemandeVo>;


    constructor(private datePipe: DatePipe, private commentaireService: CommentaireService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private demandeService: DemandeService
) { }

    ngOnInit(): void {
      this.loadCommentaires();
      this.initExport();
      this.initCol();
      this.loadDemande();
    }
    
    // methods
      public async loadCommentaires(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Commentaire', 'list');
        isPermistted ? this.commentaireService.findAll().subscribe(commentaires => this.commentaires = commentaires,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commentaireService.findByCriteria(this.searchCommentaire).subscribe(commentaires=>{
            
            this.commentaires = commentaires;
           // this.searchCommentaire = new CommentaireVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'dateCommentaire', header: 'Date commentaire'},
                            {field: 'auteur', header: 'Auteur'},
                        {field: 'demande?.reference', header: 'Demande'},
        ];
    }
    
    public async editCommentaire(commentaire:CommentaireVo){
        const isPermistted = await this.roleService.isPermitted('Commentaire', 'edit');
         if(isPermistted){
          this.commentaireService.findByIdWithAssociatedList(commentaire).subscribe(res => {
           this.selectedCommentaire = res;
            this.selectedCommentaire.dateCommentaire = new Date(commentaire.dateCommentaire);
            this.editCommentaireDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommentaire(commentaire:CommentaireVo){
        const isPermistted = await this.roleService.isPermitted('Commentaire', 'view');
        if(isPermistted){
           this.commentaireService.findByIdWithAssociatedList(commentaire).subscribe(res => {
           this.selectedCommentaire = res;
            this.selectedCommentaire.dateCommentaire = new Date(commentaire.dateCommentaire);
            this.viewCommentaireDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommentaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommentaire = new CommentaireVo();
            this.createCommentaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommentaire(commentaire:CommentaireVo){
       const isPermistted = await this.roleService.isPermitted('Commentaire', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commentaire) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commentaireService.delete(commentaire).subscribe(status=>{
                          if(status > 0){
                          const position = this.commentaires.indexOf(commentaire);
                          position > -1 ? this.commentaires.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commentaire Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadDemande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Commentaire', 'list');
    isPermistted ? this.demandeService.findAll().subscribe(demandes => this.demandes = demandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommentaire(commentaire: CommentaireVo) {

     this.commentaireService.findByIdWithAssociatedList(commentaire).subscribe(
	 res => {
	       this.initDuplicateCommentaire(res);
	       this.selectedCommentaire = res;
	       this.selectedCommentaire.id = null;
            this.createCommentaireDialog = true;

});

	}

	initDuplicateCommentaire(res: CommentaireVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.commentaires.map(e => {
    return {
                    'Description': e.description ,
                    'Date commentaire': this.datePipe.transform(e.dateCommentaire , 'dd-MM-yyyy'),
                    'Auteur': e.auteur ,
            'Demande': e.demandeVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Description': this.searchCommentaire.description ? this.searchCommentaire.description : environment.emptyForExport ,
            'Date commentaire Min': this.searchCommentaire.dateCommentaireMin ? this.datePipe.transform(this.searchCommentaire.dateCommentaireMin , this.dateFormat) : environment.emptyForExport ,
            'Date commentaire Max': this.searchCommentaire.dateCommentaireMax ? this.datePipe.transform(this.searchCommentaire.dateCommentaireMax , this.dateFormat) : environment.emptyForExport ,
            'Auteur': this.searchCommentaire.auteur ? this.searchCommentaire.auteur : environment.emptyForExport ,
        'Demande': this.searchCommentaire.demandeVo?.reference ? this.searchCommentaire.demandeVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get commentaires(): Array<CommentaireVo> {
           return this.commentaireService.commentaires;
       }
    set commentaires(value: Array<CommentaireVo>) {
        this.commentaireService.commentaires = value;
       }

    get commentaireSelections(): Array<CommentaireVo> {
           return this.commentaireService.commentaireSelections;
       }
    set commentaireSelections(value: Array<CommentaireVo>) {
        this.commentaireService.commentaireSelections = value;
       }
   
     


    get selectedCommentaire():CommentaireVo {
           return this.commentaireService.selectedCommentaire;
       }
    set selectedCommentaire(value: CommentaireVo) {
        this.commentaireService.selectedCommentaire = value;
       }
    
    get createCommentaireDialog():boolean {
           return this.commentaireService.createCommentaireDialog;
       }
    set createCommentaireDialog(value: boolean) {
        this.commentaireService.createCommentaireDialog= value;
       }
    
    get editCommentaireDialog():boolean {
           return this.commentaireService.editCommentaireDialog;
       }
    set editCommentaireDialog(value: boolean) {
        this.commentaireService.editCommentaireDialog= value;
       }
    get viewCommentaireDialog():boolean {
           return this.commentaireService.viewCommentaireDialog;
       }
    set viewCommentaireDialog(value: boolean) {
        this.commentaireService.viewCommentaireDialog = value;
       }
       
     get searchCommentaire(): CommentaireVo {
        return this.commentaireService.searchCommentaire;
       }
    set searchCommentaire(value: CommentaireVo) {
        this.commentaireService.searchCommentaire = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
