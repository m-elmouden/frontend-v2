import {Component, OnInit} from '@angular/core';
import {TypeTauxCnssService} from '../../../../../../controller/service/TypeTauxCnss.service';
import {TypeTauxCnssVo} from '../../../../../../controller/model/TypeTauxCnss.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-taux-cnss-edit-societe',
  templateUrl: './type-taux-cnss-edit-societe.component.html',
  styleUrls: ['./type-taux-cnss-edit-societe.component.css']
})
export class TypeTauxCnssEditSocieteComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeTauxCnssService: TypeTauxCnssService
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
            this.selectedTypeTauxCnss.dateArchivage = DateUtils.toDate(this.selectedTypeTauxCnss.dateArchivage);
            this.selectedTypeTauxCnss.dateCreation = DateUtils.toDate(this.selectedTypeTauxCnss.dateCreation);
    this.typeTauxCnssService.edit().subscribe(typeTauxCnss=>{
    const myIndex = this.typeTauxCnsss.findIndex(e => e.id === this.selectedTypeTauxCnss.id);
    this.typeTauxCnsss[myIndex] = this.selectedTypeTauxCnss;
    this.editTypeTauxCnssDialog = false;
    this.selectedTypeTauxCnss = new TypeTauxCnssVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeTauxCnssDialog  = false;
}

// getters and setters

get typeTauxCnsss(): Array<TypeTauxCnssVo> {
    return this.typeTauxCnssService.typeTauxCnsss;
       }
set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this.typeTauxCnssService.typeTauxCnsss = value;
       }

 get selectedTypeTauxCnss(): TypeTauxCnssVo {
           return this.typeTauxCnssService.selectedTypeTauxCnss;
       }
    set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this.typeTauxCnssService.selectedTypeTauxCnss = value;
       }

   get editTypeTauxCnssDialog(): boolean {
           return this.typeTauxCnssService.editTypeTauxCnssDialog;

       }
    set editTypeTauxCnssDialog(value: boolean) {
        this.typeTauxCnssService.editTypeTauxCnssDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
