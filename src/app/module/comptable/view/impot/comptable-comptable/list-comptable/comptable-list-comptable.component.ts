import {Component, OnInit} from '@angular/core';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeComptableService } from '../../../../../../controller/service/TypeComptable.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-comptable-list-comptable',
  templateUrl: './comptable-list-comptable.component.html',
  styleUrls: ['./comptable-list-comptable.component.css']
})
export class ComptableListComptableComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Comptable';
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];
    typeComptables :Array<TypeComptableVo>;


    constructor(private datePipe: DatePipe, private comptableService: ComptableService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeComptableService: TypeComptableService
) { }

    ngOnInit(): void {
      this.loadComptables();
      this.initExport();
      this.initCol();
      this.loadTypeComptable();
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadComptables(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Comptable', 'list');
        isPermistted ? this.comptableService.findAll().subscribe(comptables => this.comptables = comptables,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.comptableService.findByCriteria(this.searchComptable).subscribe(comptables=>{
            
            this.comptables = comptables;
           // this.searchComptable = new ComptableVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'telephone', header: 'Telephone'},
                            {field: 'prenom', header: 'Prenom'},
                        {field: 'typeComptable?.libelle', header: 'Type comptable'},
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
    
    public async editComptable(comptable:ComptableVo){
        const isPermistted = await this.roleService.isPermitted('Comptable', 'edit');
         if(isPermistted){
          this.comptableService.findByIdWithAssociatedList(comptable).subscribe(res => {
           this.selectedComptable = res;
            this.selectedComptable.createdAt = new Date(comptable.createdAt);
            this.selectedComptable.updatedAt = new Date(comptable.updatedAt);
            this.editComptableDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewComptable(comptable:ComptableVo){
        const isPermistted = await this.roleService.isPermitted('Comptable', 'view');
        if(isPermistted){
           this.comptableService.findByIdWithAssociatedList(comptable).subscribe(res => {
           this.selectedComptable = res;
            this.selectedComptable.createdAt = new Date(comptable.createdAt);
            this.selectedComptable.updatedAt = new Date(comptable.updatedAt);
            this.viewComptableDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateComptable(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedComptable = new ComptableVo();
            this.createComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteComptable(comptable:ComptableVo){
       const isPermistted = await this.roleService.isPermitted('Comptable', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Comptable) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.comptableService.delete(comptable).subscribe(status=>{
                          if(status > 0){
                          const position = this.comptables.indexOf(comptable);
                          position > -1 ? this.comptables.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Comptable Supprimé',
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

public async loadTypeComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Comptable', 'list');
    isPermistted ? this.typeComptableService.findAll().subscribe(typeComptables => this.typeComptables = typeComptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateComptable(comptable: ComptableVo) {

     this.comptableService.findByIdWithAssociatedList(comptable).subscribe(
	 res => {
	       this.initDuplicateComptable(res);
	       this.selectedComptable = res;
	       this.selectedComptable.id = null;
            this.createComptableDialog = true;

});

	}

	initDuplicateComptable(res: ComptableVo) {
        if (res.societesVo != null) {
             res.societesVo.forEach(d => { d.comptableVo = null; d.id = null; });
                }
        if (res.demandesVo != null) {
             res.demandesVo.forEach(d => { d.comptableVo = null; d.id = null; });
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
    this.exportData = this.comptables.map(e => {
    return {
                    'Code': e.code ,
                    'Nom': e.nom ,
                    'Telephone': e.telephone ,
                    'Prenom': e.prenom ,
            'Type comptable': e.typeComptableVo?.libelle ,
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
            'Code': this.searchComptable.code ? this.searchComptable.code : environment.emptyForExport ,
            'Nom': this.searchComptable.nom ? this.searchComptable.nom : environment.emptyForExport ,
            'Telephone': this.searchComptable.telephone ? this.searchComptable.telephone : environment.emptyForExport ,
            'Prenom': this.searchComptable.prenom ? this.searchComptable.prenom : environment.emptyForExport ,
        'Type comptable': this.searchComptable.typeComptableVo?.libelle ? this.searchComptable.typeComptableVo?.libelle : environment.emptyForExport ,
            'Credentials non expired': this.searchComptable.credentialsNonExpired ? (this.searchComptable.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchComptable.enabled ? (this.searchComptable.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchComptable.accountNonExpired ? (this.searchComptable.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchComptable.accountNonLocked ? (this.searchComptable.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchComptable.passwordChanged ? (this.searchComptable.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchComptable.createdAtMin ? this.datePipe.transform(this.searchComptable.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchComptable.createdAtMax ? this.datePipe.transform(this.searchComptable.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchComptable.updatedAtMin ? this.datePipe.transform(this.searchComptable.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchComptable.updatedAtMax ? this.datePipe.transform(this.searchComptable.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchComptable.username ? this.searchComptable.username : environment.emptyForExport ,
            'Password': this.searchComptable.password ? this.searchComptable.password : environment.emptyForExport ,
            'Equivalence avec panel erc': this.searchComptable.equivalenceAvecPanelErc ? this.searchComptable.equivalenceAvecPanelErc : environment.emptyForExport ,
            'Base horizon': this.searchComptable.baseHorizon ? this.searchComptable.baseHorizon : environment.emptyForExport ,
            'Role': this.searchComptable.role ? this.searchComptable.role : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get comptables(): Array<ComptableVo> {
           return this.comptableService.comptables;
       }
    set comptables(value: Array<ComptableVo>) {
        this.comptableService.comptables = value;
       }

    get comptableSelections(): Array<ComptableVo> {
           return this.comptableService.comptableSelections;
       }
    set comptableSelections(value: Array<ComptableVo>) {
        this.comptableService.comptableSelections = value;
       }
   
     


    get selectedComptable():ComptableVo {
           return this.comptableService.selectedComptable;
       }
    set selectedComptable(value: ComptableVo) {
        this.comptableService.selectedComptable = value;
       }
    
    get createComptableDialog():boolean {
           return this.comptableService.createComptableDialog;
       }
    set createComptableDialog(value: boolean) {
        this.comptableService.createComptableDialog= value;
       }
    
    get editComptableDialog():boolean {
           return this.comptableService.editComptableDialog;
       }
    set editComptableDialog(value: boolean) {
        this.comptableService.editComptableDialog= value;
       }
    get viewComptableDialog():boolean {
           return this.comptableService.viewComptableDialog;
       }
    set viewComptableDialog(value: boolean) {
        this.comptableService.viewComptableDialog = value;
       }
       
     get searchComptable(): ComptableVo {
        return this.comptableService.searchComptable;
       }
    set searchComptable(value: ComptableVo) {
        this.comptableService.searchComptable = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
