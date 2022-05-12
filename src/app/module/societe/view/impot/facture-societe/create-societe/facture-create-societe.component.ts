import {Component, OnInit, Input} from '@angular/core';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {TvaService} from '../../../../../../controller/service/Tva.service';
@Component({
  selector: 'app-facture-create-societe',
  templateUrl: './facture-create-societe.component.html',
  styleUrls: ['./facture-create-societe.component.css']
})
export class FactureCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFactureReference = true;
   _validFactureLibelle = true;
   _validFactureMontantHorsTaxe = true;
   _validFactureDateOperation = true;
   _validFactureMontantTtc = true;
   _validFactureMontantTva = true;
   _validFactureTypeOperationFacture = true;
   _validFactureSociete = true;
   _validFactureCompteComptable = true;
   _validFactureClasseComptable = true;

    _validTvaReference = true;
    _validTvaPourcentage = true;
    _validTypeOperationFactureLibelle = true;
    _validTypeOperationFactureTypeOperationSociete = true;
    _validEtatFactureLibelle = true;
    _validEtatPaiementLibelle = true;
    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validCompteComptableLibelle = true;
    _validCompteComptableNumero = true;
    _validCompteComptableSousClasseComptable = true;
    _validDeclarationIsReference = true;
    _validDeclarationIsAnnee = true;
    _validDeclarationIsSociete = true;
    _validDeclarationIsTauxIs = true;
    _validDeclarationIsEtatDeclarationIs = true;
    _validDeclarationTvaReference = true;
    _validDeclarationTvaSociete = true;
    _validDeclarationTvaTypeDeclarationTva = true;
    _validDeclarationTvaEtatDeclarationTva = true;
    _validDemandeReference = true;
    _validDemandeOperation = true;
    _validDemandeDateDemande = true;
    _validDemandeSociete = true;
    _validDemandeComptable = true;
    _validDemandeEtatDemande = true;
    _validClasseComptableLibelle = true;
    _validClasseComptableNumero = true;
    _validCpcFactureCpc = true;
    _validCpcFactureFacture = true;



constructor(private datePipe: DatePipe, private factureService: FactureService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatFactureService :EtatFactureService
,       private classeComptableService :ClasseComptableService
,       private cpcFactureService :CpcFactureService
,       private etatPaiementService :EtatPaiementService
,       private declarationTvaService :DeclarationTvaService
,       private demandeService :DemandeService
,       private societeService :SocieteService
,       private typeOperationFactureService :TypeOperationFactureService
,       private compteComptableService :CompteComptableService
,       private declarationIsService :DeclarationIsService
,       private tvaService :TvaService
) {

}


// methods
ngOnInit(): void {

    this.selectedTva = new TvaVo();
    this.tvaService.findAll().subscribe((data) => this.tvas = data);
    this.selectedTypeOperationFacture = new TypeOperationFactureVo();
    this.typeOperationFactureService.findAll().subscribe((data) => this.typeOperationFactures = data);
    this.selectedEtatFacture = new EtatFactureVo();
    this.etatFactureService.findAll().subscribe((data) => this.etatFactures = data);
    this.selectedEtatPaiement = new EtatPaiementVo();
    this.etatPaiementService.findAll().subscribe((data) => this.etatPaiements = data);
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedCompteComptable = new CompteComptableVo();
    this.compteComptableService.findAll().subscribe((data) => this.compteComptables = data);
    this.selectedDeclarationIs = new DeclarationIsVo();
    this.declarationIsService.findAll().subscribe((data) => this.declarationIss = data);
    this.selectedDeclarationTva = new DeclarationTvaVo();
    this.declarationTvaService.findAll().subscribe((data) => this.declarationTvas = data);
    this.selectedDemande = new DemandeVo();
    this.demandeService.findAll().subscribe((data) => this.demandes = data);
    this.selectedClasseComptable = new ClasseComptableVo();
    this.classeComptableService.findAll().subscribe((data) => this.classeComptables = data);
    this.selectedCpcFacture = new CpcFactureVo();
    this.cpcFactureService.findAll().subscribe((data) => this.cpcFactures = data);
}




private setValidation(value : boolean){
    this.validFactureReference = value;
    this.validFactureLibelle = value;
    this.validFactureMontantHorsTaxe = value;
    this.validFactureDateOperation = value;
    this.validFactureMontantTtc = value;
    this.validFactureMontantTva = value;
    this.validFactureTypeOperationFacture = value;
    this.validFactureSociete = value;
    this.validFactureCompteComptable = value;
    this.validFactureClasseComptable = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.factureService.save().subscribe(facture=>{
       this.factures.push({...facture});
       this.createFactureDialog = false;
       this.submitted = false;
       this.selectedFacture = new FactureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFactureReference();
this.validateFactureLibelle();
this.validateFactureMontantHorsTaxe();
this.validateFactureDateOperation();
this.validateFactureMontantTtc();
this.validateFactureMontantTva();
this.validateFactureTypeOperationFacture();
this.validateFactureSociete();
this.validateFactureCompteComptable();
this.validateFactureClasseComptable();

    }

private validateFactureReference(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validFactureReference = false;
        } else {
            this.validFactureReference = true;
        }
    }
private validateFactureLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validFactureLibelle = false;
        } else {
            this.validFactureLibelle = true;
        }
    }
private validateFactureMontantHorsTaxe(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.montantHorsTaxe)) {
            this.errorMessages.push('Montant hors taxe non valide');
            this.validFactureMontantHorsTaxe = false;
        } else {
            this.validFactureMontantHorsTaxe = true;
        }
    }
private validateFactureDateOperation(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.dateOperation)) {
            this.errorMessages.push('Date operation non valide');
            this.validFactureDateOperation = false;
        } else {
            this.validFactureDateOperation = true;
        }
    }
private validateFactureMontantTtc(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.montantTtc)) {
            this.errorMessages.push('Montant ttc non valide');
            this.validFactureMontantTtc = false;
        } else {
            this.validFactureMontantTtc = true;
        }
    }
private validateFactureMontantTva(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.montantTva)) {
            this.errorMessages.push('Montant tva non valide');
            this.validFactureMontantTva = false;
        } else {
            this.validFactureMontantTva = true;
        }
    }
private validateFactureTypeOperationFacture(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.typeOperationFactureVo)) {
            this.errorMessages.push('Type operation facture non valide');
            this.validFactureTypeOperationFacture = false;
        } else {
            this.validFactureTypeOperationFacture = true;
        }
    }
private validateFactureSociete(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validFactureSociete = false;
        } else {
            this.validFactureSociete = true;
        }
    }
private validateFactureCompteComptable(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.compteComptableVo)) {
            this.errorMessages.push('Compte comptable non valide');
            this.validFactureCompteComptable = false;
        } else {
            this.validFactureCompteComptable = true;
        }
    }
private validateFactureClasseComptable(){
        if (this.stringUtilService.isEmpty(this.selectedFacture.classeComptableVo)) {
            this.errorMessages.push('Classe comptable non valide');
            this.validFactureClasseComptable = false;
        } else {
            this.validFactureClasseComptable = true;
        }
    }

































//openPopup
              public async openCreatedeclarationIs(declarationIs: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'add');
                       if(isPermistted){
         this.selectedDeclarationIs = new DeclarationIsVo();
        this.createDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecompteComptable(compteComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('CompteComptable', 'add');
                       if(isPermistted){
         this.selectedCompteComptable = new CompteComptableVo();
        this.createCompteComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecpcFacture(cpcFacture: string) {
                      const isPermistted = await this.roleService.isPermitted('CpcFacture', 'add');
                       if(isPermistted){
         this.selectedCpcFacture = new CpcFactureVo();
        this.createCpcFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedemande(demande: string) {
                      const isPermistted = await this.roleService.isPermitted('Demande', 'add');
                       if(isPermistted){
         this.selectedDemande = new DemandeVo();
        this.createDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesociete(societe: string) {
                      const isPermistted = await this.roleService.isPermitted('Societe', 'add');
                       if(isPermistted){
         this.selectedSociete = new SocieteVo();
        this.createSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateclasseComptable(classeComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'add');
                       if(isPermistted){
         this.selectedClasseComptable = new ClasseComptableVo();
        this.createClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetva(tva: string) {
                      const isPermistted = await this.roleService.isPermitted('Tva', 'add');
                       if(isPermistted){
         this.selectedTva = new TvaVo();
        this.createTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeOperationFacture(typeOperationFacture: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeOperationFacture', 'add');
                       if(isPermistted){
         this.selectedTypeOperationFacture = new TypeOperationFactureVo();
        this.createTypeOperationFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatFacture(etatFacture: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatFacture', 'add');
                       if(isPermistted){
         this.selectedEtatFacture = new EtatFactureVo();
        this.createEtatFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedeclarationTva(declarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'add');
                       if(isPermistted){
         this.selectedDeclarationTva = new DeclarationTvaVo();
        this.createDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatPaiement(etatPaiement: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatPaiement', 'add');
                       if(isPermistted){
         this.selectedEtatPaiement = new EtatPaiementVo();
        this.createEtatPaiementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createFactureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get factures(): Array<FactureVo> {
    return this.factureService.factures;
       }
set factures(value: Array<FactureVo>) {
        this.factureService.factures = value;
       }

 get selectedFacture():FactureVo {
           return this.factureService.selectedFacture;
       }
    set selectedFacture(value: FactureVo) {
        this.factureService.selectedFacture = value;
       }

   get createFactureDialog(): boolean {
           return this.factureService.createFactureDialog;

       }
    set createFactureDialog(value: boolean) {
        this.factureService.createFactureDialog= value;
       }

       get selectedDeclarationIs(): DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
      set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }
       get declarationIss(): Array<DeclarationIsVo> {
           return this.declarationIsService.declarationIss;
       }
       set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }
       get createDeclarationIsDialog(): boolean {
           return this.declarationIsService.createDeclarationIsDialog;
       }
      set createDeclarationIsDialog(value: boolean) {
        this.declarationIsService.createDeclarationIsDialog= value;
       }
       get selectedCompteComptable(): CompteComptableVo {
           return this.compteComptableService.selectedCompteComptable;
       }
      set selectedCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.selectedCompteComptable = value;
       }
       get compteComptables(): Array<CompteComptableVo> {
           return this.compteComptableService.compteComptables;
       }
       set compteComptables(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptables = value;
       }
       get createCompteComptableDialog(): boolean {
           return this.compteComptableService.createCompteComptableDialog;
       }
      set createCompteComptableDialog(value: boolean) {
        this.compteComptableService.createCompteComptableDialog= value;
       }
       get selectedCpcFacture(): CpcFactureVo {
           return this.cpcFactureService.selectedCpcFacture;
       }
      set selectedCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.selectedCpcFacture = value;
       }
       get cpcFactures(): Array<CpcFactureVo> {
           return this.cpcFactureService.cpcFactures;
       }
       set cpcFactures(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactures = value;
       }
       get createCpcFactureDialog(): boolean {
           return this.cpcFactureService.createCpcFactureDialog;
       }
      set createCpcFactureDialog(value: boolean) {
        this.cpcFactureService.createCpcFactureDialog= value;
       }
       get selectedDemande(): DemandeVo {
           return this.demandeService.selectedDemande;
       }
      set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }
       get demandes(): Array<DemandeVo> {
           return this.demandeService.demandes;
       }
       set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }
       get createDemandeDialog(): boolean {
           return this.demandeService.createDemandeDialog;
       }
      set createDemandeDialog(value: boolean) {
        this.demandeService.createDemandeDialog= value;
       }
       get selectedSociete(): SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes(): Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get createSocieteDialog(): boolean {
           return this.societeService.createSocieteDialog;
       }
      set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog= value;
       }
       get selectedClasseComptable(): ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
      set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }
       get classeComptables(): Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptables;
       }
       set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }
       get createClasseComptableDialog(): boolean {
           return this.classeComptableService.createClasseComptableDialog;
       }
      set createClasseComptableDialog(value: boolean) {
        this.classeComptableService.createClasseComptableDialog= value;
       }
       get selectedTva(): TvaVo {
           return this.tvaService.selectedTva;
       }
      set selectedTva(value: TvaVo) {
        this.tvaService.selectedTva = value;
       }
       get tvas(): Array<TvaVo> {
           return this.tvaService.tvas;
       }
       set tvas(value: Array<TvaVo>) {
        this.tvaService.tvas = value;
       }
       get createTvaDialog(): boolean {
           return this.tvaService.createTvaDialog;
       }
      set createTvaDialog(value: boolean) {
        this.tvaService.createTvaDialog= value;
       }
       get selectedTypeOperationFacture(): TypeOperationFactureVo {
           return this.typeOperationFactureService.selectedTypeOperationFacture;
       }
      set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.selectedTypeOperationFacture = value;
       }
       get typeOperationFactures(): Array<TypeOperationFactureVo> {
           return this.typeOperationFactureService.typeOperationFactures;
       }
       set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactures = value;
       }
       get createTypeOperationFactureDialog(): boolean {
           return this.typeOperationFactureService.createTypeOperationFactureDialog;
       }
      set createTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.createTypeOperationFactureDialog= value;
       }
       get selectedEtatFacture(): EtatFactureVo {
           return this.etatFactureService.selectedEtatFacture;
       }
      set selectedEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.selectedEtatFacture = value;
       }
       get etatFactures(): Array<EtatFactureVo> {
           return this.etatFactureService.etatFactures;
       }
       set etatFactures(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactures = value;
       }
       get createEtatFactureDialog(): boolean {
           return this.etatFactureService.createEtatFactureDialog;
       }
      set createEtatFactureDialog(value: boolean) {
        this.etatFactureService.createEtatFactureDialog= value;
       }
       get selectedDeclarationTva(): DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
      set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }
       get declarationTvas(): Array<DeclarationTvaVo> {
           return this.declarationTvaService.declarationTvas;
       }
       set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }
       get createDeclarationTvaDialog(): boolean {
           return this.declarationTvaService.createDeclarationTvaDialog;
       }
      set createDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.createDeclarationTvaDialog= value;
       }
       get selectedEtatPaiement(): EtatPaiementVo {
           return this.etatPaiementService.selectedEtatPaiement;
       }
      set selectedEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.selectedEtatPaiement = value;
       }
       get etatPaiements(): Array<EtatPaiementVo> {
           return this.etatPaiementService.etatPaiements;
       }
       set etatPaiements(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiements = value;
       }
       get createEtatPaiementDialog(): boolean {
           return this.etatPaiementService.createEtatPaiementDialog;
       }
      set createEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.createEtatPaiementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validFactureReference(): boolean {
    return this._validFactureReference;
    }

    set validFactureReference(value: boolean) {
    this._validFactureReference = value;
    }
    get validFactureLibelle(): boolean {
    return this._validFactureLibelle;
    }

    set validFactureLibelle(value: boolean) {
    this._validFactureLibelle = value;
    }
    get validFactureMontantHorsTaxe(): boolean {
    return this._validFactureMontantHorsTaxe;
    }

    set validFactureMontantHorsTaxe(value: boolean) {
    this._validFactureMontantHorsTaxe = value;
    }
    get validFactureDateOperation(): boolean {
    return this._validFactureDateOperation;
    }

    set validFactureDateOperation(value: boolean) {
    this._validFactureDateOperation = value;
    }
    get validFactureMontantTtc(): boolean {
    return this._validFactureMontantTtc;
    }

    set validFactureMontantTtc(value: boolean) {
    this._validFactureMontantTtc = value;
    }
    get validFactureMontantTva(): boolean {
    return this._validFactureMontantTva;
    }

    set validFactureMontantTva(value: boolean) {
    this._validFactureMontantTva = value;
    }
    get validFactureTypeOperationFacture(): boolean {
    return this._validFactureTypeOperationFacture;
    }

    set validFactureTypeOperationFacture(value: boolean) {
    this._validFactureTypeOperationFacture = value;
    }
    get validFactureSociete(): boolean {
    return this._validFactureSociete;
    }

    set validFactureSociete(value: boolean) {
    this._validFactureSociete = value;
    }
    get validFactureCompteComptable(): boolean {
    return this._validFactureCompteComptable;
    }

    set validFactureCompteComptable(value: boolean) {
    this._validFactureCompteComptable = value;
    }
    get validFactureClasseComptable(): boolean {
    return this._validFactureClasseComptable;
    }

    set validFactureClasseComptable(value: boolean) {
    this._validFactureClasseComptable = value;
    }

    get validTvaReference(): boolean {
    return this._validTvaReference;
    }

    set validTvaReference(value: boolean) {
    this._validTvaReference = value;
    }
    get validTvaPourcentage(): boolean {
    return this._validTvaPourcentage;
    }

    set validTvaPourcentage(value: boolean) {
    this._validTvaPourcentage = value;
    }
    get validTypeOperationFactureLibelle(): boolean {
    return this._validTypeOperationFactureLibelle;
    }

    set validTypeOperationFactureLibelle(value: boolean) {
    this._validTypeOperationFactureLibelle = value;
    }
    get validTypeOperationFactureTypeOperationSociete(): boolean {
    return this._validTypeOperationFactureTypeOperationSociete;
    }

    set validTypeOperationFactureTypeOperationSociete(value: boolean) {
    this._validTypeOperationFactureTypeOperationSociete = value;
    }
    get validEtatFactureLibelle(): boolean {
    return this._validEtatFactureLibelle;
    }

    set validEtatFactureLibelle(value: boolean) {
    this._validEtatFactureLibelle = value;
    }
    get validEtatPaiementLibelle(): boolean {
    return this._validEtatPaiementLibelle;
    }

    set validEtatPaiementLibelle(value: boolean) {
    this._validEtatPaiementLibelle = value;
    }
    get validSocieteIce(): boolean {
    return this._validSocieteIce;
    }

    set validSocieteIce(value: boolean) {
    this._validSocieteIce = value;
    }
    get validSocieteRaisonSociale(): boolean {
    return this._validSocieteRaisonSociale;
    }

    set validSocieteRaisonSociale(value: boolean) {
    this._validSocieteRaisonSociale = value;
    }
    get validSocieteDateCreation(): boolean {
    return this._validSocieteDateCreation;
    }

    set validSocieteDateCreation(value: boolean) {
    this._validSocieteDateCreation = value;
    }
    get validSocieteAge(): boolean {
    return this._validSocieteAge;
    }

    set validSocieteAge(value: boolean) {
    this._validSocieteAge = value;
    }
    get validSocietePresidentSociete(): boolean {
    return this._validSocietePresidentSociete;
    }

    set validSocietePresidentSociete(value: boolean) {
    this._validSocietePresidentSociete = value;
    }
    get validCompteComptableLibelle(): boolean {
    return this._validCompteComptableLibelle;
    }

    set validCompteComptableLibelle(value: boolean) {
    this._validCompteComptableLibelle = value;
    }
    get validCompteComptableNumero(): boolean {
    return this._validCompteComptableNumero;
    }

    set validCompteComptableNumero(value: boolean) {
    this._validCompteComptableNumero = value;
    }
    get validCompteComptableSousClasseComptable(): boolean {
    return this._validCompteComptableSousClasseComptable;
    }

    set validCompteComptableSousClasseComptable(value: boolean) {
    this._validCompteComptableSousClasseComptable = value;
    }
    get validDeclarationIsReference(): boolean {
    return this._validDeclarationIsReference;
    }

    set validDeclarationIsReference(value: boolean) {
    this._validDeclarationIsReference = value;
    }
    get validDeclarationIsAnnee(): boolean {
    return this._validDeclarationIsAnnee;
    }

    set validDeclarationIsAnnee(value: boolean) {
    this._validDeclarationIsAnnee = value;
    }
    get validDeclarationIsSociete(): boolean {
    return this._validDeclarationIsSociete;
    }

    set validDeclarationIsSociete(value: boolean) {
    this._validDeclarationIsSociete = value;
    }
    get validDeclarationIsTauxIs(): boolean {
    return this._validDeclarationIsTauxIs;
    }

    set validDeclarationIsTauxIs(value: boolean) {
    this._validDeclarationIsTauxIs = value;
    }
    get validDeclarationIsEtatDeclarationIs(): boolean {
    return this._validDeclarationIsEtatDeclarationIs;
    }

    set validDeclarationIsEtatDeclarationIs(value: boolean) {
    this._validDeclarationIsEtatDeclarationIs = value;
    }
    get validDeclarationTvaReference(): boolean {
    return this._validDeclarationTvaReference;
    }

    set validDeclarationTvaReference(value: boolean) {
    this._validDeclarationTvaReference = value;
    }
    get validDeclarationTvaSociete(): boolean {
    return this._validDeclarationTvaSociete;
    }

    set validDeclarationTvaSociete(value: boolean) {
    this._validDeclarationTvaSociete = value;
    }
    get validDeclarationTvaTypeDeclarationTva(): boolean {
    return this._validDeclarationTvaTypeDeclarationTva;
    }

    set validDeclarationTvaTypeDeclarationTva(value: boolean) {
    this._validDeclarationTvaTypeDeclarationTva = value;
    }
    get validDeclarationTvaEtatDeclarationTva(): boolean {
    return this._validDeclarationTvaEtatDeclarationTva;
    }

    set validDeclarationTvaEtatDeclarationTva(value: boolean) {
    this._validDeclarationTvaEtatDeclarationTva = value;
    }
    get validDemandeReference(): boolean {
    return this._validDemandeReference;
    }

    set validDemandeReference(value: boolean) {
    this._validDemandeReference = value;
    }
    get validDemandeOperation(): boolean {
    return this._validDemandeOperation;
    }

    set validDemandeOperation(value: boolean) {
    this._validDemandeOperation = value;
    }
    get validDemandeDateDemande(): boolean {
    return this._validDemandeDateDemande;
    }

    set validDemandeDateDemande(value: boolean) {
    this._validDemandeDateDemande = value;
    }
    get validDemandeSociete(): boolean {
    return this._validDemandeSociete;
    }

    set validDemandeSociete(value: boolean) {
    this._validDemandeSociete = value;
    }
    get validDemandeComptable(): boolean {
    return this._validDemandeComptable;
    }

    set validDemandeComptable(value: boolean) {
    this._validDemandeComptable = value;
    }
    get validDemandeEtatDemande(): boolean {
    return this._validDemandeEtatDemande;
    }

    set validDemandeEtatDemande(value: boolean) {
    this._validDemandeEtatDemande = value;
    }
    get validClasseComptableLibelle(): boolean {
    return this._validClasseComptableLibelle;
    }

    set validClasseComptableLibelle(value: boolean) {
    this._validClasseComptableLibelle = value;
    }
    get validClasseComptableNumero(): boolean {
    return this._validClasseComptableNumero;
    }

    set validClasseComptableNumero(value: boolean) {
    this._validClasseComptableNumero = value;
    }
    get validCpcFactureCpc(): boolean {
    return this._validCpcFactureCpc;
    }

    set validCpcFactureCpc(value: boolean) {
    this._validCpcFactureCpc = value;
    }
    get validCpcFactureFacture(): boolean {
    return this._validCpcFactureFacture;
    }

    set validCpcFactureFacture(value: boolean) {
    this._validCpcFactureFacture = value;
    }

}
