import {Component, OnInit} from '@angular/core';
import {EtatDemandeService} from '../../../../../../controller/service/EtatDemande.service';
import {EtatDemandeVo} from '../../../../../../controller/model/EtatDemande.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-demande-edit-admin',
  templateUrl: './etat-demande-edit-admin.component.html',
  styleUrls: ['./etat-demande-edit-admin.component.css']
})
export class EtatDemandeEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDemandeService: EtatDemandeService
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
    this.etatDemandeService.edit().subscribe(etatDemande=>{
    const myIndex = this.etatDemandes.findIndex(e => e.id === this.selectedEtatDemande.id);
    this.etatDemandes[myIndex] = this.selectedEtatDemande;
    this.editEtatDemandeDialog = false;
    this.selectedEtatDemande = new EtatDemandeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatDemandeDialog  = false;
}

// getters and setters

get etatDemandes(): Array<EtatDemandeVo> {
    return this.etatDemandeService.etatDemandes;
       }
set etatDemandes(value: Array<EtatDemandeVo>) {
        this.etatDemandeService.etatDemandes = value;
       }

 get selectedEtatDemande(): EtatDemandeVo {
           return this.etatDemandeService.selectedEtatDemande;
       }
    set selectedEtatDemande(value: EtatDemandeVo) {
        this.etatDemandeService.selectedEtatDemande = value;
       }

   get editEtatDemandeDialog(): boolean {
           return this.etatDemandeService.editEtatDemandeDialog;

       }
    set editEtatDemandeDialog(value: boolean) {
        this.etatDemandeService.editEtatDemandeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
