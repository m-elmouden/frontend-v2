import {Component, OnInit} from '@angular/core';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-prelevement-social-edit-comptable',
  templateUrl: './prelevement-social-edit-comptable.component.html',
  styleUrls: ['./prelevement-social-edit-comptable.component.css']
})
export class PrelevementSocialEditComptableComponent implements OnInit {


constructor(private datePipe: DatePipe, private prelevementSocialService: PrelevementSocialService
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
            this.selectedPrelevementSocial.dateMax = DateUtils.toDate(this.selectedPrelevementSocial.dateMax);
            this.selectedPrelevementSocial.dateMin = DateUtils.toDate(this.selectedPrelevementSocial.dateMin);
    this.prelevementSocialService.edit().subscribe(prelevementSocial=>{
    const myIndex = this.prelevementSocials.findIndex(e => e.id === this.selectedPrelevementSocial.id);
    this.prelevementSocials[myIndex] = this.selectedPrelevementSocial;
    this.editPrelevementSocialDialog = false;
    this.selectedPrelevementSocial = new PrelevementSocialVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editPrelevementSocialDialog  = false;
}

// getters and setters

get prelevementSocials(): Array<PrelevementSocialVo> {
    return this.prelevementSocialService.prelevementSocials;
       }
set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
       }

 get selectedPrelevementSocial(): PrelevementSocialVo {
           return this.prelevementSocialService.selectedPrelevementSocial;
       }
    set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
       }

   get editPrelevementSocialDialog(): boolean {
           return this.prelevementSocialService.editPrelevementSocialDialog;

       }
    set editPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.editPrelevementSocialDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
