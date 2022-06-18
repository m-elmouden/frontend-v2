import {Component, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/controller/model/User.model';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {Role} from '../../../controller/model/Role.model';
import {SocieteVo} from '../../../controller/model/Societe.model';
import {SocieteService} from '../../../controller/service/Societe.service';

@Component({
    selector: 'app-register-societe',
    templateUrl: './register-societe.component.html',
    styleUrls: ['./register-societe.component.scss']
})
export class RegisterSocieteComponent implements OnInit {
    registerForm = new FormGroup({
        prenom: new FormControl('', Validators.required),
        nom: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private authService: AuthService, private societeService: SocieteService) {
    }

    ngOnInit(): void {
    }

    submit() {
        const formValues = this.registerForm.value;
        const {prenom, nom, userName, password, email} = formValues;
        const role = new Role();
        role.authority = 'ROLE_Societe';
        this.user.prenom = prenom;
        this.user.nom = nom;
        this.user.username = userName;
        this.user.password = password;
        this.user.email = email;
        this.user.roles = [role];
        this.authService.registerSociete();

    }

   /* submit2() {
        const formValues = this.registerForm.value;
        const {ice, prenom, nom, userName, password, telephone, fax, email, adresse, age} = formValues;
        this.selectedSociete.prenom = prenom;
        this.selectedSociete.nom = nom;
        this.selectedSociete.username = userName;
        this.selectedSociete.password = password;
        this.selectedSociete.email = email;
        this.selectedSociete.telephone = telephone;
        this.selectedSociete.adresse = adresse;
        this.selectedSociete.fax = fax;
        this.selectedSociete.age = age;
        this.selectedSociete.ice = ice;
        // this.selectedAdherent.username2 = userName;
        // this.selectedAdherent.nomPrenom = nomPrenom;
        this.authService.registerComptable();


    }*/

    get user(): User {
        return this.authService.user;
    }

    set user(value: User) {
        this.authService.user = value;
    }

    /*get selectedSociete(): SocieteVo {
        return this.societeService.selectedSociete;
    }

    set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
    }*/


}
