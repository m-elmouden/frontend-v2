import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';

@Component({
  selector: 'app-paiement-declaration-tva-view-comptable',
  templateUrl: './paiement-declaration-tva-view-comptable.component.html',
  styleUrls: ['./paiement-declaration-tva-view-comptable.component.css']
})
export class PaiementDeclarationTvaViewComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDeclarationTvaService: PaiementDeclarationTvaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private declarationTvaService :DeclarationTvaService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationTva = new DeclarationTvaVo();
    this.declarationTvaService.findAll().subscribe((data) => this.declarationTvas = data);
}

hideViewDialog(){
    this.viewPaiementDeclarationTvaDialog  = false;
}

// getters and setters

get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
    return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }

 get selectedPaiementDeclarationTva():PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
    set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }

   get viewPaiementDeclarationTvaDialog():boolean {
           return this.paiementDeclarationTvaService.viewPaiementDeclarationTvaDialog;

       }
    set viewPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.viewPaiementDeclarationTvaDialog= value;
       }

       get selectedDeclarationTva():DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
      set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }
       get declarationTvas():Array<DeclarationTvaVo> {
           return this.declarationTvaService.declarationTvas;
       }
       set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }
       get editDeclarationTvaDialog():boolean {
           return this.declarationTvaService.editDeclarationTvaDialog;
       }
      set editDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.editDeclarationTvaDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
