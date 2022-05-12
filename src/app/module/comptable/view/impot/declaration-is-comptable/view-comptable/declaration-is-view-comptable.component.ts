import {Component, OnInit} from '@angular/core';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-declaration-is-view-comptable',
  templateUrl: './declaration-is-view-comptable.component.html',
  styleUrls: ['./declaration-is-view-comptable.component.css']
})
export class DeclarationIsViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationIsService: DeclarationIsService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private etatDeclarationIsService :EtatDeclarationIsService
    ,private tauxIsConfigService :TauxIsConfigService
    ,private tauxIsService :TauxIsService
    ,private paiementDeclarationIsService :PaiementDeclarationIsService
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

hideViewDialog(){
    this.viewDeclarationIsDialog  = false;
}

// getters and setters

get declarationIss(): Array<DeclarationIsVo> {
    return this.declarationIsService.declarationIss;
       }
set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }

 get selectedDeclarationIs():DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
    set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }

   get viewDeclarationIsDialog():boolean {
           return this.declarationIsService.viewDeclarationIsDialog;

       }
    set viewDeclarationIsDialog(value: boolean) {
        this.declarationIsService.viewDeclarationIsDialog= value;
       }

       get selectedTauxIsConfig():TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
      set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
       get tauxIsConfigs():Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
       set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }
       get editTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.editTauxIsConfigDialog;
       }
      set editTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.editTauxIsConfigDialog= value;
       }
       get selectedEtatDeclarationIs():EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
      set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }
       get etatDeclarationIss():Array<EtatDeclarationIsVo> {
           return this.etatDeclarationIsService.etatDeclarationIss;
       }
       set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }
       get editEtatDeclarationIsDialog():boolean {
           return this.etatDeclarationIsService.editEtatDeclarationIsDialog;
       }
      set editEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.editEtatDeclarationIsDialog= value;
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
       get selectedTauxIs():TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
      set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }
       get tauxIss():Array<TauxIsVo> {
           return this.tauxIsService.tauxIss;
       }
       set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }
       get editTauxIsDialog():boolean {
           return this.tauxIsService.editTauxIsDialog;
       }
      set editTauxIsDialog(value: boolean) {
        this.tauxIsService.editTauxIsDialog= value;
       }
       get selectedPaiementDeclarationIs():PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
      set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }
       get paiementDeclarationIss():Array<PaiementDeclarationIsVo> {
           return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
       set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }
       get editPaiementDeclarationIsDialog():boolean {
           return this.paiementDeclarationIsService.editPaiementDeclarationIsDialog;
       }
      set editPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.editPaiementDeclarationIsDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
