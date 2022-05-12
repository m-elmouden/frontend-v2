
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TauxIsConfigChercheurComponent } from './taux-is-config-chercheur/taux-is-config-chercheur.component';



    import { EtatPaiementChercheurComponent } from './etat-paiement-chercheur/etat-paiement-chercheur.component';



    import { TypeOperationFactureChercheurComponent } from './type-operation-facture-chercheur/type-operation-facture-chercheur.component';



    import { CpcFactureChercheurComponent } from './cpc-facture-chercheur/cpc-facture-chercheur.component';



    import { DeclarationIsChercheurComponent } from './declaration-is-chercheur/declaration-is-chercheur.component';



    import { DeclarationIrEmployeChercheurComponent } from './declaration-ir-employe-chercheur/declaration-ir-employe-chercheur.component';



    import { PresidentSocieteChercheurComponent } from './president-societe-chercheur/president-societe-chercheur.component';



    import { DeclarationTvaChercheurComponent } from './declaration-tva-chercheur/declaration-tva-chercheur.component';



    import { CpcChercheurComponent } from './cpc-chercheur/cpc-chercheur.component';



    import { TypeSocieteChercheurComponent } from './type-societe-chercheur/type-societe-chercheur.component';



    import { CommentaireChercheurComponent } from './commentaire-chercheur/commentaire-chercheur.component';



    import { DeclarationCnssDetailChercheurComponent } from './declaration-cnss-detail-chercheur/declaration-cnss-detail-chercheur.component';



    import { TypeComptableChercheurComponent } from './type-comptable-chercheur/type-comptable-chercheur.component';



    import { PaiementDeclarationIsChercheurComponent } from './paiement-declaration-is-chercheur/paiement-declaration-is-chercheur.component';



    import { TypeDeclarationTvaChercheurComponent } from './type-declaration-tva-chercheur/type-declaration-tva-chercheur.component';



    import { TvaChercheurComponent } from './tva-chercheur/tva-chercheur.component';



    import { PaiementDeclarationIrChercheurComponent } from './paiement-declaration-ir-chercheur/paiement-declaration-ir-chercheur.component';



    import { DemandePieceJointeChercheurComponent } from './demande-piece-jointe-chercheur/demande-piece-jointe-chercheur.component';



    import { TypeTauxCnssChercheurComponent } from './type-taux-cnss-chercheur/type-taux-cnss-chercheur.component';



    import { DeclarationIrChercheurComponent } from './declaration-ir-chercheur/declaration-ir-chercheur.component';



    import { EmployeChercheurComponent } from './employe-chercheur/employe-chercheur.component';



    import { DeclarationCnssChercheurComponent } from './declaration-cnss-chercheur/declaration-cnss-chercheur.component';



    import { EtatDeclarationTvaChercheurComponent } from './etat-declaration-tva-chercheur/etat-declaration-tva-chercheur.component';



    import { PaiementDeclarationTvaChercheurComponent } from './paiement-declaration-tva-chercheur/paiement-declaration-tva-chercheur.component';



    import { PrelevementSocialEmployeChercheurComponent } from './prelevement-social-employe-chercheur/prelevement-social-employe-chercheur.component';



    import { FactureChercheurComponent } from './facture-chercheur/facture-chercheur.component';



    import { EtatFactureChercheurComponent } from './etat-facture-chercheur/etat-facture-chercheur.component';



    import { EtatDeclarationIsChercheurComponent } from './etat-declaration-is-chercheur/etat-declaration-is-chercheur.component';



    import { CompteComptableChercheurComponent } from './compte-comptable-chercheur/compte-comptable-chercheur.component';



    import { PrelevementSocialChercheurComponent } from './prelevement-social-chercheur/prelevement-social-chercheur.component';



    import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';



    import { SousClasseComptableChercheurComponent } from './sous-classe-comptable-chercheur/sous-classe-comptable-chercheur.component';



    import { SocieteChercheurComponent } from './societe-chercheur/societe-chercheur.component';



    import { ComptableChercheurComponent } from './comptable-chercheur/comptable-chercheur.component';



    import { TauxIrChercheurComponent } from './taux-ir-chercheur/taux-ir-chercheur.component';



    import { FacturePieceJointeChercheurComponent } from './facture-piece-jointe-chercheur/facture-piece-jointe-chercheur.component';



    import { EtatDemandeChercheurComponent } from './etat-demande-chercheur/etat-demande-chercheur.component';



    import { TypeEmployeChercheurComponent } from './type-employe-chercheur/type-employe-chercheur.component';



    import { TauxIsChercheurComponent } from './taux-is-chercheur/taux-is-chercheur.component';



    import { ClasseComptableChercheurComponent } from './classe-comptable-chercheur/classe-comptable-chercheur.component';



    import { AcompteChercheurComponent } from './acompte-chercheur/acompte-chercheur.component';



    import { DemandeChercheurComponent } from './demande-chercheur/demande-chercheur.component';



    import { EtatDeclarationIrChercheurComponent } from './etat-declaration-ir-chercheur/etat-declaration-ir-chercheur.component';



    import { TauxCnssChercheurComponent } from './taux-cnss-chercheur/taux-cnss-chercheur.component';


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
                                    component: TauxIsConfigChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPaiementChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-operation-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeOperationFactureChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcFactureChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIsChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrEmployeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'president-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: PresidentSocieteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationTvaChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeSocieteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'commentaire',
                            children: [
                                {
                                    path: 'list',
                                    component: CommentaireChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssDetailChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeComptableChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIsChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeDeclarationTvaChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TvaChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIrChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandePieceJointeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeTauxCnssChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'employe',
                            children: [
                                {
                                    path: 'list',
                                    component: EmployeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationTvaChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationTvaChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialEmployeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture',
                            children: [
                                {
                                    path: 'list',
                                    component: FactureChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatFactureChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIsChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'compte-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: CompteComptableChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'sous-classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: SousClasseComptableChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'societe',
                            children: [
                                {
                                    path: 'list',
                                    component: SocieteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ComptableChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIrChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: FacturePieceJointeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEmployeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-is',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIsChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ClasseComptableChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'acompte',
                            children: [
                                {
                                    path: 'list',
                                    component: AcompteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIrChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxCnssChercheurComponent ,
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
export class ImpotChercheurRoutingModule { }
