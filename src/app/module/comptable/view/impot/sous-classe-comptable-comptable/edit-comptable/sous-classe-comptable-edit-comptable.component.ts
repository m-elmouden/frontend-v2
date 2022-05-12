import {Component, OnInit} from '@angular/core';
import {SousClasseComptableService} from '../../../../../../controller/service/SousClasseComptable.service';
import {SousClasseComptableVo} from '../../../../../../controller/model/SousClasseComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ClasseComptableVo} from '../../../../../../controller/model/ClasseComptable.model';
import {ClasseComptableService} from '../../../../../../controller/service/ClasseComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';

@Component({
  selector: 'app-sous-classe-comptable-edit-comptable',
  templateUrl: './sous-classe-comptable-edit-comptable.component.html',
  styleUrls: ['./sous-classe-comptable-edit-comptable.component.css']
})
export class SousClasseComptableEditComptableComponent implements OnInit {

        selectedCompteComptables: CompteComptableVo = new CompteComptableVo();
        compteComptablesListe: Array<CompteComptableVo> = [];



constructor(private datePipe: DatePipe, private sousClasseComptableService: SousClasseComptableService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private classeComptableService: ClasseComptableService
 ,       private compteComptableService: CompteComptableService
) {
}

// methods
ngOnInit(): void {
    this.selectedClasseComptable = new ClasseComptableVo();
    this.classeComptableService.findAll().subscribe((data) => this.classeComptables = data);
}
        addCompteComptables() {
        if( this.selectedSousClasseComptable.compteComptablesVo == null ){
            this.selectedSousClasseComptable.compteComptablesVo = new Array<CompteComptableVo>();
        }
        this.selectedSousClasseComptable.compteComptablesVo.push(this.selectedCompteComptables);
        this.selectedCompteComptables = new CompteComptableVo();
        }

       deleteCompteComptables(p: CompteComptableVo) {
        this.selectedSousClasseComptable.compteComptablesVo.forEach((element, index) => {
            if (element === p) { this.selectedSousClasseComptable.compteComptablesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.sousClasseComptableService.edit().subscribe(sousClasseComptable=>{
    const myIndex = this.sousClasseComptables.findIndex(e => e.id === this.selectedSousClasseComptable.id);
    this.sousClasseComptables[myIndex] = this.selectedSousClasseComptable;
    this.editSousClasseComptableDialog = false;
    this.selectedSousClasseComptable = new SousClasseComptableVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateclasseComptable(classeComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('ClasseComptable', 'add');
                       if(isPermistted){
         this.selectedClasseComptable = new ClasseComptableVo();
        this.createClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editSousClasseComptableDialog  = false;
}

// getters and setters

get sousClasseComptables(): Array<SousClasseComptableVo> {
    return this.sousClasseComptableService.sousClasseComptables;
       }
set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }

 get selectedSousClasseComptable(): SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
    set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }

   get editSousClasseComptableDialog(): boolean {
           return this.sousClasseComptableService.editSousClasseComptableDialog;

       }
    set editSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.editSousClasseComptableDialog = value;
       }

       get selectedClasseComptable(): ClasseComptableVo {
           return this.classeComptableService.selectedClasseComptable;
       }
      set selectedClasseComptable(value: ClasseComptableVo) {
        this.classeComptableService.selectedClasseComptable = value;
       }
       get classeComptables(): Array<ClasseComptableVo> {
           return this.classeComptableService.classeComptables;
       }
       set classeComptables(value: Array<ClasseComptableVo>) {
        this.classeComptableService.classeComptables = value;
       }
       get createClasseComptableDialog(): boolean {
           return this.classeComptableService.createClasseComptableDialog;
       }
      set createClasseComptableDialog(value: boolean) {
        this.classeComptableService.createClasseComptableDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
