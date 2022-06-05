import {Component, OnInit} from '@angular/core';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DeclarationIrService } from '../../../../../../controller/service/DeclarationIr.service';
import { EmployeService } from '../../../../../../controller/service/Employe.service';
import { TauxIrService } from '../../../../../../controller/service/TauxIr.service';

import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-declaration-ir-employe-list-societe',
  templateUrl: './declaration-ir-employe-list-societe.component.html',
  styleUrls: ['./declaration-ir-employe-list-societe.component.css']
})
export class DeclarationIrEmployeListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeclarationIrEmploye';
    declarationIrs :Array<DeclarationIrVo>;
    employes :Array<EmployeVo>;
    tauxIrs :Array<TauxIrVo>;


    constructor(private datePipe: DatePipe, private declarationIrEmployeService: DeclarationIrEmployeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private declarationIrService: DeclarationIrService
        , private employeService: EmployeService
        , private tauxIrService: TauxIrService
) { }

    ngOnInit(): void {
      this.loadDeclarationIrEmployes();
      this.initExport();
      this.initCol();
      this.loadDeclarationIr();
      this.loadEmploye();
      this.loadTauxIr();
    }
    
    // methods
      public async loadDeclarationIrEmployes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'list');
        isPermistted ? this.declarationIrEmployeService.findAll().subscribe(declarationIrEmployes => this.declarationIrEmployes = declarationIrEmployes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.declarationIrEmployeService.findByCriteria(this.searchDeclarationIrEmploye).subscribe(declarationIrEmployes=>{
            
            this.declarationIrEmployes = declarationIrEmployes;
           // this.searchDeclarationIrEmploye = new DeclarationIrEmployeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'declarationIr?.refrerence', header: 'Declaration ir'},
                        {field: 'employe?.cin', header: 'Employe'},
                            {field: 'salaireNet', header: 'Salaire net'},
                            {field: 'salaireBrut', header: 'Salaire brut'},
                            {field: 'salaireNetImposable', header: 'Salaire net imposable'},
                            {field: 'salaireBrutImposable', header: 'Salaire brut imposable'},
                            {field: 'salaireBase', header: 'Salaire base'},
                            {field: 'indemnite', header: 'Indemnite'},
                            {field: 'primes', header: 'Primes'},
                            {field: 'pourcentageAnciennete', header: 'Pourcentage anciennete'},
                        {field: 'tauxIr?.id', header: 'Taux ir'},
                            {field: 'cotisation', header: 'Cotisation'},
        ];
    }
    
    public async editDeclarationIrEmploye(declarationIrEmploye:DeclarationIrEmployeVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'edit');
         if(isPermistted){
          this.declarationIrEmployeService.findByIdWithAssociatedList(declarationIrEmploye).subscribe(res => {
           this.selectedDeclarationIrEmploye = res;
            this.editDeclarationIrEmployeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeclarationIrEmploye(declarationIrEmploye:DeclarationIrEmployeVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'view');
        if(isPermistted){
           this.declarationIrEmployeService.findByIdWithAssociatedList(declarationIrEmploye).subscribe(res => {
           this.selectedDeclarationIrEmploye = res;
            this.viewDeclarationIrEmployeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeclarationIrEmploye(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeclarationIrEmploye = new DeclarationIrEmployeVo();
            this.createDeclarationIrEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeclarationIrEmploye(declarationIrEmploye:DeclarationIrEmployeVo){
       const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Declaration ir employe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.declarationIrEmployeService.delete(declarationIrEmploye).subscribe(status=>{
                          if(status > 0){
                          const position = this.declarationIrEmployes.indexOf(declarationIrEmploye);
                          position > -1 ? this.declarationIrEmployes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Declaration ir employe Supprimé',
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

public async loadDeclarationIr(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'list');
    isPermistted ? this.declarationIrService.findAll().subscribe(declarationIrs => this.declarationIrs = declarationIrs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEmploye(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'list');
    isPermistted ? this.employeService.findAll().subscribe(employes => this.employes = employes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTauxIr(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationIrEmploye', 'list');
    isPermistted ? this.tauxIrService.findAll().subscribe(tauxIrs => this.tauxIrs = tauxIrs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeclarationIrEmploye(declarationIrEmploye: DeclarationIrEmployeVo) {

     this.declarationIrEmployeService.findByIdWithAssociatedList(declarationIrEmploye).subscribe(
	 res => {
	       this.initDuplicateDeclarationIrEmploye(res);
	       this.selectedDeclarationIrEmploye = res;
	       this.selectedDeclarationIrEmploye.id = null;
            this.createDeclarationIrEmployeDialog = true;

});

	}

	initDuplicateDeclarationIrEmploye(res: DeclarationIrEmployeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.declarationIrEmployes.map(e => {
    return {
            'Declaration ir': e.declarationIrVo?.refrerence ,
            'Employe': e.employeVo?.cin ,
                    'Salaire net': e.salaireNet ,
                    'Salaire brut': e.salaireBrut ,
                    'Salaire net imposable': e.salaireNetImposable ,
                    'Salaire brut imposable': e.salaireBrutImposable ,
                    'Salaire base': e.salaireBase ,
                    'Indemnite': e.indemnite ,
                    'Primes': e.primes ,
                    'Pourcentage anciennete': e.pourcentageAnciennete ,
            'Taux ir': e.tauxIrVo?.id ,
                    'Cotisation': e.cotisation ,
     }
      });

      this.criteriaData = [{
        'Declaration ir': this.searchDeclarationIrEmploye.declarationIrVo?.refrerence ? this.searchDeclarationIrEmploye.declarationIrVo?.refrerence : environment.emptyForExport ,
        'Employe': this.searchDeclarationIrEmploye.employeVo?.cin ? this.searchDeclarationIrEmploye.employeVo?.cin : environment.emptyForExport ,
            'Salaire net Min': this.searchDeclarationIrEmploye.salaireNetMin ? this.searchDeclarationIrEmploye.salaireNetMin : environment.emptyForExport ,
            'Salaire net Max': this.searchDeclarationIrEmploye.salaireNetMax ? this.searchDeclarationIrEmploye.salaireNetMax : environment.emptyForExport ,
            'Salaire brut Min': this.searchDeclarationIrEmploye.salaireBrutMin ? this.searchDeclarationIrEmploye.salaireBrutMin : environment.emptyForExport ,
            'Salaire brut Max': this.searchDeclarationIrEmploye.salaireBrutMax ? this.searchDeclarationIrEmploye.salaireBrutMax : environment.emptyForExport ,
            'Salaire net imposable Min': this.searchDeclarationIrEmploye.salaireNetImposableMin ? this.searchDeclarationIrEmploye.salaireNetImposableMin : environment.emptyForExport ,
            'Salaire net imposable Max': this.searchDeclarationIrEmploye.salaireNetImposableMax ? this.searchDeclarationIrEmploye.salaireNetImposableMax : environment.emptyForExport ,
            'Salaire brut imposable Min': this.searchDeclarationIrEmploye.salaireBrutImposableMin ? this.searchDeclarationIrEmploye.salaireBrutImposableMin : environment.emptyForExport ,
            'Salaire brut imposable Max': this.searchDeclarationIrEmploye.salaireBrutImposableMax ? this.searchDeclarationIrEmploye.salaireBrutImposableMax : environment.emptyForExport ,
            'Salaire base Min': this.searchDeclarationIrEmploye.salaireBaseMin ? this.searchDeclarationIrEmploye.salaireBaseMin : environment.emptyForExport ,
            'Salaire base Max': this.searchDeclarationIrEmploye.salaireBaseMax ? this.searchDeclarationIrEmploye.salaireBaseMax : environment.emptyForExport ,
            'Indemnite Min': this.searchDeclarationIrEmploye.indemniteMin ? this.searchDeclarationIrEmploye.indemniteMin : environment.emptyForExport ,
            'Indemnite Max': this.searchDeclarationIrEmploye.indemniteMax ? this.searchDeclarationIrEmploye.indemniteMax : environment.emptyForExport ,
            'Primes Min': this.searchDeclarationIrEmploye.primesMin ? this.searchDeclarationIrEmploye.primesMin : environment.emptyForExport ,
            'Primes Max': this.searchDeclarationIrEmploye.primesMax ? this.searchDeclarationIrEmploye.primesMax : environment.emptyForExport ,
            'Pourcentage anciennete Min': this.searchDeclarationIrEmploye.pourcentageAncienneteMin ? this.searchDeclarationIrEmploye.pourcentageAncienneteMin : environment.emptyForExport ,
            'Pourcentage anciennete Max': this.searchDeclarationIrEmploye.pourcentageAncienneteMax ? this.searchDeclarationIrEmploye.pourcentageAncienneteMax : environment.emptyForExport ,
        'Taux ir': this.searchDeclarationIrEmploye.tauxIrVo?.id ? this.searchDeclarationIrEmploye.tauxIrVo?.id : environment.emptyForExport ,
            'Cotisation Min': this.searchDeclarationIrEmploye.cotisationMin ? this.searchDeclarationIrEmploye.cotisationMin : environment.emptyForExport ,
            'Cotisation Max': this.searchDeclarationIrEmploye.cotisationMax ? this.searchDeclarationIrEmploye.cotisationMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get declarationIrEmployes(): Array<DeclarationIrEmployeVo> {
           return this.declarationIrEmployeService.declarationIrEmployes;
       }
    set declarationIrEmployes(value: Array<DeclarationIrEmployeVo>) {
        this.declarationIrEmployeService.declarationIrEmployes = value;
       }

    get declarationIrEmployeSelections(): Array<DeclarationIrEmployeVo> {
           return this.declarationIrEmployeService.declarationIrEmployeSelections;
       }
    set declarationIrEmployeSelections(value: Array<DeclarationIrEmployeVo>) {
        this.declarationIrEmployeService.declarationIrEmployeSelections = value;
       }
   
     


    get selectedDeclarationIrEmploye():DeclarationIrEmployeVo {
           return this.declarationIrEmployeService.selectedDeclarationIrEmploye;
       }
    set selectedDeclarationIrEmploye(value: DeclarationIrEmployeVo) {
        this.declarationIrEmployeService.selectedDeclarationIrEmploye = value;
       }
    
    get createDeclarationIrEmployeDialog():boolean {
           return this.declarationIrEmployeService.createDeclarationIrEmployeDialog;
       }
    set createDeclarationIrEmployeDialog(value: boolean) {
        this.declarationIrEmployeService.createDeclarationIrEmployeDialog= value;
       }
    
    get editDeclarationIrEmployeDialog():boolean {
           return this.declarationIrEmployeService.editDeclarationIrEmployeDialog;
       }
    set editDeclarationIrEmployeDialog(value: boolean) {
        this.declarationIrEmployeService.editDeclarationIrEmployeDialog= value;
       }
    get viewDeclarationIrEmployeDialog():boolean {
           return this.declarationIrEmployeService.viewDeclarationIrEmployeDialog;
       }
    set viewDeclarationIrEmployeDialog(value: boolean) {
        this.declarationIrEmployeService.viewDeclarationIrEmployeDialog = value;
       }
       
     get searchDeclarationIrEmploye(): DeclarationIrEmployeVo {
        return this.declarationIrEmployeService.searchDeclarationIrEmploye;
       }
    set searchDeclarationIrEmploye(value: DeclarationIrEmployeVo) {
        this.declarationIrEmployeService.searchDeclarationIrEmploye = value;
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
        this.declarationIrEmployeService.importExcel(formData).subscribe(data => {
                console.log(data);
            }
        ),
            error => {
                alert('Problème de téléchargement');

            };
    }



}
