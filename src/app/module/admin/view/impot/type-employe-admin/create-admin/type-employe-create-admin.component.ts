import {Component, OnInit, Input} from '@angular/core';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-employe-create-admin',
  templateUrl: './type-employe-create-admin.component.html',
  styleUrls: ['./type-employe-create-admin.component.css']
})
export class TypeEmployeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeEmployeCode = true;
   _validTypeEmployeLibelle = true;




constructor(private datePipe: DatePipe, private typeEmployeService: TypeEmployeService
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
    this.validTypeEmployeCode = value;
    this.validTypeEmployeLibelle = value;
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
     this.typeEmployeService.save().subscribe(typeEmploye=>{
       this.typeEmployes.push({...typeEmploye});
       this.createTypeEmployeDialog = false;
       this.submitted = false;
       this.selectedTypeEmploye = new TypeEmployeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeEmployeCode();
this.validateTypeEmployeLibelle();

    }

private validateTypeEmployeCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEmploye.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeEmployeCode = false;
        } else {
            this.validTypeEmployeCode = true;
        }
    }
private validateTypeEmployeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeEmploye.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeEmployeLibelle = false;
        } else {
            this.validTypeEmployeLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeEmployeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeEmployes(): Array<TypeEmployeVo> {
    return this.typeEmployeService.typeEmployes;
       }
set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }

 get selectedTypeEmploye():TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
    set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }

   get createTypeEmployeDialog(): boolean {
           return this.typeEmployeService.createTypeEmployeDialog;

       }
    set createTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.createTypeEmployeDialog= value;
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

    get validTypeEmployeCode(): boolean {
    return this._validTypeEmployeCode;
    }

    set validTypeEmployeCode(value: boolean) {
    this._validTypeEmployeCode = value;
    }
    get validTypeEmployeLibelle(): boolean {
    return this._validTypeEmployeLibelle;
    }

    set validTypeEmployeLibelle(value: boolean) {
    this._validTypeEmployeLibelle = value;
    }


}
