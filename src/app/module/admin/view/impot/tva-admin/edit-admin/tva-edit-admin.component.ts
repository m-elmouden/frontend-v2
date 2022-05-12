import {Component, OnInit} from '@angular/core';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-tva-edit-admin',
  templateUrl: './tva-edit-admin.component.html',
  styleUrls: ['./tva-edit-admin.component.css']
})
export class TvaEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private tvaService: TvaService
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
    this.tvaService.edit().subscribe(tva=>{
    const myIndex = this.tvas.findIndex(e => e.id === this.selectedTva.id);
    this.tvas[myIndex] = this.selectedTva;
    this.editTvaDialog = false;
    this.selectedTva = new TvaVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTvaDialog  = false;
}

// getters and setters

get tvas(): Array<TvaVo> {
    return this.tvaService.tvas;
       }
set tvas(value: Array<TvaVo>) {
        this.tvaService.tvas = value;
       }

 get selectedTva(): TvaVo {
           return this.tvaService.selectedTva;
       }
    set selectedTva(value: TvaVo) {
        this.tvaService.selectedTva = value;
       }

   get editTvaDialog(): boolean {
           return this.tvaService.editTvaDialog;

       }
    set editTvaDialog(value: boolean) {
        this.tvaService.editTvaDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
