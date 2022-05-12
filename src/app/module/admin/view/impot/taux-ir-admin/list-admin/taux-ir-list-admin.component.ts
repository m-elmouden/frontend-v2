import {Component, OnInit} from '@angular/core';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-taux-ir-list-admin',
  templateUrl: './taux-ir-list-admin.component.html',
  styleUrls: ['./taux-ir-list-admin.component.css']
})
export class TauxIrListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TauxIr';


    constructor(private datePipe: DatePipe, private tauxIrService: TauxIrService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTauxIrs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTauxIrs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TauxIr', 'list');
        isPermistted ? this.tauxIrService.findAll().subscribe(tauxIrs => this.tauxIrs = tauxIrs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tauxIrService.findByCriteria(this.searchTauxIr).subscribe(tauxIrs=>{
            
            this.tauxIrs = tauxIrs;
           // this.searchTauxIr = new TauxIrVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'dateMin', header: 'Date min'},
                            {field: 'dateMax', header: 'Date max'},
                            {field: 'salaireImpoMin', header: 'Salaire impo min'},
                            {field: 'salaireImpoMax', header: 'Salaire impo max'},
                            {field: 'forfaitDeduit', header: 'Forfait deduit'},
                            {field: 'pourcentage', header: 'Pourcentage'},
        ];
    }
    
    public async editTauxIr(tauxIr:TauxIrVo){
        const isPermistted = await this.roleService.isPermitted('TauxIr', 'edit');
         if(isPermistted){
          this.tauxIrService.findByIdWithAssociatedList(tauxIr).subscribe(res => {
           this.selectedTauxIr = res;
            this.selectedTauxIr.dateMin = new Date(tauxIr.dateMin);
            this.selectedTauxIr.dateMax = new Date(tauxIr.dateMax);
            this.editTauxIrDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTauxIr(tauxIr:TauxIrVo){
        const isPermistted = await this.roleService.isPermitted('TauxIr', 'view');
        if(isPermistted){
           this.tauxIrService.findByIdWithAssociatedList(tauxIr).subscribe(res => {
           this.selectedTauxIr = res;
            this.selectedTauxIr.dateMin = new Date(tauxIr.dateMin);
            this.selectedTauxIr.dateMax = new Date(tauxIr.dateMax);
            this.viewTauxIrDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTauxIr(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTauxIr = new TauxIrVo();
            this.createTauxIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTauxIr(tauxIr:TauxIrVo){
       const isPermistted = await this.roleService.isPermitted('TauxIr', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Taux ir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tauxIrService.delete(tauxIr).subscribe(status=>{
                          if(status > 0){
                          const position = this.tauxIrs.indexOf(tauxIr);
                          position > -1 ? this.tauxIrs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Taux ir Supprimé',
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


public async duplicateTauxIr(tauxIr: TauxIrVo) {

     this.tauxIrService.findByIdWithAssociatedList(tauxIr).subscribe(
	 res => {
	       this.initDuplicateTauxIr(res);
	       this.selectedTauxIr = res;
	       this.selectedTauxIr.id = null;
            this.createTauxIrDialog = true;

});

	}

	initDuplicateTauxIr(res: TauxIrVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.tauxIrs.map(e => {
    return {
                    'Date min': this.datePipe.transform(e.dateMin , 'dd-MM-yyyy'),
                    'Date max': this.datePipe.transform(e.dateMax , 'dd-MM-yyyy'),
                    'Salaire impo min': e.salaireImpoMin ,
                    'Salaire impo max': e.salaireImpoMax ,
                    'Forfait deduit': e.forfaitDeduit ,
                    'Pourcentage': e.pourcentage ,
     }
      });

      this.criteriaData = [{
            'Date min Min': this.searchTauxIr.dateMinMin ? this.datePipe.transform(this.searchTauxIr.dateMinMin , this.dateFormat) : environment.emptyForExport ,
            'Date min Max': this.searchTauxIr.dateMinMax ? this.datePipe.transform(this.searchTauxIr.dateMinMax , this.dateFormat) : environment.emptyForExport ,
            'Date max Min': this.searchTauxIr.dateMaxMin ? this.datePipe.transform(this.searchTauxIr.dateMaxMin , this.dateFormat) : environment.emptyForExport ,
            'Date max Max': this.searchTauxIr.dateMaxMax ? this.datePipe.transform(this.searchTauxIr.dateMaxMax , this.dateFormat) : environment.emptyForExport ,
            'Salaire impo min Min': this.searchTauxIr.salaireImpoMinMin ? this.searchTauxIr.salaireImpoMinMin : environment.emptyForExport ,
            'Salaire impo min Max': this.searchTauxIr.salaireImpoMinMax ? this.searchTauxIr.salaireImpoMinMax : environment.emptyForExport ,
            'Salaire impo max Min': this.searchTauxIr.salaireImpoMaxMin ? this.searchTauxIr.salaireImpoMaxMin : environment.emptyForExport ,
            'Salaire impo max Max': this.searchTauxIr.salaireImpoMaxMax ? this.searchTauxIr.salaireImpoMaxMax : environment.emptyForExport ,
            'Forfait deduit Min': this.searchTauxIr.forfaitDeduitMin ? this.searchTauxIr.forfaitDeduitMin : environment.emptyForExport ,
            'Forfait deduit Max': this.searchTauxIr.forfaitDeduitMax ? this.searchTauxIr.forfaitDeduitMax : environment.emptyForExport ,
            'Pourcentage Min': this.searchTauxIr.pourcentageMin ? this.searchTauxIr.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchTauxIr.pourcentageMax ? this.searchTauxIr.pourcentageMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tauxIrs(): Array<TauxIrVo> {
           return this.tauxIrService.tauxIrs;
       }
    set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
       }

    get tauxIrSelections(): Array<TauxIrVo> {
           return this.tauxIrService.tauxIrSelections;
       }
    set tauxIrSelections(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrSelections = value;
       }
   
     


    get selectedTauxIr():TauxIrVo {
           return this.tauxIrService.selectedTauxIr;
       }
    set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
       }
    
    get createTauxIrDialog():boolean {
           return this.tauxIrService.createTauxIrDialog;
       }
    set createTauxIrDialog(value: boolean) {
        this.tauxIrService.createTauxIrDialog= value;
       }
    
    get editTauxIrDialog():boolean {
           return this.tauxIrService.editTauxIrDialog;
       }
    set editTauxIrDialog(value: boolean) {
        this.tauxIrService.editTauxIrDialog= value;
       }
    get viewTauxIrDialog():boolean {
           return this.tauxIrService.viewTauxIrDialog;
       }
    set viewTauxIrDialog(value: boolean) {
        this.tauxIrService.viewTauxIrDialog = value;
       }
       
     get searchTauxIr(): TauxIrVo {
        return this.tauxIrService.searchTauxIr;
       }
    set searchTauxIr(value: TauxIrVo) {
        this.tauxIrService.searchTauxIr = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
