import {Component, OnInit} from '@angular/core';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-declaration-ir-view-comptable',
  templateUrl: './declaration-ir-view-comptable.component.html',
  styleUrls: ['./declaration-ir-view-comptable.component.css']
})
export class DeclarationIrViewComptableComponent implements OnInit {

        selectedDeclarationIrEmployes: DeclarationIrEmployeVo = new DeclarationIrEmployeVo();
        declarationIrEmployesListe: Array<DeclarationIrEmployeVo> = [];

        myEmployes: Array<EmployeVo> = [];
        myTauxIrs: Array<TauxIrVo> = [];

        selectedPrelevementSocialEmployes: PrelevementSocialEmployeVo = new PrelevementSocialEmployeVo();
        prelevementSocialEmployesListe: Array<PrelevementSocialEmployeVo> = [];

        myPrelevementSocials: Array<PrelevementSocialVo> = [];


constructor(private datePipe: DatePipe, private declarationIrService: DeclarationIrService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private paiementDeclarationIrService :PaiementDeclarationIrService
    ,private etatDeclarationIrService :EtatDeclarationIrService
    ,private employeService :EmployeService
    ,private declarationIrEmployeService :DeclarationIrEmployeService
    ,private tauxIrService :TauxIrService
    ,private prelevementSocialService :PrelevementSocialService
    ,private prelevementSocialEmployeService :PrelevementSocialEmployeService
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

hideViewDialog(){
    this.viewDeclarationIrDialog  = false;
}

// getters and setters

get declarationIrs(): Array<DeclarationIrVo> {
    return this.declarationIrService.declarationIrs;
       }
set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }

 get selectedDeclarationIr():DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
    set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }

   get viewDeclarationIrDialog():boolean {
           return this.declarationIrService.viewDeclarationIrDialog;

       }
    set viewDeclarationIrDialog(value: boolean) {
        this.declarationIrService.viewDeclarationIrDialog= value;
       }

       get selectedEtatDeclarationIr():EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
      set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }
       get etatDeclarationIrs():Array<EtatDeclarationIrVo> {
           return this.etatDeclarationIrService.etatDeclarationIrs;
       }
       set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }
       get editEtatDeclarationIrDialog():boolean {
           return this.etatDeclarationIrService.editEtatDeclarationIrDialog;
       }
      set editEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.editEtatDeclarationIrDialog= value;
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
       get selectedTauxIr():TauxIrVo {
           return this.tauxIrService.selectedTauxIr;
       }
      set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
       }
       get tauxIrs():Array<TauxIrVo> {
           return this.tauxIrService.tauxIrs;
       }
       set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
       }
       get editTauxIrDialog():boolean {
           return this.tauxIrService.editTauxIrDialog;
       }
      set editTauxIrDialog(value: boolean) {
        this.tauxIrService.editTauxIrDialog= value;
       }
       get selectedPaiementDeclarationIr():PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
      set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }
       get paiementDeclarationIrs():Array<PaiementDeclarationIrVo> {
           return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
       set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }
       get editPaiementDeclarationIrDialog():boolean {
           return this.paiementDeclarationIrService.editPaiementDeclarationIrDialog;
       }
      set editPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.editPaiementDeclarationIrDialog= value;
       }
       get selectedEmploye():EmployeVo {
           return this.employeService.selectedEmploye;
       }
      set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }
       get employes():Array<EmployeVo> {
           return this.employeService.employes;
       }
       set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }
       get editEmployeDialog():boolean {
           return this.employeService.editEmployeDialog;
       }
      set editEmployeDialog(value: boolean) {
        this.employeService.editEmployeDialog= value;
       }
       get selectedPrelevementSocial():PrelevementSocialVo {
           return this.prelevementSocialService.selectedPrelevementSocial;
       }
      set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
       }
       get prelevementSocials():Array<PrelevementSocialVo> {
           return this.prelevementSocialService.prelevementSocials;
       }
       set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
       }
       get editPrelevementSocialDialog():boolean {
           return this.prelevementSocialService.editPrelevementSocialDialog;
       }
      set editPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.editPrelevementSocialDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
