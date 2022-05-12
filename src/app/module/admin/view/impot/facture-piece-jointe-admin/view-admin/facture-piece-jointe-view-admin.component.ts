import {Component, OnInit} from '@angular/core';
import {FacturePieceJointeService} from '../../../../../../controller/service/FacturePieceJointe.service';
import {FacturePieceJointeVo} from '../../../../../../controller/model/FacturePieceJointe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';

@Component({
  selector: 'app-facture-piece-jointe-view-admin',
  templateUrl: './facture-piece-jointe-view-admin.component.html',
  styleUrls: ['./facture-piece-jointe-view-admin.component.css']
})
export class FacturePieceJointeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private facturePieceJointeService: FacturePieceJointeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private factureService :FactureService
) {
}

// methods
ngOnInit(): void {
    this.selectedFacture = new FactureVo();
    this.factureService.findAll().subscribe((data) => this.factures = data);
}

hideViewDialog(){
    this.viewFacturePieceJointeDialog  = false;
}

// getters and setters

get facturePieceJointes(): Array<FacturePieceJointeVo> {
    return this.facturePieceJointeService.facturePieceJointes;
       }
set facturePieceJointes(value: Array<FacturePieceJointeVo>) {
        this.facturePieceJointeService.facturePieceJointes = value;
       }

 get selectedFacturePieceJointe():FacturePieceJointeVo {
           return this.facturePieceJointeService.selectedFacturePieceJointe;
       }
    set selectedFacturePieceJointe(value: FacturePieceJointeVo) {
        this.facturePieceJointeService.selectedFacturePieceJointe = value;
       }

   get viewFacturePieceJointeDialog():boolean {
           return this.facturePieceJointeService.viewFacturePieceJointeDialog;

       }
    set viewFacturePieceJointeDialog(value: boolean) {
        this.facturePieceJointeService.viewFacturePieceJointeDialog= value;
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
