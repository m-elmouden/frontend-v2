import {Component, OnInit} from '@angular/core';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';

@Component({
  selector: 'app-taux-is-edit-societe',
  templateUrl: './taux-is-edit-societe.component.html',
  styleUrls: ['./taux-is-edit-societe.component.css']
})
export class TauxIsEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private tauxIsService: TauxIsService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private tauxIsConfigService: TauxIsConfigService
) {
}

// methods
ngOnInit(): void {
    this.selectedTauxIsConfig = new TauxIsConfigVo();
    this.tauxIsConfigService.findAll().subscribe((data) => this.tauxIsConfigs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.tauxIsService.edit().subscribe(tauxIs=>{
    const myIndex = this.tauxIss.findIndex(e => e.id === this.selectedTauxIs.id);
    this.tauxIss[myIndex] = this.selectedTauxIs;
    this.editTauxIsDialog = false;
    this.selectedTauxIs = new TauxIsVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetauxIsConfig(tauxIsConfig: string) {
                      const isPermistted = await this.roleService.isPermitted('TauxIsConfig', 'add');
                       if(isPermistted){
         this.selectedTauxIsConfig = new TauxIsConfigVo();
        this.createTauxIsConfigDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTauxIsDialog  = false;
}

// getters and setters

get tauxIss(): Array<TauxIsVo> {
    return this.tauxIsService.tauxIss;
       }
set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }

 get selectedTauxIs(): TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
    set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }

   get editTauxIsDialog(): boolean {
           return this.tauxIsService.editTauxIsDialog;

       }
    set editTauxIsDialog(value: boolean) {
        this.tauxIsService.editTauxIsDialog = value;
       }

       get selectedTauxIsConfig(): TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
      set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
       get tauxIsConfigs(): Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
       set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }
       get createTauxIsConfigDialog(): boolean {
           return this.tauxIsConfigService.createTauxIsConfigDialog;
       }
      set createTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.createTauxIsConfigDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
