import {Component, OnInit} from '@angular/core';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-classe-comptable-list-admin',
  templateUrl: './classe-comptable-list-admin.component.html',
  styleUrls: ['./classe-comptable-list-admin.component.css']
})
export class ClasseComptableListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ClasseComptable';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private classeComptableService: ClasseComptableService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadClasseComptables();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadClasseComptables(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'list');
        isPermistted ? this.classeComptableService.findAll().subscribe(classeComptables => this.classeComptables = classeComptables,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.classeComptableService.findByCriteria(this.searchClasseComptable).subscribe(classeComptables=>{
            
            this.classeComptables = classeComptables;
           // this.searchClasseComptable = new ClasseComptableVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'numero', header: 'Numero'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editClasseComptable(classeComptable:ClasseComptableVo){
        const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'edit');
         if(isPermistted){
          this.classeComptableService.findByIdWithAssociatedList(classeComptable).subscribe(res => {
           this.selectedClasseComptable = res;
            this.selectedClasseComptable.dateArchivage = new Date(classeComptable.dateArchivage);
            this.selectedClasseComptable.dateCreation = new Date(classeComptable.dateCreation);
            this.editClasseComptableDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewClasseComptable(classeComptable:ClasseComptableVo){
        const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'view');
        if(isPermistted){
           this.classeComptableService.findByIdWithAssociatedList(classeComptable).subscribe(res => {
           this.selectedClasseComptable = res;
            this.selectedClasseComptable.dateArchivage = new Date(classeComptable.dateArchivage);
            this.selectedClasseComptable.dateCreation = new Date(classeComptable.dateCreation);
            this.viewClasseComptableDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateClasseComptable(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedClasseComptable = new ClasseComptableVo();
            this.createClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverClasseComptable(classeComptable:ClasseComptableVo){
const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Classe comptable) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.classeComptableService.archiver(classeComptable).subscribe(status=>{
const myIndex = this.classeComptables.indexOf(classeComptable);
this.classeComptables[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Classe comptable archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverClasseComptable(classeComptable:ClasseComptableVo){
const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Classe comptable) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.classeComptableService.desarchiver(classeComptable).subscribe(status=>{
const myIndex = this.classeComptables.indexOf(classeComptable);
this.classeComptables[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Classe comptable désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteClasseComptable(classeComptable:ClasseComptableVo){
       const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Classe comptable) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.classeComptableService.delete(classeComptable).subscribe(status=>{
                          if(status > 0){
                          const position = this.classeComptables.indexOf(classeComptable);
                          position > -1 ? this.classeComptables.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Classe comptable Supprimé',
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


public async duplicateClasseComptable(classeComptable: ClasseComptableVo) {

     this.classeComptableService.findByIdWithAssociatedList(classeComptable).subscribe(
	 res => {
	       this.initDuplicateClasseComptable(res);
	       this.selectedClasseComptable = res;
	       this.selectedClasseComptable.id = null;
            this.createClasseComptableDialog = true;

});

	}

	initDuplicateClasseComptable(res: ClasseComptableVo) {
        if (res.sousClasseComptablesVo != null) {
             res.sousClasseComptablesVo.forEach(d => { d.classeComptableVo = null; d.id = null; });
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
    this.exportData = this.classeComptables.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Numero': e.numero ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchClasseComptable.libelle ? this.searchClasseComptable.libelle : environment.emptyForExport ,
            'Numero Min': this.searchClasseComptable.numeroMin ? this.searchClasseComptable.numeroMin : environment.emptyForExport ,
            'Numero Max': this.searchClasseComptable.numeroMax ? this.searchClasseComptable.numeroMax : environment.emptyForExport ,
            'Archive': this.searchClasseComptable.archive ? (this.searchClasseComptable.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchClasseComptable.dateArchivageMin ? this.datePipe.transform(this.searchClasseComptable.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchClasseComptable.dateArchivageMax ? this.datePipe.transform(this.searchClasseComptable.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchClasseComptable.dateCreationMin ? this.datePipe.transform(this.searchClasseComptable.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchClasseComptable.dateCreationMax ? this.datePipe.transform(this.searchClasseComptable.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchClasseComptable.admin ? (this.searchClasseComptable.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchClasseComptable.visible ? (this.searchClasseComptable.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchClasseComptable.username ? this.searchClasseComptable.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get classeComptables(): Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptables;
       }
    set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }

    get classeComptableSelections(): Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptableSelections;
       }
    set classeComptableSelections(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptableSelections = value;
       }
   
     


    get selectedClasseComptable():ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
    set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }
    
    get createClasseComptableDialog():boolean {
           return this.classeComptableService.createClasseComptableDialog;
       }
    set createClasseComptableDialog(value: boolean) {
        this.classeComptableService.createClasseComptableDialog= value;
       }
    
    get editClasseComptableDialog():boolean {
           return this.classeComptableService.editClasseComptableDialog;
       }
    set editClasseComptableDialog(value: boolean) {
        this.classeComptableService.editClasseComptableDialog= value;
       }
    get viewClasseComptableDialog():boolean {
           return this.classeComptableService.viewClasseComptableDialog;
       }
    set viewClasseComptableDialog(value: boolean) {
        this.classeComptableService.viewClasseComptableDialog = value;
       }
       
     get searchClasseComptable(): ClasseComptableVo {
        return this.classeComptableService.searchClasseComptable;
       }
    set searchClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.searchClasseComptable = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
