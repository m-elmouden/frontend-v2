import {Component, OnInit} from '@angular/core';
import {TauxCnssService} from '../../../../../../controller/service/TauxCnss.service';
import {TauxCnssVo} from '../../../../../../controller/model/TauxCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';

@Component({
  selector: 'app-taux-cnss-view-societe',
  templateUrl: './taux-cnss-view-societe.component.html',
  styleUrls: ['./taux-cnss-view-societe.component.css']
})
export class TauxCnssViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private tauxCnssService: TauxCnssService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeTauxCnssService :TypeTauxCnssService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeTauxCnss = new TypeTauxCnssVo();
    this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
}

hideViewDialog(){
    this.viewTauxCnssDialog  = false;
}

// getters and setters

get tauxCnsss(): Array<TauxCnssVo> {
    return this.tauxCnssService.tauxCnsss;
       }
set tauxCnsss(value: Array<TauxCnssVo>) {
        this.tauxCnssService.tauxCnsss = value;
       }

 get selectedTauxCnss():TauxCnssVo {
           return this.tauxCnssService.selectedTauxCnss;
       }
    set selectedTauxCnss(value: TauxCnssVo) {
        this.tauxCnssService.selectedTauxCnss = value;
       }

   get viewTauxCnssDialog():boolean {
           return this.tauxCnssService.viewTauxCnssDialog;

       }
    set viewTauxCnssDialog(value: boolean) {
        this.tauxCnssService.viewTauxCnssDialog= value;
       }

       get selectedTypeTauxCnss():TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
      set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }
       get typeTauxCnsss():Array<TypeTauxCnssVo> {
           return this.typeTauxCnssService.typeTauxCnsss;
       }
       set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }
       get editTypeTauxCnssDialog():boolean {
           return this.typeTauxCnssService.editTypeTauxCnssDialog;
       }
      set editTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.editTypeTauxCnssDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
