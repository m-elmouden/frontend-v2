import {Component, OnInit} from '@angular/core';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SocieteService } from '../../../../../../controller/service/Societe.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-president-societe-list-chercheur',
  templateUrl: './president-societe-list-chercheur.component.html',
  styleUrls: ['./president-societe-list-chercheur.component.css']
})
export class PresidentSocieteListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PresidentSociete';
    societes :Array<SocieteVo>;


    constructor(private datePipe: DatePipe, private presidentSocieteService: PresidentSocieteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private societeService: SocieteService
) { }

    ngOnInit(): void {
      this.loadPresidentSocietes();
      this.initExport();
      this.initCol();
      this.loadSociete();
    }
    
    // methods
      public async loadPresidentSocietes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'list');
        isPermistted ? this.presidentSocieteService.findAll().subscribe(presidentSocietes => this.presidentSocietes = presidentSocietes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.presidentSocieteService.findByCriteria(this.searchPresidentSociete).subscribe(presidentSocietes=>{
            
            this.presidentSocietes = presidentSocietes;
           // this.searchPresidentSociete = new PresidentSocieteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'cin', header: 'Cin'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'email', header: 'Email'},
                            {field: 'telephone', header: 'Telephone'},
                        {field: 'societe?.id', header: 'Societe'},
        ];
    }
    
    public async editPresidentSociete(presidentSociete:PresidentSocieteVo){
        const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'edit');
         if(isPermistted){
          this.presidentSocieteService.findByIdWithAssociatedList(presidentSociete).subscribe(res => {
           this.selectedPresidentSociete = res;
            this.editPresidentSocieteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPresidentSociete(presidentSociete:PresidentSocieteVo){
        const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'view');
        if(isPermistted){
           this.presidentSocieteService.findByIdWithAssociatedList(presidentSociete).subscribe(res => {
           this.selectedPresidentSociete = res;
            this.viewPresidentSocieteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePresidentSociete(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPresidentSociete = new PresidentSocieteVo();
            this.createPresidentSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePresidentSociete(presidentSociete:PresidentSocieteVo){
       const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (President societe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.presidentSocieteService.delete(presidentSociete).subscribe(status=>{
                          if(status > 0){
                          const position = this.presidentSocietes.indexOf(presidentSociete);
                          position > -1 ? this.presidentSocietes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'President societe Supprimé',
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

public async loadSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PresidentSociete', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePresidentSociete(presidentSociete: PresidentSocieteVo) {

     this.presidentSocieteService.findByIdWithAssociatedList(presidentSociete).subscribe(
	 res => {
	       this.initDuplicatePresidentSociete(res);
	       this.selectedPresidentSociete = res;
	       this.selectedPresidentSociete.id = null;
            this.createPresidentSocieteDialog = true;

});

	}

	initDuplicatePresidentSociete(res: PresidentSocieteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.presidentSocietes.map(e => {
    return {
                    'Cin': e.cin ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
                    'Email': e.email ,
                    'Telephone': e.telephone ,
            'Societe': e.societeVo?.id ,
     }
      });

      this.criteriaData = [{
            'Cin': this.searchPresidentSociete.cin ? this.searchPresidentSociete.cin : environment.emptyForExport ,
            'Nom': this.searchPresidentSociete.nom ? this.searchPresidentSociete.nom : environment.emptyForExport ,
            'Prenom': this.searchPresidentSociete.prenom ? this.searchPresidentSociete.prenom : environment.emptyForExport ,
            'Email': this.searchPresidentSociete.email ? this.searchPresidentSociete.email : environment.emptyForExport ,
            'Telephone': this.searchPresidentSociete.telephone ? this.searchPresidentSociete.telephone : environment.emptyForExport ,
        'Societe': this.searchPresidentSociete.societeVo?.id ? this.searchPresidentSociete.societeVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get presidentSocietes(): Array<PresidentSocieteVo> {
           return this.presidentSocieteService.presidentSocietes;
       }
    set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }

    get presidentSocieteSelections(): Array<PresidentSocieteVo> {
           return this.presidentSocieteService.presidentSocieteSelections;
       }
    set presidentSocieteSelections(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocieteSelections = value;
       }
   
     


    get selectedPresidentSociete():PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
    set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }
    
    get createPresidentSocieteDialog():boolean {
           return this.presidentSocieteService.createPresidentSocieteDialog;
       }
    set createPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.createPresidentSocieteDialog= value;
       }
    
    get editPresidentSocieteDialog():boolean {
           return this.presidentSocieteService.editPresidentSocieteDialog;
       }
    set editPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.editPresidentSocieteDialog= value;
       }
    get viewPresidentSocieteDialog():boolean {
           return this.presidentSocieteService.viewPresidentSocieteDialog;
       }
    set viewPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.viewPresidentSocieteDialog = value;
       }
       
     get searchPresidentSociete(): PresidentSocieteVo {
        return this.presidentSocieteService.searchPresidentSociete;
       }
    set searchPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.searchPresidentSociete = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
