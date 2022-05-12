import {Component, OnInit} from '@angular/core';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-taux-ir-view-admin',
  templateUrl: './taux-ir-view-admin.component.html',
  styleUrls: ['./taux-ir-view-admin.component.css']
})
export class TauxIrViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private tauxIrService: TauxIrService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTauxIrDialog  = false;
}

// getters and setters

get tauxIrs(): Array<TauxIrVo> {
    return this.tauxIrService.tauxIrs;
       }
set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
       }

 get selectedTauxIr():TauxIrVo {
           return this.tauxIrService.selectedTauxIr;
       }
    set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
       }

   get viewTauxIrDialog():boolean {
           return this.tauxIrService.viewTauxIrDialog;

       }
    set viewTauxIrDialog(value: boolean) {
        this.tauxIrService.viewTauxIrDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
