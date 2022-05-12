import {Component, OnInit} from '@angular/core';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-societe-edit-comptable',
  templateUrl: './societe-edit-comptable.component.html',
  styleUrls: ['./societe-edit-comptable.component.css']
})
export class SocieteEditComptableComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeDeclarationTvaService: TypeDeclarationTvaService
 ,       private typeSocieteService: TypeSocieteService
 ,       private classeComptableService: ClasseComptableService
 ,       private presidentSocieteService: PresidentSocieteService
 ,       private etatFactureService: EtatFactureService
 ,       private tauxIsConfigService: TauxIsConfigService
 ,       private etatDeclarationTvaService: EtatDeclarationTvaService
 ,       private etatDeclarationIrService: EtatDeclarationIrService
 ,       private etatDeclarationIsService: EtatDeclarationIsService
 ,       private acompteService: AcompteService
 ,       private typeEmployeService: TypeEmployeService
 ,       private demandeService: DemandeService
 ,       private factureService: FactureService
 ,       private declarationCnssService: DeclarationCnssService
 ,       private etatPaiementService: EtatPaiementService
 ,       private comptableService: ComptableService
 ,       private cpcFactureService: CpcFactureService
 ,       private declarationIsService: DeclarationIsService
 ,       private paiementDeclarationTvaService: PaiementDeclarationTvaService
 ,       private declarationIrService: DeclarationIrService
 ,       private etatDemandeService: EtatDemandeService
 ,       private declarationTvaService: DeclarationTvaService
 ,       private paiementDeclarationIrService: PaiementDeclarationIrService
 ,       private tauxIsService: TauxIsService
 ,       private paiementDeclarationIsService: PaiementDeclarationIsService
 ,       private employeService: EmployeService
 ,       private compteComptableService: CompteComptableService
 ,       private tvaService: TvaService
 ,       private typeOperationFactureService: TypeOperationFactureService
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
        addDemandes() {
        if( this.selectedSociete.demandesVo == null ){
            this.selectedSociete.demandesVo = new Array<DemandeVo>();
        }
        this.selectedSociete.demandesVo.push(this.selectedDemandes);
        this.selectedDemandes = new DemandeVo();
        }

       deleteDemandes(p: DemandeVo) {
        this.selectedSociete.demandesVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.demandesVo.splice(index, 1); }
        });
    }
        addDeclarationIrs() {
        if( this.selectedSociete.declarationIrsVo == null ){
            this.selectedSociete.declarationIrsVo = new Array<DeclarationIrVo>();
        }
        this.selectedSociete.declarationIrsVo.push(this.selectedDeclarationIrs);
        this.selectedDeclarationIrs = new DeclarationIrVo();
        }

       deleteDeclarationIrs(p: DeclarationIrVo) {
        this.selectedSociete.declarationIrsVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.declarationIrsVo.splice(index, 1); }
        });
    }
        addDeclarationIss() {
        if( this.selectedSociete.declarationIssVo == null ){
            this.selectedSociete.declarationIssVo = new Array<DeclarationIsVo>();
        }
        this.selectedSociete.declarationIssVo.push(this.selectedDeclarationIss);
        this.selectedDeclarationIss = new DeclarationIsVo();
        }

       deleteDeclarationIss(p: DeclarationIsVo) {
        this.selectedSociete.declarationIssVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.declarationIssVo.splice(index, 1); }
        });
    }
        addDeclarationTvas() {
        if( this.selectedSociete.declarationTvasVo == null ){
            this.selectedSociete.declarationTvasVo = new Array<DeclarationTvaVo>();
        }
        this.selectedSociete.declarationTvasVo.push(this.selectedDeclarationTvas);
        this.selectedDeclarationTvas = new DeclarationTvaVo();
        }

       deleteDeclarationTvas(p: DeclarationTvaVo) {
        this.selectedSociete.declarationTvasVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.declarationTvasVo.splice(index, 1); }
        });
    }
        addDeclarationCnsss() {
        if( this.selectedSociete.declarationCnsssVo == null ){
            this.selectedSociete.declarationCnsssVo = new Array<DeclarationCnssVo>();
        }
        this.selectedSociete.declarationCnsssVo.push(this.selectedDeclarationCnsss);
        this.selectedDeclarationCnsss = new DeclarationCnssVo();
        }

       deleteDeclarationCnsss(p: DeclarationCnssVo) {
        this.selectedSociete.declarationCnsssVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.declarationCnsssVo.splice(index, 1); }
        });
    }
        addAcomptes() {
        if( this.selectedSociete.acomptesVo == null ){
            this.selectedSociete.acomptesVo = new Array<AcompteVo>();
        }
        this.selectedSociete.acomptesVo.push(this.selectedAcomptes);
        this.selectedAcomptes = new AcompteVo();
        }

       deleteAcomptes(p: AcompteVo) {
        this.selectedSociete.acomptesVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.acomptesVo.splice(index, 1); }
        });
    }
        addEmployes() {
        if( this.selectedSociete.employesVo == null ){
            this.selectedSociete.employesVo = new Array<EmployeVo>();
        }
        this.selectedSociete.employesVo.push(this.selectedEmployes);
        this.selectedEmployes = new EmployeVo();
        }

       deleteEmployes(p: EmployeVo) {
        this.selectedSociete.employesVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.employesVo.splice(index, 1); }
        });
    }
        addFactures() {
        if( this.selectedSociete.facturesVo == null ){
            this.selectedSociete.facturesVo = new Array<FactureVo>();
        }
        this.selectedSociete.facturesVo.push(this.selectedFactures);
        this.selectedFactures = new FactureVo();
        }

       deleteFactures(p: FactureVo) {
        this.selectedSociete.facturesVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.facturesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedSociete.dateCreation = DateUtils.toDate(this.selectedSociete.dateCreation);
            this.selectedSociete.createdAt = DateUtils.toDate(this.selectedSociete.createdAt);
            this.selectedSociete.updatedAt = DateUtils.toDate(this.selectedSociete.updatedAt);
    this.societeService.edit().subscribe(societe=>{
    const myIndex = this.societes.findIndex(e => e.id === this.selectedSociete.id);
    this.societes[myIndex] = this.selectedSociete;
    this.editSocieteDialog = false;
    this.selectedSociete = new SocieteVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatDeclarationIr(etatDeclarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'add');
                       if(isPermistted){
         this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();
        this.createEtatDeclarationIrDialog = true;
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
              public async openCreatepaiementDeclarationIs(paiementDeclarationIs: string) {
                      const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'add');
                       if(isPermistted){
         this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();
        this.createPaiementDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEmploye(typeEmploye: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEmploye', 'add');
                       if(isPermistted){
         this.selectedTypeEmploye = new TypeEmployeVo();
        this.createTypeEmployeDialog = true;
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
              public async openCreatetauxIsConfig(tauxIsConfig: string) {
                      const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'add');
                       if(isPermistted){
         this.selectedTauxIsConfig = new TauxIsConfigVo();
        this.createTauxIsConfigDialog = true;
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
              public async openCreatepresidentSociete(presidentSociete: string) {
                      const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'add');
                       if(isPermistted){
         this.selectedPresidentSociete = new PresidentSocieteVo();
        this.createPresidentSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
              public async openCreateetatDeclarationIs(etatDeclarationIs: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'add');
                       if(isPermistted){
         this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();
        this.createEtatDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatDeclarationTva(etatDeclarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDeclarationTva', 'add');
                       if(isPermistted){
         this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();
        this.createEtatDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetauxIs(tauxIs: string) {
                      const isPermistted = await this.roleService.isPermitted('TauxIs', 'add');
                       if(isPermistted){
         this.selectedTauxIs = new TauxIsVo();
        this.createTauxIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepaiementDeclarationIr(paiementDeclarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'add');
                       if(isPermistted){
         this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();
        this.createPaiementDeclarationIrDialog = true;
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
              public async openCreatetypeDeclarationTva(typeDeclarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeDeclarationTva', 'add');
                       if(isPermistted){
         this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();
        this.createTypeDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateemploye(employe: string) {
                      const isPermistted = await this.roleService.isPermitted('Employe', 'add');
                       if(isPermistted){
         this.selectedEmploye = new EmployeVo();
        this.createEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeSociete(typeSociete: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSociete', 'add');
                       if(isPermistted){
         this.selectedTypeSociete = new TypeSocieteVo();
        this.createTypeSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepaiementDeclarationTva(paiementDeclarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'add');
                       if(isPermistted){
         this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();
        this.createPaiementDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedeclarationCnss(declarationCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'add');
                       if(isPermistted){
         this.selectedDeclarationCnss = new DeclarationCnssVo();
        this.createDeclarationCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editSocieteDialog  = false;
}

// getters and setters

get societes(): Array<SocieteVo> {
    return this.societeService.societes;
       }
set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }

 get selectedSociete(): SocieteVo {
           return this.societeService.selectedSociete;
       }
    set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }

   get editSocieteDialog(): boolean {
           return this.societeService.editSocieteDialog;

       }
    set editSocieteDialog(value: boolean) {
        this.societeService.editSocieteDialog = value;
       }

       get selectedEtatDeclarationIr(): EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
      set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }
       get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
           return this.etatDeclarationIrService.etatDeclarationIrs;
       }
       set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }
       get createEtatDeclarationIrDialog(): boolean {
           return this.etatDeclarationIrService.createEtatDeclarationIrDialog;
       }
      set createEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.createEtatDeclarationIrDialog= value;
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
       get selectedPaiementDeclarationIs(): PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
      set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }
       get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
           return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
       set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }
       get createPaiementDeclarationIsDialog(): boolean {
           return this.paiementDeclarationIsService.createPaiementDeclarationIsDialog;
       }
      set createPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.createPaiementDeclarationIsDialog= value;
       }
       get selectedTypeEmploye(): TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
      set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }
       get typeEmployes(): Array<TypeEmployeVo> {
           return this.typeEmployeService.typeEmployes;
       }
       set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }
       get createTypeEmployeDialog(): boolean {
           return this.typeEmployeService.createTypeEmployeDialog;
       }
      set createTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.createTypeEmployeDialog= value;
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
       get selectedTauxIsConfig(): TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
      set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
       get tauxIsConfigs(): Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
       set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }
       get createTauxIsConfigDialog(): boolean {
           return this.tauxIsConfigService.createTauxIsConfigDialog;
       }
      set createTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.createTauxIsConfigDialog= value;
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
       get selectedPresidentSociete(): PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
      set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }
       get presidentSocietes(): Array<PresidentSocieteVo> {
           return this.presidentSocieteService.presidentSocietes;
       }
       set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }
       get createPresidentSocieteDialog(): boolean {
           return this.presidentSocieteService.createPresidentSocieteDialog;
       }
      set createPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.createPresidentSocieteDialog= value;
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
       get selectedEtatDeclarationIs(): EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
      set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }
       get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
           return this.etatDeclarationIsService.etatDeclarationIss;
       }
       set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }
       get createEtatDeclarationIsDialog(): boolean {
           return this.etatDeclarationIsService.createEtatDeclarationIsDialog;
       }
      set createEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.createEtatDeclarationIsDialog= value;
       }
       get selectedEtatDeclarationTva(): EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
      set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }
       get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
           return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
       set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }
       get createEtatDeclarationTvaDialog(): boolean {
           return this.etatDeclarationTvaService.createEtatDeclarationTvaDialog;
       }
      set createEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.createEtatDeclarationTvaDialog= value;
       }
       get selectedTauxIs(): TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
      set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }
       get tauxIss(): Array<TauxIsVo> {
           return this.tauxIsService.tauxIss;
       }
       set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }
       get createTauxIsDialog(): boolean {
           return this.tauxIsService.createTauxIsDialog;
       }
      set createTauxIsDialog(value: boolean) {
        this.tauxIsService.createTauxIsDialog= value;
       }
       get selectedPaiementDeclarationIr(): PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
      set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }
       get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
           return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
       set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }
       get createPaiementDeclarationIrDialog(): boolean {
           return this.paiementDeclarationIrService.createPaiementDeclarationIrDialog;
       }
      set createPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.createPaiementDeclarationIrDialog= value;
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
       get selectedTypeDeclarationTva(): TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
      set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }
       get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
           return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
       set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }
       get createTypeDeclarationTvaDialog(): boolean {
           return this.typeDeclarationTvaService.createTypeDeclarationTvaDialog;
       }
      set createTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.createTypeDeclarationTvaDialog= value;
       }
       get selectedEmploye(): EmployeVo {
           return this.employeService.selectedEmploye;
       }
      set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }
       get employes(): Array<EmployeVo> {
           return this.employeService.employes;
       }
       set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }
       get createEmployeDialog(): boolean {
           return this.employeService.createEmployeDialog;
       }
      set createEmployeDialog(value: boolean) {
        this.employeService.createEmployeDialog= value;
       }
       get selectedTypeSociete(): TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
      set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }
       get typeSocietes(): Array<TypeSocieteVo> {
           return this.typeSocieteService.typeSocietes;
       }
       set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }
       get createTypeSocieteDialog(): boolean {
           return this.typeSocieteService.createTypeSocieteDialog;
       }
      set createTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.createTypeSocieteDialog= value;
       }
       get selectedPaiementDeclarationTva(): PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
      set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }
       get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
           return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
       set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }
       get createPaiementDeclarationTvaDialog(): boolean {
           return this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog;
       }
      set createPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog= value;
       }
       get selectedDeclarationCnss(): DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss(): Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get createDeclarationCnssDialog(): boolean {
           return this.declarationCnssService.createDeclarationCnssDialog;
       }
      set createDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.createDeclarationCnssDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
