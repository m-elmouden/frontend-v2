import {Component, OnInit} from '@angular/core';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
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
  selector: 'app-prelevement-social-list-comptable',
  templateUrl: './prelevement-social-list-comptable.component.html',
  styleUrls: ['./prelevement-social-list-comptable.component.css']
})
export class PrelevementSocialListComptableComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PrelevementSocial';


    constructor(private datePipe: DatePipe, private prelevementSocialService: PrelevementSocialService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadPrelevementSocials();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadPrelevementSocials(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'list');
        isPermistted ? this.prelevementSocialService.findAll().subscribe(prelevementSocials => this.prelevementSocials = prelevementSocials,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.prelevementSocialService.findByCriteria(this.searchPrelevementSocial).subscribe(prelevementSocials=>{
            
            this.prelevementSocials = prelevementSocials;
           // this.searchPrelevementSocial = new PrelevementSocialVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'pourcentage', header: 'Pourcentage'},
                            {field: 'dateMax', header: 'Date max'},
                            {field: 'dateMin', header: 'Date min'},
        ];
    }
    
    public async editPrelevementSocial(prelevementSocial:PrelevementSocialVo){
        const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'edit');
         if(isPermistted){
          this.prelevementSocialService.findByIdWithAssociatedList(prelevementSocial).subscribe(res => {
           this.selectedPrelevementSocial = res;
            this.selectedPrelevementSocial.dateMax = new Date(prelevementSocial.dateMax);
            this.selectedPrelevementSocial.dateMin = new Date(prelevementSocial.dateMin);
            this.editPrelevementSocialDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPrelevementSocial(prelevementSocial:PrelevementSocialVo){
        const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'view');
        if(isPermistted){
           this.prelevementSocialService.findByIdWithAssociatedList(prelevementSocial).subscribe(res => {
           this.selectedPrelevementSocial = res;
            this.selectedPrelevementSocial.dateMax = new Date(prelevementSocial.dateMax);
            this.selectedPrelevementSocial.dateMin = new Date(prelevementSocial.dateMin);
            this.viewPrelevementSocialDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePrelevementSocial(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPrelevementSocial = new PrelevementSocialVo();
            this.createPrelevementSocialDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePrelevementSocial(prelevementSocial:PrelevementSocialVo){
       const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Prelevement social) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.prelevementSocialService.delete(prelevementSocial).subscribe(status=>{
                          if(status > 0){
                          const position = this.prelevementSocials.indexOf(prelevementSocial);
                          position > -1 ? this.prelevementSocials.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Prelevement social Supprimé',
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


public async duplicatePrelevementSocial(prelevementSocial: PrelevementSocialVo) {

     this.prelevementSocialService.findByIdWithAssociatedList(prelevementSocial).subscribe(
	 res => {
	       this.initDuplicatePrelevementSocial(res);
	       this.selectedPrelevementSocial = res;
	       this.selectedPrelevementSocial.id = null;
            this.createPrelevementSocialDialog = true;

});

	}

	initDuplicatePrelevementSocial(res: PrelevementSocialVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.prelevementSocials.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Pourcentage': e.pourcentage ,
                    'Date max': this.datePipe.transform(e.dateMax , 'dd-MM-yyyy'),
                    'Date min': this.datePipe.transform(e.dateMin , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchPrelevementSocial.libelle ? this.searchPrelevementSocial.libelle : environment.emptyForExport ,
            'Pourcentage Min': this.searchPrelevementSocial.pourcentageMin ? this.searchPrelevementSocial.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchPrelevementSocial.pourcentageMax ? this.searchPrelevementSocial.pourcentageMax : environment.emptyForExport ,
            'Date max Min': this.searchPrelevementSocial.dateMaxMin ? this.datePipe.transform(this.searchPrelevementSocial.dateMaxMin , this.dateFormat) : environment.emptyForExport ,
            'Date max Max': this.searchPrelevementSocial.dateMaxMax ? this.datePipe.transform(this.searchPrelevementSocial.dateMaxMax , this.dateFormat) : environment.emptyForExport ,
            'Date min Min': this.searchPrelevementSocial.dateMinMin ? this.datePipe.transform(this.searchPrelevementSocial.dateMinMin , this.dateFormat) : environment.emptyForExport ,
            'Date min Max': this.searchPrelevementSocial.dateMinMax ? this.datePipe.transform(this.searchPrelevementSocial.dateMinMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get prelevementSocials(): Array<PrelevementSocialVo> {
           return this.prelevementSocialService.prelevementSocials;
       }
    set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
       }

    get prelevementSocialSelections(): Array<PrelevementSocialVo> {
           return this.prelevementSocialService.prelevementSocialSelections;
       }
    set prelevementSocialSelections(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocialSelections = value;
       }
   
     


    get selectedPrelevementSocial():PrelevementSocialVo {
           return this.prelevementSocialService.selectedPrelevementSocial;
       }
    set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
       }
    
    get createPrelevementSocialDialog():boolean {
           return this.prelevementSocialService.createPrelevementSocialDialog;
       }
    set createPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.createPrelevementSocialDialog= value;
       }
    
    get editPrelevementSocialDialog():boolean {
           return this.prelevementSocialService.editPrelevementSocialDialog;
       }
    set editPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.editPrelevementSocialDialog= value;
       }
    get viewPrelevementSocialDialog():boolean {
           return this.prelevementSocialService.viewPrelevementSocialDialog;
       }
    set viewPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.viewPrelevementSocialDialog = value;
       }
       
     get searchPrelevementSocial(): PrelevementSocialVo {
        return this.prelevementSocialService.searchPrelevementSocial;
       }
    set searchPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.searchPrelevementSocial = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
