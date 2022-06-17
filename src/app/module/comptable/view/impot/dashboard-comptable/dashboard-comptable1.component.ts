import {Component, Injectable, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {DemandeService} from '../../../../../controller/service/Demande.service';
import {SocieteVo} from '../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../controller/service/Societe.service';
import {TauxIsService} from '../../../../../controller/service/TauxIs.service';
import {TauxIsVo} from '../../../../../controller/model/TauxIs.model';
import {DeclarationIrService} from '../../../../../controller/service/DeclarationIr.service';
import {DeclarationirStatVo} from '../../../../../controller/model/DeclarationirStatVo.model';
import {DeclarationIrVo} from '../../../../../controller/model/DeclarationIr.model';
import {environment} from '../../../../../../environments/environment';
import {DatePipe} from '@angular/common';
import {TokenService} from '../../../../../controller/service/Token.service';
import {ActivatedRoute} from '@angular/router';


@Injectable({
    providedIn: 'root',
})

@Component({
    templateUrl: './dashboard-comptable.component.html',
    styleUrls: ['./dashboard-comptable.scss']
})
export class DashboardComptable1Component implements OnInit {

    products: any[];

    items: MenuItem[];

    chartData: any;

    chartOptions: any;

    events: any[];
    private _v1 = 0;
    private _v2 = 0;
    private _v3 = 0;
    private _v4 = 0;

    user = '';
    fullcalendarOptions: any;
    declarationstotal: any[] = [];
    societeDialog: boolean;
    submitted: boolean;
    societe: SocieteVo;
    private _date = new Date();
    private _statiqueDeclarationIr: DeclarationirStatVo [] = [];
    private _date1 = new Date();
    private _date2 = new Date();
    private _testStat: DeclarationIrVo = new DeclarationIrVo();
   declarationValidation: DeclarationIrVo[] = [];
    declarationInitialSoc: DeclarationIrVo[] = [];
    declarationtraitCompt: DeclarationIrVo[] = [];
    declarationValide: DeclarationIrVo[] = [];

    // tslint:disable-next-line:max-line-length
    constructor(private demandeService: DemandeService, private societeService: SocieteService, private tauxIsService: TauxIsService, private declarationIrService: DeclarationIrService, public datepipe: DatePipe, public tokenService: TokenService,public activatedRoute:ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            console.log(params);
        });
        this.loadInfos();
        this.headerCards();

        this.items = [
            {label: 'Save', icon: 'pi pi-check'},
            {label: 'Update', icon: 'pi pi-refresh'},
            {label: 'Delete', icon: 'pi pi-trash'},
        ];

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: [
                    '#0F97C7',
                ],
                borderWidth: 3,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 3
            }, {
                label: 'Income',
                data: [1, 2, 5, 3, 12, 7, 15],
                backgroundColor: [
                    'rgba(187,222,251,0.2)',
                ],
                borderColor: [
                    '#578697',
                ],
                borderWidth: 3,
                fill: true
            },
                {
                    label: 'Expenses',
                    data: [7, 12, 15, 5, 3, 13, 21],
                    borderColor: [
                        '#1BA7AF',
                    ],
                    borderWidth: 3,
                    fill: false,
                    pointRadius: [4, 6, 4, 12, 8, 0, 4]
                },
                {
                    label: 'New Users',
                    data: [3, 7, 2, 17, 15, 13, 19],
                    borderColor: [
                        '#E2841A',
                    ],
                    borderWidth: 3,
                    fill: false
                }]
        };

        this.chartOptions = {
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        };

        // this.eventService.getEvents().then(events => { this.events = events; });

        this.fullcalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2017-02-12',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };
    }

    viewSociete(selected: SocieteVo) {
        this.societeService.selectedSociete = selected;
        // this.societeDialog = true;
        this.societeService.viewSocieteDialog = true;
    }

    headerCards() {
        this.declarationIrService.findAll().subscribe(data => this.v1 = data.length);
        this.declarationIrService.findByEtatDeclarationIrReference('E1').subscribe(data => {
            this.declarationValidation = data;
            this.v3 = data.length;
        });
        this.declarationIrService.findByEtatDeclarationIrReference('E2').subscribe(data => {
            this.declarationInitialSoc = data;
            this.v2 = data.length;
        });
        this.declarationIrService.findByEtatDeclarationIrReference('E3').subscribe(data => this.v3 = this.v3 + data.length);
        this.declarationIrService.findByEtatDeclarationIrReference('E4').subscribe(data => this.v4 = data.length);
    }
    public loadInfos() {
        const tokenDecoded = this.tokenService.decode();
        this.user = tokenDecoded.sub;
    }
    hideDialog() {
        this.societeDialog = false;
        this.submitted = false;
    }

    get itemsSte(): Array<SocieteVo> {
        return this.societeService.societes;
    }

    set itemsSte(value: Array<SocieteVo>) {
        this.societeService.societes = value;
    }

    get itemsTauxIs(): Array<TauxIsVo> {
        return this.tauxIsService.tauxIss;
    }

    set itemsTauxIs(value: Array<TauxIsVo>) {
        this.tauxIsService.tauxIss = value;
    }

    get statiqueDeclarationIr(): Array<DeclarationirStatVo> {
        return this._statiqueDeclarationIr;
    }

    set statiqueDeclarationIr(value: Array<DeclarationirStatVo>) {
        this._statiqueDeclarationIr = value;
    }

    get testStat(): DeclarationIrVo {
        return this._testStat;
    }

    set testStat(value: DeclarationIrVo) {
        this._testStat = value;
    }


    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get date1(): Date {
        return this._date1;
    }

    set date1(value: Date) {
        this._date1 = value;
    }

    get date2(): Date {
        return this._date2;
    }

    set date2(value: Date) {
        this._date2 = value;
    }

    get v1(): number {
        return this._v1;
    }

    set v1(value: number) {
        this._v1 = value;
    }

    get v2(): number {
        return this._v2;
    }

    set v2(value: number) {
        this._v2 = value;
    }

    get v3(): number {
        return this._v3;
    }

    set v3(value: number) {
        this._v3 = value;
    }

    get v4(): number {
        return this._v4;
    }

    set v4(value: number) {
        this._v4 = value;
    }

    checkMessage(declarationIr: DeclarationIrVo): string {
        if (declarationIr.etatDeclarationIrVo.reference === 'E1') {
            return 'info';
        } else if (declarationIr.etatDeclarationIrVo.reference === 'E2') {
            return 'error';
        } else if (declarationIr.etatDeclarationIrVo.reference === 'E3') {
            return 'warn';
        } else if (declarationIr.etatDeclarationIrVo.reference === 'E4') {
            return 'success';
        } else {
            return 'warn';
        }


    }

}
