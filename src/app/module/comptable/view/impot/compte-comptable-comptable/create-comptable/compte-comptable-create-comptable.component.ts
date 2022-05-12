import {Component, OnInit, Input} from '@angular/core';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';
@Component({
  selector: 'app-compte-comptable-create-comptable',
  templateUrl: './compte-comptable-create-comptable.component.html',
  styleUrls: ['./compte-comptable-create-comptable.component.css']
})
export class CompteComptableCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCompteComptableLibelle = true;
   _validCompteComptableNumero = true;
   _validCompteComptableSousClasseComptable = true;

    _validSousClasseComptableNumero = true;
    _validSousClasseComptableLibelle = true;
    _validSousClasseComptableClasseComptable = true;



constructor(private datePipe: DatePipe, private compteComptableService: CompteComptableService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private sousClasseComptableService :SousClasseComptableService
) {

}


// methods
ngOnInit(): void {

    this.selectedSousClasseComptable = new SousClasseComptableVo();
    this.sousClasseComptableService.findAll().subscribe((data) => this.sousClasseComptables = data);
}




private setValidation(value : boolean){
    this.validCompteComptableLibelle = value;
    this.validCompteComptableNumero = value;
    this.validCompteComptableSousClasseComptable = value;
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
     this.compteComptableService.save().subscribe(compteComptable=>{
       this.compteComptables.push({...compteComptable});
       this.createCompteComptableDialog = false;
       this.submitted = false;
       this.selectedCompteComptable = new CompteComptableVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCompteComptableLibelle();
this.validateCompteComptableNumero();
this.validateCompteComptableSousClasseComptable();

    }

private validateCompteComptableLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCompteComptable.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCompteComptableLibelle = false;
        } else {
            this.validCompteComptableLibelle = true;
        }
    }
private validateCompteComptableNumero(){
        if (this.stringUtilService.isEmpty(this.selectedCompteComptable.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validCompteComptableNumero = false;
        } else {
            this.validCompteComptableNumero = true;
        }
    }
private validateCompteComptableSousClasseComptable(){
        if (this.stringUtilService.isEmpty(this.selectedCompteComptable.sousClasseComptableVo)) {
            this.errorMessages.push('Sous classe comptable non valide');
            this.validCompteComptableSousClasseComptable = false;
        } else {
            this.validCompteComptableSousClasseComptable = true;
        }
    }







//openPopup
              public async openCreatesousClasseComptable(sousClasseComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'add');
                       if(isPermistted){
         this.selectedSousClasseComptable = new SousClasseComptableVo();
        this.createSousClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCompteComptableDialog  = false;
    this.setValidation(true);
}

// getters and setters

get compteComptables(): Array<CompteComptableVo> {
    return this.compteComptableService.compteComptables;
       }
set compteComptables(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptables = value;
       }

 get selectedCompteComptable():CompteComptableVo {
           return this.compteComptableService.selectedCompteComptable;
       }
    set selectedCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.selectedCompteComptable = value;
       }

   get createCompteComptableDialog(): boolean {
           return this.compteComptableService.createCompteComptableDialog;

       }
    set createCompteComptableDialog(value: boolean) {
        this.compteComptableService.createCompteComptableDialog= value;
       }

       get selectedSousClasseComptable(): SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
      set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }
       get sousClasseComptables(): Array<SousClasseComptableVo> {
           return this.sousClasseComptableService.sousClasseComptables;
       }
       set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }
       get createSousClasseComptableDialog(): boolean {
           return this.sousClasseComptableService.createSousClasseComptableDialog;
       }
      set createSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.createSousClasseComptableDialog= value;
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

    get validCompteComptableLibelle(): boolean {
    return this._validCompteComptableLibelle;
    }

    set validCompteComptableLibelle(value: boolean) {
    this._validCompteComptableLibelle = value;
    }
    get validCompteComptableNumero(): boolean {
    return this._validCompteComptableNumero;
    }

    set validCompteComptableNumero(value: boolean) {
    this._validCompteComptableNumero = value;
    }
    get validCompteComptableSousClasseComptable(): boolean {
    return this._validCompteComptableSousClasseComptable;
    }

    set validCompteComptableSousClasseComptable(value: boolean) {
    this._validCompteComptableSousClasseComptable = value;
    }

    get validSousClasseComptableNumero(): boolean {
    return this._validSousClasseComptableNumero;
    }

    set validSousClasseComptableNumero(value: boolean) {
    this._validSousClasseComptableNumero = value;
    }
    get validSousClasseComptableLibelle(): boolean {
    return this._validSousClasseComptableLibelle;
    }

    set validSousClasseComptableLibelle(value: boolean) {
    this._validSousClasseComptableLibelle = value;
    }
    get validSousClasseComptableClasseComptable(): boolean {
    return this._validSousClasseComptableClasseComptable;
    }

    set validSousClasseComptableClasseComptable(value: boolean) {
    this._validSousClasseComptableClasseComptable = value;
    }

}
