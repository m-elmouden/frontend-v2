import {Component, OnInit} from '@angular/core';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';

@Component({
  selector: 'app-employe-edit-chercheur',
  templateUrl: './employe-edit-chercheur.component.html',
  styleUrls: ['./employe-edit-chercheur.component.css']
})
export class EmployeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private employeService: EmployeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private declarationCnssService: DeclarationCnssService
 ,       private typeEmployeService: TypeEmployeService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.employeService.edit().subscribe(employe=>{
    const myIndex = this.employes.findIndex(e => e.id === this.selectedEmploye.id);
    this.employes[myIndex] = this.selectedEmploye;
    this.editEmployeDialog = false;
    this.selectedEmploye = new EmployeVo();


    }, error => {
        console.log(error);
    });

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
              public async openCreatetypeEmploye(typeEmploye: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEmploye', 'add');
                       if(isPermistted){
         this.selectedTypeEmploye = new TypeEmployeVo();
        this.createTypeEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedeclarationCnss(declarationCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'add');
                       if(isPermistted){
         this.selectedDeclarationCnss = new DeclarationCnssVo();
        this.createDeclarationCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEmployeDialog  = false;
}

// getters and setters

get employes(): Array<EmployeVo> {
    return this.employeService.employes;
       }
set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }

 get selectedEmploye(): EmployeVo {
           return this.employeService.selectedEmploye;
       }
    set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }

   get editEmployeDialog(): boolean {
           return this.employeService.editEmployeDialog;

       }
    set editEmployeDialog(value: boolean) {
        this.employeService.editEmployeDialog = value;
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
       get selectedTypeEmploye(): TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
      set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }
       get typeEmployes(): Array<TypeEmployeVo> {
           return this.typeEmployeService.typeEmployes;
       }
       set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }
       get createTypeEmployeDialog(): boolean {
           return this.typeEmployeService.createTypeEmployeDialog;
       }
      set createTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.createTypeEmployeDialog= value;
       }
       get selectedDeclarationCnss(): DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss(): Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get createDeclarationCnssDialog(): boolean {
           return this.declarationCnssService.createDeclarationCnssDialog;
       }
      set createDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.createDeclarationCnssDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
