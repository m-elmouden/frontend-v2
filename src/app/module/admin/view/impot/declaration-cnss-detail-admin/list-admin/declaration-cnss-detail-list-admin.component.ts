import {Component, OnInit} from '@angular/core';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeTauxCnssService } from '../../../../../../controller/service/TypeTauxCnss.service';
import { DeclarationCnssService } from '../../../../../../controller/service/DeclarationCnss.service';

import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-declaration-cnss-detail-list-admin',
  templateUrl: './declaration-cnss-detail-list-admin.component.html',
  styleUrls: ['./declaration-cnss-detail-list-admin.component.css']
})
export class DeclarationCnssDetailListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeclarationCnssDetail';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    typeTauxCnsss :Array<TypeTauxCnssVo>;
    declarationCnsss :Array<DeclarationCnssVo>;


    constructor(private datePipe: DatePipe, private declarationCnssDetailService: DeclarationCnssDetailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeTauxCnssService: TypeTauxCnssService
        , private declarationCnssService: DeclarationCnssService
) { }

    ngOnInit(): void {
      this.loadDeclarationCnssDetails();
      this.initExport();
      this.initCol();
      this.loadTypeTauxCnss();
      this.loadDeclarationCnss();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDeclarationCnssDetails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'list');
        isPermistted ? this.declarationCnssDetailService.findAll().subscribe(declarationCnssDetails => this.declarationCnssDetails = declarationCnssDetails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.declarationCnssDetailService.findByCriteria(this.searchDeclarationCnssDetail).subscribe(declarationCnssDetails=>{
            
            this.declarationCnssDetails = declarationCnssDetails;
           // this.searchDeclarationCnssDetail = new DeclarationCnssDetailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'ref', header: 'Ref'},
                        {field: 'typeTauxCnss?.libelle', header: 'Type taux cnss'},
                            {field: 'montantCalcule', header: 'Montant calcule'},
                            {field: 'montantTotal', header: 'Montant total'},
                        {field: 'declarationCnss?.ref', header: 'Declaration cnss'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDeclarationCnssDetail(declarationCnssDetail:DeclarationCnssDetailVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'edit');
         if(isPermistted){
          this.declarationCnssDetailService.findByIdWithAssociatedList(declarationCnssDetail).subscribe(res => {
           this.selectedDeclarationCnssDetail = res;
            this.selectedDeclarationCnssDetail.dateArchivage = new Date(declarationCnssDetail.dateArchivage);
            this.selectedDeclarationCnssDetail.dateCreation = new Date(declarationCnssDetail.dateCreation);
            this.editDeclarationCnssDetailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeclarationCnssDetail(declarationCnssDetail:DeclarationCnssDetailVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'view');
        if(isPermistted){
           this.declarationCnssDetailService.findByIdWithAssociatedList(declarationCnssDetail).subscribe(res => {
           this.selectedDeclarationCnssDetail = res;
            this.selectedDeclarationCnssDetail.dateArchivage = new Date(declarationCnssDetail.dateArchivage);
            this.selectedDeclarationCnssDetail.dateCreation = new Date(declarationCnssDetail.dateCreation);
            this.viewDeclarationCnssDetailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeclarationCnssDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeclarationCnssDetail = new DeclarationCnssDetailVo();
            this.createDeclarationCnssDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverDeclarationCnssDetail(declarationCnssDetail:DeclarationCnssDetailVo){
const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Declaration cnss detail) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.declarationCnssDetailService.archiver(declarationCnssDetail).subscribe(status=>{
const myIndex = this.declarationCnssDetails.indexOf(declarationCnssDetail);
this.declarationCnssDetails[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Declaration cnss detail archivé',
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

public async desarchiverDeclarationCnssDetail(declarationCnssDetail:DeclarationCnssDetailVo){
const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Declaration cnss detail) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.declarationCnssDetailService.desarchiver(declarationCnssDetail).subscribe(status=>{
const myIndex = this.declarationCnssDetails.indexOf(declarationCnssDetail);
this.declarationCnssDetails[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Declaration cnss detail désarchivé',
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


    public async deleteDeclarationCnssDetail(declarationCnssDetail:DeclarationCnssDetailVo){
       const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Declaration cnss detail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.declarationCnssDetailService.delete(declarationCnssDetail).subscribe(status=>{
                          if(status > 0){
                          const position = this.declarationCnssDetails.indexOf(declarationCnssDetail);
                          position > -1 ? this.declarationCnssDetails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Declaration cnss detail Supprimé',
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

public async loadTypeTauxCnss(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'list');
    isPermistted ? this.typeTauxCnssService.findAll().subscribe(typeTauxCnsss => this.typeTauxCnsss = typeTauxCnsss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeclarationCnss(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationCnssDetail', 'list');
    isPermistted ? this.declarationCnssService.findAll().subscribe(declarationCnsss => this.declarationCnsss = declarationCnsss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeclarationCnssDetail(declarationCnssDetail: DeclarationCnssDetailVo) {

     this.declarationCnssDetailService.findByIdWithAssociatedList(declarationCnssDetail).subscribe(
	 res => {
	       this.initDuplicateDeclarationCnssDetail(res);
	       this.selectedDeclarationCnssDetail = res;
	       this.selectedDeclarationCnssDetail.id = null;
            this.createDeclarationCnssDetailDialog = true;

});

	}

	initDuplicateDeclarationCnssDetail(res: DeclarationCnssDetailVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.declarationCnssDetails.map(e => {
    return {
                    'Ref': e.ref ,
            'Type taux cnss': e.typeTauxCnssVo?.libelle ,
                    'Montant calcule': e.montantCalcule ,
                    'Montant total': e.montantTotal ,
            'Declaration cnss': e.declarationCnssVo?.ref ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Ref': this.searchDeclarationCnssDetail.ref ? this.searchDeclarationCnssDetail.ref : environment.emptyForExport ,
        'Type taux cnss': this.searchDeclarationCnssDetail.typeTauxCnssVo?.libelle ? this.searchDeclarationCnssDetail.typeTauxCnssVo?.libelle : environment.emptyForExport ,
            'Montant calcule Min': this.searchDeclarationCnssDetail.montantCalculeMin ? this.searchDeclarationCnssDetail.montantCalculeMin : environment.emptyForExport ,
            'Montant calcule Max': this.searchDeclarationCnssDetail.montantCalculeMax ? this.searchDeclarationCnssDetail.montantCalculeMax : environment.emptyForExport ,
            'Montant total Min': this.searchDeclarationCnssDetail.montantTotalMin ? this.searchDeclarationCnssDetail.montantTotalMin : environment.emptyForExport ,
            'Montant total Max': this.searchDeclarationCnssDetail.montantTotalMax ? this.searchDeclarationCnssDetail.montantTotalMax : environment.emptyForExport ,
        'Declaration cnss': this.searchDeclarationCnssDetail.declarationCnssVo?.ref ? this.searchDeclarationCnssDetail.declarationCnssVo?.ref : environment.emptyForExport ,
            'Archive': this.searchDeclarationCnssDetail.archive ? (this.searchDeclarationCnssDetail.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDeclarationCnssDetail.dateArchivageMin ? this.datePipe.transform(this.searchDeclarationCnssDetail.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDeclarationCnssDetail.dateArchivageMax ? this.datePipe.transform(this.searchDeclarationCnssDetail.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDeclarationCnssDetail.dateCreationMin ? this.datePipe.transform(this.searchDeclarationCnssDetail.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDeclarationCnssDetail.dateCreationMax ? this.datePipe.transform(this.searchDeclarationCnssDetail.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDeclarationCnssDetail.admin ? (this.searchDeclarationCnssDetail.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDeclarationCnssDetail.visible ? (this.searchDeclarationCnssDetail.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDeclarationCnssDetail.username ? this.searchDeclarationCnssDetail.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get declarationCnssDetails(): Array<DeclarationCnssDetailVo> {
           return this.declarationCnssDetailService.declarationCnssDetails;
       }
    set declarationCnssDetails(value: Array<DeclarationCnssDetailVo>) {
        this.declarationCnssDetailService.declarationCnssDetails = value;
       }

    get declarationCnssDetailSelections(): Array<DeclarationCnssDetailVo> {
           return this.declarationCnssDetailService.declarationCnssDetailSelections;
       }
    set declarationCnssDetailSelections(value: Array<DeclarationCnssDetailVo>) {
        this.declarationCnssDetailService.declarationCnssDetailSelections = value;
       }
   
     


    get selectedDeclarationCnssDetail():DeclarationCnssDetailVo {
           return this.declarationCnssDetailService.selectedDeclarationCnssDetail;
       }
    set selectedDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this.declarationCnssDetailService.selectedDeclarationCnssDetail = value;
       }
    
    get createDeclarationCnssDetailDialog():boolean {
           return this.declarationCnssDetailService.createDeclarationCnssDetailDialog;
       }
    set createDeclarationCnssDetailDialog(value: boolean) {
        this.declarationCnssDetailService.createDeclarationCnssDetailDialog= value;
       }
    
    get editDeclarationCnssDetailDialog():boolean {
           return this.declarationCnssDetailService.editDeclarationCnssDetailDialog;
       }
    set editDeclarationCnssDetailDialog(value: boolean) {
        this.declarationCnssDetailService.editDeclarationCnssDetailDialog= value;
       }
    get viewDeclarationCnssDetailDialog():boolean {
           return this.declarationCnssDetailService.viewDeclarationCnssDetailDialog;
       }
    set viewDeclarationCnssDetailDialog(value: boolean) {
        this.declarationCnssDetailService.viewDeclarationCnssDetailDialog = value;
       }
       
     get searchDeclarationCnssDetail(): DeclarationCnssDetailVo {
        return this.declarationCnssDetailService.searchDeclarationCnssDetail;
       }
    set searchDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this.declarationCnssDetailService.searchDeclarationCnssDetail = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
