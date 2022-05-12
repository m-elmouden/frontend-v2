import {Component, OnInit, Input} from '@angular/core';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
@Component({
  selector: 'app-taux-is-create-admin',
  templateUrl: './taux-is-create-admin.component.html',
  styleUrls: ['./taux-is-create-admin.component.css']
})
export class TauxIsCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTauxIsReference = true;
   _validTauxIsResultatFiscalMin = true;
   _validTauxIsResultatFiscalMax = true;
   _validTauxIsPourcentage = true;
   _validTauxIsPenalite = true;

    _validTauxIsConfigReference = true;
    _validTauxIsConfigCotisationMinimale = true;
    _validTauxIsConfigDateMin = true;
    _validTauxIsConfigDateMax = true;



constructor(private datePipe: DatePipe, private tauxIsService: TauxIsService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private tauxIsConfigService :TauxIsConfigService
) {

}


// methods
ngOnInit(): void {

    this.selectedTauxIsConfig = new TauxIsConfigVo();
    this.tauxIsConfigService.findAll().subscribe((data) => this.tauxIsConfigs = data);
}




private setValidation(value : boolean){
    this.validTauxIsReference = value;
    this.validTauxIsResultatFiscalMin = value;
    this.validTauxIsResultatFiscalMax = value;
    this.validTauxIsPourcentage = value;
    this.validTauxIsPenalite = value;
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
     this.tauxIsService.save().subscribe(tauxIs=>{
       this.tauxIss.push({...tauxIs});
       this.createTauxIsDialog = false;
       this.submitted = false;
       this.selectedTauxIs = new TauxIsVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTauxIsReference();
this.validateTauxIsResultatFiscalMin();
this.validateTauxIsResultatFiscalMax();
this.validateTauxIsPourcentage();
this.validateTauxIsPenalite();

    }

private validateTauxIsReference(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIs.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validTauxIsReference = false;
        } else {
            this.validTauxIsReference = true;
        }
    }
private validateTauxIsResultatFiscalMin(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIs.resultatFiscalMin)) {
            this.errorMessages.push('Resultat fiscal min non valide');
            this.validTauxIsResultatFiscalMin = false;
        } else {
            this.validTauxIsResultatFiscalMin = true;
        }
    }
private validateTauxIsResultatFiscalMax(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIs.resultatFiscalMax)) {
            this.errorMessages.push('Resultat fiscal max non valide');
            this.validTauxIsResultatFiscalMax = false;
        } else {
            this.validTauxIsResultatFiscalMax = true;
        }
    }
private validateTauxIsPourcentage(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIs.pourcentage)) {
            this.errorMessages.push('Pourcentage non valide');
            this.validTauxIsPourcentage = false;
        } else {
            this.validTauxIsPourcentage = true;
        }
    }
private validateTauxIsPenalite(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIs.penalite)) {
            this.errorMessages.push('Penalite non valide');
            this.validTauxIsPenalite = false;
        } else {
            this.validTauxIsPenalite = true;
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
// methods

hideCreateDialog(){
    this.createTauxIsDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tauxIss(): Array<TauxIsVo> {
    return this.tauxIsService.tauxIss;
       }
set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }

 get selectedTauxIs():TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
    set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }

   get createTauxIsDialog(): boolean {
           return this.tauxIsService.createTauxIsDialog;

       }
    set createTauxIsDialog(value: boolean) {
        this.tauxIsService.createTauxIsDialog= value;
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

}
