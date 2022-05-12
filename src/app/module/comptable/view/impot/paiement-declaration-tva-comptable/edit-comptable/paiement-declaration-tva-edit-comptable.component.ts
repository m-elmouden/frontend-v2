import {Component, OnInit} from '@angular/core';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';

@Component({
  selector: 'app-paiement-declaration-tva-edit-comptable',
  templateUrl: './paiement-declaration-tva-edit-comptable.component.html',
  styleUrls: ['./paiement-declaration-tva-edit-comptable.component.css']
})
export class PaiementDeclarationTvaEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDeclarationTvaService: PaiementDeclarationTvaService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private declarationTvaService: DeclarationTvaService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeclarationTva = new DeclarationTvaVo();
    this.declarationTvaService.findAll().subscribe((data) => this.declarationTvas = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPaiementDeclarationTva.datePaiement = DateUtils.toDate(this.selectedPaiementDeclarationTva.datePaiement);
    this.paiementDeclarationTvaService.edit().subscribe(paiementDeclarationTva=>{
    const myIndex = this.paiementDeclarationTvas.findIndex(e => e.id === this.selectedPaiementDeclarationTva.id);
    this.paiementDeclarationTvas[myIndex] = this.selectedPaiementDeclarationTva;
    this.editPaiementDeclarationTvaDialog = false;
    this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedeclarationTva(declarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('DeclarationTva', 'add');
                       if(isPermistted){
         this.selectedDeclarationTva = new DeclarationTvaVo();
        this.createDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaiementDeclarationTvaDialog  = false;
}

// getters and setters

get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
    return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }

 get selectedPaiementDeclarationTva(): PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
    set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }

   get editPaiementDeclarationTvaDialog(): boolean {
           return this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog;

       }
    set editPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.editPaiementDeclarationTvaDialog = value;
       }

       get selectedDeclarationTva(): DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
      set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }
       get declarationTvas(): Array<DeclarationTvaVo> {
           return this.declarationTvaService.declarationTvas;
       }
       set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }
       get createDeclarationTvaDialog(): boolean {
           return this.declarationTvaService.createDeclarationTvaDialog;
       }
      set createDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.createDeclarationTvaDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
