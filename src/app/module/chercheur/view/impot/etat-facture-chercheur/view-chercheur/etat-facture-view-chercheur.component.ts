import {Component, OnInit} from '@angular/core';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-facture-view-chercheur',
  templateUrl: './etat-facture-view-chercheur.component.html',
  styleUrls: ['./etat-facture-view-chercheur.component.css']
})
export class EtatFactureViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatFactureService: EtatFactureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatFactureDialog  = false;
}

// getters and setters

get etatFactures(): Array<EtatFactureVo> {
    return this.etatFactureService.etatFactures;
       }
set etatFactures(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactures = value;
       }

 get selectedEtatFacture():EtatFactureVo {
           return this.etatFactureService.selectedEtatFacture;
       }
    set selectedEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.selectedEtatFacture = value;
       }

   get viewEtatFactureDialog():boolean {
           return this.etatFactureService.viewEtatFactureDialog;

       }
    set viewEtatFactureDialog(value: boolean) {
        this.etatFactureService.viewEtatFactureDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
