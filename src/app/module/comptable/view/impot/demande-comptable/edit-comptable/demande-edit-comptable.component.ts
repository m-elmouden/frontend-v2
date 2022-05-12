import {Component, OnInit} from '@angular/core';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';

@Component({
  selector: 'app-demande-edit-comptable',
  templateUrl: './demande-edit-comptable.component.html',
  styleUrls: ['./demande-edit-comptable.component.css']
})
export class DemandeEditComptableComponent implements OnInit {

        selectedFactures: FactureVo = new FactureVo();
        facturesListe: Array<FactureVo> = [];

        myTvas: Array<TvaVo> = [];
        myTypeOperationFactures: Array<TypeOperationFactureVo> = [];
        myEtatFactures: Array<EtatFactureVo> = [];
        myEtatPaiements: Array<EtatPaiementVo> = [];
        mySocietes: Array<SocieteVo> = [];
        myCompteComptables: Array<CompteComptableVo> = [];
        myDeclarationIss: Array<DeclarationIsVo> = [];
        myDeclarationTvas: Array<DeclarationTvaVo> = [];
        myClasseComptables: Array<ClasseComptableVo> = [];
        myCpcFactures: Array<CpcFactureVo> = [];

        selectedDemandePieceJointes: DemandePieceJointeVo = new DemandePieceJointeVo();
        demandePieceJointesListe: Array<DemandePieceJointeVo> = [];


        selectedCommentaires: CommentaireVo = new CommentaireVo();
        commentairesListe: Array<CommentaireVo> = [];



constructor(private datePipe: DatePipe, private demandeService: DemandeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private classeComptableService: ClasseComptableService
 ,       private etatFactureService: EtatFactureService
 ,       private etatDemandeService: EtatDemandeService
 ,       private demandePieceJointeService: DemandePieceJointeService
 ,       private commentaireService: CommentaireService
 ,       private cpcFactureService: CpcFactureService
 ,       private declarationIsService: DeclarationIsService
 ,       private declarationTvaService: DeclarationTvaService
 ,       private factureService: FactureService
 ,       private etatPaiementService: EtatPaiementService
 ,       private compteComptableService: CompteComptableService
 ,       private comptableService: ComptableService
 ,       private tvaService: TvaService
 ,       private typeOperationFactureService: TypeOperationFactureService
) {
}

// methods
ngOnInit(): void {
                this.selectedFactures.tvaVo = new TvaVo();
                this.tvaService.findAll().subscribe((data) => this.tvas = data);
                this.selectedFactures.typeOperationFactureVo = new TypeOperationFactureVo();
                this.typeOperationFactureService.findAll().subscribe((data) => this.typeOperationFactures = data);
                this.selectedFactures.etatFactureVo = new EtatFactureVo();
                this.etatFactureService.findAll().subscribe((data) => this.etatFactures = data);
                this.selectedFactures.etatPaiementVo = new EtatPaiementVo();
                this.etatPaiementService.findAll().subscribe((data) => this.etatPaiements = data);
                this.selectedFactures.societeVo = new SocieteVo();
                this.societeService.findAll().subscribe((data) => this.societes = data);
                this.selectedFactures.compteComptableVo = new CompteComptableVo();
                this.compteComptableService.findAll().subscribe((data) => this.compteComptables = data);
                this.selectedFactures.declarationIsVo = new DeclarationIsVo();
                this.declarationIsService.findAll().subscribe((data) => this.declarationIss = data);
                this.selectedFactures.declarationTvaVo = new DeclarationTvaVo();
                this.declarationTvaService.findAll().subscribe((data) => this.declarationTvas = data);
                this.selectedFactures.classeComptableVo = new ClasseComptableVo();
                this.classeComptableService.findAll().subscribe((data) => this.classeComptables = data);
                this.selectedFactures.cpcFactureVo = new CpcFactureVo();
                this.cpcFactureService.findAll().subscribe((data) => this.cpcFactures = data);
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedComptable = new ComptableVo();
    this.comptableService.findAll().subscribe((data) => this.comptables = data);
    this.selectedEtatDemande = new EtatDemandeVo();
    this.etatDemandeService.findAll().subscribe((data) => this.etatDemandes = data);
}
        addFactures() {
        if( this.selectedDemande.facturesVo == null ){
            this.selectedDemande.facturesVo = new Array<FactureVo>();
        }
        this.selectedDemande.facturesVo.push(this.selectedFactures);
        this.selectedFactures = new FactureVo();
        }

       deleteFactures(p: FactureVo) {
        this.selectedDemande.facturesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemande.facturesVo.splice(index, 1); }
        });
    }
        addDemandePieceJointes() {
        if( this.selectedDemande.demandePieceJointesVo == null ){
            this.selectedDemande.demandePieceJointesVo = new Array<DemandePieceJointeVo>();
        }
        this.selectedDemande.demandePieceJointesVo.push(this.selectedDemandePieceJointes);
        this.selectedDemandePieceJointes = new DemandePieceJointeVo();
        }

       deleteDemandePieceJointes(p: DemandePieceJointeVo) {
        this.selectedDemande.demandePieceJointesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemande.demandePieceJointesVo.splice(index, 1); }
        });
    }
        addCommentaires() {
        if( this.selectedDemande.commentairesVo == null ){
            this.selectedDemande.commentairesVo = new Array<CommentaireVo>();
        }
        this.selectedDemande.commentairesVo.push(this.selectedCommentaires);
        this.selectedCommentaires = new CommentaireVo();
        }

       deleteCommentaires(p: CommentaireVo) {
        this.selectedDemande.commentairesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemande.commentairesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDemande.dateDemande = DateUtils.toDate(this.selectedDemande.dateDemande);
            this.selectedDemande.dateArchivage = DateUtils.toDate(this.selectedDemande.dateArchivage);
            this.selectedDemande.dateCreation = DateUtils.toDate(this.selectedDemande.dateCreation);
    this.demandeService.edit().subscribe(demande=>{
    const myIndex = this.demandes.findIndex(e => e.id === this.selectedDemande.id);
    this.demandes[myIndex] = this.selectedDemande;
    this.editDemandeDialog = false;
    this.selectedDemande = new DemandeVo();


    }, error => {
        console.log(error);
    });

}

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
              public async openCreatecomptable(comptable: string) {
                      const isPermistted = await this.roleService.isPermitted('Comptable', 'add');
                       if(isPermistted){
         this.selectedComptable = new ComptableVo();
        this.createComptableDialog = true;
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
              public async openCreateetatDemande(etatDemande: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDemande', 'add');
                       if(isPermistted){
         this.selectedEtatDemande = new EtatDemandeVo();
        this.createEtatDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDemandeDialog  = false;
}

// getters and setters

get demandes(): Array<DemandeVo> {
    return this.demandeService.demandes;
       }
set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }

 get selectedDemande(): DemandeVo {
           return this.demandeService.selectedDemande;
       }
    set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }

   get editDemandeDialog(): boolean {
           return this.demandeService.editDemandeDialog;

       }
    set editDemandeDialog(value: boolean) {
        this.demandeService.editDemandeDialog = value;
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
       get selectedComptable(): ComptableVo {
           return this.comptableService.selectedComptable;
       }
      set selectedComptable(value: ComptableVo) {
        this.comptableService.selectedComptable = value;
       }
       get comptables(): Array<ComptableVo> {
           return this.comptableService.comptables;
       }
       set comptables(value: Array<ComptableVo>) {
        this.comptableService.comptables = value;
       }
       get createComptableDialog(): boolean {
           return this.comptableService.createComptableDialog;
       }
      set createComptableDialog(value: boolean) {
        this.comptableService.createComptableDialog= value;
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
       get selectedEtatDemande(): EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
      set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }
       get etatDemandes(): Array<EtatDemandeVo> {
           return this.etatDemandeService.etatDemandes;
       }
       set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }
       get createEtatDemandeDialog(): boolean {
           return this.etatDemandeService.createEtatDemandeDialog;
       }
      set createEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.createEtatDemandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
