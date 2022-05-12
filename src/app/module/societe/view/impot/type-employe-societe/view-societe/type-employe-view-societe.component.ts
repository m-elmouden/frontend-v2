import {Component, OnInit} from '@angular/core';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-employe-view-societe',
  templateUrl: './type-employe-view-societe.component.html',
  styleUrls: ['./type-employe-view-societe.component.css']
})
export class TypeEmployeViewSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEmployeService: TypeEmployeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeEmployeDialog  = false;
}

// getters and setters

get typeEmployes(): Array<TypeEmployeVo> {
    return this.typeEmployeService.typeEmployes;
       }
set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }

 get selectedTypeEmploye():TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
    set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }

   get viewTypeEmployeDialog():boolean {
           return this.typeEmployeService.viewTypeEmployeDialog;

       }
    set viewTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.viewTypeEmployeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
