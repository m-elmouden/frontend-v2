import {Component, OnInit} from '@angular/core';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';

@Component({
  selector: 'app-declaration-ir-edit-admin',
  templateUrl: './declaration-ir-edit-admin.component.html',
  styleUrls: ['./declaration-ir-edit-admin.component.css']
})
export class DeclarationIrEditAdminComponent implements OnInit {

        selectedDeclarationIrEmployes: DeclarationIrEmployeVo = new DeclarationIrEmployeVo();
        declarationIrEmployesListe: Array<DeclarationIrEmployeVo> = [];

        myEmployes: Array<EmployeVo> = [];
        myTauxIrs: Array<TauxIrVo> = [];

        selectedPrelevementSocialEmployes: PrelevementSocialEmployeVo = new PrelevementSocialEmployeVo();
        prelevementSocialEmployesListe: Array<PrelevementSocialEmployeVo> = [];

        myPrelevementSocials: Array<PrelevementSocialVo> = [];


constructor(private datePipe: DatePipe, private declarationIrService: DeclarationIrService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private paiementDeclarationIrService: PaiementDeclarationIrService
 ,       private etatDeclarationIrService: EtatDeclarationIrService
 ,       private employeService: EmployeService
 ,       private declarationIrEmployeService: DeclarationIrEmployeService
 ,       private tauxIrService: TauxIrService
 ,       private prelevementSocialService: PrelevementSocialService
 ,       private prelevementSocialEmployeService: PrelevementSocialEmployeService
) {
}

// methods
ngOnInit(): void {
                this.selectedDeclarationIrEmployes.employeVo = new EmployeVo();
                this.employeService.findAll().subscribe((data) => this.employes = data);
                this.selectedDeclarationIrEmployes.tauxIrVo = new TauxIrVo();
                this.tauxIrService.findAll().subscribe((data) => this.tauxIrs = data);
                this.selectedPrelevementSocialEmployes.prelevementSocialVo = new PrelevementSocialVo();
                this.prelevementSocialService.findAll().subscribe((data) => this.prelevementSocials = data);
                this.selectedPrelevementSocialEmployes.employeVo = new EmployeVo();
                this.employeService.findAll().subscribe((data) => this.employes = data);
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();
    this.etatDeclarationIrService.findAll().subscribe((data) => this.etatDeclarationIrs = data);
    this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();
    this.paiementDeclarationIrService.findAll().subscribe((data) => this.paiementDeclarationIrs = data);
}
        addDeclarationIrEmployes() {
        if( this.selectedDeclarationIr.declarationIrEmployesVo == null ){
            this.selectedDeclarationIr.declarationIrEmployesVo = new Array<DeclarationIrEmployeVo>();
        }
        this.selectedDeclarationIr.declarationIrEmployesVo.push(this.selectedDeclarationIrEmployes);
        this.selectedDeclarationIrEmployes = new DeclarationIrEmployeVo();
        }

       deleteDeclarationIrEmployes(p: DeclarationIrEmployeVo) {
        this.selectedDeclarationIr.declarationIrEmployesVo.forEach((element, index) => {
            if (element === p) { this.selectedDeclarationIr.declarationIrEmployesVo.splice(index, 1); }
        });
    }
        addPrelevementSocialEmployes() {
        if( this.selectedDeclarationIr.prelevementSocialEmployesVo == null ){
            this.selectedDeclarationIr.prelevementSocialEmployesVo = new Array<PrelevementSocialEmployeVo>();
        }
        this.selectedDeclarationIr.prelevementSocialEmployesVo.push(this.selectedPrelevementSocialEmployes);
        this.selectedPrelevementSocialEmployes = new PrelevementSocialEmployeVo();
        }

       deletePrelevementSocialEmployes(p: PrelevementSocialEmployeVo) {
        this.selectedDeclarationIr.prelevementSocialEmployesVo.forEach((element, index) => {
            if (element === p) { this.selectedDeclarationIr.prelevementSocialEmployesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDeclarationIr.dateArchivage = DateUtils.toDate(this.selectedDeclarationIr.dateArchivage);
            this.selectedDeclarationIr.dateCreation = DateUtils.toDate(this.selectedDeclarationIr.dateCreation);
    this.declarationIrService.edit().subscribe(declarationIr=>{
    const myIndex = this.declarationIrs.findIndex(e => e.id === this.selectedDeclarationIr.id);
    this.declarationIrs[myIndex] = this.selectedDeclarationIr;
    this.editDeclarationIrDialog = false;
    this.selectedDeclarationIr = new DeclarationIrVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatDeclarationIr(etatDeclarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'add');
                       if(isPermistted){
         this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();
        this.createEtatDeclarationIrDialog = true;
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
              public async openCreatetauxIr(tauxIr: string) {
                      const isPermistted = await this.roleService.isPermitted('TauxIr', 'add');
                       if(isPermistted){
         this.selectedTauxIr = new TauxIrVo();
        this.createTauxIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepaiementDeclarationIr(paiementDeclarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'add');
                       if(isPermistted){
         this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();
        this.createPaiementDeclarationIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateemploye(employe: string) {
                      const isPermistted = await this.roleService.isPermitted('Employe', 'add');
                       if(isPermistted){
         this.selectedEmploye = new EmployeVo();
        this.createEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateprelevementSocial(prelevementSocial: string) {
                      const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'add');
                       if(isPermistted){
         this.selectedPrelevementSocial = new PrelevementSocialVo();
        this.createPrelevementSocialDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDeclarationIrDialog  = false;
}

// getters and setters

get declarationIrs(): Array<DeclarationIrVo> {
    return this.declarationIrService.declarationIrs;
       }
set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }

 get selectedDeclarationIr(): DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
    set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }

   get editDeclarationIrDialog(): boolean {
           return this.declarationIrService.editDeclarationIrDialog;

       }
    set editDeclarationIrDialog(value: boolean) {
        this.declarationIrService.editDeclarationIrDialog = value;
       }

       get selectedEtatDeclarationIr(): EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
      set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }
       get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
           return this.etatDeclarationIrService.etatDeclarationIrs;
       }
       set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }
       get createEtatDeclarationIrDialog(): boolean {
           return this.etatDeclarationIrService.createEtatDeclarationIrDialog;
       }
      set createEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.createEtatDeclarationIrDialog= value;
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
       get selectedTauxIr(): TauxIrVo {
           return this.tauxIrService.selectedTauxIr;
       }
      set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
       }
       get tauxIrs(): Array<TauxIrVo> {
           return this.tauxIrService.tauxIrs;
       }
       set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
       }
       get createTauxIrDialog(): boolean {
           return this.tauxIrService.createTauxIrDialog;
       }
      set createTauxIrDialog(value: boolean) {
        this.tauxIrService.createTauxIrDialog= value;
       }
       get selectedPaiementDeclarationIr(): PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
      set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }
       get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
           return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
       set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }
       get createPaiementDeclarationIrDialog(): boolean {
           return this.paiementDeclarationIrService.createPaiementDeclarationIrDialog;
       }
      set createPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.createPaiementDeclarationIrDialog= value;
       }
       get selectedEmploye(): EmployeVo {
           return this.employeService.selectedEmploye;
       }
      set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }
       get employes(): Array<EmployeVo> {
           return this.employeService.employes;
       }
       set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }
       get createEmployeDialog(): boolean {
           return this.employeService.createEmployeDialog;
       }
      set createEmployeDialog(value: boolean) {
        this.employeService.createEmployeDialog= value;
       }
       get selectedPrelevementSocial(): PrelevementSocialVo {
           return this.prelevementSocialService.selectedPrelevementSocial;
       }
      set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
       }
       get prelevementSocials(): Array<PrelevementSocialVo> {
           return this.prelevementSocialService.prelevementSocials;
       }
       set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
       }
       get createPrelevementSocialDialog(): boolean {
           return this.prelevementSocialService.createPrelevementSocialDialog;
       }
      set createPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.createPrelevementSocialDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
