import {Component, OnInit} from '@angular/core';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';

@Component({
  selector: 'app-declaration-tva-view-comptable',
  templateUrl: './declaration-tva-view-comptable.component.html',
  styleUrls: ['./declaration-tva-view-comptable.component.css']
})
export class DeclarationTvaViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationTvaService: DeclarationTvaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private paiementDeclarationTvaService :PaiementDeclarationTvaService
    ,private etatDeclarationTvaService :EtatDeclarationTvaService
    ,private typeDeclarationTvaService :TypeDeclarationTvaService
) {
}

// methods
ngOnInit(): void {
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();
    this.typeDeclarationTvaService.findAll().subscribe((data) => this.typeDeclarationTvas = data);
    this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();
    this.etatDeclarationTvaService.findAll().subscribe((data) => this.etatDeclarationTvas = data);
    this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();
    this.paiementDeclarationTvaService.findAll().subscribe((data) => this.paiementDeclarationTvas = data);
}

hideViewDialog(){
    this.viewDeclarationTvaDialog  = false;
}

// getters and setters

get declarationTvas(): Array<DeclarationTvaVo> {
    return this.declarationTvaService.declarationTvas;
       }
set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }

 get selectedDeclarationTva():DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
    set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }

   get viewDeclarationTvaDialog():boolean {
           return this.declarationTvaService.viewDeclarationTvaDialog;

       }
    set viewDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.viewDeclarationTvaDialog= value;
       }

       get selectedEtatDeclarationTva():EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
      set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }
       get etatDeclarationTvas():Array<EtatDeclarationTvaVo> {
           return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
       set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }
       get editEtatDeclarationTvaDialog():boolean {
           return this.etatDeclarationTvaService.editEtatDeclarationTvaDialog;
       }
      set editEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.editEtatDeclarationTvaDialog= value;
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
       get selectedPaiementDeclarationTva():PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
      set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }
       get paiementDeclarationTvas():Array<PaiementDeclarationTvaVo> {
           return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
       set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }
       get editPaiementDeclarationTvaDialog():boolean {
           return this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog;
       }
      set editPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog= value;
       }
       get selectedTypeDeclarationTva():TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
      set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }
       get typeDeclarationTvas():Array<TypeDeclarationTvaVo> {
           return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
       set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }
       get editTypeDeclarationTvaDialog():boolean {
           return this.typeDeclarationTvaService.editTypeDeclarationTvaDialog;
       }
      set editTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.editTypeDeclarationTvaDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
