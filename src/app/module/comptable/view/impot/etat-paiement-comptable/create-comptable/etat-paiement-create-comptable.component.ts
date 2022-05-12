import {Component, OnInit, Input} from '@angular/core';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-paiement-create-comptable',
  templateUrl: './etat-paiement-create-comptable.component.html',
  styleUrls: ['./etat-paiement-create-comptable.component.css']
})
export class EtatPaiementCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatPaiementLibelle = true;




constructor(private datePipe: DatePipe, private etatPaiementService: EtatPaiementService
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
    this.validEtatPaiementLibelle = value;
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
     this.etatPaiementService.save().subscribe(etatPaiement=>{
       this.etatPaiements.push({...etatPaiement});
       this.createEtatPaiementDialog = false;
       this.submitted = false;
       this.selectedEtatPaiement = new EtatPaiementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatPaiementLibelle();

    }

private validateEtatPaiementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatPaiement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatPaiementLibelle = false;
        } else {
            this.validEtatPaiementLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createEtatPaiementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatPaiements(): Array<EtatPaiementVo> {
    return this.etatPaiementService.etatPaiements;
       }
set etatPaiements(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiements = value;
       }

 get selectedEtatPaiement():EtatPaiementVo {
           return this.etatPaiementService.selectedEtatPaiement;
       }
    set selectedEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.selectedEtatPaiement = value;
       }

   get createEtatPaiementDialog(): boolean {
           return this.etatPaiementService.createEtatPaiementDialog;

       }
    set createEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.createEtatPaiementDialog= value;
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

    get validEtatPaiementLibelle(): boolean {
    return this._validEtatPaiementLibelle;
    }

    set validEtatPaiementLibelle(value: boolean) {
    this._validEtatPaiementLibelle = value;
    }


}
