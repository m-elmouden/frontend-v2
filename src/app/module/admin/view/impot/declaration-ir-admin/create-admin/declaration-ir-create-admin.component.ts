import {Component, OnInit} from '@angular/core';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {PrelevementSocialEmployeService} from '../../../../../../controller/service/PrelevementSocialEmploye.service';
import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {EmployeVo} from '../../../../../../controller/model/Employe.model';
import {EmployeService} from '../../../../../../controller/service/Employe.service';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {DeclarationIrEmployeService} from '../../../../../../controller/service/DeclarationIrEmploye.service';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';
import {TauxIrVo} from '../../../../../../controller/model/TauxIr.model';
import {TauxIrService} from '../../../../../../controller/service/TauxIr.service';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {PrelevementSocialVo} from '../../../../../../controller/model/PrelevementSocial.model';
import {PrelevementSocialService} from '../../../../../../controller/service/PrelevementSocial.service';
import {ComptableVo} from '../../../../../../controller/model/Comptable.model';
import {ComptableService} from '../../../../../../controller/service/Comptable.service';
import {DemandeService} from '../../../../../../controller/service/Demande.service';
import {DemandeVo} from '../../../../../../controller/model/Demande.model';

@Component({
    selector: 'app-declaration-ir-create-admin',
    templateUrl: './declaration-ir-create-admin.component.html',
    styleUrls: ['./declaration-ir-create-admin.component.css']
})
export class DeclarationIrCreateAdminComponent implements OnInit {

    selectedDeclarationIrEmployes: DeclarationIrEmployeVo = new DeclarationIrEmployeVo();
    selectedPrelevementSocialEmployes: PrelevementSocialEmployeVo = new PrelevementSocialEmployeVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

    _validDeclarationIrRefrerence = true;
    _validDeclarationIrAnnee = true;
    _validDeclarationIrMois = true;

    _validSocieteIce = true;
    _validSocieteRaisonSociale = true;
    _validSocieteDateCreation = true;
    _validSocieteAge = true;
    _validSocietePresidentSociete = true;
    _validDeclarationIrEmployeSalaireBase = true;
    _validEtatDeclarationIrReference = true;
    _validEtatDeclarationIrLibelle = true;
    _validPaiementDeclarationIrReference = true;
    _validPaiementDeclarationIrDatePaiement = true;
    _validPaiementDeclarationIrTotal = true;
    _validPaiementDeclarationIrDeclarationIr = true;


    constructor(private datePipe: DatePipe, private declarationIrService: DeclarationIrService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private prelevementSocialEmployeService: PrelevementSocialEmployeService
        , private tauxIrService: TauxIrService
        , private societeService: SocieteService
        , private employeService: EmployeService
        , private etatDeclarationIrService: EtatDeclarationIrService
        , private declarationIrEmployeService: DeclarationIrEmployeService
        , private prelevementSocialService: PrelevementSocialService
        , private paiementDeclarationIrService: PaiementDeclarationIrService
        , private comptableService: ComptableService
         ,private demandeService: DemandeService
    ) {

    }


// methods
    ngOnInit(): void {


        this.selectedDeclarationIrEmployes.employeVo = new EmployeVo();
        this.employeService.findAll().subscribe((data) => this.employes = data);
        this.selectedDeclarationIrEmployes.tauxIrVo = new TauxIrVo();
        this.tauxIrService.findAll().subscribe((data) => this.tauxIrs = data);


        this.selectedPrelevementSocialEmployes.prelevementSocialVo = new PrelevementSocialVo();
        this.prelevementSocialService.findAll().subscribe((data) => this.prelevementSocials = data);
        this.selectedPrelevementSocialEmployes.employeVo = new EmployeVo();
        this.employeService.findAll().subscribe((data) => this.employes = data);


        this.selectedSociete = new SocieteVo();
        this.societeService.findAll().subscribe((data) => this.societes = data);
        this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();
        this.etatDeclarationIrService.findAll().subscribe((data) => this.etatDeclarationIrs = data);
        this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();
        this.paiementDeclarationIrService.findAll().subscribe((data) => this.paiementDeclarationIrs = data);
    }


    validateDeclarationIrEmployes() {
        this.errorMessages = new Array();
        this.validateDeclarationIrEmployeSalaireBase();
    }

    validatePrelevementSocialEmployes() {
        this.errorMessages = new Array();
    }


    private setValidation(value: boolean) {
        this.validDeclarationIrRefrerence = value;
        this.validDeclarationIrAnnee = value;
        this.validDeclarationIrMois = value;
        this.validDeclarationIrEmployeSalaireBase = value;
    }

    addDeclarationIrEmployes() {
        if (this.selectedDeclarationIr.declarationIrEmployesVo == null) {
            this.selectedDeclarationIr.declarationIrEmployesVo = new Array<DeclarationIrEmployeVo>();
        }
        this.validateDeclarationIrEmployes();
        if (this.errorMessages.length === 0) {
            this.selectedDeclarationIr.declarationIrEmployesVo.push(this.selectedDeclarationIrEmployes);
            this.selectedDeclarationIrEmployes = new DeclarationIrEmployeVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteDeclarationIrEmployes(p: DeclarationIrEmployeVo) {
        this.selectedDeclarationIr.declarationIrEmployesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedDeclarationIr.declarationIrEmployesVo.splice(index, 1);
            }
        });
    }

    addPrelevementSocialEmployes() {
        if (this.selectedDeclarationIr.prelevementSocialEmployesVo == null) {
            this.selectedDeclarationIr.prelevementSocialEmployesVo = new Array<PrelevementSocialEmployeVo>();
        }
        this.validatePrelevementSocialEmployes();
        if (this.errorMessages.length === 0) {
            this.selectedDeclarationIr.prelevementSocialEmployesVo.push(this.selectedPrelevementSocialEmployes);
            this.selectedPrelevementSocialEmployes = new PrelevementSocialEmployeVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deletePrelevementSocialEmployes(p: PrelevementSocialEmployeVo) {
        this.selectedDeclarationIr.prelevementSocialEmployesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedDeclarationIr.prelevementSocialEmployesVo.splice(index, 1);
            }
        });
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.declarationIrService.save().subscribe(declarationIr => {
            this.declarationIrs.push({...declarationIr});
            this.createDeclarationIrDialog = false;
            this.submitted = false;
            this.selectedDeclarationIr = new DeclarationIrVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateDeclarationIrRefrerence();
        /*this.validateDeclarationIrAnnee();
        this.validateDeclarationIrMois();*/

    }

    private validateDeclarationIrRefrerence() {
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIr.refrerence)) {
            this.errorMessages.push('Refrerence non valide');
            this.validDeclarationIrRefrerence = false;
        } else {
            this.validDeclarationIrRefrerence = true;
        }
    }

    private validateDeclarationIrAnnee() {
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIr.annee)) {
            this.errorMessages.push('Annee non valide');
            this.validDeclarationIrAnnee = false;
        } else {
            this.validDeclarationIrAnnee = true;
        }
    }

    private validateDeclarationIrMois() {
        if (this.stringUtilService.isEmpty(this.selectedDeclarationIr.mois)) {
            this.errorMessages.push('Mois non valide');
            this.validDeclarationIrMois = false;
        } else {
            this.validDeclarationIrMois = true;
        }
    }


    private validateDeclarationIrEmployeSalaireBase() {
        if (this.selectedDeclarationIrEmployes.salaireBase == null) {
            this.errorMessages.push('SalaireBase de la declarationIrEmploye est  invalide');
            this.validDeclarationIrEmployeSalaireBase = false;
        } else {
            this.validDeclarationIrEmployeSalaireBase = true;
        }
    }


//openPopup
    public async openCreateetatDeclarationIr(etatDeclarationIr: string) {
        const isPermistted = await this.roleService.isPermitted('EtatDeclarationIr', 'add');
        if (isPermistted) {
            this.selectedEtatDeclarationIr = new EtatDeclarationIrVo();
            this.createEtatDeclarationIrDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatesociete(societe: string) {
        const isPermistted = await this.roleService.isPermitted('Societe', 'add');
        if (isPermistted) {
            this.selectedSociete = new SocieteVo();
            this.createSocieteDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatetauxIr(tauxIr: string) {
        const isPermistted = await this.roleService.isPermitted('TauxIr', 'add');
        if (isPermistted) {
            this.selectedTauxIr = new TauxIrVo();
            this.createTauxIrDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatepaiementDeclarationIr(paiementDeclarationIr: string) {
        const isPermistted = await this.roleService.isPermitted('PaiementDeclarationIr', 'add');
        if (isPermistted) {
            this.selectedPaiementDeclarationIr = new PaiementDeclarationIrVo();
            this.createPaiementDeclarationIrDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateemploye(employe: string) {
        const isPermistted = await this.roleService.isPermitted('Employe', 'add');
        if (isPermistted) {
            this.selectedEmploye = new EmployeVo();
            this.createEmployeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateprelevementSocial(prelevementSocial: string) {
        const isPermistted = await this.roleService.isPermitted('PrelevementSocial', 'add');
        if (isPermistted) {
            this.selectedPrelevementSocial = new PrelevementSocialVo();
            this.createPrelevementSocialDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideCreateDialog() {
        this.createDeclarationIrDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get declarationIrs(): Array<DeclarationIrVo> {
        return this.declarationIrService.declarationIrs;
    }

    set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
    }

    get selectedDeclarationIr(): DeclarationIrVo {
        return this.declarationIrService.selectedDeclarationIr;
    }

    set selectedDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.selectedDeclarationIr = value;
    }

    get createDeclarationIrDialog(): boolean {
        return this.declarationIrService.createDeclarationIrDialog;

    }

    set createDeclarationIrDialog(value: boolean) {
        this.declarationIrService.createDeclarationIrDialog = value;
    }

    get selectedEtatDeclarationIr(): EtatDeclarationIrVo {
        return this.etatDeclarationIrService.selectedEtatDeclarationIr;
    }

    set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this.etatDeclarationIrService.selectedEtatDeclarationIr = value;
    }

    get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
        return this.etatDeclarationIrService.etatDeclarationIrs;
    }

    set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this.etatDeclarationIrService.etatDeclarationIrs = value;
    }

    get createEtatDeclarationIrDialog(): boolean {
        return this.etatDeclarationIrService.createEtatDeclarationIrDialog;
    }

    set createEtatDeclarationIrDialog(value: boolean) {
        this.etatDeclarationIrService.createEtatDeclarationIrDialog = value;
    }

    get selectedSociete(): SocieteVo {
        return this.societeService.selectedSociete;
    }

    set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
    }

    get societes(): Array<SocieteVo> {
        return this.societeService.societes;
    }

    set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
    }

    get createSocieteDialog(): boolean {
        return this.societeService.createSocieteDialog;
    }

    set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog = value;
    }

    get selectedTauxIr(): TauxIrVo {
        return this.tauxIrService.selectedTauxIr;
    }

    set selectedTauxIr(value: TauxIrVo) {
        this.tauxIrService.selectedTauxIr = value;
    }

    get tauxIrs(): Array<TauxIrVo> {
        return this.tauxIrService.tauxIrs;
    }

    set tauxIrs(value: Array<TauxIrVo>) {
        this.tauxIrService.tauxIrs = value;
    }

    get createTauxIrDialog(): boolean {
        return this.tauxIrService.createTauxIrDialog;
    }

    set createTauxIrDialog(value: boolean) {
        this.tauxIrService.createTauxIrDialog = value;
    }

    get selectedPaiementDeclarationIr(): PaiementDeclarationIrVo {
        return this.paiementDeclarationIrService.selectedPaiementDeclarationIr;
    }

    set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this.paiementDeclarationIrService.selectedPaiementDeclarationIr = value;
    }

    get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
        return this.paiementDeclarationIrService.paiementDeclarationIrs;
    }

    get comptables(): Array<ComptableVo> {
        return this.comptableService.comptables;
    }

    set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this.paiementDeclarationIrService.paiementDeclarationIrs = value;
    }


    get createPaiementDeclarationIrDialog(): boolean {
        return this.paiementDeclarationIrService.createPaiementDeclarationIrDialog;
    }

    set createPaiementDeclarationIrDialog(value: boolean) {
        this.paiementDeclarationIrService.createPaiementDeclarationIrDialog = value;
    }

    get selectedEmploye(): EmployeVo {
        return this.employeService.selectedEmploye;
    }

    set selectedEmploye(value: EmployeVo) {
        this.employeService.selectedEmploye = value;
    }

    get employes(): Array<EmployeVo> {
        return this.employeService.employes;
    }

    set employes(value: Array<EmployeVo>) {
        this.employeService.employes = value;
    }

    get createEmployeDialog(): boolean {
        return this.employeService.createEmployeDialog;
    }

    set createEmployeDialog(value: boolean) {
        this.employeService.createEmployeDialog = value;
    }

    get selectedPrelevementSocial(): PrelevementSocialVo {
        return this.prelevementSocialService.selectedPrelevementSocial;
    }

    set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this.prelevementSocialService.selectedPrelevementSocial = value;
    }

    get prelevementSocials(): Array<PrelevementSocialVo> {
        return this.prelevementSocialService.prelevementSocials;
    }

    set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this.prelevementSocialService.prelevementSocials = value;
    }

    get createPrelevementSocialDialog(): boolean {
        return this.prelevementSocialService.createPrelevementSocialDialog;
    }

    set createPrelevementSocialDialog(value: boolean) {
        this.prelevementSocialService.createPrelevementSocialDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
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

    get validDeclarationIrRefrerence(): boolean {
        return this._validDeclarationIrRefrerence;
    }

    set validDeclarationIrRefrerence(value: boolean) {
        this._validDeclarationIrRefrerence = value;
    }

    get validDeclarationIrAnnee(): boolean {
        return this._validDeclarationIrAnnee;
    }

    set validDeclarationIrAnnee(value: boolean) {
        this._validDeclarationIrAnnee = value;
    }

    get validDeclarationIrMois(): boolean {
        return this._validDeclarationIrMois;
    }

    set validDeclarationIrMois(value: boolean) {
        this._validDeclarationIrMois = value;
    }

    get validSocieteIce(): boolean {
        return this._validSocieteIce;
    }

    set validSocieteIce(value: boolean) {
        this._validSocieteIce = value;
    }

    get validSocieteRaisonSociale(): boolean {
        return this._validSocieteRaisonSociale;
    }

    set validSocieteRaisonSociale(value: boolean) {
        this._validSocieteRaisonSociale = value;
    }

    get validSocieteDateCreation(): boolean {
        return this._validSocieteDateCreation;
    }

    set validSocieteDateCreation(value: boolean) {
        this._validSocieteDateCreation = value;
    }

    get validSocieteAge(): boolean {
        return this._validSocieteAge;
    }

    set validSocieteAge(value: boolean) {
        this._validSocieteAge = value;
    }

    get validSocietePresidentSociete(): boolean {
        return this._validSocietePresidentSociete;
    }

    set validSocietePresidentSociete(value: boolean) {
        this._validSocietePresidentSociete = value;
    }

    get validDeclarationIrEmployeSalaireBase(): boolean {
        return this._validDeclarationIrEmployeSalaireBase;
    }

    set validDeclarationIrEmployeSalaireBase(value: boolean) {
        this._validDeclarationIrEmployeSalaireBase = value;
    }

    get validEtatDeclarationIrReference(): boolean {
        return this._validEtatDeclarationIrReference;
    }

    set validEtatDeclarationIrReference(value: boolean) {
        this._validEtatDeclarationIrReference = value;
    }

    get validEtatDeclarationIrLibelle(): boolean {
        return this._validEtatDeclarationIrLibelle;
    }

    set validEtatDeclarationIrLibelle(value: boolean) {
        this._validEtatDeclarationIrLibelle = value;
    }

    get validPaiementDeclarationIrReference(): boolean {
        return this._validPaiementDeclarationIrReference;
    }

    set validPaiementDeclarationIrReference(value: boolean) {
        this._validPaiementDeclarationIrReference = value;
    }

    get validPaiementDeclarationIrDatePaiement(): boolean {
        return this._validPaiementDeclarationIrDatePaiement;
    }

    set validPaiementDeclarationIrDatePaiement(value: boolean) {
        this._validPaiementDeclarationIrDatePaiement = value;
    }

    get validPaiementDeclarationIrTotal(): boolean {
        return this._validPaiementDeclarationIrTotal;
    }

    set validPaiementDeclarationIrTotal(value: boolean) {
        this._validPaiementDeclarationIrTotal = value;
    }

    get validPaiementDeclarationIrDeclarationIr(): boolean {
        return this._validPaiementDeclarationIrDeclarationIr;
    }

    set validPaiementDeclarationIrDeclarationIr(value: boolean) {
        this._validPaiementDeclarationIrDeclarationIr = value;
    }
    get demandes(): Array<DemandeVo>{
        return this.demandeService.demandes;
    }

}
