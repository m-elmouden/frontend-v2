import {Component, OnInit} from '@angular/core';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SocieteService } from '../../../../../../controller/service/Societe.service';
import { TauxIsService } from '../../../../../../controller/service/TauxIs.service';
import { TauxIsConfigService } from '../../../../../../controller/service/TauxIsConfig.service';
import { EtatDeclarationIsService } from '../../../../../../controller/service/EtatDeclarationIs.service';
import { PaiementDeclarationIsService } from '../../../../../../controller/service/PaiementDeclarationIs.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-declaration-is-list-societe',
  templateUrl: './declaration-is-list-societe.component.html',
  styleUrls: ['./declaration-is-list-societe.component.css']
})
export class DeclarationIsListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeclarationIs';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    societes :Array<SocieteVo>;
    tauxIss :Array<TauxIsVo>;
    tauxIsConfigs :Array<TauxIsConfigVo>;
    etatDeclarationIss :Array<EtatDeclarationIsVo>;
    paiementDeclarationIss :Array<PaiementDeclarationIsVo>;


    constructor(private datePipe: DatePipe, private declarationIsService: DeclarationIsService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private societeService: SocieteService
        , private tauxIsService: TauxIsService
        , private tauxIsConfigService: TauxIsConfigService
        , private etatDeclarationIsService: EtatDeclarationIsService
        , private paiementDeclarationIsService: PaiementDeclarationIsService
) { }

    ngOnInit(): void {
      this.loadDeclarationIss();
      this.initExport();
      this.initCol();
      this.loadSociete();
      this.loadTauxIs();
      this.loadTauxIsConfig();
      this.loadEtatDeclarationIs();
      this.loadPaiementDeclarationIs();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDeclarationIss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'list');
        isPermistted ? this.declarationIsService.findAll().subscribe(declarationIss => this.declarationIss = declarationIss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.declarationIsService.findByCriteria(this.searchDeclarationIs).subscribe(declarationIss=>{
            
            this.declarationIss = declarationIss;
           // this.searchDeclarationIs = new DeclarationIsVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'annee', header: 'Annee'},
                            {field: 'totalHtProduit', header: 'Total ht produit'},
                            {field: 'totalHtCharge', header: 'Total ht charge'},
                            {field: 'totalHtDifference', header: 'Total ht difference'},
                            {field: 'montantIsCalcule', header: 'Montant is calcule'},
                            {field: 'montantIsAPaye', header: 'Montant is a paye'},
                            {field: 'totalAPaye', header: 'Total a paye'},
                        {field: 'societe?.id', header: 'Societe'},
                        {field: 'tauxIs?.reference', header: 'Taux is'},
                        {field: 'tauxIsConfig?.reference', header: 'Taux is config'},
                        {field: 'etatDeclarationIs?.libelle', header: 'Etat declaration is'},
                        {field: 'paiementDeclarationIs?.reference', header: 'Paiement declaration is'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDeclarationIs(declarationIs:DeclarationIsVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'edit');
         if(isPermistted){
          this.declarationIsService.findByIdWithAssociatedList(declarationIs).subscribe(res => {
           this.selectedDeclarationIs = res;
            this.selectedDeclarationIs.dateArchivage = new Date(declarationIs.dateArchivage);
            this.selectedDeclarationIs.dateCreation = new Date(declarationIs.dateCreation);
            this.editDeclarationIsDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeclarationIs(declarationIs:DeclarationIsVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'view');
        if(isPermistted){
           this.declarationIsService.findByIdWithAssociatedList(declarationIs).subscribe(res => {
           this.selectedDeclarationIs = res;
            this.selectedDeclarationIs.dateArchivage = new Date(declarationIs.dateArchivage);
            this.selectedDeclarationIs.dateCreation = new Date(declarationIs.dateCreation);
            this.viewDeclarationIsDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeclarationIs(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeclarationIs = new DeclarationIsVo();
            this.createDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverDeclarationIs(declarationIs:DeclarationIsVo){
const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Declaration is) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.declarationIsService.archiver(declarationIs).subscribe(status=>{
const myIndex = this.declarationIss.indexOf(declarationIs);
this.declarationIss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Declaration is archivé',
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

public async desarchiverDeclarationIs(declarationIs:DeclarationIsVo){
const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Declaration is) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.declarationIsService.desarchiver(declarationIs).subscribe(status=>{
const myIndex = this.declarationIss.indexOf(declarationIs);
this.declarationIss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Declaration is désarchivé',
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


    public async deleteDeclarationIs(declarationIs:DeclarationIsVo){
       const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Declaration is) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.declarationIsService.delete(declarationIs).subscribe(status=>{
                          if(status > 0){
                          const position = this.declarationIss.indexOf(declarationIs);
                          position > -1 ? this.declarationIss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Declaration is Supprimé',
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

public async loadSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTauxIs(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'list');
    isPermistted ? this.tauxIsService.findAll().subscribe(tauxIss => this.tauxIss = tauxIss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTauxIsConfig(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'list');
    isPermistted ? this.tauxIsConfigService.findAll().subscribe(tauxIsConfigs => this.tauxIsConfigs = tauxIsConfigs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatDeclarationIs(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'list');
    isPermistted ? this.etatDeclarationIsService.findAll().subscribe(etatDeclarationIss => this.etatDeclarationIss = etatDeclarationIss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPaiementDeclarationIs(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'list');
    isPermistted ? this.paiementDeclarationIsService.findAll().subscribe(paiementDeclarationIss => this.paiementDeclarationIss = paiementDeclarationIss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeclarationIs(declarationIs: DeclarationIsVo) {

     this.declarationIsService.findByIdWithAssociatedList(declarationIs).subscribe(
	 res => {
	       this.initDuplicateDeclarationIs(res);
	       this.selectedDeclarationIs = res;
	       this.selectedDeclarationIs.id = null;
            this.createDeclarationIsDialog = true;

});

	}

	initDuplicateDeclarationIs(res: DeclarationIsVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.declarationIss.map(e => {
    return {
                    'Reference': e.reference ,
                    'Annee': e.annee ,
                    'Total ht produit': e.totalHtProduit ,
                    'Total ht charge': e.totalHtCharge ,
                    'Total ht difference': e.totalHtDifference ,
                    'Montant is calcule': e.montantIsCalcule ,
                    'Montant is a paye': e.montantIsAPaye ,
                    'Total a paye': e.totalAPaye ,
            'Societe': e.societeVo?.id ,
            'Taux is': e.tauxIsVo?.reference ,
            'Taux is config': e.tauxIsConfigVo?.reference ,
            'Etat declaration is': e.etatDeclarationIsVo?.libelle ,
            'Paiement declaration is': e.paiementDeclarationIsVo?.reference ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchDeclarationIs.reference ? this.searchDeclarationIs.reference : environment.emptyForExport ,
            'Annee Min': this.searchDeclarationIs.anneeMin ? this.searchDeclarationIs.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchDeclarationIs.anneeMax ? this.searchDeclarationIs.anneeMax : environment.emptyForExport ,
            'Total ht produit Min': this.searchDeclarationIs.totalHtProduitMin ? this.searchDeclarationIs.totalHtProduitMin : environment.emptyForExport ,
            'Total ht produit Max': this.searchDeclarationIs.totalHtProduitMax ? this.searchDeclarationIs.totalHtProduitMax : environment.emptyForExport ,
            'Total ht charge Min': this.searchDeclarationIs.totalHtChargeMin ? this.searchDeclarationIs.totalHtChargeMin : environment.emptyForExport ,
            'Total ht charge Max': this.searchDeclarationIs.totalHtChargeMax ? this.searchDeclarationIs.totalHtChargeMax : environment.emptyForExport ,
            'Total ht difference Min': this.searchDeclarationIs.totalHtDifferenceMin ? this.searchDeclarationIs.totalHtDifferenceMin : environment.emptyForExport ,
            'Total ht difference Max': this.searchDeclarationIs.totalHtDifferenceMax ? this.searchDeclarationIs.totalHtDifferenceMax : environment.emptyForExport ,
            'Montant is calcule Min': this.searchDeclarationIs.montantIsCalculeMin ? this.searchDeclarationIs.montantIsCalculeMin : environment.emptyForExport ,
            'Montant is calcule Max': this.searchDeclarationIs.montantIsCalculeMax ? this.searchDeclarationIs.montantIsCalculeMax : environment.emptyForExport ,
            'Montant is a paye Min': this.searchDeclarationIs.montantIsAPayeMin ? this.searchDeclarationIs.montantIsAPayeMin : environment.emptyForExport ,
            'Montant is a paye Max': this.searchDeclarationIs.montantIsAPayeMax ? this.searchDeclarationIs.montantIsAPayeMax : environment.emptyForExport ,
            'Total a paye Min': this.searchDeclarationIs.totalAPayeMin ? this.searchDeclarationIs.totalAPayeMin : environment.emptyForExport ,
            'Total a paye Max': this.searchDeclarationIs.totalAPayeMax ? this.searchDeclarationIs.totalAPayeMax : environment.emptyForExport ,
        'Societe': this.searchDeclarationIs.societeVo?.id ? this.searchDeclarationIs.societeVo?.id : environment.emptyForExport ,
        'Taux is': this.searchDeclarationIs.tauxIsVo?.reference ? this.searchDeclarationIs.tauxIsVo?.reference : environment.emptyForExport ,
        'Taux is config': this.searchDeclarationIs.tauxIsConfigVo?.reference ? this.searchDeclarationIs.tauxIsConfigVo?.reference : environment.emptyForExport ,
        'Etat declaration is': this.searchDeclarationIs.etatDeclarationIsVo?.libelle ? this.searchDeclarationIs.etatDeclarationIsVo?.libelle : environment.emptyForExport ,
        'Paiement declaration is': this.searchDeclarationIs.paiementDeclarationIsVo?.reference ? this.searchDeclarationIs.paiementDeclarationIsVo?.reference : environment.emptyForExport ,
            'Archive': this.searchDeclarationIs.archive ? (this.searchDeclarationIs.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDeclarationIs.dateArchivageMin ? this.datePipe.transform(this.searchDeclarationIs.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDeclarationIs.dateArchivageMax ? this.datePipe.transform(this.searchDeclarationIs.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDeclarationIs.dateCreationMin ? this.datePipe.transform(this.searchDeclarationIs.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDeclarationIs.dateCreationMax ? this.datePipe.transform(this.searchDeclarationIs.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDeclarationIs.admin ? (this.searchDeclarationIs.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDeclarationIs.visible ? (this.searchDeclarationIs.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDeclarationIs.username ? this.searchDeclarationIs.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get declarationIss(): Array<DeclarationIsVo> {
           return this.declarationIsService.declarationIss;
       }
    set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }

    get declarationIsSelections(): Array<DeclarationIsVo> {
           return this.declarationIsService.declarationIsSelections;
       }
    set declarationIsSelections(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIsSelections = value;
       }
   
     


    get selectedDeclarationIs():DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
    set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }
    
    get createDeclarationIsDialog():boolean {
           return this.declarationIsService.createDeclarationIsDialog;
       }
    set createDeclarationIsDialog(value: boolean) {
        this.declarationIsService.createDeclarationIsDialog= value;
       }
    
    get editDeclarationIsDialog():boolean {
           return this.declarationIsService.editDeclarationIsDialog;
       }
    set editDeclarationIsDialog(value: boolean) {
        this.declarationIsService.editDeclarationIsDialog= value;
       }
    get viewDeclarationIsDialog():boolean {
           return this.declarationIsService.viewDeclarationIsDialog;
       }
    set viewDeclarationIsDialog(value: boolean) {
        this.declarationIsService.viewDeclarationIsDialog = value;
       }
       
     get searchDeclarationIs(): DeclarationIsVo {
        return this.declarationIsService.searchDeclarationIs;
       }
    set searchDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.searchDeclarationIs = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
