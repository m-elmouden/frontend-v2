import {Component, OnInit, Input} from '@angular/core';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-operation-facture-create-chercheur',
  templateUrl: './type-operation-facture-create-chercheur.component.html',
  styleUrls: ['./type-operation-facture-create-chercheur.component.css']
})
export class TypeOperationFactureCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeOperationFactureLibelle = true;
   _validTypeOperationFactureTypeOperationSociete = true;




constructor(private datePipe: DatePipe, private typeOperationFactureService: TypeOperationFactureService
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
    this.validTypeOperationFactureLibelle = value;
    this.validTypeOperationFactureTypeOperationSociete = value;
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
     this.typeOperationFactureService.save().subscribe(typeOperationFacture=>{
       this.typeOperationFactures.push({...typeOperationFacture});
       this.createTypeOperationFactureDialog = false;
       this.submitted = false;
       this.selectedTypeOperationFacture = new TypeOperationFactureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeOperationFactureLibelle();
this.validateTypeOperationFactureTypeOperationSociete();

    }

private validateTypeOperationFactureLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeOperationFacture.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeOperationFactureLibelle = false;
        } else {
            this.validTypeOperationFactureLibelle = true;
        }
    }
private validateTypeOperationFactureTypeOperationSociete(){
        if (this.stringUtilService.isEmpty(this.selectedTypeOperationFacture.typeOperationSociete)) {
            this.errorMessages.push('Type operation societe non valide');
            this.validTypeOperationFactureTypeOperationSociete = false;
        } else {
            this.validTypeOperationFactureTypeOperationSociete = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypeOperationFactureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeOperationFactures(): Array<TypeOperationFactureVo> {
    return this.typeOperationFactureService.typeOperationFactures;
       }
set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactures = value;
       }

 get selectedTypeOperationFacture():TypeOperationFactureVo {
           return this.typeOperationFactureService.selectedTypeOperationFacture;
       }
    set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.selectedTypeOperationFacture = value;
       }

   get createTypeOperationFactureDialog(): boolean {
           return this.typeOperationFactureService.createTypeOperationFactureDialog;

       }
    set createTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.createTypeOperationFactureDialog= value;
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

    get validTypeOperationFactureLibelle(): boolean {
    return this._validTypeOperationFactureLibelle;
    }

    set validTypeOperationFactureLibelle(value: boolean) {
    this._validTypeOperationFactureLibelle = value;
    }
    get validTypeOperationFactureTypeOperationSociete(): boolean {
    return this._validTypeOperationFactureTypeOperationSociete;
    }

    set validTypeOperationFactureTypeOperationSociete(value: boolean) {
    this._validTypeOperationFactureTypeOperationSociete = value;
    }


}
