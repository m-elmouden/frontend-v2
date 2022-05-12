
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TauxIsConfigSocieteComponent } from './taux-is-config-societe/taux-is-config-societe.component';



    import { EtatPaiementSocieteComponent } from './etat-paiement-societe/etat-paiement-societe.component';



    import { TypeOperationFactureSocieteComponent } from './type-operation-facture-societe/type-operation-facture-societe.component';



    import { CpcFactureSocieteComponent } from './cpc-facture-societe/cpc-facture-societe.component';



    import { DeclarationIsSocieteComponent } from './declaration-is-societe/declaration-is-societe.component';



    import { DeclarationIrEmployeSocieteComponent } from './declaration-ir-employe-societe/declaration-ir-employe-societe.component';



    import { PresidentSocieteSocieteComponent } from './president-societe-societe/president-societe-societe.component';



    import { DeclarationTvaSocieteComponent } from './declaration-tva-societe/declaration-tva-societe.component';



    import { CpcSocieteComponent } from './cpc-societe/cpc-societe.component';



    import { TypeSocieteSocieteComponent } from './type-societe-societe/type-societe-societe.component';



    import { CommentaireSocieteComponent } from './commentaire-societe/commentaire-societe.component';



    import { DeclarationCnssDetailSocieteComponent } from './declaration-cnss-detail-societe/declaration-cnss-detail-societe.component';



    import { TypeComptableSocieteComponent } from './type-comptable-societe/type-comptable-societe.component';



    import { PaiementDeclarationIsSocieteComponent } from './paiement-declaration-is-societe/paiement-declaration-is-societe.component';



    import { TypeDeclarationTvaSocieteComponent } from './type-declaration-tva-societe/type-declaration-tva-societe.component';



    import { TvaSocieteComponent } from './tva-societe/tva-societe.component';



    import { PaiementDeclarationIrSocieteComponent } from './paiement-declaration-ir-societe/paiement-declaration-ir-societe.component';



    import { DemandePieceJointeSocieteComponent } from './demande-piece-jointe-societe/demande-piece-jointe-societe.component';



    import { TypeTauxCnssSocieteComponent } from './type-taux-cnss-societe/type-taux-cnss-societe.component';



    import { DeclarationIrSocieteComponent } from './declaration-ir-societe/declaration-ir-societe.component';



    import { EmployeSocieteComponent } from './employe-societe/employe-societe.component';



    import { DeclarationCnssSocieteComponent } from './declaration-cnss-societe/declaration-cnss-societe.component';



    import { EtatDeclarationTvaSocieteComponent } from './etat-declaration-tva-societe/etat-declaration-tva-societe.component';



    import { PaiementDeclarationTvaSocieteComponent } from './paiement-declaration-tva-societe/paiement-declaration-tva-societe.component';



    import { PrelevementSocialEmployeSocieteComponent } from './prelevement-social-employe-societe/prelevement-social-employe-societe.component';



    import { FactureSocieteComponent } from './facture-societe/facture-societe.component';



    import { EtatFactureSocieteComponent } from './etat-facture-societe/etat-facture-societe.component';



    import { EtatDeclarationIsSocieteComponent } from './etat-declaration-is-societe/etat-declaration-is-societe.component';



    import { CompteComptableSocieteComponent } from './compte-comptable-societe/compte-comptable-societe.component';



    import { PrelevementSocialSocieteComponent } from './prelevement-social-societe/prelevement-social-societe.component';



    import { ChercheurSocieteComponent } from './chercheur-societe/chercheur-societe.component';



    import { SousClasseComptableSocieteComponent } from './sous-classe-comptable-societe/sous-classe-comptable-societe.component';



    import { SocieteSocieteComponent } from './societe-societe/societe-societe.component';



    import { ComptableSocieteComponent } from './comptable-societe/comptable-societe.component';



    import { TauxIrSocieteComponent } from './taux-ir-societe/taux-ir-societe.component';



    import { FacturePieceJointeSocieteComponent } from './facture-piece-jointe-societe/facture-piece-jointe-societe.component';



    import { EtatDemandeSocieteComponent } from './etat-demande-societe/etat-demande-societe.component';



    import { TypeEmployeSocieteComponent } from './type-employe-societe/type-employe-societe.component';



    import { TauxIsSocieteComponent } from './taux-is-societe/taux-is-societe.component';



    import { ClasseComptableSocieteComponent } from './classe-comptable-societe/classe-comptable-societe.component';



    import { AcompteSocieteComponent } from './acompte-societe/acompte-societe.component';



    import { DemandeSocieteComponent } from './demande-societe/demande-societe.component';



    import { EtatDeclarationIrSocieteComponent } from './etat-declaration-ir-societe/etat-declaration-ir-societe.component';



    import { TauxCnssSocieteComponent } from './taux-cnss-societe/taux-cnss-societe.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'taux-is-config',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIsConfigSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPaiementSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-operation-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeOperationFactureSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcFactureSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIsSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrEmployeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'president-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: PresidentSocieteSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationTvaSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeSocieteSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'commentaire',
                            children: [
                                {
                                    path: 'list',
                                    component: CommentaireSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssDetailSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeComptableSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIsSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeDeclarationTvaSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TvaSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIrSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandePieceJointeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeTauxCnssSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'employe',
                            children: [
                                {
                                    path: 'list',
                                    component: EmployeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationTvaSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationTvaSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialEmployeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture',
                            children: [
                                {
                                    path: 'list',
                                    component: FactureSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatFactureSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIsSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'compte-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: CompteComptableSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'sous-classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: SousClasseComptableSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'societe',
                            children: [
                                {
                                    path: 'list',
                                    component: SocieteSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ComptableSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIrSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: FacturePieceJointeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEmployeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-is',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIsSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ClasseComptableSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'acompte',
                            children: [
                                {
                                    path: 'list',
                                    component: AcompteSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIrSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxCnssSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ImpotSocieteRoutingModule { }
