import {Component, OnInit} from '@angular/core';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
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
  selector: 'app-tva-list-chercheur',
  templateUrl: './tva-list-chercheur.component.html',
  styleUrls: ['./tva-list-chercheur.component.css']
})
export class TvaListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Tva';


    constructor(private datePipe: DatePipe, private tvaService: TvaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTvas();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTvas(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Tva', 'list');
        isPermistted ? this.tvaService.findAll().subscribe(tvas => this.tvas = tvas,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tvaService.findByCriteria(this.searchTva).subscribe(tvas=>{
            
            this.tvas = tvas;
           // this.searchTva = new TvaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'pourcentage', header: 'Pourcentage'},
        ];
    }
    
    public async editTva(tva:TvaVo){
        const isPermistted = await this.roleService.isPermitted('Tva', 'edit');
         if(isPermistted){
          this.tvaService.findByIdWithAssociatedList(tva).subscribe(res => {
           this.selectedTva = res;
            this.editTvaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTva(tva:TvaVo){
        const isPermistted = await this.roleService.isPermitted('Tva', 'view');
        if(isPermistted){
           this.tvaService.findByIdWithAssociatedList(tva).subscribe(res => {
           this.selectedTva = res;
            this.viewTvaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTva(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTva = new TvaVo();
            this.createTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTva(tva:TvaVo){
       const isPermistted = await this.roleService.isPermitted('Tva', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Tva) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tvaService.delete(tva).subscribe(status=>{
                          if(status > 0){
                          const position = this.tvas.indexOf(tva);
                          position > -1 ? this.tvas.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tva Supprimé',
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


public async duplicateTva(tva: TvaVo) {

     this.tvaService.findByIdWithAssociatedList(tva).subscribe(
	 res => {
	       this.initDuplicateTva(res);
	       this.selectedTva = res;
	       this.selectedTva.id = null;
            this.createTvaDialog = true;

});

	}

	initDuplicateTva(res: TvaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.tvas.map(e => {
    return {
                    'Reference': e.reference ,
                    'Pourcentage': e.pourcentage ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTva.reference ? this.searchTva.reference : environment.emptyForExport ,
            'Pourcentage Min': this.searchTva.pourcentageMin ? this.searchTva.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchTva.pourcentageMax ? this.searchTva.pourcentageMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tvas(): Array<TvaVo> {
           return this.tvaService.tvas;
       }
    set tvas(value: Array<TvaVo>) {
        this.tvaService.tvas = value;
       }

    get tvaSelections(): Array<TvaVo> {
           return this.tvaService.tvaSelections;
       }
    set tvaSelections(value: Array<TvaVo>) {
        this.tvaService.tvaSelections = value;
       }
   
     


    get selectedTva():TvaVo {
           return this.tvaService.selectedTva;
       }
    set selectedTva(value: TvaVo) {
        this.tvaService.selectedTva = value;
       }
    
    get createTvaDialog():boolean {
           return this.tvaService.createTvaDialog;
       }
    set createTvaDialog(value: boolean) {
        this.tvaService.createTvaDialog= value;
       }
    
    get editTvaDialog():boolean {
           return this.tvaService.editTvaDialog;
       }
    set editTvaDialog(value: boolean) {
        this.tvaService.editTvaDialog= value;
       }
    get viewTvaDialog():boolean {
           return this.tvaService.viewTvaDialog;
       }
    set viewTvaDialog(value: boolean) {
        this.tvaService.viewTvaDialog = value;
       }
       
     get searchTva(): TvaVo {
        return this.tvaService.searchTva;
       }
    set searchTva(value: TvaVo) {
        this.tvaService.searchTva = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
