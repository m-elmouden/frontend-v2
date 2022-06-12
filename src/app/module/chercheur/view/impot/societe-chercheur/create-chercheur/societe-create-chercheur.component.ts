import {Component, OnInit, Input} from '@angular/core';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
@Component({
  selector: 'app-societe-create-chercheur',
  templateUrl: './societe-create-chercheur.component.html',
  styleUrls: ['./societe-create-chercheur.component.css']
})
export class SocieteCreateChercheurComponent implements OnInit {

        selectedDemandes: DemandeVo = new DemandeVo();
        selectedDeclarationIrs: DeclarationIrVo = new DeclarationIrVo();
        selectedDeclarationIss: DeclarationIsVo = new DeclarationIsVo();
        selectedDeclarationTvas: DeclarationTvaVo = new DeclarationTvaVo();
        selectedDeclarationCnsss: DeclarationCnssVo = new DeclarationCnssVo();
        selectedAcomptes: AcompteVo = new AcompteVo();
        selectedEmployes: EmployeVo = new EmployeVo();
        selectedFactures: FactureVo = new FactureVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validSocieteIce = true;
   _validSocieteRaisonSociale = true;
   _validSocieteDateCreation = true;
   _validSocieteAge = true;
   _validSocietePresidentSociete = true;

    _validComptableCode = true;
    _validComptableNom = true;
    _validComptableTelephone = true;
    _validComptablePrenom = true;
    _validPresidentSocieteCin = true;
    _validPresidentSocieteNom = true;
    _validPresidentSocietePrenom = true;
    _validPresidentSocieteSociete = true;
    _validDemandeReference = true;
    _validDemandeOperation = true;
    _validDemandeDateDemande = true;
    _validDemandeSociete = true;
    _validDemandeComptable = true;
    _validDemandeEtatDemande = true;
    _validDeclarationIrRefrerence = true;
    _validDeclarationIrAnnee = true;
    _validDeclarationIrMois = true;
    _validDeclarationIsReference = true;
    _validDeclarationIsAnnee = true;
    _validDeclarationIsSociete = true;
    _validDeclarationIsTauxIs = true;
    _validDeclarationIsEtatDeclarationIs = true;
    _validDeclarationTvaReference = true;
    _validDeclarationTvaSociete = true;
    _validDeclarationTvaTypeDeclarationTva = true;
    _validDeclarationTvaEtatDeclarationTva = true;
    _validDeclarationCnssRef = true;
    _validDeclarationCnssEmploye = true;
    _validDeclarationCnssSalaireNet = true;
    _validDeclarationCnssSalaireBrut = true;
    _validDeclarationCnssSalaireImposable = true;
    _validDeclarationCnssMontantTotal = true;
    _validDeclarationCnssDeclarationCnssDetails = true;
    _validDeclarationCnssSociete = true;
    _validAcompteNumero = true;
    _validAcompteAnnee = true;
    _validAcompteMontant = true;
    _validAcompteSociete = true;
    _validEmployeCin = true;
    _validEmployeNom = true;
    _validEmployePrenom = true;
    _validEmployeTotalSalaireNet = true;
    _validEmployeNombreFamille = true;
    _validTypeSocieteCode = true;
    _validTypeSocieteLibelle = true;
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



constructor(private datePipe: DatePipe, private societeService: SocieteService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatFactureService :EtatFactureService
,       private paiementDeclarationIsService :PaiementDeclarationIsService
,       private etatDemandeService :EtatDemandeService
,       private etatDeclarationIsService :EtatDeclarationIsService
,       private employeService :EmployeService
,       private typeSocieteService :TypeSocieteService
,       private tauxIsConfigService :TauxIsConfigService
,       private acompteService :AcompteService
,       private demandeService :DemandeService
,       private paiementDeclarationTvaService :PaiementDeclarationTvaService
,       private typeOperationFactureService :TypeOperationFactureService
,       private etatDeclarationIrService :EtatDeclarationIrService
,       private compteComptableService :CompteComptableService
,       private tvaService :TvaService
,       private etatDeclarationTvaService :EtatDeclarationTvaService
,       private factureService :FactureService
,       private typeEmployeService :TypeEmployeService
,       private tauxIsService :TauxIsService
,       private paiementDeclarationIrService :PaiementDeclarationIrService
,       private comptableService :ComptableService
,       private declarationIrService :DeclarationIrService
,       private classeComptableService :ClasseComptableService
,       private cpcFactureService :CpcFactureService
,       private declarationTvaService :DeclarationTvaService
,       private etatPaiementService :EtatPaiementService
,       private declarationCnssService :DeclarationCnssService
,       private presidentSocieteService :PresidentSocieteService
,       private typeDeclarationTvaService :TypeDeclarationTvaService
,       private declarationIsService :DeclarationIsService
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


    validateDemandes(){
    this.errorMessages = new Array();
    this.validateDemandeReference();
    this.validateDemandeOperation();
    this.validateDemandeDateDemande();
    this.validateDemandeSociete();
    this.validateDemandeComptable();
    this.validateDemandeEtatDemande();
    }
    validateDeclarationIrs(){
    this.errorMessages = new Array();
    this.validateDeclarationIrRefrerence();
  /*  this.validateDeclarationIrAnnee();
    this.validateDeclarationIrMois();*/
    }
    validateDeclarationIss(){
    this.errorMessages = new Array();
    this.validateDeclarationIsReference();
    this.validateDeclarationIsAnnee();
    this.validateDeclarationIsSociete();
    this.validateDeclarationIsTauxIs();
    this.validateDeclarationIsEtatDeclarationIs();
    }
    validateDeclarationTvas(){
    this.errorMessages = new Array();
    this.validateDeclarationTvaReference();
    this.validateDeclarationTvaSociete();
    this.validateDeclarationTvaTypeDeclarationTva();
    this.validateDeclarationTvaEtatDeclarationTva();
    }
    validateDeclarationCnsss(){
    this.errorMessages = new Array();
    this.validateDeclarationCnssRef();
    this.validateDeclarationCnssEmploye();
    this.validateDeclarationCnssSalaireNet();
    this.validateDeclarationCnssSalaireBrut();
    this.validateDeclarationCnssSalaireImposable();
    this.validateDeclarationCnssMontantTotal();
    this.validateDeclarationCnssDeclarationCnssDetails();
    this.validateDeclarationCnssSociete();
    }
    validateAcomptes(){
    this.errorMessages = new Array();
    this.validateAcompteNumero();
    this.validateAcompteAnnee();
    this.validateAcompteMontant();
    this.validateAcompteSociete();
    }
    validateEmployes(){
    this.errorMessages = new Array();
    this.validateEmployeCin();
    this.validateEmployeNom();
    this.validateEmployePrenom();
    this.validateEmployeTotalSalaireNet();
    this.validateEmployeNombreFamille();
    }
    validateFactures(){
    this.errorMessages = new Array();
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


private setValidation(value : boolean){
    this.validSocieteIce = value;
    this.validSocieteRaisonSociale = value;
    this.validSocieteDateCreation = value;
    this.validSocieteAge = value;
    this.validSocietePresidentSociete = value;
    this.validDemandeReference = value;
    this.validDemandeOperation = value;
    this.validDemandeDateDemande = value;
    this.validDemandeSociete = value;
    this.validDemandeComptable = value;
    this.validDemandeEtatDemande = value;
    this.validDeclarationIrRefrerence = value;
    this.validDeclarationIrAnnee = value;
    this.validDeclarationIrMois = value;
    this.validDeclarationIsReference = value;
    this.validDeclarationIsAnnee = value;
    this.validDeclarationIsSociete = value;
    this.validDeclarationIsTauxIs = value;
    this.validDeclarationIsEtatDeclarationIs = value;
    this.validDeclarationTvaReference = value;
    this.validDeclarationTvaSociete = value;
    this.validDeclarationTvaTypeDeclarationTva = value;
    this.validDeclarationTvaEtatDeclarationTva = value;
    this.validDeclarationCnssRef = value;
    this.validDeclarationCnssEmploye = value;
    this.validDeclarationCnssSalaireNet = value;
    this.validDeclarationCnssSalaireBrut = value;
    this.validDeclarationCnssSalaireImposable = value;
    this.validDeclarationCnssMontantTotal = value;
    this.validDeclarationCnssDeclarationCnssDetails = value;
    this.validDeclarationCnssSociete = value;
    this.validAcompteNumero = value;
    this.validAcompteAnnee = value;
    this.validAcompteMontant = value;
    this.validAcompteSociete = value;
    this.validEmployeCin = value;
    this.validEmployeNom = value;
    this.validEmployePrenom = value;
    this.validEmployeTotalSalaireNet = value;
    this.validEmployeNombreFamille = value;
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

        addDemandes() {
        if( this.selectedSociete.demandesVo == null ){
            this.selectedSociete.demandesVo = new Array<DemandeVo>();
        }
       this.validateDemandes();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.demandesVo.push(this.selectedDemandes);
              this.selectedDemandes = new DemandeVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateDeclarationIrs();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.declarationIrsVo.push(this.selectedDeclarationIrs);
              this.selectedDeclarationIrs = new DeclarationIrVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateDeclarationIss();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.declarationIssVo.push(this.selectedDeclarationIss);
              this.selectedDeclarationIss = new DeclarationIsVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateDeclarationTvas();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.declarationTvasVo.push(this.selectedDeclarationTvas);
              this.selectedDeclarationTvas = new DeclarationTvaVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateDeclarationCnsss();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.declarationCnsssVo.push(this.selectedDeclarationCnsss);
              this.selectedDeclarationCnsss = new DeclarationCnssVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateAcomptes();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.acomptesVo.push(this.selectedAcomptes);
              this.selectedAcomptes = new AcompteVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateEmployes();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.employesVo.push(this.selectedEmployes);
              this.selectedEmployes = new EmployeVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateFactures();
       if (this.errorMessages.length === 0) {
              this.selectedSociete.facturesVo.push(this.selectedFactures);
              this.selectedFactures = new FactureVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteFactures(p: FactureVo) {
        this.selectedSociete.facturesVo.forEach((element, index) => {
            if (element === p) { this.selectedSociete.facturesVo.splice(index, 1); }
        });
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
     this.societeService.save().subscribe(societe=>{
       this.societes.push({...societe});
       this.createSocieteDialog = false;
       this.submitted = false;
       this.selectedSociete = new SocieteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateSocieteIce();
this.validateSocieteRaisonSociale();
this.validateSocieteDateCreation();
this.validateSocieteAge();
this.validateSocietePresidentSociete();

    }

private validateSocieteIce(){
        if (this.stringUtilService.isEmpty(this.selectedSociete.ice)) {
            this.errorMessages.push('Ice non valide');
            this.validSocieteIce = false;
        } else {
            this.validSocieteIce = true;
        }
    }
private validateSocieteRaisonSociale(){
        if (this.stringUtilService.isEmpty(this.selectedSociete.raisonSociale)) {
            this.errorMessages.push('Raison sociale non valide');
            this.validSocieteRaisonSociale = false;
        } else {
            this.validSocieteRaisonSociale = true;
        }
    }
private validateSocieteDateCreation(){
        if (this.stringUtilService.isEmpty(this.selectedSociete.dateCreation)) {
            this.errorMessages.push('Date creation non valide');
            this.validSocieteDateCreation = false;
        } else {
            this.validSocieteDateCreation = true;
        }
    }
private validateSocieteAge(){
        if (this.stringUtilService.isEmpty(this.selectedSociete.age)) {
            this.errorMessages.push('Age non valide');
            this.validSocieteAge = false;
        } else {
            this.validSocieteAge = true;
        }
    }
private validateSocietePresidentSociete(){
        if (this.stringUtilService.isEmpty(this.selectedSociete.presidentSocieteVo)) {
            this.errorMessages.push('President societe non valide');
            this.validSocietePresidentSociete = false;
        } else {
            this.validSocietePresidentSociete = true;
        }
    }

















            private validateDemandeReference(){
            if (this.selectedDemandes.reference == null) {
            this.errorMessages.push('Reference de la demande est  invalide');
             this.validDemandeReference = false;
            } else {
            this.validDemandeReference = true;
            }
            }

            private validateDemandeOperation(){
            if (this.selectedDemandes.operation == null) {
            this.errorMessages.push('Operation de la demande est  invalide');
             this.validDemandeOperation = false;
            } else {
            this.validDemandeOperation = true;
            }
            }

            private validateDemandeDateDemande(){
            if (this.selectedDemandes.dateDemande == null) {
            this.errorMessages.push('DateDemande de la demande est  invalide');
             this.validDemandeDateDemande = false;
            } else {
            this.validDemandeDateDemande = true;
            }
            }




            private validateDemandeSociete(){
            if (this.selectedDemandes.societeVo == null) {
            this.errorMessages.push('Societe de la demande est  invalide');
             this.validDemandeSociete = false;
            } else {
            this.validDemandeSociete = true;
            }
            }

            private validateDemandeComptable(){
            if (this.selectedDemandes.comptableVo == null) {
            this.errorMessages.push('Comptable de la demande est  invalide');
             this.validDemandeComptable = false;
            } else {
            this.validDemandeComptable = true;
            }
            }

            private validateDemandeEtatDemande(){
            if (this.selectedDemandes.etatDemandeVo == null) {
            this.errorMessages.push('EtatDemande de la demande est  invalide');
             this.validDemandeEtatDemande = false;
            } else {
            this.validDemandeEtatDemande = true;
            }
            }













            private validateDeclarationIrRefrerence(){
            if (this.selectedDeclarationIrs.refrerence == null) {
            this.errorMessages.push('Refrerence de la declarationIr est  invalide');
             this.validDeclarationIrRefrerence = false;
            } else {
            this.validDeclarationIrRefrerence = true;
            }
            }


            private validateDeclarationIrAnnee(){
            if (this.selectedDeclarationIrs.annee == null) {
            this.errorMessages.push('Annee de la declarationIr est  invalide');
             this.validDeclarationIrAnnee = false;
            } else {
            this.validDeclarationIrAnnee = true;
            }
            }

            private validateDeclarationIrMois(){
            if (this.selectedDeclarationIrs.mois == null) {
            this.errorMessages.push('Mois de la declarationIr est  invalide');
             this.validDeclarationIrMois = false;
            } else {
            this.validDeclarationIrMois = true;
            }
            }



















            private validateDeclarationIsReference(){
            if (this.selectedDeclarationIss.reference == null) {
            this.errorMessages.push('Reference de la declarationIs est  invalide');
             this.validDeclarationIsReference = false;
            } else {
            this.validDeclarationIsReference = true;
            }
            }

            private validateDeclarationIsAnnee(){
            if (this.selectedDeclarationIss.annee == null) {
            this.errorMessages.push('Annee de la declarationIs est  invalide');
             this.validDeclarationIsAnnee = false;
            } else {
            this.validDeclarationIsAnnee = true;
            }
            }







            private validateDeclarationIsSociete(){
            if (this.selectedDeclarationIss.societeVo == null) {
            this.errorMessages.push('Societe de la declarationIs est  invalide');
             this.validDeclarationIsSociete = false;
            } else {
            this.validDeclarationIsSociete = true;
            }
            }

            private validateDeclarationIsTauxIs(){
            if (this.selectedDeclarationIss.tauxIsVo == null) {
            this.errorMessages.push('TauxIs de la declarationIs est  invalide');
             this.validDeclarationIsTauxIs = false;
            } else {
            this.validDeclarationIsTauxIs = true;
            }
            }


            private validateDeclarationIsEtatDeclarationIs(){
            if (this.selectedDeclarationIss.etatDeclarationIsVo == null) {
            this.errorMessages.push('EtatDeclarationIs de la declarationIs est  invalide');
             this.validDeclarationIsEtatDeclarationIs = false;
            } else {
            this.validDeclarationIsEtatDeclarationIs = true;
            }
            }











            private validateDeclarationTvaReference(){
            if (this.selectedDeclarationTvas.reference == null) {
            this.errorMessages.push('Reference de la declarationTva est  invalide');
             this.validDeclarationTvaReference = false;
            } else {
            this.validDeclarationTvaReference = true;
            }
            }









            private validateDeclarationTvaSociete(){
            if (this.selectedDeclarationTvas.societeVo == null) {
            this.errorMessages.push('Societe de la declarationTva est  invalide');
             this.validDeclarationTvaSociete = false;
            } else {
            this.validDeclarationTvaSociete = true;
            }
            }

            private validateDeclarationTvaTypeDeclarationTva(){
            if (this.selectedDeclarationTvas.typeDeclarationTvaVo == null) {
            this.errorMessages.push('TypeDeclarationTva de la declarationTva est  invalide');
             this.validDeclarationTvaTypeDeclarationTva = false;
            } else {
            this.validDeclarationTvaTypeDeclarationTva = true;
            }
            }

            private validateDeclarationTvaEtatDeclarationTva(){
            if (this.selectedDeclarationTvas.etatDeclarationTvaVo == null) {
            this.errorMessages.push('EtatDeclarationTva de la declarationTva est  invalide');
             this.validDeclarationTvaEtatDeclarationTva = false;
            } else {
            this.validDeclarationTvaEtatDeclarationTva = true;
            }
            }











            private validateDeclarationCnssRef(){
            if (this.selectedDeclarationCnsss.ref == null) {
            this.errorMessages.push('Ref de la declarationCnss est  invalide');
             this.validDeclarationCnssRef = false;
            } else {
            this.validDeclarationCnssRef = true;
            }
            }

            private validateDeclarationCnssEmploye(){
            if (this.selectedDeclarationCnsss.employeVo == null) {
            this.errorMessages.push('Employe de la declarationCnss est  invalide');
             this.validDeclarationCnssEmploye = false;
            } else {
            this.validDeclarationCnssEmploye = true;
            }
            }

            private validateDeclarationCnssSalaireNet(){
            if (this.selectedDeclarationCnsss.salaireNet == null) {
            this.errorMessages.push('SalaireNet de la declarationCnss est  invalide');
             this.validDeclarationCnssSalaireNet = false;
            } else {
            this.validDeclarationCnssSalaireNet = true;
            }
            }

            private validateDeclarationCnssSalaireBrut(){
            if (this.selectedDeclarationCnsss.salaireBrut == null) {
            this.errorMessages.push('SalaireBrut de la declarationCnss est  invalide');
             this.validDeclarationCnssSalaireBrut = false;
            } else {
            this.validDeclarationCnssSalaireBrut = true;
            }
            }

            private validateDeclarationCnssSalaireImposable(){
            if (this.selectedDeclarationCnsss.salaireImposable == null) {
            this.errorMessages.push('SalaireImposable de la declarationCnss est  invalide');
             this.validDeclarationCnssSalaireImposable = false;
            } else {
            this.validDeclarationCnssSalaireImposable = true;
            }
            }

            private validateDeclarationCnssMontantTotal(){
            if (this.selectedDeclarationCnsss.montantTotal == null) {
            this.errorMessages.push('MontantTotal de la declarationCnss est  invalide');
             this.validDeclarationCnssMontantTotal = false;
            } else {
            this.validDeclarationCnssMontantTotal = true;
            }
            }

            private validateDeclarationCnssDeclarationCnssDetails(){
            if (this.selectedDeclarationCnsss.declarationCnssDetailsVo == null || this.selectedDeclarationCnsss.declarationCnssDetailsVo.length === 0) {
            this.errorMessages.push('DeclarationCnssDetails de la declarationCnss est  invalide');
             this.validDeclarationCnssDeclarationCnssDetails = false;
            } else {
            this.validDeclarationCnssDeclarationCnssDetails = true;
            }
            }



            private validateDeclarationCnssSociete(){
            if (this.selectedDeclarationCnsss.societeVo == null) {
            this.errorMessages.push('Societe de la declarationCnss est  invalide');
             this.validDeclarationCnssSociete = false;
            } else {
            this.validDeclarationCnssSociete = true;
            }
            }










            private validateAcompteNumero(){
            if (this.selectedAcomptes.numero == null) {
            this.errorMessages.push('Numero de la acompte est  invalide');
             this.validAcompteNumero = false;
            } else {
            this.validAcompteNumero = true;
            }
            }

            private validateAcompteAnnee(){
            if (this.selectedAcomptes.annee == null) {
            this.errorMessages.push('Annee de la acompte est  invalide');
             this.validAcompteAnnee = false;
            } else {
            this.validAcompteAnnee = true;
            }
            }

            private validateAcompteMontant(){
            if (this.selectedAcomptes.montant == null) {
            this.errorMessages.push('Montant de la acompte est  invalide');
             this.validAcompteMontant = false;
            } else {
            this.validAcompteMontant = true;
            }
            }

            private validateAcompteSociete(){
            if (this.selectedAcomptes.societeVo == null) {
            this.errorMessages.push('Societe de la acompte est  invalide');
             this.validAcompteSociete = false;
            } else {
            this.validAcompteSociete = true;
            }
            }










            private validateEmployeCin(){
            if (this.selectedEmployes.cin == null) {
            this.errorMessages.push('Cin de la employe est  invalide');
             this.validEmployeCin = false;
            } else {
            this.validEmployeCin = true;
            }
            }

            private validateEmployeNom(){
            if (this.selectedEmployes.nom == null) {
            this.errorMessages.push('Nom de la employe est  invalide');
             this.validEmployeNom = false;
            } else {
            this.validEmployeNom = true;
            }
            }

            private validateEmployePrenom(){
            if (this.selectedEmployes.prenom == null) {
            this.errorMessages.push('Prenom de la employe est  invalide');
             this.validEmployePrenom = false;
            } else {
            this.validEmployePrenom = true;
            }
            }


            private validateEmployeTotalSalaireNet(){
            if (this.selectedEmployes.totalSalaireNet == null) {
            this.errorMessages.push('TotalSalaireNet de la employe est  invalide');
             this.validEmployeTotalSalaireNet = false;
            } else {
            this.validEmployeTotalSalaireNet = true;
            }
            }


            private validateEmployeNombreFamille(){
            if (this.selectedEmployes.nombreFamille == null) {
            this.errorMessages.push('NombreFamille de la employe est  invalide');
             this.validEmployeNombreFamille = false;
            } else {
            this.validEmployeNombreFamille = true;
            }
            }






            private validateFactureReference(){
            if (this.selectedFactures.reference == null) {
            this.errorMessages.push('Reference de la facture est  invalide');
             this.validFactureReference = false;
            } else {
            this.validFactureReference = true;
            }
            }

            private validateFactureLibelle(){
            if (this.selectedFactures.libelle == null) {
            this.errorMessages.push('Libelle de la facture est  invalide');
             this.validFactureLibelle = false;
            } else {
            this.validFactureLibelle = true;
            }
            }

            private validateFactureMontantHorsTaxe(){
            if (this.selectedFactures.montantHorsTaxe == null) {
            this.errorMessages.push('MontantHorsTaxe de la facture est  invalide');
             this.validFactureMontantHorsTaxe = false;
            } else {
            this.validFactureMontantHorsTaxe = true;
            }
            }

            private validateFactureDateOperation(){
            if (this.selectedFactures.dateOperation == null) {
            this.errorMessages.push('DateOperation de la facture est  invalide');
             this.validFactureDateOperation = false;
            } else {
            this.validFactureDateOperation = true;
            }
            }




            private validateFactureMontantTtc(){
            if (this.selectedFactures.montantTtc == null) {
            this.errorMessages.push('MontantTtc de la facture est  invalide');
             this.validFactureMontantTtc = false;
            } else {
            this.validFactureMontantTtc = true;
            }
            }

            private validateFactureMontantTva(){
            if (this.selectedFactures.montantTva == null) {
            this.errorMessages.push('MontantTva de la facture est  invalide');
             this.validFactureMontantTva = false;
            } else {
            this.validFactureMontantTva = true;
            }
            }





            private validateFactureTypeOperationFacture(){
            if (this.selectedFactures.typeOperationFactureVo == null) {
            this.errorMessages.push('TypeOperationFacture de la facture est  invalide');
             this.validFactureTypeOperationFacture = false;
            } else {
            this.validFactureTypeOperationFacture = true;
            }
            }



            private validateFactureSociete(){
            if (this.selectedFactures.societeVo == null) {
            this.errorMessages.push('Societe de la facture est  invalide');
             this.validFactureSociete = false;
            } else {
            this.validFactureSociete = true;
            }
            }

            private validateFactureCompteComptable(){
            if (this.selectedFactures.compteComptableVo == null) {
            this.errorMessages.push('CompteComptable de la facture est  invalide');
             this.validFactureCompteComptable = false;
            } else {
            this.validFactureCompteComptable = true;
            }
            }




            private validateFactureClasseComptable(){
            if (this.selectedFactures.classeComptableVo == null) {
            this.errorMessages.push('ClasseComptable de la facture est  invalide');
             this.validFactureClasseComptable = false;
            } else {
            this.validFactureClasseComptable = true;
            }
            }






















//openPopup
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

hideCreateDialog(){
    this.createSocieteDialog  = false;
    this.setValidation(true);
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

   get createSocieteDialog(): boolean {
           return this.societeService.createSocieteDialog;

       }
    set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog= value;
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

    get validComptableCode(): boolean {
    return this._validComptableCode;
    }

    set validComptableCode(value: boolean) {
    this._validComptableCode = value;
    }
    get validComptableNom(): boolean {
    return this._validComptableNom;
    }

    set validComptableNom(value: boolean) {
    this._validComptableNom = value;
    }
    get validComptableTelephone(): boolean {
    return this._validComptableTelephone;
    }

    set validComptableTelephone(value: boolean) {
    this._validComptableTelephone = value;
    }
    get validComptablePrenom(): boolean {
    return this._validComptablePrenom;
    }

    set validComptablePrenom(value: boolean) {
    this._validComptablePrenom = value;
    }
    get validPresidentSocieteCin(): boolean {
    return this._validPresidentSocieteCin;
    }

    set validPresidentSocieteCin(value: boolean) {
    this._validPresidentSocieteCin = value;
    }
    get validPresidentSocieteNom(): boolean {
    return this._validPresidentSocieteNom;
    }

    set validPresidentSocieteNom(value: boolean) {
    this._validPresidentSocieteNom = value;
    }
    get validPresidentSocietePrenom(): boolean {
    return this._validPresidentSocietePrenom;
    }

    set validPresidentSocietePrenom(value: boolean) {
    this._validPresidentSocietePrenom = value;
    }
    get validPresidentSocieteSociete(): boolean {
    return this._validPresidentSocieteSociete;
    }

    set validPresidentSocieteSociete(value: boolean) {
    this._validPresidentSocieteSociete = value;
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
    get validDeclarationIrRefrerence(): boolean {
    return this._validDeclarationIrRefrerence;
    }

    set validDeclarationIrRefrerence(value: boolean) {
    this._validDeclarationIrRefrerence = value;
    }
    get validDeclarationIrAnnee(): boolean {
    return this._validDeclarationIrAnnee;
    }

    set validDeclarationIrAnnee(value: boolean) {
    this._validDeclarationIrAnnee = value;
    }
    get validDeclarationIrMois(): boolean {
    return this._validDeclarationIrMois;
    }

    set validDeclarationIrMois(value: boolean) {
    this._validDeclarationIrMois = value;
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
    get validDeclarationCnssRef(): boolean {
    return this._validDeclarationCnssRef;
    }

    set validDeclarationCnssRef(value: boolean) {
    this._validDeclarationCnssRef = value;
    }
    get validDeclarationCnssEmploye(): boolean {
    return this._validDeclarationCnssEmploye;
    }

    set validDeclarationCnssEmploye(value: boolean) {
    this._validDeclarationCnssEmploye = value;
    }
    get validDeclarationCnssSalaireNet(): boolean {
    return this._validDeclarationCnssSalaireNet;
    }

    set validDeclarationCnssSalaireNet(value: boolean) {
    this._validDeclarationCnssSalaireNet = value;
    }
    get validDeclarationCnssSalaireBrut(): boolean {
    return this._validDeclarationCnssSalaireBrut;
    }

    set validDeclarationCnssSalaireBrut(value: boolean) {
    this._validDeclarationCnssSalaireBrut = value;
    }
    get validDeclarationCnssSalaireImposable(): boolean {
    return this._validDeclarationCnssSalaireImposable;
    }

    set validDeclarationCnssSalaireImposable(value: boolean) {
    this._validDeclarationCnssSalaireImposable = value;
    }
    get validDeclarationCnssMontantTotal(): boolean {
    return this._validDeclarationCnssMontantTotal;
    }

    set validDeclarationCnssMontantTotal(value: boolean) {
    this._validDeclarationCnssMontantTotal = value;
    }
    get validDeclarationCnssDeclarationCnssDetails(): boolean {
    return this._validDeclarationCnssDeclarationCnssDetails;
    }

    set validDeclarationCnssDeclarationCnssDetails(value: boolean) {
    this._validDeclarationCnssDeclarationCnssDetails = value;
    }
    get validDeclarationCnssSociete(): boolean {
    return this._validDeclarationCnssSociete;
    }

    set validDeclarationCnssSociete(value: boolean) {
    this._validDeclarationCnssSociete = value;
    }
    get validAcompteNumero(): boolean {
    return this._validAcompteNumero;
    }

    set validAcompteNumero(value: boolean) {
    this._validAcompteNumero = value;
    }
    get validAcompteAnnee(): boolean {
    return this._validAcompteAnnee;
    }

    set validAcompteAnnee(value: boolean) {
    this._validAcompteAnnee = value;
    }
    get validAcompteMontant(): boolean {
    return this._validAcompteMontant;
    }

    set validAcompteMontant(value: boolean) {
    this._validAcompteMontant = value;
    }
    get validAcompteSociete(): boolean {
    return this._validAcompteSociete;
    }

    set validAcompteSociete(value: boolean) {
    this._validAcompteSociete = value;
    }
    get validEmployeCin(): boolean {
    return this._validEmployeCin;
    }

    set validEmployeCin(value: boolean) {
    this._validEmployeCin = value;
    }
    get validEmployeNom(): boolean {
    return this._validEmployeNom;
    }

    set validEmployeNom(value: boolean) {
    this._validEmployeNom = value;
    }
    get validEmployePrenom(): boolean {
    return this._validEmployePrenom;
    }

    set validEmployePrenom(value: boolean) {
    this._validEmployePrenom = value;
    }
    get validEmployeTotalSalaireNet(): boolean {
    return this._validEmployeTotalSalaireNet;
    }

    set validEmployeTotalSalaireNet(value: boolean) {
    this._validEmployeTotalSalaireNet = value;
    }
    get validEmployeNombreFamille(): boolean {
    return this._validEmployeNombreFamille;
    }

    set validEmployeNombreFamille(value: boolean) {
    this._validEmployeNombreFamille = value;
    }
    get validTypeSocieteCode(): boolean {
    return this._validTypeSocieteCode;
    }

    set validTypeSocieteCode(value: boolean) {
    this._validTypeSocieteCode = value;
    }
    get validTypeSocieteLibelle(): boolean {
    return this._validTypeSocieteLibelle;
    }

    set validTypeSocieteLibelle(value: boolean) {
    this._validTypeSocieteLibelle = value;
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

}
