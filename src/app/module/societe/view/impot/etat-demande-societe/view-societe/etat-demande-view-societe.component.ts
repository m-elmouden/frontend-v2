import {Component, OnInit} from '@angular/core';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-demande-view-societe',
  templateUrl: './etat-demande-view-societe.component.html',
  styleUrls: ['./etat-demande-view-societe.component.css']
})
export class EtatDemandeViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDemandeService: EtatDemandeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatDemandeDialog  = false;
}

// getters and setters

get etatDemandes(): Array<EtatDemandeVo> {
    return this.etatDemandeService.etatDemandes;
       }
set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }

 get selectedEtatDemande():EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
    set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }

   get viewEtatDemandeDialog():boolean {
           return this.etatDemandeService.viewEtatDemandeDialog;

       }
    set viewEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.viewEtatDemandeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
