import {Component, OnInit} from '@angular/core';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-declaration-is-edit-societe',
  templateUrl: './etat-declaration-is-edit-societe.component.html',
  styleUrls: ['./etat-declaration-is-edit-societe.component.css']
})
export class EtatDeclarationIsEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDeclarationIsService: EtatDeclarationIsService
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
            this.selectedEtatDeclarationIs.dateArchivage = DateUtils.toDate(this.selectedEtatDeclarationIs.dateArchivage);
            this.selectedEtatDeclarationIs.dateCreation = DateUtils.toDate(this.selectedEtatDeclarationIs.dateCreation);
    this.etatDeclarationIsService.edit().subscribe(etatDeclarationIs=>{
    const myIndex = this.etatDeclarationIss.findIndex(e => e.id === this.selectedEtatDeclarationIs.id);
    this.etatDeclarationIss[myIndex] = this.selectedEtatDeclarationIs;
    this.editEtatDeclarationIsDialog = false;
    this.selectedEtatDeclarationIs = new EtatDeclarationIsVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatDeclarationIsDialog  = false;
}

// getters and setters

get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
    return this.etatDeclarationIsService.etatDeclarationIss;
       }
set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }

 get selectedEtatDeclarationIs(): EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
    set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }

   get editEtatDeclarationIsDialog(): boolean {
           return this.etatDeclarationIsService.editEtatDeclarationIsDialog;

       }
    set editEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.editEtatDeclarationIsDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
