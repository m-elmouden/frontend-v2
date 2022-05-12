import {Component, OnInit, Input} from '@angular/core';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
@Component({
  selector: 'app-cpc-create-societe',
  templateUrl: './cpc-create-societe.component.html',
  styleUrls: ['./cpc-create-societe.component.css']
})
export class CpcCreateSocieteComponent implements OnInit {

        selectedCpcFactures: CpcFactureVo = new CpcFactureVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCpcReference = true;
   _validCpcTotalProdEx = true;
   _validCpcTotalChargEx = true;
   _validCpcTotalProdFin = true;
   _validCpcTotalChargFin = true;
   _validCpcTotalProdNCour = true;
   _validCpcTotalChargNCour = true;
   _validCpcDateMinCpc = true;
   _validCpcDateMaxCpc = true;

    _validCpcFactureCpc = true;
    _validCpcFactureFacture = true;


private _cpcFacturesVo: Array<CpcFactureVo> = [];

constructor(private datePipe: DatePipe, private cpcService: CpcService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private cpcFactureService :CpcFactureService
,       private factureService :FactureService
) {

}


// methods
ngOnInit(): void {

            this.factureService.findAll().subscribe(data => this.prepareCpcFactures(data));

                this.selectedCpcFactures.factureVo = new FactureVo();
                this.factureService.findAll().subscribe((data) => this.factures = data);


}

         prepareCpcFactures(factures: Array<FactureVo>): void{
        if( factures != null){
        factures.forEach(e => {
        const cpcFacture = new CpcFactureVo();
        cpcFacture.factureVo = e;
        this.cpcFacturesVo.push(cpcFacture);
        });
        }
    }



private setValidation(value : boolean){
    this.validCpcReference = value;
    this.validCpcTotalProdEx = value;
    this.validCpcTotalChargEx = value;
    this.validCpcTotalProdFin = value;
    this.validCpcTotalChargFin = value;
    this.validCpcTotalProdNCour = value;
    this.validCpcTotalChargNCour = value;
    this.validCpcDateMinCpc = value;
    this.validCpcDateMaxCpc = value;
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
     this.cpcService.save().subscribe(cpc=>{
       this.cpcs.push({...cpc});
       this.createCpcDialog = false;
       this.submitted = false;
       this.selectedCpc = new CpcVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCpcReference();
this.validateCpcTotalProdEx();
this.validateCpcTotalChargEx();
this.validateCpcTotalProdFin();
this.validateCpcTotalChargFin();
this.validateCpcTotalProdNCour();
this.validateCpcTotalChargNCour();
this.validateCpcDateMinCpc();
this.validateCpcDateMaxCpc();

    }

private validateCpcReference(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validCpcReference = false;
        } else {
            this.validCpcReference = true;
        }
    }
private validateCpcTotalProdEx(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.totalProdEx)) {
            this.errorMessages.push('Total prod ex non valide');
            this.validCpcTotalProdEx = false;
        } else {
            this.validCpcTotalProdEx = true;
        }
    }
private validateCpcTotalChargEx(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.totalChargEx)) {
            this.errorMessages.push('Total charg ex non valide');
            this.validCpcTotalChargEx = false;
        } else {
            this.validCpcTotalChargEx = true;
        }
    }
private validateCpcTotalProdFin(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.totalProdFin)) {
            this.errorMessages.push('Total prod fin non valide');
            this.validCpcTotalProdFin = false;
        } else {
            this.validCpcTotalProdFin = true;
        }
    }
private validateCpcTotalChargFin(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.totalChargFin)) {
            this.errorMessages.push('Total charg fin non valide');
            this.validCpcTotalChargFin = false;
        } else {
            this.validCpcTotalChargFin = true;
        }
    }
private validateCpcTotalProdNCour(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.totalProdNCour)) {
            this.errorMessages.push('Total prod n cour non valide');
            this.validCpcTotalProdNCour = false;
        } else {
            this.validCpcTotalProdNCour = true;
        }
    }
private validateCpcTotalChargNCour(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.totalChargNCour)) {
            this.errorMessages.push('Total charg n cour non valide');
            this.validCpcTotalChargNCour = false;
        } else {
            this.validCpcTotalChargNCour = true;
        }
    }
private validateCpcDateMinCpc(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.dateMinCpc)) {
            this.errorMessages.push('Date min cpc non valide');
            this.validCpcDateMinCpc = false;
        } else {
            this.validCpcDateMinCpc = true;
        }
    }
private validateCpcDateMaxCpc(){
        if (this.stringUtilService.isEmpty(this.selectedCpc.dateMaxCpc)) {
            this.errorMessages.push('Date max cpc non valide');
            this.validCpcDateMaxCpc = false;
        } else {
            this.validCpcDateMaxCpc = true;
        }
    }














            private validateCpcFactureCpc(){
            if (this.selectedCpcFactures.cpcVo == null) {
            this.errorMessages.push('Cpc de la cpcFacture est  invalide');
             this.validCpcFactureCpc = false;
            } else {
            this.validCpcFactureCpc = true;
            }
            }

            private validateCpcFactureFacture(){
            if (this.selectedCpcFactures.factureVo == null) {
            this.errorMessages.push('Facture de la cpcFacture est  invalide');
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
// methods

hideCreateDialog(){
    this.createCpcDialog  = false;
    this.setValidation(true);
}

// getters and setters

get cpcs(): Array<CpcVo> {
    return this.cpcService.cpcs;
       }
set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }

 get selectedCpc():CpcVo {
           return this.cpcService.selectedCpc;
       }
    set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }

   get createCpcDialog(): boolean {
           return this.cpcService.createCpcDialog;

       }
    set createCpcDialog(value: boolean) {
        this.cpcService.createCpcDialog= value;
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


    get cpcFacturesVo(): Array<CpcFactureVo> {
    if( this._cpcFacturesVo == null )
    this._cpcFacturesVo = new Array();
    return this._cpcFacturesVo;
    }

    set cpcFacturesVo(value: Array<CpcFactureVo>) {
    this._cpcFacturesVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
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

}
