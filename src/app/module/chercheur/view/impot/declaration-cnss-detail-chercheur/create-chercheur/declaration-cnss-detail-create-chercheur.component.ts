import {Component, OnInit, Input} from '@angular/core';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
@Component({
  selector: 'app-declaration-cnss-detail-create-chercheur',
  templateUrl: './declaration-cnss-detail-create-chercheur.component.html',
  styleUrls: ['./declaration-cnss-detail-create-chercheur.component.css']
})
export class DeclarationCnssDetailCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDeclarationCnssDetailRef = true;
   _validDeclarationCnssDetailTypeTauxCnss = true;
   _validDeclarationCnssDetailMontantCalcule = true;
   _validDeclarationCnssDetailMontantTotal = true;
   _validDeclarationCnssDetailDeclarationCnss = true;

    _validTypeTauxCnssLibelle = true;
    _validTypeTauxCnssCode = true;
    _validDeclarationCnssRef = true;
    _validDeclarationCnssEmploye = true;
    _validDeclarationCnssSalaireNet = true;
    _validDeclarationCnssSalaireBrut = true;
    _validDeclarationCnssSalaireImposable = true;
    _validDeclarationCnssMontantTotal = true;
    _validDeclarationCnssDeclarationCnssDetails = true;
    _validDeclarationCnssSociete = true;



constructor(private datePipe: DatePipe, private declarationCnssDetailService: DeclarationCnssDetailService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeTauxCnssService :TypeTauxCnssService
,       private declarationCnssService :DeclarationCnssService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeTauxCnss = new TypeTauxCnssVo();
    this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
    this.selectedDeclarationCnss = new DeclarationCnssVo();
    this.declarationCnssService.findAll().subscribe((data) => this.declarationCnsss = data);
}




private setValidation(value : boolean){
    this.validDeclarationCnssDetailRef = value;
    this.validDeclarationCnssDetailTypeTauxCnss = value;
    this.validDeclarationCnssDetailMontantCalcule = value;
    this.validDeclarationCnssDetailMontantTotal = value;
    this.validDeclarationCnssDetailDeclarationCnss = value;
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
     this.declarationCnssDetailService.save().subscribe(declarationCnssDetail=>{
       this.declarationCnssDetails.push({...declarationCnssDetail});
       this.createDeclarationCnssDetailDialog = false;
       this.submitted = false;
       this.selectedDeclarationCnssDetail = new DeclarationCnssDetailVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDeclarationCnssDetailRef();
this.validateDeclarationCnssDetailTypeTauxCnss();
this.validateDeclarationCnssDetailMontantCalcule();
this.validateDeclarationCnssDetailMontantTotal();
this.validateDeclarationCnssDetailDeclarationCnss();

    }

private validateDeclarationCnssDetailRef(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnssDetail.ref)) {
            this.errorMessages.push('Ref non valide');
            this.validDeclarationCnssDetailRef = false;
        } else {
            this.validDeclarationCnssDetailRef = true;
        }
    }
private validateDeclarationCnssDetailTypeTauxCnss(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnssDetail.typeTauxCnssVo)) {
            this.errorMessages.push('Type taux cnss non valide');
            this.validDeclarationCnssDetailTypeTauxCnss = false;
        } else {
            this.validDeclarationCnssDetailTypeTauxCnss = true;
        }
    }
private validateDeclarationCnssDetailMontantCalcule(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnssDetail.montantCalcule)) {
            this.errorMessages.push('Montant calcule non valide');
            this.validDeclarationCnssDetailMontantCalcule = false;
        } else {
            this.validDeclarationCnssDetailMontantCalcule = true;
        }
    }
private validateDeclarationCnssDetailMontantTotal(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnssDetail.montantTotal)) {
            this.errorMessages.push('Montant total non valide');
            this.validDeclarationCnssDetailMontantTotal = false;
        } else {
            this.validDeclarationCnssDetailMontantTotal = true;
        }
    }
private validateDeclarationCnssDetailDeclarationCnss(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnssDetail.declarationCnssVo)) {
            this.errorMessages.push('Declaration cnss non valide');
            this.validDeclarationCnssDetailDeclarationCnss = false;
        } else {
            this.validDeclarationCnssDetailDeclarationCnss = true;
        }
    }















//openPopup
              public async openCreatedeclarationCnss(declarationCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'add');
                       if(isPermistted){
         this.selectedDeclarationCnss = new DeclarationCnssVo();
        this.createDeclarationCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeTauxCnss(typeTauxCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'add');
                       if(isPermistted){
         this.selectedTypeTauxCnss = new TypeTauxCnssVo();
        this.createTypeTauxCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDeclarationCnssDetailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get declarationCnssDetails(): Array<DeclarationCnssDetailVo> {
    return this.declarationCnssDetailService.declarationCnssDetails;
       }
set declarationCnssDetails(value: Array<DeclarationCnssDetailVo>) {
        this.declarationCnssDetailService.declarationCnssDetails = value;
       }

 get selectedDeclarationCnssDetail():DeclarationCnssDetailVo {
           return this.declarationCnssDetailService.selectedDeclarationCnssDetail;
       }
    set selectedDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this.declarationCnssDetailService.selectedDeclarationCnssDetail = value;
       }

   get createDeclarationCnssDetailDialog(): boolean {
           return this.declarationCnssDetailService.createDeclarationCnssDetailDialog;

       }
    set createDeclarationCnssDetailDialog(value: boolean) {
        this.declarationCnssDetailService.createDeclarationCnssDetailDialog= value;
       }

       get selectedDeclarationCnss(): DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss(): Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get createDeclarationCnssDialog(): boolean {
           return this.declarationCnssService.createDeclarationCnssDialog;
       }
      set createDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.createDeclarationCnssDialog= value;
       }
       get selectedTypeTauxCnss(): TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
      set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }
       get typeTauxCnsss(): Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnsss;
       }
       set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }
       get createTypeTauxCnssDialog(): boolean {
           return this.typeTauxCnssService.createTypeTauxCnssDialog;
       }
      set createTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.createTypeTauxCnssDialog= value;
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

    get validDeclarationCnssDetailRef(): boolean {
    return this._validDeclarationCnssDetailRef;
    }

    set validDeclarationCnssDetailRef(value: boolean) {
    this._validDeclarationCnssDetailRef = value;
    }
    get validDeclarationCnssDetailTypeTauxCnss(): boolean {
    return this._validDeclarationCnssDetailTypeTauxCnss;
    }

    set validDeclarationCnssDetailTypeTauxCnss(value: boolean) {
    this._validDeclarationCnssDetailTypeTauxCnss = value;
    }
    get validDeclarationCnssDetailMontantCalcule(): boolean {
    return this._validDeclarationCnssDetailMontantCalcule;
    }

    set validDeclarationCnssDetailMontantCalcule(value: boolean) {
    this._validDeclarationCnssDetailMontantCalcule = value;
    }
    get validDeclarationCnssDetailMontantTotal(): boolean {
    return this._validDeclarationCnssDetailMontantTotal;
    }

    set validDeclarationCnssDetailMontantTotal(value: boolean) {
    this._validDeclarationCnssDetailMontantTotal = value;
    }
    get validDeclarationCnssDetailDeclarationCnss(): boolean {
    return this._validDeclarationCnssDetailDeclarationCnss;
    }

    set validDeclarationCnssDetailDeclarationCnss(value: boolean) {
    this._validDeclarationCnssDetailDeclarationCnss = value;
    }

    get validTypeTauxCnssLibelle(): boolean {
    return this._validTypeTauxCnssLibelle;
    }

    set validTypeTauxCnssLibelle(value: boolean) {
    this._validTypeTauxCnssLibelle = value;
    }
    get validTypeTauxCnssCode(): boolean {
    return this._validTypeTauxCnssCode;
    }

    set validTypeTauxCnssCode(value: boolean) {
    this._validTypeTauxCnssCode = value;
    }
    get validDeclarationCnssRef(): boolean {
    return this._validDeclarationCnssRef;
    }

    set validDeclarationCnssRef(value: boolean) {
    this._validDeclarationCnssRef = value;
    }
    get validDeclarationCnssEmploye(): boolean {
    return this._validDeclarationCnssEmploye;
    }

    set validDeclarationCnssEmploye(value: boolean) {
    this._validDeclarationCnssEmploye = value;
    }
    get validDeclarationCnssSalaireNet(): boolean {
    return this._validDeclarationCnssSalaireNet;
    }

    set validDeclarationCnssSalaireNet(value: boolean) {
    this._validDeclarationCnssSalaireNet = value;
    }
    get validDeclarationCnssSalaireBrut(): boolean {
    return this._validDeclarationCnssSalaireBrut;
    }

    set validDeclarationCnssSalaireBrut(value: boolean) {
    this._validDeclarationCnssSalaireBrut = value;
    }
    get validDeclarationCnssSalaireImposable(): boolean {
    return this._validDeclarationCnssSalaireImposable;
    }

    set validDeclarationCnssSalaireImposable(value: boolean) {
    this._validDeclarationCnssSalaireImposable = value;
    }
    get validDeclarationCnssMontantTotal(): boolean {
    return this._validDeclarationCnssMontantTotal;
    }

    set validDeclarationCnssMontantTotal(value: boolean) {
    this._validDeclarationCnssMontantTotal = value;
    }
    get validDeclarationCnssDeclarationCnssDetails(): boolean {
    return this._validDeclarationCnssDeclarationCnssDetails;
    }

    set validDeclarationCnssDeclarationCnssDetails(value: boolean) {
    this._validDeclarationCnssDeclarationCnssDetails = value;
    }
    get validDeclarationCnssSociete(): boolean {
    return this._validDeclarationCnssSociete;
    }

    set validDeclarationCnssSociete(value: boolean) {
    this._validDeclarationCnssSociete = value;
    }

}
