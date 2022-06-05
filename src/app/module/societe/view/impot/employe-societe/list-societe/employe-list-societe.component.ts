import {Component, OnInit} from '@angular/core';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeEmployeService } from '../../../../../../controller/service/TypeEmploye.service';
import { SocieteService } from '../../../../../../controller/service/Societe.service';
import { DeclarationCnssService } from '../../../../../../controller/service/DeclarationCnss.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-employe-list-societe',
  templateUrl: './employe-list-societe.component.html',
  styleUrls: ['./employe-list-societe.component.css']
})
export class EmployeListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Employe';
    typeEmployes :Array<TypeEmployeVo>;
    societes :Array<SocieteVo>;
    declarationCnsss :Array<DeclarationCnssVo>;


    constructor(private datePipe: DatePipe, private employeService: EmployeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeEmployeService: TypeEmployeService
        , private societeService: SocieteService
        , private declarationCnssService: DeclarationCnssService
) { }

    ngOnInit(): void {
      this.loadEmployes();
      this.initExport();
      this.initCol();
      this.loadTypeEmploye();
      this.loadSociete();
      this.loadDeclarationCnss();
    }
    
    // methods
      public async loadEmployes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Employe', 'list');
        isPermistted ? this.employeService.findAll().subscribe(employes => this.employes = employes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.employeService.findByCriteria(this.searchEmploye).subscribe(employes=>{
            
            this.employes = employes;
           // this.searchEmploye = new EmployeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'cin', header: 'Cin'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                        {field: 'typeEmploye?.libelle', header: 'Type employe'},
                            {field: 'totalSalaireNet', header: 'Total salaire net'},
                        {field: 'societe?.id', header: 'Societe'},
                            {field: 'nombreFamille', header: 'Nombre famille'},
                        {field: 'declarationCnss?.ref', header: 'Declaration cnss'},
        ];
    }
    
    public async editEmploye(employe:EmployeVo){
        const isPermistted = await this.roleService.isPermitted('Employe', 'edit');
         if(isPermistted){
          this.employeService.findByIdWithAssociatedList(employe).subscribe(res => {
           this.selectedEmploye = res;
            this.editEmployeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEmploye(employe:EmployeVo){
        const isPermistted = await this.roleService.isPermitted('Employe', 'view');
        if(isPermistted){
           this.employeService.findByIdWithAssociatedList(employe).subscribe(res => {
           this.selectedEmploye = res;
            this.viewEmployeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEmploye(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEmploye = new EmployeVo();
            this.createEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEmploye(employe:EmployeVo){
       const isPermistted = await this.roleService.isPermitted('Employe', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Employe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.employeService.delete(employe).subscribe(status=>{
                          if(status > 0){
                          const position = this.employes.indexOf(employe);
                          position > -1 ? this.employes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Employe Supprimé',
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

public async loadTypeEmploye(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Employe', 'list');
    isPermistted ? this.typeEmployeService.findAll().subscribe(typeEmployes => this.typeEmployes = typeEmployes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Employe', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeclarationCnss(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Employe', 'list');
    isPermistted ? this.declarationCnssService.findAll().subscribe(declarationCnsss => this.declarationCnsss = declarationCnsss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEmploye(employe: EmployeVo) {

     this.employeService.findByIdWithAssociatedList(employe).subscribe(
	 res => {
	       this.initDuplicateEmploye(res);
	       this.selectedEmploye = res;
	       this.selectedEmploye.id = null;
            this.createEmployeDialog = true;

});

	}

	initDuplicateEmploye(res: EmployeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.employes.map(e => {
    return {
                    'Cin': e.cin ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
            'Type employe': e.typeEmployeVo?.libelle ,
                    'Total salaire net': e.totalSalaireNet ,
            'Societe': e.societeVo?.id ,
                    'Nombre famille': e.nombreFamille ,
            'Declaration cnss': e.declarationCnssVo?.ref ,
     }
      });

      this.criteriaData = [{
            'Cin': this.searchEmploye.cin ? this.searchEmploye.cin : environment.emptyForExport ,
            'Nom': this.searchEmploye.nom ? this.searchEmploye.nom : environment.emptyForExport ,
            'Prenom': this.searchEmploye.prenom ? this.searchEmploye.prenom : environment.emptyForExport ,
        'Type employe': this.searchEmploye.typeEmployeVo?.libelle ? this.searchEmploye.typeEmployeVo?.libelle : environment.emptyForExport ,
            'Total salaire net Min': this.searchEmploye.totalSalaireNetMin ? this.searchEmploye.totalSalaireNetMin : environment.emptyForExport ,
            'Total salaire net Max': this.searchEmploye.totalSalaireNetMax ? this.searchEmploye.totalSalaireNetMax : environment.emptyForExport ,
        'Societe': this.searchEmploye.societeVo?.id ? this.searchEmploye.societeVo?.id : environment.emptyForExport ,
            'Nombre famille Min': this.searchEmploye.nombreFamilleMin ? this.searchEmploye.nombreFamilleMin : environment.emptyForExport ,
            'Nombre famille Max': this.searchEmploye.nombreFamilleMax ? this.searchEmploye.nombreFamilleMax : environment.emptyForExport ,
        'Declaration cnss': this.searchEmploye.declarationCnssVo?.ref ? this.searchEmploye.declarationCnssVo?.ref : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get employes(): Array<EmployeVo> {
           return this.employeService.employes;
       }
    set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
       }

    get employeSelections(): Array<EmployeVo> {
           return this.employeService.employeSelections;
       }
    set employeSelections(value: Array<EmployeVo>) {
        this.employeService.employeSelections = value;
       }
   
     


    get selectedEmploye():EmployeVo {
           return this.employeService.selectedEmploye;
       }
    set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
       }
    
    get createEmployeDialog():boolean {
           return this.employeService.createEmployeDialog;
       }
    set createEmployeDialog(value: boolean) {
        this.employeService.createEmployeDialog= value;
       }
    
    get editEmployeDialog():boolean {
           return this.employeService.editEmployeDialog;
       }
    set editEmployeDialog(value: boolean) {
        this.employeService.editEmployeDialog= value;
       }
    get viewEmployeDialog():boolean {
           return this.employeService.viewEmployeDialog;
       }
    set viewEmployeDialog(value: boolean) {
        this.employeService.viewEmployeDialog = value;
       }
       
     get searchEmploye(): EmployeVo {
        return this.employeService.searchEmploye;
       }
    set searchEmploye(value: EmployeVo) {
        this.employeService.searchEmploye = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }

    public uploadExcelFile(event) {
        const file = event.files[0];
        console.log(file);
        const formData: FormData = new FormData();
        formData.append('file', file);
        console.log(formData);
        this.employeService.importExcel(formData).subscribe(data => {
                console.log(data);
            }
        ),
            error => {
                alert('Problème de téléchargement');

            };
    }

}
