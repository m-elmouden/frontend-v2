import {Component, OnInit, Input} from '@angular/core';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
@Component({
  selector: 'app-demande-create-admin',
  templateUrl: './demande-create-admin.component.html',
  styleUrls: ['./demande-create-admin.component.css']
})
export class DemandeCreateAdminComponent implements OnInit {

        selectedFactures: FactureVo = new FactureVo();
        selectedDemandePieceJointes: DemandePieceJointeVo = new DemandePieceJointeVo();
        selectedCommentaires: CommentaireVo = new CommentaireVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDemandeReference = true;
   _validDemandeOperation = true;
   _validDemandeDateDemande = true;
   _validDemandeSociete = true;
   _validDemandeComptable = true;
   _validDemandeEtatDemande = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validComptableCode = true;
    _validComptableNom = true;
    _validComptableTelephone = true;
    _validComptablePrenom = true;
    _validEtatDemandeReference = true;
    _validEtatDemandeLibelle = true;
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
    _validDemandePieceJointeName = true;
    _validDemandePieceJointePath = true;
    _validCommentaireDescription = true;
    _validCommentaireDateCommentaire = true;



constructor(private datePipe: DatePipe, private demandeService: DemandeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatFactureService :EtatFactureService
,       private etatDemandeService :EtatDemandeService
,       private societeService :SocieteService
,       private factureService :FactureService
,       private comptableService :ComptableService
,       private classeComptableService :ClasseComptableService
,       private cpcFactureService :CpcFactureService
,       private commentaireService :CommentaireService
,       private etatPaiementService :EtatPaiementService
,       private declarationTvaService :DeclarationTvaService
,       private typeOperationFactureService :TypeOperationFactureService
,       private compteComptableService :CompteComptableService
,       private declarationIsService :DeclarationIsService
,       private demandePieceJointeService :DemandePieceJointeService
,       private tvaService :TvaService
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
    validateDemandePieceJointes(){
    this.errorMessages = new Array();
    this.validateDemandePieceJointeName();
    this.validateDemandePieceJointePath();
    }
    validateCommentaires(){
    this.errorMessages = new Array();
    this.validateCommentaireDescription();
    this.validateCommentaireDateCommentaire();
    }


private setValidation(value : boolean){
    this.validDemandeReference = value;
    this.validDemandeOperation = value;
    this.validDemandeDateDemande = value;
    this.validDemandeSociete = value;
    this.validDemandeComptable = value;
    this.validDemandeEtatDemande = value;
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
    this.validDemandePieceJointeName = value;
    this.validDemandePieceJointePath = value;
    this.validCommentaireDescription = value;
    this.validCommentaireDateCommentaire = value;
    }

        addFactures() {
        if( this.selectedDemande.facturesVo == null ){
            this.selectedDemande.facturesVo = new Array<FactureVo>();
        }
       this.validateFactures();
       if (this.errorMessages.length === 0) {
              this.selectedDemande.facturesVo.push(this.selectedFactures);
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
        this.selectedDemande.facturesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemande.facturesVo.splice(index, 1); }
        });
    }
        addDemandePieceJointes() {
        if( this.selectedDemande.demandePieceJointesVo == null ){
            this.selectedDemande.demandePieceJointesVo = new Array<DemandePieceJointeVo>();
        }
       this.validateDemandePieceJointes();
       if (this.errorMessages.length === 0) {
              this.selectedDemande.demandePieceJointesVo.push(this.selectedDemandePieceJointes);
              this.selectedDemandePieceJointes = new DemandePieceJointeVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateCommentaires();
       if (this.errorMessages.length === 0) {
              this.selectedDemande.commentairesVo.push(this.selectedCommentaires);
              this.selectedCommentaires = new CommentaireVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCommentaires(p: CommentaireVo) {
        this.selectedDemande.commentairesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemande.commentairesVo.splice(index, 1); }
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
     this.demandeService.save().subscribe(demande=>{
       this.demandes.push({...demande});
       this.createDemandeDialog = false;
       this.submitted = false;
       this.selectedDemande = new DemandeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDemandeReference();
this.validateDemandeOperation();
this.validateDemandeDateDemande();
this.validateDemandeSociete();
this.validateDemandeComptable();
this.validateDemandeEtatDemande();

    }

private validateDemandeReference(){
        if (this.stringUtilService.isEmpty(this.selectedDemande.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validDemandeReference = false;
        } else {
            this.validDemandeReference = true;
        }
    }
private validateDemandeOperation(){
        if (this.stringUtilService.isEmpty(this.selectedDemande.operation)) {
            this.errorMessages.push('Operation non valide');
            this.validDemandeOperation = false;
        } else {
            this.validDemandeOperation = true;
        }
    }
private validateDemandeDateDemande(){
        if (this.stringUtilService.isEmpty(this.selectedDemande.dateDemande)) {
            this.errorMessages.push('Date demande non valide');
            this.validDemandeDateDemande = false;
        } else {
            this.validDemandeDateDemande = true;
        }
    }
private validateDemandeSociete(){
        if (this.stringUtilService.isEmpty(this.selectedDemande.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validDemandeSociete = false;
        } else {
            this.validDemandeSociete = true;
        }
    }
private validateDemandeComptable(){
        if (this.stringUtilService.isEmpty(this.selectedDemande.comptableVo)) {
            this.errorMessages.push('Comptable non valide');
            this.validDemandeComptable = false;
        } else {
            this.validDemandeComptable = true;
        }
    }
private validateDemandeEtatDemande(){
        if (this.stringUtilService.isEmpty(this.selectedDemande.etatDemandeVo)) {
            this.errorMessages.push('Etat demande non valide');
            this.validDemandeEtatDemande = false;
        } else {
            this.validDemandeEtatDemande = true;
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











            private validateDemandePieceJointeName(){
            if (this.selectedDemandePieceJointes.name == null) {
            this.errorMessages.push('Name de la demandePieceJointe est  invalide');
             this.validDemandePieceJointeName = false;
            } else {
            this.validDemandePieceJointeName = true;
            }
            }

            private validateDemandePieceJointePath(){
            if (this.selectedDemandePieceJointes.path == null) {
            this.errorMessages.push('Path de la demandePieceJointe est  invalide');
             this.validDemandePieceJointePath = false;
            } else {
            this.validDemandePieceJointePath = true;
            }
            }





            private validateCommentaireDescription(){
            if (this.selectedCommentaires.description == null) {
            this.errorMessages.push('Description de la commentaire est  invalide');
             this.validCommentaireDescription = false;
            } else {
            this.validCommentaireDescription = true;
            }
            }

            private validateCommentaireDateCommentaire(){
            if (this.selectedCommentaires.dateCommentaire == null) {
            this.errorMessages.push('DateCommentaire de la commentaire est  invalide');
             this.validCommentaireDateCommentaire = false;
            } else {
            this.validCommentaireDateCommentaire = true;
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

hideCreateDialog(){
    this.createDemandeDialog  = false;
    this.setValidation(true);
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

   get createDemandeDialog(): boolean {
           return this.demandeService.createDemandeDialog;

       }
    set createDemandeDialog(value: boolean) {
        this.demandeService.createDemandeDialog= value;
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
    get validEtatDemandeReference(): boolean {
    return this._validEtatDemandeReference;
    }

    set validEtatDemandeReference(value: boolean) {
    this._validEtatDemandeReference = value;
    }
    get validEtatDemandeLibelle(): boolean {
    return this._validEtatDemandeLibelle;
    }

    set validEtatDemandeLibelle(value: boolean) {
    this._validEtatDemandeLibelle = value;
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
    get validDemandePieceJointeName(): boolean {
    return this._validDemandePieceJointeName;
    }

    set validDemandePieceJointeName(value: boolean) {
    this._validDemandePieceJointeName = value;
    }
    get validDemandePieceJointePath(): boolean {
    return this._validDemandePieceJointePath;
    }

    set validDemandePieceJointePath(value: boolean) {
    this._validDemandePieceJointePath = value;
    }
    get validCommentaireDescription(): boolean {
    return this._validCommentaireDescription;
    }

    set validCommentaireDescription(value: boolean) {
    this._validCommentaireDescription = value;
    }
    get validCommentaireDateCommentaire(): boolean {
    return this._validCommentaireDateCommentaire;
    }

    set validCommentaireDateCommentaire(value: boolean) {
    this._validCommentaireDateCommentaire = value;
    }

}
