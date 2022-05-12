import {Component, OnInit, Input} from '@angular/core';
import {TypeComptableService} from '../../../../../../controller/service/TypeComptable.service';
import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-comptable-create-admin',
  templateUrl: './type-comptable-create-admin.component.html',
  styleUrls: ['./type-comptable-create-admin.component.css']
})
export class TypeComptableCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private typeComptableService: TypeComptableService
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
     this.typeComptableService.save().subscribe(typeComptable=>{
       this.typeComptables.push({...typeComptable});
       this.createTypeComptableDialog = false;
       this.submitted = false;
       this.selectedTypeComptable = new TypeComptableVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
// methods

hideCreateDialog(){
    this.createTypeComptableDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeComptables(): Array<TypeComptableVo> {
    return this.typeComptableService.typeComptables;
       }
set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }

 get selectedTypeComptable():TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
    set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }

   get createTypeComptableDialog(): boolean {
           return this.typeComptableService.createTypeComptableDialog;

       }
    set createTypeComptableDialog(value: boolean) {
        this.typeComptableService.createTypeComptableDialog= value;
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



}
