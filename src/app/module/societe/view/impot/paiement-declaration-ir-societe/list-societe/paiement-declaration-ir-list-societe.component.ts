import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DeclarationIrService } from '../../../../../../controller/service/DeclarationIr.service';

import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-paiement-declaration-ir-list-societe',
  templateUrl: './paiement-declaration-ir-list-societe.component.html',
  styleUrls: ['./paiement-declaration-ir-list-societe.component.css']
})
export class PaiementDeclarationIrListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaiementDeclarationIr';
    declarationIrs :Array<DeclarationIrVo>;


    constructor(private datePipe: DatePipe, private paiementDeclarationIrService: PaiementDeclarationIrService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private declarationIrService: DeclarationIrService
) { }

    ngOnInit(): void {
      this.loadPaiementDeclarationIrs();
      this.initExport();
      this.initCol();
      this.loadDeclarationIr();
    }
    
    // methods
      public async loadPaiementDeclarationIrs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'list');
        isPermistted ? this.paiementDeclarationIrService.findAll().subscribe(paiementDeclarationIrs => this.paiementDeclarationIrs = paiementDeclarationIrs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementDeclarationIrService.findByCriteria(this.searchPaiementDeclarationIr).subscribe(paiementDeclarationIrs=>{
            
            this.paiementDeclarationIrs = paiementDeclarationIrs;
           // this.searchPaiementDeclarationIr = new PaiementDeclarationIrVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'datePaiement', header: 'Date paiement'},
                            {field: 'total', header: 'Total'},
                            {field: 'montantCptTraiteur', header: 'Montant cpt traiteur'},
                            {field: 'montantCptValidateur', header: 'Montant cpt validateur'},
                            {field: 'reste', header: 'Reste'},
                        {field: 'declarationIr?.refrerence', header: 'Declaration ir'},
        ];
    }
    
    public async editPaiementDeclarationIr(paiementDeclarationIr:PaiementDeclarationIrVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'edit');
         if(isPermistted){
          this.paiementDeclarationIrService.findByIdWithAssociatedList(paiementDeclarationIr).subscribe(res => {
           this.selectedPaiementDeclarationIr = res;
            this.selectedPaiementDeclarationIr.datePaiement = new Date(paiementDeclarationIr.datePaiement);
            this.editPaiementDeclarationIrDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiementDeclarationIr(paiementDeclarationIr:PaiementDeclarationIrVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'view');
        if(isPermistted){
           this.paiementDeclarationIrService.findByIdWithAssociatedList(paiementDeclarationIr).subscribe(res => {
           this.selectedPaiementDeclarationIr = res;
            this.selectedPaiementDeclarationIr.datePaiement = new Date(paiementDeclarationIr.datePaiement);
            this.viewPaiementDeclarationIrDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiementDeclarationIr(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();
            this.createPaiementDeclarationIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiementDeclarationIr(paiementDeclarationIr:PaiementDeclarationIrVo){
       const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement declaration ir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementDeclarationIrService.delete(paiementDeclarationIr).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiementDeclarationIrs.indexOf(paiementDeclarationIr);
                          position > -1 ? this.paiementDeclarationIrs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement declaration ir Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'list');
    isPermistted ? this.declarationIrService.findAll().subscribe(declarationIrs => this.declarationIrs = declarationIrs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiementDeclarationIr(paiementDeclarationIr: PaiementDeclarationIrVo) {

     this.paiementDeclarationIrService.findByIdWithAssociatedList(paiementDeclarationIr).subscribe(
	 res => {
	       this.initDuplicatePaiementDeclarationIr(res);
	       this.selectedPaiementDeclarationIr = res;
	       this.selectedPaiementDeclarationIr.id = null;
            this.createPaiementDeclarationIrDialog = true;

});

	}

	initDuplicatePaiementDeclarationIr(res: PaiementDeclarationIrVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paiementDeclarationIrs.map(e => {
    return {
                    'Reference': e.reference ,
                    'Date paiement': this.datePipe.transform(e.datePaiement , 'dd-MM-yyyy'),
                    'Total': e.total ,
                    'Montant cpt traiteur': e.montantCptTraiteur ,
                    'Montant cpt validateur': e.montantCptValidateur ,
                    'Reste': e.reste ,
            'Declaration ir': e.declarationIrVo?.refrerence ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchPaiementDeclarationIr.reference ? this.searchPaiementDeclarationIr.reference : environment.emptyForExport ,
            'Date paiement Min': this.searchPaiementDeclarationIr.datePaiementMin ? this.datePipe.transform(this.searchPaiementDeclarationIr.datePaiementMin , this.dateFormat) : environment.emptyForExport ,
            'Date paiement Max': this.searchPaiementDeclarationIr.datePaiementMax ? this.datePipe.transform(this.searchPaiementDeclarationIr.datePaiementMax , this.dateFormat) : environment.emptyForExport ,
            'Total Min': this.searchPaiementDeclarationIr.totalMin ? this.searchPaiementDeclarationIr.totalMin : environment.emptyForExport ,
            'Total Max': this.searchPaiementDeclarationIr.totalMax ? this.searchPaiementDeclarationIr.totalMax : environment.emptyForExport ,
            'Montant cpt traiteur Min': this.searchPaiementDeclarationIr.montantCptTraiteurMin ? this.searchPaiementDeclarationIr.montantCptTraiteurMin : environment.emptyForExport ,
            'Montant cpt traiteur Max': this.searchPaiementDeclarationIr.montantCptTraiteurMax ? this.searchPaiementDeclarationIr.montantCptTraiteurMax : environment.emptyForExport ,
            'Montant cpt validateur Min': this.searchPaiementDeclarationIr.montantCptValidateurMin ? this.searchPaiementDeclarationIr.montantCptValidateurMin : environment.emptyForExport ,
            'Montant cpt validateur Max': this.searchPaiementDeclarationIr.montantCptValidateurMax ? this.searchPaiementDeclarationIr.montantCptValidateurMax : environment.emptyForExport ,
            'Reste Min': this.searchPaiementDeclarationIr.resteMin ? this.searchPaiementDeclarationIr.resteMin : environment.emptyForExport ,
            'Reste Max': this.searchPaiementDeclarationIr.resteMax ? this.searchPaiementDeclarationIr.resteMax : environment.emptyForExport ,
        'Declaration ir': this.searchPaiementDeclarationIr.declarationIrVo?.refrerence ? this.searchPaiementDeclarationIr.declarationIrVo?.refrerence : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
           return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
    set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }

    get paiementDeclarationIrSelections(): Array<PaiementDeclarationIrVo> {
           return this.paiementDeclarationIrService.paiementDeclarationIrSelections;
       }
    set paiementDeclarationIrSelections(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrSelections = value;
       }
   
     


    get selectedPaiementDeclarationIr():PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
    set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }
    
    get createPaiementDeclarationIrDialog():boolean {
           return this.paiementDeclarationIrService.createPaiementDeclarationIrDialog;
       }
    set createPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.createPaiementDeclarationIrDialog= value;
       }
    
    get editPaiementDeclarationIrDialog():boolean {
           return this.paiementDeclarationIrService.editPaiementDeclarationIrDialog;
       }
    set editPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.editPaiementDeclarationIrDialog= value;
       }
    get viewPaiementDeclarationIrDialog():boolean {
           return this.paiementDeclarationIrService.viewPaiementDeclarationIrDialog;
       }
    set viewPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.viewPaiementDeclarationIrDialog = value;
       }
       
     get searchPaiementDeclarationIr(): PaiementDeclarationIrVo {
        return this.paiementDeclarationIrService.searchPaiementDeclarationIr;
       }
    set searchPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.searchPaiementDeclarationIr = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
