import {Component, OnInit} from '@angular/core';
import {EtatDeclarationIsService} from '../../../../../../controller/service/EtatDeclarationIs.service';
import {EtatDeclarationIsVo} from '../../../../../../controller/model/EtatDeclarationIs.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-declaration-is-view-admin',
  templateUrl: './etat-declaration-is-view-admin.component.html',
  styleUrls: ['./etat-declaration-is-view-admin.component.css']
})
export class EtatDeclarationIsViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDeclarationIsService: EtatDeclarationIsService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatDeclarationIsDialog  = false;
}

// getters and setters

get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
    return this.etatDeclarationIsService.etatDeclarationIss;
       }
set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this.etatDeclarationIsService.etatDeclarationIss = value;
       }

 get selectedEtatDeclarationIs():EtatDeclarationIsVo {
           return this.etatDeclarationIsService.selectedEtatDeclarationIs;
       }
    set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this.etatDeclarationIsService.selectedEtatDeclarationIs = value;
       }

   get viewEtatDeclarationIsDialog():boolean {
           return this.etatDeclarationIsService.viewEtatDeclarationIsDialog;

       }
    set viewEtatDeclarationIsDialog(value: boolean) {
        this.etatDeclarationIsService.viewEtatDeclarationIsDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
