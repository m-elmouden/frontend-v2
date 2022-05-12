import {Component, OnInit} from '@angular/core';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TauxIsConfigService } from '../../../../../../controller/service/TauxIsConfig.service';

import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-taux-is-list-chercheur',
  templateUrl: './taux-is-list-chercheur.component.html',
  styleUrls: ['./taux-is-list-chercheur.component.css']
})
export class TauxIsListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TauxIs';
    tauxIsConfigs :Array<TauxIsConfigVo>;


    constructor(private datePipe: DatePipe, private tauxIsService: TauxIsService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private tauxIsConfigService: TauxIsConfigService
) { }

    ngOnInit(): void {
      this.loadTauxIss();
      this.initExport();
      this.initCol();
      this.loadTauxIsConfig();
    }
    
    // methods
      public async loadTauxIss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TauxIs', 'list');
        isPermistted ? this.tauxIsService.findAll().subscribe(tauxIss => this.tauxIss = tauxIss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tauxIsService.findByCriteria(this.searchTauxIs).subscribe(tauxIss=>{
            
            this.tauxIss = tauxIss;
           // this.searchTauxIs = new TauxIsVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'resultatFiscalMin', header: 'Resultat fiscal min'},
                            {field: 'resultatFiscalMax', header: 'Resultat fiscal max'},
                            {field: 'pourcentage', header: 'Pourcentage'},
                            {field: 'penalite', header: 'Penalite'},
                        {field: 'tauxIsConfig?.reference', header: 'Taux is config'},
        ];
    }
    
    public async editTauxIs(tauxIs:TauxIsVo){
        const isPermistted = await this.roleService.isPermitted('TauxIs', 'edit');
         if(isPermistted){
          this.tauxIsService.findByIdWithAssociatedList(tauxIs).subscribe(res => {
           this.selectedTauxIs = res;
            this.editTauxIsDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTauxIs(tauxIs:TauxIsVo){
        const isPermistted = await this.roleService.isPermitted('TauxIs', 'view');
        if(isPermistted){
           this.tauxIsService.findByIdWithAssociatedList(tauxIs).subscribe(res => {
           this.selectedTauxIs = res;
            this.viewTauxIsDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTauxIs(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTauxIs = new TauxIsVo();
            this.createTauxIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTauxIs(tauxIs:TauxIsVo){
       const isPermistted = await this.roleService.isPermitted('TauxIs', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Taux is) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tauxIsService.delete(tauxIs).subscribe(status=>{
                          if(status > 0){
                          const position = this.tauxIss.indexOf(tauxIs);
                          position > -1 ? this.tauxIss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Taux is Supprimé',
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

public async loadTauxIsConfig(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TauxIs', 'list');
    isPermistted ? this.tauxIsConfigService.findAll().subscribe(tauxIsConfigs => this.tauxIsConfigs = tauxIsConfigs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTauxIs(tauxIs: TauxIsVo) {

     this.tauxIsService.findByIdWithAssociatedList(tauxIs).subscribe(
	 res => {
	       this.initDuplicateTauxIs(res);
	       this.selectedTauxIs = res;
	       this.selectedTauxIs.id = null;
            this.createTauxIsDialog = true;

});

	}

	initDuplicateTauxIs(res: TauxIsVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.tauxIss.map(e => {
    return {
                    'Reference': e.reference ,
                    'Resultat fiscal min': e.resultatFiscalMin ,
                    'Resultat fiscal max': e.resultatFiscalMax ,
                    'Pourcentage': e.pourcentage ,
                    'Penalite': e.penalite ,
            'Taux is config': e.tauxIsConfigVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTauxIs.reference ? this.searchTauxIs.reference : environment.emptyForExport ,
            'Resultat fiscal min Min': this.searchTauxIs.resultatFiscalMinMin ? this.searchTauxIs.resultatFiscalMinMin : environment.emptyForExport ,
            'Resultat fiscal min Max': this.searchTauxIs.resultatFiscalMinMax ? this.searchTauxIs.resultatFiscalMinMax : environment.emptyForExport ,
            'Resultat fiscal max Min': this.searchTauxIs.resultatFiscalMaxMin ? this.searchTauxIs.resultatFiscalMaxMin : environment.emptyForExport ,
            'Resultat fiscal max Max': this.searchTauxIs.resultatFiscalMaxMax ? this.searchTauxIs.resultatFiscalMaxMax : environment.emptyForExport ,
            'Pourcentage Min': this.searchTauxIs.pourcentageMin ? this.searchTauxIs.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchTauxIs.pourcentageMax ? this.searchTauxIs.pourcentageMax : environment.emptyForExport ,
            'Penalite Min': this.searchTauxIs.penaliteMin ? this.searchTauxIs.penaliteMin : environment.emptyForExport ,
            'Penalite Max': this.searchTauxIs.penaliteMax ? this.searchTauxIs.penaliteMax : environment.emptyForExport ,
        'Taux is config': this.searchTauxIs.tauxIsConfigVo?.reference ? this.searchTauxIs.tauxIsConfigVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tauxIss(): Array<TauxIsVo> {
           return this.tauxIsService.tauxIss;
       }
    set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }

    get tauxIsSelections(): Array<TauxIsVo> {
           return this.tauxIsService.tauxIsSelections;
       }
    set tauxIsSelections(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIsSelections = value;
       }
   
     


    get selectedTauxIs():TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
    set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }
    
    get createTauxIsDialog():boolean {
           return this.tauxIsService.createTauxIsDialog;
       }
    set createTauxIsDialog(value: boolean) {
        this.tauxIsService.createTauxIsDialog= value;
       }
    
    get editTauxIsDialog():boolean {
           return this.tauxIsService.editTauxIsDialog;
       }
    set editTauxIsDialog(value: boolean) {
        this.tauxIsService.editTauxIsDialog= value;
       }
    get viewTauxIsDialog():boolean {
           return this.tauxIsService.viewTauxIsDialog;
       }
    set viewTauxIsDialog(value: boolean) {
        this.tauxIsService.viewTauxIsDialog = value;
       }
       
     get searchTauxIs(): TauxIsVo {
        return this.tauxIsService.searchTauxIs;
       }
    set searchTauxIs(value: TauxIsVo) {
        this.tauxIsService.searchTauxIs = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
