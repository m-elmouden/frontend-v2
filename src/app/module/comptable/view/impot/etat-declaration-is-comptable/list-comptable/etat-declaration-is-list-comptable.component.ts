import {Component, OnInit} from '@angular/core';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
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
  selector: 'app-etat-declaration-is-list-comptable',
  templateUrl: './etat-declaration-is-list-comptable.component.html',
  styleUrls: ['./etat-declaration-is-list-comptable.component.css']
})
export class EtatDeclarationIsListComptableComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatDeclarationIs';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private etatDeclarationIsService: EtatDeclarationIsService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatDeclarationIss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtatDeclarationIss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'list');
        isPermistted ? this.etatDeclarationIsService.findAll().subscribe(etatDeclarationIss => this.etatDeclarationIss = etatDeclarationIss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatDeclarationIsService.findByCriteria(this.searchEtatDeclarationIs).subscribe(etatDeclarationIss=>{
            
            this.etatDeclarationIss = etatDeclarationIss;
           // this.searchEtatDeclarationIs = new EtatDeclarationIsVo();
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
    
    public async editEtatDeclarationIs(etatDeclarationIs:EtatDeclarationIsVo){
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'edit');
         if(isPermistted){
          this.etatDeclarationIsService.findByIdWithAssociatedList(etatDeclarationIs).subscribe(res => {
           this.selectedEtatDeclarationIs = res;
            this.selectedEtatDeclarationIs.dateArchivage = new Date(etatDeclarationIs.dateArchivage);
            this.selectedEtatDeclarationIs.dateCreation = new Date(etatDeclarationIs.dateCreation);
            this.editEtatDeclarationIsDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatDeclarationIs(etatDeclarationIs:EtatDeclarationIsVo){
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'view');
        if(isPermistted){
           this.etatDeclarationIsService.findByIdWithAssociatedList(etatDeclarationIs).subscribe(res => {
           this.selectedEtatDeclarationIs = res;
            this.selectedEtatDeclarationIs.dateArchivage = new Date(etatDeclarationIs.dateArchivage);
            this.selectedEtatDeclarationIs.dateCreation = new Date(etatDeclarationIs.dateCreation);
            this.viewEtatDeclarationIsDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatDeclarationIs(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();
            this.createEtatDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverEtatDeclarationIs(etatDeclarationIs:EtatDeclarationIsVo){
const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Etat declaration is) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etatDeclarationIsService.archiver(etatDeclarationIs).subscribe(status=>{
const myIndex = this.etatDeclarationIss.indexOf(etatDeclarationIs);
this.etatDeclarationIss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etat declaration is archivé',
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

public async desarchiverEtatDeclarationIs(etatDeclarationIs:EtatDeclarationIsVo){
const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Etat declaration is) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etatDeclarationIsService.desarchiver(etatDeclarationIs).subscribe(status=>{
const myIndex = this.etatDeclarationIss.indexOf(etatDeclarationIs);
this.etatDeclarationIss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etat declaration is désarchivé',
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


    public async deleteEtatDeclarationIs(etatDeclarationIs:EtatDeclarationIsVo){
       const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat declaration is) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatDeclarationIsService.delete(etatDeclarationIs).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatDeclarationIss.indexOf(etatDeclarationIs);
                          position > -1 ? this.etatDeclarationIss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat declaration is Supprimé',
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


public async duplicateEtatDeclarationIs(etatDeclarationIs: EtatDeclarationIsVo) {

     this.etatDeclarationIsService.findByIdWithAssociatedList(etatDeclarationIs).subscribe(
	 res => {
	       this.initDuplicateEtatDeclarationIs(res);
	       this.selectedEtatDeclarationIs = res;
	       this.selectedEtatDeclarationIs.id = null;
            this.createEtatDeclarationIsDialog = true;

});

	}

	initDuplicateEtatDeclarationIs(res: EtatDeclarationIsVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatDeclarationIss.map(e => {
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
            'Reference': this.searchEtatDeclarationIs.reference ? this.searchEtatDeclarationIs.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatDeclarationIs.libelle ? this.searchEtatDeclarationIs.libelle : environment.emptyForExport ,
            'Archive': this.searchEtatDeclarationIs.archive ? (this.searchEtatDeclarationIs.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtatDeclarationIs.dateArchivageMin ? this.datePipe.transform(this.searchEtatDeclarationIs.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtatDeclarationIs.dateArchivageMax ? this.datePipe.transform(this.searchEtatDeclarationIs.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtatDeclarationIs.dateCreationMin ? this.datePipe.transform(this.searchEtatDeclarationIs.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtatDeclarationIs.dateCreationMax ? this.datePipe.transform(this.searchEtatDeclarationIs.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtatDeclarationIs.admin ? (this.searchEtatDeclarationIs.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtatDeclarationIs.visible ? (this.searchEtatDeclarationIs.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtatDeclarationIs.username ? this.searchEtatDeclarationIs.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
           return this.etatDeclarationIsService.etatDeclarationIss;
       }
    set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }

    get etatDeclarationIsSelections(): Array<EtatDeclarationIsVo> {
           return this.etatDeclarationIsService.etatDeclarationIsSelections;
       }
    set etatDeclarationIsSelections(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIsSelections = value;
       }
   
     


    get selectedEtatDeclarationIs():EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
    set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }
    
    get createEtatDeclarationIsDialog():boolean {
           return this.etatDeclarationIsService.createEtatDeclarationIsDialog;
       }
    set createEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.createEtatDeclarationIsDialog= value;
       }
    
    get editEtatDeclarationIsDialog():boolean {
           return this.etatDeclarationIsService.editEtatDeclarationIsDialog;
       }
    set editEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.editEtatDeclarationIsDialog= value;
       }
    get viewEtatDeclarationIsDialog():boolean {
           return this.etatDeclarationIsService.viewEtatDeclarationIsDialog;
       }
    set viewEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.viewEtatDeclarationIsDialog = value;
       }
       
     get searchEtatDeclarationIs(): EtatDeclarationIsVo {
        return this.etatDeclarationIsService.searchEtatDeclarationIs;
       }
    set searchEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.searchEtatDeclarationIs = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
