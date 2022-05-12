import {Component, OnInit, Input} from '@angular/core';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
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
  selector: 'app-president-societe-create-societe',
  templateUrl: './president-societe-create-societe.component.html',
  styleUrls: ['./president-societe-create-societe.component.css']
})
export class PresidentSocieteCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPresidentSocieteCin = true;
   _validPresidentSocieteNom = true;
   _validPresidentSocietePrenom = true;
   _validPresidentSocieteSociete = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;



constructor(private datePipe: DatePipe, private presidentSocieteService: PresidentSocieteService
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
    this.validPresidentSocieteCin = value;
    this.validPresidentSocieteNom = value;
    this.validPresidentSocietePrenom = value;
    this.validPresidentSocieteSociete = value;
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
     this.presidentSocieteService.save().subscribe(presidentSociete=>{
       this.presidentSocietes.push({...presidentSociete});
       this.createPresidentSocieteDialog = false;
       this.submitted = false;
       this.selectedPresidentSociete = new PresidentSocieteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePresidentSocieteCin();
this.validatePresidentSocieteNom();
this.validatePresidentSocietePrenom();
this.validatePresidentSocieteSociete();

    }

private validatePresidentSocieteCin(){
        if (this.stringUtilService.isEmpty(this.selectedPresidentSociete.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validPresidentSocieteCin = false;
        } else {
            this.validPresidentSocieteCin = true;
        }
    }
private validatePresidentSocieteNom(){
        if (this.stringUtilService.isEmpty(this.selectedPresidentSociete.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validPresidentSocieteNom = false;
        } else {
            this.validPresidentSocieteNom = true;
        }
    }
private validatePresidentSocietePrenom(){
        if (this.stringUtilService.isEmpty(this.selectedPresidentSociete.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validPresidentSocietePrenom = false;
        } else {
            this.validPresidentSocietePrenom = true;
        }
    }
private validatePresidentSocieteSociete(){
        if (this.stringUtilService.isEmpty(this.selectedPresidentSociete.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validPresidentSocieteSociete = false;
        } else {
            this.validPresidentSocieteSociete = true;
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
    this.createPresidentSocieteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get presidentSocietes(): Array<PresidentSocieteVo> {
    return this.presidentSocieteService.presidentSocietes;
       }
set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }

 get selectedPresidentSociete():PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
    set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }

   get createPresidentSocieteDialog(): boolean {
           return this.presidentSocieteService.createPresidentSocieteDialog;

       }
    set createPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.createPresidentSocieteDialog= value;
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

    get validPresidentSocieteCin(): boolean {
    return this._validPresidentSocieteCin;
    }

    set validPresidentSocieteCin(value: boolean) {
    this._validPresidentSocieteCin = value;
    }
    get validPresidentSocieteNom(): boolean {
    return this._validPresidentSocieteNom;
    }

    set validPresidentSocieteNom(value: boolean) {
    this._validPresidentSocieteNom = value;
    }
    get validPresidentSocietePrenom(): boolean {
    return this._validPresidentSocietePrenom;
    }

    set validPresidentSocietePrenom(value: boolean) {
    this._validPresidentSocietePrenom = value;
    }
    get validPresidentSocieteSociete(): boolean {
    return this._validPresidentSocieteSociete;
    }

    set validPresidentSocieteSociete(value: boolean) {
    this._validPresidentSocieteSociete = value;
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
