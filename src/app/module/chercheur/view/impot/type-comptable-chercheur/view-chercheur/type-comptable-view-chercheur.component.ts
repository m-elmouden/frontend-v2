import {Component, OnInit} from '@angular/core';
import {TypeComptableService} from '../../../../../../controller/service/TypeComptable.service';
import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-comptable-view-chercheur',
  templateUrl: './type-comptable-view-chercheur.component.html',
  styleUrls: ['./type-comptable-view-chercheur.component.css']
})
export class TypeComptableViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeComptableService: TypeComptableService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeComptableDialog  = false;
}

// getters and setters

get typeComptables(): Array<TypeComptableVo> {
    return this.typeComptableService.typeComptables;
       }
set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }

 get selectedTypeComptable():TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
    set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }

   get viewTypeComptableDialog():boolean {
           return this.typeComptableService.viewTypeComptableDialog;

       }
    set viewTypeComptableDialog(value: boolean) {
        this.typeComptableService.viewTypeComptableDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
