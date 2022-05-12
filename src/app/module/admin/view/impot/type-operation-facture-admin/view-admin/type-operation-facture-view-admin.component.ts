import {Component, OnInit} from '@angular/core';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-operation-facture-view-admin',
  templateUrl: './type-operation-facture-view-admin.component.html',
  styleUrls: ['./type-operation-facture-view-admin.component.css']
})
export class TypeOperationFactureViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeOperationFactureService: TypeOperationFactureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeOperationFactureDialog  = false;
}

// getters and setters

get typeOperationFactures(): Array<TypeOperationFactureVo> {
    return this.typeOperationFactureService.typeOperationFactures;
       }
set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactures = value;
       }

 get selectedTypeOperationFacture():TypeOperationFactureVo {
           return this.typeOperationFactureService.selectedTypeOperationFacture;
       }
    set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.selectedTypeOperationFacture = value;
       }

   get viewTypeOperationFactureDialog():boolean {
           return this.typeOperationFactureService.viewTypeOperationFactureDialog;

       }
    set viewTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.viewTypeOperationFactureDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
