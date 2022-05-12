import {Component, OnInit} from '@angular/core';
import {TauxCnssService} from '../../../../../../controller/service/TauxCnss.service';
import {TauxCnssVo} from '../../../../../../controller/model/TauxCnss.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeTauxCnssService } from '../../../../../../controller/service/TypeTauxCnss.service';

import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-taux-cnss-list-societe',
  templateUrl: './taux-cnss-list-societe.component.html',
  styleUrls: ['./taux-cnss-list-societe.component.css']
})
export class TauxCnssListSocieteComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TauxCnss';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    typeTauxCnsss :Array<TypeTauxCnssVo>;


    constructor(private datePipe: DatePipe, private tauxCnssService: TauxCnssService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeTauxCnssService: TypeTauxCnssService
) { }

    ngOnInit(): void {
      this.loadTauxCnsss();
      this.initExport();
      this.initCol();
      this.loadTypeTauxCnss();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTauxCnsss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TauxCnss', 'list');
        isPermistted ? this.tauxCnssService.findAll().subscribe(tauxCnsss => this.tauxCnsss = tauxCnsss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tauxCnssService.findByCriteria(this.searchTauxCnss).subscribe(tauxCnsss=>{
            
            this.tauxCnsss = tauxCnsss;
           // this.searchTauxCnss = new TauxCnssVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'ref', header: 'Ref'},
                        {field: 'typeTauxCnss?.libelle', header: 'Type taux cnss'},
                            {field: 'dateApplicationMin', header: 'Date application min'},
                            {field: 'dateApplicationMax', header: 'Date application max'},
                            {field: 'plafond', header: 'Plafond'},
                            {field: 'pourcentage', header: 'Pourcentage'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editTauxCnss(tauxCnss:TauxCnssVo){
        const isPermistted = await this.roleService.isPermitted('TauxCnss', 'edit');
         if(isPermistted){
          this.tauxCnssService.findByIdWithAssociatedList(tauxCnss).subscribe(res => {
           this.selectedTauxCnss = res;
            this.selectedTauxCnss.dateApplicationMin = new Date(tauxCnss.dateApplicationMin);
            this.selectedTauxCnss.dateApplicationMax = new Date(tauxCnss.dateApplicationMax);
            this.selectedTauxCnss.dateArchivage = new Date(tauxCnss.dateArchivage);
            this.selectedTauxCnss.dateCreation = new Date(tauxCnss.dateCreation);
            this.editTauxCnssDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTauxCnss(tauxCnss:TauxCnssVo){
        const isPermistted = await this.roleService.isPermitted('TauxCnss', 'view');
        if(isPermistted){
           this.tauxCnssService.findByIdWithAssociatedList(tauxCnss).subscribe(res => {
           this.selectedTauxCnss = res;
            this.selectedTauxCnss.dateApplicationMin = new Date(tauxCnss.dateApplicationMin);
            this.selectedTauxCnss.dateApplicationMax = new Date(tauxCnss.dateApplicationMax);
            this.selectedTauxCnss.dateArchivage = new Date(tauxCnss.dateArchivage);
            this.selectedTauxCnss.dateCreation = new Date(tauxCnss.dateCreation);
            this.viewTauxCnssDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTauxCnss(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTauxCnss = new TauxCnssVo();
            this.createTauxCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverTauxCnss(tauxCnss:TauxCnssVo){
const isPermistted = await this.roleService.isPermitted('TauxCnss', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Taux cnss) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.tauxCnssService.archiver(tauxCnss).subscribe(status=>{
const myIndex = this.tauxCnsss.indexOf(tauxCnss);
this.tauxCnsss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Taux cnss archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverTauxCnss(tauxCnss:TauxCnssVo){
const isPermistted = await this.roleService.isPermitted('TauxCnss', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Taux cnss) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.tauxCnssService.desarchiver(tauxCnss).subscribe(status=>{
const myIndex = this.tauxCnsss.indexOf(tauxCnss);
this.tauxCnsss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Taux cnss désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteTauxCnss(tauxCnss:TauxCnssVo){
       const isPermistted = await this.roleService.isPermitted('TauxCnss', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Taux cnss) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tauxCnssService.delete(tauxCnss).subscribe(status=>{
                          if(status > 0){
                          const position = this.tauxCnsss.indexOf(tauxCnss);
                          position > -1 ? this.tauxCnsss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Taux cnss Supprimé',
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

public async loadTypeTauxCnss(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TauxCnss', 'list');
    isPermistted ? this.typeTauxCnssService.findAll().subscribe(typeTauxCnsss => this.typeTauxCnsss = typeTauxCnsss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTauxCnss(tauxCnss: TauxCnssVo) {

     this.tauxCnssService.findByIdWithAssociatedList(tauxCnss).subscribe(
	 res => {
	       this.initDuplicateTauxCnss(res);
	       this.selectedTauxCnss = res;
	       this.selectedTauxCnss.id = null;
            this.createTauxCnssDialog = true;

});

	}

	initDuplicateTauxCnss(res: TauxCnssVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.tauxCnsss.map(e => {
    return {
                    'Ref': e.ref ,
            'Type taux cnss': e.typeTauxCnssVo?.libelle ,
                    'Date application min': this.datePipe.transform(e.dateApplicationMin , 'dd-MM-yyyy'),
                    'Date application max': this.datePipe.transform(e.dateApplicationMax , 'dd-MM-yyyy'),
                    'Plafond': e.plafond ,
                    'Pourcentage': e.pourcentage ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Ref': this.searchTauxCnss.ref ? this.searchTauxCnss.ref : environment.emptyForExport ,
        'Type taux cnss': this.searchTauxCnss.typeTauxCnssVo?.libelle ? this.searchTauxCnss.typeTauxCnssVo?.libelle : environment.emptyForExport ,
            'Date application min Min': this.searchTauxCnss.dateApplicationMinMin ? this.datePipe.transform(this.searchTauxCnss.dateApplicationMinMin , this.dateFormat) : environment.emptyForExport ,
            'Date application min Max': this.searchTauxCnss.dateApplicationMinMax ? this.datePipe.transform(this.searchTauxCnss.dateApplicationMinMax , this.dateFormat) : environment.emptyForExport ,
            'Date application max Min': this.searchTauxCnss.dateApplicationMaxMin ? this.datePipe.transform(this.searchTauxCnss.dateApplicationMaxMin , this.dateFormat) : environment.emptyForExport ,
            'Date application max Max': this.searchTauxCnss.dateApplicationMaxMax ? this.datePipe.transform(this.searchTauxCnss.dateApplicationMaxMax , this.dateFormat) : environment.emptyForExport ,
            'Plafond Min': this.searchTauxCnss.plafondMin ? this.searchTauxCnss.plafondMin : environment.emptyForExport ,
            'Plafond Max': this.searchTauxCnss.plafondMax ? this.searchTauxCnss.plafondMax : environment.emptyForExport ,
            'Pourcentage Min': this.searchTauxCnss.pourcentageMin ? this.searchTauxCnss.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchTauxCnss.pourcentageMax ? this.searchTauxCnss.pourcentageMax : environment.emptyForExport ,
            'Archive': this.searchTauxCnss.archive ? (this.searchTauxCnss.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTauxCnss.dateArchivageMin ? this.datePipe.transform(this.searchTauxCnss.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTauxCnss.dateArchivageMax ? this.datePipe.transform(this.searchTauxCnss.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTauxCnss.dateCreationMin ? this.datePipe.transform(this.searchTauxCnss.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTauxCnss.dateCreationMax ? this.datePipe.transform(this.searchTauxCnss.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTauxCnss.admin ? (this.searchTauxCnss.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTauxCnss.visible ? (this.searchTauxCnss.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTauxCnss.username ? this.searchTauxCnss.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tauxCnsss(): Array<TauxCnssVo> {
           return this.tauxCnssService.tauxCnsss;
       }
    set tauxCnsss(value: Array<TauxCnssVo>) {
        this.tauxCnssService.tauxCnsss = value;
       }

    get tauxCnssSelections(): Array<TauxCnssVo> {
           return this.tauxCnssService.tauxCnssSelections;
       }
    set tauxCnssSelections(value: Array<TauxCnssVo>) {
        this.tauxCnssService.tauxCnssSelections = value;
       }
   
     


    get selectedTauxCnss():TauxCnssVo {
           return this.tauxCnssService.selectedTauxCnss;
       }
    set selectedTauxCnss(value: TauxCnssVo) {
        this.tauxCnssService.selectedTauxCnss = value;
       }
    
    get createTauxCnssDialog():boolean {
           return this.tauxCnssService.createTauxCnssDialog;
       }
    set createTauxCnssDialog(value: boolean) {
        this.tauxCnssService.createTauxCnssDialog= value;
       }
    
    get editTauxCnssDialog():boolean {
           return this.tauxCnssService.editTauxCnssDialog;
       }
    set editTauxCnssDialog(value: boolean) {
        this.tauxCnssService.editTauxCnssDialog= value;
       }
    get viewTauxCnssDialog():boolean {
           return this.tauxCnssService.viewTauxCnssDialog;
       }
    set viewTauxCnssDialog(value: boolean) {
        this.tauxCnssService.viewTauxCnssDialog = value;
       }
       
     get searchTauxCnss(): TauxCnssVo {
        return this.tauxCnssService.searchTauxCnss;
       }
    set searchTauxCnss(value: TauxCnssVo) {
        this.tauxCnssService.searchTauxCnss = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
