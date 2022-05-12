import {Component, OnInit} from '@angular/core';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';
import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ClasseComptableService } from '../../../../../../controller/service/ClasseComptable.service';

import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-sous-classe-comptable-list-admin',
  templateUrl: './sous-classe-comptable-list-admin.component.html',
  styleUrls: ['./sous-classe-comptable-list-admin.component.css']
})
export class SousClasseComptableListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'SousClasseComptable';
    classeComptables :Array<ClasseComptableVo>;


    constructor(private datePipe: DatePipe, private sousClasseComptableService: SousClasseComptableService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private classeComptableService: ClasseComptableService
) { }

    ngOnInit(): void {
      this.loadSousClasseComptables();
      this.initExport();
      this.initCol();
      this.loadClasseComptable();
    }
    
    // methods
      public async loadSousClasseComptables(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'list');
        isPermistted ? this.sousClasseComptableService.findAll().subscribe(sousClasseComptables => this.sousClasseComptables = sousClasseComptables,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.sousClasseComptableService.findByCriteria(this.searchSousClasseComptable).subscribe(sousClasseComptables=>{
            
            this.sousClasseComptables = sousClasseComptables;
           // this.searchSousClasseComptable = new SousClasseComptableVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numero', header: 'Numero'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'classeComptable?.libelle', header: 'Classe comptable'},
        ];
    }
    
    public async editSousClasseComptable(sousClasseComptable:SousClasseComptableVo){
        const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'edit');
         if(isPermistted){
          this.sousClasseComptableService.findByIdWithAssociatedList(sousClasseComptable).subscribe(res => {
           this.selectedSousClasseComptable = res;
            this.editSousClasseComptableDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewSousClasseComptable(sousClasseComptable:SousClasseComptableVo){
        const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'view');
        if(isPermistted){
           this.sousClasseComptableService.findByIdWithAssociatedList(sousClasseComptable).subscribe(res => {
           this.selectedSousClasseComptable = res;
            this.viewSousClasseComptableDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateSousClasseComptable(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedSousClasseComptable = new SousClasseComptableVo();
            this.createSousClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteSousClasseComptable(sousClasseComptable:SousClasseComptableVo){
       const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Sous classe comptable) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.sousClasseComptableService.delete(sousClasseComptable).subscribe(status=>{
                          if(status > 0){
                          const position = this.sousClasseComptables.indexOf(sousClasseComptable);
                          position > -1 ? this.sousClasseComptables.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Sous classe comptable Supprimé',
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

public async loadClasseComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'list');
    isPermistted ? this.classeComptableService.findAll().subscribe(classeComptables => this.classeComptables = classeComptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateSousClasseComptable(sousClasseComptable: SousClasseComptableVo) {

     this.sousClasseComptableService.findByIdWithAssociatedList(sousClasseComptable).subscribe(
	 res => {
	       this.initDuplicateSousClasseComptable(res);
	       this.selectedSousClasseComptable = res;
	       this.selectedSousClasseComptable.id = null;
            this.createSousClasseComptableDialog = true;

});

	}

	initDuplicateSousClasseComptable(res: SousClasseComptableVo) {
        if (res.compteComptablesVo != null) {
             res.compteComptablesVo.forEach(d => { d.sousClasseComptableVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.sousClasseComptables.map(e => {
    return {
                    'Numero': e.numero ,
                    'Libelle': e.libelle ,
            'Classe comptable': e.classeComptableVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Numero Min': this.searchSousClasseComptable.numeroMin ? this.searchSousClasseComptable.numeroMin : environment.emptyForExport ,
            'Numero Max': this.searchSousClasseComptable.numeroMax ? this.searchSousClasseComptable.numeroMax : environment.emptyForExport ,
            'Libelle': this.searchSousClasseComptable.libelle ? this.searchSousClasseComptable.libelle : environment.emptyForExport ,
        'Classe comptable': this.searchSousClasseComptable.classeComptableVo?.libelle ? this.searchSousClasseComptable.classeComptableVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get sousClasseComptables(): Array<SousClasseComptableVo> {
           return this.sousClasseComptableService.sousClasseComptables;
       }
    set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }

    get sousClasseComptableSelections(): Array<SousClasseComptableVo> {
           return this.sousClasseComptableService.sousClasseComptableSelections;
       }
    set sousClasseComptableSelections(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptableSelections = value;
       }
   
     


    get selectedSousClasseComptable():SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
    set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }
    
    get createSousClasseComptableDialog():boolean {
           return this.sousClasseComptableService.createSousClasseComptableDialog;
       }
    set createSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.createSousClasseComptableDialog= value;
       }
    
    get editSousClasseComptableDialog():boolean {
           return this.sousClasseComptableService.editSousClasseComptableDialog;
       }
    set editSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.editSousClasseComptableDialog= value;
       }
    get viewSousClasseComptableDialog():boolean {
           return this.sousClasseComptableService.viewSousClasseComptableDialog;
       }
    set viewSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.viewSousClasseComptableDialog = value;
       }
       
     get searchSousClasseComptable(): SousClasseComptableVo {
        return this.sousClasseComptableService.searchSousClasseComptable;
       }
    set searchSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.searchSousClasseComptable = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
