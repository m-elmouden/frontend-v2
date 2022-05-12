import {Component, OnInit} from '@angular/core';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-taux-is-config-list-societe',
  templateUrl: './taux-is-config-list-societe.component.html',
  styleUrls: ['./taux-is-config-list-societe.component.css']
})
export class TauxIsConfigListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TauxIsConfig';


    constructor(private datePipe: DatePipe, private tauxIsConfigService: TauxIsConfigService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTauxIsConfigs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTauxIsConfigs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'list');
        isPermistted ? this.tauxIsConfigService.findAll().subscribe(tauxIsConfigs => this.tauxIsConfigs = tauxIsConfigs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tauxIsConfigService.findByCriteria(this.searchTauxIsConfig).subscribe(tauxIsConfigs=>{
            
            this.tauxIsConfigs = tauxIsConfigs;
           // this.searchTauxIsConfig = new TauxIsConfigVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'cotisationMinimale', header: 'Cotisation minimale'},
                            {field: 'dateMin', header: 'Date min'},
                            {field: 'dateMax', header: 'Date max'},
        ];
    }
    
    public async editTauxIsConfig(tauxIsConfig:TauxIsConfigVo){
        const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'edit');
         if(isPermistted){
          this.tauxIsConfigService.findByIdWithAssociatedList(tauxIsConfig).subscribe(res => {
           this.selectedTauxIsConfig = res;
            this.selectedTauxIsConfig.dateMin = new Date(tauxIsConfig.dateMin);
            this.selectedTauxIsConfig.dateMax = new Date(tauxIsConfig.dateMax);
            this.editTauxIsConfigDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTauxIsConfig(tauxIsConfig:TauxIsConfigVo){
        const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'view');
        if(isPermistted){
           this.tauxIsConfigService.findByIdWithAssociatedList(tauxIsConfig).subscribe(res => {
           this.selectedTauxIsConfig = res;
            this.selectedTauxIsConfig.dateMin = new Date(tauxIsConfig.dateMin);
            this.selectedTauxIsConfig.dateMax = new Date(tauxIsConfig.dateMax);
            this.viewTauxIsConfigDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTauxIsConfig(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTauxIsConfig = new TauxIsConfigVo();
            this.createTauxIsConfigDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTauxIsConfig(tauxIsConfig:TauxIsConfigVo){
       const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Taux is config) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tauxIsConfigService.delete(tauxIsConfig).subscribe(status=>{
                          if(status > 0){
                          const position = this.tauxIsConfigs.indexOf(tauxIsConfig);
                          position > -1 ? this.tauxIsConfigs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Taux is config Supprimé',
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


public async duplicateTauxIsConfig(tauxIsConfig: TauxIsConfigVo) {

     this.tauxIsConfigService.findByIdWithAssociatedList(tauxIsConfig).subscribe(
	 res => {
	       this.initDuplicateTauxIsConfig(res);
	       this.selectedTauxIsConfig = res;
	       this.selectedTauxIsConfig.id = null;
            this.createTauxIsConfigDialog = true;

});

	}

	initDuplicateTauxIsConfig(res: TauxIsConfigVo) {
        if (res.tauxIssVo != null) {
             res.tauxIssVo.forEach(d => { d.tauxIsConfigVo = null; d.id = null; });
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
    this.exportData = this.tauxIsConfigs.map(e => {
    return {
                    'Reference': e.reference ,
                    'Cotisation minimale': e.cotisationMinimale ,
                    'Date min': this.datePipe.transform(e.dateMin , 'dd-MM-yyyy'),
                    'Date max': this.datePipe.transform(e.dateMax , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTauxIsConfig.reference ? this.searchTauxIsConfig.reference : environment.emptyForExport ,
            'Cotisation minimale Min': this.searchTauxIsConfig.cotisationMinimaleMin ? this.searchTauxIsConfig.cotisationMinimaleMin : environment.emptyForExport ,
            'Cotisation minimale Max': this.searchTauxIsConfig.cotisationMinimaleMax ? this.searchTauxIsConfig.cotisationMinimaleMax : environment.emptyForExport ,
            'Date min Min': this.searchTauxIsConfig.dateMinMin ? this.datePipe.transform(this.searchTauxIsConfig.dateMinMin , this.dateFormat) : environment.emptyForExport ,
            'Date min Max': this.searchTauxIsConfig.dateMinMax ? this.datePipe.transform(this.searchTauxIsConfig.dateMinMax , this.dateFormat) : environment.emptyForExport ,
            'Date max Min': this.searchTauxIsConfig.dateMaxMin ? this.datePipe.transform(this.searchTauxIsConfig.dateMaxMin , this.dateFormat) : environment.emptyForExport ,
            'Date max Max': this.searchTauxIsConfig.dateMaxMax ? this.datePipe.transform(this.searchTauxIsConfig.dateMaxMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tauxIsConfigs(): Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
    set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }

    get tauxIsConfigSelections(): Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigSelections;
       }
    set tauxIsConfigSelections(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigSelections = value;
       }
   
     


    get selectedTauxIsConfig():TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
    set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
    
    get createTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.createTauxIsConfigDialog;
       }
    set createTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.createTauxIsConfigDialog= value;
       }
    
    get editTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.editTauxIsConfigDialog;
       }
    set editTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.editTauxIsConfigDialog= value;
       }
    get viewTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.viewTauxIsConfigDialog;
       }
    set viewTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.viewTauxIsConfigDialog = value;
       }
       
     get searchTauxIsConfig(): TauxIsConfigVo {
        return this.tauxIsConfigService.searchTauxIsConfig;
       }
    set searchTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.searchTauxIsConfig = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
