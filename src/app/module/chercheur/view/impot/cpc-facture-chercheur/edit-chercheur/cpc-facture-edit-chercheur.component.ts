import {Component, OnInit} from '@angular/core';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';

@Component({
  selector: 'app-cpc-facture-edit-chercheur',
  templateUrl: './cpc-facture-edit-chercheur.component.html',
  styleUrls: ['./cpc-facture-edit-chercheur.component.css']
})
export class CpcFactureEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private cpcFactureService: CpcFactureService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private cpcService: CpcService
 ,       private factureService: FactureService
) {
}

// methods
ngOnInit(): void {
    this.selectedCpc = new CpcVo();
    this.cpcService.findAll().subscribe((data) => this.cpcs = data);
    this.selectedFacture = new FactureVo();
    this.factureService.findAll().subscribe((data) => this.factures = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.cpcFactureService.edit().subscribe(cpcFacture=>{
    const myIndex = this.cpcFactures.findIndex(e => e.id === this.selectedCpcFacture.id);
    this.cpcFactures[myIndex] = this.selectedCpcFacture;
    this.editCpcFactureDialog = false;
    this.selectedCpcFacture = new CpcFactureVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatefacture(facture: string) {
                      const isPermistted = await this.roleService.isPermitted('Facture', 'add');
                       if(isPermistted){
         this.selectedFacture = new FactureVo();
        this.createFactureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecpc(cpc: string) {
                      const isPermistted = await this.roleService.isPermitted('Cpc', 'add');
                       if(isPermistted){
         this.selectedCpc = new CpcVo();
        this.createCpcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCpcFactureDialog  = false;
}

// getters and setters

get cpcFactures(): Array<CpcFactureVo> {
    return this.cpcFactureService.cpcFactures;
       }
set cpcFactures(value: Array<CpcFactureVo>) {
        this.cpcFactureService.cpcFactures = value;
       }

 get selectedCpcFacture(): CpcFactureVo {
           return this.cpcFactureService.selectedCpcFacture;
       }
    set selectedCpcFacture(value: CpcFactureVo) {
        this.cpcFactureService.selectedCpcFacture = value;
       }

   get editCpcFactureDialog(): boolean {
           return this.cpcFactureService.editCpcFactureDialog;

       }
    set editCpcFactureDialog(value: boolean) {
        this.cpcFactureService.editCpcFactureDialog = value;
       }

       get selectedFacture(): FactureVo {
           return this.factureService.selectedFacture;
       }
      set selectedFacture(value: FactureVo) {
        this.factureService.selectedFacture = value;
       }
       get factures(): Array<FactureVo> {
           return this.factureService.factures;
       }
       set factures(value: Array<FactureVo>) {
        this.factureService.factures = value;
       }
       get createFactureDialog(): boolean {
           return this.factureService.createFactureDialog;
       }
      set createFactureDialog(value: boolean) {
        this.factureService.createFactureDialog= value;
       }
       get selectedCpc(): CpcVo {
           return this.cpcService.selectedCpc;
       }
      set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }
       get cpcs(): Array<CpcVo> {
           return this.cpcService.cpcs;
       }
       set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }
       get createCpcDialog(): boolean {
           return this.cpcService.createCpcDialog;
       }
      set createCpcDialog(value: boolean) {
        this.cpcService.createCpcDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
