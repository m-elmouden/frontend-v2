import {Component, OnInit} from '@angular/core';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
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
  selector: 'app-type-declaration-tva-list-admin',
  templateUrl: './type-declaration-tva-list-admin.component.html',
  styleUrls: ['./type-declaration-tva-list-admin.component.css']
})
export class TypeDeclarationTvaListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeDeclarationTva';


    constructor(private datePipe: DatePipe, private typeDeclarationTvaService: TypeDeclarationTvaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeDeclarationTvas();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeDeclarationTvas(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeDeclarationTva', 'list');
        isPermistted ? this.typeDeclarationTvaService.findAll().subscribe(typeDeclarationTvas => this.typeDeclarationTvas = typeDeclarationTvas,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeDeclarationTvaService.findByCriteria(this.searchTypeDeclarationTva).subscribe(typeDeclarationTvas=>{
            
            this.typeDeclarationTvas = typeDeclarationTvas;
           // this.searchTypeDeclarationTva = new TypeDeclarationTvaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editTypeDeclarationTva(typeDeclarationTva:TypeDeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('TypeDeclarationTva', 'edit');
         if(isPermistted){
          this.typeDeclarationTvaService.findByIdWithAssociatedList(typeDeclarationTva).subscribe(res => {
           this.selectedTypeDeclarationTva = res;
            this.editTypeDeclarationTvaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeDeclarationTva(typeDeclarationTva:TypeDeclarationTvaVo){
        const isPermistted = await this.roleService.isPermitted('TypeDeclarationTva', 'view');
        if(isPermistted){
           this.typeDeclarationTvaService.findByIdWithAssociatedList(typeDeclarationTva).subscribe(res => {
           this.selectedTypeDeclarationTva = res;
            this.viewTypeDeclarationTvaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeDeclarationTva(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();
            this.createTypeDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeDeclarationTva(typeDeclarationTva:TypeDeclarationTvaVo){
       const isPermistted = await this.roleService.isPermitted('TypeDeclarationTva', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type declaration tva) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeDeclarationTvaService.delete(typeDeclarationTva).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeDeclarationTvas.indexOf(typeDeclarationTva);
                          position > -1 ? this.typeDeclarationTvas.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type declaration tva Supprimé',
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


public async duplicateTypeDeclarationTva(typeDeclarationTva: TypeDeclarationTvaVo) {

     this.typeDeclarationTvaService.findByIdWithAssociatedList(typeDeclarationTva).subscribe(
	 res => {
	       this.initDuplicateTypeDeclarationTva(res);
	       this.selectedTypeDeclarationTva = res;
	       this.selectedTypeDeclarationTva.id = null;
            this.createTypeDeclarationTvaDialog = true;

});

	}

	initDuplicateTypeDeclarationTva(res: TypeDeclarationTvaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeDeclarationTvas.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTypeDeclarationTva.reference ? this.searchTypeDeclarationTva.reference : environment.emptyForExport ,
            'Libelle': this.searchTypeDeclarationTva.libelle ? this.searchTypeDeclarationTva.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
           return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
    set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }

    get typeDeclarationTvaSelections(): Array<TypeDeclarationTvaVo> {
           return this.typeDeclarationTvaService.typeDeclarationTvaSelections;
       }
    set typeDeclarationTvaSelections(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvaSelections = value;
       }
   
     


    get selectedTypeDeclarationTva():TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
    set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }
    
    get createTypeDeclarationTvaDialog():boolean {
           return this.typeDeclarationTvaService.createTypeDeclarationTvaDialog;
       }
    set createTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.createTypeDeclarationTvaDialog= value;
       }
    
    get editTypeDeclarationTvaDialog():boolean {
           return this.typeDeclarationTvaService.editTypeDeclarationTvaDialog;
       }
    set editTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.editTypeDeclarationTvaDialog= value;
       }
    get viewTypeDeclarationTvaDialog():boolean {
           return this.typeDeclarationTvaService.viewTypeDeclarationTvaDialog;
       }
    set viewTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.viewTypeDeclarationTvaDialog = value;
       }
       
     get searchTypeDeclarationTva(): TypeDeclarationTvaVo {
        return this.typeDeclarationTvaService.searchTypeDeclarationTva;
       }
    set searchTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.searchTypeDeclarationTva = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
