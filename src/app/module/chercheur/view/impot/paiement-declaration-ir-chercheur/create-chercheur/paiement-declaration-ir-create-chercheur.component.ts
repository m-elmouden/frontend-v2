import {Component, OnInit, Input} from '@angular/core';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
@Component({
  selector: 'app-paiement-declaration-ir-create-chercheur',
  templateUrl: './paiement-declaration-ir-create-chercheur.component.html',
  styleUrls: ['./paiement-declaration-ir-create-chercheur.component.css']
})
export class PaiementDeclarationIrCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaiementDeclarationIrReference = true;
   _validPaiementDeclarationIrDatePaiement = true;
   _validPaiementDeclarationIrTotal = true;
   _validPaiementDeclarationIrDeclarationIr = true;

    _validDeclarationIrRefrerence = true;
    _validDeclarationIrAnnee = true;
    _validDeclarationIrMois = true;



constructor(private datePipe: DatePipe, private paiementDeclarationIrService: PaiementDeclarationIrService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationIrService :DeclarationIrService
) {

}


// methods
ngOnInit(): void {

    this.selectedDeclarationIr = new DeclarationIrVo();
    this.declarationIrService.findAll().subscribe((data) => this.declarationIrs = data);
}




private setValidation(value : boolean){
    this.validPaiementDeclarationIrReference = value;
    this.validPaiementDeclarationIrDatePaiement = value;
    this.validPaiementDeclarationIrTotal = value;
    this.validPaiementDeclarationIrDeclarationIr = value;
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
     this.paiementDeclarationIrService.save().subscribe(paiementDeclarationIr=>{
       this.paiementDeclarationIrs.push({...paiementDeclarationIr});
       this.createPaiementDeclarationIrDialog = false;
       this.submitted = false;
       this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaiementDeclarationIrReference();
this.validatePaiementDeclarationIrDatePaiement();
this.validatePaiementDeclarationIrTotal();
this.validatePaiementDeclarationIrDeclarationIr();

    }

private validatePaiementDeclarationIrReference(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIr.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validPaiementDeclarationIrReference = false;
        } else {
            this.validPaiementDeclarationIrReference = true;
        }
    }
private validatePaiementDeclarationIrDatePaiement(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIr.datePaiement)) {
            this.errorMessages.push('Date paiement non valide');
            this.validPaiementDeclarationIrDatePaiement = false;
        } else {
            this.validPaiementDeclarationIrDatePaiement = true;
        }
    }
private validatePaiementDeclarationIrTotal(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIr.total)) {
            this.errorMessages.push('Total non valide');
            this.validPaiementDeclarationIrTotal = false;
        } else {
            this.validPaiementDeclarationIrTotal = true;
        }
    }
private validatePaiementDeclarationIrDeclarationIr(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationIr.declarationIrVo)) {
            this.errorMessages.push('Declaration ir non valide');
            this.validPaiementDeclarationIrDeclarationIr = false;
        } else {
            this.validPaiementDeclarationIrDeclarationIr = true;
        }
    }











//openPopup
              public async openCreatedeclarationIr(declarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'add');
                       if(isPermistted){
         this.selectedDeclarationIr = new DeclarationIrVo();
        this.createDeclarationIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPaiementDeclarationIrDialog  = false;
    this.setValidation(true);
}

// getters and setters

get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
    return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }

 get selectedPaiementDeclarationIr():PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
    set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }

   get createPaiementDeclarationIrDialog(): boolean {
           return this.paiementDeclarationIrService.createPaiementDeclarationIrDialog;

       }
    set createPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.createPaiementDeclarationIrDialog= value;
       }

       get selectedDeclarationIr(): DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
      set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }
       get declarationIrs(): Array<DeclarationIrVo> {
           return this.declarationIrService.declarationIrs;
       }
       set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }
       get createDeclarationIrDialog(): boolean {
           return this.declarationIrService.createDeclarationIrDialog;
       }
      set createDeclarationIrDialog(value: boolean) {
        this.declarationIrService.createDeclarationIrDialog= value;
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

    get validPaiementDeclarationIrReference(): boolean {
    return this._validPaiementDeclarationIrReference;
    }

    set validPaiementDeclarationIrReference(value: boolean) {
    this._validPaiementDeclarationIrReference = value;
    }
    get validPaiementDeclarationIrDatePaiement(): boolean {
    return this._validPaiementDeclarationIrDatePaiement;
    }

    set validPaiementDeclarationIrDatePaiement(value: boolean) {
    this._validPaiementDeclarationIrDatePaiement = value;
    }
    get validPaiementDeclarationIrTotal(): boolean {
    return this._validPaiementDeclarationIrTotal;
    }

    set validPaiementDeclarationIrTotal(value: boolean) {
    this._validPaiementDeclarationIrTotal = value;
    }
    get validPaiementDeclarationIrDeclarationIr(): boolean {
    return this._validPaiementDeclarationIrDeclarationIr;
    }

    set validPaiementDeclarationIrDeclarationIr(value: boolean) {
    this._validPaiementDeclarationIrDeclarationIr = value;
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

}
