import {Component, OnInit} from '@angular/core';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
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
  selector: 'app-etat-demande-list-chercheur',
  templateUrl: './etat-demande-list-chercheur.component.html',
  styleUrls: ['./etat-demande-list-chercheur.component.css']
})
export class EtatDemandeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatDemande';


    constructor(private datePipe: DatePipe, private etatDemandeService: EtatDemandeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatDemandes();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatDemandes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatDemande', 'list');
        isPermistted ? this.etatDemandeService.findAll().subscribe(etatDemandes => this.etatDemandes = etatDemandes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatDemandeService.findByCriteria(this.searchEtatDemande).subscribe(etatDemandes=>{
            
            this.etatDemandes = etatDemandes;
           // this.searchEtatDemande = new EtatDemandeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'couleur', header: 'Couleur'},
        ];
    }
    
    public async editEtatDemande(etatDemande:EtatDemandeVo){
        const isPermistted = await this.roleService.isPermitted('EtatDemande', 'edit');
         if(isPermistted){
          this.etatDemandeService.findByIdWithAssociatedList(etatDemande).subscribe(res => {
           this.selectedEtatDemande = res;
            this.editEtatDemandeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatDemande(etatDemande:EtatDemandeVo){
        const isPermistted = await this.roleService.isPermitted('EtatDemande', 'view');
        if(isPermistted){
           this.etatDemandeService.findByIdWithAssociatedList(etatDemande).subscribe(res => {
           this.selectedEtatDemande = res;
            this.viewEtatDemandeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatDemande(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatDemande = new EtatDemandeVo();
            this.createEtatDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatDemande(etatDemande:EtatDemandeVo){
       const isPermistted = await this.roleService.isPermitted('EtatDemande', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat demande) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatDemandeService.delete(etatDemande).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatDemandes.indexOf(etatDemande);
                          position > -1 ? this.etatDemandes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat demande Supprimé',
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


public async duplicateEtatDemande(etatDemande: EtatDemandeVo) {

     this.etatDemandeService.findByIdWithAssociatedList(etatDemande).subscribe(
	 res => {
	       this.initDuplicateEtatDemande(res);
	       this.selectedEtatDemande = res;
	       this.selectedEtatDemande.id = null;
            this.createEtatDemandeDialog = true;

});

	}

	initDuplicateEtatDemande(res: EtatDemandeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatDemandes.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Couleur': e.couleur ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatDemande.reference ? this.searchEtatDemande.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatDemande.libelle ? this.searchEtatDemande.libelle : environment.emptyForExport ,
            'Couleur': this.searchEtatDemande.couleur ? this.searchEtatDemande.couleur : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatDemandes(): Array<EtatDemandeVo> {
           return this.etatDemandeService.etatDemandes;
       }
    set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }

    get etatDemandeSelections(): Array<EtatDemandeVo> {
           return this.etatDemandeService.etatDemandeSelections;
       }
    set etatDemandeSelections(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandeSelections = value;
       }
   
     


    get selectedEtatDemande():EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
    set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }
    
    get createEtatDemandeDialog():boolean {
           return this.etatDemandeService.createEtatDemandeDialog;
       }
    set createEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.createEtatDemandeDialog= value;
       }
    
    get editEtatDemandeDialog():boolean {
           return this.etatDemandeService.editEtatDemandeDialog;
       }
    set editEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.editEtatDemandeDialog= value;
       }
    get viewEtatDemandeDialog():boolean {
           return this.etatDemandeService.viewEtatDemandeDialog;
       }
    set viewEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.viewEtatDemandeDialog = value;
       }
       
     get searchEtatDemande(): EtatDemandeVo {
        return this.etatDemandeService.searchEtatDemande;
       }
    set searchEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.searchEtatDemande = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
