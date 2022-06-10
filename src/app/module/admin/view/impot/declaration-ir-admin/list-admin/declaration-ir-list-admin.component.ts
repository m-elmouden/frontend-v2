import {Component, OnInit} from '@angular/core';
import {DeclarationIrService} from '../../../../../../controller/service/DeclarationIr.service';
import {DeclarationIrVo} from '../../../../../../controller/model/DeclarationIr.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {EtatDeclarationIrService} from '../../../../../../controller/service/EtatDeclarationIr.service';
import {PaiementDeclarationIrService} from '../../../../../../controller/service/PaiementDeclarationIr.service';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {PaiementDeclarationIrVo} from '../../../../../../controller/model/PaiementDeclarationIr.model';
import {EtatDeclarationIrVo} from '../../../../../../controller/model/EtatDeclarationIr.model';
import {DeclarationIrEmployeVo} from '../../../../../../controller/model/DeclarationIrEmploye.model';
import {PrelevementSocialEmployeVo} from '../../../../../../controller/model/PrelevementSocialEmploye.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import {ExportService} from '../../../../../../controller/service/Export.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DeclarationirStatVo} from '../../../../../../controller/model/DeclarationirStatVo.model';

@Component({
    selector: 'app-declaration-ir-list-admin',
    templateUrl: './declaration-ir-list-admin.component.html',
    styleUrls: ['./declaration-ir-list-admin.component.css']
})
export class DeclarationIrListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeclarationIr';
    yesOrNoArchive: any[] = [];
    yesOrNoAdmin: any[] = [];
    yesOrNoVisible: any[] = [];
    societes: Array<SocieteVo>;
    etatDeclarationIrs: Array<EtatDeclarationIrVo>;
    paiementDeclarationIrs: Array<PaiementDeclarationIrVo>;


    constructor(private datePipe: DatePipe, private declarationIrService: DeclarationIrService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private societeService: SocieteService
        , private etatDeclarationIrService: EtatDeclarationIrService
        , private paiementDeclarationIrService: PaiementDeclarationIrService
    ) {
    }

    ngOnInit(): void {
        this.loadDeclarationIrs();
        this.initExport();
        this.initCol();
        this.loadSociete();
        this.loadEtatDeclarationIr();
        this.loadPaiementDeclarationIr();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoAdmin = [{label: 'Admin', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoVisible = [{label: 'Visible', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadDeclarationIrs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'list');
        isPermistted ? this.declarationIrService.findAll().subscribe(declarationIrs => this.declarationIrs = declarationIrs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.declarationIrService.findByCriteria(this.searchDeclarationIr).subscribe(declarationIrs => {

            this.declarationIrs = declarationIrs;
            // this.searchDeclarationIr = new DeclarationIrVo();
        }, error => console.log(error));
    }


    private initCol() {
        this.cols = [
            {field: 'refrerence', header: 'Refrerence'},
            {field: 'societe?.id', header: 'Societe'},
            {field: 'annee', header: 'Annee'},
            {field: 'mois', header: 'Mois'},
            {field: 'montantIrCalcule', header: 'Montant ir calcule'},
            {field: 'montantIrAPaye', header: 'Montant ir a paye'},
            {field: 'totalAPaye', header: 'Total a paye'},
            {field: 'totalSalaireNet', header: 'Total salaire net'},
            {field: 'totalSalaireBrut', header: 'Total salaire brut'},
            {field: 'etatDeclarationIr?.libelle', header: 'Etat declaration ir'},
            {field: 'paiementDeclarationIr?.reference', header: 'Paiement declaration ir'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
            {field: 'admin', header: 'Admin'},
            {field: 'visible', header: 'Visible'},
            {field: 'username', header: 'Username'},
        ];
    }

    public async editDeclarationIr(declarationIr: DeclarationIrVo) {
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'edit');
        if (isPermistted) {
            this.declarationIrService.findByIdWithAssociatedList(declarationIr).subscribe(res => {
                this.selectedDeclarationIr = res;
                this.selectedDeclarationIr.dateArchivage = new Date(declarationIr.dateArchivage);
                this.selectedDeclarationIr.dateCreation = new Date(declarationIr.dateCreation);
                this.editDeclarationIrDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewDeclarationIr(declarationIr: DeclarationIrVo) {
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'view');
        if (isPermistted) {
            this.declarationIrService.findByIdWithAssociatedList(declarationIr).subscribe(res => {
                this.selectedDeclarationIr = res;
                this.selectedDeclarationIr.dateArchivage = new Date(declarationIr.dateArchivage);
                this.selectedDeclarationIr.dateCreation = new Date(declarationIr.dateCreation);
                this.viewDeclarationIrDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateDeclarationIr(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDeclarationIr = new DeclarationIrVo();
            this.createDeclarationIrDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverDeclarationIr(declarationIr: DeclarationIrVo) {
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Declaration ir) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.declarationIrService.archiver(declarationIr).subscribe(status => {
                        const myIndex = this.declarationIrs.indexOf(declarationIr);
                        this.declarationIrs[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Declaration ir archivé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async desarchiverDeclarationIr(declarationIr: DeclarationIrVo) {
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Declaration ir) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.declarationIrService.desarchiver(declarationIr).subscribe(status => {
                        const myIndex = this.declarationIrs.indexOf(declarationIr);
                        this.declarationIrs[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Declaration ir désarchivé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }


    public async deleteDeclarationIr(declarationIr: DeclarationIrVo) {
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Declaration ir) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.declarationIrService.delete(declarationIr).subscribe(status => {
                        if (status > 0) {
                            const position = this.declarationIrs.indexOf(declarationIr);
                            position > -1 ? this.declarationIrs.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Declaration ir Supprimé',
                                life: 3000
                            });
                        }

                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadSociete() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'list');
        isPermistted ? this.societeService.findAll().subscribe(societes => this.societes = societes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEtatDeclarationIr() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'list');
        isPermistted ? this.etatDeclarationIrService.findAll().subscribe(etatDeclarationIrs => this.etatDeclarationIrs = etatDeclarationIrs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPaiementDeclarationIr() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeclarationIr', 'list');
        isPermistted ? this.paiementDeclarationIrService.findAll().subscribe(paiementDeclarationIrs => this.paiementDeclarationIrs = paiementDeclarationIrs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateDeclarationIr(declarationIr: DeclarationIrVo) {

        this.declarationIrService.findByIdWithAssociatedList(declarationIr).subscribe(
            res => {
                this.initDuplicateDeclarationIr(res);
                this.selectedDeclarationIr = res;
                this.selectedDeclarationIr.id = null;
                this.createDeclarationIrDialog = true;

            });

    }

    initDuplicateDeclarationIr(res: DeclarationIrVo) {
        if (res.declarationIrEmployesVo != null) {
            res.declarationIrEmployesVo.forEach(d => {
                d.declarationIrVo = null;
                d.id = null;
            });
        }
        if (res.prelevementSocialEmployesVo != null) {
            res.prelevementSocialEmployesVo.forEach(d => {
                d.declarationIrVo = null;
                d.id = null;
            });
        }


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }


    prepareColumnExport(): void {
        this.exportData = this.declarationIrs.map(e => {
            return {
                Refrerence: e.refrerence,
                Societe: e.societeVo?.id,
                Annee: e.annee,
                Mois: e.mois,
                'Montant ir calcule': e.montantIrCalcule,
                'Montant ir a paye': e.montantIrAPaye,
                'Total a paye': e.totalAPaye,
                'Total salaire net': e.totalSalaireNet,
                'Total salaire brut': e.totalSalaireBrut,
                'Etat declaration ir': e.etatDeclarationIrVo?.libelle,
                'Paiement declaration ir': e.paiementDeclarationIrVo?.reference,
                Archive: e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
                Admin: e.admin ? 'Vrai' : 'Faux',
                Visible: e.visible ? 'Vrai' : 'Faux',
                Username: e.username,
            };
        });

        this.criteriaData = [{
            Refrerence: this.searchDeclarationIr.refrerence ? this.searchDeclarationIr.refrerence : environment.emptyForExport,
            Societe: this.searchDeclarationIr.societeVo?.id ? this.searchDeclarationIr.societeVo?.id : environment.emptyForExport,
            'Annee Min': this.searchDeclarationIr.anneeMin ? this.searchDeclarationIr.anneeMin : environment.emptyForExport,
            'Annee Max': this.searchDeclarationIr.anneeMax ? this.searchDeclarationIr.anneeMax : environment.emptyForExport,
            'Mois Min': this.searchDeclarationIr.moisMin ? this.searchDeclarationIr.moisMin : environment.emptyForExport,
            'Mois Max': this.searchDeclarationIr.moisMax ? this.searchDeclarationIr.moisMax : environment.emptyForExport,
            'Montant ir calcule Min': this.searchDeclarationIr.montantIrCalculeMin ? this.searchDeclarationIr.montantIrCalculeMin : environment.emptyForExport,
            'Montant ir calcule Max': this.searchDeclarationIr.montantIrCalculeMax ? this.searchDeclarationIr.montantIrCalculeMax : environment.emptyForExport,
            'Montant ir a paye Min': this.searchDeclarationIr.montantIrAPayeMin ? this.searchDeclarationIr.montantIrAPayeMin : environment.emptyForExport,
            'Montant ir a paye Max': this.searchDeclarationIr.montantIrAPayeMax ? this.searchDeclarationIr.montantIrAPayeMax : environment.emptyForExport,
            'Total a paye Min': this.searchDeclarationIr.totalAPayeMin ? this.searchDeclarationIr.totalAPayeMin : environment.emptyForExport,
            'Total a paye Max': this.searchDeclarationIr.totalAPayeMax ? this.searchDeclarationIr.totalAPayeMax : environment.emptyForExport,
            'Total salaire net Min': this.searchDeclarationIr.totalSalaireNetMin ? this.searchDeclarationIr.totalSalaireNetMin : environment.emptyForExport,
            'Total salaire net Max': this.searchDeclarationIr.totalSalaireNetMax ? this.searchDeclarationIr.totalSalaireNetMax : environment.emptyForExport,
            'Total salaire brut Min': this.searchDeclarationIr.totalSalaireBrutMin ? this.searchDeclarationIr.totalSalaireBrutMin : environment.emptyForExport,
            'Total salaire brut Max': this.searchDeclarationIr.totalSalaireBrutMax ? this.searchDeclarationIr.totalSalaireBrutMax : environment.emptyForExport,
            'Etat declaration ir': this.searchDeclarationIr.etatDeclarationIrVo?.libelle ? this.searchDeclarationIr.etatDeclarationIrVo?.libelle : environment.emptyForExport,
            'Paiement declaration ir': this.searchDeclarationIr.paiementDeclarationIrVo?.reference ? this.searchDeclarationIr.paiementDeclarationIrVo?.reference : environment.emptyForExport,
            Archive: this.searchDeclarationIr.archive ? (this.searchDeclarationIr.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchDeclarationIr.dateArchivageMin ? this.datePipe.transform(this.searchDeclarationIr.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchDeclarationIr.dateArchivageMax ? this.datePipe.transform(this.searchDeclarationIr.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchDeclarationIr.dateCreationMin ? this.datePipe.transform(this.searchDeclarationIr.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchDeclarationIr.dateCreationMax ? this.datePipe.transform(this.searchDeclarationIr.dateCreationMax, this.dateFormat) : environment.emptyForExport,
            Admin: this.searchDeclarationIr.admin ? (this.searchDeclarationIr.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            Visible: this.searchDeclarationIr.visible ? (this.searchDeclarationIr.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            Username: this.searchDeclarationIr.username ? this.searchDeclarationIr.username : environment.emptyForExport,
        }];

    }

    // getters and setters



    get declarationIrs(): Array<DeclarationIrVo> {
        return this.declarationIrService.declarationIrs;
    }

    set declarationIrs(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrs = value;
    }

    get declarationIrSelections(): Array<DeclarationIrVo> {
        return this.declarationIrService.declarationIrSelections;
    }

    set declarationIrSelections(value: Array<DeclarationIrVo>) {
        this.declarationIrService.declarationIrSelections = value;
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

    get editDeclarationIrDialog(): boolean {
        return this.declarationIrService.editDeclarationIrDialog;
    }

    set editDeclarationIrDialog(value: boolean) {
        this.declarationIrService.editDeclarationIrDialog = value;
    }

    get viewDeclarationIrDialog(): boolean {
        return this.declarationIrService.viewDeclarationIrDialog;
    }

    set viewDeclarationIrDialog(value: boolean) {
        this.declarationIrService.viewDeclarationIrDialog = value;
    }

    get searchDeclarationIr(): DeclarationIrVo {
        return this.declarationIrService.searchDeclarationIr;
    }

    set searchDeclarationIr(value: DeclarationIrVo) {
        this.declarationIrService.searchDeclarationIr = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


    public uploadExcelFile(event) {
        const file = event.files[0];
        console.log(file);
        const formData: FormData = new FormData();
        formData.append('file', file);
        console.log(formData);
        this.declarationIrService.importExcel(formData).subscribe(data => {
                console.log(data);
            }
        ),
            error => {
                alert('Problème de téléchargement');

            };
    }


    checkMessage(declarationIr: DeclarationIrVo): string {
        if (declarationIr.etatDeclarationIrVo.reference === 'E1') {
            return 'error';
        } else if (declarationIr.etatDeclarationIrVo.reference === 'E2') {
            return 'info';
        } else if (declarationIr.etatDeclarationIrVo.reference === 'E3') {
            return 'warn';
        } else if (declarationIr.etatDeclarationIrVo.reference === 'E4') {
            return 'success';
        } else {
            return 'warn';
        }

    }
}
