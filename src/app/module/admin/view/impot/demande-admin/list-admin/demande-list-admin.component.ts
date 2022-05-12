import {Component, OnInit} from '@angular/core';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SocieteService } from '../../../../../../controller/service/Societe.service';
import { ComptableService } from '../../../../../../controller/service/Comptable.service';
import { EtatDemandeService } from '../../../../../../controller/service/EtatDemande.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {CommentaireVo} from '../../../../../../controller/model/Commentaire.model';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-demande-list-admin',
  templateUrl: './demande-list-admin.component.html',
  styleUrls: ['./demande-list-admin.component.css']
})
export class DemandeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Demande';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    societes :Array<SocieteVo>;
    comptables :Array<ComptableVo>;
    etatDemandes :Array<EtatDemandeVo>;


    constructor(private datePipe: DatePipe, private demandeService: DemandeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private societeService: SocieteService
        , private comptableService: ComptableService
        , private etatDemandeService: EtatDemandeService
) { }

    ngOnInit(): void {
      this.loadDemandes();
      this.initExport();
      this.initCol();
      this.loadSociete();
      this.loadComptable();
      this.loadEtatDemande();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDemandes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Demande', 'list');
        isPermistted ? this.demandeService.findAll().subscribe(demandes => this.demandes = demandes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.demandeService.findByCriteria(this.searchDemande).subscribe(demandes=>{
            
            this.demandes = demandes;
           // this.searchDemande = new DemandeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'operation', header: 'Operation'},
                            {field: 'dateDemande', header: 'Date demande'},
                            {field: 'annee', header: 'Annee'},
                            {field: 'mois', header: 'Mois'},
                            {field: 'trimestre', header: 'Trimestre'},
                        {field: 'societe?.id', header: 'Societe'},
                        {field: 'comptable?.code', header: 'Comptable'},
                        {field: 'etatDemande?.libelle', header: 'Etat demande'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDemande(demande:DemandeVo){
        const isPermistted = await this.roleService.isPermitted('Demande', 'edit');
         if(isPermistted){
          this.demandeService.findByIdWithAssociatedList(demande).subscribe(res => {
           this.selectedDemande = res;
            this.selectedDemande.dateDemande = new Date(demande.dateDemande);
            this.selectedDemande.dateArchivage = new Date(demande.dateArchivage);
            this.selectedDemande.dateCreation = new Date(demande.dateCreation);
            this.editDemandeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDemande(demande:DemandeVo){
        const isPermistted = await this.roleService.isPermitted('Demande', 'view');
        if(isPermistted){
           this.demandeService.findByIdWithAssociatedList(demande).subscribe(res => {
           this.selectedDemande = res;
            this.selectedDemande.dateDemande = new Date(demande.dateDemande);
            this.selectedDemande.dateArchivage = new Date(demande.dateArchivage);
            this.selectedDemande.dateCreation = new Date(demande.dateCreation);
            this.viewDemandeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDemande(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDemande = new DemandeVo();
            this.createDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverDemande(demande:DemandeVo){
const isPermistted = await this.roleService.isPermitted('Demande', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Demande) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.demandeService.archiver(demande).subscribe(status=>{
const myIndex = this.demandes.indexOf(demande);
this.demandes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Demande archivé',
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

public async desarchiverDemande(demande:DemandeVo){
const isPermistted = await this.roleService.isPermitted('Demande', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Demande) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.demandeService.desarchiver(demande).subscribe(status=>{
const myIndex = this.demandes.indexOf(demande);
this.demandes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Demande désarchivé',
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


    public async deleteDemande(demande:DemandeVo){
       const isPermistted = await this.roleService.isPermitted('Demande', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Demande) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.demandeService.delete(demande).subscribe(status=>{
                          if(status > 0){
                          const position = this.demandes.indexOf(demande);
                          position > -1 ? this.demandes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Demande Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('Demande', 'list');
    isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComptable(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Demande', 'list');
    isPermistted ? this.comptableService.findAll().subscribe(comptables => this.comptables = comptables,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatDemande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Demande', 'list');
    isPermistted ? this.etatDemandeService.findAll().subscribe(etatDemandes => this.etatDemandes = etatDemandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDemande(demande: DemandeVo) {

     this.demandeService.findByIdWithAssociatedList(demande).subscribe(
	 res => {
	       this.initDuplicateDemande(res);
	       this.selectedDemande = res;
	       this.selectedDemande.id = null;
            this.createDemandeDialog = true;

});

	}

	initDuplicateDemande(res: DemandeVo) {
        if (res.facturesVo != null) {
             res.facturesVo.forEach(d => { d.demandeVo = null; d.id = null; });
                }
        if (res.demandePieceJointesVo != null) {
             res.demandePieceJointesVo.forEach(d => { d.demandeVo = null; d.id = null; });
                }
        if (res.commentairesVo != null) {
             res.commentairesVo.forEach(d => { d.demandeVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.demandes.map(e => {
    return {
                    'Reference': e.reference ,
                    'Operation': e.operation ,
                    'Date demande': this.datePipe.transform(e.dateDemande , 'dd-MM-yyyy'),
                    'Annee': e.annee ,
                    'Mois': e.mois ,
                    'Trimestre': e.trimestre ,
            'Societe': e.societeVo?.id ,
            'Comptable': e.comptableVo?.code ,
            'Etat demande': e.etatDemandeVo?.libelle ,
                    'Demande piece jointes': e.demandePieceJointesVo ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchDemande.reference ? this.searchDemande.reference : environment.emptyForExport ,
            'Operation': this.searchDemande.operation ? this.searchDemande.operation : environment.emptyForExport ,
            'Date demande Min': this.searchDemande.dateDemandeMin ? this.datePipe.transform(this.searchDemande.dateDemandeMin , this.dateFormat) : environment.emptyForExport ,
            'Date demande Max': this.searchDemande.dateDemandeMax ? this.datePipe.transform(this.searchDemande.dateDemandeMax , this.dateFormat) : environment.emptyForExport ,
            'Annee Min': this.searchDemande.anneeMin ? this.searchDemande.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchDemande.anneeMax ? this.searchDemande.anneeMax : environment.emptyForExport ,
            'Mois Min': this.searchDemande.moisMin ? this.searchDemande.moisMin : environment.emptyForExport ,
            'Mois Max': this.searchDemande.moisMax ? this.searchDemande.moisMax : environment.emptyForExport ,
            'Trimestre Min': this.searchDemande.trimestreMin ? this.searchDemande.trimestreMin : environment.emptyForExport ,
            'Trimestre Max': this.searchDemande.trimestreMax ? this.searchDemande.trimestreMax : environment.emptyForExport ,
        'Societe': this.searchDemande.societeVo?.id ? this.searchDemande.societeVo?.id : environment.emptyForExport ,
        'Comptable': this.searchDemande.comptableVo?.code ? this.searchDemande.comptableVo?.code : environment.emptyForExport ,
        'Etat demande': this.searchDemande.etatDemandeVo?.libelle ? this.searchDemande.etatDemandeVo?.libelle : environment.emptyForExport ,
            'Demande piece jointes Min': this.searchDemande.demandePieceJointesMin ? this.searchDemande.demandePieceJointesMin : environment.emptyForExport ,
            'Demande piece jointes Max': this.searchDemande.demandePieceJointesMax ? this.searchDemande.demandePieceJointesMax : environment.emptyForExport ,
            'Archive': this.searchDemande.archive ? (this.searchDemande.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDemande.dateArchivageMin ? this.datePipe.transform(this.searchDemande.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDemande.dateArchivageMax ? this.datePipe.transform(this.searchDemande.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDemande.dateCreationMin ? this.datePipe.transform(this.searchDemande.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDemande.dateCreationMax ? this.datePipe.transform(this.searchDemande.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDemande.admin ? (this.searchDemande.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDemande.visible ? (this.searchDemande.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDemande.username ? this.searchDemande.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get demandes(): Array<DemandeVo> {
           return this.demandeService.demandes;
       }
    set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }

    get demandeSelections(): Array<DemandeVo> {
           return this.demandeService.demandeSelections;
       }
    set demandeSelections(value: Array<DemandeVo>) {
        this.demandeService.demandeSelections = value;
       }
   
     


    get selectedDemande():DemandeVo {
           return this.demandeService.selectedDemande;
       }
    set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }
    
    get createDemandeDialog():boolean {
           return this.demandeService.createDemandeDialog;
       }
    set createDemandeDialog(value: boolean) {
        this.demandeService.createDemandeDialog= value;
       }
    
    get editDemandeDialog():boolean {
           return this.demandeService.editDemandeDialog;
       }
    set editDemandeDialog(value: boolean) {
        this.demandeService.editDemandeDialog= value;
       }
    get viewDemandeDialog():boolean {
           return this.demandeService.viewDemandeDialog;
       }
    set viewDemandeDialog(value: boolean) {
        this.demandeService.viewDemandeDialog = value;
       }
       
     get searchDemande(): DemandeVo {
        return this.demandeService.searchDemande;
       }
    set searchDemande(value: DemandeVo) {
        this.demandeService.searchDemande = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
