import {Component, OnInit} from '@angular/core';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-declaration-tva-view-chercheur',
  templateUrl: './etat-declaration-tva-view-chercheur.component.html',
  styleUrls: ['./etat-declaration-tva-view-chercheur.component.css']
})
export class EtatDeclarationTvaViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDeclarationTvaService: EtatDeclarationTvaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatDeclarationTvaDialog  = false;
}

// getters and setters

get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
    return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }

 get selectedEtatDeclarationTva():EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
    set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }

   get viewEtatDeclarationTvaDialog():boolean {
           return this.etatDeclarationTvaService.viewEtatDeclarationTvaDialog;

       }
    set viewEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.viewEtatDeclarationTvaDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
