import {Component, OnInit} from '@angular/core';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-declaration-tva-edit-comptable',
  templateUrl: './type-declaration-tva-edit-comptable.component.html',
  styleUrls: ['./type-declaration-tva-edit-comptable.component.css']
})
export class TypeDeclarationTvaEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeDeclarationTvaService: TypeDeclarationTvaService
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
    this.typeDeclarationTvaService.edit().subscribe(typeDeclarationTva=>{
    const myIndex = this.typeDeclarationTvas.findIndex(e => e.id === this.selectedTypeDeclarationTva.id);
    this.typeDeclarationTvas[myIndex] = this.selectedTypeDeclarationTva;
    this.editTypeDeclarationTvaDialog = false;
    this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeDeclarationTvaDialog  = false;
}

// getters and setters

get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
    return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }

 get selectedTypeDeclarationTva(): TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
    set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }

   get editTypeDeclarationTvaDialog(): boolean {
           return this.typeDeclarationTvaService.editTypeDeclarationTvaDialog;

       }
    set editTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.editTypeDeclarationTvaDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
