import {Component, OnInit} from '@angular/core';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';

@Component({
  selector: 'app-cpc-facture-view-chercheur',
  templateUrl: './cpc-facture-view-chercheur.component.html',
  styleUrls: ['./cpc-facture-view-chercheur.component.css']
})
export class CpcFactureViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private cpcFactureService: CpcFactureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private cpcService :CpcService
    ,private factureService :FactureService
) {
}

// methods
ngOnInit(): void {
    this.selectedCpc = new CpcVo();
    this.cpcService.findAll().subscribe((data) => this.cpcs = data);
    this.selectedFacture = new FactureVo();
    this.factureService.findAll().subscribe((data) => this.factures = data);
}

hideViewDialog(){
    this.viewCpcFactureDialog  = false;
}

// getters and setters

get cpcFactures(): Array<CpcFactureVo> {
    return this.cpcFactureService.cpcFactures;
       }
set cpcFactures(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactures = value;
       }

 get selectedCpcFacture():CpcFactureVo {
           return this.cpcFactureService.selectedCpcFacture;
       }
    set selectedCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.selectedCpcFacture = value;
       }

   get viewCpcFactureDialog():boolean {
           return this.cpcFactureService.viewCpcFactureDialog;

       }
    set viewCpcFactureDialog(value: boolean) {
        this.cpcFactureService.viewCpcFactureDialog= value;
       }

       get selectedFacture():FactureVo {
           return this.factureService.selectedFacture;
       }
      set selectedFacture(value: FactureVo) {
        this.factureService.selectedFacture = value;
       }
       get factures():Array<FactureVo> {
           return this.factureService.factures;
       }
       set factures(value: Array<FactureVo>) {
        this.factureService.factures = value;
       }
       get editFactureDialog():boolean {
           return this.factureService.editFactureDialog;
       }
      set editFactureDialog(value: boolean) {
        this.factureService.editFactureDialog= value;
       }
       get selectedCpc():CpcVo {
           return this.cpcService.selectedCpc;
       }
      set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }
       get cpcs():Array<CpcVo> {
           return this.cpcService.cpcs;
       }
       set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }
       get editCpcDialog():boolean {
           return this.cpcService.editCpcDialog;
       }
      set editCpcDialog(value: boolean) {
        this.cpcService.editCpcDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
