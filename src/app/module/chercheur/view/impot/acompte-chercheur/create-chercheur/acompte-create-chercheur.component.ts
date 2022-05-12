import {Component, OnInit, Input} from '@angular/core';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
@Component({
  selector: 'app-acompte-create-chercheur',
  templateUrl: './acompte-create-chercheur.component.html',
  styleUrls: ['./acompte-create-chercheur.component.css']
})
export class AcompteCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validAcompteNumero = true;
   _validAcompteAnnee = true;
   _validAcompteMontant = true;
   _validAcompteSociete = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;



constructor(private datePipe: DatePipe, private acompteService: AcompteService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private societeService :SocieteService
) {

}


// methods
ngOnInit(): void {

    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
}




private setValidation(value : boolean){
    this.validAcompteNumero = value;
    this.validAcompteAnnee = value;
    this.validAcompteMontant = value;
    this.validAcompteSociete = value;
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
     this.acompteService.save().subscribe(acompte=>{
       this.acomptes.push({...acompte});
       this.createAcompteDialog = false;
       this.submitted = false;
       this.selectedAcompte = new AcompteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateAcompteNumero();
this.validateAcompteAnnee();
this.validateAcompteMontant();
this.validateAcompteSociete();

    }

private validateAcompteNumero(){
        if (this.stringUtilService.isEmpty(this.selectedAcompte.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validAcompteNumero = false;
        } else {
            this.validAcompteNumero = true;
        }
    }
private validateAcompteAnnee(){
        if (this.stringUtilService.isEmpty(this.selectedAcompte.annee)) {
            this.errorMessages.push('Annee non valide');
            this.validAcompteAnnee = false;
        } else {
            this.validAcompteAnnee = true;
        }
    }
private validateAcompteMontant(){
        if (this.stringUtilService.isEmpty(this.selectedAcompte.montant)) {
            this.errorMessages.push('Montant non valide');
            this.validAcompteMontant = false;
        } else {
            this.validAcompteMontant = true;
        }
    }
private validateAcompteSociete(){
        if (this.stringUtilService.isEmpty(this.selectedAcompte.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validAcompteSociete = false;
        } else {
            this.validAcompteSociete = true;
        }
    }














//openPopup
              public async openCreatesociete(societe: string) {
                      const isPermistted = await this.roleService.isPermitted('Societe', 'add');
                       if(isPermistted){
         this.selectedSociete = new SocieteVo();
        this.createSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createAcompteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get acomptes(): Array<AcompteVo> {
    return this.acompteService.acomptes;
       }
set acomptes(value: Array<AcompteVo>) {
        this.acompteService.acomptes = value;
       }

 get selectedAcompte():AcompteVo {
           return this.acompteService.selectedAcompte;
       }
    set selectedAcompte(value: AcompteVo) {
        this.acompteService.selectedAcompte = value;
       }

   get createAcompteDialog(): boolean {
           return this.acompteService.createAcompteDialog;

       }
    set createAcompteDialog(value: boolean) {
        this.acompteService.createAcompteDialog= value;
       }

       get selectedSociete(): SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes(): Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get createSocieteDialog(): boolean {
           return this.societeService.createSocieteDialog;
       }
      set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog= value;
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

    get validAcompteNumero(): boolean {
    return this._validAcompteNumero;
    }

    set validAcompteNumero(value: boolean) {
    this._validAcompteNumero = value;
    }
    get validAcompteAnnee(): boolean {
    return this._validAcompteAnnee;
    }

    set validAcompteAnnee(value: boolean) {
    this._validAcompteAnnee = value;
    }
    get validAcompteMontant(): boolean {
    return this._validAcompteMontant;
    }

    set validAcompteMontant(value: boolean) {
    this._validAcompteMontant = value;
    }
    get validAcompteSociete(): boolean {
    return this._validAcompteSociete;
    }

    set validAcompteSociete(value: boolean) {
    this._validAcompteSociete = value;
    }

    get validSocieteIce(): boolean {
    return this._validSocieteIce;
    }

    set validSocieteIce(value: boolean) {
    this._validSocieteIce = value;
    }
    get validSocieteRaisonSociale(): boolean {
    return this._validSocieteRaisonSociale;
    }

    set validSocieteRaisonSociale(value: boolean) {
    this._validSocieteRaisonSociale = value;
    }
    get validSocieteDateCreation(): boolean {
    return this._validSocieteDateCreation;
    }

    set validSocieteDateCreation(value: boolean) {
    this._validSocieteDateCreation = value;
    }
    get validSocieteAge(): boolean {
    return this._validSocieteAge;
    }

    set validSocieteAge(value: boolean) {
    this._validSocieteAge = value;
    }
    get validSocietePresidentSociete(): boolean {
    return this._validSocietePresidentSociete;
    }

    set validSocietePresidentSociete(value: boolean) {
    this._validSocietePresidentSociete = value;
    }

}
