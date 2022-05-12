import {Component, OnInit, Input} from '@angular/core';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
@Component({
  selector: 'app-taux-is-config-create-comptable',
  templateUrl: './taux-is-config-create-comptable.component.html',
  styleUrls: ['./taux-is-config-create-comptable.component.css']
})
export class TauxIsConfigCreateComptableComponent implements OnInit {

        selectedTauxIss: TauxIsVo = new TauxIsVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTauxIsConfigReference = true;
   _validTauxIsConfigCotisationMinimale = true;
   _validTauxIsConfigDateMin = true;
   _validTauxIsConfigDateMax = true;

    _validTauxIsReference = true;
    _validTauxIsResultatFiscalMin = true;
    _validTauxIsResultatFiscalMax = true;
    _validTauxIsPourcentage = true;
    _validTauxIsPenalite = true;



constructor(private datePipe: DatePipe, private tauxIsConfigService: TauxIsConfigService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private tauxIsService :TauxIsService
) {

}


// methods
ngOnInit(): void {




}


    validateTauxIss(){
    this.errorMessages = new Array();
    this.validateTauxIsReference();
    this.validateTauxIsResultatFiscalMin();
    this.validateTauxIsResultatFiscalMax();
    this.validateTauxIsPourcentage();
    this.validateTauxIsPenalite();
    }


private setValidation(value : boolean){
    this.validTauxIsConfigReference = value;
    this.validTauxIsConfigCotisationMinimale = value;
    this.validTauxIsConfigDateMin = value;
    this.validTauxIsConfigDateMax = value;
    this.validTauxIsReference = value;
    this.validTauxIsResultatFiscalMin = value;
    this.validTauxIsResultatFiscalMax = value;
    this.validTauxIsPourcentage = value;
    this.validTauxIsPenalite = value;
    }

        addTauxIss() {
        if( this.selectedTauxIsConfig.tauxIssVo == null ){
            this.selectedTauxIsConfig.tauxIssVo = new Array<TauxIsVo>();
        }
       this.validateTauxIss();
       if (this.errorMessages.length === 0) {
              this.selectedTauxIsConfig.tauxIssVo.push(this.selectedTauxIss);
              this.selectedTauxIss = new TauxIsVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteTauxIss(p: TauxIsVo) {
        this.selectedTauxIsConfig.tauxIssVo.forEach((element, index) => {
            if (element === p) { this.selectedTauxIsConfig.tauxIssVo.splice(index, 1); }
        });
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
     this.tauxIsConfigService.save().subscribe(tauxIsConfig=>{
       this.tauxIsConfigs.push({...tauxIsConfig});
       this.createTauxIsConfigDialog = false;
       this.submitted = false;
       this.selectedTauxIsConfig = new TauxIsConfigVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTauxIsConfigReference();
this.validateTauxIsConfigCotisationMinimale();
this.validateTauxIsConfigDateMin();
this.validateTauxIsConfigDateMax();

    }

private validateTauxIsConfigReference(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIsConfig.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validTauxIsConfigReference = false;
        } else {
            this.validTauxIsConfigReference = true;
        }
    }
private validateTauxIsConfigCotisationMinimale(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIsConfig.cotisationMinimale)) {
            this.errorMessages.push('Cotisation minimale non valide');
            this.validTauxIsConfigCotisationMinimale = false;
        } else {
            this.validTauxIsConfigCotisationMinimale = true;
        }
    }
private validateTauxIsConfigDateMin(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIsConfig.dateMin)) {
            this.errorMessages.push('Date min non valide');
            this.validTauxIsConfigDateMin = false;
        } else {
            this.validTauxIsConfigDateMin = true;
        }
    }
private validateTauxIsConfigDateMax(){
        if (this.stringUtilService.isEmpty(this.selectedTauxIsConfig.dateMax)) {
            this.errorMessages.push('Date max non valide');
            this.validTauxIsConfigDateMax = false;
        } else {
            this.validTauxIsConfigDateMax = true;
        }
    }









            private validateTauxIsReference(){
            if (this.selectedTauxIss.reference == null) {
            this.errorMessages.push('Reference de la tauxIs est  invalide');
             this.validTauxIsReference = false;
            } else {
            this.validTauxIsReference = true;
            }
            }

            private validateTauxIsResultatFiscalMin(){
            if (this.selectedTauxIss.resultatFiscalMin == null) {
            this.errorMessages.push('ResultatFiscalMin de la tauxIs est  invalide');
             this.validTauxIsResultatFiscalMin = false;
            } else {
            this.validTauxIsResultatFiscalMin = true;
            }
            }

            private validateTauxIsResultatFiscalMax(){
            if (this.selectedTauxIss.resultatFiscalMax == null) {
            this.errorMessages.push('ResultatFiscalMax de la tauxIs est  invalide');
             this.validTauxIsResultatFiscalMax = false;
            } else {
            this.validTauxIsResultatFiscalMax = true;
            }
            }

            private validateTauxIsPourcentage(){
            if (this.selectedTauxIss.pourcentage == null) {
            this.errorMessages.push('Pourcentage de la tauxIs est  invalide');
             this.validTauxIsPourcentage = false;
            } else {
            this.validTauxIsPourcentage = true;
            }
            }

            private validateTauxIsPenalite(){
            if (this.selectedTauxIss.penalite == null) {
            this.errorMessages.push('Penalite de la tauxIs est  invalide');
             this.validTauxIsPenalite = false;
            } else {
            this.validTauxIsPenalite = true;
            }
            }




//openPopup
// methods

hideCreateDialog(){
    this.createTauxIsConfigDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tauxIsConfigs(): Array<TauxIsConfigVo> {
    return this.tauxIsConfigService.tauxIsConfigs;
       }
set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }

 get selectedTauxIsConfig():TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
    set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
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

}
