import {Component, OnInit, Input} from '@angular/core';
import {TauxCnssService} from '../../../../../../controller/service/TauxCnss.service';
import {TauxCnssVo} from '../../../../../../controller/model/TauxCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
@Component({
  selector: 'app-taux-cnss-create-comptable',
  templateUrl: './taux-cnss-create-comptable.component.html',
  styleUrls: ['./taux-cnss-create-comptable.component.css']
})
export class TauxCnssCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTauxCnssRef = true;
   _validTauxCnssTypeTauxCnss = true;
   _validTauxCnssDateApplicationMin = true;
   _validTauxCnssDateApplicationMax = true;
   _validTauxCnssPlafond = true;
   _validTauxCnssPourcentage = true;

    _validTypeTauxCnssLibelle = true;
    _validTypeTauxCnssCode = true;



constructor(private datePipe: DatePipe, private tauxCnssService: TauxCnssService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeTauxCnssService :TypeTauxCnssService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeTauxCnss = new TypeTauxCnssVo();
    this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
}




private setValidation(value : boolean){
    this.validTauxCnssRef = value;
    this.validTauxCnssTypeTauxCnss = value;
    this.validTauxCnssDateApplicationMin = value;
    this.validTauxCnssDateApplicationMax = value;
    this.validTauxCnssPlafond = value;
    this.validTauxCnssPourcentage = value;
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
     this.tauxCnssService.save().subscribe(tauxCnss=>{
       this.tauxCnsss.push({...tauxCnss});
       this.createTauxCnssDialog = false;
       this.submitted = false;
       this.selectedTauxCnss = new TauxCnssVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTauxCnssRef();
this.validateTauxCnssTypeTauxCnss();
this.validateTauxCnssDateApplicationMin();
this.validateTauxCnssDateApplicationMax();
this.validateTauxCnssPlafond();
this.validateTauxCnssPourcentage();

    }

private validateTauxCnssRef(){
        if (this.stringUtilService.isEmpty(this.selectedTauxCnss.ref)) {
            this.errorMessages.push('Ref non valide');
            this.validTauxCnssRef = false;
        } else {
            this.validTauxCnssRef = true;
        }
    }
private validateTauxCnssTypeTauxCnss(){
        if (this.stringUtilService.isEmpty(this.selectedTauxCnss.typeTauxCnssVo)) {
            this.errorMessages.push('Type taux cnss non valide');
            this.validTauxCnssTypeTauxCnss = false;
        } else {
            this.validTauxCnssTypeTauxCnss = true;
        }
    }
private validateTauxCnssDateApplicationMin(){
        if (this.stringUtilService.isEmpty(this.selectedTauxCnss.dateApplicationMin)) {
            this.errorMessages.push('Date application min non valide');
            this.validTauxCnssDateApplicationMin = false;
        } else {
            this.validTauxCnssDateApplicationMin = true;
        }
    }
private validateTauxCnssDateApplicationMax(){
        if (this.stringUtilService.isEmpty(this.selectedTauxCnss.dateApplicationMax)) {
            this.errorMessages.push('Date application max non valide');
            this.validTauxCnssDateApplicationMax = false;
        } else {
            this.validTauxCnssDateApplicationMax = true;
        }
    }
private validateTauxCnssPlafond(){
        if (this.stringUtilService.isEmpty(this.selectedTauxCnss.plafond)) {
            this.errorMessages.push('Plafond non valide');
            this.validTauxCnssPlafond = false;
        } else {
            this.validTauxCnssPlafond = true;
        }
    }
private validateTauxCnssPourcentage(){
        if (this.stringUtilService.isEmpty(this.selectedTauxCnss.pourcentage)) {
            this.errorMessages.push('Pourcentage non valide');
            this.validTauxCnssPourcentage = false;
        } else {
            this.validTauxCnssPourcentage = true;
        }
    }
















//openPopup
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
    this.createTauxCnssDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tauxCnsss(): Array<TauxCnssVo> {
    return this.tauxCnssService.tauxCnsss;
       }
set tauxCnsss(value: Array<TauxCnssVo>) {
        this.tauxCnssService.tauxCnsss = value;
       }

 get selectedTauxCnss():TauxCnssVo {
           return this.tauxCnssService.selectedTauxCnss;
       }
    set selectedTauxCnss(value: TauxCnssVo) {
        this.tauxCnssService.selectedTauxCnss = value;
       }

   get createTauxCnssDialog(): boolean {
           return this.tauxCnssService.createTauxCnssDialog;

       }
    set createTauxCnssDialog(value: boolean) {
        this.tauxCnssService.createTauxCnssDialog= value;
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

    get validTauxCnssRef(): boolean {
    return this._validTauxCnssRef;
    }

    set validTauxCnssRef(value: boolean) {
    this._validTauxCnssRef = value;
    }
    get validTauxCnssTypeTauxCnss(): boolean {
    return this._validTauxCnssTypeTauxCnss;
    }

    set validTauxCnssTypeTauxCnss(value: boolean) {
    this._validTauxCnssTypeTauxCnss = value;
    }
    get validTauxCnssDateApplicationMin(): boolean {
    return this._validTauxCnssDateApplicationMin;
    }

    set validTauxCnssDateApplicationMin(value: boolean) {
    this._validTauxCnssDateApplicationMin = value;
    }
    get validTauxCnssDateApplicationMax(): boolean {
    return this._validTauxCnssDateApplicationMax;
    }

    set validTauxCnssDateApplicationMax(value: boolean) {
    this._validTauxCnssDateApplicationMax = value;
    }
    get validTauxCnssPlafond(): boolean {
    return this._validTauxCnssPlafond;
    }

    set validTauxCnssPlafond(value: boolean) {
    this._validTauxCnssPlafond = value;
    }
    get validTauxCnssPourcentage(): boolean {
    return this._validTauxCnssPourcentage;
    }

    set validTauxCnssPourcentage(value: boolean) {
    this._validTauxCnssPourcentage = value;
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

}
