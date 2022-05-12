import {Component, OnInit} from '@angular/core';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
import {TypeComptableService} from '../../../../../../controller/service/TypeComptable.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';

@Component({
  selector: 'app-comptable-view-societe',
  templateUrl: './comptable-view-societe.component.html',
  styleUrls: ['./comptable-view-societe.component.css']
})
export class ComptableViewSocieteComponent implements OnInit {

        selectedSocietes: SocieteVo = new SocieteVo();
        societesListe: Array<SocieteVo> = [];

        myPresidentSocietes: Array<PresidentSocieteVo> = [];
        myTypeSocietes: Array<TypeSocieteVo> = [];

        selectedDemandes: DemandeVo = new DemandeVo();
        demandesListe: Array<DemandeVo> = [];

        mySocietes: Array<SocieteVo> = [];
        myEtatDemandes: Array<EtatDemandeVo> = [];


constructor(private datePipe: DatePipe, private comptableService: ComptableService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private etatDemandeService :EtatDemandeService
    ,private presidentSocieteService :PresidentSocieteService
    ,private demandeService :DemandeService
    ,private typeComptableService :TypeComptableService
    ,private typeSocieteService :TypeSocieteService
) {
}

// methods
ngOnInit(): void {
                this.selectedSocietes.presidentSocieteVo = new PresidentSocieteVo();
                this.presidentSocieteService.findAll().subscribe((data) => this.presidentSocietes = data);
                this.selectedSocietes.typeSocieteVo = new TypeSocieteVo();
                this.typeSocieteService.findAll().subscribe((data) => this.typeSocietes = data);
                this.selectedDemandes.societeVo = new SocieteVo();
                this.societeService.findAll().subscribe((data) => this.societes = data);
                this.selectedDemandes.etatDemandeVo = new EtatDemandeVo();
                this.etatDemandeService.findAll().subscribe((data) => this.etatDemandes = data);
    this.selectedTypeComptable = new TypeComptableVo();
    this.typeComptableService.findAll().subscribe((data) => this.typeComptables = data);
}

hideViewDialog(){
    this.viewComptableDialog  = false;
}

// getters and setters

get comptables(): Array<ComptableVo> {
    return this.comptableService.comptables;
       }
set comptables(value: Array<ComptableVo>) {
        this.comptableService.comptables = value;
       }

 get selectedComptable():ComptableVo {
           return this.comptableService.selectedComptable;
       }
    set selectedComptable(value: ComptableVo) {
        this.comptableService.selectedComptable = value;
       }

   get viewComptableDialog():boolean {
           return this.comptableService.viewComptableDialog;

       }
    set viewComptableDialog(value: boolean) {
        this.comptableService.viewComptableDialog= value;
       }

       get selectedTypeSociete():TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
      set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }
       get typeSocietes():Array<TypeSocieteVo> {
           return this.typeSocieteService.typeSocietes;
       }
       set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }
       get editTypeSocieteDialog():boolean {
           return this.typeSocieteService.editTypeSocieteDialog;
       }
      set editTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.editTypeSocieteDialog= value;
       }
       get selectedTypeComptable():TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
      set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }
       get typeComptables():Array<TypeComptableVo> {
           return this.typeComptableService.typeComptables;
       }
       set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }
       get editTypeComptableDialog():boolean {
           return this.typeComptableService.editTypeComptableDialog;
       }
      set editTypeComptableDialog(value: boolean) {
        this.typeComptableService.editTypeComptableDialog= value;
       }
       get selectedSociete():SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes():Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get editSocieteDialog():boolean {
           return this.societeService.editSocieteDialog;
       }
      set editSocieteDialog(value: boolean) {
        this.societeService.editSocieteDialog= value;
       }
       get selectedPresidentSociete():PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
      set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }
       get presidentSocietes():Array<PresidentSocieteVo> {
           return this.presidentSocieteService.presidentSocietes;
       }
       set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }
       get editPresidentSocieteDialog():boolean {
           return this.presidentSocieteService.editPresidentSocieteDialog;
       }
      set editPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.editPresidentSocieteDialog= value;
       }
       get selectedEtatDemande():EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
      set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }
       get etatDemandes():Array<EtatDemandeVo> {
           return this.etatDemandeService.etatDemandes;
       }
       set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }
       get editEtatDemandeDialog():boolean {
           return this.etatDemandeService.editEtatDemandeDialog;
       }
      set editEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.editEtatDemandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
