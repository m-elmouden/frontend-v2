import {Component, OnInit} from '@angular/core';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';

@Component({
  selector: 'app-demande-piece-jointe-view-societe',
  templateUrl: './demande-piece-jointe-view-societe.component.html',
  styleUrls: ['./demande-piece-jointe-view-societe.component.css']
})
export class DemandePieceJointeViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private demandePieceJointeService: DemandePieceJointeService
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
    this.viewDemandePieceJointeDialog  = false;
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

   get viewDemandePieceJointeDialog():boolean {
           return this.demandePieceJointeService.viewDemandePieceJointeDialog;

       }
    set viewDemandePieceJointeDialog(value: boolean) {
        this.demandePieceJointeService.viewDemandePieceJointeDialog= value;
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
