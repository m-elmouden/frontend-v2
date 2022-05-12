import {Component, OnInit} from '@angular/core';
import {CompteComptableService} from '../../../../../../controller/service/CompteComptable.service';
import {CompteComptableVo} from '../../../../../../controller/model/CompteComptable.model';
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
  selector: 'app-compte-comptable-edit-comptable',
  templateUrl: './compte-comptable-edit-comptable.component.html',
  styleUrls: ['./compte-comptable-edit-comptable.component.css']
})
export class CompteComptableEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private compteComptableService: CompteComptableService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private sousClasseComptableService: SousClasseComptableService
) {
}

// methods
ngOnInit(): void {
    this.selectedSousClasseComptable = new SousClasseComptableVo();
    this.sousClasseComptableService.findAll().subscribe((data) => this.sousClasseComptables = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.compteComptableService.edit().subscribe(compteComptable=>{
    const myIndex = this.compteComptables.findIndex(e => e.id === this.selectedCompteComptable.id);
    this.compteComptables[myIndex] = this.selectedCompteComptable;
    this.editCompteComptableDialog = false;
    this.selectedCompteComptable = new CompteComptableVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatesousClasseComptable(sousClasseComptable: string) {
                      const isPermistted = await this.roleService.isPermitted('SousClasseComptable', 'add');
                       if(isPermistted){
         this.selectedSousClasseComptable = new SousClasseComptableVo();
        this.createSousClasseComptableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCompteComptableDialog  = false;
}

// getters and setters

get compteComptables(): Array<CompteComptableVo> {
    return this.compteComptableService.compteComptables;
       }
set compteComptables(value: Array<CompteComptableVo>) {
        this.compteComptableService.compteComptables = value;
       }

 get selectedCompteComptable(): CompteComptableVo {
           return this.compteComptableService.selectedCompteComptable;
       }
    set selectedCompteComptable(value: CompteComptableVo) {
        this.compteComptableService.selectedCompteComptable = value;
       }

   get editCompteComptableDialog(): boolean {
           return this.compteComptableService.editCompteComptableDialog;

       }
    set editCompteComptableDialog(value: boolean) {
        this.compteComptableService.editCompteComptableDialog = value;
       }

       get selectedSousClasseComptable(): SousClasseComptableVo {
           return this.sousClasseComptableService.selectedSousClasseComptable;
       }
      set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this.sousClasseComptableService.selectedSousClasseComptable = value;
       }
       get sousClasseComptables(): Array<SousClasseComptableVo> {
           return this.sousClasseComptableService.sousClasseComptables;
       }
       set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this.sousClasseComptableService.sousClasseComptables = value;
       }
       get createSousClasseComptableDialog(): boolean {
           return this.sousClasseComptableService.createSousClasseComptableDialog;
       }
      set createSousClasseComptableDialog(value: boolean) {
        this.sousClasseComptableService.createSousClasseComptableDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
