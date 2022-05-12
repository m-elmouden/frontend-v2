import {Component, OnInit} from '@angular/core';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-taux-ir-edit-societe',
  templateUrl: './taux-ir-edit-societe.component.html',
  styleUrls: ['./taux-ir-edit-societe.component.css']
})
export class TauxIrEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private tauxIrService: TauxIrService
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
            this.selectedTauxIr.dateMin = DateUtils.toDate(this.selectedTauxIr.dateMin);
            this.selectedTauxIr.dateMax = DateUtils.toDate(this.selectedTauxIr.dateMax);
    this.tauxIrService.edit().subscribe(tauxIr=>{
    const myIndex = this.tauxIrs.findIndex(e => e.id === this.selectedTauxIr.id);
    this.tauxIrs[myIndex] = this.selectedTauxIr;
    this.editTauxIrDialog = false;
    this.selectedTauxIr = new TauxIrVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTauxIrDialog  = false;
}

// getters and setters

get tauxIrs(): Array<TauxIrVo> {
    return this.tauxIrService.tauxIrs;
       }
set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
       }

 get selectedTauxIr(): TauxIrVo {
           return this.tauxIrService.selectedTauxIr;
       }
    set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
       }

   get editTauxIrDialog(): boolean {
           return this.tauxIrService.editTauxIrDialog;

       }
    set editTauxIrDialog(value: boolean) {
        this.tauxIrService.editTauxIrDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
