import {Component, OnInit} from '@angular/core';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-declaration-cnss-edit-societe',
  templateUrl: './declaration-cnss-edit-societe.component.html',
  styleUrls: ['./declaration-cnss-edit-societe.component.css']
})
export class DeclarationCnssEditSocieteComponent implements OnInit {

        selectedDeclarationCnssDetails: DeclarationCnssDetailVo = new DeclarationCnssDetailVo();
        declarationCnssDetailsListe: Array<DeclarationCnssDetailVo> = [];

        myTypeTauxCnsss: Array<TypeTauxCnssVo> = [];


constructor(private datePipe: DatePipe, private declarationCnssService: DeclarationCnssService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private employeService: EmployeService
 ,       private typeTauxCnssService: TypeTauxCnssService
 ,       private declarationCnssDetailService: DeclarationCnssDetailService
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
        addDeclarationCnssDetails() {
        if( this.selectedDeclarationCnss.declarationCnssDetailsVo == null ){
            this.selectedDeclarationCnss.declarationCnssDetailsVo = new Array<DeclarationCnssDetailVo>();
        }
        this.selectedDeclarationCnss.declarationCnssDetailsVo.push(this.selectedDeclarationCnssDetails);
        this.selectedDeclarationCnssDetails = new DeclarationCnssDetailVo();
        }

       deleteDeclarationCnssDetails(p: DeclarationCnssDetailVo) {
        this.selectedDeclarationCnss.declarationCnssDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedDeclarationCnss.declarationCnssDetailsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDeclarationCnss.dateArchivage = DateUtils.toDate(this.selectedDeclarationCnss.dateArchivage);
            this.selectedDeclarationCnss.dateCreation = DateUtils.toDate(this.selectedDeclarationCnss.dateCreation);
    this.declarationCnssService.edit().subscribe(declarationCnss=>{
    const myIndex = this.declarationCnsss.findIndex(e => e.id === this.selectedDeclarationCnss.id);
    this.declarationCnsss[myIndex] = this.selectedDeclarationCnss;
    this.editDeclarationCnssDialog = false;
    this.selectedDeclarationCnss = new DeclarationCnssVo();


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
              public async openCreatetypeTauxCnss(typeTauxCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'add');
                       if(isPermistted){
         this.selectedTypeTauxCnss = new TypeTauxCnssVo();
        this.createTypeTauxCnssDialog = true;
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
    this.editDeclarationCnssDialog  = false;
}

// getters and setters

get declarationCnsss(): Array<DeclarationCnssVo> {
    return this.declarationCnssService.declarationCnsss;
       }
set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }

 get selectedDeclarationCnss(): DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
    set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }

   get editDeclarationCnssDialog(): boolean {
           return this.declarationCnssService.editDeclarationCnssDialog;

       }
    set editDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.editDeclarationCnssDialog = value;
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
       get selectedTypeTauxCnss(): TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
      set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }
       get typeTauxCnsss(): Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnsss;
       }
       set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }
       get createTypeTauxCnssDialog(): boolean {
           return this.typeTauxCnssService.createTypeTauxCnssDialog;
       }
      set createTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.createTypeTauxCnssDialog= value;
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
