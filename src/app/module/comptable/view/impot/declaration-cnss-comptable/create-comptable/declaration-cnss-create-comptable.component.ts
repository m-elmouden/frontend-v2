import {Component, OnInit, Input} from '@angular/core';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';
import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
@Component({
  selector: 'app-declaration-cnss-create-comptable',
  templateUrl: './declaration-cnss-create-comptable.component.html',
  styleUrls: ['./declaration-cnss-create-comptable.component.css']
})
export class DeclarationCnssCreateComptableComponent implements OnInit {

        selectedDeclarationCnssDetails: DeclarationCnssDetailVo = new DeclarationCnssDetailVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDeclarationCnssRef = true;
   _validDeclarationCnssEmploye = true;
   _validDeclarationCnssSalaireNet = true;
   _validDeclarationCnssSalaireBrut = true;
   _validDeclarationCnssSalaireImposable = true;
   _validDeclarationCnssMontantTotal = true;
   _validDeclarationCnssDeclarationCnssDetails = true;
   _validDeclarationCnssSociete = true;

    _validEmployeCin = true;
    _validEmployeNom = true;
    _validEmployePrenom = true;
    _validEmployeTotalSalaireNet = true;
    _validEmployeNombreFamille = true;
    _validDeclarationCnssDetailRef = true;
    _validDeclarationCnssDetailTypeTauxCnss = true;
    _validDeclarationCnssDetailMontantCalcule = true;
    _validDeclarationCnssDetailMontantTotal = true;
    _validDeclarationCnssDetailDeclarationCnss = true;
    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;



constructor(private datePipe: DatePipe, private declarationCnssService: DeclarationCnssService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private declarationCnssDetailService :DeclarationCnssDetailService
,       private typeTauxCnssService :TypeTauxCnssService
,       private employeService :EmployeService
,       private societeService :SocieteService
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


    validateDeclarationCnssDetails(){
    this.errorMessages = new Array();
    this.validateDeclarationCnssDetailRef();
    this.validateDeclarationCnssDetailTypeTauxCnss();
    this.validateDeclarationCnssDetailMontantCalcule();
    this.validateDeclarationCnssDetailMontantTotal();
    this.validateDeclarationCnssDetailDeclarationCnss();
    }


private setValidation(value : boolean){
    this.validDeclarationCnssRef = value;
    this.validDeclarationCnssEmploye = value;
    this.validDeclarationCnssSalaireNet = value;
    this.validDeclarationCnssSalaireBrut = value;
    this.validDeclarationCnssSalaireImposable = value;
    this.validDeclarationCnssMontantTotal = value;
    this.validDeclarationCnssDeclarationCnssDetails = value;
    this.validDeclarationCnssDetailRef = value;
    this.validDeclarationCnssDetailTypeTauxCnss = value;
    this.validDeclarationCnssDetailMontantCalcule = value;
    this.validDeclarationCnssDetailMontantTotal = value;
    this.validDeclarationCnssDetailDeclarationCnss = value;
    this.validDeclarationCnssSociete = value;
    }

        addDeclarationCnssDetails() {
        if( this.selectedDeclarationCnss.declarationCnssDetailsVo == null ){
            this.selectedDeclarationCnss.declarationCnssDetailsVo = new Array<DeclarationCnssDetailVo>();
        }
       this.validateDeclarationCnssDetails();
       if (this.errorMessages.length === 0) {
              this.selectedDeclarationCnss.declarationCnssDetailsVo.push(this.selectedDeclarationCnssDetails);
              this.selectedDeclarationCnssDetails = new DeclarationCnssDetailVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteDeclarationCnssDetails(p: DeclarationCnssDetailVo) {
        this.selectedDeclarationCnss.declarationCnssDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedDeclarationCnss.declarationCnssDetailsVo.splice(index, 1); }
        });
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
     this.declarationCnssService.save().subscribe(declarationCnss=>{
       this.declarationCnsss.push({...declarationCnss});
       this.createDeclarationCnssDialog = false;
       this.submitted = false;
       this.selectedDeclarationCnss = new DeclarationCnssVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDeclarationCnssRef();
this.validateDeclarationCnssEmploye();
this.validateDeclarationCnssSalaireNet();
this.validateDeclarationCnssSalaireBrut();
this.validateDeclarationCnssSalaireImposable();
this.validateDeclarationCnssMontantTotal();
this.validateDeclarationCnssDeclarationCnssDetails();
this.validateDeclarationCnssSociete();

    }

private validateDeclarationCnssRef(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.ref)) {
            this.errorMessages.push('Ref non valide');
            this.validDeclarationCnssRef = false;
        } else {
            this.validDeclarationCnssRef = true;
        }
    }
private validateDeclarationCnssEmploye(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.employeVo)) {
            this.errorMessages.push('Employe non valide');
            this.validDeclarationCnssEmploye = false;
        } else {
            this.validDeclarationCnssEmploye = true;
        }
    }
private validateDeclarationCnssSalaireNet(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.salaireNet)) {
            this.errorMessages.push('Salaire net non valide');
            this.validDeclarationCnssSalaireNet = false;
        } else {
            this.validDeclarationCnssSalaireNet = true;
        }
    }
private validateDeclarationCnssSalaireBrut(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.salaireBrut)) {
            this.errorMessages.push('Salaire brut non valide');
            this.validDeclarationCnssSalaireBrut = false;
        } else {
            this.validDeclarationCnssSalaireBrut = true;
        }
    }
private validateDeclarationCnssSalaireImposable(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.salaireImposable)) {
            this.errorMessages.push('Salaire imposable non valide');
            this.validDeclarationCnssSalaireImposable = false;
        } else {
            this.validDeclarationCnssSalaireImposable = true;
        }
    }
private validateDeclarationCnssMontantTotal(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.montantTotal)) {
            this.errorMessages.push('Montant total non valide');
            this.validDeclarationCnssMontantTotal = false;
        } else {
            this.validDeclarationCnssMontantTotal = true;
        }
    }
private validateDeclarationCnssDeclarationCnssDetails(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.declarationCnssDetailsVo)) {
            this.errorMessages.push('Declaration cnss details non valide');
            this.validDeclarationCnssDeclarationCnssDetails = false;
        } else {
            this.validDeclarationCnssDeclarationCnssDetails = true;
        }
    }
private validateDeclarationCnssSociete(){
        if (this.stringUtilService.isEmpty(this.selectedDeclarationCnss.societeVo)) {
            this.errorMessages.push('Societe non valide');
            this.validDeclarationCnssSociete = false;
        } else {
            this.validDeclarationCnssSociete = true;
        }
    }











            private validateDeclarationCnssDetailRef(){
            if (this.selectedDeclarationCnssDetails.ref == null) {
            this.errorMessages.push('Ref de la declarationCnssDetail est  invalide');
             this.validDeclarationCnssDetailRef = false;
            } else {
            this.validDeclarationCnssDetailRef = true;
            }
            }

            private validateDeclarationCnssDetailTypeTauxCnss(){
            if (this.selectedDeclarationCnssDetails.typeTauxCnssVo == null) {
            this.errorMessages.push('TypeTauxCnss de la declarationCnssDetail est  invalide');
             this.validDeclarationCnssDetailTypeTauxCnss = false;
            } else {
            this.validDeclarationCnssDetailTypeTauxCnss = true;
            }
            }

            private validateDeclarationCnssDetailMontantCalcule(){
            if (this.selectedDeclarationCnssDetails.montantCalcule == null) {
            this.errorMessages.push('MontantCalcule de la declarationCnssDetail est  invalide');
             this.validDeclarationCnssDetailMontantCalcule = false;
            } else {
            this.validDeclarationCnssDetailMontantCalcule = true;
            }
            }

            private validateDeclarationCnssDetailMontantTotal(){
            if (this.selectedDeclarationCnssDetails.montantTotal == null) {
            this.errorMessages.push('MontantTotal de la declarationCnssDetail est  invalide');
             this.validDeclarationCnssDetailMontantTotal = false;
            } else {
            this.validDeclarationCnssDetailMontantTotal = true;
            }
            }

            private validateDeclarationCnssDetailDeclarationCnss(){
            if (this.selectedDeclarationCnssDetails.declarationCnssVo == null) {
            this.errorMessages.push('DeclarationCnss de la declarationCnssDetail est  invalide');
             this.validDeclarationCnssDetailDeclarationCnss = false;
            } else {
            this.validDeclarationCnssDetailDeclarationCnss = true;
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

hideCreateDialog(){
    this.createDeclarationCnssDialog  = false;
    this.setValidation(true);
}

// getters and setters

get declarationCnsss(): Array<DeclarationCnssVo> {
    return this.declarationCnssService.declarationCnsss;
       }
set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }

 get selectedDeclarationCnss():DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
    set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }

   get createDeclarationCnssDialog(): boolean {
           return this.declarationCnssService.createDeclarationCnssDialog;

       }
    set createDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.createDeclarationCnssDialog= value;
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
    get validDeclarationCnssDetailRef(): boolean {
    return this._validDeclarationCnssDetailRef;
    }

    set validDeclarationCnssDetailRef(value: boolean) {
    this._validDeclarationCnssDetailRef = value;
    }
    get validDeclarationCnssDetailTypeTauxCnss(): boolean {
    return this._validDeclarationCnssDetailTypeTauxCnss;
    }

    set validDeclarationCnssDetailTypeTauxCnss(value: boolean) {
    this._validDeclarationCnssDetailTypeTauxCnss = value;
    }
    get validDeclarationCnssDetailMontantCalcule(): boolean {
    return this._validDeclarationCnssDetailMontantCalcule;
    }

    set validDeclarationCnssDetailMontantCalcule(value: boolean) {
    this._validDeclarationCnssDetailMontantCalcule = value;
    }
    get validDeclarationCnssDetailMontantTotal(): boolean {
    return this._validDeclarationCnssDetailMontantTotal;
    }

    set validDeclarationCnssDetailMontantTotal(value: boolean) {
    this._validDeclarationCnssDetailMontantTotal = value;
    }
    get validDeclarationCnssDetailDeclarationCnss(): boolean {
    return this._validDeclarationCnssDetailDeclarationCnss;
    }

    set validDeclarationCnssDetailDeclarationCnss(value: boolean) {
    this._validDeclarationCnssDetailDeclarationCnss = value;
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

}
