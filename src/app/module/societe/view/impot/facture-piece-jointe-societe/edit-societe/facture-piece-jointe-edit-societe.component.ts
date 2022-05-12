import {Component, OnInit} from '@angular/core';
import {FacturePieceJointeService} from '../../../../../../controller/service/FacturePieceJointe.service';
import {FacturePieceJointeVo} from '../../../../../../controller/model/FacturePieceJointe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FactureVo} from '../../../../../../controller/model/Facture.model';
import {FactureService} from '../../../../../../controller/service/Facture.service';

@Component({
  selector: 'app-facture-piece-jointe-edit-societe',
  templateUrl: './facture-piece-jointe-edit-societe.component.html',
  styleUrls: ['./facture-piece-jointe-edit-societe.component.css']
})
export class FacturePieceJointeEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private facturePieceJointeService: FacturePieceJointeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private factureService: FactureService
) {
}

// methods
ngOnInit(): void {
    this.selectedFacture = new FactureVo();
    this.factureService.findAll().subscribe((data) => this.factures = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.facturePieceJointeService.edit().subscribe(facturePieceJointe=>{
    const myIndex = this.facturePieceJointes.findIndex(e => e.id === this.selectedFacturePieceJointe.id);
    this.facturePieceJointes[myIndex] = this.selectedFacturePieceJointe;
    this.editFacturePieceJointeDialog = false;
    this.selectedFacturePieceJointe = new FacturePieceJointeVo();


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
    this.editFacturePieceJointeDialog  = false;
}

// getters and setters

get facturePieceJointes(): Array<FacturePieceJointeVo> {
    return this.facturePieceJointeService.facturePieceJointes;
       }
set facturePieceJointes(value: Array<FacturePieceJointeVo>) {
        this.facturePieceJointeService.facturePieceJointes = value;
       }

 get selectedFacturePieceJointe(): FacturePieceJointeVo {
           return this.facturePieceJointeService.selectedFacturePieceJointe;
       }
    set selectedFacturePieceJointe(value: FacturePieceJointeVo) {
        this.facturePieceJointeService.selectedFacturePieceJointe = value;
       }

   get editFacturePieceJointeDialog(): boolean {
           return this.facturePieceJointeService.editFacturePieceJointeDialog;

       }
    set editFacturePieceJointeDialog(value: boolean) {
        this.facturePieceJointeService.editFacturePieceJointeDialog = value;
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
