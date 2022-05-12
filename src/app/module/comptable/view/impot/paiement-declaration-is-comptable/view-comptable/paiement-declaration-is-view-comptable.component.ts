import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';

@Component({
  selector: 'app-paiement-declaration-is-view-comptable',
  templateUrl: './paiement-declaration-is-view-comptable.component.html',
  styleUrls: ['./paiement-declaration-is-view-comptable.component.css']
})
export class PaiementDeclarationIsViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDeclarationIsService: PaiementDeclarationIsService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private declarationIsService :DeclarationIsService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationIs = new DeclarationIsVo();
    this.declarationIsService.findAll().subscribe((data) => this.declarationIss = data);
}

hideViewDialog(){
    this.viewPaiementDeclarationIsDialog  = false;
}

// getters and setters

get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
    return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }

 get selectedPaiementDeclarationIs():PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
    set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }

   get viewPaiementDeclarationIsDialog():boolean {
           return this.paiementDeclarationIsService.viewPaiementDeclarationIsDialog;

       }
    set viewPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.viewPaiementDeclarationIsDialog= value;
       }

       get selectedDeclarationIs():DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
      set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }
       get declarationIss():Array<DeclarationIsVo> {
           return this.declarationIsService.declarationIss;
       }
       set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }
       get editDeclarationIsDialog():boolean {
           return this.declarationIsService.editDeclarationIsDialog;
       }
      set editDeclarationIsDialog(value: boolean) {
        this.declarationIsService.editDeclarationIsDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
