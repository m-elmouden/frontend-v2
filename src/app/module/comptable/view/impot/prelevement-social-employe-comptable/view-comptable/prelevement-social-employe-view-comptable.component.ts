import {Component, OnInit} from '@angular/core';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';

@Component({
  selector: 'app-prelevement-social-employe-view-comptable',
  templateUrl: './prelevement-social-employe-view-comptable.component.html',
  styleUrls: ['./prelevement-social-employe-view-comptable.component.css']
})
export class PrelevementSocialEmployeViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private prelevementSocialEmployeService: PrelevementSocialEmployeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private prelevementSocialService :PrelevementSocialService
    ,private employeService :EmployeService
    ,private declarationIrService :DeclarationIrService
) {
}

// methods
ngOnInit(): void {
    this.selectedPrelevementSocial = new PrelevementSocialVo();
    this.prelevementSocialService.findAll().subscribe((data) => this.prelevementSocials = data);
    this.selectedEmploye = new EmployeVo();
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.selectedDeclarationIr = new DeclarationIrVo();
    this.declarationIrService.findAll().subscribe((data) => this.declarationIrs = data);
}

hideViewDialog(){
    this.viewPrelevementSocialEmployeDialog  = false;
}

// getters and setters

get prelevementSocialEmployes(): Array<PrelevementSocialEmployeVo> {
    return this.prelevementSocialEmployeService.prelevementSocialEmployes;
       }
set prelevementSocialEmployes(value: Array<PrelevementSocialEmployeVo>) {
        this.prelevementSocialEmployeService.prelevementSocialEmployes = value;
       }

 get selectedPrelevementSocialEmploye():PrelevementSocialEmployeVo {
           return this.prelevementSocialEmployeService.selectedPrelevementSocialEmploye;
       }
    set selectedPrelevementSocialEmploye(value: PrelevementSocialEmployeVo) {
        this.prelevementSocialEmployeService.selectedPrelevementSocialEmploye = value;
       }

   get viewPrelevementSocialEmployeDialog():boolean {
           return this.prelevementSocialEmployeService.viewPrelevementSocialEmployeDialog;

       }
    set viewPrelevementSocialEmployeDialog(value: boolean) {
        this.prelevementSocialEmployeService.viewPrelevementSocialEmployeDialog= value;
       }

       get selectedDeclarationIr():DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
      set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }
       get declarationIrs():Array<DeclarationIrVo> {
           return this.declarationIrService.declarationIrs;
       }
       set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }
       get editDeclarationIrDialog():boolean {
           return this.declarationIrService.editDeclarationIrDialog;
       }
      set editDeclarationIrDialog(value: boolean) {
        this.declarationIrService.editDeclarationIrDialog= value;
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
