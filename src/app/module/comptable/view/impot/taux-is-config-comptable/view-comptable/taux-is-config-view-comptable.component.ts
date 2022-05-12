import {Component, OnInit} from '@angular/core';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';
import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';

@Component({
  selector: 'app-taux-is-config-view-comptable',
  templateUrl: './taux-is-config-view-comptable.component.html',
  styleUrls: ['./taux-is-config-view-comptable.component.css']
})
export class TauxIsConfigViewComptableComponent implements OnInit {

        selectedTauxIss: TauxIsVo = new TauxIsVo();
        tauxIssListe: Array<TauxIsVo> = [];



constructor(private datePipe: DatePipe, private tauxIsConfigService: TauxIsConfigService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private tauxIsService :TauxIsService
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTauxIsConfigDialog  = false;
}

// getters and setters

get tauxIsConfigs(): Array<TauxIsConfigVo> {
    return this.tauxIsConfigService.tauxIsConfigs;
       }
set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }

 get selectedTauxIsConfig():TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
    set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }

   get viewTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.viewTauxIsConfigDialog;

       }
    set viewTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.viewTauxIsConfigDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
