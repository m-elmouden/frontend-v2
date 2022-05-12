import {Component, OnInit} from '@angular/core';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-declaration-ir-edit-comptable',
  templateUrl: './etat-declaration-ir-edit-comptable.component.html',
  styleUrls: ['./etat-declaration-ir-edit-comptable.component.css']
})
export class EtatDeclarationIrEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDeclarationIrService: EtatDeclarationIrService
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
            this.selectedEtatDeclarationIr.dateArchivage = DateUtils.toDate(this.selectedEtatDeclarationIr.dateArchivage);
            this.selectedEtatDeclarationIr.dateCreation = DateUtils.toDate(this.selectedEtatDeclarationIr.dateCreation);
    this.etatDeclarationIrService.edit().subscribe(etatDeclarationIr=>{
    const myIndex = this.etatDeclarationIrs.findIndex(e => e.id === this.selectedEtatDeclarationIr.id);
    this.etatDeclarationIrs[myIndex] = this.selectedEtatDeclarationIr;
    this.editEtatDeclarationIrDialog = false;
    this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatDeclarationIrDialog  = false;
}

// getters and setters

get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
    return this.etatDeclarationIrService.etatDeclarationIrs;
       }
set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
       }

 get selectedEtatDeclarationIr(): EtatDeclarationIrVo {
           return this.etatDeclarationIrService.selectedEtatDeclarationIr;
       }
    set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
       }

   get editEtatDeclarationIrDialog(): boolean {
           return this.etatDeclarationIrService.editEtatDeclarationIrDialog;

       }
    set editEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.editEtatDeclarationIrDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
