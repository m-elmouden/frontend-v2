import {Component, OnInit} from '@angular/core';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';

@Component({
  selector: 'app-president-societe-view-societe',
  templateUrl: './president-societe-view-societe.component.html',
  styleUrls: ['./president-societe-view-societe.component.css']
})
export class PresidentSocieteViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private presidentSocieteService: PresidentSocieteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private societeService :SocieteService
) {
}

// methods
ngOnInit(): void {
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
}

hideViewDialog(){
    this.viewPresidentSocieteDialog  = false;
}

// getters and setters

get presidentSocietes(): Array<PresidentSocieteVo> {
    return this.presidentSocieteService.presidentSocietes;
       }
set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }

 get selectedPresidentSociete():PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
    set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }

   get viewPresidentSocieteDialog():boolean {
           return this.presidentSocieteService.viewPresidentSocieteDialog;

       }
    set viewPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.viewPresidentSocieteDialog= value;
       }

       get selectedSociete():SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes():Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get editSocieteDialog():boolean {
           return this.societeService.editSocieteDialog;
       }
      set editSocieteDialog(value: boolean) {
        this.societeService.editSocieteDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
