import {Component, OnInit} from '@angular/core';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-prelevement-social-view-chercheur',
  templateUrl: './prelevement-social-view-chercheur.component.html',
  styleUrls: ['./prelevement-social-view-chercheur.component.css']
})
export class PrelevementSocialViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private prelevementSocialService: PrelevementSocialService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPrelevementSocialDialog  = false;
}

// getters and setters

get prelevementSocials(): Array<PrelevementSocialVo> {
    return this.prelevementSocialService.prelevementSocials;
       }
set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
       }

 get selectedPrelevementSocial():PrelevementSocialVo {
           return this.prelevementSocialService.selectedPrelevementSocial;
       }
    set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
       }

   get viewPrelevementSocialDialog():boolean {
           return this.prelevementSocialService.viewPrelevementSocialDialog;

       }
    set viewPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.viewPrelevementSocialDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
