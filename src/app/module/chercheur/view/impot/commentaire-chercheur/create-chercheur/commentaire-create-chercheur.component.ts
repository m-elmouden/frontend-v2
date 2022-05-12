import {Component, OnInit, Input} from '@angular/core';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
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
  selector: 'app-commentaire-create-chercheur',
  templateUrl: './commentaire-create-chercheur.component.html',
  styleUrls: ['./commentaire-create-chercheur.component.css']
})
export class CommentaireCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCommentaireDescription = true;
   _validCommentaireDateCommentaire = true;

    _validDemandeReference = true;
    _validDemandeOperation = true;
    _validDemandeDateDemande = true;
    _validDemandeSociete = true;
    _validDemandeComptable = true;
    _validDemandeEtatDemande = true;



constructor(private datePipe: DatePipe, private commentaireService: CommentaireService
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
    this.validCommentaireDescription = value;
    this.validCommentaireDateCommentaire = value;
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
     this.commentaireService.save().subscribe(commentaire=>{
       this.commentaires.push({...commentaire});
       this.createCommentaireDialog = false;
       this.submitted = false;
       this.selectedCommentaire = new CommentaireVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCommentaireDescription();
this.validateCommentaireDateCommentaire();

    }

private validateCommentaireDescription(){
        if (this.stringUtilService.isEmpty(this.selectedCommentaire.description)) {
            this.errorMessages.push('Description non valide');
            this.validCommentaireDescription = false;
        } else {
            this.validCommentaireDescription = true;
        }
    }
private validateCommentaireDateCommentaire(){
        if (this.stringUtilService.isEmpty(this.selectedCommentaire.dateCommentaire)) {
            this.errorMessages.push('Date commentaire non valide');
            this.validCommentaireDateCommentaire = false;
        } else {
            this.validCommentaireDateCommentaire = true;
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
    this.createCommentaireDialog  = false;
    this.setValidation(true);
}

// getters and setters

get commentaires(): Array<CommentaireVo> {
    return this.commentaireService.commentaires;
       }
set commentaires(value: Array<CommentaireVo>) {
        this.commentaireService.commentaires = value;
       }

 get selectedCommentaire():CommentaireVo {
           return this.commentaireService.selectedCommentaire;
       }
    set selectedCommentaire(value: CommentaireVo) {
        this.commentaireService.selectedCommentaire = value;
       }

   get createCommentaireDialog(): boolean {
           return this.commentaireService.createCommentaireDialog;

       }
    set createCommentaireDialog(value: boolean) {
        this.commentaireService.createCommentaireDialog= value;
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

    get validCommentaireDescription(): boolean {
    return this._validCommentaireDescription;
    }

    set validCommentaireDescription(value: boolean) {
    this._validCommentaireDescription = value;
    }
    get validCommentaireDateCommentaire(): boolean {
    return this._validCommentaireDateCommentaire;
    }

    set validCommentaireDateCommentaire(value: boolean) {
    this._validCommentaireDateCommentaire = value;
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
