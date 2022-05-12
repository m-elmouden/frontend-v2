import {Component, OnInit, Input} from '@angular/core';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-taux-ir-create-chercheur',
  templateUrl: './taux-ir-create-chercheur.component.html',
  styleUrls: ['./taux-ir-create-chercheur.component.css']
})
export class TauxIrCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private tauxIrService: TauxIrService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.tauxIrService.save().subscribe(tauxIr=>{
       this.tauxIrs.push({...tauxIr});
       this.createTauxIrDialog = false;
       this.submitted = false;
       this.selectedTauxIr = new TauxIrVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }











//openPopup
// methods

hideCreateDialog(){
    this.createTauxIrDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tauxIrs(): Array<TauxIrVo> {
    return this.tauxIrService.tauxIrs;
       }
set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
       }

 get selectedTauxIr():TauxIrVo {
           return this.tauxIrService.selectedTauxIr;
       }
    set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
       }

   get createTauxIrDialog(): boolean {
           return this.tauxIrService.createTauxIrDialog;

       }
    set createTauxIrDialog(value: boolean) {
        this.tauxIrService.createTauxIrDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }



}
