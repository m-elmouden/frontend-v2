import {Component, OnInit} from '@angular/core';
import {CommentaireService} from '../../../../../../controller/service/Commentaire.service';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';

@Component({
  selector: 'app-commentaire-view-comptable',
  templateUrl: './commentaire-view-comptable.component.html',
  styleUrls: ['./commentaire-view-comptable.component.css']
})
export class CommentaireViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private commentaireService: CommentaireService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private demandeService :DemandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedDemande = new DemandeVo();
    this.demandeService.findAll().subscribe((data) => this.demandes = data);
}

hideViewDialog(){
    this.viewCommentaireDialog  = false;
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

   get viewCommentaireDialog():boolean {
           return this.commentaireService.viewCommentaireDialog;

       }
    set viewCommentaireDialog(value: boolean) {
        this.commentaireService.viewCommentaireDialog= value;
       }

       get selectedDemande():DemandeVo {
           return this.demandeService.selectedDemande;
       }
      set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }
       get demandes():Array<DemandeVo> {
           return this.demandeService.demandes;
       }
       set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }
       get editDemandeDialog():boolean {
           return this.demandeService.editDemandeDialog;
       }
      set editDemandeDialog(value: boolean) {
        this.demandeService.editDemandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
