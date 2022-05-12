
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TauxIsConfigAdminComponent } from './taux-is-config-admin/taux-is-config-admin.component';



    import { EtatPaiementAdminComponent } from './etat-paiement-admin/etat-paiement-admin.component';



    import { TypeOperationFactureAdminComponent } from './type-operation-facture-admin/type-operation-facture-admin.component';



    import { CpcFactureAdminComponent } from './cpc-facture-admin/cpc-facture-admin.component';



    import { DeclarationIsAdminComponent } from './declaration-is-admin/declaration-is-admin.component';



    import { DeclarationIrEmployeAdminComponent } from './declaration-ir-employe-admin/declaration-ir-employe-admin.component';



    import { PresidentSocieteAdminComponent } from './president-societe-admin/president-societe-admin.component';



    import { DeclarationTvaAdminComponent } from './declaration-tva-admin/declaration-tva-admin.component';



    import { CpcAdminComponent } from './cpc-admin/cpc-admin.component';



    import { TypeSocieteAdminComponent } from './type-societe-admin/type-societe-admin.component';



    import { CommentaireAdminComponent } from './commentaire-admin/commentaire-admin.component';



    import { DeclarationCnssDetailAdminComponent } from './declaration-cnss-detail-admin/declaration-cnss-detail-admin.component';



    import { TypeComptableAdminComponent } from './type-comptable-admin/type-comptable-admin.component';



    import { PaiementDeclarationIsAdminComponent } from './paiement-declaration-is-admin/paiement-declaration-is-admin.component';



    import { TypeDeclarationTvaAdminComponent } from './type-declaration-tva-admin/type-declaration-tva-admin.component';



    import { TvaAdminComponent } from './tva-admin/tva-admin.component';



    import { PaiementDeclarationIrAdminComponent } from './paiement-declaration-ir-admin/paiement-declaration-ir-admin.component';



    import { DemandePieceJointeAdminComponent } from './demande-piece-jointe-admin/demande-piece-jointe-admin.component';



    import { TypeTauxCnssAdminComponent } from './type-taux-cnss-admin/type-taux-cnss-admin.component';



    import { DeclarationIrAdminComponent } from './declaration-ir-admin/declaration-ir-admin.component';



    import { EmployeAdminComponent } from './employe-admin/employe-admin.component';



    import { DeclarationCnssAdminComponent } from './declaration-cnss-admin/declaration-cnss-admin.component';



    import { EtatDeclarationTvaAdminComponent } from './etat-declaration-tva-admin/etat-declaration-tva-admin.component';



    import { PaiementDeclarationTvaAdminComponent } from './paiement-declaration-tva-admin/paiement-declaration-tva-admin.component';



    import { PrelevementSocialEmployeAdminComponent } from './prelevement-social-employe-admin/prelevement-social-employe-admin.component';



    import { FactureAdminComponent } from './facture-admin/facture-admin.component';



    import { EtatFactureAdminComponent } from './etat-facture-admin/etat-facture-admin.component';



    import { EtatDeclarationIsAdminComponent } from './etat-declaration-is-admin/etat-declaration-is-admin.component';



    import { CompteComptableAdminComponent } from './compte-comptable-admin/compte-comptable-admin.component';



    import { PrelevementSocialAdminComponent } from './prelevement-social-admin/prelevement-social-admin.component';



    import { ChercheurAdminComponent } from './chercheur-admin/chercheur-admin.component';



    import { SousClasseComptableAdminComponent } from './sous-classe-comptable-admin/sous-classe-comptable-admin.component';



    import { SocieteAdminComponent } from './societe-admin/societe-admin.component';



    import { ComptableAdminComponent } from './comptable-admin/comptable-admin.component';



    import { TauxIrAdminComponent } from './taux-ir-admin/taux-ir-admin.component';



    import { FacturePieceJointeAdminComponent } from './facture-piece-jointe-admin/facture-piece-jointe-admin.component';



    import { EtatDemandeAdminComponent } from './etat-demande-admin/etat-demande-admin.component';



    import { TypeEmployeAdminComponent } from './type-employe-admin/type-employe-admin.component';



    import { TauxIsAdminComponent } from './taux-is-admin/taux-is-admin.component';



    import { ClasseComptableAdminComponent } from './classe-comptable-admin/classe-comptable-admin.component';



    import { AcompteAdminComponent } from './acompte-admin/acompte-admin.component';



    import { DemandeAdminComponent } from './demande-admin/demande-admin.component';



    import { EtatDeclarationIrAdminComponent } from './etat-declaration-ir-admin/etat-declaration-ir-admin.component';



    import { TauxCnssAdminComponent } from './taux-cnss-admin/taux-cnss-admin.component';


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
                                    component: TauxIsConfigAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPaiementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-operation-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeOperationFactureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcFactureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIsAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrEmployeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'president-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: PresidentSocieteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationTvaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeSocieteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'commentaire',
                            children: [
                                {
                                    path: 'list',
                                    component: CommentaireAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssDetailAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeComptableAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIsAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeDeclarationTvaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TvaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIrAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandePieceJointeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeTauxCnssAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'employe',
                            children: [
                                {
                                    path: 'list',
                                    component: EmployeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationTvaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationTvaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialEmployeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture',
                            children: [
                                {
                                    path: 'list',
                                    component: FactureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatFactureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIsAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'compte-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: CompteComptableAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'sous-classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: SousClasseComptableAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'societe',
                            children: [
                                {
                                    path: 'list',
                                    component: SocieteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ComptableAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIrAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: FacturePieceJointeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEmployeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-is',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIsAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ClasseComptableAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'acompte',
                            children: [
                                {
                                    path: 'list',
                                    component: AcompteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIrAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxCnssAdminComponent ,
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
export class ImpotAdminRoutingModule { }
