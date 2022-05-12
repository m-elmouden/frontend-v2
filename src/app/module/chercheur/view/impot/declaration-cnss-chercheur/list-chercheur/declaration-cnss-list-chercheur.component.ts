import {Component, OnInit} from '@angular/core';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EmployeService } from '../../../../../../controller/service/Employe.service';
import { SocieteService } from '../../../../../../controller/service/Societe.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-declaration-cnss-list-chercheur',
  templateUrl: './declaration-cnss-list-chercheur.component.html',
  styleUrls: ['./declaration-cnss-list-chercheur.component.css']
})
export class DeclarationCnssListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeclarationCnss';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    employes :Array<EmployeVo>;
    societes :Array<SocieteVo>;


    constructor(private datePipe: DatePipe, private declarationCnssService: DeclarationCnssService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private employeService: EmployeService
        , private societeService: SocieteService
) { }

    ngOnInit(): void {
      this.loadDeclarationCnsss();
      this.initExport();
      this.initCol();
      this.loadEmploye();
      this.loadSociete();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDeclarationCnsss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'list');
        isPermistted ? this.declarationCnssService.findAll().subscribe(declarationCnsss => this.declarationCnsss = declarationCnsss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.declarationCnssService.findByCriteria(this.searchDeclarationCnss).subscribe(declarationCnsss=>{
            
            this.declarationCnsss = declarationCnsss;
           // this.searchDeclarationCnss = new DeclarationCnssVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'ref', header: 'Ref'},
                        {field: 'employe?.cin', header: 'Employe'},
                            {field: 'salaireNet', header: 'Salaire net'},
                            {field: 'salaireBrut', header: 'Salaire brut'},
                            {field: 'salaireImposable', header: 'Salaire imposable'},
                            {field: 'montantTotal', header: 'Montant total'},
                            {field: 'mois', header: 'Mois'},
                            {field: 'annee', header: 'Annee'},
                        {field: 'societe?.id', header: 'Societe'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDeclarationCnss(declarationCnss:DeclarationCnssVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'edit');
         if(isPermistted){
          this.declarationCnssService.findByIdWithAssociatedList(declarationCnss).subscribe(res => {
           this.selectedDeclarationCnss = res;
            this.selectedDeclarationCnss.dateArchivage = new Date(declarationCnss.dateArchivage);
            this.selectedDeclarationCnss.dateCreation = new Date(declarationCnss.dateCreation);
            this.editDeclarationCnssDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeclarationCnss(declarationCnss:DeclarationCnssVo){
        const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'view');
        if(isPermistted){
           this.declarationCnssService.findByIdWithAssociatedList(declarationCnss).subscribe(res => {
           this.selectedDeclarationCnss = res;
            this.selectedDeclarationCnss.dateArchivage = new Date(declarationCnss.dateArchivage);
            this.selectedDeclarationCnss.dateCreation = new Date(declarationCnss.dateCreation);
            this.viewDeclarationCnssDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeclarationCnss(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeclarationCnss = new DeclarationCnssVo();
            this.createDeclarationCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeclarationCnss(declarationCnss:DeclarationCnssVo){
       const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Declaration cnss) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.declarationCnssService.delete(declarationCnss).subscribe(status=>{
                          if(status > 0){
                          const position = this.declarationCnsss.indexOf(declarationCnss);
                          position > -1 ? this.declarationCnsss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Declaration cnss Supprimé',
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

public async loadEmploye(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'list');
    isPermistted ? this.employeService.findAll().subscribe(employes => this.employes = employes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeclarationCnss(declarationCnss: DeclarationCnssVo) {

     this.declarationCnssService.findByIdWithAssociatedList(declarationCnss).subscribe(
	 res => {
	       this.initDuplicateDeclarationCnss(res);
	       this.selectedDeclarationCnss = res;
	       this.selectedDeclarationCnss.id = null;
            this.createDeclarationCnssDialog = true;

});

	}

	initDuplicateDeclarationCnss(res: DeclarationCnssVo) {
        if (res.declarationCnssDetailsVo != null) {
             res.declarationCnssDetailsVo.forEach(d => { d.declarationCnssVo = null; d.id = null; });
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
    this.exportData = this.declarationCnsss.map(e => {
    return {
                    'Ref': e.ref ,
            'Employe': e.employeVo?.cin ,
                    'Salaire net': e.salaireNet ,
                    'Salaire brut': e.salaireBrut ,
                    'Salaire imposable': e.salaireImposable ,
                    'Montant total': e.montantTotal ,
                    'Mois': e.mois ,
                    'Annee': e.annee ,
            'Societe': e.societeVo?.id ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Ref': this.searchDeclarationCnss.ref ? this.searchDeclarationCnss.ref : environment.emptyForExport ,
        'Employe': this.searchDeclarationCnss.employeVo?.cin ? this.searchDeclarationCnss.employeVo?.cin : environment.emptyForExport ,
            'Salaire net Min': this.searchDeclarationCnss.salaireNetMin ? this.searchDeclarationCnss.salaireNetMin : environment.emptyForExport ,
            'Salaire net Max': this.searchDeclarationCnss.salaireNetMax ? this.searchDeclarationCnss.salaireNetMax : environment.emptyForExport ,
            'Salaire brut Min': this.searchDeclarationCnss.salaireBrutMin ? this.searchDeclarationCnss.salaireBrutMin : environment.emptyForExport ,
            'Salaire brut Max': this.searchDeclarationCnss.salaireBrutMax ? this.searchDeclarationCnss.salaireBrutMax : environment.emptyForExport ,
            'Salaire imposable Min': this.searchDeclarationCnss.salaireImposableMin ? this.searchDeclarationCnss.salaireImposableMin : environment.emptyForExport ,
            'Salaire imposable Max': this.searchDeclarationCnss.salaireImposableMax ? this.searchDeclarationCnss.salaireImposableMax : environment.emptyForExport ,
            'Montant total Min': this.searchDeclarationCnss.montantTotalMin ? this.searchDeclarationCnss.montantTotalMin : environment.emptyForExport ,
            'Montant total Max': this.searchDeclarationCnss.montantTotalMax ? this.searchDeclarationCnss.montantTotalMax : environment.emptyForExport ,
            'Mois Min': this.searchDeclarationCnss.moisMin ? this.searchDeclarationCnss.moisMin : environment.emptyForExport ,
            'Mois Max': this.searchDeclarationCnss.moisMax ? this.searchDeclarationCnss.moisMax : environment.emptyForExport ,
            'Annee Min': this.searchDeclarationCnss.anneeMin ? this.searchDeclarationCnss.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchDeclarationCnss.anneeMax ? this.searchDeclarationCnss.anneeMax : environment.emptyForExport ,
        'Societe': this.searchDeclarationCnss.societeVo?.id ? this.searchDeclarationCnss.societeVo?.id : environment.emptyForExport ,
            'Archive': this.searchDeclarationCnss.archive ? (this.searchDeclarationCnss.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDeclarationCnss.dateArchivageMin ? this.datePipe.transform(this.searchDeclarationCnss.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDeclarationCnss.dateArchivageMax ? this.datePipe.transform(this.searchDeclarationCnss.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDeclarationCnss.dateCreationMin ? this.datePipe.transform(this.searchDeclarationCnss.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDeclarationCnss.dateCreationMax ? this.datePipe.transform(this.searchDeclarationCnss.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDeclarationCnss.admin ? (this.searchDeclarationCnss.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDeclarationCnss.visible ? (this.searchDeclarationCnss.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDeclarationCnss.username ? this.searchDeclarationCnss.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get declarationCnsss(): Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
    set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }

    get declarationCnssSelections(): Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnssSelections;
       }
    set declarationCnssSelections(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnssSelections = value;
       }
   
     


    get selectedDeclarationCnss():DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
    set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
    
    get createDeclarationCnssDialog():boolean {
           return this.declarationCnssService.createDeclarationCnssDialog;
       }
    set createDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.createDeclarationCnssDialog= value;
       }
    
    get editDeclarationCnssDialog():boolean {
           return this.declarationCnssService.editDeclarationCnssDialog;
       }
    set editDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.editDeclarationCnssDialog= value;
       }
    get viewDeclarationCnssDialog():boolean {
           return this.declarationCnssService.viewDeclarationCnssDialog;
       }
    set viewDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.viewDeclarationCnssDialog = value;
       }
       
     get searchDeclarationCnss(): DeclarationCnssVo {
        return this.declarationCnssService.searchDeclarationCnss;
       }
    set searchDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.searchDeclarationCnss = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
