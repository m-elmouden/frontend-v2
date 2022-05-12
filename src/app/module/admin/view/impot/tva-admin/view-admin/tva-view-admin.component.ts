import {Component, OnInit} from '@angular/core';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-tva-view-admin',
  templateUrl: './tva-view-admin.component.html',
  styleUrls: ['./tva-view-admin.component.css']
})
export class TvaViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private tvaService: TvaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTvaDialog  = false;
}

// getters and setters

get tvas(): Array<TvaVo> {
    return this.tvaService.tvas;
       }
set tvas(value: Array<TvaVo>) {
        this.tvaService.tvas = value;
       }

 get selectedTva():TvaVo {
           return this.tvaService.selectedTva;
       }
    set selectedTva(value: TvaVo) {
        this.tvaService.selectedTva = value;
       }

   get viewTvaDialog():boolean {
           return this.tvaService.viewTvaDialog;

       }
    set viewTvaDialog(value: boolean) {
        this.tvaService.viewTvaDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
