import {Component, OnInit} from '@angular/core';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-comptable-edit-comptable',
  templateUrl: './comptable-edit-comptable.component.html',
  styleUrls: ['./comptable-edit-comptable.component.css']
})
export class ComptableEditComptableComponent implements OnInit {

        selectedSocietes: SocieteVo = new SocieteVo();
        societesListe: Array<SocieteVo> = [];

        myPresidentSocietes: Array<PresidentSocieteVo> = [];
        myTypeSocietes: Array<TypeSocieteVo> = [];

        selectedDemandes: DemandeVo = new DemandeVo();
        demandesListe: Array<DemandeVo> = [];

        mySocietes: Array<SocieteVo> = [];
        myEtatDemandes: Array<EtatDemandeVo> = [];


constructor(private datePipe: DatePipe, private comptableService: ComptableService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private etatDemandeService: EtatDemandeService
 ,       private presidentSocieteService: PresidentSocieteService
 ,       private demandeService: DemandeService
 ,       private typeComptableService: TypeComptableService
 ,       private typeSocieteService: TypeSocieteService
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
        addSocietes() {
        if( this.selectedComptable.societesVo == null ){
            this.selectedComptable.societesVo = new Array<SocieteVo>();
        }
        this.selectedComptable.societesVo.push(this.selectedSocietes);
        this.selectedSocietes = new SocieteVo();
        }

       deleteSocietes(p: SocieteVo) {
        this.selectedComptable.societesVo.forEach((element, index) => {
            if (element === p) { this.selectedComptable.societesVo.splice(index, 1); }
        });
    }
        addDemandes() {
        if( this.selectedComptable.demandesVo == null ){
            this.selectedComptable.demandesVo = new Array<DemandeVo>();
        }
        this.selectedComptable.demandesVo.push(this.selectedDemandes);
        this.selectedDemandes = new DemandeVo();
        }

       deleteDemandes(p: DemandeVo) {
        this.selectedComptable.demandesVo.forEach((element, index) => {
            if (element === p) { this.selectedComptable.demandesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedComptable.createdAt = DateUtils.toDate(this.selectedComptable.createdAt);
            this.selectedComptable.updatedAt = DateUtils.toDate(this.selectedComptable.updatedAt);
    this.comptableService.edit().subscribe(comptable=>{
    const myIndex = this.comptables.findIndex(e => e.id === this.selectedComptable.id);
    this.comptables[myIndex] = this.selectedComptable;
    this.editComptableDialog = false;
    this.selectedComptable = new ComptableVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeSociete(typeSociete: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSociete', 'add');
                       if(isPermistted){
         this.selectedTypeSociete = new TypeSocieteVo();
        this.createTypeSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeComptable(typeComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeComptable', 'add');
                       if(isPermistted){
         this.selectedTypeComptable = new TypeComptableVo();
        this.createTypeComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
              public async openCreatepresidentSociete(presidentSociete: string) {
                      const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'add');
                       if(isPermistted){
         this.selectedPresidentSociete = new PresidentSocieteVo();
        this.createPresidentSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatDemande(etatDemande: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDemande', 'add');
                       if(isPermistted){
         this.selectedEtatDemande = new EtatDemandeVo();
        this.createEtatDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editComptableDialog  = false;
}

// getters and setters

get comptables(): Array<ComptableVo> {
    return this.comptableService.comptables;
       }
set comptables(value: Array<ComptableVo>) {
        this.comptableService.comptables = value;
       }

 get selectedComptable(): ComptableVo {
           return this.comptableService.selectedComptable;
       }
    set selectedComptable(value: ComptableVo) {
        this.comptableService.selectedComptable = value;
       }

   get editComptableDialog(): boolean {
           return this.comptableService.editComptableDialog;

       }
    set editComptableDialog(value: boolean) {
        this.comptableService.editComptableDialog = value;
       }

       get selectedTypeSociete(): TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
      set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }
       get typeSocietes(): Array<TypeSocieteVo> {
           return this.typeSocieteService.typeSocietes;
       }
       set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }
       get createTypeSocieteDialog(): boolean {
           return this.typeSocieteService.createTypeSocieteDialog;
       }
      set createTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.createTypeSocieteDialog= value;
       }
       get selectedTypeComptable(): TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
      set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }
       get typeComptables(): Array<TypeComptableVo> {
           return this.typeComptableService.typeComptables;
       }
       set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }
       get createTypeComptableDialog(): boolean {
           return this.typeComptableService.createTypeComptableDialog;
       }
      set createTypeComptableDialog(value: boolean) {
        this.typeComptableService.createTypeComptableDialog= value;
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
       get selectedPresidentSociete(): PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
      set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }
       get presidentSocietes(): Array<PresidentSocieteVo> {
           return this.presidentSocieteService.presidentSocietes;
       }
       set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }
       get createPresidentSocieteDialog(): boolean {
           return this.presidentSocieteService.createPresidentSocieteDialog;
       }
      set createPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.createPresidentSocieteDialog= value;
       }
       get selectedEtatDemande(): EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
      set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }
       get etatDemandes(): Array<EtatDemandeVo> {
           return this.etatDemandeService.etatDemandes;
       }
       set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }
       get createEtatDemandeDialog(): boolean {
           return this.etatDemandeService.createEtatDemandeDialog;
       }
      set createEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.createEtatDemandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
