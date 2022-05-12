import {Component, OnInit} from '@angular/core';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DemandeService } from '../../../../../../controller/service/Demande.service';

import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-demande-piece-jointe-list-societe',
  templateUrl: './demande-piece-jointe-list-societe.component.html',
  styleUrls: ['./demande-piece-jointe-list-societe.component.css']
})
export class DemandePieceJointeListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DemandePieceJointe';
    demandes :Array<DemandeVo>;


    constructor(private datePipe: DatePipe, private demandePieceJointeService: DemandePieceJointeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private demandeService: DemandeService
) { }

    ngOnInit(): void {
      this.loadDemandePieceJointes();
      this.initExport();
      this.initCol();
      this.loadDemande();
    }
    
    // methods
      public async loadDemandePieceJointes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DemandePieceJointe', 'list');
        isPermistted ? this.demandePieceJointeService.findAll().subscribe(demandePieceJointes => this.demandePieceJointes = demandePieceJointes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.demandePieceJointeService.findByCriteria(this.searchDemandePieceJointe).subscribe(demandePieceJointes=>{
            
            this.demandePieceJointes = demandePieceJointes;
           // this.searchDemandePieceJointe = new DemandePieceJointeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'name', header: 'Name'},
                            {field: 'path', header: 'Path'},
                        {field: 'demande?.reference', header: 'Demande'},
        ];
    }
    
    public async editDemandePieceJointe(demandePieceJointe:DemandePieceJointeVo){
        const isPermistted = await this.roleService.isPermitted('DemandePieceJointe', 'edit');
         if(isPermistted){
          this.demandePieceJointeService.findByIdWithAssociatedList(demandePieceJointe).subscribe(res => {
           this.selectedDemandePieceJointe = res;
            this.editDemandePieceJointeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDemandePieceJointe(demandePieceJointe:DemandePieceJointeVo){
        const isPermistted = await this.roleService.isPermitted('DemandePieceJointe', 'view');
        if(isPermistted){
           this.demandePieceJointeService.findByIdWithAssociatedList(demandePieceJointe).subscribe(res => {
           this.selectedDemandePieceJointe = res;
            this.viewDemandePieceJointeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDemandePieceJointe(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDemandePieceJointe = new DemandePieceJointeVo();
            this.createDemandePieceJointeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDemandePieceJointe(demandePieceJointe:DemandePieceJointeVo){
       const isPermistted = await this.roleService.isPermitted('DemandePieceJointe', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Demande piece jointe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.demandePieceJointeService.delete(demandePieceJointe).subscribe(status=>{
                          if(status > 0){
                          const position = this.demandePieceJointes.indexOf(demandePieceJointe);
                          position > -1 ? this.demandePieceJointes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Demande piece jointe Supprimé',
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

public async loadDemande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandePieceJointe', 'list');
    isPermistted ? this.demandeService.findAll().subscribe(demandes => this.demandes = demandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDemandePieceJointe(demandePieceJointe: DemandePieceJointeVo) {

     this.demandePieceJointeService.findByIdWithAssociatedList(demandePieceJointe).subscribe(
	 res => {
	       this.initDuplicateDemandePieceJointe(res);
	       this.selectedDemandePieceJointe = res;
	       this.selectedDemandePieceJointe.id = null;
            this.createDemandePieceJointeDialog = true;

});

	}

	initDuplicateDemandePieceJointe(res: DemandePieceJointeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.demandePieceJointes.map(e => {
    return {
                    'Name': e.name ,
                    'Path': e.path ,
            'Demande': e.demandeVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Name': this.searchDemandePieceJointe.name ? this.searchDemandePieceJointe.name : environment.emptyForExport ,
            'Path': this.searchDemandePieceJointe.path ? this.searchDemandePieceJointe.path : environment.emptyForExport ,
        'Demande': this.searchDemandePieceJointe.demandeVo?.reference ? this.searchDemandePieceJointe.demandeVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get demandePieceJointes(): Array<DemandePieceJointeVo> {
           return this.demandePieceJointeService.demandePieceJointes;
       }
    set demandePieceJointes(value: Array<DemandePieceJointeVo>) {
        this.demandePieceJointeService.demandePieceJointes = value;
       }

    get demandePieceJointeSelections(): Array<DemandePieceJointeVo> {
           return this.demandePieceJointeService.demandePieceJointeSelections;
       }
    set demandePieceJointeSelections(value: Array<DemandePieceJointeVo>) {
        this.demandePieceJointeService.demandePieceJointeSelections = value;
       }
   
     


    get selectedDemandePieceJointe():DemandePieceJointeVo {
           return this.demandePieceJointeService.selectedDemandePieceJointe;
       }
    set selectedDemandePieceJointe(value: DemandePieceJointeVo) {
        this.demandePieceJointeService.selectedDemandePieceJointe = value;
       }
    
    get createDemandePieceJointeDialog():boolean {
           return this.demandePieceJointeService.createDemandePieceJointeDialog;
       }
    set createDemandePieceJointeDialog(value: boolean) {
        this.demandePieceJointeService.createDemandePieceJointeDialog= value;
       }
    
    get editDemandePieceJointeDialog():boolean {
           return this.demandePieceJointeService.editDemandePieceJointeDialog;
       }
    set editDemandePieceJointeDialog(value: boolean) {
        this.demandePieceJointeService.editDemandePieceJointeDialog= value;
       }
    get viewDemandePieceJointeDialog():boolean {
           return this.demandePieceJointeService.viewDemandePieceJointeDialog;
       }
    set viewDemandePieceJointeDialog(value: boolean) {
        this.demandePieceJointeService.viewDemandePieceJointeDialog = value;
       }
       
     get searchDemandePieceJointe(): DemandePieceJointeVo {
        return this.demandePieceJointeService.searchDemandePieceJointe;
       }
    set searchDemandePieceJointe(value: DemandePieceJointeVo) {
        this.demandePieceJointeService.searchDemandePieceJointe = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
