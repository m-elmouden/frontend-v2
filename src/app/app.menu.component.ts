import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modelchercheur : any[];
  modeladmin : any[];
  modelcomptable : any[];
  modelsociete : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService: AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modelchercheur =
      [
              {
                label: 'MenuDeclarationCnss',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration cnss detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/declaration-cnss-detail/list']
                    },
                    {
                      label: 'Liste Type taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/type-taux-cnss/list']
                    },
                    {
                      label: 'Liste Declaration cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/declaration-cnss/list']
                    },
                    {
                      label: 'Liste Taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/taux-cnss/list']
                    },
                ]
              },
              {
                label: 'Acompte',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Acompte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/acompte/list']
                    },
                ]
              },
              {
                label: 'MenuFacture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat paiement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/etat-paiement/list']
                    },
                    {
                      label: 'Liste Type operation facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/type-operation-facture/list']
                    },
                    {
                      label: 'Liste Facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/facture/list']
                    },
                    {
                      label: 'Liste Etat facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/etat-facture/list']
                    },
                    {
                      label: 'Liste Facture piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/facture-piece-jointe/list']
                    },
                ]
              },
              {
                label: 'MenuComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/type-comptable/list']
                    },
                    {
                      label: 'Liste Comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/comptable/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationTva',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/declaration-tva/list']
                    },
                    {
                      label: 'Liste Type declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/type-declaration-tva/list']
                    },
                    {
                      label: 'Liste Tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/tva/list']
                    },
                    {
                      label: 'Liste Etat declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/etat-declaration-tva/list']
                    },
                    {
                      label: 'Liste Paiement declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/paiement-declaration-tva/list']
                    },
                ]
              },
              {
                label: 'MenuDemande',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commentaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/commentaire/list']
                    },
                    {
                      label: 'Liste Demande piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/demande-piece-jointe/list']
                    },
                    {
                      label: 'Liste Etat demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/etat-demande/list']
                    },
                    {
                      label: 'Liste Demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/demande/list']
                    },
                ]
              },
              {
                label: 'MenuCpc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Cpc facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/cpc-facture/list']
                    },
                    {
                      label: 'Liste Cpc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/cpc/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIr',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration ir employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/declaration-ir-employe/list']
                    },
                    {
                      label: 'Liste Paiement declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/paiement-declaration-ir/list']
                    },
                    {
                      label: 'Liste Declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/declaration-ir/list']
                    },
                    {
                      label: 'Liste Employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/employe/list']
                    },
                    {
                      label: 'Liste Prelevement social employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/prelevement-social-employe/list']
                    },
                    {
                      label: 'Liste Prelevement social',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/prelevement-social/list']
                    },
                    {
                      label: 'Liste Taux ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/taux-ir/list']
                    },
                    {
                      label: 'Liste Type employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/type-employe/list']
                    },
                    {
                      label: 'Liste Etat declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/etat-declaration-ir/list']
                    },
                ]
              },
              {
                label: 'MenuSociete',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste President societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/president-societe/list']
                    },
                    {
                      label: 'Liste Type societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/type-societe/list']
                    },
                    {
                      label: 'Liste Societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/societe/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIs',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Taux is config',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/taux-is-config/list']
                    },
                    {
                      label: 'Liste Declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/declaration-is/list']
                    },
                    {
                      label: 'Liste Paiement declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/paiement-declaration-is/list']
                    },
                    {
                      label: 'Liste Etat declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/etat-declaration-is/list']
                    },
                    {
                      label: 'Liste Taux is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/taux-is/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/chercheur/list']
                    },
                ]
              },
              {
                label: 'MenuClasseComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Compte comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/compte-comptable/list']
                    },
                    {
                      label: 'Liste Sous classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/sous-classe-comptable/list']
                    },
                    {
                      label: 'Liste Classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/impot/classe-comptable/list']
                    },
                ]
              },
    ];
    this.modeladmin =
      [
          {
              label: 'Dashboard',
              icon: 'pi pi-home',
              routerLink: ['/app/admin/']
          },
              {
                label: 'MenuDeclarationCnss',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration cnss detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/declaration-cnss-detail/list']
                    },
                    {
                      label: 'Liste Type taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/type-taux-cnss/list']
                    },
                    {
                      label: 'Liste Declaration cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/declaration-cnss/list']
                    },
                    {
                      label: 'Liste Taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/taux-cnss/list']
                    },
                ]
              },
              {
                label: 'Acompte',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Acompte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/acompte/list']
                    },
                ]
              },
              {
                label: 'MenuFacture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat paiement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/etat-paiement/list']
                    },
                    {
                      label: 'Liste Type operation facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/type-operation-facture/list']
                    },
                    {
                      label: 'Liste Facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/facture/list']
                    },
                    {
                      label: 'Liste Etat facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/etat-facture/list']
                    },
                    {
                      label: 'Liste Facture piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/facture-piece-jointe/list']
                    },
                ]
              },
              {
                label: 'MenuComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/type-comptable/list']
                    },
                    {
                      label: 'Liste Comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/comptable/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationTva',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/declaration-tva/list']
                    },
                    {
                      label: 'Liste Type declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/type-declaration-tva/list']
                    },
                    {
                      label: 'Liste Tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/tva/list']
                    },
                    {
                      label: 'Liste Etat declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/etat-declaration-tva/list']
                    },
                    {
                      label: 'Liste Paiement declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/paiement-declaration-tva/list']
                    },
                ]
              },
              {
                label: 'MenuDemande',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commentaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/commentaire/list']
                    },
                    {
                      label: 'Liste Demande piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/demande-piece-jointe/list']
                    },
                    {
                      label: 'Liste Etat demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/etat-demande/list']
                    },
                    {
                      label: 'Liste Demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/demande/list']
                    },
                ]
              },
              {
                label: 'MenuCpc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Cpc facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/cpc-facture/list']
                    },
                    {
                      label: 'Liste Cpc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/cpc/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIr',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration ir employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/declaration-ir-employe/list']
                    },
                    {
                      label: 'Liste Paiement declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/paiement-declaration-ir/list']
                    },
                    {
                      label: 'Liste Declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/declaration-ir/list']
                    },
                    {
                      label: 'Liste Employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/employe/list']
                    },
                    {
                      label: 'Liste Prelevement social employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/prelevement-social-employe/list']
                    },
                    {
                      label: 'Liste Prelevement social',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/prelevement-social/list']
                    },
                    {
                      label: 'Liste Taux ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/taux-ir/list']
                    },
                    {
                      label: 'Liste Type employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/type-employe/list']
                    },
                    {
                      label: 'Liste Etat declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/etat-declaration-ir/list']
                    },
                ]
              },
              {
                label: 'MenuSociete',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste President societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/president-societe/list']
                    },
                    {
                      label: 'Liste Type societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/type-societe/list']
                    },
                    {
                      label: 'Liste Societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/societe/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIs',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Taux is config',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/taux-is-config/list']
                    },
                    {
                      label: 'Liste Declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/declaration-is/list']
                    },
                    {
                      label: 'Liste Paiement declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/paiement-declaration-is/list']
                    },
                    {
                      label: 'Liste Etat declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/etat-declaration-is/list']
                    },
                    {
                      label: 'Liste Taux is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/taux-is/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/chercheur/list']
                    },
                ]
              },
              {
                label: 'MenuClasseComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Compte comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/compte-comptable/list']
                    },
                    {
                      label: 'Liste Sous classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/sous-classe-comptable/list']
                    },
                    {
                      label: 'Liste Classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/impot/classe-comptable/list']
                    },
                ]
              },
    ]
    this.modelcomptable =
      [
              {
                label: 'MenuDeclarationCnss',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration cnss detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/declaration-cnss-detail/list']
                    },
                    {
                      label: 'Liste Type taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/type-taux-cnss/list']
                    },
                    {
                      label: 'Liste Declaration cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/declaration-cnss/list']
                    },
                    {
                      label: 'Liste Taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/taux-cnss/list']
                    },
                ]
              },
              {
                label: 'Acompte',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Acompte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/acompte/list']
                    },
                ]
              },
              {
                label: 'MenuFacture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat paiement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/etat-paiement/list']
                    },
                    {
                      label: 'Liste Type operation facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/type-operation-facture/list']
                    },
                    {
                      label: 'Liste Facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/facture/list']
                    },
                    {
                      label: 'Liste Etat facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/etat-facture/list']
                    },
                    {
                      label: 'Liste Facture piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/facture-piece-jointe/list']
                    },
                ]
              },
              {
                label: 'MenuComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/type-comptable/list']
                    },
                    {
                      label: 'Liste Comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/comptable/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationTva',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/declaration-tva/list']
                    },
                    {
                      label: 'Liste Type declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/type-declaration-tva/list']
                    },
                    {
                      label: 'Liste Tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/tva/list']
                    },
                    {
                      label: 'Liste Etat declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/etat-declaration-tva/list']
                    },
                    {
                      label: 'Liste Paiement declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/paiement-declaration-tva/list']
                    },
                ]
              },
              {
                label: 'MenuDemande',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commentaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/commentaire/list']
                    },
                    {
                      label: 'Liste Demande piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/demande-piece-jointe/list']
                    },
                    {
                      label: 'Liste Etat demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/etat-demande/list']
                    },
                    {
                      label: 'Liste Demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/demande/list']
                    },
                ]
              },
              {
                label: 'MenuCpc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Cpc facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/cpc-facture/list']
                    },
                    {
                      label: 'Liste Cpc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/cpc/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIr',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration ir employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/declaration-ir-employe/list']
                    },
                    {
                      label: 'Liste Paiement declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/paiement-declaration-ir/list']
                    },
                    {
                      label: 'Liste Declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/declaration-ir/list']
                    },
                    {
                      label: 'Liste Employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/employe/list']
                    },
                    {
                      label: 'Liste Prelevement social employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/prelevement-social-employe/list']
                    },
                    {
                      label: 'Liste Prelevement social',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/prelevement-social/list']
                    },
                    {
                      label: 'Liste Taux ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/taux-ir/list']
                    },
                    {
                      label: 'Liste Type employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/type-employe/list']
                    },
                    {
                      label: 'Liste Etat declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/etat-declaration-ir/list']
                    },
                ]
              },
              {
                label: 'MenuSociete',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste President societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/president-societe/list']
                    },
                    {
                      label: 'Liste Type societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/type-societe/list']
                    },
                    {
                      label: 'Liste Societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/societe/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIs',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Taux is config',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/taux-is-config/list']
                    },
                    {
                      label: 'Liste Declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/declaration-is/list']
                    },
                    {
                      label: 'Liste Paiement declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/paiement-declaration-is/list']
                    },
                    {
                      label: 'Liste Etat declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/etat-declaration-is/list']
                    },
                    {
                      label: 'Liste Taux is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/taux-is/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/chercheur/list']
                    },
                ]
              },
              {
                label: 'MenuClasseComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Compte comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/compte-comptable/list']
                    },
                    {
                      label: 'Liste Sous classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/sous-classe-comptable/list']
                    },
                    {
                      label: 'Liste Classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/comptable/impot/classe-comptable/list']
                    },
                ]
              },
    ]
    this.modelsociete =
      [
              {
                label: 'MenuDeclarationCnss',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration cnss detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/declaration-cnss-detail/list']
                    },
                    {
                      label: 'Liste Type taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/type-taux-cnss/list']
                    },
                    {
                      label: 'Liste Declaration cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/declaration-cnss/list']
                    },
                    {
                      label: 'Liste Taux cnss',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/taux-cnss/list']
                    },
                ]
              },
              {
                label: 'Acompte',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Acompte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/acompte/list']
                    },
                ]
              },
              {
                label: 'MenuFacture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat paiement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/etat-paiement/list']
                    },
                    {
                      label: 'Liste Type operation facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/type-operation-facture/list']
                    },
                    {
                      label: 'Liste Facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/facture/list']
                    },
                    {
                      label: 'Liste Etat facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/etat-facture/list']
                    },
                    {
                      label: 'Liste Facture piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/facture-piece-jointe/list']
                    },
                ]
              },
              {
                label: 'MenuComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/type-comptable/list']
                    },
                    {
                      label: 'Liste Comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/comptable/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationTva',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/declaration-tva/list']
                    },
                    {
                      label: 'Liste Type declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/type-declaration-tva/list']
                    },
                    {
                      label: 'Liste Tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/tva/list']
                    },
                    {
                      label: 'Liste Etat declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/etat-declaration-tva/list']
                    },
                    {
                      label: 'Liste Paiement declaration tva',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/paiement-declaration-tva/list']
                    },
                ]
              },
              {
                label: 'MenuDemande',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commentaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/commentaire/list']
                    },
                    {
                      label: 'Liste Demande piece jointe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/demande-piece-jointe/list']
                    },
                    {
                      label: 'Liste Etat demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/etat-demande/list']
                    },
                    {
                      label: 'Liste Demande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/demande/list']
                    },
                ]
              },
              {
                label: 'MenuCpc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Cpc facture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/cpc-facture/list']
                    },
                    {
                      label: 'Liste Cpc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/cpc/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIr',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Declaration ir employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/declaration-ir-employe/list']
                    },
                    {
                      label: 'Liste Paiement declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/paiement-declaration-ir/list']
                    },
                    {
                      label: 'Liste Declaration ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/declaration-ir/list']
                    },
                    {
                      label: 'Liste Employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/employe/list']
                    },
                    {
                      label: 'Liste Prelevement social employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/prelevement-social-employe/list']
                    },
                    {
                      label: 'Liste Prelevement social',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/prelevement-social/list']
                    },
                    {
                      label: 'Liste Taux ir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/taux-ir/list']
                    },
                    {
                      label: 'Liste Type employe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/type-employe/list']
                    }
                ]
              },
              {
                label: 'MenuSociete',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste President societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/president-societe/list']
                    },
                    {
                      label: 'Liste Type societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/type-societe/list']
                    },
                    {
                      label: 'Liste Societe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/societe/list']
                    },
                ]
              },
              {
                label: 'MenuDeclarationIs',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Taux is config',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/taux-is-config/list']
                    },
                    {
                      label: 'Liste Declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/declaration-is/list']
                    },
                    {
                      label: 'Liste Paiement declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/paiement-declaration-is/list']
                    },
                    {
                      label: 'Liste Etat declaration is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/etat-declaration-is/list']
                    },
                    {
                      label: 'Liste Taux is',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/taux-is/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/chercheur/list']
                    },
                ]
              },
              {
                label: 'MenuClasseComptable',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Compte comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/compte-comptable/list']
                    },
                    {
                      label: 'Liste Sous classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/sous-classe-comptable/list']
                    },
                    {
                      label: 'Liste Classe comptable',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/societe/impot/classe-comptable/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
