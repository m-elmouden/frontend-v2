import {Component, OnInit} from '@angular/core';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
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
  selector: 'app-type-operation-facture-list-chercheur',
  templateUrl: './type-operation-facture-list-chercheur.component.html',
  styleUrls: ['./type-operation-facture-list-chercheur.component.css']
})
export class TypeOperationFactureListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeOperationFacture';


    constructor(private datePipe: DatePipe, private typeOperationFactureService: TypeOperationFactureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeOperationFactures();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeOperationFactures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeOperationFacture', 'list');
        isPermistted ? this.typeOperationFactureService.findAll().subscribe(typeOperationFactures => this.typeOperationFactures = typeOperationFactures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeOperationFactureService.findByCriteria(this.searchTypeOperationFacture).subscribe(typeOperationFactures=>{
            
            this.typeOperationFactures = typeOperationFactures;
           // this.searchTypeOperationFacture = new TypeOperationFactureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'typeOperationSociete', header: 'Type operation societe'},
        ];
    }
    
    public async editTypeOperationFacture(typeOperationFacture:TypeOperationFactureVo){
        const isPermistted = await this.roleService.isPermitted('TypeOperationFacture', 'edit');
         if(isPermistted){
          this.typeOperationFactureService.findByIdWithAssociatedList(typeOperationFacture).subscribe(res => {
           this.selectedTypeOperationFacture = res;
            this.editTypeOperationFactureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeOperationFacture(typeOperationFacture:TypeOperationFactureVo){
        const isPermistted = await this.roleService.isPermitted('TypeOperationFacture', 'view');
        if(isPermistted){
           this.typeOperationFactureService.findByIdWithAssociatedList(typeOperationFacture).subscribe(res => {
           this.selectedTypeOperationFacture = res;
            this.viewTypeOperationFactureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeOperationFacture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeOperationFacture = new TypeOperationFactureVo();
            this.createTypeOperationFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeOperationFacture(typeOperationFacture:TypeOperationFactureVo){
       const isPermistted = await this.roleService.isPermitted('TypeOperationFacture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type operation facture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeOperationFactureService.delete(typeOperationFacture).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeOperationFactures.indexOf(typeOperationFacture);
                          position > -1 ? this.typeOperationFactures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type operation facture Supprimé',
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


public async duplicateTypeOperationFacture(typeOperationFacture: TypeOperationFactureVo) {

     this.typeOperationFactureService.findByIdWithAssociatedList(typeOperationFacture).subscribe(
	 res => {
	       this.initDuplicateTypeOperationFacture(res);
	       this.selectedTypeOperationFacture = res;
	       this.selectedTypeOperationFacture.id = null;
            this.createTypeOperationFactureDialog = true;

});

	}

	initDuplicateTypeOperationFacture(res: TypeOperationFactureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeOperationFactures.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Type operation societe': e.typeOperationSociete ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeOperationFacture.libelle ? this.searchTypeOperationFacture.libelle : environment.emptyForExport ,
            'Type operation societe': this.searchTypeOperationFacture.typeOperationSociete ? this.searchTypeOperationFacture.typeOperationSociete : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeOperationFactures(): Array<TypeOperationFactureVo> {
           return this.typeOperationFactureService.typeOperationFactures;
       }
    set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactures = value;
       }

    get typeOperationFactureSelections(): Array<TypeOperationFactureVo> {
           return this.typeOperationFactureService.typeOperationFactureSelections;
       }
    set typeOperationFactureSelections(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactureSelections = value;
       }
   
     


    get selectedTypeOperationFacture():TypeOperationFactureVo {
           return this.typeOperationFactureService.selectedTypeOperationFacture;
       }
    set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.selectedTypeOperationFacture = value;
       }
    
    get createTypeOperationFactureDialog():boolean {
           return this.typeOperationFactureService.createTypeOperationFactureDialog;
       }
    set createTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.createTypeOperationFactureDialog= value;
       }
    
    get editTypeOperationFactureDialog():boolean {
           return this.typeOperationFactureService.editTypeOperationFactureDialog;
       }
    set editTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.editTypeOperationFactureDialog= value;
       }
    get viewTypeOperationFactureDialog():boolean {
           return this.typeOperationFactureService.viewTypeOperationFactureDialog;
       }
    set viewTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.viewTypeOperationFactureDialog = value;
       }
       
     get searchTypeOperationFacture(): TypeOperationFactureVo {
        return this.typeOperationFactureService.searchTypeOperationFacture;
       }
    set searchTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.searchTypeOperationFacture = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
