import {Component, OnInit, Input} from '@angular/core';
import {TvaService} from '../../../../../../controller/service/Tva.service';
import {TvaVo} from '../../../../../../controller/model/Tva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-tva-create-societe',
  templateUrl: './tva-create-societe.component.html',
  styleUrls: ['./tva-create-societe.component.css']
})
export class TvaCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTvaReference = true;
   _validTvaPourcentage = true;




constructor(private datePipe: DatePipe, private tvaService: TvaService
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
    this.validTvaReference = value;
    this.validTvaPourcentage = value;
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
     this.tvaService.save().subscribe(tva=>{
       this.tvas.push({...tva});
       this.createTvaDialog = false;
       this.submitted = false;
       this.selectedTva = new TvaVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTvaReference();
this.validateTvaPourcentage();

    }

private validateTvaReference(){
        if (this.stringUtilService.isEmpty(this.selectedTva.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validTvaReference = false;
        } else {
            this.validTvaReference = true;
        }
    }
private validateTvaPourcentage(){
        if (this.stringUtilService.isEmpty(this.selectedTva.pourcentage)) {
            this.errorMessages.push('Pourcentage non valide');
            this.validTvaPourcentage = false;
        } else {
            this.validTvaPourcentage = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTvaDialog  = false;
    this.setValidation(true);
}

// getters and setters

get tvas(): Array<TvaVo> {
    return this.tvaService.tvas;
       }
set tvas(value: Array<TvaVo>) {
        this.tvaService.tvas = value;
       }

 get selectedTva():TvaVo {
           return this.tvaService.selectedTva;
       }
    set selectedTva(value: TvaVo) {
        this.tvaService.selectedTva = value;
       }

   get createTvaDialog(): boolean {
           return this.tvaService.createTvaDialog;

       }
    set createTvaDialog(value: boolean) {
        this.tvaService.createTvaDialog= value;
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

    get validTvaReference(): boolean {
    return this._validTvaReference;
    }

    set validTvaReference(value: boolean) {
    this._validTvaReference = value;
    }
    get validTvaPourcentage(): boolean {
    return this._validTvaPourcentage;
    }

    set validTvaPourcentage(value: boolean) {
    this._validTvaPourcentage = value;
    }


}
