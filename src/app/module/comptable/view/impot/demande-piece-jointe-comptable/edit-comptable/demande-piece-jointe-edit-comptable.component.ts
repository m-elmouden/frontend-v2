import {Component, OnInit} from '@angular/core';
import {DemandePieceJointeService} from '../../../../../../controller/service/DemandePieceJointe.service';
import {DemandePieceJointeVo} from '../../../../../../controller/model/DemandePieceJointe.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DemandeVo} from '../../../../../../controller/model/Demande.model';
import {DemandeService} from '../../../../../../controller/service/Demande.service';

@Component({
  selector: 'app-demande-piece-jointe-edit-comptable',
  templateUrl: './demande-piece-jointe-edit-comptable.component.html',
  styleUrls: ['./demande-piece-jointe-edit-comptable.component.css']
})
export class DemandePieceJointeEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private demandePieceJointeService: DemandePieceJointeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private demandeService: DemandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedDemande = new DemandeVo();
    this.demandeService.findAll().subscribe((data) => this.demandes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.demandePieceJointeService.edit().subscribe(demandePieceJointe=>{
    const myIndex = this.demandePieceJointes.findIndex(e => e.id === this.selectedDemandePieceJointe.id);
    this.demandePieceJointes[myIndex] = this.selectedDemandePieceJointe;
    this.editDemandePieceJointeDialog = false;
    this.selectedDemandePieceJointe = new DemandePieceJointeVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedemande(demande: string) {
                      const isPermistted = await this.roleService.isPermitted('Demande', 'add');
                       if(isPermistted){
         this.selectedDemande = new DemandeVo();
        this.createDemandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDemandePieceJointeDialog  = false;
}

// getters and setters

get demandePieceJointes(): Array<DemandePieceJointeVo> {
    return this.demandePieceJointeService.demandePieceJointes;
       }
set demandePieceJointes(value: Array<DemandePieceJointeVo>) {
        this.demandePieceJointeService.demandePieceJointes = value;
       }

 get selectedDemandePieceJointe(): DemandePieceJointeVo {
           return this.demandePieceJointeService.selectedDemandePieceJointe;
       }
    set selectedDemandePieceJointe(value: DemandePieceJointeVo) {
        this.demandePieceJointeService.selectedDemandePieceJointe = value;
       }

   get editDemandePieceJointeDialog(): boolean {
           return this.demandePieceJointeService.editDemandePieceJointeDialog;

       }
    set editDemandePieceJointeDialog(value: boolean) {
        this.demandePieceJointeService.editDemandePieceJointeDialog = value;
       }

       get selectedDemande(): DemandeVo {
           return this.demandeService.selectedDemande;
       }
      set selectedDemande(value: DemandeVo) {
        this.demandeService.selectedDemande = value;
       }
       get demandes(): Array<DemandeVo> {
           return this.demandeService.demandes;
       }
       set demandes(value: Array<DemandeVo>) {
        this.demandeService.demandes = value;
       }
       get createDemandeDialog(): boolean {
           return this.demandeService.createDemandeDialog;
       }
      set createDemandeDialog(value: boolean) {
        this.demandeService.createDemandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
