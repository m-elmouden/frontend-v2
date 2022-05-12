import {Component, OnInit} from '@angular/core';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
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
  selector: 'app-etat-facture-list-admin',
  templateUrl: './etat-facture-list-admin.component.html',
  styleUrls: ['./etat-facture-list-admin.component.css']
})
export class EtatFactureListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatFacture';


    constructor(private datePipe: DatePipe, private etatFactureService: EtatFactureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatFactures();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatFactures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatFacture', 'list');
        isPermistted ? this.etatFactureService.findAll().subscribe(etatFactures => this.etatFactures = etatFactures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatFactureService.findByCriteria(this.searchEtatFacture).subscribe(etatFactures=>{
            
            this.etatFactures = etatFactures;
           // this.searchEtatFacture = new EtatFactureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatFacture(etatFacture:EtatFactureVo){
        const isPermistted = await this.roleService.isPermitted('EtatFacture', 'edit');
         if(isPermistted){
          this.etatFactureService.findByIdWithAssociatedList(etatFacture).subscribe(res => {
           this.selectedEtatFacture = res;
            this.editEtatFactureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatFacture(etatFacture:EtatFactureVo){
        const isPermistted = await this.roleService.isPermitted('EtatFacture', 'view');
        if(isPermistted){
           this.etatFactureService.findByIdWithAssociatedList(etatFacture).subscribe(res => {
           this.selectedEtatFacture = res;
            this.viewEtatFactureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatFacture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatFacture = new EtatFactureVo();
            this.createEtatFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatFacture(etatFacture:EtatFactureVo){
       const isPermistted = await this.roleService.isPermitted('EtatFacture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat facture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatFactureService.delete(etatFacture).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatFactures.indexOf(etatFacture);
                          position > -1 ? this.etatFactures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat facture Supprimé',
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


public async duplicateEtatFacture(etatFacture: EtatFactureVo) {

     this.etatFactureService.findByIdWithAssociatedList(etatFacture).subscribe(
	 res => {
	       this.initDuplicateEtatFacture(res);
	       this.selectedEtatFacture = res;
	       this.selectedEtatFacture.id = null;
            this.createEtatFactureDialog = true;

});

	}

	initDuplicateEtatFacture(res: EtatFactureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatFactures.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatFacture.libelle ? this.searchEtatFacture.libelle : environment.emptyForExport ,
            'Code Min': this.searchEtatFacture.codeMin ? this.searchEtatFacture.codeMin : environment.emptyForExport ,
            'Code Max': this.searchEtatFacture.codeMax ? this.searchEtatFacture.codeMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatFactures(): Array<EtatFactureVo> {
           return this.etatFactureService.etatFactures;
       }
    set etatFactures(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactures = value;
       }

    get etatFactureSelections(): Array<EtatFactureVo> {
           return this.etatFactureService.etatFactureSelections;
       }
    set etatFactureSelections(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactureSelections = value;
       }
   
     


    get selectedEtatFacture():EtatFactureVo {
           return this.etatFactureService.selectedEtatFacture;
       }
    set selectedEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.selectedEtatFacture = value;
       }
    
    get createEtatFactureDialog():boolean {
           return this.etatFactureService.createEtatFactureDialog;
       }
    set createEtatFactureDialog(value: boolean) {
        this.etatFactureService.createEtatFactureDialog= value;
       }
    
    get editEtatFactureDialog():boolean {
           return this.etatFactureService.editEtatFactureDialog;
       }
    set editEtatFactureDialog(value: boolean) {
        this.etatFactureService.editEtatFactureDialog= value;
       }
    get viewEtatFactureDialog():boolean {
           return this.etatFactureService.viewEtatFactureDialog;
       }
    set viewEtatFactureDialog(value: boolean) {
        this.etatFactureService.viewEtatFactureDialog = value;
       }
       
     get searchEtatFacture(): EtatFactureVo {
        return this.etatFactureService.searchEtatFacture;
       }
    set searchEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.searchEtatFacture = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
