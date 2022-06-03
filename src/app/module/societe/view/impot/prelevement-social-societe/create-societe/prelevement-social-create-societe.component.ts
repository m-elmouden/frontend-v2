import {Component, OnInit, Input} from '@angular/core';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
    selector: 'app-prelevement-social-create-societe',
    templateUrl: './prelevement-social-create-societe.component.html',
    styleUrls: ['./prelevement-social-create-societe.component.css']
})
export class PrelevementSocialCreateSocieteComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validPrelevementSocialLibelle = true;
    _validPrelevementSocialPourcentage = true;
    _validPrelevementSocialDateMax = true;
    _validPrelevementSocialDateMin = true;
    _validPrelevementSocialReference=true;



    constructor(private datePipe: DatePipe, private prelevementSocialService: PrelevementSocialService
        ,       private stringUtilService: StringUtilService
        ,       private roleService: RoleService
        ,       private messageService: MessageService
        ,       private router: Router

    ) {

    }


// methods
    ngOnInit(): void {

    }




    private setValidation(value : boolean){
        this.validPrelevementSocialLibelle = value;
        this.validPrelevementSocialPourcentage = value;
        this.validPrelevementSocialDateMax = value;
        this.validPrelevementSocialDateMin = value;
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
        this.prelevementSocialService.save().subscribe(prelevementSocial=>{
            this.prelevementSocials.push({...prelevementSocial});
            this.createPrelevementSocialDialog = false;
            this.submitted = false;
            this.selectedPrelevementSocial = new PrelevementSocialVo();


        } , error =>{
            console.log(error);
        });

    }
//validation methods
    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validatePrelevementSocialLibelle();
        this.validatePrelevementSocialPourcentage();
        this.validatePrelevementSocialDateMax();
        this.validatePrelevementSocialDateMin();

    }

    private validatePrelevementSocialReference(){
        if (this.stringUtilService.isEmpty(this.selectedPrelevementSocial.reference)) {
            this.errorMessages.push('reference non valide');
            this.validPrelevementSocialReference = false;
        } else {
            this.validPrelevementSocialReference = true;
        }
    }


    private validatePrelevementSocialLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPrelevementSocial.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPrelevementSocialLibelle = false;
        } else {
            this.validPrelevementSocialLibelle = true;
        }
    }
    private validatePrelevementSocialPourcentage(){
        if (this.stringUtilService.isEmpty(this.selectedPrelevementSocial.pourcentage)) {
            this.errorMessages.push('Pourcentage non valide');
            this.validPrelevementSocialPourcentage = false;
        } else {
            this.validPrelevementSocialPourcentage = true;
        }
    }
    private validatePrelevementSocialDateMax(){
        if (this.stringUtilService.isEmpty(this.selectedPrelevementSocial.dateMax)) {
            this.errorMessages.push('Date max non valide');
            this.validPrelevementSocialDateMax = false;
        } else {
            this.validPrelevementSocialDateMax = true;
        }
    }
    private validatePrelevementSocialDateMin(){
        if (this.stringUtilService.isEmpty(this.selectedPrelevementSocial.dateMin)) {
            this.errorMessages.push('Date min non valide');
            this.validPrelevementSocialDateMin = false;
        } else {
            this.validPrelevementSocialDateMin = true;
        }
    }








//openPopup
// methods

    hideCreateDialog(){
        this.createPrelevementSocialDialog  = false;
        this.setValidation(true);
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

    get createPrelevementSocialDialog(): boolean {
        return this.prelevementSocialService.createPrelevementSocialDialog;

    }
    set createPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.createPrelevementSocialDialog= value;
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

    get validPrelevementSocialReference(): boolean {
        return this._validPrelevementSocialReference;
    }
    set validPrelevementSocialReference(value: boolean) {
        this._validPrelevementSocialReference = value;
    }

    get validPrelevementSocialLibelle(): boolean {
        return this._validPrelevementSocialLibelle;
    }

    set validPrelevementSocialLibelle(value: boolean) {
        this._validPrelevementSocialLibelle = value;
    }
    get validPrelevementSocialPourcentage(): boolean {
        return this._validPrelevementSocialPourcentage;
    }

    set validPrelevementSocialPourcentage(value: boolean) {
        this._validPrelevementSocialPourcentage = value;
    }
    get validPrelevementSocialDateMax(): boolean {
        return this._validPrelevementSocialDateMax;
    }

    set validPrelevementSocialDateMax(value: boolean) {
        this._validPrelevementSocialDateMax = value;
    }
    get validPrelevementSocialDateMin(): boolean {
        return this._validPrelevementSocialDateMin;
    }

    set validPrelevementSocialDateMin(value: boolean) {
        this._validPrelevementSocialDateMin = value;
    }


}

