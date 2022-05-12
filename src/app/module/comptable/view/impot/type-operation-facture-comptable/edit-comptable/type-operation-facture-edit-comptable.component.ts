import {Component, OnInit} from '@angular/core';
import {TypeOperationFactureService} from '../../../../../../controller/service/TypeOperationFacture.service';
import {TypeOperationFactureVo} from '../../../../../../controller/model/TypeOperationFacture.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-operation-facture-edit-comptable',
  templateUrl: './type-operation-facture-edit-comptable.component.html',
  styleUrls: ['./type-operation-facture-edit-comptable.component.css']
})
export class TypeOperationFactureEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeOperationFactureService: TypeOperationFactureService
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
    this.typeOperationFactureService.edit().subscribe(typeOperationFacture=>{
    const myIndex = this.typeOperationFactures.findIndex(e => e.id === this.selectedTypeOperationFacture.id);
    this.typeOperationFactures[myIndex] = this.selectedTypeOperationFacture;
    this.editTypeOperationFactureDialog = false;
    this.selectedTypeOperationFacture = new TypeOperationFactureVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeOperationFactureDialog  = false;
}

// getters and setters

get typeOperationFactures(): Array<TypeOperationFactureVo> {
    return this.typeOperationFactureService.typeOperationFactures;
       }
set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this.typeOperationFactureService.typeOperationFactures = value;
       }

 get selectedTypeOperationFacture(): TypeOperationFactureVo {
           return this.typeOperationFactureService.selectedTypeOperationFacture;
       }
    set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this.typeOperationFactureService.selectedTypeOperationFacture = value;
       }

   get editTypeOperationFactureDialog(): boolean {
           return this.typeOperationFactureService.editTypeOperationFactureDialog;

       }
    set editTypeOperationFactureDialog(value: boolean) {
        this.typeOperationFactureService.editTypeOperationFactureDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
