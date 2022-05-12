import {Component, OnInit} from '@angular/core';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';

@Component({
  selector: 'app-taux-is-config-edit-admin',
  templateUrl: './taux-is-config-edit-admin.component.html',
  styleUrls: ['./taux-is-config-edit-admin.component.css']
})
export class TauxIsConfigEditAdminComponent implements OnInit {

        selectedTauxIss: TauxIsVo = new TauxIsVo();
        tauxIssListe: Array<TauxIsVo> = [];



constructor(private datePipe: DatePipe, private tauxIsConfigService: TauxIsConfigService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private tauxIsService: TauxIsService
) {
}

// methods
ngOnInit(): void {
}
        addTauxIss() {
        if( this.selectedTauxIsConfig.tauxIssVo == null ){
            this.selectedTauxIsConfig.tauxIssVo = new Array<TauxIsVo>();
        }
        this.selectedTauxIsConfig.tauxIssVo.push(this.selectedTauxIss);
        this.selectedTauxIss = new TauxIsVo();
        }

       deleteTauxIss(p: TauxIsVo) {
        this.selectedTauxIsConfig.tauxIssVo.forEach((element, index) => {
            if (element === p) { this.selectedTauxIsConfig.tauxIssVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedTauxIsConfig.dateMin = DateUtils.toDate(this.selectedTauxIsConfig.dateMin);
            this.selectedTauxIsConfig.dateMax = DateUtils.toDate(this.selectedTauxIsConfig.dateMax);
    this.tauxIsConfigService.edit().subscribe(tauxIsConfig=>{
    const myIndex = this.tauxIsConfigs.findIndex(e => e.id === this.selectedTauxIsConfig.id);
    this.tauxIsConfigs[myIndex] = this.selectedTauxIsConfig;
    this.editTauxIsConfigDialog = false;
    this.selectedTauxIsConfig = new TauxIsConfigVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTauxIsConfigDialog  = false;
}

// getters and setters

get tauxIsConfigs(): Array<TauxIsConfigVo> {
    return this.tauxIsConfigService.tauxIsConfigs;
       }
set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }

 get selectedTauxIsConfig(): TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
    set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }

   get editTauxIsConfigDialog(): boolean {
           return this.tauxIsConfigService.editTauxIsConfigDialog;

       }
    set editTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.editTauxIsConfigDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
