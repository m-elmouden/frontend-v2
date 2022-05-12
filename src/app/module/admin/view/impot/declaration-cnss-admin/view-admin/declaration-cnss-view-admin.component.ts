import {Component, OnInit} from '@angular/core';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';

@Component({
  selector: 'app-declaration-cnss-view-admin',
  templateUrl: './declaration-cnss-view-admin.component.html',
  styleUrls: ['./declaration-cnss-view-admin.component.css']
})
export class DeclarationCnssViewAdminComponent implements OnInit {

        selectedDeclarationCnssDetails: DeclarationCnssDetailVo = new DeclarationCnssDetailVo();
        declarationCnssDetailsListe: Array<DeclarationCnssDetailVo> = [];

        myTypeTauxCnsss: Array<TypeTauxCnssVo> = [];


constructor(private datePipe: DatePipe, private declarationCnssService: DeclarationCnssService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private employeService :EmployeService
    ,private typeTauxCnssService :TypeTauxCnssService
    ,private declarationCnssDetailService :DeclarationCnssDetailService
) {
}

// methods
ngOnInit(): void {
                this.selectedDeclarationCnssDetails.typeTauxCnssVo = new TypeTauxCnssVo();
                this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
    this.selectedEmploye = new EmployeVo();
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
}

hideViewDialog(){
    this.viewDeclarationCnssDialog  = false;
}

// getters and setters

get declarationCnsss(): Array<DeclarationCnssVo> {
    return this.declarationCnssService.declarationCnsss;
       }
set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }

 get selectedDeclarationCnss():DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
    set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }

   get viewDeclarationCnssDialog():boolean {
           return this.declarationCnssService.viewDeclarationCnssDialog;

       }
    set viewDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.viewDeclarationCnssDialog= value;
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
       get selectedTypeTauxCnss():TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
      set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }
       get typeTauxCnsss():Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnsss;
       }
       set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }
       get editTypeTauxCnssDialog():boolean {
           return this.typeTauxCnssService.editTypeTauxCnssDialog;
       }
      set editTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.editTypeTauxCnssDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
