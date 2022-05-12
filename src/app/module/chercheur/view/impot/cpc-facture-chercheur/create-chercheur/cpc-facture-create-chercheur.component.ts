import {Component, OnInit, Input} from '@angular/core';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
@Component({
  selector: 'app-cpc-facture-create-chercheur',
  templateUrl: './cpc-facture-create-chercheur.component.html',
  styleUrls: ['./cpc-facture-create-chercheur.component.css']
})
export class CpcFactureCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCpcFactureCpc = true;
   _validCpcFactureFacture = true;

    _validCpcReference = true;
    _validCpcTotalProdEx = true;
    _validCpcTotalChargEx = true;
    _validCpcTotalProdFin = true;
    _validCpcTotalChargFin = true;
    _validCpcTotalProdNCour = true;
    _validCpcTotalChargNCour = true;
    _validCpcDateMinCpc = true;
    _validCpcDateMaxCpc = true;
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



constructor(private datePipe: DatePipe, private cpcFactureService: CpcFactureService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private cpcService :CpcService
,       private factureService :FactureService
) {

}


// methods
ngOnInit(): void {

    this.selectedCpc = new CpcVo();
    this.cpcService.findAll().subscribe((data) => this.cpcs = data);
    this.selectedFacture = new FactureVo();
    this.factureService.findAll().subscribe((data) => this.factures = data);
}




private setValidation(value : boolean){
    this.validCpcFactureCpc = value;
    this.validCpcFactureFacture = value;
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
     this.cpcFactureService.save().subscribe(cpcFacture=>{
       this.cpcFactures.push({...cpcFacture});
       this.createCpcFactureDialog = false;
       this.submitted = false;
       this.selectedCpcFacture = new CpcFactureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCpcFactureCpc();
this.validateCpcFactureFacture();

    }

private validateCpcFactureCpc(){
        if (this.stringUtilService.isEmpty(this.selectedCpcFacture.cpcVo)) {
            this.errorMessages.push('Cpc non valide');
            this.validCpcFactureCpc = false;
        } else {
            this.validCpcFactureCpc = true;
        }
    }
private validateCpcFactureFacture(){
        if (this.stringUtilService.isEmpty(this.selectedCpcFacture.factureVo)) {
            this.errorMessages.push('Facture non valide');
            this.validCpcFactureFacture = false;
        } else {
            this.validCpcFactureFacture = true;
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
              public async openCreatecpc(cpc: string) {
                      const isPermistted = await this.roleService.isPermitted('Cpc', 'add');
                       if(isPermistted){
         this.selectedCpc = new CpcVo();
        this.createCpcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCpcFactureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get cpcFactures(): Array<CpcFactureVo> {
    return this.cpcFactureService.cpcFactures;
       }
set cpcFactures(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactures = value;
       }

 get selectedCpcFacture():CpcFactureVo {
           return this.cpcFactureService.selectedCpcFacture;
       }
    set selectedCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.selectedCpcFacture = value;
       }

   get createCpcFactureDialog(): boolean {
           return this.cpcFactureService.createCpcFactureDialog;

       }
    set createCpcFactureDialog(value: boolean) {
        this.cpcFactureService.createCpcFactureDialog= value;
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
       get selectedCpc(): CpcVo {
           return this.cpcService.selectedCpc;
       }
      set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }
       get cpcs(): Array<CpcVo> {
           return this.cpcService.cpcs;
       }
       set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }
       get createCpcDialog(): boolean {
           return this.cpcService.createCpcDialog;
       }
      set createCpcDialog(value: boolean) {
        this.cpcService.createCpcDialog= value;
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

    get validCpcFactureCpc(): boolean {
    return this._validCpcFactureCpc;
    }

    set validCpcFactureCpc(value: boolean) {
    this._validCpcFactureCpc = value;
    }
    get validCpcFactureFacture(): boolean {
    return this._validCpcFactureFacture;
    }

    set validCpcFactureFacture(value: boolean) {
    this._validCpcFactureFacture = value;
    }

    get validCpcReference(): boolean {
    return this._validCpcReference;
    }

    set validCpcReference(value: boolean) {
    this._validCpcReference = value;
    }
    get validCpcTotalProdEx(): boolean {
    return this._validCpcTotalProdEx;
    }

    set validCpcTotalProdEx(value: boolean) {
    this._validCpcTotalProdEx = value;
    }
    get validCpcTotalChargEx(): boolean {
    return this._validCpcTotalChargEx;
    }

    set validCpcTotalChargEx(value: boolean) {
    this._validCpcTotalChargEx = value;
    }
    get validCpcTotalProdFin(): boolean {
    return this._validCpcTotalProdFin;
    }

    set validCpcTotalProdFin(value: boolean) {
    this._validCpcTotalProdFin = value;
    }
    get validCpcTotalChargFin(): boolean {
    return this._validCpcTotalChargFin;
    }

    set validCpcTotalChargFin(value: boolean) {
    this._validCpcTotalChargFin = value;
    }
    get validCpcTotalProdNCour(): boolean {
    return this._validCpcTotalProdNCour;
    }

    set validCpcTotalProdNCour(value: boolean) {
    this._validCpcTotalProdNCour = value;
    }
    get validCpcTotalChargNCour(): boolean {
    return this._validCpcTotalChargNCour;
    }

    set validCpcTotalChargNCour(value: boolean) {
    this._validCpcTotalChargNCour = value;
    }
    get validCpcDateMinCpc(): boolean {
    return this._validCpcDateMinCpc;
    }

    set validCpcDateMinCpc(value: boolean) {
    this._validCpcDateMinCpc = value;
    }
    get validCpcDateMaxCpc(): boolean {
    return this._validCpcDateMaxCpc;
    }

    set validCpcDateMaxCpc(value: boolean) {
    this._validCpcDateMaxCpc = value;
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
