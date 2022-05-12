import {Component, OnInit} from '@angular/core';
import {TypeComptableService} from '../../../../../../controller/service/TypeComptable.service';
import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
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
  selector: 'app-type-comptable-list-admin',
  templateUrl: './type-comptable-list-admin.component.html',
  styleUrls: ['./type-comptable-list-admin.component.css']
})
export class TypeComptableListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeComptable';


    constructor(private datePipe: DatePipe, private typeComptableService: TypeComptableService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeComptables();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeComptables(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeComptable', 'list');
        isPermistted ? this.typeComptableService.findAll().subscribe(typeComptables => this.typeComptables = typeComptables,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeComptableService.findByCriteria(this.searchTypeComptable).subscribe(typeComptables=>{
            
            this.typeComptables = typeComptables;
           // this.searchTypeComptable = new TypeComptableVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'reference', header: 'Reference'},
        ];
    }
    
    public async editTypeComptable(typeComptable:TypeComptableVo){
        const isPermistted = await this.roleService.isPermitted('TypeComptable', 'edit');
         if(isPermistted){
          this.typeComptableService.findByIdWithAssociatedList(typeComptable).subscribe(res => {
           this.selectedTypeComptable = res;
            this.editTypeComptableDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeComptable(typeComptable:TypeComptableVo){
        const isPermistted = await this.roleService.isPermitted('TypeComptable', 'view');
        if(isPermistted){
           this.typeComptableService.findByIdWithAssociatedList(typeComptable).subscribe(res => {
           this.selectedTypeComptable = res;
            this.viewTypeComptableDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeComptable(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeComptable = new TypeComptableVo();
            this.createTypeComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeComptable(typeComptable:TypeComptableVo){
       const isPermistted = await this.roleService.isPermitted('TypeComptable', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type comptable) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeComptableService.delete(typeComptable).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeComptables.indexOf(typeComptable);
                          position > -1 ? this.typeComptables.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type comptable Supprimé',
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


public async duplicateTypeComptable(typeComptable: TypeComptableVo) {

     this.typeComptableService.findByIdWithAssociatedList(typeComptable).subscribe(
	 res => {
	       this.initDuplicateTypeComptable(res);
	       this.selectedTypeComptable = res;
	       this.selectedTypeComptable.id = null;
            this.createTypeComptableDialog = true;

});

	}

	initDuplicateTypeComptable(res: TypeComptableVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeComptables.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Reference': e.reference ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeComptable.libelle ? this.searchTypeComptable.libelle : environment.emptyForExport ,
            'Reference': this.searchTypeComptable.reference ? this.searchTypeComptable.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeComptables(): Array<TypeComptableVo> {
           return this.typeComptableService.typeComptables;
       }
    set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }

    get typeComptableSelections(): Array<TypeComptableVo> {
           return this.typeComptableService.typeComptableSelections;
       }
    set typeComptableSelections(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptableSelections = value;
       }
   
     


    get selectedTypeComptable():TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
    set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }
    
    get createTypeComptableDialog():boolean {
           return this.typeComptableService.createTypeComptableDialog;
       }
    set createTypeComptableDialog(value: boolean) {
        this.typeComptableService.createTypeComptableDialog= value;
       }
    
    get editTypeComptableDialog():boolean {
           return this.typeComptableService.editTypeComptableDialog;
       }
    set editTypeComptableDialog(value: boolean) {
        this.typeComptableService.editTypeComptableDialog= value;
       }
    get viewTypeComptableDialog():boolean {
           return this.typeComptableService.viewTypeComptableDialog;
       }
    set viewTypeComptableDialog(value: boolean) {
        this.typeComptableService.viewTypeComptableDialog = value;
       }
       
     get searchTypeComptable(): TypeComptableVo {
        return this.typeComptableService.searchTypeComptable;
       }
    set searchTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.searchTypeComptable = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
