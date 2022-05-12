import {Component, OnInit, Input} from '@angular/core';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-declaration-ir-create-admin',
  templateUrl: './etat-declaration-ir-create-admin.component.html',
  styleUrls: ['./etat-declaration-ir-create-admin.component.css']
})
export class EtatDeclarationIrCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatDeclarationIrReference = true;
   _validEtatDeclarationIrLibelle = true;




constructor(private datePipe: DatePipe, private etatDeclarationIrService: EtatDeclarationIrService
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
    this.validEtatDeclarationIrReference = value;
    this.validEtatDeclarationIrLibelle = value;
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
     this.etatDeclarationIrService.save().subscribe(etatDeclarationIr=>{
       this.etatDeclarationIrs.push({...etatDeclarationIr});
       this.createEtatDeclarationIrDialog = false;
       this.submitted = false;
       this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatDeclarationIrReference();
this.validateEtatDeclarationIrLibelle();

    }

private validateEtatDeclarationIrReference(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDeclarationIr.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validEtatDeclarationIrReference = false;
        } else {
            this.validEtatDeclarationIrReference = true;
        }
    }
private validateEtatDeclarationIrLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDeclarationIr.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatDeclarationIrLibelle = false;
        } else {
            this.validEtatDeclarationIrLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createEtatDeclarationIrDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
    return this.etatDeclarationIrService.etatDeclarationIrs;
       }
set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }

 get selectedEtatDeclarationIr():EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
    set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }

   get createEtatDeclarationIrDialog(): boolean {
           return this.etatDeclarationIrService.createEtatDeclarationIrDialog;

       }
    set createEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.createEtatDeclarationIrDialog= value;
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

    get validEtatDeclarationIrReference(): boolean {
    return this._validEtatDeclarationIrReference;
    }

    set validEtatDeclarationIrReference(value: boolean) {
    this._validEtatDeclarationIrReference = value;
    }
    get validEtatDeclarationIrLibelle(): boolean {
    return this._validEtatDeclarationIrLibelle;
    }

    set validEtatDeclarationIrLibelle(value: boolean) {
    this._validEtatDeclarationIrLibelle = value;
    }


}
