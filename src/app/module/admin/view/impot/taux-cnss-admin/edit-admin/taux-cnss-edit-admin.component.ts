import {Component, OnInit} from '@angular/core';
import {TauxCnssService} from '../../../../../../controller/service/TauxCnss.service';
import {TauxCnssVo} from '../../../../../../controller/model/TauxCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';

@Component({
  selector: 'app-taux-cnss-edit-admin',
  templateUrl: './taux-cnss-edit-admin.component.html',
  styleUrls: ['./taux-cnss-edit-admin.component.css']
})
export class TauxCnssEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private tauxCnssService: TauxCnssService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeTauxCnssService: TypeTauxCnssService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeTauxCnss = new TypeTauxCnssVo();
    this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedTauxCnss.dateApplicationMin = DateUtils.toDate(this.selectedTauxCnss.dateApplicationMin);
            this.selectedTauxCnss.dateApplicationMax = DateUtils.toDate(this.selectedTauxCnss.dateApplicationMax);
            this.selectedTauxCnss.dateArchivage = DateUtils.toDate(this.selectedTauxCnss.dateArchivage);
            this.selectedTauxCnss.dateCreation = DateUtils.toDate(this.selectedTauxCnss.dateCreation);
    this.tauxCnssService.edit().subscribe(tauxCnss=>{
    const myIndex = this.tauxCnsss.findIndex(e => e.id === this.selectedTauxCnss.id);
    this.tauxCnsss[myIndex] = this.selectedTauxCnss;
    this.editTauxCnssDialog = false;
    this.selectedTauxCnss = new TauxCnssVo();


    }, error => {
        console.log(error);
    });

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
    this.editTauxCnssDialog  = false;
}

// getters and setters

get tauxCnsss(): Array<TauxCnssVo> {
    return this.tauxCnssService.tauxCnsss;
       }
set tauxCnsss(value: Array<TauxCnssVo>) {
        this.tauxCnssService.tauxCnsss = value;
       }

 get selectedTauxCnss(): TauxCnssVo {
           return this.tauxCnssService.selectedTauxCnss;
       }
    set selectedTauxCnss(value: TauxCnssVo) {
        this.tauxCnssService.selectedTauxCnss = value;
       }

   get editTauxCnssDialog(): boolean {
           return this.tauxCnssService.editTauxCnssDialog;

       }
    set editTauxCnssDialog(value: boolean) {
        this.tauxCnssService.editTauxCnssDialog = value;
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
