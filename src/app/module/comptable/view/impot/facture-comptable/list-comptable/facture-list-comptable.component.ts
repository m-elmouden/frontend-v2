import {Component, OnInit} from '@angular/core';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TvaService } from '../../../../../../controller/service/Tva.service';
import { TypeOperationFactureService } from '../../../../../../controller/service/TypeOperationFacture.service';
import { EtatFactureService } from '../../../../../../controller/service/EtatFacture.service';
import { EtatPaiementService } from '../../../../../../controller/service/EtatPaiement.service';
import { SocieteService } from '../../../../../../controller/service/Societe.service';
import { CompteComptableService } from '../../../../../../controller/service/CompteComptable.service';
import { DeclarationIsService } from '../../../../../../controller/service/DeclarationIs.service';
import { DeclarationTvaService } from '../../../../../../controller/service/DeclarationTva.service';
import { DemandeService } from '../../../../../../controller/service/Demande.service';
import { ClasseComptableService } from '../../../../../../controller/service/ClasseComptable.service';
import { CpcFactureService } from '../../../../../../controller/service/CpcFacture.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-facture-list-comptable',
  templateUrl: './facture-list-comptable.component.html',
  styleUrls: ['./facture-list-comptable.component.css']
})
export class FactureListComptableComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Facture';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    tvas :Array<TvaVo>;
    typeOperationFactures :Array<TypeOperationFactureVo>;
    etatFactures :Array<EtatFactureVo>;
    etatPaiements :Array<EtatPaiementVo>;
    societes :Array<SocieteVo>;
    compteComptables :Array<CompteComptableVo>;
    declarationIss :Array<DeclarationIsVo>;
    declarationTvas :Array<DeclarationTvaVo>;
    demandes :Array<DemandeVo>;
    classeComptables :Array<ClasseComptableVo>;
    cpcFactures :Array<CpcFactureVo>;


    constructor(private datePipe: DatePipe, private factureService: FactureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private tvaService: TvaService
        , private typeOperationFactureService: TypeOperationFactureService
        , private etatFactureService: EtatFactureService
        , private etatPaiementService: EtatPaiementService
        , private societeService: SocieteService
        , private compteComptableService: CompteComptableService
        , private declarationIsService: DeclarationIsService
        , private declarationTvaService: DeclarationTvaService
        , private demandeService: DemandeService
        , private classeComptableService: ClasseComptableService
        , private cpcFactureService: CpcFactureService
) { }

    ngOnInit(): void {
      this.loadFactures();
      this.initExport();
      this.initCol();
      this.loadTva();
      this.loadTypeOperationFacture();
      this.loadEtatFacture();
      this.loadEtatPaiement();
      this.loadSociete();
      this.loadCompteComptable();
      this.loadDeclarationIs();
      this.loadDeclarationTva();
      this.loadDemande();
      this.loadClasseComptable();
      this.loadCpcFacture();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadFactures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Facture', 'list');
        isPermistted ? this.factureService.findAll().subscribe(factures => this.factures = factures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.factureService.findByCriteria(this.searchFacture).subscribe(factures=>{
            
            this.factures = factures;
           // this.searchFacture = new FactureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'montantHorsTaxe', header: 'Montant hors taxe'},
                            {field: 'dateOperation', header: 'Date operation'},
                            {field: 'annee', header: 'Annee'},
                            {field: 'mois', header: 'Mois'},
                            {field: 'trimestre', header: 'Trimestre'},
                            {field: 'montantTtc', header: 'Montant ttc'},
                            {field: 'montantTva', header: 'Montant tva'},
                            {field: 'credit', header: 'Credit'},
                            {field: 'debit', header: 'Debit'},
                            {field: 'facturePieceJointe', header: 'Facture piece jointe'},
                        {field: 'tva?.reference', header: 'Tva'},
                        {field: 'typeOperationFacture?.libelle', header: 'Type operation facture'},
                        {field: 'etatFacture?.libelle', header: 'Etat facture'},
                        {field: 'etatPaiement?.libelle', header: 'Etat paiement'},
                        {field: 'societe?.id', header: 'Societe'},
                        {field: 'compteComptable?.libelle', header: 'Compte comptable'},
                        {field: 'declarationIs?.reference', header: 'Declaration is'},
                        {field: 'declarationTva?.reference', header: 'Declaration tva'},
                        {field: 'demande?.reference', header: 'Demande'},
                        {field: 'classeComptable?.libelle', header: 'Classe comptable'},
                        {field: 'cpcFacture?.id', header: 'Cpc facture'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editFacture(facture:FactureVo){
        const isPermistted = await this.roleService.isPermitted('Facture', 'edit');
         if(isPermistted){
          this.factureService.findByIdWithAssociatedList(facture).subscribe(res => {
           this.selectedFacture = res;
            this.selectedFacture.dateOperation = new Date(facture.dateOperation);
            this.selectedFacture.dateArchivage = new Date(facture.dateArchivage);
            this.selectedFacture.dateCreation = new Date(facture.dateCreation);
            this.editFactureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFacture(facture:FactureVo){
        const isPermistted = await this.roleService.isPermitted('Facture', 'view');
        if(isPermistted){
           this.factureService.findByIdWithAssociatedList(facture).subscribe(res => {
           this.selectedFacture = res;
            this.selectedFacture.dateOperation = new Date(facture.dateOperation);
            this.selectedFacture.dateArchivage = new Date(facture.dateArchivage);
            this.selectedFacture.dateCreation = new Date(facture.dateCreation);
            this.viewFactureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFacture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFacture = new FactureVo();
            this.createFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverFacture(facture:FactureVo){
const isPermistted = await this.roleService.isPermitted('Facture', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Facture) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.factureService.archiver(facture).subscribe(status=>{
const myIndex = this.factures.indexOf(facture);
this.factures[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Facture archivé',
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

public async desarchiverFacture(facture:FactureVo){
const isPermistted = await this.roleService.isPermitted('Facture', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Facture) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.factureService.desarchiver(facture).subscribe(status=>{
const myIndex = this.factures.indexOf(facture);
this.factures[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Facture désarchivé',
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


    public async deleteFacture(facture:FactureVo){
       const isPermistted = await this.roleService.isPermitted('Facture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Facture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.factureService.delete(facture).subscribe(status=>{
                          if(status > 0){
                          const position = this.factures.indexOf(facture);
                          position > -1 ? this.factures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Facture Supprimé',
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

public async loadTva(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.tvaService.findAll().subscribe(tvas => this.tvas = tvas,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeOperationFacture(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.typeOperationFactureService.findAll().subscribe(typeOperationFactures => this.typeOperationFactures = typeOperationFactures,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatFacture(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.etatFactureService.findAll().subscribe(etatFactures => this.etatFactures = etatFactures,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatPaiement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.etatPaiementService.findAll().subscribe(etatPaiements => this.etatPaiements = etatPaiements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCompteComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.compteComptableService.findAll().subscribe(compteComptables => this.compteComptables = compteComptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeclarationIs(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.declarationIsService.findAll().subscribe(declarationIss => this.declarationIss = declarationIss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeclarationTva(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.declarationTvaService.findAll().subscribe(declarationTvas => this.declarationTvas = declarationTvas,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDemande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.demandeService.findAll().subscribe(demandes => this.demandes = demandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadClasseComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.classeComptableService.findAll().subscribe(classeComptables => this.classeComptables = classeComptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCpcFacture(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Facture', 'list');
    isPermistted ? this.cpcFactureService.findAll().subscribe(cpcFactures => this.cpcFactures = cpcFactures,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFacture(facture: FactureVo) {

     this.factureService.findByIdWithAssociatedList(facture).subscribe(
	 res => {
	       this.initDuplicateFacture(res);
	       this.selectedFacture = res;
	       this.selectedFacture.id = null;
            this.createFactureDialog = true;

});

	}

	initDuplicateFacture(res: FactureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.factures.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Montant hors taxe': e.montantHorsTaxe ,
                    'Date operation': this.datePipe.transform(e.dateOperation , 'dd-MM-yyyy'),
                    'Annee': e.annee ,
                    'Mois': e.mois ,
                    'Trimestre': e.trimestre ,
                    'Montant ttc': e.montantTtc ,
                    'Montant tva': e.montantTva ,
                    'Credit': e.credit ,
                    'Debit': e.debit ,
                    'Facture piece jointe': e.facturePieceJointeVo ,
            'Tva': e.tvaVo?.reference ,
            'Type operation facture': e.typeOperationFactureVo?.libelle ,
            'Etat facture': e.etatFactureVo?.libelle ,
            'Etat paiement': e.etatPaiementVo?.libelle ,
            'Societe': e.societeVo?.id ,
            'Compte comptable': e.compteComptableVo?.libelle ,
            'Declaration is': e.declarationIsVo?.reference ,
            'Declaration tva': e.declarationTvaVo?.reference ,
            'Demande': e.demandeVo?.reference ,
            'Classe comptable': e.classeComptableVo?.libelle ,
            'Cpc facture': e.cpcFactureVo?.id ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchFacture.reference ? this.searchFacture.reference : environment.emptyForExport ,
            'Libelle': this.searchFacture.libelle ? this.searchFacture.libelle : environment.emptyForExport ,
            'Montant hors taxe Min': this.searchFacture.montantHorsTaxeMin ? this.searchFacture.montantHorsTaxeMin : environment.emptyForExport ,
            'Montant hors taxe Max': this.searchFacture.montantHorsTaxeMax ? this.searchFacture.montantHorsTaxeMax : environment.emptyForExport ,
            'Date operation Min': this.searchFacture.dateOperationMin ? this.datePipe.transform(this.searchFacture.dateOperationMin , this.dateFormat) : environment.emptyForExport ,
            'Date operation Max': this.searchFacture.dateOperationMax ? this.datePipe.transform(this.searchFacture.dateOperationMax , this.dateFormat) : environment.emptyForExport ,
            'Annee Min': this.searchFacture.anneeMin ? this.searchFacture.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchFacture.anneeMax ? this.searchFacture.anneeMax : environment.emptyForExport ,
            'Mois Min': this.searchFacture.moisMin ? this.searchFacture.moisMin : environment.emptyForExport ,
            'Mois Max': this.searchFacture.moisMax ? this.searchFacture.moisMax : environment.emptyForExport ,
            'Trimestre Min': this.searchFacture.trimestreMin ? this.searchFacture.trimestreMin : environment.emptyForExport ,
            'Trimestre Max': this.searchFacture.trimestreMax ? this.searchFacture.trimestreMax : environment.emptyForExport ,
            'Montant ttc Min': this.searchFacture.montantTtcMin ? this.searchFacture.montantTtcMin : environment.emptyForExport ,
            'Montant ttc Max': this.searchFacture.montantTtcMax ? this.searchFacture.montantTtcMax : environment.emptyForExport ,
            'Montant tva Min': this.searchFacture.montantTvaMin ? this.searchFacture.montantTvaMin : environment.emptyForExport ,
            'Montant tva Max': this.searchFacture.montantTvaMax ? this.searchFacture.montantTvaMax : environment.emptyForExport ,
            'Credit': this.searchFacture.credit ? this.searchFacture.credit : environment.emptyForExport ,
            'Debit': this.searchFacture.debit ? this.searchFacture.debit : environment.emptyForExport ,
            'Facture piece jointe Min': this.searchFacture.facturePieceJointeMin ? this.searchFacture.facturePieceJointeMin : environment.emptyForExport ,
            'Facture piece jointe Max': this.searchFacture.facturePieceJointeMax ? this.searchFacture.facturePieceJointeMax : environment.emptyForExport ,
        'Tva': this.searchFacture.tvaVo?.reference ? this.searchFacture.tvaVo?.reference : environment.emptyForExport ,
        'Type operation facture': this.searchFacture.typeOperationFactureVo?.libelle ? this.searchFacture.typeOperationFactureVo?.libelle : environment.emptyForExport ,
        'Etat facture': this.searchFacture.etatFactureVo?.libelle ? this.searchFacture.etatFactureVo?.libelle : environment.emptyForExport ,
        'Etat paiement': this.searchFacture.etatPaiementVo?.libelle ? this.searchFacture.etatPaiementVo?.libelle : environment.emptyForExport ,
        'Societe': this.searchFacture.societeVo?.id ? this.searchFacture.societeVo?.id : environment.emptyForExport ,
        'Compte comptable': this.searchFacture.compteComptableVo?.libelle ? this.searchFacture.compteComptableVo?.libelle : environment.emptyForExport ,
        'Declaration is': this.searchFacture.declarationIsVo?.reference ? this.searchFacture.declarationIsVo?.reference : environment.emptyForExport ,
        'Declaration tva': this.searchFacture.declarationTvaVo?.reference ? this.searchFacture.declarationTvaVo?.reference : environment.emptyForExport ,
        'Demande': this.searchFacture.demandeVo?.reference ? this.searchFacture.demandeVo?.reference : environment.emptyForExport ,
        'Classe comptable': this.searchFacture.classeComptableVo?.libelle ? this.searchFacture.classeComptableVo?.libelle : environment.emptyForExport ,
        'Cpc facture': this.searchFacture.cpcFactureVo?.id ? this.searchFacture.cpcFactureVo?.id : environment.emptyForExport ,
            'Archive': this.searchFacture.archive ? (this.searchFacture.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchFacture.dateArchivageMin ? this.datePipe.transform(this.searchFacture.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchFacture.dateArchivageMax ? this.datePipe.transform(this.searchFacture.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchFacture.dateCreationMin ? this.datePipe.transform(this.searchFacture.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchFacture.dateCreationMax ? this.datePipe.transform(this.searchFacture.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchFacture.admin ? (this.searchFacture.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchFacture.visible ? (this.searchFacture.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchFacture.username ? this.searchFacture.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get factures(): Array<FactureVo> {
           return this.factureService.factures;
       }
    set factures(value: Array<FactureVo>) {
        this.factureService.factures = value;
       }

    get factureSelections(): Array<FactureVo> {
           return this.factureService.factureSelections;
       }
    set factureSelections(value: Array<FactureVo>) {
        this.factureService.factureSelections = value;
       }
   
     


    get selectedFacture():FactureVo {
           return this.factureService.selectedFacture;
       }
    set selectedFacture(value: FactureVo) {
        this.factureService.selectedFacture = value;
       }
    
    get createFactureDialog():boolean {
           return this.factureService.createFactureDialog;
       }
    set createFactureDialog(value: boolean) {
        this.factureService.createFactureDialog= value;
       }
    
    get editFactureDialog():boolean {
           return this.factureService.editFactureDialog;
       }
    set editFactureDialog(value: boolean) {
        this.factureService.editFactureDialog= value;
       }
    get viewFactureDialog():boolean {
           return this.factureService.viewFactureDialog;
       }
    set viewFactureDialog(value: boolean) {
        this.factureService.viewFactureDialog = value;
       }
       
     get searchFacture(): FactureVo {
        return this.factureService.searchFacture;
       }
    set searchFacture(value: FactureVo) {
        this.factureService.searchFacture = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
