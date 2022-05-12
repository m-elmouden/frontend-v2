import {Component, OnInit} from '@angular/core';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
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
  selector: 'app-etat-declaration-ir-list-admin',
  templateUrl: './etat-declaration-ir-list-admin.component.html',
  styleUrls: ['./etat-declaration-ir-list-admin.component.css']
})
export class EtatDeclarationIrListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatDeclarationIr';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private etatDeclarationIrService: EtatDeclarationIrService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatDeclarationIrs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtatDeclarationIrs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'list');
        isPermistted ? this.etatDeclarationIrService.findAll().subscribe(etatDeclarationIrs => this.etatDeclarationIrs = etatDeclarationIrs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatDeclarationIrService.findByCriteria(this.searchEtatDeclarationIr).subscribe(etatDeclarationIrs=>{
            
            this.etatDeclarationIrs = etatDeclarationIrs;
           // this.searchEtatDeclarationIr = new EtatDeclarationIrVo();
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
    
    public async editEtatDeclarationIr(etatDeclarationIr:EtatDeclarationIrVo){
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'edit');
         if(isPermistted){
          this.etatDeclarationIrService.findByIdWithAssociatedList(etatDeclarationIr).subscribe(res => {
           this.selectedEtatDeclarationIr = res;
            this.selectedEtatDeclarationIr.dateArchivage = new Date(etatDeclarationIr.dateArchivage);
            this.selectedEtatDeclarationIr.dateCreation = new Date(etatDeclarationIr.dateCreation);
            this.editEtatDeclarationIrDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatDeclarationIr(etatDeclarationIr:EtatDeclarationIrVo){
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'view');
        if(isPermistted){
           this.etatDeclarationIrService.findByIdWithAssociatedList(etatDeclarationIr).subscribe(res => {
           this.selectedEtatDeclarationIr = res;
            this.selectedEtatDeclarationIr.dateArchivage = new Date(etatDeclarationIr.dateArchivage);
            this.selectedEtatDeclarationIr.dateCreation = new Date(etatDeclarationIr.dateCreation);
            this.viewEtatDeclarationIrDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatDeclarationIr(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();
            this.createEtatDeclarationIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverEtatDeclarationIr(etatDeclarationIr:EtatDeclarationIrVo){
const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Etat declaration ir) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etatDeclarationIrService.archiver(etatDeclarationIr).subscribe(status=>{
const myIndex = this.etatDeclarationIrs.indexOf(etatDeclarationIr);
this.etatDeclarationIrs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etat declaration ir archivé',
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

public async desarchiverEtatDeclarationIr(etatDeclarationIr:EtatDeclarationIrVo){
const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Etat declaration ir) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etatDeclarationIrService.desarchiver(etatDeclarationIr).subscribe(status=>{
const myIndex = this.etatDeclarationIrs.indexOf(etatDeclarationIr);
this.etatDeclarationIrs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etat declaration ir désarchivé',
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


    public async deleteEtatDeclarationIr(etatDeclarationIr:EtatDeclarationIrVo){
       const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat declaration ir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatDeclarationIrService.delete(etatDeclarationIr).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatDeclarationIrs.indexOf(etatDeclarationIr);
                          position > -1 ? this.etatDeclarationIrs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat declaration ir Supprimé',
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


public async duplicateEtatDeclarationIr(etatDeclarationIr: EtatDeclarationIrVo) {

     this.etatDeclarationIrService.findByIdWithAssociatedList(etatDeclarationIr).subscribe(
	 res => {
	       this.initDuplicateEtatDeclarationIr(res);
	       this.selectedEtatDeclarationIr = res;
	       this.selectedEtatDeclarationIr.id = null;
            this.createEtatDeclarationIrDialog = true;

});

	}

	initDuplicateEtatDeclarationIr(res: EtatDeclarationIrVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatDeclarationIrs.map(e => {
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
            'Reference': this.searchEtatDeclarationIr.reference ? this.searchEtatDeclarationIr.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatDeclarationIr.libelle ? this.searchEtatDeclarationIr.libelle : environment.emptyForExport ,
            'Archive': this.searchEtatDeclarationIr.archive ? (this.searchEtatDeclarationIr.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtatDeclarationIr.dateArchivageMin ? this.datePipe.transform(this.searchEtatDeclarationIr.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtatDeclarationIr.dateArchivageMax ? this.datePipe.transform(this.searchEtatDeclarationIr.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtatDeclarationIr.dateCreationMin ? this.datePipe.transform(this.searchEtatDeclarationIr.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtatDeclarationIr.dateCreationMax ? this.datePipe.transform(this.searchEtatDeclarationIr.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtatDeclarationIr.admin ? (this.searchEtatDeclarationIr.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtatDeclarationIr.visible ? (this.searchEtatDeclarationIr.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtatDeclarationIr.username ? this.searchEtatDeclarationIr.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
           return this.etatDeclarationIrService.etatDeclarationIrs;
       }
    set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }

    get etatDeclarationIrSelections(): Array<EtatDeclarationIrVo> {
           return this.etatDeclarationIrService.etatDeclarationIrSelections;
       }
    set etatDeclarationIrSelections(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrSelections = value;
       }
   
     


    get selectedEtatDeclarationIr():EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
    set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }
    
    get createEtatDeclarationIrDialog():boolean {
           return this.etatDeclarationIrService.createEtatDeclarationIrDialog;
       }
    set createEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.createEtatDeclarationIrDialog= value;
       }
    
    get editEtatDeclarationIrDialog():boolean {
           return this.etatDeclarationIrService.editEtatDeclarationIrDialog;
       }
    set editEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.editEtatDeclarationIrDialog= value;
       }
    get viewEtatDeclarationIrDialog():boolean {
           return this.etatDeclarationIrService.viewEtatDeclarationIrDialog;
       }
    set viewEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.viewEtatDeclarationIrDialog = value;
       }
       
     get searchEtatDeclarationIr(): EtatDeclarationIrVo {
        return this.etatDeclarationIrService.searchEtatDeclarationIr;
       }
    set searchEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.searchEtatDeclarationIr = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
