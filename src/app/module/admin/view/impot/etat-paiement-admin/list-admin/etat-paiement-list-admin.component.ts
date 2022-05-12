import {Component, OnInit} from '@angular/core';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
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
  selector: 'app-etat-paiement-list-admin',
  templateUrl: './etat-paiement-list-admin.component.html',
  styleUrls: ['./etat-paiement-list-admin.component.css']
})
export class EtatPaiementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatPaiement';


    constructor(private datePipe: DatePipe, private etatPaiementService: EtatPaiementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatPaiements();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatPaiements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatPaiement', 'list');
        isPermistted ? this.etatPaiementService.findAll().subscribe(etatPaiements => this.etatPaiements = etatPaiements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatPaiementService.findByCriteria(this.searchEtatPaiement).subscribe(etatPaiements=>{
            
            this.etatPaiements = etatPaiements;
           // this.searchEtatPaiement = new EtatPaiementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatPaiement(etatPaiement:EtatPaiementVo){
        const isPermistted = await this.roleService.isPermitted('EtatPaiement', 'edit');
         if(isPermistted){
          this.etatPaiementService.findByIdWithAssociatedList(etatPaiement).subscribe(res => {
           this.selectedEtatPaiement = res;
            this.editEtatPaiementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatPaiement(etatPaiement:EtatPaiementVo){
        const isPermistted = await this.roleService.isPermitted('EtatPaiement', 'view');
        if(isPermistted){
           this.etatPaiementService.findByIdWithAssociatedList(etatPaiement).subscribe(res => {
           this.selectedEtatPaiement = res;
            this.viewEtatPaiementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatPaiement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatPaiement = new EtatPaiementVo();
            this.createEtatPaiementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatPaiement(etatPaiement:EtatPaiementVo){
       const isPermistted = await this.roleService.isPermitted('EtatPaiement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat paiement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatPaiementService.delete(etatPaiement).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatPaiements.indexOf(etatPaiement);
                          position > -1 ? this.etatPaiements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat paiement Supprimé',
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


public async duplicateEtatPaiement(etatPaiement: EtatPaiementVo) {

     this.etatPaiementService.findByIdWithAssociatedList(etatPaiement).subscribe(
	 res => {
	       this.initDuplicateEtatPaiement(res);
	       this.selectedEtatPaiement = res;
	       this.selectedEtatPaiement.id = null;
            this.createEtatPaiementDialog = true;

});

	}

	initDuplicateEtatPaiement(res: EtatPaiementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatPaiements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatPaiement.libelle ? this.searchEtatPaiement.libelle : environment.emptyForExport ,
            'Code Min': this.searchEtatPaiement.codeMin ? this.searchEtatPaiement.codeMin : environment.emptyForExport ,
            'Code Max': this.searchEtatPaiement.codeMax ? this.searchEtatPaiement.codeMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatPaiements(): Array<EtatPaiementVo> {
           return this.etatPaiementService.etatPaiements;
       }
    set etatPaiements(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiements = value;
       }

    get etatPaiementSelections(): Array<EtatPaiementVo> {
           return this.etatPaiementService.etatPaiementSelections;
       }
    set etatPaiementSelections(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiementSelections = value;
       }
   
     


    get selectedEtatPaiement():EtatPaiementVo {
           return this.etatPaiementService.selectedEtatPaiement;
       }
    set selectedEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.selectedEtatPaiement = value;
       }
    
    get createEtatPaiementDialog():boolean {
           return this.etatPaiementService.createEtatPaiementDialog;
       }
    set createEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.createEtatPaiementDialog= value;
       }
    
    get editEtatPaiementDialog():boolean {
           return this.etatPaiementService.editEtatPaiementDialog;
       }
    set editEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.editEtatPaiementDialog= value;
       }
    get viewEtatPaiementDialog():boolean {
           return this.etatPaiementService.viewEtatPaiementDialog;
       }
    set viewEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.viewEtatPaiementDialog = value;
       }
       
     get searchEtatPaiement(): EtatPaiementVo {
        return this.etatPaiementService.searchEtatPaiement;
       }
    set searchEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.searchEtatPaiement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
