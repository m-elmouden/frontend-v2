import {Component, OnInit} from '@angular/core';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';

@Component({
  selector: 'app-employe-view-chercheur',
  templateUrl: './employe-view-chercheur.component.html',
  styleUrls: ['./employe-view-chercheur.component.css']
})
export class EmployeViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private employeService: EmployeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
    ,private declarationCnssService :DeclarationCnssService
    ,private typeEmployeService :TypeEmployeService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeEmploye = new TypeEmployeVo();
    this.typeEmployeService.findAll().subscribe((data) => this.typeEmployes = data);
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedDeclarationCnss = new DeclarationCnssVo();
    this.declarationCnssService.findAll().subscribe((data) => this.declarationCnsss = data);
}

hideViewDialog(){
    this.viewEmployeDialog  = false;
}

// getters and setters

get employes(): Array<EmployeVo> {
    return this.employeService.employes;
       }
set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }

 get selectedEmploye():EmployeVo {
           return this.employeService.selectedEmploye;
       }
    set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }

   get viewEmployeDialog():boolean {
           return this.employeService.viewEmployeDialog;

       }
    set viewEmployeDialog(value: boolean) {
        this.employeService.viewEmployeDialog= value;
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
       get selectedTypeEmploye():TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
      set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }
       get typeEmployes():Array<TypeEmployeVo> {
           return this.typeEmployeService.typeEmployes;
       }
       set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }
       get editTypeEmployeDialog():boolean {
           return this.typeEmployeService.editTypeEmployeDialog;
       }
      set editTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.editTypeEmployeDialog= value;
       }
       get selectedDeclarationCnss():DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss():Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get editDeclarationCnssDialog():boolean {
           return this.declarationCnssService.editDeclarationCnssDialog;
       }
      set editDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.editDeclarationCnssDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
