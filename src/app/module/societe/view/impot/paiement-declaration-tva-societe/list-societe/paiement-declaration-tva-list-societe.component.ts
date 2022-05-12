import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DeclarationTvaService } from '../../../../../../controller/service/DeclarationTva.service';

import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-paiement-declaration-tva-list-societe',
  templateUrl: './paiement-declaration-tva-list-societe.component.html',
  styleUrls: ['./paiement-declaration-tva-list-societe.component.css']
})
export class PaiementDeclarationTvaListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaiementDeclarationTva';
    declarationTvas :Array<DeclarationTvaVo>;


    constructor(private datePipe: DatePipe, private paiementDeclarationTvaService: PaiementDeclarationTvaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private declarationTvaService: DeclarationTvaService
) { }

    ngOnInit(): void {
      this.loadPaiementDeclarationTvas();
      this.initExport();
      this.initCol();
      this.loadDeclarationTva();
    }
    
    // methods
      public async loadPaiementDeclarationTvas(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'list');
        isPermistted ? this.paiementDeclarationTvaService.findAll().subscribe(paiementDeclarationTvas => this.paiementDeclarationTvas = paiementDeclarationTvas,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementDeclarationTvaService.findByCriteria(this.searchPaiementDeclarationTva).subscribe(paiementDeclarationTvas=>{
            
            this.paiementDeclarationTvas = paiementDeclarationTvas;
           // this.searchPaiementDeclarationTva = new PaiementDeclarationTvaVo();
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
                        {field: 'declarationTva?.reference', header: 'Declaration tva'},
        ];
    }
    
    public async editPaiementDeclarationTva(paiementDeclarationTva:PaiementDeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'edit');
         if(isPermistted){
          this.paiementDeclarationTvaService.findByIdWithAssociatedList(paiementDeclarationTva).subscribe(res => {
           this.selectedPaiementDeclarationTva = res;
            this.selectedPaiementDeclarationTva.datePaiement = new Date(paiementDeclarationTva.datePaiement);
            this.editPaiementDeclarationTvaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiementDeclarationTva(paiementDeclarationTva:PaiementDeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'view');
        if(isPermistted){
           this.paiementDeclarationTvaService.findByIdWithAssociatedList(paiementDeclarationTva).subscribe(res => {
           this.selectedPaiementDeclarationTva = res;
            this.selectedPaiementDeclarationTva.datePaiement = new Date(paiementDeclarationTva.datePaiement);
            this.viewPaiementDeclarationTvaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiementDeclarationTva(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();
            this.createPaiementDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiementDeclarationTva(paiementDeclarationTva:PaiementDeclarationTvaVo){
       const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement declaration tva) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementDeclarationTvaService.delete(paiementDeclarationTva).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiementDeclarationTvas.indexOf(paiementDeclarationTva);
                          position > -1 ? this.paiementDeclarationTvas.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement declaration tva Supprimé',
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

public async loadDeclarationTva(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'list');
    isPermistted ? this.declarationTvaService.findAll().subscribe(declarationTvas => this.declarationTvas = declarationTvas,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiementDeclarationTva(paiementDeclarationTva: PaiementDeclarationTvaVo) {

     this.paiementDeclarationTvaService.findByIdWithAssociatedList(paiementDeclarationTva).subscribe(
	 res => {
	       this.initDuplicatePaiementDeclarationTva(res);
	       this.selectedPaiementDeclarationTva = res;
	       this.selectedPaiementDeclarationTva.id = null;
            this.createPaiementDeclarationTvaDialog = true;

});

	}

	initDuplicatePaiementDeclarationTva(res: PaiementDeclarationTvaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paiementDeclarationTvas.map(e => {
    return {
                    'Reference': e.reference ,
                    'Date paiement': this.datePipe.transform(e.datePaiement , 'dd-MM-yyyy'),
                    'Total': e.total ,
                    'Montant cpt traiteur': e.montantCptTraiteur ,
                    'Montant cpt validateur': e.montantCptValidateur ,
                    'Reste': e.reste ,
            'Declaration tva': e.declarationTvaVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchPaiementDeclarationTva.reference ? this.searchPaiementDeclarationTva.reference : environment.emptyForExport ,
            'Date paiement Min': this.searchPaiementDeclarationTva.datePaiementMin ? this.datePipe.transform(this.searchPaiementDeclarationTva.datePaiementMin , this.dateFormat) : environment.emptyForExport ,
            'Date paiement Max': this.searchPaiementDeclarationTva.datePaiementMax ? this.datePipe.transform(this.searchPaiementDeclarationTva.datePaiementMax , this.dateFormat) : environment.emptyForExport ,
            'Total Min': this.searchPaiementDeclarationTva.totalMin ? this.searchPaiementDeclarationTva.totalMin : environment.emptyForExport ,
            'Total Max': this.searchPaiementDeclarationTva.totalMax ? this.searchPaiementDeclarationTva.totalMax : environment.emptyForExport ,
            'Montant cpt traiteur Min': this.searchPaiementDeclarationTva.montantCptTraiteurMin ? this.searchPaiementDeclarationTva.montantCptTraiteurMin : environment.emptyForExport ,
            'Montant cpt traiteur Max': this.searchPaiementDeclarationTva.montantCptTraiteurMax ? this.searchPaiementDeclarationTva.montantCptTraiteurMax : environment.emptyForExport ,
            'Montant cpt validateur Min': this.searchPaiementDeclarationTva.montantCptValidateurMin ? this.searchPaiementDeclarationTva.montantCptValidateurMin : environment.emptyForExport ,
            'Montant cpt validateur Max': this.searchPaiementDeclarationTva.montantCptValidateurMax ? this.searchPaiementDeclarationTva.montantCptValidateurMax : environment.emptyForExport ,
            'Reste Min': this.searchPaiementDeclarationTva.resteMin ? this.searchPaiementDeclarationTva.resteMin : environment.emptyForExport ,
            'Reste Max': this.searchPaiementDeclarationTva.resteMax ? this.searchPaiementDeclarationTva.resteMax : environment.emptyForExport ,
        'Declaration tva': this.searchPaiementDeclarationTva.declarationTvaVo?.reference ? this.searchPaiementDeclarationTva.declarationTvaVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
           return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
    set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }

    get paiementDeclarationTvaSelections(): Array<PaiementDeclarationTvaVo> {
           return this.paiementDeclarationTvaService.paiementDeclarationTvaSelections;
       }
    set paiementDeclarationTvaSelections(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvaSelections = value;
       }
   
     


    get selectedPaiementDeclarationTva():PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
    set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }
    
    get createPaiementDeclarationTvaDialog():boolean {
           return this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog;
       }
    set createPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog= value;
       }
    
    get editPaiementDeclarationTvaDialog():boolean {
           return this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog;
       }
    set editPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog= value;
       }
    get viewPaiementDeclarationTvaDialog():boolean {
           return this.paiementDeclarationTvaService.viewPaiementDeclarationTvaDialog;
       }
    set viewPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.viewPaiementDeclarationTvaDialog = value;
       }
       
     get searchPaiementDeclarationTva(): PaiementDeclarationTvaVo {
        return this.paiementDeclarationTvaService.searchPaiementDeclarationTva;
       }
    set searchPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.searchPaiementDeclarationTva = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
