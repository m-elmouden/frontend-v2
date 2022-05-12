import {Component, OnInit} from '@angular/core';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';
import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';

@Component({
  selector: 'app-sous-classe-comptable-view-chercheur',
  templateUrl: './sous-classe-comptable-view-chercheur.component.html',
  styleUrls: ['./sous-classe-comptable-view-chercheur.component.css']
})
export class SousClasseComptableViewChercheurComponent implements OnInit {

        selectedCompteComptables: CompteComptableVo = new CompteComptableVo();
        compteComptablesListe: Array<CompteComptableVo> = [];



constructor(private datePipe: DatePipe, private sousClasseComptableService: SousClasseComptableService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private classeComptableService :ClasseComptableService
    ,private compteComptableService :CompteComptableService
) {
}

// methods
ngOnInit(): void {
    this.selectedClasseComptable = new ClasseComptableVo();
    this.classeComptableService.findAll().subscribe((data) => this.classeComptables = data);
}

hideViewDialog(){
    this.viewSousClasseComptableDialog  = false;
}

// getters and setters

get sousClasseComptables(): Array<SousClasseComptableVo> {
    return this.sousClasseComptableService.sousClasseComptables;
       }
set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }

 get selectedSousClasseComptable():SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
    set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }

   get viewSousClasseComptableDialog():boolean {
           return this.sousClasseComptableService.viewSousClasseComptableDialog;

       }
    set viewSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.viewSousClasseComptableDialog= value;
       }

       get selectedClasseComptable():ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
      set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }
       get classeComptables():Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptables;
       }
       set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }
       get editClasseComptableDialog():boolean {
           return this.classeComptableService.editClasseComptableDialog;
       }
      set editClasseComptableDialog(value: boolean) {
        this.classeComptableService.editClasseComptableDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
