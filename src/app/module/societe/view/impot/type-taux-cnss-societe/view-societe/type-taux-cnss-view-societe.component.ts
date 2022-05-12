import {Component, OnInit} from '@angular/core';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-taux-cnss-view-societe',
  templateUrl: './type-taux-cnss-view-societe.component.html',
  styleUrls: ['./type-taux-cnss-view-societe.component.css']
})
export class TypeTauxCnssViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeTauxCnssService: TypeTauxCnssService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeTauxCnssDialog  = false;
}

// getters and setters

get typeTauxCnsss(): Array<TypeTauxCnssVo> {
    return this.typeTauxCnssService.typeTauxCnsss;
       }
set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }

 get selectedTypeTauxCnss():TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
    set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }

   get viewTypeTauxCnssDialog():boolean {
           return this.typeTauxCnssService.viewTypeTauxCnssDialog;

       }
    set viewTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.viewTypeTauxCnssDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
