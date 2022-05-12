import {Component, OnInit, Input} from '@angular/core';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-taux-cnss-create-admin',
  templateUrl: './type-taux-cnss-create-admin.component.html',
  styleUrls: ['./type-taux-cnss-create-admin.component.css']
})
export class TypeTauxCnssCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeTauxCnssLibelle = true;
   _validTypeTauxCnssCode = true;




constructor(private datePipe: DatePipe, private typeTauxCnssService: TypeTauxCnssService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validTypeTauxCnssLibelle = value;
    this.validTypeTauxCnssCode = value;
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
     this.typeTauxCnssService.save().subscribe(typeTauxCnss=>{
       this.typeTauxCnsss.push({...typeTauxCnss});
       this.createTypeTauxCnssDialog = false;
       this.submitted = false;
       this.selectedTypeTauxCnss = new TypeTauxCnssVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeTauxCnssLibelle();
this.validateTypeTauxCnssCode();

    }

private validateTypeTauxCnssLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeTauxCnss.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeTauxCnssLibelle = false;
        } else {
            this.validTypeTauxCnssLibelle = true;
        }
    }
private validateTypeTauxCnssCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeTauxCnss.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeTauxCnssCode = false;
        } else {
            this.validTypeTauxCnssCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeTauxCnssDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeTauxCnsss(): Array<TypeTauxCnssVo> {
    return this.typeTauxCnssService.typeTauxCnsss;
       }
set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }

 get selectedTypeTauxCnss():TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
    set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
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
