import {Component, OnInit} from '@angular/core';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
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
  selector: 'app-type-societe-list-admin',
  templateUrl: './type-societe-list-admin.component.html',
  styleUrls: ['./type-societe-list-admin.component.css']
})
export class TypeSocieteListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeSociete';


    constructor(private datePipe: DatePipe, private typeSocieteService: TypeSocieteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeSocietes();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeSocietes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeSociete', 'list');
        isPermistted ? this.typeSocieteService.findAll().subscribe(typeSocietes => this.typeSocietes = typeSocietes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeSocieteService.findByCriteria(this.searchTypeSociete).subscribe(typeSocietes=>{
            
            this.typeSocietes = typeSocietes;
           // this.searchTypeSociete = new TypeSocieteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editTypeSociete(typeSociete:TypeSocieteVo){
        const isPermistted = await this.roleService.isPermitted('TypeSociete', 'edit');
         if(isPermistted){
          this.typeSocieteService.findByIdWithAssociatedList(typeSociete).subscribe(res => {
           this.selectedTypeSociete = res;
            this.editTypeSocieteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeSociete(typeSociete:TypeSocieteVo){
        const isPermistted = await this.roleService.isPermitted('TypeSociete', 'view');
        if(isPermistted){
           this.typeSocieteService.findByIdWithAssociatedList(typeSociete).subscribe(res => {
           this.selectedTypeSociete = res;
            this.viewTypeSocieteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeSociete(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeSociete = new TypeSocieteVo();
            this.createTypeSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeSociete(typeSociete:TypeSocieteVo){
       const isPermistted = await this.roleService.isPermitted('TypeSociete', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type societe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeSocieteService.delete(typeSociete).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeSocietes.indexOf(typeSociete);
                          position > -1 ? this.typeSocietes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type societe Supprimé',
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


public async duplicateTypeSociete(typeSociete: TypeSocieteVo) {

     this.typeSocieteService.findByIdWithAssociatedList(typeSociete).subscribe(
	 res => {
	       this.initDuplicateTypeSociete(res);
	       this.selectedTypeSociete = res;
	       this.selectedTypeSociete.id = null;
            this.createTypeSocieteDialog = true;

});

	}

	initDuplicateTypeSociete(res: TypeSocieteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeSocietes.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTypeSociete.code ? this.searchTypeSociete.code : environment.emptyForExport ,
            'Libelle': this.searchTypeSociete.libelle ? this.searchTypeSociete.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeSocietes(): Array<TypeSocieteVo> {
           return this.typeSocieteService.typeSocietes;
       }
    set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }

    get typeSocieteSelections(): Array<TypeSocieteVo> {
           return this.typeSocieteService.typeSocieteSelections;
       }
    set typeSocieteSelections(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocieteSelections = value;
       }
   
     


    get selectedTypeSociete():TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
    set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }
    
    get createTypeSocieteDialog():boolean {
           return this.typeSocieteService.createTypeSocieteDialog;
       }
    set createTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.createTypeSocieteDialog= value;
       }
    
    get editTypeSocieteDialog():boolean {
           return this.typeSocieteService.editTypeSocieteDialog;
       }
    set editTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.editTypeSocieteDialog= value;
       }
    get viewTypeSocieteDialog():boolean {
           return this.typeSocieteService.viewTypeSocieteDialog;
       }
    set viewTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.viewTypeSocieteDialog = value;
       }
       
     get searchTypeSociete(): TypeSocieteVo {
        return this.typeSocieteService.searchTypeSociete;
       }
    set searchTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.searchTypeSociete = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
