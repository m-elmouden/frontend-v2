import {Component, OnInit} from '@angular/core';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SocieteService } from '../../../../../../controller/service/Societe.service';
import { TypeDeclarationTvaService } from '../../../../../../controller/service/TypeDeclarationTva.service';
import { EtatDeclarationTvaService } from '../../../../../../controller/service/EtatDeclarationTva.service';
import { PaiementDeclarationTvaService } from '../../../../../../controller/service/PaiementDeclarationTva.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-declaration-tva-list-societe',
  templateUrl: './declaration-tva-list-societe.component.html',
  styleUrls: ['./declaration-tva-list-societe.component.css']
})
export class DeclarationTvaListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeclarationTva';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    societes :Array<SocieteVo>;
    typeDeclarationTvas :Array<TypeDeclarationTvaVo>;
    etatDeclarationTvas :Array<EtatDeclarationTvaVo>;
    paiementDeclarationTvas :Array<PaiementDeclarationTvaVo>;


    constructor(private datePipe: DatePipe, private declarationTvaService: DeclarationTvaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private societeService: SocieteService
        , private typeDeclarationTvaService: TypeDeclarationTvaService
        , private etatDeclarationTvaService: EtatDeclarationTvaService
        , private paiementDeclarationTvaService: PaiementDeclarationTvaService
) { }

    ngOnInit(): void {
      this.loadDeclarationTvas();
      this.initExport();
      this.initCol();
      this.loadSociete();
      this.loadTypeDeclarationTva();
      this.loadEtatDeclarationTva();
      this.loadPaiementDeclarationTva();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDeclarationTvas(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'list');
        isPermistted ? this.declarationTvaService.findAll().subscribe(declarationTvas => this.declarationTvas = declarationTvas,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.declarationTvaService.findByCriteria(this.searchDeclarationTva).subscribe(declarationTvas=>{
            
            this.declarationTvas = declarationTvas;
           // this.searchDeclarationTva = new DeclarationTvaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'tvacollecter', header: 'Tvacollecter'},
                            {field: 'tvaperdue', header: 'Tvaperdue'},
                            {field: 'differenceTva', header: 'Difference tva'},
                            {field: 'montantTvaCalcule', header: 'Montant tva calcule'},
                            {field: 'montantTvaAPaye', header: 'Montant tva a paye'},
                            {field: 'annee', header: 'Annee'},
                            {field: 'mois', header: 'Mois'},
                            {field: 'trimestre', header: 'Trimestre'},
                        {field: 'societe?.id', header: 'Societe'},
                        {field: 'typeDeclarationTva?.libelle', header: 'Type declaration tva'},
                        {field: 'etatDeclarationTva?.libelle', header: 'Etat declaration tva'},
                        {field: 'paiementDeclarationTva?.reference', header: 'Paiement declaration tva'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDeclarationTva(declarationTva:DeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'edit');
         if(isPermistted){
          this.declarationTvaService.findByIdWithAssociatedList(declarationTva).subscribe(res => {
           this.selectedDeclarationTva = res;
            this.selectedDeclarationTva.dateArchivage = new Date(declarationTva.dateArchivage);
            this.selectedDeclarationTva.dateCreation = new Date(declarationTva.dateCreation);
            this.editDeclarationTvaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeclarationTva(declarationTva:DeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'view');
        if(isPermistted){
           this.declarationTvaService.findByIdWithAssociatedList(declarationTva).subscribe(res => {
           this.selectedDeclarationTva = res;
            this.selectedDeclarationTva.dateArchivage = new Date(declarationTva.dateArchivage);
            this.selectedDeclarationTva.dateCreation = new Date(declarationTva.dateCreation);
            this.viewDeclarationTvaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeclarationTva(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeclarationTva = new DeclarationTvaVo();
            this.createDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverDeclarationTva(declarationTva:DeclarationTvaVo){
const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Declaration tva) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.declarationTvaService.archiver(declarationTva).subscribe(status=>{
const myIndex = this.declarationTvas.indexOf(declarationTva);
this.declarationTvas[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Declaration tva archivé',
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

public async desarchiverDeclarationTva(declarationTva:DeclarationTvaVo){
const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Declaration tva) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.declarationTvaService.desarchiver(declarationTva).subscribe(status=>{
const myIndex = this.declarationTvas.indexOf(declarationTva);
this.declarationTvas[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Declaration tva désarchivé',
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


    public async deleteDeclarationTva(declarationTva:DeclarationTvaVo){
       const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Declaration tva) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.declarationTvaService.delete(declarationTva).subscribe(status=>{
                          if(status > 0){
                          const position = this.declarationTvas.indexOf(declarationTva);
                          position > -1 ? this.declarationTvas.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Declaration tva Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeDeclarationTva(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'list');
    isPermistted ? this.typeDeclarationTvaService.findAll().subscribe(typeDeclarationTvas => this.typeDeclarationTvas = typeDeclarationTvas,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatDeclarationTva(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'list');
    isPermistted ? this.etatDeclarationTvaService.findAll().subscribe(etatDeclarationTvas => this.etatDeclarationTvas = etatDeclarationTvas,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPaiementDeclarationTva(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'list');
    isPermistted ? this.paiementDeclarationTvaService.findAll().subscribe(paiementDeclarationTvas => this.paiementDeclarationTvas = paiementDeclarationTvas,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeclarationTva(declarationTva: DeclarationTvaVo) {

     this.declarationTvaService.findByIdWithAssociatedList(declarationTva).subscribe(
	 res => {
	       this.initDuplicateDeclarationTva(res);
	       this.selectedDeclarationTva = res;
	       this.selectedDeclarationTva.id = null;
            this.createDeclarationTvaDialog = true;

});

	}

	initDuplicateDeclarationTva(res: DeclarationTvaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.declarationTvas.map(e => {
    return {
                    'Reference': e.reference ,
                    'Tvacollecter': e.tvacollecter ,
                    'Tvaperdue': e.tvaperdue ,
                    'Difference tva': e.differenceTva ,
                    'Montant tva calcule': e.montantTvaCalcule ,
                    'Montant tva a paye': e.montantTvaAPaye ,
                    'Annee': e.annee ,
                    'Mois': e.mois ,
                    'Trimestre': e.trimestre ,
            'Societe': e.societeVo?.id ,
            'Type declaration tva': e.typeDeclarationTvaVo?.libelle ,
            'Etat declaration tva': e.etatDeclarationTvaVo?.libelle ,
            'Paiement declaration tva': e.paiementDeclarationTvaVo?.reference ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchDeclarationTva.reference ? this.searchDeclarationTva.reference : environment.emptyForExport ,
            'Tvacollecter Min': this.searchDeclarationTva.tvacollecterMin ? this.searchDeclarationTva.tvacollecterMin : environment.emptyForExport ,
            'Tvacollecter Max': this.searchDeclarationTva.tvacollecterMax ? this.searchDeclarationTva.tvacollecterMax : environment.emptyForExport ,
            'Tvaperdue Min': this.searchDeclarationTva.tvaperdueMin ? this.searchDeclarationTva.tvaperdueMin : environment.emptyForExport ,
            'Tvaperdue Max': this.searchDeclarationTva.tvaperdueMax ? this.searchDeclarationTva.tvaperdueMax : environment.emptyForExport ,
            'Difference tva Min': this.searchDeclarationTva.differenceTvaMin ? this.searchDeclarationTva.differenceTvaMin : environment.emptyForExport ,
            'Difference tva Max': this.searchDeclarationTva.differenceTvaMax ? this.searchDeclarationTva.differenceTvaMax : environment.emptyForExport ,
            'Montant tva calcule Min': this.searchDeclarationTva.montantTvaCalculeMin ? this.searchDeclarationTva.montantTvaCalculeMin : environment.emptyForExport ,
            'Montant tva calcule Max': this.searchDeclarationTva.montantTvaCalculeMax ? this.searchDeclarationTva.montantTvaCalculeMax : environment.emptyForExport ,
            'Montant tva a paye Min': this.searchDeclarationTva.montantTvaAPayeMin ? this.searchDeclarationTva.montantTvaAPayeMin : environment.emptyForExport ,
            'Montant tva a paye Max': this.searchDeclarationTva.montantTvaAPayeMax ? this.searchDeclarationTva.montantTvaAPayeMax : environment.emptyForExport ,
            'Annee Min': this.searchDeclarationTva.anneeMin ? this.searchDeclarationTva.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchDeclarationTva.anneeMax ? this.searchDeclarationTva.anneeMax : environment.emptyForExport ,
            'Mois Min': this.searchDeclarationTva.moisMin ? this.searchDeclarationTva.moisMin : environment.emptyForExport ,
            'Mois Max': this.searchDeclarationTva.moisMax ? this.searchDeclarationTva.moisMax : environment.emptyForExport ,
            'Trimestre Min': this.searchDeclarationTva.trimestreMin ? this.searchDeclarationTva.trimestreMin : environment.emptyForExport ,
            'Trimestre Max': this.searchDeclarationTva.trimestreMax ? this.searchDeclarationTva.trimestreMax : environment.emptyForExport ,
        'Societe': this.searchDeclarationTva.societeVo?.id ? this.searchDeclarationTva.societeVo?.id : environment.emptyForExport ,
        'Type declaration tva': this.searchDeclarationTva.typeDeclarationTvaVo?.libelle ? this.searchDeclarationTva.typeDeclarationTvaVo?.libelle : environment.emptyForExport ,
        'Etat declaration tva': this.searchDeclarationTva.etatDeclarationTvaVo?.libelle ? this.searchDeclarationTva.etatDeclarationTvaVo?.libelle : environment.emptyForExport ,
        'Paiement declaration tva': this.searchDeclarationTva.paiementDeclarationTvaVo?.reference ? this.searchDeclarationTva.paiementDeclarationTvaVo?.reference : environment.emptyForExport ,
            'Archive': this.searchDeclarationTva.archive ? (this.searchDeclarationTva.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDeclarationTva.dateArchivageMin ? this.datePipe.transform(this.searchDeclarationTva.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDeclarationTva.dateArchivageMax ? this.datePipe.transform(this.searchDeclarationTva.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDeclarationTva.dateCreationMin ? this.datePipe.transform(this.searchDeclarationTva.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDeclarationTva.dateCreationMax ? this.datePipe.transform(this.searchDeclarationTva.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDeclarationTva.admin ? (this.searchDeclarationTva.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDeclarationTva.visible ? (this.searchDeclarationTva.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDeclarationTva.username ? this.searchDeclarationTva.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get declarationTvas(): Array<DeclarationTvaVo> {
           return this.declarationTvaService.declarationTvas;
       }
    set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }

    get declarationTvaSelections(): Array<DeclarationTvaVo> {
           return this.declarationTvaService.declarationTvaSelections;
       }
    set declarationTvaSelections(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvaSelections = value;
       }
   
     


    get selectedDeclarationTva():DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
    set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }
    
    get createDeclarationTvaDialog():boolean {
           return this.declarationTvaService.createDeclarationTvaDialog;
       }
    set createDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.createDeclarationTvaDialog= value;
       }
    
    get editDeclarationTvaDialog():boolean {
           return this.declarationTvaService.editDeclarationTvaDialog;
       }
    set editDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.editDeclarationTvaDialog= value;
       }
    get viewDeclarationTvaDialog():boolean {
           return this.declarationTvaService.viewDeclarationTvaDialog;
       }
    set viewDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.viewDeclarationTvaDialog = value;
       }
       
     get searchDeclarationTva(): DeclarationTvaVo {
        return this.declarationTvaService.searchDeclarationTva;
       }
    set searchDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.searchDeclarationTva = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
