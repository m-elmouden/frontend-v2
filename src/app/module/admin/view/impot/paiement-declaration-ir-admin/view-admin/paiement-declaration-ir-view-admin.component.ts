import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';

@Component({
  selector: 'app-paiement-declaration-ir-view-admin',
  templateUrl: './paiement-declaration-ir-view-admin.component.html',
  styleUrls: ['./paiement-declaration-ir-view-admin.component.css']
})
export class PaiementDeclarationIrViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDeclarationIrService: PaiementDeclarationIrService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private declarationIrService :DeclarationIrService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationIr = new DeclarationIrVo();
    this.declarationIrService.findAll().subscribe((data) => this.declarationIrs = data);
}

hideViewDialog(){
    this.viewPaiementDeclarationIrDialog  = false;
}

// getters and setters

get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
    return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }

 get selectedPaiementDeclarationIr():PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
    set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }

   get viewPaiementDeclarationIrDialog():boolean {
           return this.paiementDeclarationIrService.viewPaiementDeclarationIrDialog;

       }
    set viewPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.viewPaiementDeclarationIrDialog= value;
       }

       get selectedDeclarationIr():DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
      set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }
       get declarationIrs():Array<DeclarationIrVo> {
           return this.declarationIrService.declarationIrs;
       }
       set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }
       get editDeclarationIrDialog():boolean {
           return this.declarationIrService.editDeclarationIrDialog;
       }
      set editDeclarationIrDialog(value: boolean) {
        this.declarationIrService.editDeclarationIrDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
