import {Component, OnInit} from '@angular/core';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etat-declaration-tva-list-chercheur',
  templateUrl: './etat-declaration-tva-list-chercheur.component.html',
  styleUrls: ['./etat-declaration-tva-list-chercheur.component.css']
})
export class EtatDeclarationTvaListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatDeclarationTva';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private etatDeclarationTvaService: EtatDeclarationTvaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatDeclarationTvas();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtatDeclarationTvas(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationTva', 'list');
        isPermistted ? this.etatDeclarationTvaService.findAll().subscribe(etatDeclarationTvas => this.etatDeclarationTvas = etatDeclarationTvas,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatDeclarationTvaService.findByCriteria(this.searchEtatDeclarationTva).subscribe(etatDeclarationTvas=>{
            
            this.etatDeclarationTvas = etatDeclarationTvas;
           // this.searchEtatDeclarationTva = new EtatDeclarationTvaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEtatDeclarationTva(etatDeclarationTva:EtatDeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationTva', 'edit');
         if(isPermistted){
          this.etatDeclarationTvaService.findByIdWithAssociatedList(etatDeclarationTva).subscribe(res => {
           this.selectedEtatDeclarationTva = res;
            this.selectedEtatDeclarationTva.dateArchivage = new Date(etatDeclarationTva.dateArchivage);
            this.selectedEtatDeclarationTva.dateCreation = new Date(etatDeclarationTva.dateCreation);
            this.editEtatDeclarationTvaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatDeclarationTva(etatDeclarationTva:EtatDeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationTva', 'view');
        if(isPermistted){
           this.etatDeclarationTvaService.findByIdWithAssociatedList(etatDeclarationTva).subscribe(res => {
           this.selectedEtatDeclarationTva = res;
            this.selectedEtatDeclarationTva.dateArchivage = new Date(etatDeclarationTva.dateArchivage);
            this.selectedEtatDeclarationTva.dateCreation = new Date(etatDeclarationTva.dateCreation);
            this.viewEtatDeclarationTvaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatDeclarationTva(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();
            this.createEtatDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatDeclarationTva(etatDeclarationTva:EtatDeclarationTvaVo){
       const isPermistted = await this.roleService.isPermitted('EtatDeclarationTva', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat declaration tva) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatDeclarationTvaService.delete(etatDeclarationTva).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatDeclarationTvas.indexOf(etatDeclarationTva);
                          position > -1 ? this.etatDeclarationTvas.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat declaration tva Supprimé',
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


public async duplicateEtatDeclarationTva(etatDeclarationTva: EtatDeclarationTvaVo) {

     this.etatDeclarationTvaService.findByIdWithAssociatedList(etatDeclarationTva).subscribe(
	 res => {
	       this.initDuplicateEtatDeclarationTva(res);
	       this.selectedEtatDeclarationTva = res;
	       this.selectedEtatDeclarationTva.id = null;
            this.createEtatDeclarationTvaDialog = true;

});

	}

	initDuplicateEtatDeclarationTva(res: EtatDeclarationTvaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatDeclarationTvas.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatDeclarationTva.reference ? this.searchEtatDeclarationTva.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatDeclarationTva.libelle ? this.searchEtatDeclarationTva.libelle : environment.emptyForExport ,
            'Archive': this.searchEtatDeclarationTva.archive ? (this.searchEtatDeclarationTva.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtatDeclarationTva.dateArchivageMin ? this.datePipe.transform(this.searchEtatDeclarationTva.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtatDeclarationTva.dateArchivageMax ? this.datePipe.transform(this.searchEtatDeclarationTva.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtatDeclarationTva.dateCreationMin ? this.datePipe.transform(this.searchEtatDeclarationTva.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtatDeclarationTva.dateCreationMax ? this.datePipe.transform(this.searchEtatDeclarationTva.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtatDeclarationTva.admin ? (this.searchEtatDeclarationTva.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtatDeclarationTva.visible ? (this.searchEtatDeclarationTva.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtatDeclarationTva.username ? this.searchEtatDeclarationTva.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
           return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
    set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }

    get etatDeclarationTvaSelections(): Array<EtatDeclarationTvaVo> {
           return this.etatDeclarationTvaService.etatDeclarationTvaSelections;
       }
    set etatDeclarationTvaSelections(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvaSelections = value;
       }
   
     


    get selectedEtatDeclarationTva():EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
    set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }
    
    get createEtatDeclarationTvaDialog():boolean {
           return this.etatDeclarationTvaService.createEtatDeclarationTvaDialog;
       }
    set createEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.createEtatDeclarationTvaDialog= value;
       }
    
    get editEtatDeclarationTvaDialog():boolean {
           return this.etatDeclarationTvaService.editEtatDeclarationTvaDialog;
       }
    set editEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.editEtatDeclarationTvaDialog= value;
       }
    get viewEtatDeclarationTvaDialog():boolean {
           return this.etatDeclarationTvaService.viewEtatDeclarationTvaDialog;
       }
    set viewEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.viewEtatDeclarationTvaDialog = value;
       }
       
     get searchEtatDeclarationTva(): EtatDeclarationTvaVo {
        return this.etatDeclarationTvaService.searchEtatDeclarationTva;
       }
    set searchEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.searchEtatDeclarationTva = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
