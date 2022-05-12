import {Component, OnInit} from '@angular/core';
import {FacturePieceJointeService} from '../../../../../../controller/service/FacturePieceJointe.service';
import {FacturePieceJointeVo} from '../../../../../../controller/model/FacturePieceJointe.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FactureService } from '../../../../../../controller/service/Facture.service';

import {FactureVo} from '../../../../../../controller/model/Facture.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-facture-piece-jointe-list-societe',
  templateUrl: './facture-piece-jointe-list-societe.component.html',
  styleUrls: ['./facture-piece-jointe-list-societe.component.css']
})
export class FacturePieceJointeListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FacturePieceJointe';
    factures :Array<FactureVo>;


    constructor(private datePipe: DatePipe, private facturePieceJointeService: FacturePieceJointeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private factureService: FactureService
) { }

    ngOnInit(): void {
      this.loadFacturePieceJointes();
      this.initExport();
      this.initCol();
      this.loadFacture();
    }
    
    // methods
      public async loadFacturePieceJointes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FacturePieceJointe', 'list');
        isPermistted ? this.facturePieceJointeService.findAll().subscribe(facturePieceJointes => this.facturePieceJointes = facturePieceJointes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.facturePieceJointeService.findByCriteria(this.searchFacturePieceJointe).subscribe(facturePieceJointes=>{
            
            this.facturePieceJointes = facturePieceJointes;
           // this.searchFacturePieceJointe = new FacturePieceJointeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'name', header: 'Name'},
                            {field: 'path', header: 'Path'},
                        {field: 'facture?.libelle', header: 'Facture'},
        ];
    }
    
    public async editFacturePieceJointe(facturePieceJointe:FacturePieceJointeVo){
        const isPermistted = await this.roleService.isPermitted('FacturePieceJointe', 'edit');
         if(isPermistted){
          this.facturePieceJointeService.findByIdWithAssociatedList(facturePieceJointe).subscribe(res => {
           this.selectedFacturePieceJointe = res;
            this.editFacturePieceJointeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFacturePieceJointe(facturePieceJointe:FacturePieceJointeVo){
        const isPermistted = await this.roleService.isPermitted('FacturePieceJointe', 'view');
        if(isPermistted){
           this.facturePieceJointeService.findByIdWithAssociatedList(facturePieceJointe).subscribe(res => {
           this.selectedFacturePieceJointe = res;
            this.viewFacturePieceJointeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFacturePieceJointe(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFacturePieceJointe = new FacturePieceJointeVo();
            this.createFacturePieceJointeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFacturePieceJointe(facturePieceJointe:FacturePieceJointeVo){
       const isPermistted = await this.roleService.isPermitted('FacturePieceJointe', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Facture piece jointe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.facturePieceJointeService.delete(facturePieceJointe).subscribe(status=>{
                          if(status > 0){
                          const position = this.facturePieceJointes.indexOf(facturePieceJointe);
                          position > -1 ? this.facturePieceJointes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Facture piece jointe Supprimé',
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

public async loadFacture(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FacturePieceJointe', 'list');
    isPermistted ? this.factureService.findAll().subscribe(factures => this.factures = factures,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFacturePieceJointe(facturePieceJointe: FacturePieceJointeVo) {

     this.facturePieceJointeService.findByIdWithAssociatedList(facturePieceJointe).subscribe(
	 res => {
	       this.initDuplicateFacturePieceJointe(res);
	       this.selectedFacturePieceJointe = res;
	       this.selectedFacturePieceJointe.id = null;
            this.createFacturePieceJointeDialog = true;

});

	}

	initDuplicateFacturePieceJointe(res: FacturePieceJointeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.facturePieceJointes.map(e => {
    return {
                    'Name': e.name ,
                    'Path': e.path ,
            'Facture': e.factureVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Name': this.searchFacturePieceJointe.name ? this.searchFacturePieceJointe.name : environment.emptyForExport ,
            'Path': this.searchFacturePieceJointe.path ? this.searchFacturePieceJointe.path : environment.emptyForExport ,
        'Facture': this.searchFacturePieceJointe.factureVo?.libelle ? this.searchFacturePieceJointe.factureVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get facturePieceJointes(): Array<FacturePieceJointeVo> {
           return this.facturePieceJointeService.facturePieceJointes;
       }
    set facturePieceJointes(value: Array<FacturePieceJointeVo>) {
        this.facturePieceJointeService.facturePieceJointes = value;
       }

    get facturePieceJointeSelections(): Array<FacturePieceJointeVo> {
           return this.facturePieceJointeService.facturePieceJointeSelections;
       }
    set facturePieceJointeSelections(value: Array<FacturePieceJointeVo>) {
        this.facturePieceJointeService.facturePieceJointeSelections = value;
       }
   
     


    get selectedFacturePieceJointe():FacturePieceJointeVo {
           return this.facturePieceJointeService.selectedFacturePieceJointe;
       }
    set selectedFacturePieceJointe(value: FacturePieceJointeVo) {
        this.facturePieceJointeService.selectedFacturePieceJointe = value;
       }
    
    get createFacturePieceJointeDialog():boolean {
           return this.facturePieceJointeService.createFacturePieceJointeDialog;
       }
    set createFacturePieceJointeDialog(value: boolean) {
        this.facturePieceJointeService.createFacturePieceJointeDialog= value;
       }
    
    get editFacturePieceJointeDialog():boolean {
           return this.facturePieceJointeService.editFacturePieceJointeDialog;
       }
    set editFacturePieceJointeDialog(value: boolean) {
        this.facturePieceJointeService.editFacturePieceJointeDialog= value;
       }
    get viewFacturePieceJointeDialog():boolean {
           return this.facturePieceJointeService.viewFacturePieceJointeDialog;
       }
    set viewFacturePieceJointeDialog(value: boolean) {
        this.facturePieceJointeService.viewFacturePieceJointeDialog = value;
       }
       
     get searchFacturePieceJointe(): FacturePieceJointeVo {
        return this.facturePieceJointeService.searchFacturePieceJointe;
       }
    set searchFacturePieceJointe(value: FacturePieceJointeVo) {
        this.facturePieceJointeService.searchFacturePieceJointe = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
