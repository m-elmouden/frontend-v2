import {Component, OnInit} from '@angular/core';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
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
  selector: 'app-acompte-edit-comptable',
  templateUrl: './acompte-edit-comptable.component.html',
  styleUrls: ['./acompte-edit-comptable.component.css']
})
export class AcompteEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private acompteService: AcompteService
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
            this.selectedAcompte.dateArchivage = DateUtils.toDate(this.selectedAcompte.dateArchivage);
            this.selectedAcompte.dateCreation = DateUtils.toDate(this.selectedAcompte.dateCreation);
    this.acompteService.edit().subscribe(acompte=>{
    const myIndex = this.acomptes.findIndex(e => e.id === this.selectedAcompte.id);
    this.acomptes[myIndex] = this.selectedAcompte;
    this.editAcompteDialog = false;
    this.selectedAcompte = new AcompteVo();


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
    this.editAcompteDialog  = false;
}

// getters and setters

get acomptes(): Array<AcompteVo> {
    return this.acompteService.acomptes;
       }
set acomptes(value: Array<AcompteVo>) {
        this.acompteService.acomptes = value;
       }

 get selectedAcompte(): AcompteVo {
           return this.acompteService.selectedAcompte;
       }
    set selectedAcompte(value: AcompteVo) {
        this.acompteService.selectedAcompte = value;
       }

   get editAcompteDialog(): boolean {
           return this.acompteService.editAcompteDialog;

       }
    set editAcompteDialog(value: boolean) {
        this.acompteService.editAcompteDialog = value;
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
