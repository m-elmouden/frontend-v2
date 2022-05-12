import {Component, OnInit} from '@angular/core';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';

@Component({
  selector: 'app-declaration-cnss-detail-edit-chercheur',
  templateUrl: './declaration-cnss-detail-edit-chercheur.component.html',
  styleUrls: ['./declaration-cnss-detail-edit-chercheur.component.css']
})
export class DeclarationCnssDetailEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationCnssDetailService: DeclarationCnssDetailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeTauxCnssService: TypeTauxCnssService
 ,       private declarationCnssService: DeclarationCnssService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeTauxCnss = new TypeTauxCnssVo();
    this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
    this.selectedDeclarationCnss = new DeclarationCnssVo();
    this.declarationCnssService.findAll().subscribe((data) => this.declarationCnsss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDeclarationCnssDetail.dateArchivage = DateUtils.toDate(this.selectedDeclarationCnssDetail.dateArchivage);
            this.selectedDeclarationCnssDetail.dateCreation = DateUtils.toDate(this.selectedDeclarationCnssDetail.dateCreation);
    this.declarationCnssDetailService.edit().subscribe(declarationCnssDetail=>{
    const myIndex = this.declarationCnssDetails.findIndex(e => e.id === this.selectedDeclarationCnssDetail.id);
    this.declarationCnssDetails[myIndex] = this.selectedDeclarationCnssDetail;
    this.editDeclarationCnssDetailDialog = false;
    this.selectedDeclarationCnssDetail = new DeclarationCnssDetailVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedeclarationCnss(declarationCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationCnss', 'add');
                       if(isPermistted){
         this.selectedDeclarationCnss = new DeclarationCnssVo();
        this.createDeclarationCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeTauxCnss(typeTauxCnss: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeTauxCnss', 'add');
                       if(isPermistted){
         this.selectedTypeTauxCnss = new TypeTauxCnssVo();
        this.createTypeTauxCnssDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDeclarationCnssDetailDialog  = false;
}

// getters and setters

get declarationCnssDetails(): Array<DeclarationCnssDetailVo> {
    return this.declarationCnssDetailService.declarationCnssDetails;
       }
set declarationCnssDetails(value: Array<DeclarationCnssDetailVo>) {
        this.declarationCnssDetailService.declarationCnssDetails = value;
       }

 get selectedDeclarationCnssDetail(): DeclarationCnssDetailVo {
           return this.declarationCnssDetailService.selectedDeclarationCnssDetail;
       }
    set selectedDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this.declarationCnssDetailService.selectedDeclarationCnssDetail = value;
       }

   get editDeclarationCnssDetailDialog(): boolean {
           return this.declarationCnssDetailService.editDeclarationCnssDetailDialog;

       }
    set editDeclarationCnssDetailDialog(value: boolean) {
        this.declarationCnssDetailService.editDeclarationCnssDetailDialog = value;
       }

       get selectedDeclarationCnss(): DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss(): Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get createDeclarationCnssDialog(): boolean {
           return this.declarationCnssService.createDeclarationCnssDialog;
       }
      set createDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.createDeclarationCnssDialog= value;
       }
       get selectedTypeTauxCnss(): TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
      set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }
       get typeTauxCnsss(): Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnsss;
       }
       set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }
       get createTypeTauxCnssDialog(): boolean {
           return this.typeTauxCnssService.createTypeTauxCnssDialog;
       }
      set createTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.createTypeTauxCnssDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
