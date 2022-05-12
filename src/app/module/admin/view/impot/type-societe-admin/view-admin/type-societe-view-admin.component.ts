import {Component, OnInit} from '@angular/core';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-societe-view-admin',
  templateUrl: './type-societe-view-admin.component.html',
  styleUrls: ['./type-societe-view-admin.component.css']
})
export class TypeSocieteViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeSocieteService: TypeSocieteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeSocieteDialog  = false;
}

// getters and setters

get typeSocietes(): Array<TypeSocieteVo> {
    return this.typeSocieteService.typeSocietes;
       }
set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }

 get selectedTypeSociete():TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
    set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }

   get viewTypeSocieteDialog():boolean {
           return this.typeSocieteService.viewTypeSocieteDialog;

       }
    set viewTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.viewTypeSocieteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
