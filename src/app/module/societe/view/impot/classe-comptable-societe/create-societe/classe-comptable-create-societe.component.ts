import {Component, OnInit, Input} from '@angular/core';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
@Component({
  selector: 'app-classe-comptable-create-societe',
  templateUrl: './classe-comptable-create-societe.component.html',
  styleUrls: ['./classe-comptable-create-societe.component.css']
})
export class ClasseComptableCreateSocieteComponent implements OnInit {

        selectedSousClasseComptables: SousClasseComptableVo = new SousClasseComptableVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validClasseComptableLibelle = true;
   _validClasseComptableNumero = true;

    _validSousClasseComptableNumero = true;
    _validSousClasseComptableLibelle = true;
    _validSousClasseComptableClasseComptable = true;



constructor(private datePipe: DatePipe, private classeComptableService: ClasseComptableService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private sousClasseComptableService :SousClasseComptableService
) {

}


// methods
ngOnInit(): void {




}


    validateSousClasseComptables(){
    this.errorMessages = new Array();
    this.validateSousClasseComptableNumero();
    this.validateSousClasseComptableLibelle();
    this.validateSousClasseComptableClasseComptable();
    }


private setValidation(value : boolean){
    this.validClasseComptableLibelle = value;
    this.validClasseComptableNumero = value;
    this.validSousClasseComptableNumero = value;
    this.validSousClasseComptableLibelle = value;
    this.validSousClasseComptableClasseComptable = value;
    }

        addSousClasseComptables() {
        if( this.selectedClasseComptable.sousClasseComptablesVo == null ){
            this.selectedClasseComptable.sousClasseComptablesVo = new Array<SousClasseComptableVo>();
        }
       this.validateSousClasseComptables();
       if (this.errorMessages.length === 0) {
              this.selectedClasseComptable.sousClasseComptablesVo.push(this.selectedSousClasseComptables);
              this.selectedSousClasseComptables = new SousClasseComptableVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteSousClasseComptables(p: SousClasseComptableVo) {
        this.selectedClasseComptable.sousClasseComptablesVo.forEach((element, index) => {
            if (element === p) { this.selectedClasseComptable.sousClasseComptablesVo.splice(index, 1); }
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
     this.classeComptableService.save().subscribe(classeComptable=>{
       this.classeComptables.push({...classeComptable});
       this.createClasseComptableDialog = false;
       this.submitted = false;
       this.selectedClasseComptable = new ClasseComptableVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateClasseComptableLibelle();
this.validateClasseComptableNumero();

    }

private validateClasseComptableLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedClasseComptable.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validClasseComptableLibelle = false;
        } else {
            this.validClasseComptableLibelle = true;
        }
    }
private validateClasseComptableNumero(){
        if (this.stringUtilService.isEmpty(this.selectedClasseComptable.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validClasseComptableNumero = false;
        } else {
            this.validClasseComptableNumero = true;
        }
    }







            private validateSousClasseComptableNumero(){
            if (this.selectedSousClasseComptables.numero == null) {
            this.errorMessages.push('Numero de la sousClasseComptable est  invalide');
             this.validSousClasseComptableNumero = false;
            } else {
            this.validSousClasseComptableNumero = true;
            }
            }

            private validateSousClasseComptableLibelle(){
            if (this.selectedSousClasseComptables.libelle == null) {
            this.errorMessages.push('Libelle de la sousClasseComptable est  invalide');
             this.validSousClasseComptableLibelle = false;
            } else {
            this.validSousClasseComptableLibelle = true;
            }
            }

            private validateSousClasseComptableClasseComptable(){
            if (this.selectedSousClasseComptables.classeComptableVo == null) {
            this.errorMessages.push('ClasseComptable de la sousClasseComptable est  invalide');
             this.validSousClasseComptableClasseComptable = false;
            } else {
            this.validSousClasseComptableClasseComptable = true;
            }
            }










//openPopup
// methods

hideCreateDialog(){
    this.createClasseComptableDialog  = false;
    this.setValidation(true);
}

// getters and setters

get classeComptables(): Array<ClasseComptableVo> {
    return this.classeComptableService.classeComptables;
       }
set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }

 get selectedClasseComptable():ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
    set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
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
