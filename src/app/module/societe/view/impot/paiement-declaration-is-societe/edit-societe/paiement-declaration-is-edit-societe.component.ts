import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationIsService} from '../../../../../../controller/service/PaiementDeclarationIs.service';
import {PaiementDeclarationIsVo} from '../../../../../../controller/model/PaiementDeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DeclarationIsVo} from '../../../../../../controller/model/DeclarationIs.model';
import {DeclarationIsService} from '../../../../../../controller/service/DeclarationIs.service';

@Component({
  selector: 'app-paiement-declaration-is-edit-societe',
  templateUrl: './paiement-declaration-is-edit-societe.component.html',
  styleUrls: ['./paiement-declaration-is-edit-societe.component.css']
})
export class PaiementDeclarationIsEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDeclarationIsService: PaiementDeclarationIsService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private declarationIsService: DeclarationIsService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationIs = new DeclarationIsVo();
    this.declarationIsService.findAll().subscribe((data) => this.declarationIss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPaiementDeclarationIs.datePaiement = DateUtils.toDate(this.selectedPaiementDeclarationIs.datePaiement);
    this.paiementDeclarationIsService.edit().subscribe(paiementDeclarationIs=>{
    const myIndex = this.paiementDeclarationIss.findIndex(e => e.id === this.selectedPaiementDeclarationIs.id);
    this.paiementDeclarationIss[myIndex] = this.selectedPaiementDeclarationIs;
    this.editPaiementDeclarationIsDialog = false;
    this.selectedPaiementDeclarationIs = new PaiementDeclarationIsVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedeclarationIs(declarationIs: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationIs', 'add');
                       if(isPermistted){
         this.selectedDeclarationIs = new DeclarationIsVo();
        this.createDeclarationIsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaiementDeclarationIsDialog  = false;
}

// getters and setters

get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
    return this.paiementDeclarationIsService.paiementDeclarationIss;
       }
set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this.paiementDeclarationIsService.paiementDeclarationIss = value;
       }

 get selectedPaiementDeclarationIs(): PaiementDeclarationIsVo {
           return this.paiementDeclarationIsService.selectedPaiementDeclarationIs;
       }
    set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this.paiementDeclarationIsService.selectedPaiementDeclarationIs = value;
       }

   get editPaiementDeclarationIsDialog(): boolean {
           return this.paiementDeclarationIsService.editPaiementDeclarationIsDialog;

       }
    set editPaiementDeclarationIsDialog(value: boolean) {
        this.paiementDeclarationIsService.editPaiementDeclarationIsDialog = value;
       }

       get selectedDeclarationIs(): DeclarationIsVo {
           return this.declarationIsService.selectedDeclarationIs;
       }
      set selectedDeclarationIs(value: DeclarationIsVo) {
        this.declarationIsService.selectedDeclarationIs = value;
       }
       get declarationIss(): Array<DeclarationIsVo> {
           return this.declarationIsService.declarationIss;
       }
       set declarationIss(value: Array<DeclarationIsVo>) {
        this.declarationIsService.declarationIss = value;
       }
       get createDeclarationIsDialog(): boolean {
           return this.declarationIsService.createDeclarationIsDialog;
       }
      set createDeclarationIsDialog(value: boolean) {
        this.declarationIsService.createDeclarationIsDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
