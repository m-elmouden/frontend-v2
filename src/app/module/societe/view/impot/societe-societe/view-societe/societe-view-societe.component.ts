import {Component, OnInit} from '@angular/core';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';

@Component({
  selector: 'app-societe-view-societe',
  templateUrl: './societe-view-societe.component.html',
  styleUrls: ['./societe-view-societe.component.css']
})
export class SocieteViewSocieteComponent implements OnInit {

        selectedDemandes: DemandeVo = new DemandeVo();
        demandesListe: Array<DemandeVo> = [];

        myComptables: Array<ComptableVo> = [];
        myEtatDemandes: Array<EtatDemandeVo> = [];

        selectedDeclarationIrs: DeclarationIrVo = new DeclarationIrVo();
        declarationIrsListe: Array<DeclarationIrVo> = [];

        myEtatDeclarationIrs: Array<EtatDeclarationIrVo> = [];
        myPaiementDeclarationIrs: Array<PaiementDeclarationIrVo> = [];

        selectedDeclarationIss: DeclarationIsVo = new DeclarationIsVo();
        declarationIssListe: Array<DeclarationIsVo> = [];

        myTauxIss: Array<TauxIsVo> = [];
        myTauxIsConfigs: Array<TauxIsConfigVo> = [];
        myEtatDeclarationIss: Array<EtatDeclarationIsVo> = [];
        myPaiementDeclarationIss: Array<PaiementDeclarationIsVo> = [];

        selectedDeclarationTvas: DeclarationTvaVo = new DeclarationTvaVo();
        declarationTvasListe: Array<DeclarationTvaVo> = [];

        myTypeDeclarationTvas: Array<TypeDeclarationTvaVo> = [];
        myEtatDeclarationTvas: Array<EtatDeclarationTvaVo> = [];
        myPaiementDeclarationTvas: Array<PaiementDeclarationTvaVo> = [];

        selectedDeclarationCnsss: DeclarationCnssVo = new DeclarationCnssVo();
        declarationCnsssListe: Array<DeclarationCnssVo> = [];

        myEmployes: Array<EmployeVo> = [];

        selectedAcomptes: AcompteVo = new AcompteVo();
        acomptesListe: Array<AcompteVo> = [];


        selectedEmployes: EmployeVo = new EmployeVo();
        employesListe: Array<EmployeVo> = [];

        myTypeEmployes: Array<TypeEmployeVo> = [];
        myDeclarationCnsss: Array<DeclarationCnssVo> = [];

        selectedFactures: FactureVo = new FactureVo();
        facturesListe: Array<FactureVo> = [];

        myTvas: Array<TvaVo> = [];
        myTypeOperationFactures: Array<TypeOperationFactureVo> = [];
        myEtatFactures: Array<EtatFactureVo> = [];
        myEtatPaiements: Array<EtatPaiementVo> = [];
        myCompteComptables: Array<CompteComptableVo> = [];
        myDeclarationIss: Array<DeclarationIsVo> = [];
        myDeclarationTvas: Array<DeclarationTvaVo> = [];
        myDemandes: Array<DemandeVo> = [];
        myClasseComptables: Array<ClasseComptableVo> = [];
        myCpcFactures: Array<CpcFactureVo> = [];


constructor(private datePipe: DatePipe, private societeService: SocieteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeDeclarationTvaService :TypeDeclarationTvaService
    ,private typeSocieteService :TypeSocieteService
    ,private classeComptableService :ClasseComptableService
    ,private presidentSocieteService :PresidentSocieteService
    ,private etatFactureService :EtatFactureService
    ,private tauxIsConfigService :TauxIsConfigService
    ,private etatDeclarationTvaService :EtatDeclarationTvaService
    ,private etatDeclarationIrService :EtatDeclarationIrService
    ,private etatDeclarationIsService :EtatDeclarationIsService
    ,private acompteService :AcompteService
    ,private typeEmployeService :TypeEmployeService
    ,private demandeService :DemandeService
    ,private factureService :FactureService
    ,private declarationCnssService :DeclarationCnssService
    ,private etatPaiementService :EtatPaiementService
    ,private comptableService :ComptableService
    ,private cpcFactureService :CpcFactureService
    ,private declarationIsService :DeclarationIsService
    ,private paiementDeclarationTvaService :PaiementDeclarationTvaService
    ,private declarationIrService :DeclarationIrService
    ,private etatDemandeService :EtatDemandeService
    ,private declarationTvaService :DeclarationTvaService
    ,private paiementDeclarationIrService :PaiementDeclarationIrService
    ,private tauxIsService :TauxIsService
    ,private paiementDeclarationIsService :PaiementDeclarationIsService
    ,private employeService :EmployeService
    ,private compteComptableService :CompteComptableService
    ,private tvaService :TvaService
    ,private typeOperationFactureService :TypeOperationFactureService
) {
}

// methods
ngOnInit(): void {
                this.selectedDemandes.comptableVo = new ComptableVo();
                this.comptableService.findAll().subscribe((data) => this.comptables = data);
                this.selectedDemandes.etatDemandeVo = new EtatDemandeVo();
                this.etatDemandeService.findAll().subscribe((data) => this.etatDemandes = data);
                this.selectedDeclarationIrs.etatDeclarationIrVo = new EtatDeclarationIrVo();
                this.etatDeclarationIrService.findAll().subscribe((data) => this.etatDeclarationIrs = data);
                this.selectedDeclarationIrs.paiementDeclarationIrVo = new PaiementDeclarationIrVo();
                this.paiementDeclarationIrService.findAll().subscribe((data) => this.paiementDeclarationIrs = data);
                this.selectedDeclarationIss.tauxIsVo = new TauxIsVo();
                this.tauxIsService.findAll().subscribe((data) => this.tauxIss = data);
                this.selectedDeclarationIss.tauxIsConfigVo = new TauxIsConfigVo();
                this.tauxIsConfigService.findAll().subscribe((data) => this.tauxIsConfigs = data);
                this.selectedDeclarationIss.etatDeclarationIsVo = new EtatDeclarationIsVo();
                this.etatDeclarationIsService.findAll().subscribe((data) => this.etatDeclarationIss = data);
                this.selectedDeclarationIss.paiementDeclarationIsVo = new PaiementDeclarationIsVo();
                this.paiementDeclarationIsService.findAll().subscribe((data) => this.paiementDeclarationIss = data);
                this.selectedDeclarationTvas.typeDeclarationTvaVo = new TypeDeclarationTvaVo();
                this.typeDeclarationTvaService.findAll().subscribe((data) => this.typeDeclarationTvas = data);
                this.selectedDeclarationTvas.etatDeclarationTvaVo = new EtatDeclarationTvaVo();
                this.etatDeclarationTvaService.findAll().subscribe((data) => this.etatDeclarationTvas = data);
                this.selectedDeclarationTvas.paiementDeclarationTvaVo = new PaiementDeclarationTvaVo();
                this.paiementDeclarationTvaService.findAll().subscribe((data) => this.paiementDeclarationTvas = data);
                this.selectedDeclarationCnsss.employeVo = new EmployeVo();
                this.employeService.findAll().subscribe((data) => this.employes = data);
                this.selectedEmployes.typeEmployeVo = new TypeEmployeVo();
                this.typeEmployeService.findAll().subscribe((data) => this.typeEmployes = data);
                this.selectedEmployes.declarationCnssVo = new DeclarationCnssVo();
                this.declarationCnssService.findAll().subscribe((data) => this.declarationCnsss = data);
                this.selectedFactures.tvaVo = new TvaVo();
                this.tvaService.findAll().subscribe((data) => this.tvas = data);
                this.selectedFactures.typeOperationFactureVo = new TypeOperationFactureVo();
                this.typeOperationFactureService.findAll().subscribe((data) => this.typeOperationFactures = data);
                this.selectedFactures.etatFactureVo = new EtatFactureVo();
                this.etatFactureService.findAll().subscribe((data) => this.etatFactures = data);
                this.selectedFactures.etatPaiementVo = new EtatPaiementVo();
                this.etatPaiementService.findAll().subscribe((data) => this.etatPaiements = data);
                this.selectedFactures.compteComptableVo = new CompteComptableVo();
                this.compteComptableService.findAll().subscribe((data) => this.compteComptables = data);
                this.selectedFactures.declarationIsVo = new DeclarationIsVo();
                this.declarationIsService.findAll().subscribe((data) => this.declarationIss = data);
                this.selectedFactures.declarationTvaVo = new DeclarationTvaVo();
                this.declarationTvaService.findAll().subscribe((data) => this.declarationTvas = data);
                this.selectedFactures.demandeVo = new DemandeVo();
                this.demandeService.findAll().subscribe((data) => this.demandes = data);
                this.selectedFactures.classeComptableVo = new ClasseComptableVo();
                this.classeComptableService.findAll().subscribe((data) => this.classeComptables = data);
                this.selectedFactures.cpcFactureVo = new CpcFactureVo();
                this.cpcFactureService.findAll().subscribe((data) => this.cpcFactures = data);
    this.selectedComptable = new ComptableVo();
    this.comptableService.findAll().subscribe((data) => this.comptables = data);
    this.selectedPresidentSociete = new PresidentSocieteVo();
    this.presidentSocieteService.findAll().subscribe((data) => this.presidentSocietes = data);
    this.selectedTypeSociete = new TypeSocieteVo();
    this.typeSocieteService.findAll().subscribe((data) => this.typeSocietes = data);
}

hideViewDialog(){
    this.viewSocieteDialog  = false;
}

// getters and setters

get societes(): Array<SocieteVo> {
    return this.societeService.societes;
       }
set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }

 get selectedSociete():SocieteVo {
           return this.societeService.selectedSociete;
       }
    set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }

   get viewSocieteDialog():boolean {
           return this.societeService.viewSocieteDialog;

       }
    set viewSocieteDialog(value: boolean) {
        this.societeService.viewSocieteDialog= value;
       }

       get selectedEtatDeclarationIr():EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
      set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }
       get etatDeclarationIrs():Array<EtatDeclarationIrVo> {
           return this.etatDeclarationIrService.etatDeclarationIrs;
       }
       set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }
       get editEtatDeclarationIrDialog():boolean {
           return this.etatDeclarationIrService.editEtatDeclarationIrDialog;
       }
      set editEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.editEtatDeclarationIrDialog= value;
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
       get selectedDemande():DemandeVo {
           return this.demandeService.selectedDemande;
       }
      set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }
       get demandes():Array<DemandeVo> {
           return this.demandeService.demandes;
       }
       set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }
       get editDemandeDialog():boolean {
           return this.demandeService.editDemandeDialog;
       }
      set editDemandeDialog(value: boolean) {
        this.demandeService.editDemandeDialog= value;
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
       get selectedPaiementDeclarationIs():PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
      set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }
       get paiementDeclarationIss():Array<PaiementDeclarationIsVo> {
           return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
       set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }
       get editPaiementDeclarationIsDialog():boolean {
           return this.paiementDeclarationIsService.editPaiementDeclarationIsDialog;
       }
      set editPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.editPaiementDeclarationIsDialog= value;
       }
       get selectedTypeEmploye():TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
      set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }
       get typeEmployes():Array<TypeEmployeVo> {
           return this.typeEmployeService.typeEmployes;
       }
       set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }
       get editTypeEmployeDialog():boolean {
           return this.typeEmployeService.editTypeEmployeDialog;
       }
      set editTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.editTypeEmployeDialog= value;
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
       get selectedTauxIsConfig():TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
      set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
       get tauxIsConfigs():Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
       set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }
       get editTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.editTauxIsConfigDialog;
       }
      set editTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.editTauxIsConfigDialog= value;
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
       get selectedPresidentSociete():PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
      set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }
       get presidentSocietes():Array<PresidentSocieteVo> {
           return this.presidentSocieteService.presidentSocietes;
       }
       set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }
       get editPresidentSocieteDialog():boolean {
           return this.presidentSocieteService.editPresidentSocieteDialog;
       }
      set editPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.editPresidentSocieteDialog= value;
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
       get selectedEtatDeclarationIs():EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
      set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }
       get etatDeclarationIss():Array<EtatDeclarationIsVo> {
           return this.etatDeclarationIsService.etatDeclarationIss;
       }
       set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }
       get editEtatDeclarationIsDialog():boolean {
           return this.etatDeclarationIsService.editEtatDeclarationIsDialog;
       }
      set editEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.editEtatDeclarationIsDialog= value;
       }
       get selectedEtatDeclarationTva():EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
      set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }
       get etatDeclarationTvas():Array<EtatDeclarationTvaVo> {
           return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
       set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }
       get editEtatDeclarationTvaDialog():boolean {
           return this.etatDeclarationTvaService.editEtatDeclarationTvaDialog;
       }
      set editEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.editEtatDeclarationTvaDialog= value;
       }
       get selectedTauxIs():TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
      set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }
       get tauxIss():Array<TauxIsVo> {
           return this.tauxIsService.tauxIss;
       }
       set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }
       get editTauxIsDialog():boolean {
           return this.tauxIsService.editTauxIsDialog;
       }
      set editTauxIsDialog(value: boolean) {
        this.tauxIsService.editTauxIsDialog= value;
       }
       get selectedPaiementDeclarationIr():PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
      set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }
       get paiementDeclarationIrs():Array<PaiementDeclarationIrVo> {
           return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
       set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }
       get editPaiementDeclarationIrDialog():boolean {
           return this.paiementDeclarationIrService.editPaiementDeclarationIrDialog;
       }
      set editPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.editPaiementDeclarationIrDialog= value;
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
       get selectedTypeDeclarationTva():TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
      set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }
       get typeDeclarationTvas():Array<TypeDeclarationTvaVo> {
           return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
       set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }
       get editTypeDeclarationTvaDialog():boolean {
           return this.typeDeclarationTvaService.editTypeDeclarationTvaDialog;
       }
      set editTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.editTypeDeclarationTvaDialog= value;
       }
       get selectedEmploye():EmployeVo {
           return this.employeService.selectedEmploye;
       }
      set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }
       get employes():Array<EmployeVo> {
           return this.employeService.employes;
       }
       set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }
       get editEmployeDialog():boolean {
           return this.employeService.editEmployeDialog;
       }
      set editEmployeDialog(value: boolean) {
        this.employeService.editEmployeDialog= value;
       }
       get selectedTypeSociete():TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
      set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }
       get typeSocietes():Array<TypeSocieteVo> {
           return this.typeSocieteService.typeSocietes;
       }
       set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }
       get editTypeSocieteDialog():boolean {
           return this.typeSocieteService.editTypeSocieteDialog;
       }
      set editTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.editTypeSocieteDialog= value;
       }
       get selectedPaiementDeclarationTva():PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
      set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }
       get paiementDeclarationTvas():Array<PaiementDeclarationTvaVo> {
           return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
       set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }
       get editPaiementDeclarationTvaDialog():boolean {
           return this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog;
       }
      set editPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog= value;
       }
       get selectedDeclarationCnss():DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss():Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get editDeclarationCnssDialog():boolean {
           return this.declarationCnssService.editDeclarationCnssDialog;
       }
      set editDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.editDeclarationCnssDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
