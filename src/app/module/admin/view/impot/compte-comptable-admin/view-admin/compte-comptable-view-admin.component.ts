import {Component, OnInit} from '@angular/core';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';

@Component({
  selector: 'app-compte-comptable-view-admin',
  templateUrl: './compte-comptable-view-admin.component.html',
  styleUrls: ['./compte-comptable-view-admin.component.css']
})
export class CompteComptableViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private compteComptableService: CompteComptableService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private sousClasseComptableService :SousClasseComptableService
) {
}

// methods
ngOnInit(): void {
    this.selectedSousClasseComptable = new SousClasseComptableVo();
    this.sousClasseComptableService.findAll().subscribe((data) => this.sousClasseComptables = data);
}

hideViewDialog(){
    this.viewCompteComptableDialog  = false;
}

// getters and setters

get compteComptables(): Array<CompteComptableVo> {
    return this.compteComptableService.compteComptables;
       }
set compteComptables(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptables = value;
       }

 get selectedCompteComptable():CompteComptableVo {
           return this.compteComptableService.selectedCompteComptable;
       }
    set selectedCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.selectedCompteComptable = value;
       }

   get viewCompteComptableDialog():boolean {
           return this.compteComptableService.viewCompteComptableDialog;

       }
    set viewCompteComptableDialog(value: boolean) {
        this.compteComptableService.viewCompteComptableDialog= value;
       }

       get selectedSousClasseComptable():SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
      set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }
       get sousClasseComptables():Array<SousClasseComptableVo> {
           return this.sousClasseComptableService.sousClasseComptables;
       }
       set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }
       get editSousClasseComptableDialog():boolean {
           return this.sousClasseComptableService.editSousClasseComptableDialog;
       }
      set editSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.editSousClasseComptableDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
