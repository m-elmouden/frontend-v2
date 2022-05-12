import {Component, OnInit} from '@angular/core';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SousClasseComptableService } from '../../../../../../controller/service/SousClasseComptable.service';

import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-compte-comptable-list-admin',
  templateUrl: './compte-comptable-list-admin.component.html',
  styleUrls: ['./compte-comptable-list-admin.component.css']
})
export class CompteComptableListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CompteComptable';
    sousClasseComptables :Array<SousClasseComptableVo>;


    constructor(private datePipe: DatePipe, private compteComptableService: CompteComptableService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private sousClasseComptableService: SousClasseComptableService
) { }

    ngOnInit(): void {
      this.loadCompteComptables();
      this.initExport();
      this.initCol();
      this.loadSousClasseComptable();
    }
    
    // methods
      public async loadCompteComptables(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CompteComptable', 'list');
        isPermistted ? this.compteComptableService.findAll().subscribe(compteComptables => this.compteComptables = compteComptables,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.compteComptableService.findByCriteria(this.searchCompteComptable).subscribe(compteComptables=>{
            
            this.compteComptables = compteComptables;
           // this.searchCompteComptable = new CompteComptableVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'numero', header: 'Numero'},
                        {field: 'sousClasseComptable?.libelle', header: 'Sous classe comptable'},
        ];
    }
    
    public async editCompteComptable(compteComptable:CompteComptableVo){
        const isPermistted = await this.roleService.isPermitted('CompteComptable', 'edit');
         if(isPermistted){
          this.compteComptableService.findByIdWithAssociatedList(compteComptable).subscribe(res => {
           this.selectedCompteComptable = res;
            this.editCompteComptableDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCompteComptable(compteComptable:CompteComptableVo){
        const isPermistted = await this.roleService.isPermitted('CompteComptable', 'view');
        if(isPermistted){
           this.compteComptableService.findByIdWithAssociatedList(compteComptable).subscribe(res => {
           this.selectedCompteComptable = res;
            this.viewCompteComptableDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCompteComptable(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCompteComptable = new CompteComptableVo();
            this.createCompteComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCompteComptable(compteComptable:CompteComptableVo){
       const isPermistted = await this.roleService.isPermitted('CompteComptable', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Compte comptable) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.compteComptableService.delete(compteComptable).subscribe(status=>{
                          if(status > 0){
                          const position = this.compteComptables.indexOf(compteComptable);
                          position > -1 ? this.compteComptables.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Compte comptable Supprimé',
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

public async loadSousClasseComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CompteComptable', 'list');
    isPermistted ? this.sousClasseComptableService.findAll().subscribe(sousClasseComptables => this.sousClasseComptables = sousClasseComptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCompteComptable(compteComptable: CompteComptableVo) {

     this.compteComptableService.findByIdWithAssociatedList(compteComptable).subscribe(
	 res => {
	       this.initDuplicateCompteComptable(res);
	       this.selectedCompteComptable = res;
	       this.selectedCompteComptable.id = null;
            this.createCompteComptableDialog = true;

});

	}

	initDuplicateCompteComptable(res: CompteComptableVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.compteComptables.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Numero': e.numero ,
            'Sous classe comptable': e.sousClasseComptableVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchCompteComptable.libelle ? this.searchCompteComptable.libelle : environment.emptyForExport ,
            'Numero Min': this.searchCompteComptable.numeroMin ? this.searchCompteComptable.numeroMin : environment.emptyForExport ,
            'Numero Max': this.searchCompteComptable.numeroMax ? this.searchCompteComptable.numeroMax : environment.emptyForExport ,
        'Sous classe comptable': this.searchCompteComptable.sousClasseComptableVo?.libelle ? this.searchCompteComptable.sousClasseComptableVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get compteComptables(): Array<CompteComptableVo> {
           return this.compteComptableService.compteComptables;
       }
    set compteComptables(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptables = value;
       }

    get compteComptableSelections(): Array<CompteComptableVo> {
           return this.compteComptableService.compteComptableSelections;
       }
    set compteComptableSelections(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptableSelections = value;
       }
   
     


    get selectedCompteComptable():CompteComptableVo {
           return this.compteComptableService.selectedCompteComptable;
       }
    set selectedCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.selectedCompteComptable = value;
       }
    
    get createCompteComptableDialog():boolean {
           return this.compteComptableService.createCompteComptableDialog;
       }
    set createCompteComptableDialog(value: boolean) {
        this.compteComptableService.createCompteComptableDialog= value;
       }
    
    get editCompteComptableDialog():boolean {
           return this.compteComptableService.editCompteComptableDialog;
       }
    set editCompteComptableDialog(value: boolean) {
        this.compteComptableService.editCompteComptableDialog= value;
       }
    get viewCompteComptableDialog():boolean {
           return this.compteComptableService.viewCompteComptableDialog;
       }
    set viewCompteComptableDialog(value: boolean) {
        this.compteComptableService.viewCompteComptableDialog = value;
       }
       
     get searchCompteComptable(): CompteComptableVo {
        return this.compteComptableService.searchCompteComptable;
       }
    set searchCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.searchCompteComptable = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
