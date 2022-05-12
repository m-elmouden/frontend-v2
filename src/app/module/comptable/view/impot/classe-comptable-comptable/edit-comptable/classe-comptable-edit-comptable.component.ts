import {Component, OnInit} from '@angular/core';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';

@Component({
  selector: 'app-classe-comptable-edit-comptable',
  templateUrl: './classe-comptable-edit-comptable.component.html',
  styleUrls: ['./classe-comptable-edit-comptable.component.css']
})
export class ClasseComptableEditComptableComponent implements OnInit {

        selectedSousClasseComptables: SousClasseComptableVo = new SousClasseComptableVo();
        sousClasseComptablesListe: Array<SousClasseComptableVo> = [];



constructor(private datePipe: DatePipe, private classeComptableService: ClasseComptableService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private sousClasseComptableService: SousClasseComptableService
) {
}

// methods
ngOnInit(): void {
}
        addSousClasseComptables() {
        if( this.selectedClasseComptable.sousClasseComptablesVo == null ){
            this.selectedClasseComptable.sousClasseComptablesVo = new Array<SousClasseComptableVo>();
        }
        this.selectedClasseComptable.sousClasseComptablesVo.push(this.selectedSousClasseComptables);
        this.selectedSousClasseComptables = new SousClasseComptableVo();
        }

       deleteSousClasseComptables(p: SousClasseComptableVo) {
        this.selectedClasseComptable.sousClasseComptablesVo.forEach((element, index) => {
            if (element === p) { this.selectedClasseComptable.sousClasseComptablesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedClasseComptable.dateArchivage = DateUtils.toDate(this.selectedClasseComptable.dateArchivage);
            this.selectedClasseComptable.dateCreation = DateUtils.toDate(this.selectedClasseComptable.dateCreation);
    this.classeComptableService.edit().subscribe(classeComptable=>{
    const myIndex = this.classeComptables.findIndex(e => e.id === this.selectedClasseComptable.id);
    this.classeComptables[myIndex] = this.selectedClasseComptable;
    this.editClasseComptableDialog = false;
    this.selectedClasseComptable = new ClasseComptableVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editClasseComptableDialog  = false;
}

// getters and setters

get classeComptables(): Array<ClasseComptableVo> {
    return this.classeComptableService.classeComptables;
       }
set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }

 get selectedClasseComptable(): ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
    set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }

   get editClasseComptableDialog(): boolean {
           return this.classeComptableService.editClasseComptableDialog;

       }
    set editClasseComptableDialog(value: boolean) {
        this.classeComptableService.editClasseComptableDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
