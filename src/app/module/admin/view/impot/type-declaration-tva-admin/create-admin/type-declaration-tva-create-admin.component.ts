import {Component, OnInit, Input} from '@angular/core';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-declaration-tva-create-admin',
  templateUrl: './type-declaration-tva-create-admin.component.html',
  styleUrls: ['./type-declaration-tva-create-admin.component.css']
})
export class TypeDeclarationTvaCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeDeclarationTvaReference = true;
   _validTypeDeclarationTvaLibelle = true;




constructor(private datePipe: DatePipe, private typeDeclarationTvaService: TypeDeclarationTvaService
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
    this.validTypeDeclarationTvaReference = value;
    this.validTypeDeclarationTvaLibelle = value;
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
     this.typeDeclarationTvaService.save().subscribe(typeDeclarationTva=>{
       this.typeDeclarationTvas.push({...typeDeclarationTva});
       this.createTypeDeclarationTvaDialog = false;
       this.submitted = false;
       this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeDeclarationTvaReference();
this.validateTypeDeclarationTvaLibelle();

    }

private validateTypeDeclarationTvaReference(){
        if (this.stringUtilService.isEmpty(this.selectedTypeDeclarationTva.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validTypeDeclarationTvaReference = false;
        } else {
            this.validTypeDeclarationTvaReference = true;
        }
    }
private validateTypeDeclarationTvaLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeDeclarationTva.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeDeclarationTvaLibelle = false;
        } else {
            this.validTypeDeclarationTvaLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeDeclarationTvaDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
    return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }

 get selectedTypeDeclarationTva():TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
    set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }

   get createTypeDeclarationTvaDialog(): boolean {
           return this.typeDeclarationTvaService.createTypeDeclarationTvaDialog;

       }
    set createTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.createTypeDeclarationTvaDialog= value;
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

    get validTypeDeclarationTvaReference(): boolean {
    return this._validTypeDeclarationTvaReference;
    }

    set validTypeDeclarationTvaReference(value: boolean) {
    this._validTypeDeclarationTvaReference = value;
    }
    get validTypeDeclarationTvaLibelle(): boolean {
    return this._validTypeDeclarationTvaLibelle;
    }

    set validTypeDeclarationTvaLibelle(value: boolean) {
    this._validTypeDeclarationTvaLibelle = value;
    }


}
