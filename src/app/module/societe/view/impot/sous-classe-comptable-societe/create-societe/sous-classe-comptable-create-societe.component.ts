import {Component, OnInit, Input} from '@angular/core';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';
import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
@Component({
  selector: 'app-sous-classe-comptable-create-societe',
  templateUrl: './sous-classe-comptable-create-societe.component.html',
  styleUrls: ['./sous-classe-comptable-create-societe.component.css']
})
export class SousClasseComptableCreateSocieteComponent implements OnInit {

        selectedCompteComptables: CompteComptableVo = new CompteComptableVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validSousClasseComptableNumero = true;
   _validSousClasseComptableLibelle = true;
   _validSousClasseComptableClasseComptable = true;

    _validClasseComptableLibelle = true;
    _validClasseComptableNumero = true;
    _validCompteComptableLibelle = true;
    _validCompteComptableNumero = true;
    _validCompteComptableSousClasseComptable = true;



constructor(private datePipe: DatePipe, private sousClasseComptableService: SousClasseComptableService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private classeComptableService :ClasseComptableService
,       private compteComptableService :CompteComptableService
) {

}


// methods
ngOnInit(): void {




    this.selectedClasseComptable = new ClasseComptableVo();
    this.classeComptableService.findAll().subscribe((data) => this.classeComptables = data);
}


    validateCompteComptables(){
    this.errorMessages = new Array();
    this.validateCompteComptableLibelle();
    this.validateCompteComptableNumero();
    this.validateCompteComptableSousClasseComptable();
    }


private setValidation(value : boolean){
    this.validSousClasseComptableNumero = value;
    this.validSousClasseComptableLibelle = value;
    this.validSousClasseComptableClasseComptable = value;
    this.validCompteComptableLibelle = value;
    this.validCompteComptableNumero = value;
    this.validCompteComptableSousClasseComptable = value;
    }

        addCompteComptables() {
        if( this.selectedSousClasseComptable.compteComptablesVo == null ){
            this.selectedSousClasseComptable.compteComptablesVo = new Array<CompteComptableVo>();
        }
       this.validateCompteComptables();
       if (this.errorMessages.length === 0) {
              this.selectedSousClasseComptable.compteComptablesVo.push(this.selectedCompteComptables);
              this.selectedCompteComptables = new CompteComptableVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCompteComptables(p: CompteComptableVo) {
        this.selectedSousClasseComptable.compteComptablesVo.forEach((element, index) => {
            if (element === p) { this.selectedSousClasseComptable.compteComptablesVo.splice(index, 1); }
        });
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
     this.sousClasseComptableService.save().subscribe(sousClasseComptable=>{
       this.sousClasseComptables.push({...sousClasseComptable});
       this.createSousClasseComptableDialog = false;
       this.submitted = false;
       this.selectedSousClasseComptable = new SousClasseComptableVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateSousClasseComptableNumero();
this.validateSousClasseComptableLibelle();
this.validateSousClasseComptableClasseComptable();

    }

private validateSousClasseComptableNumero(){
        if (this.stringUtilService.isEmpty(this.selectedSousClasseComptable.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validSousClasseComptableNumero = false;
        } else {
            this.validSousClasseComptableNumero = true;
        }
    }
private validateSousClasseComptableLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedSousClasseComptable.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSousClasseComptableLibelle = false;
        } else {
            this.validSousClasseComptableLibelle = true;
        }
    }
private validateSousClasseComptableClasseComptable(){
        if (this.stringUtilService.isEmpty(this.selectedSousClasseComptable.classeComptableVo)) {
            this.errorMessages.push('Classe comptable non valide');
            this.validSousClasseComptableClasseComptable = false;
        } else {
            this.validSousClasseComptableClasseComptable = true;
        }
    }








            private validateCompteComptableLibelle(){
            if (this.selectedCompteComptables.libelle == null) {
            this.errorMessages.push('Libelle de la compteComptable est  invalide');
             this.validCompteComptableLibelle = false;
            } else {
            this.validCompteComptableLibelle = true;
            }
            }

            private validateCompteComptableNumero(){
            if (this.selectedCompteComptables.numero == null) {
            this.errorMessages.push('Numero de la compteComptable est  invalide');
             this.validCompteComptableNumero = false;
            } else {
            this.validCompteComptableNumero = true;
            }
            }

            private validateCompteComptableSousClasseComptable(){
            if (this.selectedCompteComptables.sousClasseComptableVo == null) {
            this.errorMessages.push('SousClasseComptable de la compteComptable est  invalide');
             this.validCompteComptableSousClasseComptable = false;
            } else {
            this.validCompteComptableSousClasseComptable = true;
            }
            }



//openPopup
              public async openCreateclasseComptable(classeComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'add');
                       if(isPermistted){
         this.selectedClasseComptable = new ClasseComptableVo();
        this.createClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createSousClasseComptableDialog  = false;
    this.setValidation(true);
}

// getters and setters

get sousClasseComptables(): Array<SousClasseComptableVo> {
    return this.sousClasseComptableService.sousClasseComptables;
       }
set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }

 get selectedSousClasseComptable():SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
    set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }

   get createSousClasseComptableDialog(): boolean {
           return this.sousClasseComptableService.createSousClasseComptableDialog;

       }
    set createSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.createSousClasseComptableDialog= value;
       }

       get selectedClasseComptable(): ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
      set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }
       get classeComptables(): Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptables;
       }
       set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }
       get createClasseComptableDialog(): boolean {
           return this.classeComptableService.createClasseComptableDialog;
       }
      set createClasseComptableDialog(value: boolean) {
        this.classeComptableService.createClasseComptableDialog= value;
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

    get validClasseComptableLibelle(): boolean {
    return this._validClasseComptableLibelle;
    }

    set validClasseComptableLibelle(value: boolean) {
    this._validClasseComptableLibelle = value;
    }
    get validClasseComptableNumero(): boolean {
    return this._validClasseComptableNumero;
    }

    set validClasseComptableNumero(value: boolean) {
    this._validClasseComptableNumero = value;
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

}
