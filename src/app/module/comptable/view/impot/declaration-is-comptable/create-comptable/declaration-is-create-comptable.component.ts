import {Component, OnInit, Input} from '@angular/core';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
@Component({
  selector: 'app-declaration-is-create-comptable',
  templateUrl: './declaration-is-create-comptable.component.html',
  styleUrls: ['./declaration-is-create-comptable.component.css']
})
export class DeclarationIsCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDeclarationIsReference = true;
   _validDeclarationIsAnnee = true;
   _validDeclarationIsSociete = true;
   _validDeclarationIsTauxIs = true;
   _validDeclarationIsEtatDeclarationIs = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validTauxIsReference = true;
    _validTauxIsResultatFiscalMin = true;
    _validTauxIsResultatFiscalMax = true;
    _validTauxIsPourcentage = true;
    _validTauxIsPenalite = true;
    _validTauxIsConfigReference = true;
    _validTauxIsConfigCotisationMinimale = true;
    _validTauxIsConfigDateMin = true;
    _validTauxIsConfigDateMax = true;
    _validEtatDeclarationIsReference = true;
    _validEtatDeclarationIsLibelle = true;
    _validPaiementDeclarationIsReference = true;
    _validPaiementDeclarationIsDatePaiement = true;
    _validPaiementDeclarationIsTotal = true;
    _validPaiementDeclarationIsDeclarationIs = true;



constructor(private datePipe: DatePipe, private declarationIsService: DeclarationIsService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private tauxIsConfigService :TauxIsConfigService
,       private paiementDeclarationIsService :PaiementDeclarationIsService
,       private etatDeclarationIsService :EtatDeclarationIsService
,       private societeService :SocieteService
,       private tauxIsService :TauxIsService
) {

}


// methods
ngOnInit(): void {

    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedTauxIs = new TauxIsVo();
    this.tauxIsService.findAll().subscribe((data) => this.tauxIss = data);
    this.selectedTauxIsConfig = new TauxIsConfigVo();
    this.tauxIsConfigService.findAll().subscribe((data) => this.tauxIsConfigs = data);
    this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();
    this.etatDeclarationIsService.findAll().subscribe((data) => this.etatDeclarationIss = data);
    this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();
    this.paiementDeclarationIsService.findAll().subscribe((data) => this.paiementDeclarationIss = data);
}




private setValidation(value : boolean){
    this.validDeclarationIsReference = value;
    this.validDeclarationIsAnnee = value;
    this.validDeclarationIsSociete = value;
    this.validDeclarationIsTauxIs = value;
    this.validDeclarationIsEtatDeclarationIs = value;
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
     this.declarationIsService.save().subscribe(declarationIs=>{
       this.declarationIss.push({...declarationIs});
       this.createDeclarationIsDialog = false;
       this.submitted = false;
       this.selectedDeclarationIs = new DeclarationIsVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDeclarationIsReference();
this.validateDeclarationIsAnnee();
this.validateDeclarationIsSociete();
this.validateDeclarationIsTauxIs();
this.validateDeclarationIsEtatDeclarationIs();

    }

private validateDeclarationIsReference(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIs.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validDeclarationIsReference = false;
        } else {
            this.validDeclarationIsReference = true;
        }
    }
private validateDeclarationIsAnnee(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIs.annee)) {
            this.errorMessages.push('Annee non valide');
            this.validDeclarationIsAnnee = false;
        } else {
            this.validDeclarationIsAnnee = true;
        }
    }
private validateDeclarationIsSociete(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIs.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validDeclarationIsSociete = false;
        } else {
            this.validDeclarationIsSociete = true;
        }
    }
private validateDeclarationIsTauxIs(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIs.tauxIsVo)) {
            this.errorMessages.push('Taux is non valide');
            this.validDeclarationIsTauxIs = false;
        } else {
            this.validDeclarationIsTauxIs = true;
        }
    }
private validateDeclarationIsEtatDeclarationIs(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIs.etatDeclarationIsVo)) {
            this.errorMessages.push('Etat declaration is non valide');
            this.validDeclarationIsEtatDeclarationIs = false;
        } else {
            this.validDeclarationIsEtatDeclarationIs = true;
        }
    }























//openPopup
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
// methods

hideCreateDialog(){
    this.createDeclarationIsDialog  = false;
    this.setValidation(true);
}

// getters and setters

get declarationIss(): Array<DeclarationIsVo> {
    return this.declarationIsService.declarationIss;
       }
set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }

 get selectedDeclarationIs():DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
    set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }

   get createDeclarationIsDialog(): boolean {
           return this.declarationIsService.createDeclarationIsDialog;

       }
    set createDeclarationIsDialog(value: boolean) {
        this.declarationIsService.createDeclarationIsDialog= value;
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
    get validTauxIsReference(): boolean {
    return this._validTauxIsReference;
    }

    set validTauxIsReference(value: boolean) {
    this._validTauxIsReference = value;
    }
    get validTauxIsResultatFiscalMin(): boolean {
    return this._validTauxIsResultatFiscalMin;
    }

    set validTauxIsResultatFiscalMin(value: boolean) {
    this._validTauxIsResultatFiscalMin = value;
    }
    get validTauxIsResultatFiscalMax(): boolean {
    return this._validTauxIsResultatFiscalMax;
    }

    set validTauxIsResultatFiscalMax(value: boolean) {
    this._validTauxIsResultatFiscalMax = value;
    }
    get validTauxIsPourcentage(): boolean {
    return this._validTauxIsPourcentage;
    }

    set validTauxIsPourcentage(value: boolean) {
    this._validTauxIsPourcentage = value;
    }
    get validTauxIsPenalite(): boolean {
    return this._validTauxIsPenalite;
    }

    set validTauxIsPenalite(value: boolean) {
    this._validTauxIsPenalite = value;
    }
    get validTauxIsConfigReference(): boolean {
    return this._validTauxIsConfigReference;
    }

    set validTauxIsConfigReference(value: boolean) {
    this._validTauxIsConfigReference = value;
    }
    get validTauxIsConfigCotisationMinimale(): boolean {
    return this._validTauxIsConfigCotisationMinimale;
    }

    set validTauxIsConfigCotisationMinimale(value: boolean) {
    this._validTauxIsConfigCotisationMinimale = value;
    }
    get validTauxIsConfigDateMin(): boolean {
    return this._validTauxIsConfigDateMin;
    }

    set validTauxIsConfigDateMin(value: boolean) {
    this._validTauxIsConfigDateMin = value;
    }
    get validTauxIsConfigDateMax(): boolean {
    return this._validTauxIsConfigDateMax;
    }

    set validTauxIsConfigDateMax(value: boolean) {
    this._validTauxIsConfigDateMax = value;
    }
    get validEtatDeclarationIsReference(): boolean {
    return this._validEtatDeclarationIsReference;
    }

    set validEtatDeclarationIsReference(value: boolean) {
    this._validEtatDeclarationIsReference = value;
    }
    get validEtatDeclarationIsLibelle(): boolean {
    return this._validEtatDeclarationIsLibelle;
    }

    set validEtatDeclarationIsLibelle(value: boolean) {
    this._validEtatDeclarationIsLibelle = value;
    }
    get validPaiementDeclarationIsReference(): boolean {
    return this._validPaiementDeclarationIsReference;
    }

    set validPaiementDeclarationIsReference(value: boolean) {
    this._validPaiementDeclarationIsReference = value;
    }
    get validPaiementDeclarationIsDatePaiement(): boolean {
    return this._validPaiementDeclarationIsDatePaiement;
    }

    set validPaiementDeclarationIsDatePaiement(value: boolean) {
    this._validPaiementDeclarationIsDatePaiement = value;
    }
    get validPaiementDeclarationIsTotal(): boolean {
    return this._validPaiementDeclarationIsTotal;
    }

    set validPaiementDeclarationIsTotal(value: boolean) {
    this._validPaiementDeclarationIsTotal = value;
    }
    get validPaiementDeclarationIsDeclarationIs(): boolean {
    return this._validPaiementDeclarationIsDeclarationIs;
    }

    set validPaiementDeclarationIsDeclarationIs(value: boolean) {
    this._validPaiementDeclarationIsDeclarationIs = value;
    }

}
