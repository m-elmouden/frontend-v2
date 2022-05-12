import {Component, OnInit, Input} from '@angular/core';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-declaration-is-create-comptable',
  templateUrl: './etat-declaration-is-create-comptable.component.html',
  styleUrls: ['./etat-declaration-is-create-comptable.component.css']
})
export class EtatDeclarationIsCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatDeclarationIsReference = true;
   _validEtatDeclarationIsLibelle = true;




constructor(private datePipe: DatePipe, private etatDeclarationIsService: EtatDeclarationIsService
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
    this.validEtatDeclarationIsReference = value;
    this.validEtatDeclarationIsLibelle = value;
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
     this.etatDeclarationIsService.save().subscribe(etatDeclarationIs=>{
       this.etatDeclarationIss.push({...etatDeclarationIs});
       this.createEtatDeclarationIsDialog = false;
       this.submitted = false;
       this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatDeclarationIsReference();
this.validateEtatDeclarationIsLibelle();

    }

private validateEtatDeclarationIsReference(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDeclarationIs.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validEtatDeclarationIsReference = false;
        } else {
            this.validEtatDeclarationIsReference = true;
        }
    }
private validateEtatDeclarationIsLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDeclarationIs.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatDeclarationIsLibelle = false;
        } else {
            this.validEtatDeclarationIsLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createEtatDeclarationIsDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
    return this.etatDeclarationIsService.etatDeclarationIss;
       }
set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }

 get selectedEtatDeclarationIs():EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
    set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }

   get createEtatDeclarationIsDialog(): boolean {
           return this.etatDeclarationIsService.createEtatDeclarationIsDialog;

       }
    set createEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.createEtatDeclarationIsDialog= value;
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

    get validEtatDeclarationIsReference(): boolean {
    return this._validEtatDeclarationIsReference;
    }

    set validEtatDeclarationIsReference(value: boolean) {
    this._validEtatDeclarationIsReference = value;
    }
    get validEtatDeclarationIsLibelle(): boolean {
    return this._validEtatDeclarationIsLibelle;
    }

    set validEtatDeclarationIsLibelle(value: boolean) {
    this._validEtatDeclarationIsLibelle = value;
    }


}
