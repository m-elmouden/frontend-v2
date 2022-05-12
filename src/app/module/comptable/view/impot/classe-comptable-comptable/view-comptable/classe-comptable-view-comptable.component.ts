import {Component, OnInit} from '@angular/core';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';

@Component({
  selector: 'app-classe-comptable-view-comptable',
  templateUrl: './classe-comptable-view-comptable.component.html',
  styleUrls: ['./classe-comptable-view-comptable.component.css']
})
export class ClasseComptableViewComptableComponent implements OnInit {

        selectedSousClasseComptables: SousClasseComptableVo = new SousClasseComptableVo();
        sousClasseComptablesListe: Array<SousClasseComptableVo> = [];



constructor(private datePipe: DatePipe, private classeComptableService: ClasseComptableService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private sousClasseComptableService :SousClasseComptableService
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewClasseComptableDialog  = false;
}

// getters and setters

get classeComptables(): Array<ClasseComptableVo> {
    return this.classeComptableService.classeComptables;
       }
set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }

 get selectedClasseComptable():ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
    set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }

   get viewClasseComptableDialog():boolean {
           return this.classeComptableService.viewClasseComptableDialog;

       }
    set viewClasseComptableDialog(value: boolean) {
        this.classeComptableService.viewClasseComptableDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
