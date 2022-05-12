import {Component, OnInit} from '@angular/core';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {TvaService} from '../../../../../../controller/service/Tva.service';

@Component({
  selector: 'app-facture-view-admin',
  templateUrl: './facture-view-admin.component.html',
  styleUrls: ['./facture-view-admin.component.css']
})
export class FactureViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private factureService: FactureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private declarationTvaService :DeclarationTvaService
    ,private cpcFactureService :CpcFactureService
    ,private demandeService :DemandeService
    ,private typeOperationFactureService :TypeOperationFactureService
    ,private classeComptableService :ClasseComptableService
    ,private compteComptableService :CompteComptableService
    ,private etatFactureService :EtatFactureService
    ,private declarationIsService :DeclarationIsService
    ,private etatPaiementService :EtatPaiementService
    ,private tvaService :TvaService
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

hideViewDialog(){
    this.viewFactureDialog  = false;
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

   get viewFactureDialog():boolean {
           return this.factureService.viewFactureDialog;

       }
    set viewFactureDialog(value: boolean) {
        this.factureService.viewFactureDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
