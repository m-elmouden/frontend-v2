import {Component, OnInit, Input} from '@angular/core';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
@Component({
  selector: 'app-demande-piece-jointe-create-comptable',
  templateUrl: './demande-piece-jointe-create-comptable.component.html',
  styleUrls: ['./demande-piece-jointe-create-comptable.component.css']
})
export class DemandePieceJointeCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDemandePieceJointeName = true;
   _validDemandePieceJointePath = true;

    _validDemandeReference = true;
    _validDemandeOperation = true;
    _validDemandeDateDemande = true;
    _validDemandeSociete = true;
    _validDemandeComptable = true;
    _validDemandeEtatDemande = true;



constructor(private datePipe: DatePipe, private demandePieceJointeService: DemandePieceJointeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private demandeService :DemandeService
) {

}


// methods
ngOnInit(): void {

    this.selectedDemande = new DemandeVo();
    this.demandeService.findAll().subscribe((data) => this.demandes = data);
}




private setValidation(value : boolean){
    this.validDemandePieceJointeName = value;
    this.validDemandePieceJointePath = value;
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
     this.demandePieceJointeService.save().subscribe(demandePieceJointe=>{
       this.demandePieceJointes.push({...demandePieceJointe});
       this.createDemandePieceJointeDialog = false;
       this.submitted = false;
       this.selectedDemandePieceJointe = new DemandePieceJointeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDemandePieceJointeName();
this.validateDemandePieceJointePath();

    }

private validateDemandePieceJointeName(){
        if (this.stringUtilService.isEmpty(this.selectedDemandePieceJointe.name)) {
            this.errorMessages.push('Name non valide');
            this.validDemandePieceJointeName = false;
        } else {
            this.validDemandePieceJointeName = true;
        }
    }
private validateDemandePieceJointePath(){
        if (this.stringUtilService.isEmpty(this.selectedDemandePieceJointe.path)) {
            this.errorMessages.push('Path non valide');
            this.validDemandePieceJointePath = false;
        } else {
            this.validDemandePieceJointePath = true;
        }
    }







//openPopup
              public async openCreatedemande(demande: string) {
                      const isPermistted = await this.roleService.isPermitted('Demande', 'add');
                       if(isPermistted){
         this.selectedDemande = new DemandeVo();
        this.createDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDemandePieceJointeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get demandePieceJointes(): Array<DemandePieceJointeVo> {
    return this.demandePieceJointeService.demandePieceJointes;
       }
set demandePieceJointes(value: Array<DemandePieceJointeVo>) {
        this.demandePieceJointeService.demandePieceJointes = value;
       }

 get selectedDemandePieceJointe():DemandePieceJointeVo {
           return this.demandePieceJointeService.selectedDemandePieceJointe;
       }
    set selectedDemandePieceJointe(value: DemandePieceJointeVo) {
        this.demandePieceJointeService.selectedDemandePieceJointe = value;
       }

   get createDemandePieceJointeDialog(): boolean {
           return this.demandePieceJointeService.createDemandePieceJointeDialog;

       }
    set createDemandePieceJointeDialog(value: boolean) {
        this.demandePieceJointeService.createDemandePieceJointeDialog= value;
       }

       get selectedDemande(): DemandeVo {
           return this.demandeService.selectedDemande;
       }
      set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }
       get demandes(): Array<DemandeVo> {
           return this.demandeService.demandes;
       }
       set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }
       get createDemandeDialog(): boolean {
           return this.demandeService.createDemandeDialog;
       }
      set createDemandeDialog(value: boolean) {
        this.demandeService.createDemandeDialog= value;
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

    get validDemandePieceJointeName(): boolean {
    return this._validDemandePieceJointeName;
    }

    set validDemandePieceJointeName(value: boolean) {
    this._validDemandePieceJointeName = value;
    }
    get validDemandePieceJointePath(): boolean {
    return this._validDemandePieceJointePath;
    }

    set validDemandePieceJointePath(value: boolean) {
    this._validDemandePieceJointePath = value;
    }

    get validDemandeReference(): boolean {
    return this._validDemandeReference;
    }

    set validDemandeReference(value: boolean) {
    this._validDemandeReference = value;
    }
    get validDemandeOperation(): boolean {
    return this._validDemandeOperation;
    }

    set validDemandeOperation(value: boolean) {
    this._validDemandeOperation = value;
    }
    get validDemandeDateDemande(): boolean {
    return this._validDemandeDateDemande;
    }

    set validDemandeDateDemande(value: boolean) {
    this._validDemandeDateDemande = value;
    }
    get validDemandeSociete(): boolean {
    return this._validDemandeSociete;
    }

    set validDemandeSociete(value: boolean) {
    this._validDemandeSociete = value;
    }
    get validDemandeComptable(): boolean {
    return this._validDemandeComptable;
    }

    set validDemandeComptable(value: boolean) {
    this._validDemandeComptable = value;
    }
    get validDemandeEtatDemande(): boolean {
    return this._validDemandeEtatDemande;
    }

    set validDemandeEtatDemande(value: boolean) {
    this._validDemandeEtatDemande = value;
    }

}
