import {Component, Injectable, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {DemandeService} from '../../../../../controller/service/Demande.service';
import {SocieteVo} from '../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../controller/service/Societe.service';
import {TauxIsService} from '../../../../../controller/service/TauxIs.service';
import {TauxIsVo} from '../../../../../controller/model/TauxIs.model';


@Injectable({
    providedIn: 'root',
})

@Component({
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.scss']
})
export class DashboardAdminComponent implements OnInit {

    products: any[];

    items: MenuItem[];

    chartData: any;

    chartOptions: any;

    events: any[];

    fullcalendarOptions: any;
    demandestotal : any[]= [];
    demandestrait : any[]= [];
    demandesval : any[]= [];
    demandesvalidees: any[] = [];
    societeDialog: boolean;
    submitted: boolean;
    societe: SocieteVo;
    date = new Date();


    constructor(private demandeService: DemandeService, private societeService: SocieteService , private tauxIsService: TauxIsService) {}

    ngOnInit() {
        // this.productService.getProducts().then(data => this.products = data);
        this.tauxIsService.findAll().subscribe(data => this.itemsTauxIs = data);
        this.societeService.findAll().subscribe(data => this.itemsSte = data );
        this.demandeService.findAll().subscribe(demande => this.demandestotal = demande);
        this.demandeService.findByEtatDemandeRef('2').subscribe(demande => this.demandestrait = demande);
        this.demandeService.findByEtatDemandeRef('3').subscribe(demande => this.demandesval = demande);
        this.demandeService.findByEtatDemandeRef('4').subscribe(demande => this.demandesvalidees = demande);

        this.items = [
            { label: 'Save', icon: 'pi pi-check' },
            { label: 'Update', icon: 'pi pi-refresh' },
            { label: 'Delete', icon: 'pi pi-trash' },
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
        this.societeService.viewSocieteDialog = true ;
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
}
