import {Component, OnInit} from '@angular/core';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-demande-view-comptable',
  templateUrl: './demande-view-comptable.component.html',
  styleUrls: ['./demande-view-comptable.component.css']
})
export class DemandeViewComptableComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private classeComptableService :ClasseComptableService
    ,private etatFactureService :EtatFactureService
    ,private etatDemandeService :EtatDemandeService
    ,private demandePieceJointeService :DemandePieceJointeService
    ,private commentaireService :CommentaireService
    ,private cpcFactureService :CpcFactureService
    ,private declarationIsService :DeclarationIsService
    ,private declarationTvaService :DeclarationTvaService
    ,private factureService :FactureService
    ,private etatPaiementService :EtatPaiementService
    ,private compteComptableService :CompteComptableService
    ,private comptableService :ComptableService
    ,private tvaService :TvaService
    ,private typeOperationFactureService :TypeOperationFactureService
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

hideViewDialog(){
    this.viewDemandeDialog  = false;
}

// getters and setters

get demandes(): Array<DemandeVo> {
    return this.demandeService.demandes;
       }
set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }

 get selectedDemande():DemandeVo {
           return this.demandeService.selectedDemande;
       }
    set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }

   get viewDemandeDialog():boolean {
           return this.demandeService.viewDemandeDialog;

       }
    set viewDemandeDialog(value: boolean) {
        this.demandeService.viewDemandeDialog= value;
       }

       get selectedDeclarationIs():DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
      set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }
       get declarationIss():Array<DeclarationIsVo> {
           return this.declarationIsService.declarationIss;
       }
       set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }
       get editDeclarationIsDialog():boolean {
           return this.declarationIsService.editDeclarationIsDialog;
       }
      set editDeclarationIsDialog(value: boolean) {
        this.declarationIsService.editDeclarationIsDialog= value;
       }
       get selectedCompteComptable():CompteComptableVo {
           return this.compteComptableService.selectedCompteComptable;
       }
      set selectedCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.selectedCompteComptable = value;
       }
       get compteComptables():Array<CompteComptableVo> {
           return this.compteComptableService.compteComptables;
       }
       set compteComptables(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptables = value;
       }
       get editCompteComptableDialog():boolean {
           return this.compteComptableService.editCompteComptableDialog;
       }
      set editCompteComptableDialog(value: boolean) {
        this.compteComptableService.editCompteComptableDialog= value;
       }
       get selectedCpcFacture():CpcFactureVo {
           return this.cpcFactureService.selectedCpcFacture;
       }
      set selectedCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.selectedCpcFacture = value;
       }
       get cpcFactures():Array<CpcFactureVo> {
           return this.cpcFactureService.cpcFactures;
       }
       set cpcFactures(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactures = value;
       }
       get editCpcFactureDialog():boolean {
           return this.cpcFactureService.editCpcFactureDialog;
       }
      set editCpcFactureDialog(value: boolean) {
        this.cpcFactureService.editCpcFactureDialog= value;
       }
       get selectedSociete():SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes():Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get editSocieteDialog():boolean {
           return this.societeService.editSocieteDialog;
       }
      set editSocieteDialog(value: boolean) {
        this.societeService.editSocieteDialog= value;
       }
       get selectedComptable():ComptableVo {
           return this.comptableService.selectedComptable;
       }
      set selectedComptable(value: ComptableVo) {
        this.comptableService.selectedComptable = value;
       }
       get comptables():Array<ComptableVo> {
           return this.comptableService.comptables;
       }
       set comptables(value: Array<ComptableVo>) {
        this.comptableService.comptables = value;
       }
       get editComptableDialog():boolean {
           return this.comptableService.editComptableDialog;
       }
      set editComptableDialog(value: boolean) {
        this.comptableService.editComptableDialog= value;
       }
       get selectedClasseComptable():ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
      set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }
       get classeComptables():Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptables;
       }
       set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }
       get editClasseComptableDialog():boolean {
           return this.classeComptableService.editClasseComptableDialog;
       }
      set editClasseComptableDialog(value: boolean) {
        this.classeComptableService.editClasseComptableDialog= value;
       }
       get selectedTva():TvaVo {
           return this.tvaService.selectedTva;
       }
      set selectedTva(value: TvaVo) {
        this.tvaService.selectedTva = value;
       }
       get tvas():Array<TvaVo> {
           return this.tvaService.tvas;
       }
       set tvas(value: Array<TvaVo>) {
        this.tvaService.tvas = value;
       }
       get editTvaDialog():boolean {
           return this.tvaService.editTvaDialog;
       }
      set editTvaDialog(value: boolean) {
        this.tvaService.editTvaDialog= value;
       }
       get selectedTypeOperationFacture():TypeOperationFactureVo {
           return this.typeOperationFactureService.selectedTypeOperationFacture;
       }
      set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.selectedTypeOperationFacture = value;
       }
       get typeOperationFactures():Array<TypeOperationFactureVo> {
           return this.typeOperationFactureService.typeOperationFactures;
       }
       set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactures = value;
       }
       get editTypeOperationFactureDialog():boolean {
           return this.typeOperationFactureService.editTypeOperationFactureDialog;
       }
      set editTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.editTypeOperationFactureDialog= value;
       }
       get selectedEtatFacture():EtatFactureVo {
           return this.etatFactureService.selectedEtatFacture;
       }
      set selectedEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.selectedEtatFacture = value;
       }
       get etatFactures():Array<EtatFactureVo> {
           return this.etatFactureService.etatFactures;
       }
       set etatFactures(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactures = value;
       }
       get editEtatFactureDialog():boolean {
           return this.etatFactureService.editEtatFactureDialog;
       }
      set editEtatFactureDialog(value: boolean) {
        this.etatFactureService.editEtatFactureDialog= value;
       }
       get selectedDeclarationTva():DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
      set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }
       get declarationTvas():Array<DeclarationTvaVo> {
           return this.declarationTvaService.declarationTvas;
       }
       set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }
       get editDeclarationTvaDialog():boolean {
           return this.declarationTvaService.editDeclarationTvaDialog;
       }
      set editDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.editDeclarationTvaDialog= value;
       }
       get selectedEtatPaiement():EtatPaiementVo {
           return this.etatPaiementService.selectedEtatPaiement;
       }
      set selectedEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.selectedEtatPaiement = value;
       }
       get etatPaiements():Array<EtatPaiementVo> {
           return this.etatPaiementService.etatPaiements;
       }
       set etatPaiements(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiements = value;
       }
       get editEtatPaiementDialog():boolean {
           return this.etatPaiementService.editEtatPaiementDialog;
       }
      set editEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.editEtatPaiementDialog= value;
       }
       get selectedEtatDemande():EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
      set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }
       get etatDemandes():Array<EtatDemandeVo> {
           return this.etatDemandeService.etatDemandes;
       }
       set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }
       get editEtatDemandeDialog():boolean {
           return this.etatDemandeService.editEtatDemandeDialog;
       }
      set editEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.editEtatDemandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
