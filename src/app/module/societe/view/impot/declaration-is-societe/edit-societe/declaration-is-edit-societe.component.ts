import {Component, OnInit} from '@angular/core';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';

@Component({
  selector: 'app-declaration-is-edit-societe',
  templateUrl: './declaration-is-edit-societe.component.html',
  styleUrls: ['./declaration-is-edit-societe.component.css']
})
export class DeclarationIsEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationIsService: DeclarationIsService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private etatDeclarationIsService: EtatDeclarationIsService
 ,       private tauxIsConfigService: TauxIsConfigService
 ,       private tauxIsService: TauxIsService
 ,       private paiementDeclarationIsService: PaiementDeclarationIsService
) {
}

// methods
ngOnInit(): void {
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedTauxIs = new TauxIsVo();
    this.tauxIsService.findAll().subscribe((data) => this.tauxIss = data);
    this.selectedTauxIsConfig = new TauxIsConfigVo();
    this.tauxIsConfigService.findAll().subscribe((data) => this.tauxIsConfigs = data);
    this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();
    this.etatDeclarationIsService.findAll().subscribe((data) => this.etatDeclarationIss = data);
    this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();
    this.paiementDeclarationIsService.findAll().subscribe((data) => this.paiementDeclarationIss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDeclarationIs.dateArchivage = DateUtils.toDate(this.selectedDeclarationIs.dateArchivage);
            this.selectedDeclarationIs.dateCreation = DateUtils.toDate(this.selectedDeclarationIs.dateCreation);
    this.declarationIsService.edit().subscribe(declarationIs=>{
    const myIndex = this.declarationIss.findIndex(e => e.id === this.selectedDeclarationIs.id);
    this.declarationIss[myIndex] = this.selectedDeclarationIs;
    this.editDeclarationIsDialog = false;
    this.selectedDeclarationIs = new DeclarationIsVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetauxIsConfig(tauxIsConfig: string) {
                      const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'add');
                       if(isPermistted){
         this.selectedTauxIsConfig = new TauxIsConfigVo();
        this.createTauxIsConfigDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatDeclarationIs(etatDeclarationIs: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDeclarationIs', 'add');
                       if(isPermistted){
         this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();
        this.createEtatDeclarationIsDialog = true;
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
              public async openCreatetauxIs(tauxIs: string) {
                      const isPermistted = await this.roleService.isPermitted('TauxIs', 'add');
                       if(isPermistted){
         this.selectedTauxIs = new TauxIsVo();
        this.createTauxIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepaiementDeclarationIs(paiementDeclarationIs: string) {
                      const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'add');
                       if(isPermistted){
         this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();
        this.createPaiementDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDeclarationIsDialog  = false;
}

// getters and setters

get declarationIss(): Array<DeclarationIsVo> {
    return this.declarationIsService.declarationIss;
       }
set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }

 get selectedDeclarationIs(): DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
    set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }

   get editDeclarationIsDialog(): boolean {
           return this.declarationIsService.editDeclarationIsDialog;

       }
    set editDeclarationIsDialog(value: boolean) {
        this.declarationIsService.editDeclarationIsDialog = value;
       }

       get selectedTauxIsConfig(): TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
      set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
       get tauxIsConfigs(): Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
       set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }
       get createTauxIsConfigDialog(): boolean {
           return this.tauxIsConfigService.createTauxIsConfigDialog;
       }
      set createTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.createTauxIsConfigDialog= value;
       }
       get selectedEtatDeclarationIs(): EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
      set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }
       get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
           return this.etatDeclarationIsService.etatDeclarationIss;
       }
       set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }
       get createEtatDeclarationIsDialog(): boolean {
           return this.etatDeclarationIsService.createEtatDeclarationIsDialog;
       }
      set createEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.createEtatDeclarationIsDialog= value;
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
       get selectedTauxIs(): TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
      set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }
       get tauxIss(): Array<TauxIsVo> {
           return this.tauxIsService.tauxIss;
       }
       set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }
       get createTauxIsDialog(): boolean {
           return this.tauxIsService.createTauxIsDialog;
       }
      set createTauxIsDialog(value: boolean) {
        this.tauxIsService.createTauxIsDialog= value;
       }
       get selectedPaiementDeclarationIs(): PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
      set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }
       get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
           return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
       set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }
       get createPaiementDeclarationIsDialog(): boolean {
           return this.paiementDeclarationIsService.createPaiementDeclarationIsDialog;
       }
      set createPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.createPaiementDeclarationIsDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
