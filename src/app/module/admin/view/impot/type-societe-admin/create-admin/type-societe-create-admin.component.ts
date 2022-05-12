import {Component, OnInit, Input} from '@angular/core';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-societe-create-admin',
  templateUrl: './type-societe-create-admin.component.html',
  styleUrls: ['./type-societe-create-admin.component.css']
})
export class TypeSocieteCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeSocieteCode = true;
   _validTypeSocieteLibelle = true;




constructor(private datePipe: DatePipe, private typeSocieteService: TypeSocieteService
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
    this.validTypeSocieteCode = value;
    this.validTypeSocieteLibelle = value;
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
     this.typeSocieteService.save().subscribe(typeSociete=>{
       this.typeSocietes.push({...typeSociete});
       this.createTypeSocieteDialog = false;
       this.submitted = false;
       this.selectedTypeSociete = new TypeSocieteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeSocieteCode();
this.validateTypeSocieteLibelle();

    }

private validateTypeSocieteCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeSociete.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeSocieteCode = false;
        } else {
            this.validTypeSocieteCode = true;
        }
    }
private validateTypeSocieteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeSociete.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeSocieteLibelle = false;
        } else {
            this.validTypeSocieteLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeSocieteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeSocietes(): Array<TypeSocieteVo> {
    return this.typeSocieteService.typeSocietes;
       }
set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }

 get selectedTypeSociete():TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
    set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }

   get createTypeSocieteDialog(): boolean {
           return this.typeSocieteService.createTypeSocieteDialog;

       }
    set createTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.createTypeSocieteDialog= value;
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

    get validTypeSocieteCode(): boolean {
    return this._validTypeSocieteCode;
    }

    set validTypeSocieteCode(value: boolean) {
    this._validTypeSocieteCode = value;
    }
    get validTypeSocieteLibelle(): boolean {
    return this._validTypeSocieteLibelle;
    }

    set validTypeSocieteLibelle(value: boolean) {
    this._validTypeSocieteLibelle = value;
    }


}
