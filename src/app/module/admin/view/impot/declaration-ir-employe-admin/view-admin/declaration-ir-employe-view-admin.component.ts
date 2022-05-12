import {Component, OnInit} from '@angular/core';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';

@Component({
  selector: 'app-declaration-ir-employe-view-admin',
  templateUrl: './declaration-ir-employe-view-admin.component.html',
  styleUrls: ['./declaration-ir-employe-view-admin.component.css']
})
export class DeclarationIrEmployeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationIrEmployeService: DeclarationIrEmployeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private tauxIrService :TauxIrService
    ,private declarationIrService :DeclarationIrService
    ,private employeService :EmployeService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationIr = new DeclarationIrVo();
    this.declarationIrService.findAll().subscribe((data) => this.declarationIrs = data);
    this.selectedEmploye = new EmployeVo();
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.selectedTauxIr = new TauxIrVo();
    this.tauxIrService.findAll().subscribe((data) => this.tauxIrs = data);
}

hideViewDialog(){
    this.viewDeclarationIrEmployeDialog  = false;
}

// getters and setters

get declarationIrEmployes(): Array<DeclarationIrEmployeVo> {
    return this.declarationIrEmployeService.declarationIrEmployes;
       }
set declarationIrEmployes(value: Array<DeclarationIrEmployeVo>) {
        this.declarationIrEmployeService.declarationIrEmployes = value;
       }

 get selectedDeclarationIrEmploye():DeclarationIrEmployeVo {
           return this.declarationIrEmployeService.selectedDeclarationIrEmploye;
       }
    set selectedDeclarationIrEmploye(value: DeclarationIrEmployeVo) {
        this.declarationIrEmployeService.selectedDeclarationIrEmploye = value;
       }

   get viewDeclarationIrEmployeDialog():boolean {
           return this.declarationIrEmployeService.viewDeclarationIrEmployeDialog;

       }
    set viewDeclarationIrEmployeDialog(value: boolean) {
        this.declarationIrEmployeService.viewDeclarationIrEmployeDialog= value;
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
