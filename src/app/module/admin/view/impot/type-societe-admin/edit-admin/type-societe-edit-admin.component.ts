import {Component, OnInit} from '@angular/core';
import {TypeSocieteService} from '../../../../../../controller/service/TypeSociete.service';
import {TypeSocieteVo} from '../../../../../../controller/model/TypeSociete.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-societe-edit-admin',
  templateUrl: './type-societe-edit-admin.component.html',
  styleUrls: ['./type-societe-edit-admin.component.css']
})
export class TypeSocieteEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeSocieteService: TypeSocieteService
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
    this.typeSocieteService.edit().subscribe(typeSociete=>{
    const myIndex = this.typeSocietes.findIndex(e => e.id === this.selectedTypeSociete.id);
    this.typeSocietes[myIndex] = this.selectedTypeSociete;
    this.editTypeSocieteDialog = false;
    this.selectedTypeSociete = new TypeSocieteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeSocieteDialog  = false;
}

// getters and setters

get typeSocietes(): Array<TypeSocieteVo> {
    return this.typeSocieteService.typeSocietes;
       }
set typeSocietes(value: Array<TypeSocieteVo>) {
        this.typeSocieteService.typeSocietes = value;
       }

 get selectedTypeSociete(): TypeSocieteVo {
           return this.typeSocieteService.selectedTypeSociete;
       }
    set selectedTypeSociete(value: TypeSocieteVo) {
        this.typeSocieteService.selectedTypeSociete = value;
       }

   get editTypeSocieteDialog(): boolean {
           return this.typeSocieteService.editTypeSocieteDialog;

       }
    set editTypeSocieteDialog(value: boolean) {
        this.typeSocieteService.editTypeSocieteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
