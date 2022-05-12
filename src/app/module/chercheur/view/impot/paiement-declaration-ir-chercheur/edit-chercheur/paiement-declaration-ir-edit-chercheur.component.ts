import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';

@Component({
  selector: 'app-paiement-declaration-ir-edit-chercheur',
  templateUrl: './paiement-declaration-ir-edit-chercheur.component.html',
  styleUrls: ['./paiement-declaration-ir-edit-chercheur.component.css']
})
export class PaiementDeclarationIrEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDeclarationIrService: PaiementDeclarationIrService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private declarationIrService: DeclarationIrService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationIr = new DeclarationIrVo();
    this.declarationIrService.findAll().subscribe((data) => this.declarationIrs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPaiementDeclarationIr.datePaiement = DateUtils.toDate(this.selectedPaiementDeclarationIr.datePaiement);
    this.paiementDeclarationIrService.edit().subscribe(paiementDeclarationIr=>{
    const myIndex = this.paiementDeclarationIrs.findIndex(e => e.id === this.selectedPaiementDeclarationIr.id);
    this.paiementDeclarationIrs[myIndex] = this.selectedPaiementDeclarationIr;
    this.editPaiementDeclarationIrDialog = false;
    this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedeclarationIr(declarationIr: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'add');
                       if(isPermistted){
         this.selectedDeclarationIr = new DeclarationIrVo();
        this.createDeclarationIrDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaiementDeclarationIrDialog  = false;
}

// getters and setters

get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
    return this.paiementDeclarationIrService.paiementDeclarationIrs;
       }
set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
       }

 get selectedPaiementDeclarationIr(): PaiementDeclarationIrVo {
           return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
       }
    set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
       }

   get editPaiementDeclarationIrDialog(): boolean {
           return this.paiementDeclarationIrService.editPaiementDeclarationIrDialog;

       }
    set editPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.editPaiementDeclarationIrDialog = value;
       }

       get selectedDeclarationIr(): DeclarationIrVo {
           return this.declarationIrService.selectedDeclarationIr;
       }
      set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
       }
       get declarationIrs(): Array<DeclarationIrVo> {
           return this.declarationIrService.declarationIrs;
       }
       set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
       }
       get createDeclarationIrDialog(): boolean {
           return this.declarationIrService.createDeclarationIrDialog;
       }
      set createDeclarationIrDialog(value: boolean) {
        this.declarationIrService.createDeclarationIrDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
