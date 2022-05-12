import {Component, OnInit} from '@angular/core';
import {EtatPaiementService} from '../../../../../../controller/service/EtatPaiement.service';
import {EtatPaiementVo} from '../../../../../../controller/model/EtatPaiement.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-paiement-view-chercheur',
  templateUrl: './etat-paiement-view-chercheur.component.html',
  styleUrls: ['./etat-paiement-view-chercheur.component.css']
})
export class EtatPaiementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatPaiementService: EtatPaiementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatPaiementDialog  = false;
}

// getters and setters

get etatPaiements(): Array<EtatPaiementVo> {
    return this.etatPaiementService.etatPaiements;
       }
set etatPaiements(value: Array<EtatPaiementVo>) {
        this.etatPaiementService.etatPaiements = value;
       }

 get selectedEtatPaiement():EtatPaiementVo {
           return this.etatPaiementService.selectedEtatPaiement;
       }
    set selectedEtatPaiement(value: EtatPaiementVo) {
        this.etatPaiementService.selectedEtatPaiement = value;
       }

   get viewEtatPaiementDialog():boolean {
           return this.etatPaiementService.viewEtatPaiementDialog;

       }
    set viewEtatPaiementDialog(value: boolean) {
        this.etatPaiementService.viewEtatPaiementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
