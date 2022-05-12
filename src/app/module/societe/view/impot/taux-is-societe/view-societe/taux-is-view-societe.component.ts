import {Component, OnInit} from '@angular/core';
import {TauxIsService} from '../../../../../../controller/service/TauxIs.service';
import {TauxIsVo} from '../../../../../../controller/model/TauxIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TauxIsConfigVo} from '../../../../../../controller/model/TauxIsConfig.model';
import {TauxIsConfigService} from '../../../../../../controller/service/TauxIsConfig.service';

@Component({
  selector: 'app-taux-is-view-societe',
  templateUrl: './taux-is-view-societe.component.html',
  styleUrls: ['./taux-is-view-societe.component.css']
})
export class TauxIsViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private tauxIsService: TauxIsService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private tauxIsConfigService :TauxIsConfigService
) {
}

// methods
ngOnInit(): void {
    this.selectedTauxIsConfig = new TauxIsConfigVo();
    this.tauxIsConfigService.findAll().subscribe((data) => this.tauxIsConfigs = data);
}

hideViewDialog(){
    this.viewTauxIsDialog  = false;
}

// getters and setters

get tauxIss(): Array<TauxIsVo> {
    return this.tauxIsService.tauxIss;
       }
set tauxIss(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
       }

 get selectedTauxIs():TauxIsVo {
           return this.tauxIsService.selectedTauxIs;
       }
    set selectedTauxIs(value: TauxIsVo) {
        this.tauxIsService.selectedTauxIs = value;
       }

   get viewTauxIsDialog():boolean {
           return this.tauxIsService.viewTauxIsDialog;

       }
    set viewTauxIsDialog(value: boolean) {
        this.tauxIsService.viewTauxIsDialog= value;
       }

       get selectedTauxIsConfig():TauxIsConfigVo {
           return this.tauxIsConfigService.selectedTauxIsConfig;
       }
      set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this.tauxIsConfigService.selectedTauxIsConfig = value;
       }
       get tauxIsConfigs():Array<TauxIsConfigVo> {
           return this.tauxIsConfigService.tauxIsConfigs;
       }
       set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this.tauxIsConfigService.tauxIsConfigs = value;
       }
       get editTauxIsConfigDialog():boolean {
           return this.tauxIsConfigService.editTauxIsConfigDialog;
       }
      set editTauxIsConfigDialog(value: boolean) {
        this.tauxIsConfigService.editTauxIsConfigDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
