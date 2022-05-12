import {Component, OnInit} from '@angular/core';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
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
  selector: 'app-type-taux-cnss-list-chercheur',
  templateUrl: './type-taux-cnss-list-chercheur.component.html',
  styleUrls: ['./type-taux-cnss-list-chercheur.component.css']
})
export class TypeTauxCnssListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeTauxCnss';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeTauxCnssService: TypeTauxCnssService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeTauxCnsss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeTauxCnsss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'list');
        isPermistted ? this.typeTauxCnssService.findAll().subscribe(typeTauxCnsss => this.typeTauxCnsss = typeTauxCnsss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeTauxCnssService.findByCriteria(this.searchTypeTauxCnss).subscribe(typeTauxCnsss=>{
            
            this.typeTauxCnsss = typeTauxCnsss;
           // this.searchTypeTauxCnss = new TypeTauxCnssVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editTypeTauxCnss(typeTauxCnss:TypeTauxCnssVo){
        const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'edit');
         if(isPermistted){
          this.typeTauxCnssService.findByIdWithAssociatedList(typeTauxCnss).subscribe(res => {
           this.selectedTypeTauxCnss = res;
            this.selectedTypeTauxCnss.dateArchivage = new Date(typeTauxCnss.dateArchivage);
            this.selectedTypeTauxCnss.dateCreation = new Date(typeTauxCnss.dateCreation);
            this.editTypeTauxCnssDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeTauxCnss(typeTauxCnss:TypeTauxCnssVo){
        const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'view');
        if(isPermistted){
           this.typeTauxCnssService.findByIdWithAssociatedList(typeTauxCnss).subscribe(res => {
           this.selectedTypeTauxCnss = res;
            this.selectedTypeTauxCnss.dateArchivage = new Date(typeTauxCnss.dateArchivage);
            this.selectedTypeTauxCnss.dateCreation = new Date(typeTauxCnss.dateCreation);
            this.viewTypeTauxCnssDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeTauxCnss(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeTauxCnss = new TypeTauxCnssVo();
            this.createTypeTauxCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeTauxCnss(typeTauxCnss:TypeTauxCnssVo){
       const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type taux cnss) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeTauxCnssService.delete(typeTauxCnss).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeTauxCnsss.indexOf(typeTauxCnss);
                          position > -1 ? this.typeTauxCnsss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type taux cnss Supprimé',
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


public async duplicateTypeTauxCnss(typeTauxCnss: TypeTauxCnssVo) {

     this.typeTauxCnssService.findByIdWithAssociatedList(typeTauxCnss).subscribe(
	 res => {
	       this.initDuplicateTypeTauxCnss(res);
	       this.selectedTypeTauxCnss = res;
	       this.selectedTypeTauxCnss.id = null;
            this.createTypeTauxCnssDialog = true;

});

	}

	initDuplicateTypeTauxCnss(res: TypeTauxCnssVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeTauxCnsss.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeTauxCnss.libelle ? this.searchTypeTauxCnss.libelle : environment.emptyForExport ,
            'Code': this.searchTypeTauxCnss.code ? this.searchTypeTauxCnss.code : environment.emptyForExport ,
            'Archive': this.searchTypeTauxCnss.archive ? (this.searchTypeTauxCnss.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeTauxCnss.dateArchivageMin ? this.datePipe.transform(this.searchTypeTauxCnss.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeTauxCnss.dateArchivageMax ? this.datePipe.transform(this.searchTypeTauxCnss.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeTauxCnss.dateCreationMin ? this.datePipe.transform(this.searchTypeTauxCnss.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeTauxCnss.dateCreationMax ? this.datePipe.transform(this.searchTypeTauxCnss.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeTauxCnss.admin ? (this.searchTypeTauxCnss.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeTauxCnss.visible ? (this.searchTypeTauxCnss.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeTauxCnss.username ? this.searchTypeTauxCnss.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeTauxCnsss(): Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnsss;
       }
    set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }

    get typeTauxCnssSelections(): Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnssSelections;
       }
    set typeTauxCnssSelections(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnssSelections = value;
       }
   
     


    get selectedTypeTauxCnss():TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
    set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }
    
    get createTypeTauxCnssDialog():boolean {
           return this.typeTauxCnssService.createTypeTauxCnssDialog;
       }
    set createTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.createTypeTauxCnssDialog= value;
       }
    
    get editTypeTauxCnssDialog():boolean {
           return this.typeTauxCnssService.editTypeTauxCnssDialog;
       }
    set editTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.editTypeTauxCnssDialog= value;
       }
    get viewTypeTauxCnssDialog():boolean {
           return this.typeTauxCnssService.viewTypeTauxCnssDialog;
       }
    set viewTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.viewTypeTauxCnssDialog = value;
       }
       
     get searchTypeTauxCnss(): TypeTauxCnssVo {
        return this.typeTauxCnssService.searchTypeTauxCnss;
       }
    set searchTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.searchTypeTauxCnss = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
