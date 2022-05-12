import {Component, OnInit, Input} from '@angular/core';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
@Component({
  selector: 'app-prelevement-social-employe-create-admin',
  templateUrl: './prelevement-social-employe-create-admin.component.html',
  styleUrls: ['./prelevement-social-employe-create-admin.component.css']
})
export class PrelevementSocialEmployeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPrelevementSocialLibelle = true;
    _validPrelevementSocialPourcentage = true;
    _validPrelevementSocialDateMax = true;
    _validPrelevementSocialDateMin = true;
    _validEmployeCin = true;
    _validEmployeNom = true;
    _validEmployePrenom = true;
    _validEmployeTotalSalaireNet = true;
    _validEmployeNombreFamille = true;
    _validDeclarationIrRefrerence = true;
    _validDeclarationIrAnnee = true;
    _validDeclarationIrMois = true;



constructor(private datePipe: DatePipe, private prelevementSocialEmployeService: PrelevementSocialEmployeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationIrService :DeclarationIrService
,       private employeService :EmployeService
,       private prelevementSocialService :PrelevementSocialService
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




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.prelevementSocialEmployeService.save().subscribe(prelevementSocialEmploye=>{
       this.prelevementSocialEmployes.push({...prelevementSocialEmploye});
       this.createPrelevementSocialEmployeDialog = false;
       this.submitted = false;
       this.selectedPrelevementSocialEmploye = new PrelevementSocialEmployeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }










//openPopup
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

hideCreateDialog(){
    this.createPrelevementSocialEmployeDialog  = false;
    this.setValidation(true);
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

   get createPrelevementSocialEmployeDialog(): boolean {
           return this.prelevementSocialEmployeService.createPrelevementSocialEmployeDialog;

       }
    set createPrelevementSocialEmployeDialog(value: boolean) {
        this.prelevementSocialEmployeService.createPrelevementSocialEmployeDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validPrelevementSocialLibelle(): boolean {
    return this._validPrelevementSocialLibelle;
    }

    set validPrelevementSocialLibelle(value: boolean) {
    this._validPrelevementSocialLibelle = value;
    }
    get validPrelevementSocialPourcentage(): boolean {
    return this._validPrelevementSocialPourcentage;
    }

    set validPrelevementSocialPourcentage(value: boolean) {
    this._validPrelevementSocialPourcentage = value;
    }
    get validPrelevementSocialDateMax(): boolean {
    return this._validPrelevementSocialDateMax;
    }

    set validPrelevementSocialDateMax(value: boolean) {
    this._validPrelevementSocialDateMax = value;
    }
    get validPrelevementSocialDateMin(): boolean {
    return this._validPrelevementSocialDateMin;
    }

    set validPrelevementSocialDateMin(value: boolean) {
    this._validPrelevementSocialDateMin = value;
    }
    get validEmployeCin(): boolean {
    return this._validEmployeCin;
    }

    set validEmployeCin(value: boolean) {
    this._validEmployeCin = value;
    }
    get validEmployeNom(): boolean {
    return this._validEmployeNom;
    }

    set validEmployeNom(value: boolean) {
    this._validEmployeNom = value;
    }
    get validEmployePrenom(): boolean {
    return this._validEmployePrenom;
    }

    set validEmployePrenom(value: boolean) {
    this._validEmployePrenom = value;
    }
    get validEmployeTotalSalaireNet(): boolean {
    return this._validEmployeTotalSalaireNet;
    }

    set validEmployeTotalSalaireNet(value: boolean) {
    this._validEmployeTotalSalaireNet = value;
    }
    get validEmployeNombreFamille(): boolean {
    return this._validEmployeNombreFamille;
    }

    set validEmployeNombreFamille(value: boolean) {
    this._validEmployeNombreFamille = value;
    }
    get validDeclarationIrRefrerence(): boolean {
    return this._validDeclarationIrRefrerence;
    }

    set validDeclarationIrRefrerence(value: boolean) {
    this._validDeclarationIrRefrerence = value;
    }
    get validDeclarationIrAnnee(): boolean {
    return this._validDeclarationIrAnnee;
    }

    set validDeclarationIrAnnee(value: boolean) {
    this._validDeclarationIrAnnee = value;
    }
    get validDeclarationIrMois(): boolean {
    return this._validDeclarationIrMois;
    }

    set validDeclarationIrMois(value: boolean) {
    this._validDeclarationIrMois = value;
    }

}
