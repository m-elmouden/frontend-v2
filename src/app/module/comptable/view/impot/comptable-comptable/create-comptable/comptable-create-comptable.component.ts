import {Component, OnInit, Input} from '@angular/core';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
import {TypeComptableService} from '../../../../../../controller/service/TypeComptable.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
@Component({
  selector: 'app-comptable-create-comptable',
  templateUrl: './comptable-create-comptable.component.html',
  styleUrls: ['./comptable-create-comptable.component.css']
})
export class ComptableCreateComptableComponent implements OnInit {

        selectedSocietes: SocieteVo = new SocieteVo();
        selectedDemandes: DemandeVo = new DemandeVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validComptableCode = true;
   _validComptableNom = true;
   _validComptableTelephone = true;
   _validComptablePrenom = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validDemandeReference = true;
    _validDemandeOperation = true;
    _validDemandeDateDemande = true;
    _validDemandeSociete = true;
    _validDemandeComptable = true;
    _validDemandeEtatDemande = true;



constructor(private datePipe: DatePipe, private comptableService: ComptableService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeComptableService :TypeComptableService
,       private demandeService :DemandeService
,       private etatDemandeService :EtatDemandeService
,       private societeService :SocieteService
,       private presidentSocieteService :PresidentSocieteService
,       private typeSocieteService :TypeSocieteService
) {

}


// methods
ngOnInit(): void {


                this.selectedSocietes.presidentSocieteVo = new PresidentSocieteVo();
                this.presidentSocieteService.findAll().subscribe((data) => this.presidentSocietes = data);
                this.selectedSocietes.typeSocieteVo = new TypeSocieteVo();
                this.typeSocieteService.findAll().subscribe((data) => this.typeSocietes = data);



                this.selectedDemandes.societeVo = new SocieteVo();
                this.societeService.findAll().subscribe((data) => this.societes = data);
                this.selectedDemandes.etatDemandeVo = new EtatDemandeVo();
                this.etatDemandeService.findAll().subscribe((data) => this.etatDemandes = data);


    this.selectedTypeComptable = new TypeComptableVo();
    this.typeComptableService.findAll().subscribe((data) => this.typeComptables = data);
}


    validateSocietes(){
    this.errorMessages = new Array();
    this.validateSocieteIce();
    this.validateSocieteRaisonSociale();
    this.validateSocieteDateCreation();
    this.validateSocieteAge();
    this.validateSocietePresidentSociete();
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


private setValidation(value : boolean){
    this.validComptableCode = value;
    this.validComptableNom = value;
    this.validComptableTelephone = value;
    this.validComptablePrenom = value;
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
    }

        addSocietes() {
        if( this.selectedComptable.societesVo == null ){
            this.selectedComptable.societesVo = new Array<SocieteVo>();
        }
       this.validateSocietes();
       if (this.errorMessages.length === 0) {
              this.selectedComptable.societesVo.push(this.selectedSocietes);
              this.selectedSocietes = new SocieteVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteSocietes(p: SocieteVo) {
        this.selectedComptable.societesVo.forEach((element, index) => {
            if (element === p) { this.selectedComptable.societesVo.splice(index, 1); }
        });
    }
        addDemandes() {
        if( this.selectedComptable.demandesVo == null ){
            this.selectedComptable.demandesVo = new Array<DemandeVo>();
        }
       this.validateDemandes();
       if (this.errorMessages.length === 0) {
              this.selectedComptable.demandesVo.push(this.selectedDemandes);
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
        this.selectedComptable.demandesVo.forEach((element, index) => {
            if (element === p) { this.selectedComptable.demandesVo.splice(index, 1); }
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
     this.comptableService.save().subscribe(comptable=>{
       this.comptables.push({...comptable});
       this.createComptableDialog = false;
       this.submitted = false;
       this.selectedComptable = new ComptableVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateComptableCode();
this.validateComptableNom();
this.validateComptableTelephone();
this.validateComptablePrenom();

    }

private validateComptableCode(){
        if (this.stringUtilService.isEmpty(this.selectedComptable.code)) {
            this.errorMessages.push('Code non valide');
            this.validComptableCode = false;
        } else {
            this.validComptableCode = true;
        }
    }
private validateComptableNom(){
        if (this.stringUtilService.isEmpty(this.selectedComptable.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validComptableNom = false;
        } else {
            this.validComptableNom = true;
        }
    }
private validateComptableTelephone(){
        if (this.stringUtilService.isEmpty(this.selectedComptable.telephone)) {
            this.errorMessages.push('Telephone non valide');
            this.validComptableTelephone = false;
        } else {
            this.validComptableTelephone = true;
        }
    }
private validateComptablePrenom(){
        if (this.stringUtilService.isEmpty(this.selectedComptable.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validComptablePrenom = false;
        } else {
            this.validComptablePrenom = true;
        }
    }










            private validateSocieteIce(){
            if (this.selectedSocietes.ice == null) {
            this.errorMessages.push('Ice de la societe est  invalide');
             this.validSocieteIce = false;
            } else {
            this.validSocieteIce = true;
            }
            }




            private validateSocieteRaisonSociale(){
            if (this.selectedSocietes.raisonSociale == null) {
            this.errorMessages.push('RaisonSociale de la societe est  invalide');
             this.validSocieteRaisonSociale = false;
            } else {
            this.validSocieteRaisonSociale = true;
            }
            }

            private validateSocieteDateCreation(){
            if (this.selectedSocietes.dateCreation == null) {
            this.errorMessages.push('DateCreation de la societe est  invalide');
             this.validSocieteDateCreation = false;
            } else {
            this.validSocieteDateCreation = true;
            }
            }




            private validateSocieteAge(){
            if (this.selectedSocietes.age == null) {
            this.errorMessages.push('Age de la societe est  invalide');
             this.validSocieteAge = false;
            } else {
            this.validSocieteAge = true;
            }
            }


            private validateSocietePresidentSociete(){
            if (this.selectedSocietes.presidentSocieteVo == null) {
            this.errorMessages.push('PresidentSociete de la societe est  invalide');
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
























//openPopup
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
              public async openCreatetypeComptable(typeComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeComptable', 'add');
                       if(isPermistted){
         this.selectedTypeComptable = new TypeComptableVo();
        this.createTypeComptableDialog = true;
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
    this.createComptableDialog  = false;
    this.setValidation(true);
}

// getters and setters

get comptables(): Array<ComptableVo> {
    return this.comptableService.comptables;
       }
set comptables(value: Array<ComptableVo>) {
        this.comptableService.comptables = value;
       }

 get selectedComptable():ComptableVo {
           return this.comptableService.selectedComptable;
       }
    set selectedComptable(value: ComptableVo) {
        this.comptableService.selectedComptable = value;
       }

   get createComptableDialog(): boolean {
           return this.comptableService.createComptableDialog;

       }
    set createComptableDialog(value: boolean) {
        this.comptableService.createComptableDialog= value;
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
       get selectedTypeComptable(): TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
      set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }
       get typeComptables(): Array<TypeComptableVo> {
           return this.typeComptableService.typeComptables;
       }
       set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }
       get createTypeComptableDialog(): boolean {
           return this.typeComptableService.createTypeComptableDialog;
       }
      set createTypeComptableDialog(value: boolean) {
        this.typeComptableService.createTypeComptableDialog= value;
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

}
