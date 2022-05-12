import {Component, OnInit, Input} from '@angular/core';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-declaration-tva-create-societe',
  templateUrl: './etat-declaration-tva-create-societe.component.html',
  styleUrls: ['./etat-declaration-tva-create-societe.component.css']
})
export class EtatDeclarationTvaCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatDeclarationTvaReference = true;
   _validEtatDeclarationTvaLibelle = true;




constructor(private datePipe: DatePipe, private etatDeclarationTvaService: EtatDeclarationTvaService
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
    this.validEtatDeclarationTvaReference = value;
    this.validEtatDeclarationTvaLibelle = value;
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
     this.etatDeclarationTvaService.save().subscribe(etatDeclarationTva=>{
       this.etatDeclarationTvas.push({...etatDeclarationTva});
       this.createEtatDeclarationTvaDialog = false;
       this.submitted = false;
       this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatDeclarationTvaReference();
this.validateEtatDeclarationTvaLibelle();

    }

private validateEtatDeclarationTvaReference(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDeclarationTva.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validEtatDeclarationTvaReference = false;
        } else {
            this.validEtatDeclarationTvaReference = true;
        }
    }
private validateEtatDeclarationTvaLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDeclarationTva.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatDeclarationTvaLibelle = false;
        } else {
            this.validEtatDeclarationTvaLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createEtatDeclarationTvaDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
    return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }

 get selectedEtatDeclarationTva():EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
    set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }

   get createEtatDeclarationTvaDialog(): boolean {
           return this.etatDeclarationTvaService.createEtatDeclarationTvaDialog;

       }
    set createEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.createEtatDeclarationTvaDialog= value;
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

    get validEtatDeclarationTvaReference(): boolean {
    return this._validEtatDeclarationTvaReference;
    }

    set validEtatDeclarationTvaReference(value: boolean) {
    this._validEtatDeclarationTvaReference = value;
    }
    get validEtatDeclarationTvaLibelle(): boolean {
    return this._validEtatDeclarationTvaLibelle;
    }

    set validEtatDeclarationTvaLibelle(value: boolean) {
    this._validEtatDeclarationTvaLibelle = value;
    }


}
