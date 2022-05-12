import {Component, OnInit} from '@angular/core';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
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
  selector: 'app-type-employe-list-admin',
  templateUrl: './type-employe-list-admin.component.html',
  styleUrls: ['./type-employe-list-admin.component.css']
})
export class TypeEmployeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeEmploye';


    constructor(private datePipe: DatePipe, private typeEmployeService: TypeEmployeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeEmployes();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeEmployes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeEmploye', 'list');
        isPermistted ? this.typeEmployeService.findAll().subscribe(typeEmployes => this.typeEmployes = typeEmployes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeEmployeService.findByCriteria(this.searchTypeEmploye).subscribe(typeEmployes=>{
            
            this.typeEmployes = typeEmployes;
           // this.searchTypeEmploye = new TypeEmployeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editTypeEmploye(typeEmploye:TypeEmployeVo){
        const isPermistted = await this.roleService.isPermitted('TypeEmploye', 'edit');
         if(isPermistted){
          this.typeEmployeService.findByIdWithAssociatedList(typeEmploye).subscribe(res => {
           this.selectedTypeEmploye = res;
            this.editTypeEmployeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeEmploye(typeEmploye:TypeEmployeVo){
        const isPermistted = await this.roleService.isPermitted('TypeEmploye', 'view');
        if(isPermistted){
           this.typeEmployeService.findByIdWithAssociatedList(typeEmploye).subscribe(res => {
           this.selectedTypeEmploye = res;
            this.viewTypeEmployeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeEmploye(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeEmploye = new TypeEmployeVo();
            this.createTypeEmployeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeEmploye(typeEmploye:TypeEmployeVo){
       const isPermistted = await this.roleService.isPermitted('TypeEmploye', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type employe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeEmployeService.delete(typeEmploye).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeEmployes.indexOf(typeEmploye);
                          position > -1 ? this.typeEmployes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type employe Supprimé',
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


public async duplicateTypeEmploye(typeEmploye: TypeEmployeVo) {

     this.typeEmployeService.findByIdWithAssociatedList(typeEmploye).subscribe(
	 res => {
	       this.initDuplicateTypeEmploye(res);
	       this.selectedTypeEmploye = res;
	       this.selectedTypeEmploye.id = null;
            this.createTypeEmployeDialog = true;

});

	}

	initDuplicateTypeEmploye(res: TypeEmployeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeEmployes.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTypeEmploye.code ? this.searchTypeEmploye.code : environment.emptyForExport ,
            'Libelle': this.searchTypeEmploye.libelle ? this.searchTypeEmploye.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeEmployes(): Array<TypeEmployeVo> {
           return this.typeEmployeService.typeEmployes;
       }
    set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }

    get typeEmployeSelections(): Array<TypeEmployeVo> {
           return this.typeEmployeService.typeEmployeSelections;
       }
    set typeEmployeSelections(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployeSelections = value;
       }
   
     


    get selectedTypeEmploye():TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
    set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }
    
    get createTypeEmployeDialog():boolean {
           return this.typeEmployeService.createTypeEmployeDialog;
       }
    set createTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.createTypeEmployeDialog= value;
       }
    
    get editTypeEmployeDialog():boolean {
           return this.typeEmployeService.editTypeEmployeDialog;
       }
    set editTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.editTypeEmployeDialog= value;
       }
    get viewTypeEmployeDialog():boolean {
           return this.typeEmployeService.viewTypeEmployeDialog;
       }
    set viewTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.viewTypeEmployeDialog = value;
       }
       
     get searchTypeEmploye(): TypeEmployeVo {
        return this.typeEmployeService.searchTypeEmploye;
       }
    set searchTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.searchTypeEmploye = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
