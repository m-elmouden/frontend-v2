import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DeclarationIsService } from '../../../../../../controller/service/DeclarationIs.service';

import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-paiement-declaration-is-list-chercheur',
  templateUrl: './paiement-declaration-is-list-chercheur.component.html',
  styleUrls: ['./paiement-declaration-is-list-chercheur.component.css']
})
export class PaiementDeclarationIsListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaiementDeclarationIs';
    declarationIss :Array<DeclarationIsVo>;


    constructor(private datePipe: DatePipe, private paiementDeclarationIsService: PaiementDeclarationIsService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private declarationIsService: DeclarationIsService
) { }

    ngOnInit(): void {
      this.loadPaiementDeclarationIss();
      this.initExport();
      this.initCol();
      this.loadDeclarationIs();
    }
    
    // methods
      public async loadPaiementDeclarationIss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'list');
        isPermistted ? this.paiementDeclarationIsService.findAll().subscribe(paiementDeclarationIss => this.paiementDeclarationIss = paiementDeclarationIss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementDeclarationIsService.findByCriteria(this.searchPaiementDeclarationIs).subscribe(paiementDeclarationIss=>{
            
            this.paiementDeclarationIss = paiementDeclarationIss;
           // this.searchPaiementDeclarationIs = new PaiementDeclarationIsVo();
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
                        {field: 'declarationIs?.reference', header: 'Declaration is'},
        ];
    }
    
    public async editPaiementDeclarationIs(paiementDeclarationIs:PaiementDeclarationIsVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'edit');
         if(isPermistted){
          this.paiementDeclarationIsService.findByIdWithAssociatedList(paiementDeclarationIs).subscribe(res => {
           this.selectedPaiementDeclarationIs = res;
            this.selectedPaiementDeclarationIs.datePaiement = new Date(paiementDeclarationIs.datePaiement);
            this.editPaiementDeclarationIsDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiementDeclarationIs(paiementDeclarationIs:PaiementDeclarationIsVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'view');
        if(isPermistted){
           this.paiementDeclarationIsService.findByIdWithAssociatedList(paiementDeclarationIs).subscribe(res => {
           this.selectedPaiementDeclarationIs = res;
            this.selectedPaiementDeclarationIs.datePaiement = new Date(paiementDeclarationIs.datePaiement);
            this.viewPaiementDeclarationIsDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiementDeclarationIs(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();
            this.createPaiementDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiementDeclarationIs(paiementDeclarationIs:PaiementDeclarationIsVo){
       const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement declaration is) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementDeclarationIsService.delete(paiementDeclarationIs).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiementDeclarationIss.indexOf(paiementDeclarationIs);
                          position > -1 ? this.paiementDeclarationIss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement declaration is Supprimé',
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

public async loadDeclarationIs(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIs', 'list');
    isPermistted ? this.declarationIsService.findAll().subscribe(declarationIss => this.declarationIss = declarationIss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiementDeclarationIs(paiementDeclarationIs: PaiementDeclarationIsVo) {

     this.paiementDeclarationIsService.findByIdWithAssociatedList(paiementDeclarationIs).subscribe(
	 res => {
	       this.initDuplicatePaiementDeclarationIs(res);
	       this.selectedPaiementDeclarationIs = res;
	       this.selectedPaiementDeclarationIs.id = null;
            this.createPaiementDeclarationIsDialog = true;

});

	}

	initDuplicatePaiementDeclarationIs(res: PaiementDeclarationIsVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paiementDeclarationIss.map(e => {
    return {
                    'Reference': e.reference ,
                    'Date paiement': this.datePipe.transform(e.datePaiement , 'dd-MM-yyyy'),
                    'Total': e.total ,
                    'Montant cpt traiteur': e.montantCptTraiteur ,
                    'Montant cpt validateur': e.montantCptValidateur ,
                    'Reste': e.reste ,
            'Declaration is': e.declarationIsVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchPaiementDeclarationIs.reference ? this.searchPaiementDeclarationIs.reference : environment.emptyForExport ,
            'Date paiement Min': this.searchPaiementDeclarationIs.datePaiementMin ? this.datePipe.transform(this.searchPaiementDeclarationIs.datePaiementMin , this.dateFormat) : environment.emptyForExport ,
            'Date paiement Max': this.searchPaiementDeclarationIs.datePaiementMax ? this.datePipe.transform(this.searchPaiementDeclarationIs.datePaiementMax , this.dateFormat) : environment.emptyForExport ,
            'Total Min': this.searchPaiementDeclarationIs.totalMin ? this.searchPaiementDeclarationIs.totalMin : environment.emptyForExport ,
            'Total Max': this.searchPaiementDeclarationIs.totalMax ? this.searchPaiementDeclarationIs.totalMax : environment.emptyForExport ,
            'Montant cpt traiteur Min': this.searchPaiementDeclarationIs.montantCptTraiteurMin ? this.searchPaiementDeclarationIs.montantCptTraiteurMin : environment.emptyForExport ,
            'Montant cpt traiteur Max': this.searchPaiementDeclarationIs.montantCptTraiteurMax ? this.searchPaiementDeclarationIs.montantCptTraiteurMax : environment.emptyForExport ,
            'Montant cpt validateur Min': this.searchPaiementDeclarationIs.montantCptValidateurMin ? this.searchPaiementDeclarationIs.montantCptValidateurMin : environment.emptyForExport ,
            'Montant cpt validateur Max': this.searchPaiementDeclarationIs.montantCptValidateurMax ? this.searchPaiementDeclarationIs.montantCptValidateurMax : environment.emptyForExport ,
            'Reste Min': this.searchPaiementDeclarationIs.resteMin ? this.searchPaiementDeclarationIs.resteMin : environment.emptyForExport ,
            'Reste Max': this.searchPaiementDeclarationIs.resteMax ? this.searchPaiementDeclarationIs.resteMax : environment.emptyForExport ,
        'Declaration is': this.searchPaiementDeclarationIs.declarationIsVo?.reference ? this.searchPaiementDeclarationIs.declarationIsVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
           return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
    set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }

    get paiementDeclarationIsSelections(): Array<PaiementDeclarationIsVo> {
           return this.paiementDeclarationIsService.paiementDeclarationIsSelections;
       }
    set paiementDeclarationIsSelections(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIsSelections = value;
       }
   
     


    get selectedPaiementDeclarationIs():PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
    set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }
    
    get createPaiementDeclarationIsDialog():boolean {
           return this.paiementDeclarationIsService.createPaiementDeclarationIsDialog;
       }
    set createPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.createPaiementDeclarationIsDialog= value;
       }
    
    get editPaiementDeclarationIsDialog():boolean {
           return this.paiementDeclarationIsService.editPaiementDeclarationIsDialog;
       }
    set editPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.editPaiementDeclarationIsDialog= value;
       }
    get viewPaiementDeclarationIsDialog():boolean {
           return this.paiementDeclarationIsService.viewPaiementDeclarationIsDialog;
       }
    set viewPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.viewPaiementDeclarationIsDialog = value;
       }
       
     get searchPaiementDeclarationIs(): PaiementDeclarationIsVo {
        return this.paiementDeclarationIsService.searchPaiementDeclarationIs;
       }
    set searchPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.searchPaiementDeclarationIs = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
