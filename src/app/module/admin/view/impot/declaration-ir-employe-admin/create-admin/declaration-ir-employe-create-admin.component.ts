import {Component, OnInit, Input} from '@angular/core';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
@Component({
  selector: 'app-declaration-ir-employe-create-admin',
  templateUrl: './declaration-ir-employe-create-admin.component.html',
  styleUrls: ['./declaration-ir-employe-create-admin.component.css']
})
export class DeclarationIrEmployeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDeclarationIrEmployeSalaireBase = true;

    _validDeclarationIrRefrerence = true;
    _validDeclarationIrAnnee = true;
    _validDeclarationIrMois = true;
    _validEmployeCin = true;
    _validEmployeNom = true;
    _validEmployePrenom = true;
    _validEmployeTotalSalaireNet = true;
    _validEmployeNombreFamille = true;



constructor(private datePipe: DatePipe, private declarationIrEmployeService: DeclarationIrEmployeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationIrService :DeclarationIrService
,       private tauxIrService :TauxIrService
,       private employeService :EmployeService
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




private setValidation(value : boolean){
    this.validDeclarationIrEmployeSalaireBase = value;
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
     this.declarationIrEmployeService.save().subscribe(declarationIrEmploye=>{
       this.declarationIrEmployes.push({...declarationIrEmploye});
       this.createDeclarationIrEmployeDialog = false;
       this.submitted = false;
       this.selectedDeclarationIrEmploye = new DeclarationIrEmployeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDeclarationIrEmployeSalaireBase();

    }

private validateDeclarationIrEmployeSalaireBase(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIrEmploye.salaireBase)) {
            this.errorMessages.push('Salaire base non valide');
            this.validDeclarationIrEmployeSalaireBase = false;
        } else {
            this.validDeclarationIrEmployeSalaireBase = true;
        }
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

hideCreateDialog(){
    this.createDeclarationIrEmployeDialog  = false;
    this.setValidation(true);
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

   get createDeclarationIrEmployeDialog(): boolean {
           return this.declarationIrEmployeService.createDeclarationIrEmployeDialog;

       }
    set createDeclarationIrEmployeDialog(value: boolean) {
        this.declarationIrEmployeService.createDeclarationIrEmployeDialog= value;
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

    get validDeclarationIrEmployeSalaireBase(): boolean {
    return this._validDeclarationIrEmployeSalaireBase;
    }

    set validDeclarationIrEmployeSalaireBase(value: boolean) {
    this._validDeclarationIrEmployeSalaireBase = value;
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

}
