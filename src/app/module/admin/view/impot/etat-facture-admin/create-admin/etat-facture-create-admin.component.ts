import {Component, OnInit, Input} from '@angular/core';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-facture-create-admin',
  templateUrl: './etat-facture-create-admin.component.html',
  styleUrls: ['./etat-facture-create-admin.component.css']
})
export class EtatFactureCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatFactureLibelle = true;




constructor(private datePipe: DatePipe, private etatFactureService: EtatFactureService
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
    this.validEtatFactureLibelle = value;
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
     this.etatFactureService.save().subscribe(etatFacture=>{
       this.etatFactures.push({...etatFacture});
       this.createEtatFactureDialog = false;
       this.submitted = false;
       this.selectedEtatFacture = new EtatFactureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatFactureLibelle();

    }

private validateEtatFactureLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatFacture.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatFactureLibelle = false;
        } else {
            this.validEtatFactureLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createEtatFactureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatFactures(): Array<EtatFactureVo> {
    return this.etatFactureService.etatFactures;
       }
set etatFactures(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactures = value;
       }

 get selectedEtatFacture():EtatFactureVo {
           return this.etatFactureService.selectedEtatFacture;
       }
    set selectedEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.selectedEtatFacture = value;
       }

   get createEtatFactureDialog(): boolean {
           return this.etatFactureService.createEtatFactureDialog;

       }
    set createEtatFactureDialog(value: boolean) {
        this.etatFactureService.createEtatFactureDialog= value;
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

    get validEtatFactureLibelle(): boolean {
    return this._validEtatFactureLibelle;
    }

    set validEtatFactureLibelle(value: boolean) {
    this._validEtatFactureLibelle = value;
    }


}
