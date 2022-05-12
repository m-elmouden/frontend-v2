import {Component, OnInit} from '@angular/core';
import {TypeComptableService} from '../../../../../../controller/service/TypeComptable.service';
import {TypeComptableVo} from '../../../../../../controller/model/TypeComptable.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-comptable-edit-comptable',
  templateUrl: './type-comptable-edit-comptable.component.html',
  styleUrls: ['./type-comptable-edit-comptable.component.css']
})
export class TypeComptableEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeComptableService: TypeComptableService
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
    this.typeComptableService.edit().subscribe(typeComptable=>{
    const myIndex = this.typeComptables.findIndex(e => e.id === this.selectedTypeComptable.id);
    this.typeComptables[myIndex] = this.selectedTypeComptable;
    this.editTypeComptableDialog = false;
    this.selectedTypeComptable = new TypeComptableVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeComptableDialog  = false;
}

// getters and setters

get typeComptables(): Array<TypeComptableVo> {
    return this.typeComptableService.typeComptables;
       }
set typeComptables(value: Array<TypeComptableVo>) {
        this.typeComptableService.typeComptables = value;
       }

 get selectedTypeComptable(): TypeComptableVo {
           return this.typeComptableService.selectedTypeComptable;
       }
    set selectedTypeComptable(value: TypeComptableVo) {
        this.typeComptableService.selectedTypeComptable = value;
       }

   get editTypeComptableDialog(): boolean {
           return this.typeComptableService.editTypeComptableDialog;

       }
    set editTypeComptableDialog(value: boolean) {
        this.typeComptableService.editTypeComptableDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
