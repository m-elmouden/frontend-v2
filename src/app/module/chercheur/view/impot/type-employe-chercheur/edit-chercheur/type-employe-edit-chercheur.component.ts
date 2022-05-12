import {Component, OnInit} from '@angular/core';
import {TypeEmployeService} from '../../../../../../controller/service/TypeEmploye.service';
import {TypeEmployeVo} from '../../../../../../controller/model/TypeEmploye.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-employe-edit-chercheur',
  templateUrl: './type-employe-edit-chercheur.component.html',
  styleUrls: ['./type-employe-edit-chercheur.component.css']
})
export class TypeEmployeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEmployeService: TypeEmployeService
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
    this.typeEmployeService.edit().subscribe(typeEmploye=>{
    const myIndex = this.typeEmployes.findIndex(e => e.id === this.selectedTypeEmploye.id);
    this.typeEmployes[myIndex] = this.selectedTypeEmploye;
    this.editTypeEmployeDialog = false;
    this.selectedTypeEmploye = new TypeEmployeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeEmployeDialog  = false;
}

// getters and setters

get typeEmployes(): Array<TypeEmployeVo> {
    return this.typeEmployeService.typeEmployes;
       }
set typeEmployes(value: Array<TypeEmployeVo>) {
        this.typeEmployeService.typeEmployes = value;
       }

 get selectedTypeEmploye(): TypeEmployeVo {
           return this.typeEmployeService.selectedTypeEmploye;
       }
    set selectedTypeEmploye(value: TypeEmployeVo) {
        this.typeEmployeService.selectedTypeEmploye = value;
       }

   get editTypeEmployeDialog(): boolean {
           return this.typeEmployeService.editTypeEmployeDialog;

       }
    set editTypeEmployeDialog(value: boolean) {
        this.typeEmployeService.editTypeEmployeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
