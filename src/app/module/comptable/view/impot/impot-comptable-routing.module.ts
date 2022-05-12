
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { TauxIsConfigComptableComponent } from './taux-is-config-comptable/taux-is-config-comptable.component';



    import { EtatPaiementComptableComponent } from './etat-paiement-comptable/etat-paiement-comptable.component';



    import { TypeOperationFactureComptableComponent } from './type-operation-facture-comptable/type-operation-facture-comptable.component';



    import { CpcFactureComptableComponent } from './cpc-facture-comptable/cpc-facture-comptable.component';



    import { DeclarationIsComptableComponent } from './declaration-is-comptable/declaration-is-comptable.component';



    import { DeclarationIrEmployeComptableComponent } from './declaration-ir-employe-comptable/declaration-ir-employe-comptable.component';



    import { PresidentSocieteComptableComponent } from './president-societe-comptable/president-societe-comptable.component';



    import { DeclarationTvaComptableComponent } from './declaration-tva-comptable/declaration-tva-comptable.component';



    import { CpcComptableComponent } from './cpc-comptable/cpc-comptable.component';



    import { TypeSocieteComptableComponent } from './type-societe-comptable/type-societe-comptable.component';



    import { CommentaireComptableComponent } from './commentaire-comptable/commentaire-comptable.component';



    import { DeclarationCnssDetailComptableComponent } from './declaration-cnss-detail-comptable/declaration-cnss-detail-comptable.component';



    import { TypeComptableComptableComponent } from './type-comptable-comptable/type-comptable-comptable.component';



    import { PaiementDeclarationIsComptableComponent } from './paiement-declaration-is-comptable/paiement-declaration-is-comptable.component';



    import { TypeDeclarationTvaComptableComponent } from './type-declaration-tva-comptable/type-declaration-tva-comptable.component';



    import { TvaComptableComponent } from './tva-comptable/tva-comptable.component';



    import { PaiementDeclarationIrComptableComponent } from './paiement-declaration-ir-comptable/paiement-declaration-ir-comptable.component';



    import { DemandePieceJointeComptableComponent } from './demande-piece-jointe-comptable/demande-piece-jointe-comptable.component';



    import { TypeTauxCnssComptableComponent } from './type-taux-cnss-comptable/type-taux-cnss-comptable.component';



    import { DeclarationIrComptableComponent } from './declaration-ir-comptable/declaration-ir-comptable.component';



    import { EmployeComptableComponent } from './employe-comptable/employe-comptable.component';



    import { DeclarationCnssComptableComponent } from './declaration-cnss-comptable/declaration-cnss-comptable.component';



    import { EtatDeclarationTvaComptableComponent } from './etat-declaration-tva-comptable/etat-declaration-tva-comptable.component';



    import { PaiementDeclarationTvaComptableComponent } from './paiement-declaration-tva-comptable/paiement-declaration-tva-comptable.component';



    import { PrelevementSocialEmployeComptableComponent } from './prelevement-social-employe-comptable/prelevement-social-employe-comptable.component';



    import { FactureComptableComponent } from './facture-comptable/facture-comptable.component';



    import { EtatFactureComptableComponent } from './etat-facture-comptable/etat-facture-comptable.component';



    import { EtatDeclarationIsComptableComponent } from './etat-declaration-is-comptable/etat-declaration-is-comptable.component';



    import { CompteComptableComptableComponent } from './compte-comptable-comptable/compte-comptable-comptable.component';



    import { PrelevementSocialComptableComponent } from './prelevement-social-comptable/prelevement-social-comptable.component';



    import { ChercheurComptableComponent } from './chercheur-comptable/chercheur-comptable.component';



    import { SousClasseComptableComptableComponent } from './sous-classe-comptable-comptable/sous-classe-comptable-comptable.component';



    import { SocieteComptableComponent } from './societe-comptable/societe-comptable.component';



    import { ComptableComptableComponent } from './comptable-comptable/comptable-comptable.component';



    import { TauxIrComptableComponent } from './taux-ir-comptable/taux-ir-comptable.component';



    import { FacturePieceJointeComptableComponent } from './facture-piece-jointe-comptable/facture-piece-jointe-comptable.component';



    import { EtatDemandeComptableComponent } from './etat-demande-comptable/etat-demande-comptable.component';



    import { TypeEmployeComptableComponent } from './type-employe-comptable/type-employe-comptable.component';



    import { TauxIsComptableComponent } from './taux-is-comptable/taux-is-comptable.component';



    import { ClasseComptableComptableComponent } from './classe-comptable-comptable/classe-comptable-comptable.component';



    import { AcompteComptableComponent } from './acompte-comptable/acompte-comptable.component';



    import { DemandeComptableComponent } from './demande-comptable/demande-comptable.component';



    import { EtatDeclarationIrComptableComponent } from './etat-declaration-ir-comptable/etat-declaration-ir-comptable.component';



    import { TauxCnssComptableComponent } from './taux-cnss-comptable/taux-cnss-comptable.component';


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
                                    component: TauxIsConfigComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-paiement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPaiementComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-operation-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeOperationFactureComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcFactureComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIsComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrEmployeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'president-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: PresidentSocieteComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationTvaComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'cpc',
                            children: [
                                {
                                    path: 'list',
                                    component: CpcComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-societe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeSocieteComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'commentaire',
                            children: [
                                {
                                    path: 'list',
                                    component: CommentaireComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssDetailComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeComptableComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIsComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeDeclarationTvaComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tva',
                            children: [
                                {
                                    path: 'list',
                                    component: TvaComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationIrComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandePieceJointeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeTauxCnssComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationIrComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'employe',
                            children: [
                                {
                                    path: 'list',
                                    component: EmployeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'declaration-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: DeclarationCnssComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationTvaComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'paiement-declaration-tva',
                            children: [
                                {
                                    path: 'list',
                                    component: PaiementDeclarationTvaComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialEmployeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture',
                            children: [
                                {
                                    path: 'list',
                                    component: FactureComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-facture',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatFactureComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-is',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIsComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'compte-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: CompteComptableComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prelevement-social',
                            children: [
                                {
                                    path: 'list',
                                    component: PrelevementSocialComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'sous-classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: SousClasseComptableComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'societe',
                            children: [
                                {
                                    path: 'list',
                                    component: SocieteComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ComptableComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIrComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'facture-piece-jointe',
                            children: [
                                {
                                    path: 'list',
                                    component: FacturePieceJointeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-employe',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEmployeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-is',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxIsComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'classe-comptable',
                            children: [
                                {
                                    path: 'list',
                                    component: ClasseComptableComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'acompte',
                            children: [
                                {
                                    path: 'list',
                                    component: AcompteComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-declaration-ir',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDeclarationIrComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'taux-cnss',
                            children: [
                                {
                                    path: 'list',
                                    component: TauxCnssComptableComponent ,
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
export class ImpotComptableRoutingModule { }
