import {Component, OnInit} from '@angular/core';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';

@Component({
  selector: 'app-commentaire-edit-societe',
  templateUrl: './commentaire-edit-societe.component.html',
  styleUrls: ['./commentaire-edit-societe.component.css']
})
export class CommentaireEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private commentaireService: CommentaireService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private demandeService: DemandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedDemande = new DemandeVo();
    this.demandeService.findAll().subscribe((data) => this.demandes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCommentaire.dateCommentaire = DateUtils.toDate(this.selectedCommentaire.dateCommentaire);
    this.commentaireService.edit().subscribe(commentaire=>{
    const myIndex = this.commentaires.findIndex(e => e.id === this.selectedCommentaire.id);
    this.commentaires[myIndex] = this.selectedCommentaire;
    this.editCommentaireDialog = false;
    this.selectedCommentaire = new CommentaireVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editCommentaireDialog  = false;
}

// getters and setters

get commentaires(): Array<CommentaireVo> {
    return this.commentaireService.commentaires;
       }
set commentaires(value: Array<CommentaireVo>) {
        this.commentaireService.commentaires = value;
       }

 get selectedCommentaire(): CommentaireVo {
           return this.commentaireService.selectedCommentaire;
       }
    set selectedCommentaire(value: CommentaireVo) {
        this.commentaireService.selectedCommentaire = value;
       }

   get editCommentaireDialog(): boolean {
           return this.commentaireService.editCommentaireDialog;

       }
    set editCommentaireDialog(value: boolean) {
        this.commentaireService.editCommentaireDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
