import {Component, OnInit} from '@angular/core';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-declaration-tva-edit-admin',
  templateUrl: './etat-declaration-tva-edit-admin.component.html',
  styleUrls: ['./etat-declaration-tva-edit-admin.component.css']
})
export class EtatDeclarationTvaEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDeclarationTvaService: EtatDeclarationTvaService
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
            this.selectedEtatDeclarationTva.dateArchivage = DateUtils.toDate(this.selectedEtatDeclarationTva.dateArchivage);
            this.selectedEtatDeclarationTva.dateCreation = DateUtils.toDate(this.selectedEtatDeclarationTva.dateCreation);
    this.etatDeclarationTvaService.edit().subscribe(etatDeclarationTva=>{
    const myIndex = this.etatDeclarationTvas.findIndex(e => e.id === this.selectedEtatDeclarationTva.id);
    this.etatDeclarationTvas[myIndex] = this.selectedEtatDeclarationTva;
    this.editEtatDeclarationTvaDialog = false;
    this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatDeclarationTvaDialog  = false;
}

// getters and setters

get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
    return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }

 get selectedEtatDeclarationTva(): EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
    set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }

   get editEtatDeclarationTvaDialog(): boolean {
           return this.etatDeclarationTvaService.editEtatDeclarationTvaDialog;

       }
    set editEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.editEtatDeclarationTvaDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
