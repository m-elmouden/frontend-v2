import {Component, OnInit, Input} from '@angular/core';
import {FacturePieceJointeService} from '../../../../../../controller/service/FacturePieceJointe.service';
import {FacturePieceJointeVo} from '../../../../../../controller/model/FacturePieceJointe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
@Component({
  selector: 'app-facture-piece-jointe-create-comptable',
  templateUrl: './facture-piece-jointe-create-comptable.component.html',
  styleUrls: ['./facture-piece-jointe-create-comptable.component.css']
})
export class FacturePieceJointeCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFacturePieceJointeName = true;
   _validFacturePieceJointePath = true;

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



constructor(private datePipe: DatePipe, private facturePieceJointeService: FacturePieceJointeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private factureService :FactureService
) {

}


// methods
ngOnInit(): void {

    this.selectedFacture = new FactureVo();
    this.factureService.findAll().subscribe((data) => this.factures = data);
}




private setValidation(value : boolean){
    this.validFacturePieceJointeName = value;
    this.validFacturePieceJointePath = value;
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
     this.facturePieceJointeService.save().subscribe(facturePieceJointe=>{
       this.facturePieceJointes.push({...facturePieceJointe});
       this.createFacturePieceJointeDialog = false;
       this.submitted = false;
       this.selectedFacturePieceJointe = new FacturePieceJointeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFacturePieceJointeName();
this.validateFacturePieceJointePath();

    }

private validateFacturePieceJointeName(){
        if (this.stringUtilService.isEmpty(this.selectedFacturePieceJointe.name)) {
            this.errorMessages.push('Name non valide');
            this.validFacturePieceJointeName = false;
        } else {
            this.validFacturePieceJointeName = true;
        }
    }
private validateFacturePieceJointePath(){
        if (this.stringUtilService.isEmpty(this.selectedFacturePieceJointe.path)) {
            this.errorMessages.push('Path non valide');
            this.validFacturePieceJointePath = false;
        } else {
            this.validFacturePieceJointePath = true;
        }
    }







//openPopup
              public async openCreatefacture(facture: string) {
                      const isPermistted = await this.roleService.isPermitted('Facture', 'add');
                       if(isPermistted){
         this.selectedFacture = new FactureVo();
        this.createFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createFacturePieceJointeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get facturePieceJointes(): Array<FacturePieceJointeVo> {
    return this.facturePieceJointeService.facturePieceJointes;
       }
set facturePieceJointes(value: Array<FacturePieceJointeVo>) {
        this.facturePieceJointeService.facturePieceJointes = value;
       }

 get selectedFacturePieceJointe():FacturePieceJointeVo {
           return this.facturePieceJointeService.selectedFacturePieceJointe;
       }
    set selectedFacturePieceJointe(value: FacturePieceJointeVo) {
        this.facturePieceJointeService.selectedFacturePieceJointe = value;
       }

   get createFacturePieceJointeDialog(): boolean {
           return this.facturePieceJointeService.createFacturePieceJointeDialog;

       }
    set createFacturePieceJointeDialog(value: boolean) {
        this.facturePieceJointeService.createFacturePieceJointeDialog= value;
       }

       get selectedFacture(): FactureVo {
           return this.factureService.selectedFacture;
       }
      set selectedFacture(value: FactureVo) {
        this.factureService.selectedFacture = value;
       }
       get factures(): Array<FactureVo> {
           return this.factureService.factures;
       }
       set factures(value: Array<FactureVo>) {
        this.factureService.factures = value;
       }
       get createFactureDialog(): boolean {
           return this.factureService.createFactureDialog;
       }
      set createFactureDialog(value: boolean) {
        this.factureService.createFactureDialog= value;
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

    get validFacturePieceJointeName(): boolean {
    return this._validFacturePieceJointeName;
    }

    set validFacturePieceJointeName(value: boolean) {
    this._validFacturePieceJointeName = value;
    }
    get validFacturePieceJointePath(): boolean {
    return this._validFacturePieceJointePath;
    }

    set validFacturePieceJointePath(value: boolean) {
    this._validFacturePieceJointePath = value;
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
