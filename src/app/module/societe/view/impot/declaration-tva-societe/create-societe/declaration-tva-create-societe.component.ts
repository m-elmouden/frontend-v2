import {Component, OnInit, Input} from '@angular/core';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
@Component({
  selector: 'app-declaration-tva-create-societe',
  templateUrl: './declaration-tva-create-societe.component.html',
  styleUrls: ['./declaration-tva-create-societe.component.css']
})
export class DeclarationTvaCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDeclarationTvaReference = true;
   _validDeclarationTvaSociete = true;
   _validDeclarationTvaTypeDeclarationTva = true;
   _validDeclarationTvaEtatDeclarationTva = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validTypeDeclarationTvaReference = true;
    _validTypeDeclarationTvaLibelle = true;
    _validEtatDeclarationTvaReference = true;
    _validEtatDeclarationTvaLibelle = true;
    _validPaiementDeclarationTvaReference = true;
    _validPaiementDeclarationTvaDatePaiement = true;
    _validPaiementDeclarationTvaTotal = true;



constructor(private datePipe: DatePipe, private declarationTvaService: DeclarationTvaService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatDeclarationTvaService :EtatDeclarationTvaService
,       private societeService :SocieteService
,       private paiementDeclarationTvaService :PaiementDeclarationTvaService
,       private typeDeclarationTvaService :TypeDeclarationTvaService
) {

}


// methods
ngOnInit(): void {

    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();
    this.typeDeclarationTvaService.findAll().subscribe((data) => this.typeDeclarationTvas = data);
    this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();
    this.etatDeclarationTvaService.findAll().subscribe((data) => this.etatDeclarationTvas = data);
    this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();
    this.paiementDeclarationTvaService.findAll().subscribe((data) => this.paiementDeclarationTvas = data);
}




private setValidation(value : boolean){
    this.validDeclarationTvaReference = value;
    this.validDeclarationTvaSociete = value;
    this.validDeclarationTvaTypeDeclarationTva = value;
    this.validDeclarationTvaEtatDeclarationTva = value;
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
     this.declarationTvaService.save().subscribe(declarationTva=>{
       this.declarationTvas.push({...declarationTva});
       this.createDeclarationTvaDialog = false;
       this.submitted = false;
       this.selectedDeclarationTva = new DeclarationTvaVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDeclarationTvaReference();
this.validateDeclarationTvaSociete();
this.validateDeclarationTvaTypeDeclarationTva();
this.validateDeclarationTvaEtatDeclarationTva();

    }

private validateDeclarationTvaReference(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationTva.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validDeclarationTvaReference = false;
        } else {
            this.validDeclarationTvaReference = true;
        }
    }
private validateDeclarationTvaSociete(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationTva.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validDeclarationTvaSociete = false;
        } else {
            this.validDeclarationTvaSociete = true;
        }
    }
private validateDeclarationTvaTypeDeclarationTva(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationTva.typeDeclarationTvaVo)) {
            this.errorMessages.push('Type declaration tva non valide');
            this.validDeclarationTvaTypeDeclarationTva = false;
        } else {
            this.validDeclarationTvaTypeDeclarationTva = true;
        }
    }
private validateDeclarationTvaEtatDeclarationTva(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationTva.etatDeclarationTvaVo)) {
            this.errorMessages.push('Etat declaration tva non valide');
            this.validDeclarationTvaEtatDeclarationTva = false;
        } else {
            this.validDeclarationTvaEtatDeclarationTva = true;
        }
    }























//openPopup
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
// methods

hideCreateDialog(){
    this.createDeclarationTvaDialog  = false;
    this.setValidation(true);
}

// getters and setters

get declarationTvas(): Array<DeclarationTvaVo> {
    return this.declarationTvaService.declarationTvas;
       }
set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }

 get selectedDeclarationTva():DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
    set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }

   get createDeclarationTvaDialog(): boolean {
           return this.declarationTvaService.createDeclarationTvaDialog;

       }
    set createDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.createDeclarationTvaDialog= value;
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
    get validTypeDeclarationTvaReference(): boolean {
    return this._validTypeDeclarationTvaReference;
    }

    set validTypeDeclarationTvaReference(value: boolean) {
    this._validTypeDeclarationTvaReference = value;
    }
    get validTypeDeclarationTvaLibelle(): boolean {
    return this._validTypeDeclarationTvaLibelle;
    }

    set validTypeDeclarationTvaLibelle(value: boolean) {
    this._validTypeDeclarationTvaLibelle = value;
    }
    get validEtatDeclarationTvaReference(): boolean {
    return this._validEtatDeclarationTvaReference;
    }

    set validEtatDeclarationTvaReference(value: boolean) {
    this._validEtatDeclarationTvaReference = value;
    }
    get validEtatDeclarationTvaLibelle(): boolean {
    return this._validEtatDeclarationTvaLibelle;
    }

    set validEtatDeclarationTvaLibelle(value: boolean) {
    this._validEtatDeclarationTvaLibelle = value;
    }
    get validPaiementDeclarationTvaReference(): boolean {
    return this._validPaiementDeclarationTvaReference;
    }

    set validPaiementDeclarationTvaReference(value: boolean) {
    this._validPaiementDeclarationTvaReference = value;
    }
    get validPaiementDeclarationTvaDatePaiement(): boolean {
    return this._validPaiementDeclarationTvaDatePaiement;
    }

    set validPaiementDeclarationTvaDatePaiement(value: boolean) {
    this._validPaiementDeclarationTvaDatePaiement = value;
    }
    get validPaiementDeclarationTvaTotal(): boolean {
    return this._validPaiementDeclarationTvaTotal;
    }

    set validPaiementDeclarationTvaTotal(value: boolean) {
    this._validPaiementDeclarationTvaTotal = value;
    }

}
