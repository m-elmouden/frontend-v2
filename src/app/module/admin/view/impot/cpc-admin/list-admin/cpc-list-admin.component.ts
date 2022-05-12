import {Component, OnInit} from '@angular/core';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-cpc-list-admin',
  templateUrl: './cpc-list-admin.component.html',
  styleUrls: ['./cpc-list-admin.component.css']
})
export class CpcListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Cpc';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private cpcService: CpcService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCpcs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCpcs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Cpc', 'list');
        isPermistted ? this.cpcService.findAll().subscribe(cpcs => this.cpcs = cpcs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.cpcService.findByCriteria(this.searchCpc).subscribe(cpcs=>{
            
            this.cpcs = cpcs;
           // this.searchCpc = new CpcVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'totalProdEx', header: 'Total prod ex'},
                            {field: 'totalChargEx', header: 'Total charg ex'},
                            {field: 'totalProdFin', header: 'Total prod fin'},
                            {field: 'totalChargFin', header: 'Total charg fin'},
                            {field: 'totalProdNCour', header: 'Total prod n cour'},
                            {field: 'totalChargNCour', header: 'Total charg n cour'},
                            {field: 'dateMinCpc', header: 'Date min cpc'},
                            {field: 'dateMaxCpc', header: 'Date max cpc'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editCpc(cpc:CpcVo){
        const isPermistted = await this.roleService.isPermitted('Cpc', 'edit');
         if(isPermistted){
          this.cpcService.findByIdWithAssociatedList(cpc).subscribe(res => {
           this.selectedCpc = res;
            this.selectedCpc.dateMinCpc = new Date(cpc.dateMinCpc);
            this.selectedCpc.dateMaxCpc = new Date(cpc.dateMaxCpc);
            this.selectedCpc.dateArchivage = new Date(cpc.dateArchivage);
            this.selectedCpc.dateCreation = new Date(cpc.dateCreation);
            this.editCpcDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCpc(cpc:CpcVo){
        const isPermistted = await this.roleService.isPermitted('Cpc', 'view');
        if(isPermistted){
           this.cpcService.findByIdWithAssociatedList(cpc).subscribe(res => {
           this.selectedCpc = res;
            this.selectedCpc.dateMinCpc = new Date(cpc.dateMinCpc);
            this.selectedCpc.dateMaxCpc = new Date(cpc.dateMaxCpc);
            this.selectedCpc.dateArchivage = new Date(cpc.dateArchivage);
            this.selectedCpc.dateCreation = new Date(cpc.dateCreation);
            this.viewCpcDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCpc(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCpc = new CpcVo();
            this.createCpcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCpc(cpc:CpcVo){
const isPermistted = await this.roleService.isPermitted('Cpc', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Cpc) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.cpcService.archiver(cpc).subscribe(status=>{
const myIndex = this.cpcs.indexOf(cpc);
this.cpcs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Cpc archivé',
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

public async desarchiverCpc(cpc:CpcVo){
const isPermistted = await this.roleService.isPermitted('Cpc', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Cpc) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.cpcService.desarchiver(cpc).subscribe(status=>{
const myIndex = this.cpcs.indexOf(cpc);
this.cpcs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Cpc désarchivé',
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


    public async deleteCpc(cpc:CpcVo){
       const isPermistted = await this.roleService.isPermitted('Cpc', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Cpc) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.cpcService.delete(cpc).subscribe(status=>{
                          if(status > 0){
                          const position = this.cpcs.indexOf(cpc);
                          position > -1 ? this.cpcs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Cpc Supprimé',
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


public async duplicateCpc(cpc: CpcVo) {

     this.cpcService.findByIdWithAssociatedList(cpc).subscribe(
	 res => {
	       this.initDuplicateCpc(res);
	       this.selectedCpc = res;
	       this.selectedCpc.id = null;
            this.createCpcDialog = true;

});

	}

	initDuplicateCpc(res: CpcVo) {
        if (res.cpcFacturesVo != null) {
             res.cpcFacturesVo.forEach(d => { d.cpcVo = null; d.id = null; });
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
    this.exportData = this.cpcs.map(e => {
    return {
                    'Reference': e.reference ,
                    'Total prod ex': e.totalProdEx ,
                    'Total charg ex': e.totalChargEx ,
                    'Total prod fin': e.totalProdFin ,
                    'Total charg fin': e.totalChargFin ,
                    'Total prod n cour': e.totalProdNCour ,
                    'Total charg n cour': e.totalChargNCour ,
                    'Date min cpc': this.datePipe.transform(e.dateMinCpc , 'dd-MM-yyyy'),
                    'Date max cpc': this.datePipe.transform(e.dateMaxCpc , 'dd-MM-yyyy'),
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchCpc.reference ? this.searchCpc.reference : environment.emptyForExport ,
            'Total prod ex Min': this.searchCpc.totalProdExMin ? this.searchCpc.totalProdExMin : environment.emptyForExport ,
            'Total prod ex Max': this.searchCpc.totalProdExMax ? this.searchCpc.totalProdExMax : environment.emptyForExport ,
            'Total charg ex Min': this.searchCpc.totalChargExMin ? this.searchCpc.totalChargExMin : environment.emptyForExport ,
            'Total charg ex Max': this.searchCpc.totalChargExMax ? this.searchCpc.totalChargExMax : environment.emptyForExport ,
            'Total prod fin Min': this.searchCpc.totalProdFinMin ? this.searchCpc.totalProdFinMin : environment.emptyForExport ,
            'Total prod fin Max': this.searchCpc.totalProdFinMax ? this.searchCpc.totalProdFinMax : environment.emptyForExport ,
            'Total charg fin Min': this.searchCpc.totalChargFinMin ? this.searchCpc.totalChargFinMin : environment.emptyForExport ,
            'Total charg fin Max': this.searchCpc.totalChargFinMax ? this.searchCpc.totalChargFinMax : environment.emptyForExport ,
            'Total prod n cour Min': this.searchCpc.totalProdNCourMin ? this.searchCpc.totalProdNCourMin : environment.emptyForExport ,
            'Total prod n cour Max': this.searchCpc.totalProdNCourMax ? this.searchCpc.totalProdNCourMax : environment.emptyForExport ,
            'Total charg n cour Min': this.searchCpc.totalChargNCourMin ? this.searchCpc.totalChargNCourMin : environment.emptyForExport ,
            'Total charg n cour Max': this.searchCpc.totalChargNCourMax ? this.searchCpc.totalChargNCourMax : environment.emptyForExport ,
            'Date min cpc Min': this.searchCpc.dateMinCpcMin ? this.datePipe.transform(this.searchCpc.dateMinCpcMin , this.dateFormat) : environment.emptyForExport ,
            'Date min cpc Max': this.searchCpc.dateMinCpcMax ? this.datePipe.transform(this.searchCpc.dateMinCpcMax , this.dateFormat) : environment.emptyForExport ,
            'Date max cpc Min': this.searchCpc.dateMaxCpcMin ? this.datePipe.transform(this.searchCpc.dateMaxCpcMin , this.dateFormat) : environment.emptyForExport ,
            'Date max cpc Max': this.searchCpc.dateMaxCpcMax ? this.datePipe.transform(this.searchCpc.dateMaxCpcMax , this.dateFormat) : environment.emptyForExport ,
            'Archive': this.searchCpc.archive ? (this.searchCpc.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCpc.dateArchivageMin ? this.datePipe.transform(this.searchCpc.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCpc.dateArchivageMax ? this.datePipe.transform(this.searchCpc.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCpc.dateCreationMin ? this.datePipe.transform(this.searchCpc.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCpc.dateCreationMax ? this.datePipe.transform(this.searchCpc.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchCpc.admin ? (this.searchCpc.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchCpc.visible ? (this.searchCpc.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchCpc.username ? this.searchCpc.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get cpcs(): Array<CpcVo> {
           return this.cpcService.cpcs;
       }
    set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }

    get cpcSelections(): Array<CpcVo> {
           return this.cpcService.cpcSelections;
       }
    set cpcSelections(value: Array<CpcVo>) {
        this.cpcService.cpcSelections = value;
       }
   
     


    get selectedCpc():CpcVo {
           return this.cpcService.selectedCpc;
       }
    set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }
    
    get createCpcDialog():boolean {
           return this.cpcService.createCpcDialog;
       }
    set createCpcDialog(value: boolean) {
        this.cpcService.createCpcDialog= value;
       }
    
    get editCpcDialog():boolean {
           return this.cpcService.editCpcDialog;
       }
    set editCpcDialog(value: boolean) {
        this.cpcService.editCpcDialog= value;
       }
    get viewCpcDialog():boolean {
           return this.cpcService.viewCpcDialog;
       }
    set viewCpcDialog(value: boolean) {
        this.cpcService.viewCpcDialog = value;
       }
       
     get searchCpc(): CpcVo {
        return this.cpcService.searchCpc;
       }
    set searchCpc(value: CpcVo) {
        this.cpcService.searchCpc = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
