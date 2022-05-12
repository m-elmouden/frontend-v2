import {Component, OnInit} from '@angular/core';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PrelevementSocialService } from '../../../../../../controller/service/PrelevementSocial.service';
import { EmployeService } from '../../../../../../controller/service/Employe.service';
import { DeclarationIrService } from '../../../../../../controller/service/DeclarationIr.service';

import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-prelevement-social-employe-list-societe',
  templateUrl: './prelevement-social-employe-list-societe.component.html',
  styleUrls: ['./prelevement-social-employe-list-societe.component.css']
})
export class PrelevementSocialEmployeListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PrelevementSocialEmploye';
    prelevementSocials :Array<PrelevementSocialVo>;
    employes :Array<EmployeVo>;
    declarationIrs :Array<DeclarationIrVo>;


    constructor(private datePipe: DatePipe, private prelevementSocialEmployeService: PrelevementSocialEmployeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private prelevementSocialService: PrelevementSocialService
        , private employeService: EmployeService
        , private declarationIrService: DeclarationIrService
) { }

    ngOnInit(): void {
      this.loadPrelevementSocialEmployes();
      this.initExport();
      this.initCol();
      this.loadPrelevementSocial();
      this.loadEmploye();
      this.loadDeclarationIr();
    }
    
    // methods
      public async loadPrelevementSocialEmployes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'list');
        isPermistted ? this.prelevementSocialEmployeService.findAll().subscribe(prelevementSocialEmployes => this.prelevementSocialEmployes = prelevementSocialEmployes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.prelevementSocialEmployeService.findByCriteria(this.searchPrelevementSocialEmploye).subscribe(prelevementSocialEmployes=>{
            
            this.prelevementSocialEmployes = prelevementSocialEmployes;
           // this.searchPrelevementSocialEmploye = new PrelevementSocialEmployeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'prelevementSocial?.libelle', header: 'Prelevement social'},
                        {field: 'employe?.cin', header: 'Employe'},
                            {field: 'salaireBrutImposable', header: 'Salaire brut imposable'},
                            {field: 'montantCalculer', header: 'Montant calculer'},
                        {field: 'declarationIr?.refrerence', header: 'Declaration ir'},
        ];
    }
    
    public async editPrelevementSocialEmploye(prelevementSocialEmploye:PrelevementSocialEmployeVo){
        const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'edit');
         if(isPermistted){
          this.prelevementSocialEmployeService.findByIdWithAssociatedList(prelevementSocialEmploye).subscribe(res => {
           this.selectedPrelevementSocialEmploye = res;
            this.editPrelevementSocialEmployeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPrelevementSocialEmploye(prelevementSocialEmploye:PrelevementSocialEmployeVo){
        const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'view');
        if(isPermistted){
           this.prelevementSocialEmployeService.findByIdWithAssociatedList(prelevementSocialEmploye).subscribe(res => {
           this.selectedPrelevementSocialEmploye = res;
            this.viewPrelevementSocialEmployeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePrelevementSocialEmploye(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPrelevementSocialEmploye = new PrelevementSocialEmployeVo();
            this.createPrelevementSocialEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePrelevementSocialEmploye(prelevementSocialEmploye:PrelevementSocialEmployeVo){
       const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Prelevement social employe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.prelevementSocialEmployeService.delete(prelevementSocialEmploye).subscribe(status=>{
                          if(status > 0){
                          const position = this.prelevementSocialEmployes.indexOf(prelevementSocialEmploye);
                          position > -1 ? this.prelevementSocialEmployes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Prelevement social employe Supprimé',
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

public async loadPrelevementSocial(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'list');
    isPermistted ? this.prelevementSocialService.findAll().subscribe(prelevementSocials => this.prelevementSocials = prelevementSocials,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEmploye(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'list');
    isPermistted ? this.employeService.findAll().subscribe(employes => this.employes = employes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeclarationIr(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PrelevementSocialEmploye', 'list');
    isPermistted ? this.declarationIrService.findAll().subscribe(declarationIrs => this.declarationIrs = declarationIrs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePrelevementSocialEmploye(prelevementSocialEmploye: PrelevementSocialEmployeVo) {

     this.prelevementSocialEmployeService.findByIdWithAssociatedList(prelevementSocialEmploye).subscribe(
	 res => {
	       this.initDuplicatePrelevementSocialEmploye(res);
	       this.selectedPrelevementSocialEmploye = res;
	       this.selectedPrelevementSocialEmploye.id = null;
            this.createPrelevementSocialEmployeDialog = true;

});

	}

	initDuplicatePrelevementSocialEmploye(res: PrelevementSocialEmployeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.prelevementSocialEmployes.map(e => {
    return {
            'Prelevement social': e.prelevementSocialVo?.libelle ,
            'Employe': e.employeVo?.cin ,
                    'Salaire brut imposable': e.salaireBrutImposable ,
                    'Montant calculer': e.montantCalculer ,
            'Declaration ir': e.declarationIrVo?.refrerence ,
     }
      });

      this.criteriaData = [{
        'Prelevement social': this.searchPrelevementSocialEmploye.prelevementSocialVo?.libelle ? this.searchPrelevementSocialEmploye.prelevementSocialVo?.libelle : environment.emptyForExport ,
        'Employe': this.searchPrelevementSocialEmploye.employeVo?.cin ? this.searchPrelevementSocialEmploye.employeVo?.cin : environment.emptyForExport ,
            'Salaire brut imposable Min': this.searchPrelevementSocialEmploye.salaireBrutImposableMin ? this.searchPrelevementSocialEmploye.salaireBrutImposableMin : environment.emptyForExport ,
            'Salaire brut imposable Max': this.searchPrelevementSocialEmploye.salaireBrutImposableMax ? this.searchPrelevementSocialEmploye.salaireBrutImposableMax : environment.emptyForExport ,
            'Montant calculer Min': this.searchPrelevementSocialEmploye.montantCalculerMin ? this.searchPrelevementSocialEmploye.montantCalculerMin : environment.emptyForExport ,
            'Montant calculer Max': this.searchPrelevementSocialEmploye.montantCalculerMax ? this.searchPrelevementSocialEmploye.montantCalculerMax : environment.emptyForExport ,
        'Declaration ir': this.searchPrelevementSocialEmploye.declarationIrVo?.refrerence ? this.searchPrelevementSocialEmploye.declarationIrVo?.refrerence : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get prelevementSocialEmployes(): Array<PrelevementSocialEmployeVo> {
           return this.prelevementSocialEmployeService.prelevementSocialEmployes;
       }
    set prelevementSocialEmployes(value: Array<PrelevementSocialEmployeVo>) {
        this.prelevementSocialEmployeService.prelevementSocialEmployes = value;
       }

    get prelevementSocialEmployeSelections(): Array<PrelevementSocialEmployeVo> {
           return this.prelevementSocialEmployeService.prelevementSocialEmployeSelections;
       }
    set prelevementSocialEmployeSelections(value: Array<PrelevementSocialEmployeVo>) {
        this.prelevementSocialEmployeService.prelevementSocialEmployeSelections = value;
       }
   
     


    get selectedPrelevementSocialEmploye():PrelevementSocialEmployeVo {
           return this.prelevementSocialEmployeService.selectedPrelevementSocialEmploye;
       }
    set selectedPrelevementSocialEmploye(value: PrelevementSocialEmployeVo) {
        this.prelevementSocialEmployeService.selectedPrelevementSocialEmploye = value;
       }
    
    get createPrelevementSocialEmployeDialog():boolean {
           return this.prelevementSocialEmployeService.createPrelevementSocialEmployeDialog;
       }
    set createPrelevementSocialEmployeDialog(value: boolean) {
        this.prelevementSocialEmployeService.createPrelevementSocialEmployeDialog= value;
       }
    
    get editPrelevementSocialEmployeDialog():boolean {
           return this.prelevementSocialEmployeService.editPrelevementSocialEmployeDialog;
       }
    set editPrelevementSocialEmployeDialog(value: boolean) {
        this.prelevementSocialEmployeService.editPrelevementSocialEmployeDialog= value;
       }
    get viewPrelevementSocialEmployeDialog():boolean {
           return this.prelevementSocialEmployeService.viewPrelevementSocialEmployeDialog;
       }
    set viewPrelevementSocialEmployeDialog(value: boolean) {
        this.prelevementSocialEmployeService.viewPrelevementSocialEmployeDialog = value;
       }
       
     get searchPrelevementSocialEmploye(): PrelevementSocialEmployeVo {
        return this.prelevementSocialEmployeService.searchPrelevementSocialEmploye;
       }
    set searchPrelevementSocialEmploye(value: PrelevementSocialEmployeVo) {
        this.prelevementSocialEmployeService.searchPrelevementSocialEmploye = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
