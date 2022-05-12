import {Component, OnInit, Input} from '@angular/core';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-demande-create-societe',
  templateUrl: './etat-demande-create-societe.component.html',
  styleUrls: ['./etat-demande-create-societe.component.css']
})
export class EtatDemandeCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatDemandeReference = true;
   _validEtatDemandeLibelle = true;




constructor(private datePipe: DatePipe, private etatDemandeService: EtatDemandeService
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
    this.validEtatDemandeReference = value;
    this.validEtatDemandeLibelle = value;
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
     this.etatDemandeService.save().subscribe(etatDemande=>{
       this.etatDemandes.push({...etatDemande});
       this.createEtatDemandeDialog = false;
       this.submitted = false;
       this.selectedEtatDemande = new EtatDemandeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatDemandeReference();
this.validateEtatDemandeLibelle();

    }

private validateEtatDemandeReference(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDemande.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validEtatDemandeReference = false;
        } else {
            this.validEtatDemandeReference = true;
        }
    }
private validateEtatDemandeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDemande.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatDemandeLibelle = false;
        } else {
            this.validEtatDemandeLibelle = true;
        }
    }







//openPopup
// methods

hideCreateDialog(){
    this.createEtatDemandeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatDemandes(): Array<EtatDemandeVo> {
    return this.etatDemandeService.etatDemandes;
       }
set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }

 get selectedEtatDemande():EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
    set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }

   get createEtatDemandeDialog(): boolean {
           return this.etatDemandeService.createEtatDemandeDialog;

       }
    set createEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.createEtatDemandeDialog= value;
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

    get validEtatDemandeReference(): boolean {
    return this._validEtatDemandeReference;
    }

    set validEtatDemandeReference(value: boolean) {
    this._validEtatDemandeReference = value;
    }
    get validEtatDemandeLibelle(): boolean {
    return this._validEtatDemandeLibelle;
    }

    set validEtatDemandeLibelle(value: boolean) {
    this._validEtatDemandeLibelle = value;
    }


}
