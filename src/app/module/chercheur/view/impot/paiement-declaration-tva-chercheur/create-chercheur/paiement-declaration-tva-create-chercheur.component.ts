import {Component, OnInit, Input} from '@angular/core';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
@Component({
  selector: 'app-paiement-declaration-tva-create-chercheur',
  templateUrl: './paiement-declaration-tva-create-chercheur.component.html',
  styleUrls: ['./paiement-declaration-tva-create-chercheur.component.css']
})
export class PaiementDeclarationTvaCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaiementDeclarationTvaReference = true;
   _validPaiementDeclarationTvaDatePaiement = true;
   _validPaiementDeclarationTvaTotal = true;

    _validDeclarationTvaReference = true;
    _validDeclarationTvaSociete = true;
    _validDeclarationTvaTypeDeclarationTva = true;
    _validDeclarationTvaEtatDeclarationTva = true;



constructor(private datePipe: DatePipe, private paiementDeclarationTvaService: PaiementDeclarationTvaService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationTvaService :DeclarationTvaService
) {

}


// methods
ngOnInit(): void {

    this.selectedDeclarationTva = new DeclarationTvaVo();
    this.declarationTvaService.findAll().subscribe((data) => this.declarationTvas = data);
}




private setValidation(value : boolean){
    this.validPaiementDeclarationTvaReference = value;
    this.validPaiementDeclarationTvaDatePaiement = value;
    this.validPaiementDeclarationTvaTotal = value;
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
     this.paiementDeclarationTvaService.save().subscribe(paiementDeclarationTva=>{
       this.paiementDeclarationTvas.push({...paiementDeclarationTva});
       this.createPaiementDeclarationTvaDialog = false;
       this.submitted = false;
       this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaiementDeclarationTvaReference();
this.validatePaiementDeclarationTvaDatePaiement();
this.validatePaiementDeclarationTvaTotal();

    }

private validatePaiementDeclarationTvaReference(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationTva.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validPaiementDeclarationTvaReference = false;
        } else {
            this.validPaiementDeclarationTvaReference = true;
        }
    }
private validatePaiementDeclarationTvaDatePaiement(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationTva.datePaiement)) {
            this.errorMessages.push('Date paiement non valide');
            this.validPaiementDeclarationTvaDatePaiement = false;
        } else {
            this.validPaiementDeclarationTvaDatePaiement = true;
        }
    }
private validatePaiementDeclarationTvaTotal(){
        if (this.stringUtilService.isEmpty(this.selectedPaiementDeclarationTva.total)) {
            this.errorMessages.push('Total non valide');
            this.validPaiementDeclarationTvaTotal = false;
        } else {
            this.validPaiementDeclarationTvaTotal = true;
        }
    }











//openPopup
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
// methods

hideCreateDialog(){
    this.createPaiementDeclarationTvaDialog  = false;
    this.setValidation(true);
}

// getters and setters

get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
    return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }

 get selectedPaiementDeclarationTva():PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
    set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }

   get createPaiementDeclarationTvaDialog(): boolean {
           return this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog;

       }
    set createPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog= value;
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

}
