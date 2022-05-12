import {Component, OnInit} from '@angular/core';
import {EtatFactureService} from '../../../../../../controller/service/EtatFacture.service';
import {EtatFactureVo} from '../../../../../../controller/model/EtatFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-facture-edit-societe',
  templateUrl: './etat-facture-edit-societe.component.html',
  styleUrls: ['./etat-facture-edit-societe.component.css']
})
export class EtatFactureEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatFactureService: EtatFactureService
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
    this.etatFactureService.edit().subscribe(etatFacture=>{
    const myIndex = this.etatFactures.findIndex(e => e.id === this.selectedEtatFacture.id);
    this.etatFactures[myIndex] = this.selectedEtatFacture;
    this.editEtatFactureDialog = false;
    this.selectedEtatFacture = new EtatFactureVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatFactureDialog  = false;
}

// getters and setters

get etatFactures(): Array<EtatFactureVo> {
    return this.etatFactureService.etatFactures;
       }
set etatFactures(value: Array<EtatFactureVo>) {
        this.etatFactureService.etatFactures = value;
       }

 get selectedEtatFacture(): EtatFactureVo {
           return this.etatFactureService.selectedEtatFacture;
       }
    set selectedEtatFacture(value: EtatFactureVo) {
        this.etatFactureService.selectedEtatFacture = value;
       }

   get editEtatFactureDialog(): boolean {
           return this.etatFactureService.editEtatFactureDialog;

       }
    set editEtatFactureDialog(value: boolean) {
        this.etatFactureService.editEtatFactureDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
