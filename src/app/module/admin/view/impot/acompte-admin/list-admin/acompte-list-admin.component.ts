import {Component, OnInit} from '@angular/core';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SocieteService } from '../../../../../../controller/service/Societe.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-acompte-list-admin',
  templateUrl: './acompte-list-admin.component.html',
  styleUrls: ['./acompte-list-admin.component.css']
})
export class AcompteListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Acompte';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    societes :Array<SocieteVo>;


    constructor(private datePipe: DatePipe, private acompteService: AcompteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private societeService: SocieteService
) { }

    ngOnInit(): void {
      this.loadAcomptes();
      this.initExport();
      this.initCol();
      this.loadSociete();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadAcomptes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Acompte', 'list');
        isPermistted ? this.acompteService.findAll().subscribe(acomptes => this.acomptes = acomptes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.acompteService.findByCriteria(this.searchAcompte).subscribe(acomptes=>{
            
            this.acomptes = acomptes;
           // this.searchAcompte = new AcompteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numero', header: 'Numero'},
                            {field: 'annee', header: 'Annee'},
                            {field: 'montant', header: 'Montant'},
                        {field: 'societe?.id', header: 'Societe'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editAcompte(acompte:AcompteVo){
        const isPermistted = await this.roleService.isPermitted('Acompte', 'edit');
         if(isPermistted){
          this.acompteService.findByIdWithAssociatedList(acompte).subscribe(res => {
           this.selectedAcompte = res;
            this.selectedAcompte.dateArchivage = new Date(acompte.dateArchivage);
            this.selectedAcompte.dateCreation = new Date(acompte.dateCreation);
            this.editAcompteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewAcompte(acompte:AcompteVo){
        const isPermistted = await this.roleService.isPermitted('Acompte', 'view');
        if(isPermistted){
           this.acompteService.findByIdWithAssociatedList(acompte).subscribe(res => {
           this.selectedAcompte = res;
            this.selectedAcompte.dateArchivage = new Date(acompte.dateArchivage);
            this.selectedAcompte.dateCreation = new Date(acompte.dateCreation);
            this.viewAcompteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateAcompte(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedAcompte = new AcompteVo();
            this.createAcompteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverAcompte(acompte:AcompteVo){
const isPermistted = await this.roleService.isPermitted('Acompte', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Acompte) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.acompteService.archiver(acompte).subscribe(status=>{
const myIndex = this.acomptes.indexOf(acompte);
this.acomptes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Acompte archivé',
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

public async desarchiverAcompte(acompte:AcompteVo){
const isPermistted = await this.roleService.isPermitted('Acompte', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Acompte) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.acompteService.desarchiver(acompte).subscribe(status=>{
const myIndex = this.acomptes.indexOf(acompte);
this.acomptes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Acompte désarchivé',
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


    public async deleteAcompte(acompte:AcompteVo){
       const isPermistted = await this.roleService.isPermitted('Acompte', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Acompte) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.acompteService.delete(acompte).subscribe(status=>{
                          if(status > 0){
                          const position = this.acomptes.indexOf(acompte);
                          position > -1 ? this.acomptes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Acompte Supprimé',
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

public async loadSociete(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Acompte', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateAcompte(acompte: AcompteVo) {

     this.acompteService.findByIdWithAssociatedList(acompte).subscribe(
	 res => {
	       this.initDuplicateAcompte(res);
	       this.selectedAcompte = res;
	       this.selectedAcompte.id = null;
            this.createAcompteDialog = true;

});

	}

	initDuplicateAcompte(res: AcompteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.acomptes.map(e => {
    return {
                    'Numero': e.numero ,
                    'Annee': e.annee ,
                    'Montant': e.montant ,
            'Societe': e.societeVo?.id ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Numero Min': this.searchAcompte.numeroMin ? this.searchAcompte.numeroMin : environment.emptyForExport ,
            'Numero Max': this.searchAcompte.numeroMax ? this.searchAcompte.numeroMax : environment.emptyForExport ,
            'Annee Min': this.searchAcompte.anneeMin ? this.searchAcompte.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchAcompte.anneeMax ? this.searchAcompte.anneeMax : environment.emptyForExport ,
            'Montant Min': this.searchAcompte.montantMin ? this.searchAcompte.montantMin : environment.emptyForExport ,
            'Montant Max': this.searchAcompte.montantMax ? this.searchAcompte.montantMax : environment.emptyForExport ,
        'Societe': this.searchAcompte.societeVo?.id ? this.searchAcompte.societeVo?.id : environment.emptyForExport ,
            'Archive': this.searchAcompte.archive ? (this.searchAcompte.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchAcompte.dateArchivageMin ? this.datePipe.transform(this.searchAcompte.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchAcompte.dateArchivageMax ? this.datePipe.transform(this.searchAcompte.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchAcompte.dateCreationMin ? this.datePipe.transform(this.searchAcompte.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchAcompte.dateCreationMax ? this.datePipe.transform(this.searchAcompte.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchAcompte.admin ? (this.searchAcompte.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchAcompte.visible ? (this.searchAcompte.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchAcompte.username ? this.searchAcompte.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get acomptes(): Array<AcompteVo> {
           return this.acompteService.acomptes;
       }
    set acomptes(value: Array<AcompteVo>) {
        this.acompteService.acomptes = value;
       }

    get acompteSelections(): Array<AcompteVo> {
           return this.acompteService.acompteSelections;
       }
    set acompteSelections(value: Array<AcompteVo>) {
        this.acompteService.acompteSelections = value;
       }
   
     


    get selectedAcompte():AcompteVo {
           return this.acompteService.selectedAcompte;
       }
    set selectedAcompte(value: AcompteVo) {
        this.acompteService.selectedAcompte = value;
       }
    
    get createAcompteDialog():boolean {
           return this.acompteService.createAcompteDialog;
       }
    set createAcompteDialog(value: boolean) {
        this.acompteService.createAcompteDialog= value;
       }
    
    get editAcompteDialog():boolean {
           return this.acompteService.editAcompteDialog;
       }
    set editAcompteDialog(value: boolean) {
        this.acompteService.editAcompteDialog= value;
       }
    get viewAcompteDialog():boolean {
           return this.acompteService.viewAcompteDialog;
       }
    set viewAcompteDialog(value: boolean) {
        this.acompteService.viewAcompteDialog = value;
       }
       
     get searchAcompte(): AcompteVo {
        return this.acompteService.searchAcompte;
       }
    set searchAcompte(value: AcompteVo) {
        this.acompteService.searchAcompte = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
