import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { User } from './controller/model/User.model';
import { AuthService } from './controller/service/Auth.service';
import {ChercheurVo} from './controller/model/Chercheur.model';
import {ChercheurService} from './controller/service/Chercheur.service';
import {MessageComponent} from './message/message.component';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    roleAdmin = false;
    private msgs: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent, private authService: AuthService, private chercheurService: ChercheurService, public appMessage: MessageComponent) {}

    ngOnInit(): void {
        this.authService.loadInfos();
        if ( this.authService.authenticatedUser.roles[0] === 'ROLE_ADMIN'){
            this.roleAdmin = true;
        }
    }

    switch(): void {
        this.switchChercheurDialog = true;
    }

    openMessageComponent(event){
        this.appMessage.showComponent();
        event.preventDefault();
    }
    switchAdmin(): void{
        this.authService.unregisterConnectedChercheur();
        window.location.reload();
    }

    get switchChercheurDialog(): boolean {
        return this.chercheurService.switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
        this.chercheurService.switchChercheurDialog = value;
    }

    get authenticatedUserByAdmin(): ChercheurVo {
        return this.authService.authenticatedUserByAdmin() ;
    }
    get authenticatedUser(): User{
        return this.authService.authenticatedUser;
    }

    logout(){
        this.authService.logout();
    }
}
