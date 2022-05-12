import {Component, OnInit} from '@angular/core';
import {PresidentSocieteService} from '../../../../../../controller/service/PresidentSociete.service';
import {PresidentSocieteVo} from '../../../../../../controller/model/PresidentSociete.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';

@Component({
  selector: 'app-president-societe-edit-comptable',
  templateUrl: './president-societe-edit-comptable.component.html',
  styleUrls: ['./president-societe-edit-comptable.component.css']
})
export class PresidentSocieteEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private presidentSocieteService: PresidentSocieteService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
) {
}

// methods
ngOnInit(): void {
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.presidentSocieteService.edit().subscribe(presidentSociete=>{
    const myIndex = this.presidentSocietes.findIndex(e => e.id === this.selectedPresidentSociete.id);
    this.presidentSocietes[myIndex] = this.selectedPresidentSociete;
    this.editPresidentSocieteDialog = false;
    this.selectedPresidentSociete = new PresidentSocieteVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatesociete(societe: string) {
                      const isPermistted = await this.roleService.isPermitted('Societe', 'add');
                       if(isPermistted){
         this.selectedSociete = new SocieteVo();
        this.createSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPresidentSocieteDialog  = false;
}

// getters and setters

get presidentSocietes(): Array<PresidentSocieteVo> {
    return this.presidentSocieteService.presidentSocietes;
       }
set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this.presidentSocieteService.presidentSocietes = value;
       }

 get selectedPresidentSociete(): PresidentSocieteVo {
           return this.presidentSocieteService.selectedPresidentSociete;
       }
    set selectedPresidentSociete(value: PresidentSocieteVo) {
        this.presidentSocieteService.selectedPresidentSociete = value;
       }

   get editPresidentSocieteDialog(): boolean {
           return this.presidentSocieteService.editPresidentSocieteDialog;

       }
    set editPresidentSocieteDialog(value: boolean) {
        this.presidentSocieteService.editPresidentSocieteDialog = value;
       }

       get selectedSociete(): SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes(): Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get createSocieteDialog(): boolean {
           return this.societeService.createSocieteDialog;
       }
      set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
