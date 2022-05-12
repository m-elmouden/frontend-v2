import {Component, OnInit} from '@angular/core';
import {CpcService} from '../../../../../../controller/service/Cpc.service';
import {CpcVo} from '../../../../../../controller/model/Cpc.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';
import {CpcFactureVo} from '../../../../../../controller/model/CpcFacture.model';
import {CpcFactureService} from '../../../../../../controller/service/CpcFacture.service';

@Component({
  selector: 'app-cpc-edit-admin',
  templateUrl: './cpc-edit-admin.component.html',
  styleUrls: ['./cpc-edit-admin.component.css']
})
export class CpcEditAdminComponent implements OnInit {

        selectedCpcFactures: CpcFactureVo = new CpcFactureVo();
        cpcFacturesListe: Array<CpcFactureVo> = [];

        myFactures: Array<FactureVo> = [];


constructor(private datePipe: DatePipe, private cpcService: CpcService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private factureService: FactureService
 ,       private cpcFactureService: CpcFactureService
) {
}

// methods
ngOnInit(): void {
                this.selectedCpcFactures.factureVo = new FactureVo();
                this.factureService.findAll().subscribe((data) => this.factures = data);
}
        addCpcFactures() {
        if( this.selectedCpc.cpcFacturesVo == null ){
            this.selectedCpc.cpcFacturesVo = new Array<CpcFactureVo>();
        }
        this.selectedCpc.cpcFacturesVo.push(this.selectedCpcFactures);
        this.selectedCpcFactures = new CpcFactureVo();
        }

       deleteCpcFactures(p: CpcFactureVo) {
        this.selectedCpc.cpcFacturesVo.forEach((element, index) => {
            if (element === p) { this.selectedCpc.cpcFacturesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCpc.dateMinCpc = DateUtils.toDate(this.selectedCpc.dateMinCpc);
            this.selectedCpc.dateMaxCpc = DateUtils.toDate(this.selectedCpc.dateMaxCpc);
            this.selectedCpc.dateArchivage = DateUtils.toDate(this.selectedCpc.dateArchivage);
            this.selectedCpc.dateCreation = DateUtils.toDate(this.selectedCpc.dateCreation);
    this.cpcService.edit().subscribe(cpc=>{
    const myIndex = this.cpcs.findIndex(e => e.id === this.selectedCpc.id);
    this.cpcs[myIndex] = this.selectedCpc;
    this.editCpcDialog = false;
    this.selectedCpc = new CpcVo();


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
// methods

hideEditDialog(){
    this.editCpcDialog  = false;
}

// getters and setters

get cpcs(): Array<CpcVo> {
    return this.cpcService.cpcs;
       }
set cpcs(value: Array<CpcVo>) {
        this.cpcService.cpcs = value;
       }

 get selectedCpc(): CpcVo {
           return this.cpcService.selectedCpc;
       }
    set selectedCpc(value: CpcVo) {
        this.cpcService.selectedCpc = value;
       }

   get editCpcDialog(): boolean {
           return this.cpcService.editCpcDialog;

       }
    set editCpcDialog(value: boolean) {
        this.cpcService.editCpcDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
