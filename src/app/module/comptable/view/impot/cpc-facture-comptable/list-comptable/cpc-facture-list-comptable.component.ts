import {Component, OnInit} from '@angular/core';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CpcService } from '../../../../../../controller/service/Cpc.service';
import { FactureService } from '../../../../../../controller/service/Facture.service';

import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-cpc-facture-list-comptable',
  templateUrl: './cpc-facture-list-comptable.component.html',
  styleUrls: ['./cpc-facture-list-comptable.component.css']
})
export class CpcFactureListComptableComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CpcFacture';
    cpcs :Array<CpcVo>;
    factures :Array<FactureVo>;


    constructor(private datePipe: DatePipe, private cpcFactureService: CpcFactureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private cpcService: CpcService
        , private factureService: FactureService
) { }

    ngOnInit(): void {
      this.loadCpcFactures();
      this.initExport();
      this.initCol();
      this.loadCpc();
      this.loadFacture();
    }
    
    // methods
      public async loadCpcFactures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CpcFacture', 'list');
        isPermistted ? this.cpcFactureService.findAll().subscribe(cpcFactures => this.cpcFactures = cpcFactures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.cpcFactureService.findByCriteria(this.searchCpcFacture).subscribe(cpcFactures=>{
            
            this.cpcFactures = cpcFactures;
           // this.searchCpcFacture = new CpcFactureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'cpc?.reference', header: 'Cpc'},
                        {field: 'facture?.libelle', header: 'Facture'},
        ];
    }
    
    public async editCpcFacture(cpcFacture:CpcFactureVo){
        const isPermistted = await this.roleService.isPermitted('CpcFacture', 'edit');
         if(isPermistted){
          this.cpcFactureService.findByIdWithAssociatedList(cpcFacture).subscribe(res => {
           this.selectedCpcFacture = res;
            this.editCpcFactureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCpcFacture(cpcFacture:CpcFactureVo){
        const isPermistted = await this.roleService.isPermitted('CpcFacture', 'view');
        if(isPermistted){
           this.cpcFactureService.findByIdWithAssociatedList(cpcFacture).subscribe(res => {
           this.selectedCpcFacture = res;
            this.viewCpcFactureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCpcFacture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCpcFacture = new CpcFactureVo();
            this.createCpcFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCpcFacture(cpcFacture:CpcFactureVo){
       const isPermistted = await this.roleService.isPermitted('CpcFacture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Cpc facture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.cpcFactureService.delete(cpcFacture).subscribe(status=>{
                          if(status > 0){
                          const position = this.cpcFactures.indexOf(cpcFacture);
                          position > -1 ? this.cpcFactures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Cpc facture Supprimé',
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

public async loadCpc(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CpcFacture', 'list');
    isPermistted ? this.cpcService.findAll().subscribe(cpcs => this.cpcs = cpcs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFacture(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CpcFacture', 'list');
    isPermistted ? this.factureService.findAll().subscribe(factures => this.factures = factures,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCpcFacture(cpcFacture: CpcFactureVo) {

     this.cpcFactureService.findByIdWithAssociatedList(cpcFacture).subscribe(
	 res => {
	       this.initDuplicateCpcFacture(res);
	       this.selectedCpcFacture = res;
	       this.selectedCpcFacture.id = null;
            this.createCpcFactureDialog = true;

});

	}

	initDuplicateCpcFacture(res: CpcFactureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.cpcFactures.map(e => {
    return {
            'Cpc': e.cpcVo?.reference ,
            'Facture': e.factureVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Cpc': this.searchCpcFacture.cpcVo?.reference ? this.searchCpcFacture.cpcVo?.reference : environment.emptyForExport ,
        'Facture': this.searchCpcFacture.factureVo?.libelle ? this.searchCpcFacture.factureVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get cpcFactures(): Array<CpcFactureVo> {
           return this.cpcFactureService.cpcFactures;
       }
    set cpcFactures(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactures = value;
       }

    get cpcFactureSelections(): Array<CpcFactureVo> {
           return this.cpcFactureService.cpcFactureSelections;
       }
    set cpcFactureSelections(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactureSelections = value;
       }
   
     


    get selectedCpcFacture():CpcFactureVo {
           return this.cpcFactureService.selectedCpcFacture;
       }
    set selectedCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.selectedCpcFacture = value;
       }
    
    get createCpcFactureDialog():boolean {
           return this.cpcFactureService.createCpcFactureDialog;
       }
    set createCpcFactureDialog(value: boolean) {
        this.cpcFactureService.createCpcFactureDialog= value;
       }
    
    get editCpcFactureDialog():boolean {
           return this.cpcFactureService.editCpcFactureDialog;
       }
    set editCpcFactureDialog(value: boolean) {
        this.cpcFactureService.editCpcFactureDialog= value;
       }
    get viewCpcFactureDialog():boolean {
           return this.cpcFactureService.viewCpcFactureDialog;
       }
    set viewCpcFactureDialog(value: boolean) {
        this.cpcFactureService.viewCpcFactureDialog = value;
       }
       
     get searchCpcFacture(): CpcFactureVo {
        return this.cpcFactureService.searchCpcFacture;
       }
    set searchCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.searchCpcFacture = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
