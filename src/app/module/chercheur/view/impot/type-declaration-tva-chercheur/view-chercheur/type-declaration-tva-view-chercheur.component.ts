import {Component, OnInit} from '@angular/core';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-declaration-tva-view-chercheur',
  templateUrl: './type-declaration-tva-view-chercheur.component.html',
  styleUrls: ['./type-declaration-tva-view-chercheur.component.css']
})
export class TypeDeclarationTvaViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeDeclarationTvaService: TypeDeclarationTvaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeDeclarationTvaDialog  = false;
}

// getters and setters

get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
    return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }

 get selectedTypeDeclarationTva():TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
    set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }

   get viewTypeDeclarationTvaDialog():boolean {
           return this.typeDeclarationTvaService.viewTypeDeclarationTvaDialog;

       }
    set viewTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.viewTypeDeclarationTvaDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
