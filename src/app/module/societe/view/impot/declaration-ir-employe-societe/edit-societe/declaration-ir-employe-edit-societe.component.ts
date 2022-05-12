import {Component, OnInit} from '@angular/core';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';

@Component({
  selector: 'app-declaration-ir-employe-edit-societe',
  templateUrl: './declaration-ir-employe-edit-societe.component.html',
  styleUrls: ['./declaration-ir-employe-edit-societe.component.css']
})
export class DeclarationIrEmployeEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationIrEmployeService: DeclarationIrEmployeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private tauxIrService: TauxIrService
 ,       private declarationIrService: DeclarationIrService
 ,       private employeService: EmployeService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.declarationIrEmployeService.edit().subscribe(declarationIrEmploye=>{
    const myIndex = this.declarationIrEmployes.findIndex(e => e.id === this.selectedDeclarationIrEmploye.id);
    this.declarationIrEmployes[myIndex] = this.selectedDeclarationIrEmploye;
    this.editDeclarationIrEmployeDialog = false;
    this.selectedDeclarationIrEmploye = new DeclarationIrEmployeVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedeclarationIr(declarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'add');
                       if(isPermistted){
         this.selectedDeclarationIr = new DeclarationIrVo();
        this.createDeclarationIrDialog = true;
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
// methods

hideEditDialog(){
    this.editDeclarationIrEmployeDialog  = false;
}

// getters and setters

get declarationIrEmployes(): Array<DeclarationIrEmployeVo> {
    return this.declarationIrEmployeService.declarationIrEmployes;
       }
set declarationIrEmployes(value: Array<DeclarationIrEmployeVo>) {
        this.declarationIrEmployeService.declarationIrEmployes = value;
       }

 get selectedDeclarationIrEmploye(): DeclarationIrEmployeVo {
           return this.declarationIrEmployeService.selectedDeclarationIrEmploye;
       }
    set selectedDeclarationIrEmploye(value: DeclarationIrEmployeVo) {
        this.declarationIrEmployeService.selectedDeclarationIrEmploye = value;
       }

   get editDeclarationIrEmployeDialog(): boolean {
           return this.declarationIrEmployeService.editDeclarationIrEmployeDialog;

       }
    set editDeclarationIrEmployeDialog(value: boolean) {
        this.declarationIrEmployeService.editDeclarationIrEmployeDialog = value;
       }

       get selectedDeclarationIr(): DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
      set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }
       get declarationIrs(): Array<DeclarationIrVo> {
           return this.declarationIrService.declarationIrs;
       }
       set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }
       get createDeclarationIrDialog(): boolean {
           return this.declarationIrService.createDeclarationIrDialog;
       }
      set createDeclarationIrDialog(value: boolean) {
        this.declarationIrService.createDeclarationIrDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
