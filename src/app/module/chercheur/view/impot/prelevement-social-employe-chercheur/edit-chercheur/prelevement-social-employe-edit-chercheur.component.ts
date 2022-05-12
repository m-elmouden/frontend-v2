import {Component, OnInit} from '@angular/core';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';

@Component({
  selector: 'app-prelevement-social-employe-edit-chercheur',
  templateUrl: './prelevement-social-employe-edit-chercheur.component.html',
  styleUrls: ['./prelevement-social-employe-edit-chercheur.component.css']
})
export class PrelevementSocialEmployeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private prelevementSocialEmployeService: PrelevementSocialEmployeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private prelevementSocialService: PrelevementSocialService
 ,       private employeService: EmployeService
 ,       private declarationIrService: DeclarationIrService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.prelevementSocialEmployeService.edit().subscribe(prelevementSocialEmploye=>{
    const myIndex = this.prelevementSocialEmployes.findIndex(e => e.id === this.selectedPrelevementSocialEmploye.id);
    this.prelevementSocialEmployes[myIndex] = this.selectedPrelevementSocialEmploye;
    this.editPrelevementSocialEmployeDialog = false;
    this.selectedPrelevementSocialEmploye = new PrelevementSocialEmployeVo();


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
              public async openCreateprelevementSocial(prelevementSocial: string) {
                      const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'add');
                       if(isPermistted){
         this.selectedPrelevementSocial = new PrelevementSocialVo();
        this.createPrelevementSocialDialog = true;
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
    this.editPrelevementSocialEmployeDialog  = false;
}

// getters and setters

get prelevementSocialEmployes(): Array<PrelevementSocialEmployeVo> {
    return this.prelevementSocialEmployeService.prelevementSocialEmployes;
       }
set prelevementSocialEmployes(value: Array<PrelevementSocialEmployeVo>) {
        this.prelevementSocialEmployeService.prelevementSocialEmployes = value;
       }

 get selectedPrelevementSocialEmploye(): PrelevementSocialEmployeVo {
           return this.prelevementSocialEmployeService.selectedPrelevementSocialEmploye;
       }
    set selectedPrelevementSocialEmploye(value: PrelevementSocialEmployeVo) {
        this.prelevementSocialEmployeService.selectedPrelevementSocialEmploye = value;
       }

   get editPrelevementSocialEmployeDialog(): boolean {
           return this.prelevementSocialEmployeService.editPrelevementSocialEmployeDialog;

       }
    set editPrelevementSocialEmployeDialog(value: boolean) {
        this.prelevementSocialEmployeService.editPrelevementSocialEmployeDialog = value;
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
       get selectedPrelevementSocial(): PrelevementSocialVo {
           return this.prelevementSocialService.selectedPrelevementSocial;
       }
      set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
       }
       get prelevementSocials(): Array<PrelevementSocialVo> {
           return this.prelevementSocialService.prelevementSocials;
       }
       set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
       }
       get createPrelevementSocialDialog(): boolean {
           return this.prelevementSocialService.createPrelevementSocialDialog;
       }
      set createPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.createPrelevementSocialDialog= value;
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
