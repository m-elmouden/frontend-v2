import {Component, OnInit} from '@angular/core';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-declaration-ir-view-admin',
  templateUrl: './etat-declaration-ir-view-admin.component.html',
  styleUrls: ['./etat-declaration-ir-view-admin.component.css']
})
export class EtatDeclarationIrViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDeclarationIrService: EtatDeclarationIrService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatDeclarationIrDialog  = false;
}

// getters and setters

get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
    return this.etatDeclarationIrService.etatDeclarationIrs;
       }
set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }

 get selectedEtatDeclarationIr():EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
    set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }

   get viewEtatDeclarationIrDialog():boolean {
           return this.etatDeclarationIrService.viewEtatDeclarationIrDialog;

       }
    set viewEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.viewEtatDeclarationIrDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
