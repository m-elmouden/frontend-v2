import {Component, OnInit} from '@angular/core';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-paiement-edit-comptable',
  templateUrl: './etat-paiement-edit-comptable.component.html',
  styleUrls: ['./etat-paiement-edit-comptable.component.css']
})
export class EtatPaiementEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatPaiementService: EtatPaiementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etatPaiementService.edit().subscribe(etatPaiement=>{
    const myIndex = this.etatPaiements.findIndex(e => e.id === this.selectedEtatPaiement.id);
    this.etatPaiements[myIndex] = this.selectedEtatPaiement;
    this.editEtatPaiementDialog = false;
    this.selectedEtatPaiement = new EtatPaiementVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatPaiementDialog  = false;
}

// getters and setters

get etatPaiements(): Array<EtatPaiementVo> {
    return this.etatPaiementService.etatPaiements;
       }
set etatPaiements(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiements = value;
       }

 get selectedEtatPaiement(): EtatPaiementVo {
           return this.etatPaiementService.selectedEtatPaiement;
       }
    set selectedEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.selectedEtatPaiement = value;
       }

   get editEtatPaiementDialog(): boolean {
           return this.etatPaiementService.editEtatPaiementDialog;

       }
    set editEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.editEtatPaiementDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
