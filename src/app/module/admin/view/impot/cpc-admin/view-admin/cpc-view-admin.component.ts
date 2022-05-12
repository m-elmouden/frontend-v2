import {Component, OnInit} from '@angular/core';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';

@Component({
  selector: 'app-cpc-view-admin',
  templateUrl: './cpc-view-admin.component.html',
  styleUrls: ['./cpc-view-admin.component.css']
})
export class CpcViewAdminComponent implements OnInit {

        selectedCpcFactures: CpcFactureVo = new CpcFactureVo();
        cpcFacturesListe: Array<CpcFactureVo> = [];

        myFactures: Array<FactureVo> = [];


constructor(private datePipe: DatePipe, private cpcService: CpcService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private factureService :FactureService
    ,private cpcFactureService :CpcFactureService
) {
}

// methods
ngOnInit(): void {
                this.selectedCpcFactures.factureVo = new FactureVo();
                this.factureService.findAll().subscribe((data) => this.factures = data);
}

hideViewDialog(){
    this.viewCpcDialog  = false;
}

// getters and setters

get cpcs(): Array<CpcVo> {
    return this.cpcService.cpcs;
       }
set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }

 get selectedCpc():CpcVo {
           return this.cpcService.selectedCpc;
       }
    set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }

   get viewCpcDialog():boolean {
           return this.cpcService.viewCpcDialog;

       }
    set viewCpcDialog(value: boolean) {
        this.cpcService.viewCpcDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
