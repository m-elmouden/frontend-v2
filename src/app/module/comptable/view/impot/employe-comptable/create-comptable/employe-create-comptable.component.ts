import {Component, OnInit, Input} from '@angular/core';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
@Component({
  selector: 'app-employe-create-comptable',
  templateUrl: './employe-create-comptable.component.html',
  styleUrls: ['./employe-create-comptable.component.css']
})
export class EmployeCreateComptableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEmployeCin = true;
   _validEmployeNom = true;
   _validEmployePrenom = true;
   _validEmployeTotalSalaireNet = true;
   _validEmployeNombreFamille = true;

    _validTypeEmployeCode = true;
    _validTypeEmployeLibelle = true;
    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validDeclarationCnssRef = true;
    _validDeclarationCnssEmploye = true;
    _validDeclarationCnssSalaireNet = true;
    _validDeclarationCnssSalaireBrut = true;
    _validDeclarationCnssSalaireImposable = true;
    _validDeclarationCnssMontantTotal = true;
    _validDeclarationCnssDeclarationCnssDetails = true;
    _validDeclarationCnssSociete = true;



constructor(private datePipe: DatePipe, private employeService: EmployeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationCnssService :DeclarationCnssService
,       private societeService :SocieteService
,       private typeEmployeService :TypeEmployeService
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




private setValidation(value : boolean){
    this.validEmployeCin = value;
    this.validEmployeNom = value;
    this.validEmployePrenom = value;
    this.validEmployeTotalSalaireNet = value;
    this.validEmployeNombreFamille = value;
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
     this.employeService.save().subscribe(employe=>{
       this.employes.push({...employe});
       this.createEmployeDialog = false;
       this.submitted = false;
       this.selectedEmploye = new EmployeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEmployeCin();
this.validateEmployeNom();
this.validateEmployePrenom();
this.validateEmployeTotalSalaireNet();
this.validateEmployeNombreFamille();

    }

private validateEmployeCin(){
        if (this.stringUtilService.isEmpty(this.selectedEmploye.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validEmployeCin = false;
        } else {
            this.validEmployeCin = true;
        }
    }
private validateEmployeNom(){
        if (this.stringUtilService.isEmpty(this.selectedEmploye.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validEmployeNom = false;
        } else {
            this.validEmployeNom = true;
        }
    }
private validateEmployePrenom(){
        if (this.stringUtilService.isEmpty(this.selectedEmploye.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validEmployePrenom = false;
        } else {
            this.validEmployePrenom = true;
        }
    }
private validateEmployeTotalSalaireNet(){
        if (this.stringUtilService.isEmpty(this.selectedEmploye.totalSalaireNet)) {
            this.errorMessages.push('Total salaire net non valide');
            this.validEmployeTotalSalaireNet = false;
        } else {
            this.validEmployeTotalSalaireNet = true;
        }
    }
private validateEmployeNombreFamille(){
        if (this.stringUtilService.isEmpty(this.selectedEmploye.nombreFamille)) {
            this.errorMessages.push('Nombre famille non valide');
            this.validEmployeNombreFamille = false;
        } else {
            this.validEmployeNombreFamille = true;
        }
    }












//openPopup
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

hideCreateDialog(){
    this.createEmployeDialog  = false;
    this.setValidation(true);
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

   get createEmployeDialog(): boolean {
           return this.employeService.createEmployeDialog;

       }
    set createEmployeDialog(value: boolean) {
        this.employeService.createEmployeDialog= value;
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

    get validTypeEmployeCode(): boolean {
    return this._validTypeEmployeCode;
    }

    set validTypeEmployeCode(value: boolean) {
    this._validTypeEmployeCode = value;
    }
    get validTypeEmployeLibelle(): boolean {
    return this._validTypeEmployeLibelle;
    }

    set validTypeEmployeLibelle(value: boolean) {
    this._validTypeEmployeLibelle = value;
    }
    get validSocieteIce(): boolean {
    return this._validSocieteIce;
    }

    set validSocieteIce(value: boolean) {
    this._validSocieteIce = value;
    }
    get validSocieteRaisonSociale(): boolean {
    return this._validSocieteRaisonSociale;
    }

    set validSocieteRaisonSociale(value: boolean) {
    this._validSocieteRaisonSociale = value;
    }
    get validSocieteDateCreation(): boolean {
    return this._validSocieteDateCreation;
    }

    set validSocieteDateCreation(value: boolean) {
    this._validSocieteDateCreation = value;
    }
    get validSocieteAge(): boolean {
    return this._validSocieteAge;
    }

    set validSocieteAge(value: boolean) {
    this._validSocieteAge = value;
    }
    get validSocietePresidentSociete(): boolean {
    return this._validSocietePresidentSociete;
    }

    set validSocietePresidentSociete(value: boolean) {
    this._validSocietePresidentSociete = value;
    }
    get validDeclarationCnssRef(): boolean {
    return this._validDeclarationCnssRef;
    }

    set validDeclarationCnssRef(value: boolean) {
    this._validDeclarationCnssRef = value;
    }
    get validDeclarationCnssEmploye(): boolean {
    return this._validDeclarationCnssEmploye;
    }

    set validDeclarationCnssEmploye(value: boolean) {
    this._validDeclarationCnssEmploye = value;
    }
    get validDeclarationCnssSalaireNet(): boolean {
    return this._validDeclarationCnssSalaireNet;
    }

    set validDeclarationCnssSalaireNet(value: boolean) {
    this._validDeclarationCnssSalaireNet = value;
    }
    get validDeclarationCnssSalaireBrut(): boolean {
    return this._validDeclarationCnssSalaireBrut;
    }

    set validDeclarationCnssSalaireBrut(value: boolean) {
    this._validDeclarationCnssSalaireBrut = value;
    }
    get validDeclarationCnssSalaireImposable(): boolean {
    return this._validDeclarationCnssSalaireImposable;
    }

    set validDeclarationCnssSalaireImposable(value: boolean) {
    this._validDeclarationCnssSalaireImposable = value;
    }
    get validDeclarationCnssMontantTotal(): boolean {
    return this._validDeclarationCnssMontantTotal;
    }

    set validDeclarationCnssMontantTotal(value: boolean) {
    this._validDeclarationCnssMontantTotal = value;
    }
    get validDeclarationCnssDeclarationCnssDetails(): boolean {
    return this._validDeclarationCnssDeclarationCnssDetails;
    }

    set validDeclarationCnssDeclarationCnssDetails(value: boolean) {
    this._validDeclarationCnssDeclarationCnssDetails = value;
    }
    get validDeclarationCnssSociete(): boolean {
    return this._validDeclarationCnssSociete;
    }

    set validDeclarationCnssSociete(value: boolean) {
    this._validDeclarationCnssSociete = value;
    }

}
