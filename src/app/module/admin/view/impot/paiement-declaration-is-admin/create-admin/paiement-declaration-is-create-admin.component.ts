import {Component, OnInit, Input} from '@angular/core';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
@Component({
  selector: 'app-paiement-declaration-is-create-admin',
  templateUrl: './paiement-declaration-is-create-admin.component.html',
  styleUrls: ['./paiement-declaration-is-create-admin.component.css']
})
export class PaiementDeclarationIsCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaiementDeclarationIsReference = true;
   _validPaiementDeclarationIsDatePaiement = true;
   _validPaiementDeclarationIsTotal = true;
   _validPaiementDeclarationIsDeclarationIs = true;

    _validDeclarationIsReference = true;
    _validDeclarationIsAnnee = true;
    _validDeclarationIsSociete = true;
    _validDeclarationIsTauxIs = true;
    _validDeclarationIsEtatDeclarationIs = true;



constructor(private datePipe: DatePipe, private paiementDeclarationIsService: PaiementDeclarationIsService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationIsService :DeclarationIsService
) {

}


// methods
ngOnInit(): void {

    this.selectedDeclarationIs = new DeclarationIsVo();
    this.declarationIsService.findAll().subscribe((data) => this.declarationIss = data);
}




private setValidation(value : boolean){
    this.validPaiementDeclarationIsReference = value;
    this.validPaiementDeclarationIsDatePaiement = value;
    this.validPaiementDeclarationIsTotal = value;
    this.validPaiementDeclarationIsDeclarationIs = value;
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
     this.paiementDeclarationIsService.save().subscribe(paiementDeclarationIs=>{
       this.paiementDeclarationIss.push({...paiementDeclarationIs});
       this.createPaiementDeclarationIsDialog = false;
       this.submitted = false;
       this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaiementDeclarationIsReference();
this.validatePaiementDeclarationIsDatePaiement();
this.validatePaiementDeclarationIsTotal();
this.validatePaiementDeclarationIsDeclarationIs();

    }

private validatePaiementDeclarationIsReference(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIs.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validPaiementDeclarationIsReference = false;
        } else {
            this.validPaiementDeclarationIsReference = true;
        }
    }
private validatePaiementDeclarationIsDatePaiement(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIs.datePaiement)) {
            this.errorMessages.push('Date paiement non valide');
            this.validPaiementDeclarationIsDatePaiement = false;
        } else {
            this.validPaiementDeclarationIsDatePaiement = true;
        }
    }
private validatePaiementDeclarationIsTotal(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIs.total)) {
            this.errorMessages.push('Total non valide');
            this.validPaiementDeclarationIsTotal = false;
        } else {
            this.validPaiementDeclarationIsTotal = true;
        }
    }
private validatePaiementDeclarationIsDeclarationIs(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIs.declarationIsVo)) {
            this.errorMessages.push('Declaration is non valide');
            this.validPaiementDeclarationIsDeclarationIs = false;
        } else {
            this.validPaiementDeclarationIsDeclarationIs = true;
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
// methods

hideCreateDialog(){
    this.createPaiementDeclarationIsDialog  = false;
    this.setValidation(true);
}

// getters and setters

get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
    return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }

 get selectedPaiementDeclarationIs():PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
    set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }

   get createPaiementDeclarationIsDialog(): boolean {
           return this.paiementDeclarationIsService.createPaiementDeclarationIsDialog;

       }
    set createPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.createPaiementDeclarationIsDialog= value;
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

}
