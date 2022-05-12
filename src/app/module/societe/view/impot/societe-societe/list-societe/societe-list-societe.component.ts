import {Component, OnInit} from '@angular/core';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ComptableService } from '../../../../../../controller/service/Comptable.service';
import { PresidentSocieteService } from '../../../../../../controller/service/PresidentSociete.service';
import { TypeSocieteService } from '../../../../../../controller/service/TypeSociete.service';

import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-societe-list-societe',
  templateUrl: './societe-list-societe.component.html',
  styleUrls: ['./societe-list-societe.component.css']
})
export class SocieteListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Societe';
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];
    comptables :Array<ComptableVo>;
    presidentSocietes :Array<PresidentSocieteVo>;
    typeSocietes :Array<TypeSocieteVo>;


    constructor(private datePipe: DatePipe, private societeService: SocieteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private comptableService: ComptableService
        , private presidentSocieteService: PresidentSocieteService
        , private typeSocieteService: TypeSocieteService
) { }

    ngOnInit(): void {
      this.loadSocietes();
      this.initExport();
      this.initCol();
      this.loadComptable();
      this.loadPresidentSociete();
      this.loadTypeSociete();
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadSocietes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Societe', 'list');
        isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.societeService.findByCriteria(this.searchSociete).subscribe(societes=>{
            
            this.societes = societes;
           // this.searchSociete = new SocieteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'ice', header: 'Ice'},
                            {field: 'adresse', header: 'Adresse'},
                            {field: 'fax', header: 'Fax'},
                            {field: 'telephone', header: 'Telephone'},
                            {field: 'raisonSociale', header: 'Raison sociale'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'anneeExploitation', header: 'Annee exploitation'},
                            {field: 'capitalSocial', header: 'Capital social'},
                            {field: 'age', header: 'Age'},
                        {field: 'comptable?.code', header: 'Comptable'},
                        {field: 'presidentSociete?.id', header: 'President societe'},
                        {field: 'typeSociete?.libelle', header: 'Type societe'},
                            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
                            {field: 'enabled', header: 'Enabled'},
                            {field: 'accountNonExpired', header: 'Account non expired'},
                            {field: 'accountNonLocked', header: 'Account non locked'},
                            {field: 'passwordChanged', header: 'Password changed'},
                            {field: 'createdAt', header: 'Created at'},
                            {field: 'updatedAt', header: 'Updated at'},
                            {field: 'username', header: 'Username'},
                            {field: 'password', header: 'Password'},
                            {field: 'equivalenceAvecPanelErc', header: 'Equivalence avec panel erc'},
                            {field: 'baseHorizon', header: 'Base horizon'},
                            {field: 'role', header: 'Role'},
        ];
    }
    
    public async editSociete(societe:SocieteVo){
        const isPermistted = await this.roleService.isPermitted('Societe', 'edit');
         if(isPermistted){
          this.societeService.findByIdWithAssociatedList(societe).subscribe(res => {
           this.selectedSociete = res;
            this.selectedSociete.dateCreation = new Date(societe.dateCreation);
            this.selectedSociete.createdAt = new Date(societe.createdAt);
            this.selectedSociete.updatedAt = new Date(societe.updatedAt);
            this.editSocieteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewSociete(societe:SocieteVo){
        const isPermistted = await this.roleService.isPermitted('Societe', 'view');
        if(isPermistted){
           this.societeService.findByIdWithAssociatedList(societe).subscribe(res => {
           this.selectedSociete = res;
            this.selectedSociete.dateCreation = new Date(societe.dateCreation);
            this.selectedSociete.createdAt = new Date(societe.createdAt);
            this.selectedSociete.updatedAt = new Date(societe.updatedAt);
            this.viewSocieteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateSociete(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedSociete = new SocieteVo();
            this.createSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteSociete(societe:SocieteVo){
       const isPermistted = await this.roleService.isPermitted('Societe', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Societe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.societeService.delete(societe).subscribe(status=>{
                          if(status > 0){
                          const position = this.societes.indexOf(societe);
                          position > -1 ? this.societes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Societe Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Societe', 'list');
    isPermistted ? this.comptableService.findAll().subscribe(comptables => this.comptables = comptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPresidentSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Societe', 'list');
    isPermistted ? this.presidentSocieteService.findAll().subscribe(presidentSocietes => this.presidentSocietes = presidentSocietes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Societe', 'list');
    isPermistted ? this.typeSocieteService.findAll().subscribe(typeSocietes => this.typeSocietes = typeSocietes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateSociete(societe: SocieteVo) {

     this.societeService.findByIdWithAssociatedList(societe).subscribe(
	 res => {
	       this.initDuplicateSociete(res);
	       this.selectedSociete = res;
	       this.selectedSociete.id = null;
            this.createSocieteDialog = true;

});

	}

	initDuplicateSociete(res: SocieteVo) {
        if (res.demandesVo != null) {
             res.demandesVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.declarationIrsVo != null) {
             res.declarationIrsVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.declarationIssVo != null) {
             res.declarationIssVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.declarationTvasVo != null) {
             res.declarationTvasVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.declarationCnsssVo != null) {
             res.declarationCnsssVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.acomptesVo != null) {
             res.acomptesVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.employesVo != null) {
             res.employesVo.forEach(d => { d.societeVo = null; d.id = null; });
                }
        if (res.facturesVo != null) {
             res.facturesVo.forEach(d => { d.societeVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.societes.map(e => {
    return {
                    'Ice': e.ice ,
                    'Adresse': e.adresse ,
                    'Fax': e.fax ,
                    'Telephone': e.telephone ,
                    'Raison sociale': e.raisonSociale ,
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Annee exploitation': e.anneeExploitation ,
                    'Capital social': e.capitalSocial ,
                    'Description': e.description ,
                    'Age': e.age ,
            'Comptable': e.comptableVo?.code ,
            'President societe': e.presidentSocieteVo?.id ,
            'Type societe': e.typeSocieteVo?.libelle ,
                    'Credentials non expired': e.credentialsNonExpired? 'Vrai' : 'Faux' ,
                    'Enabled': e.enabled? 'Vrai' : 'Faux' ,
                    'Account non expired': e.accountNonExpired? 'Vrai' : 'Faux' ,
                    'Account non locked': e.accountNonLocked? 'Vrai' : 'Faux' ,
                    'Password changed': e.passwordChanged? 'Vrai' : 'Faux' ,
                    'Created at': this.datePipe.transform(e.createdAt , 'dd-MM-yyyy'),
                    'Updated at': this.datePipe.transform(e.updatedAt , 'dd-MM-yyyy'),
                    'Username': e.username ,
                    'Password': e.password ,
                    'Equivalence avec panel erc': e.equivalenceAvecPanelErc ,
                    'Base horizon': e.baseHorizon ,
                    'Role': e.role ,
     }
      });

      this.criteriaData = [{
            'Ice': this.searchSociete.ice ? this.searchSociete.ice : environment.emptyForExport ,
            'Adresse': this.searchSociete.adresse ? this.searchSociete.adresse : environment.emptyForExport ,
            'Fax': this.searchSociete.fax ? this.searchSociete.fax : environment.emptyForExport ,
            'Telephone Min': this.searchSociete.telephoneMin ? this.searchSociete.telephoneMin : environment.emptyForExport ,
            'Telephone Max': this.searchSociete.telephoneMax ? this.searchSociete.telephoneMax : environment.emptyForExport ,
            'Raison sociale': this.searchSociete.raisonSociale ? this.searchSociete.raisonSociale : environment.emptyForExport ,
            'Date creation Min': this.searchSociete.dateCreationMin ? this.datePipe.transform(this.searchSociete.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchSociete.dateCreationMax ? this.datePipe.transform(this.searchSociete.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Annee exploitation Min': this.searchSociete.anneeExploitationMin ? this.searchSociete.anneeExploitationMin : environment.emptyForExport ,
            'Annee exploitation Max': this.searchSociete.anneeExploitationMax ? this.searchSociete.anneeExploitationMax : environment.emptyForExport ,
            'Capital social Min': this.searchSociete.capitalSocialMin ? this.searchSociete.capitalSocialMin : environment.emptyForExport ,
            'Capital social Max': this.searchSociete.capitalSocialMax ? this.searchSociete.capitalSocialMax : environment.emptyForExport ,
            'Description': this.searchSociete.description ? this.searchSociete.description : environment.emptyForExport ,
            'Age Min': this.searchSociete.ageMin ? this.searchSociete.ageMin : environment.emptyForExport ,
            'Age Max': this.searchSociete.ageMax ? this.searchSociete.ageMax : environment.emptyForExport ,
        'Comptable': this.searchSociete.comptableVo?.code ? this.searchSociete.comptableVo?.code : environment.emptyForExport ,
        'President societe': this.searchSociete.presidentSocieteVo?.id ? this.searchSociete.presidentSocieteVo?.id : environment.emptyForExport ,
        'Type societe': this.searchSociete.typeSocieteVo?.libelle ? this.searchSociete.typeSocieteVo?.libelle : environment.emptyForExport ,
            'Credentials non expired': this.searchSociete.credentialsNonExpired ? (this.searchSociete.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchSociete.enabled ? (this.searchSociete.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchSociete.accountNonExpired ? (this.searchSociete.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchSociete.accountNonLocked ? (this.searchSociete.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchSociete.passwordChanged ? (this.searchSociete.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchSociete.createdAtMin ? this.datePipe.transform(this.searchSociete.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchSociete.createdAtMax ? this.datePipe.transform(this.searchSociete.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchSociete.updatedAtMin ? this.datePipe.transform(this.searchSociete.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchSociete.updatedAtMax ? this.datePipe.transform(this.searchSociete.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchSociete.username ? this.searchSociete.username : environment.emptyForExport ,
            'Password': this.searchSociete.password ? this.searchSociete.password : environment.emptyForExport ,
            'Equivalence avec panel erc': this.searchSociete.equivalenceAvecPanelErc ? this.searchSociete.equivalenceAvecPanelErc : environment.emptyForExport ,
            'Base horizon': this.searchSociete.baseHorizon ? this.searchSociete.baseHorizon : environment.emptyForExport ,
            'Role': this.searchSociete.role ? this.searchSociete.role : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get societes(): Array<SocieteVo> {
           return this.societeService.societes;
       }
    set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }

    get societeSelections(): Array<SocieteVo> {
           return this.societeService.societeSelections;
       }
    set societeSelections(value: Array<SocieteVo>) {
        this.societeService.societeSelections = value;
       }
   
     


    get selectedSociete():SocieteVo {
           return this.societeService.selectedSociete;
       }
    set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
    
    get createSocieteDialog():boolean {
           return this.societeService.createSocieteDialog;
       }
    set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog= value;
       }
    
    get editSocieteDialog():boolean {
           return this.societeService.editSocieteDialog;
       }
    set editSocieteDialog(value: boolean) {
        this.societeService.editSocieteDialog= value;
       }
    get viewSocieteDialog():boolean {
           return this.societeService.viewSocieteDialog;
       }
    set viewSocieteDialog(value: boolean) {
        this.societeService.viewSocieteDialog = value;
       }
       
     get searchSociete(): SocieteVo {
        return this.societeService.searchSociete;
       }
    set searchSociete(value: SocieteVo) {
        this.societeService.searchSociete = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
