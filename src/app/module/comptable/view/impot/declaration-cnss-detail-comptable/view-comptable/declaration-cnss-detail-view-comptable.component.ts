import {Component, OnInit} from '@angular/core';
import {DeclarationCnssDetailService} from '../../../../../../controller/service/DeclarationCnssDetail.service';
import {DeclarationCnssDetailVo} from '../../../../../../controller/model/DeclarationCnssDetail.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {DeclarationCnssVo} from '../../../../../../controller/model/DeclarationCnss.model';
import {DeclarationCnssService} from '../../../../../../controller/service/DeclarationCnss.service';

@Component({
  selector: 'app-declaration-cnss-detail-view-comptable',
  templateUrl: './declaration-cnss-detail-view-comptable.component.html',
  styleUrls: ['./declaration-cnss-detail-view-comptable.component.css']
})
export class DeclarationCnssDetailViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationCnssDetailService: DeclarationCnssDetailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeTauxCnssService :TypeTauxCnssService
    ,private declarationCnssService :DeclarationCnssService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeTauxCnss = new TypeTauxCnssVo();
    this.typeTauxCnssService.findAll().subscribe((data) => this.typeTauxCnsss = data);
    this.selectedDeclarationCnss = new DeclarationCnssVo();
    this.declarationCnssService.findAll().subscribe((data) => this.declarationCnsss = data);
}

hideViewDialog(){
    this.viewDeclarationCnssDetailDialog  = false;
}

// getters and setters

get declarationCnssDetails(): Array<DeclarationCnssDetailVo> {
    return this.declarationCnssDetailService.declarationCnssDetails;
       }
set declarationCnssDetails(value: Array<DeclarationCnssDetailVo>) {
        this.declarationCnssDetailService.declarationCnssDetails = value;
       }

 get selectedDeclarationCnssDetail():DeclarationCnssDetailVo {
           return this.declarationCnssDetailService.selectedDeclarationCnssDetail;
       }
    set selectedDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this.declarationCnssDetailService.selectedDeclarationCnssDetail = value;
       }

   get viewDeclarationCnssDetailDialog():boolean {
           return this.declarationCnssDetailService.viewDeclarationCnssDetailDialog;

       }
    set viewDeclarationCnssDetailDialog(value: boolean) {
        this.declarationCnssDetailService.viewDeclarationCnssDetailDialog= value;
       }

       get selectedDeclarationCnss():DeclarationCnssVo {
           return this.declarationCnssService.selectedDeclarationCnss;
       }
      set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this.declarationCnssService.selectedDeclarationCnss = value;
       }
       get declarationCnsss():Array<DeclarationCnssVo> {
           return this.declarationCnssService.declarationCnsss;
       }
       set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this.declarationCnssService.declarationCnsss = value;
       }
       get editDeclarationCnssDialog():boolean {
           return this.declarationCnssService.editDeclarationCnssDialog;
       }
      set editDeclarationCnssDialog(value: boolean) {
        this.declarationCnssService.editDeclarationCnssDialog= value;
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
