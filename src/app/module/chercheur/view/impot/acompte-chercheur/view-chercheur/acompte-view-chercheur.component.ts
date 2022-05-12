import {Component, OnInit} from '@angular/core';
import {AcompteService} from '../../../../../../controller/service/Acompte.service';
import {AcompteVo} from '../../../../../../controller/model/Acompte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';

@Component({
  selector: 'app-acompte-view-chercheur',
  templateUrl: './acompte-view-chercheur.component.html',
  styleUrls: ['./acompte-view-chercheur.component.css']
})
export class AcompteViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private acompteService: AcompteService
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
    this.viewAcompteDialog  = false;
}

// getters and setters

get acomptes(): Array<AcompteVo> {
    return this.acompteService.acomptes;
       }
set acomptes(value: Array<AcompteVo>) {
        this.acompteService.acomptes = value;
       }

 get selectedAcompte():AcompteVo {
           return this.acompteService.selectedAcompte;
       }
    set selectedAcompte(value: AcompteVo) {
        this.acompteService.selectedAcompte = value;
       }

   get viewAcompteDialog():boolean {
           return this.acompteService.viewAcompteDialog;

       }
    set viewAcompteDialog(value: boolean) {
        this.acompteService.viewAcompteDialog= value;
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
