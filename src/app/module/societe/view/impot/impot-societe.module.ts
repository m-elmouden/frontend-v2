import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { TauxIsConfigCreateSocieteComponent } from './taux-is-config-societe/create-societe/taux-is-config-create-societe.component';
import { TauxIsConfigEditSocieteComponent } from './taux-is-config-societe/edit-societe/taux-is-config-edit-societe.component';
import { TauxIsConfigViewSocieteComponent } from './taux-is-config-societe/view-societe/taux-is-config-view-societe.component';
import { TauxIsConfigListSocieteComponent } from './taux-is-config-societe/list-societe/taux-is-config-list-societe.component';
import { TauxIsConfigSocieteComponent } from './taux-is-config-societe/taux-is-config-societe.component';
import { EtatPaiementCreateSocieteComponent } from './etat-paiement-societe/create-societe/etat-paiement-create-societe.component';
import { EtatPaiementEditSocieteComponent } from './etat-paiement-societe/edit-societe/etat-paiement-edit-societe.component';
import { EtatPaiementViewSocieteComponent } from './etat-paiement-societe/view-societe/etat-paiement-view-societe.component';
import { EtatPaiementListSocieteComponent } from './etat-paiement-societe/list-societe/etat-paiement-list-societe.component';
import { EtatPaiementSocieteComponent } from './etat-paiement-societe/etat-paiement-societe.component';
import { TypeOperationFactureCreateSocieteComponent } from './type-operation-facture-societe/create-societe/type-operation-facture-create-societe.component';
import { TypeOperationFactureEditSocieteComponent } from './type-operation-facture-societe/edit-societe/type-operation-facture-edit-societe.component';
import { TypeOperationFactureViewSocieteComponent } from './type-operation-facture-societe/view-societe/type-operation-facture-view-societe.component';
import { TypeOperationFactureListSocieteComponent } from './type-operation-facture-societe/list-societe/type-operation-facture-list-societe.component';
import { TypeOperationFactureSocieteComponent } from './type-operation-facture-societe/type-operation-facture-societe.component';
import { CpcFactureCreateSocieteComponent } from './cpc-facture-societe/create-societe/cpc-facture-create-societe.component';
import { CpcFactureEditSocieteComponent } from './cpc-facture-societe/edit-societe/cpc-facture-edit-societe.component';
import { CpcFactureViewSocieteComponent } from './cpc-facture-societe/view-societe/cpc-facture-view-societe.component';
import { CpcFactureListSocieteComponent } from './cpc-facture-societe/list-societe/cpc-facture-list-societe.component';
import { CpcFactureSocieteComponent } from './cpc-facture-societe/cpc-facture-societe.component';
import { DeclarationIsCreateSocieteComponent } from './declaration-is-societe/create-societe/declaration-is-create-societe.component';
import { DeclarationIsEditSocieteComponent } from './declaration-is-societe/edit-societe/declaration-is-edit-societe.component';
import { DeclarationIsViewSocieteComponent } from './declaration-is-societe/view-societe/declaration-is-view-societe.component';
import { DeclarationIsListSocieteComponent } from './declaration-is-societe/list-societe/declaration-is-list-societe.component';
import { DeclarationIsSocieteComponent } from './declaration-is-societe/declaration-is-societe.component';
import { DeclarationIrEmployeCreateSocieteComponent } from './declaration-ir-employe-societe/create-societe/declaration-ir-employe-create-societe.component';
import { DeclarationIrEmployeEditSocieteComponent } from './declaration-ir-employe-societe/edit-societe/declaration-ir-employe-edit-societe.component';
import { DeclarationIrEmployeViewSocieteComponent } from './declaration-ir-employe-societe/view-societe/declaration-ir-employe-view-societe.component';
import { DeclarationIrEmployeListSocieteComponent } from './declaration-ir-employe-societe/list-societe/declaration-ir-employe-list-societe.component';
import { DeclarationIrEmployeSocieteComponent } from './declaration-ir-employe-societe/declaration-ir-employe-societe.component';
import { PresidentSocieteCreateSocieteComponent } from './president-societe-societe/create-societe/president-societe-create-societe.component';
import { PresidentSocieteEditSocieteComponent } from './president-societe-societe/edit-societe/president-societe-edit-societe.component';
import { PresidentSocieteViewSocieteComponent } from './president-societe-societe/view-societe/president-societe-view-societe.component';
import { PresidentSocieteListSocieteComponent } from './president-societe-societe/list-societe/president-societe-list-societe.component';
import { PresidentSocieteSocieteComponent } from './president-societe-societe/president-societe-societe.component';
import { DeclarationTvaCreateSocieteComponent } from './declaration-tva-societe/create-societe/declaration-tva-create-societe.component';
import { DeclarationTvaEditSocieteComponent } from './declaration-tva-societe/edit-societe/declaration-tva-edit-societe.component';
import { DeclarationTvaViewSocieteComponent } from './declaration-tva-societe/view-societe/declaration-tva-view-societe.component';
import { DeclarationTvaListSocieteComponent } from './declaration-tva-societe/list-societe/declaration-tva-list-societe.component';
import { DeclarationTvaSocieteComponent } from './declaration-tva-societe/declaration-tva-societe.component';
import { CpcCreateSocieteComponent } from './cpc-societe/create-societe/cpc-create-societe.component';
import { CpcEditSocieteComponent } from './cpc-societe/edit-societe/cpc-edit-societe.component';
import { CpcViewSocieteComponent } from './cpc-societe/view-societe/cpc-view-societe.component';
import { CpcListSocieteComponent } from './cpc-societe/list-societe/cpc-list-societe.component';
import { CpcSocieteComponent } from './cpc-societe/cpc-societe.component';
import { TypeSocieteCreateSocieteComponent } from './type-societe-societe/create-societe/type-societe-create-societe.component';
import { TypeSocieteEditSocieteComponent } from './type-societe-societe/edit-societe/type-societe-edit-societe.component';
import { TypeSocieteViewSocieteComponent } from './type-societe-societe/view-societe/type-societe-view-societe.component';
import { TypeSocieteListSocieteComponent } from './type-societe-societe/list-societe/type-societe-list-societe.component';
import { TypeSocieteSocieteComponent } from './type-societe-societe/type-societe-societe.component';
import { CommentaireCreateSocieteComponent } from './commentaire-societe/create-societe/commentaire-create-societe.component';
import { CommentaireEditSocieteComponent } from './commentaire-societe/edit-societe/commentaire-edit-societe.component';
import { CommentaireViewSocieteComponent } from './commentaire-societe/view-societe/commentaire-view-societe.component';
import { CommentaireListSocieteComponent } from './commentaire-societe/list-societe/commentaire-list-societe.component';
import { CommentaireSocieteComponent } from './commentaire-societe/commentaire-societe.component';
import { DeclarationCnssDetailCreateSocieteComponent } from './declaration-cnss-detail-societe/create-societe/declaration-cnss-detail-create-societe.component';
import { DeclarationCnssDetailEditSocieteComponent } from './declaration-cnss-detail-societe/edit-societe/declaration-cnss-detail-edit-societe.component';
import { DeclarationCnssDetailViewSocieteComponent } from './declaration-cnss-detail-societe/view-societe/declaration-cnss-detail-view-societe.component';
import { DeclarationCnssDetailListSocieteComponent } from './declaration-cnss-detail-societe/list-societe/declaration-cnss-detail-list-societe.component';
import { DeclarationCnssDetailSocieteComponent } from './declaration-cnss-detail-societe/declaration-cnss-detail-societe.component';
import { TypeComptableCreateSocieteComponent } from './type-comptable-societe/create-societe/type-comptable-create-societe.component';
import { TypeComptableEditSocieteComponent } from './type-comptable-societe/edit-societe/type-comptable-edit-societe.component';
import { TypeComptableViewSocieteComponent } from './type-comptable-societe/view-societe/type-comptable-view-societe.component';
import { TypeComptableListSocieteComponent } from './type-comptable-societe/list-societe/type-comptable-list-societe.component';
import { TypeComptableSocieteComponent } from './type-comptable-societe/type-comptable-societe.component';
import { PaiementDeclarationIsCreateSocieteComponent } from './paiement-declaration-is-societe/create-societe/paiement-declaration-is-create-societe.component';
import { PaiementDeclarationIsEditSocieteComponent } from './paiement-declaration-is-societe/edit-societe/paiement-declaration-is-edit-societe.component';
import { PaiementDeclarationIsViewSocieteComponent } from './paiement-declaration-is-societe/view-societe/paiement-declaration-is-view-societe.component';
import { PaiementDeclarationIsListSocieteComponent } from './paiement-declaration-is-societe/list-societe/paiement-declaration-is-list-societe.component';
import { PaiementDeclarationIsSocieteComponent } from './paiement-declaration-is-societe/paiement-declaration-is-societe.component';
import { TypeDeclarationTvaCreateSocieteComponent } from './type-declaration-tva-societe/create-societe/type-declaration-tva-create-societe.component';
import { TypeDeclarationTvaEditSocieteComponent } from './type-declaration-tva-societe/edit-societe/type-declaration-tva-edit-societe.component';
import { TypeDeclarationTvaViewSocieteComponent } from './type-declaration-tva-societe/view-societe/type-declaration-tva-view-societe.component';
import { TypeDeclarationTvaListSocieteComponent } from './type-declaration-tva-societe/list-societe/type-declaration-tva-list-societe.component';
import { TypeDeclarationTvaSocieteComponent } from './type-declaration-tva-societe/type-declaration-tva-societe.component';
import { TvaCreateSocieteComponent } from './tva-societe/create-societe/tva-create-societe.component';
import { TvaEditSocieteComponent } from './tva-societe/edit-societe/tva-edit-societe.component';
import { TvaViewSocieteComponent } from './tva-societe/view-societe/tva-view-societe.component';
import { TvaListSocieteComponent } from './tva-societe/list-societe/tva-list-societe.component';
import { TvaSocieteComponent } from './tva-societe/tva-societe.component';
import { PaiementDeclarationIrCreateSocieteComponent } from './paiement-declaration-ir-societe/create-societe/paiement-declaration-ir-create-societe.component';
import { PaiementDeclarationIrEditSocieteComponent } from './paiement-declaration-ir-societe/edit-societe/paiement-declaration-ir-edit-societe.component';
import { PaiementDeclarationIrViewSocieteComponent } from './paiement-declaration-ir-societe/view-societe/paiement-declaration-ir-view-societe.component';
import { PaiementDeclarationIrListSocieteComponent } from './paiement-declaration-ir-societe/list-societe/paiement-declaration-ir-list-societe.component';
import { PaiementDeclarationIrSocieteComponent } from './paiement-declaration-ir-societe/paiement-declaration-ir-societe.component';
import { DemandePieceJointeCreateSocieteComponent } from './demande-piece-jointe-societe/create-societe/demande-piece-jointe-create-societe.component';
import { DemandePieceJointeEditSocieteComponent } from './demande-piece-jointe-societe/edit-societe/demande-piece-jointe-edit-societe.component';
import { DemandePieceJointeViewSocieteComponent } from './demande-piece-jointe-societe/view-societe/demande-piece-jointe-view-societe.component';
import { DemandePieceJointeListSocieteComponent } from './demande-piece-jointe-societe/list-societe/demande-piece-jointe-list-societe.component';
import { DemandePieceJointeSocieteComponent } from './demande-piece-jointe-societe/demande-piece-jointe-societe.component';
import { TypeTauxCnssCreateSocieteComponent } from './type-taux-cnss-societe/create-societe/type-taux-cnss-create-societe.component';
import { TypeTauxCnssEditSocieteComponent } from './type-taux-cnss-societe/edit-societe/type-taux-cnss-edit-societe.component';
import { TypeTauxCnssViewSocieteComponent } from './type-taux-cnss-societe/view-societe/type-taux-cnss-view-societe.component';
import { TypeTauxCnssListSocieteComponent } from './type-taux-cnss-societe/list-societe/type-taux-cnss-list-societe.component';
import { TypeTauxCnssSocieteComponent } from './type-taux-cnss-societe/type-taux-cnss-societe.component';
import { DeclarationIrCreateSocieteComponent } from './declaration-ir-societe/create-societe/declaration-ir-create-societe.component';
import { DeclarationIrEditSocieteComponent } from './declaration-ir-societe/edit-societe/declaration-ir-edit-societe.component';
import { DeclarationIrViewSocieteComponent } from './declaration-ir-societe/view-societe/declaration-ir-view-societe.component';
import { DeclarationIrListSocieteComponent } from './declaration-ir-societe/list-societe/declaration-ir-list-societe.component';
import { DeclarationIrSocieteComponent } from './declaration-ir-societe/declaration-ir-societe.component';
import { EmployeCreateSocieteComponent } from './employe-societe/create-societe/employe-create-societe.component';
import { EmployeEditSocieteComponent } from './employe-societe/edit-societe/employe-edit-societe.component';
import { EmployeViewSocieteComponent } from './employe-societe/view-societe/employe-view-societe.component';
import { EmployeListSocieteComponent } from './employe-societe/list-societe/employe-list-societe.component';
import { EmployeSocieteComponent } from './employe-societe/employe-societe.component';
import { DeclarationCnssCreateSocieteComponent } from './declaration-cnss-societe/create-societe/declaration-cnss-create-societe.component';
import { DeclarationCnssEditSocieteComponent } from './declaration-cnss-societe/edit-societe/declaration-cnss-edit-societe.component';
import { DeclarationCnssViewSocieteComponent } from './declaration-cnss-societe/view-societe/declaration-cnss-view-societe.component';
import { DeclarationCnssListSocieteComponent } from './declaration-cnss-societe/list-societe/declaration-cnss-list-societe.component';
import { DeclarationCnssSocieteComponent } from './declaration-cnss-societe/declaration-cnss-societe.component';
import { EtatDeclarationTvaCreateSocieteComponent } from './etat-declaration-tva-societe/create-societe/etat-declaration-tva-create-societe.component';
import { EtatDeclarationTvaEditSocieteComponent } from './etat-declaration-tva-societe/edit-societe/etat-declaration-tva-edit-societe.component';
import { EtatDeclarationTvaViewSocieteComponent } from './etat-declaration-tva-societe/view-societe/etat-declaration-tva-view-societe.component';
import { EtatDeclarationTvaListSocieteComponent } from './etat-declaration-tva-societe/list-societe/etat-declaration-tva-list-societe.component';
import { EtatDeclarationTvaSocieteComponent } from './etat-declaration-tva-societe/etat-declaration-tva-societe.component';
import { PaiementDeclarationTvaCreateSocieteComponent } from './paiement-declaration-tva-societe/create-societe/paiement-declaration-tva-create-societe.component';
import { PaiementDeclarationTvaEditSocieteComponent } from './paiement-declaration-tva-societe/edit-societe/paiement-declaration-tva-edit-societe.component';
import { PaiementDeclarationTvaViewSocieteComponent } from './paiement-declaration-tva-societe/view-societe/paiement-declaration-tva-view-societe.component';
import { PaiementDeclarationTvaListSocieteComponent } from './paiement-declaration-tva-societe/list-societe/paiement-declaration-tva-list-societe.component';
import { PaiementDeclarationTvaSocieteComponent } from './paiement-declaration-tva-societe/paiement-declaration-tva-societe.component';
import { PrelevementSocialEmployeCreateSocieteComponent } from './prelevement-social-employe-societe/create-societe/prelevement-social-employe-create-societe.component';
import { PrelevementSocialEmployeEditSocieteComponent } from './prelevement-social-employe-societe/edit-societe/prelevement-social-employe-edit-societe.component';
import { PrelevementSocialEmployeViewSocieteComponent } from './prelevement-social-employe-societe/view-societe/prelevement-social-employe-view-societe.component';
import { PrelevementSocialEmployeListSocieteComponent } from './prelevement-social-employe-societe/list-societe/prelevement-social-employe-list-societe.component';
import { PrelevementSocialEmployeSocieteComponent } from './prelevement-social-employe-societe/prelevement-social-employe-societe.component';
import { FactureCreateSocieteComponent } from './facture-societe/create-societe/facture-create-societe.component';
import { FactureEditSocieteComponent } from './facture-societe/edit-societe/facture-edit-societe.component';
import { FactureViewSocieteComponent } from './facture-societe/view-societe/facture-view-societe.component';
import { FactureListSocieteComponent } from './facture-societe/list-societe/facture-list-societe.component';
import { FactureSocieteComponent } from './facture-societe/facture-societe.component';
import { EtatFactureCreateSocieteComponent } from './etat-facture-societe/create-societe/etat-facture-create-societe.component';
import { EtatFactureEditSocieteComponent } from './etat-facture-societe/edit-societe/etat-facture-edit-societe.component';
import { EtatFactureViewSocieteComponent } from './etat-facture-societe/view-societe/etat-facture-view-societe.component';
import { EtatFactureListSocieteComponent } from './etat-facture-societe/list-societe/etat-facture-list-societe.component';
import { EtatFactureSocieteComponent } from './etat-facture-societe/etat-facture-societe.component';
import { EtatDeclarationIsCreateSocieteComponent } from './etat-declaration-is-societe/create-societe/etat-declaration-is-create-societe.component';
import { EtatDeclarationIsEditSocieteComponent } from './etat-declaration-is-societe/edit-societe/etat-declaration-is-edit-societe.component';
import { EtatDeclarationIsViewSocieteComponent } from './etat-declaration-is-societe/view-societe/etat-declaration-is-view-societe.component';
import { EtatDeclarationIsListSocieteComponent } from './etat-declaration-is-societe/list-societe/etat-declaration-is-list-societe.component';
import { EtatDeclarationIsSocieteComponent } from './etat-declaration-is-societe/etat-declaration-is-societe.component';
import { CompteComptableCreateSocieteComponent } from './compte-comptable-societe/create-societe/compte-comptable-create-societe.component';
import { CompteComptableEditSocieteComponent } from './compte-comptable-societe/edit-societe/compte-comptable-edit-societe.component';
import { CompteComptableViewSocieteComponent } from './compte-comptable-societe/view-societe/compte-comptable-view-societe.component';
import { CompteComptableListSocieteComponent } from './compte-comptable-societe/list-societe/compte-comptable-list-societe.component';
import { CompteComptableSocieteComponent } from './compte-comptable-societe/compte-comptable-societe.component';
import { PrelevementSocialCreateSocieteComponent } from './prelevement-social-societe/create-societe/prelevement-social-create-societe.component';
import { PrelevementSocialEditSocieteComponent } from './prelevement-social-societe/edit-societe/prelevement-social-edit-societe.component';
import { PrelevementSocialViewSocieteComponent } from './prelevement-social-societe/view-societe/prelevement-social-view-societe.component';
import { PrelevementSocialListSocieteComponent } from './prelevement-social-societe/list-societe/prelevement-social-list-societe.component';
import { PrelevementSocialSocieteComponent } from './prelevement-social-societe/prelevement-social-societe.component';
import { ChercheurCreateSocieteComponent } from './chercheur-societe/create-societe/chercheur-create-societe.component';
import { ChercheurEditSocieteComponent } from './chercheur-societe/edit-societe/chercheur-edit-societe.component';
import { ChercheurViewSocieteComponent } from './chercheur-societe/view-societe/chercheur-view-societe.component';
import { ChercheurListSocieteComponent } from './chercheur-societe/list-societe/chercheur-list-societe.component';
import { ChercheurSocieteComponent } from './chercheur-societe/chercheur-societe.component';
import { SousClasseComptableCreateSocieteComponent } from './sous-classe-comptable-societe/create-societe/sous-classe-comptable-create-societe.component';
import { SousClasseComptableEditSocieteComponent } from './sous-classe-comptable-societe/edit-societe/sous-classe-comptable-edit-societe.component';
import { SousClasseComptableViewSocieteComponent } from './sous-classe-comptable-societe/view-societe/sous-classe-comptable-view-societe.component';
import { SousClasseComptableListSocieteComponent } from './sous-classe-comptable-societe/list-societe/sous-classe-comptable-list-societe.component';
import { SousClasseComptableSocieteComponent } from './sous-classe-comptable-societe/sous-classe-comptable-societe.component';
import { SocieteCreateSocieteComponent } from './societe-societe/create-societe/societe-create-societe.component';
import { SocieteEditSocieteComponent } from './societe-societe/edit-societe/societe-edit-societe.component';
import { SocieteViewSocieteComponent } from './societe-societe/view-societe/societe-view-societe.component';
import { SocieteListSocieteComponent } from './societe-societe/list-societe/societe-list-societe.component';
import { SocieteSocieteComponent } from './societe-societe/societe-societe.component';
import { ComptableCreateSocieteComponent } from './comptable-societe/create-societe/comptable-create-societe.component';
import { ComptableEditSocieteComponent } from './comptable-societe/edit-societe/comptable-edit-societe.component';
import { ComptableViewSocieteComponent } from './comptable-societe/view-societe/comptable-view-societe.component';
import { ComptableListSocieteComponent } from './comptable-societe/list-societe/comptable-list-societe.component';
import { ComptableSocieteComponent } from './comptable-societe/comptable-societe.component';
import { TauxIrCreateSocieteComponent } from './taux-ir-societe/create-societe/taux-ir-create-societe.component';
import { TauxIrEditSocieteComponent } from './taux-ir-societe/edit-societe/taux-ir-edit-societe.component';
import { TauxIrViewSocieteComponent } from './taux-ir-societe/view-societe/taux-ir-view-societe.component';
import { TauxIrListSocieteComponent } from './taux-ir-societe/list-societe/taux-ir-list-societe.component';
import { TauxIrSocieteComponent } from './taux-ir-societe/taux-ir-societe.component';
import { FacturePieceJointeCreateSocieteComponent } from './facture-piece-jointe-societe/create-societe/facture-piece-jointe-create-societe.component';
import { FacturePieceJointeEditSocieteComponent } from './facture-piece-jointe-societe/edit-societe/facture-piece-jointe-edit-societe.component';
import { FacturePieceJointeViewSocieteComponent } from './facture-piece-jointe-societe/view-societe/facture-piece-jointe-view-societe.component';
import { FacturePieceJointeListSocieteComponent } from './facture-piece-jointe-societe/list-societe/facture-piece-jointe-list-societe.component';
import { FacturePieceJointeSocieteComponent } from './facture-piece-jointe-societe/facture-piece-jointe-societe.component';
import { EtatDemandeCreateSocieteComponent } from './etat-demande-societe/create-societe/etat-demande-create-societe.component';
import { EtatDemandeEditSocieteComponent } from './etat-demande-societe/edit-societe/etat-demande-edit-societe.component';
import { EtatDemandeViewSocieteComponent } from './etat-demande-societe/view-societe/etat-demande-view-societe.component';
import { EtatDemandeListSocieteComponent } from './etat-demande-societe/list-societe/etat-demande-list-societe.component';
import { EtatDemandeSocieteComponent } from './etat-demande-societe/etat-demande-societe.component';
import { TypeEmployeCreateSocieteComponent } from './type-employe-societe/create-societe/type-employe-create-societe.component';
import { TypeEmployeEditSocieteComponent } from './type-employe-societe/edit-societe/type-employe-edit-societe.component';
import { TypeEmployeViewSocieteComponent } from './type-employe-societe/view-societe/type-employe-view-societe.component';
import { TypeEmployeListSocieteComponent } from './type-employe-societe/list-societe/type-employe-list-societe.component';
import { TypeEmployeSocieteComponent } from './type-employe-societe/type-employe-societe.component';
import { TauxIsCreateSocieteComponent } from './taux-is-societe/create-societe/taux-is-create-societe.component';
import { TauxIsEditSocieteComponent } from './taux-is-societe/edit-societe/taux-is-edit-societe.component';
import { TauxIsViewSocieteComponent } from './taux-is-societe/view-societe/taux-is-view-societe.component';
import { TauxIsListSocieteComponent } from './taux-is-societe/list-societe/taux-is-list-societe.component';
import { TauxIsSocieteComponent } from './taux-is-societe/taux-is-societe.component';
import { ClasseComptableCreateSocieteComponent } from './classe-comptable-societe/create-societe/classe-comptable-create-societe.component';
import { ClasseComptableEditSocieteComponent } from './classe-comptable-societe/edit-societe/classe-comptable-edit-societe.component';
import { ClasseComptableViewSocieteComponent } from './classe-comptable-societe/view-societe/classe-comptable-view-societe.component';
import { ClasseComptableListSocieteComponent } from './classe-comptable-societe/list-societe/classe-comptable-list-societe.component';
import { ClasseComptableSocieteComponent } from './classe-comptable-societe/classe-comptable-societe.component';
import { AcompteCreateSocieteComponent } from './acompte-societe/create-societe/acompte-create-societe.component';
import { AcompteEditSocieteComponent } from './acompte-societe/edit-societe/acompte-edit-societe.component';
import { AcompteViewSocieteComponent } from './acompte-societe/view-societe/acompte-view-societe.component';
import { AcompteListSocieteComponent } from './acompte-societe/list-societe/acompte-list-societe.component';
import { AcompteSocieteComponent } from './acompte-societe/acompte-societe.component';
import { DemandeCreateSocieteComponent } from './demande-societe/create-societe/demande-create-societe.component';
import { DemandeEditSocieteComponent } from './demande-societe/edit-societe/demande-edit-societe.component';
import { DemandeViewSocieteComponent } from './demande-societe/view-societe/demande-view-societe.component';
import { DemandeListSocieteComponent } from './demande-societe/list-societe/demande-list-societe.component';
import { DemandeSocieteComponent } from './demande-societe/demande-societe.component';
import { EtatDeclarationIrCreateSocieteComponent } from './etat-declaration-ir-societe/create-societe/etat-declaration-ir-create-societe.component';
import { EtatDeclarationIrEditSocieteComponent } from './etat-declaration-ir-societe/edit-societe/etat-declaration-ir-edit-societe.component';
import { EtatDeclarationIrViewSocieteComponent } from './etat-declaration-ir-societe/view-societe/etat-declaration-ir-view-societe.component';
import { EtatDeclarationIrListSocieteComponent } from './etat-declaration-ir-societe/list-societe/etat-declaration-ir-list-societe.component';
import { EtatDeclarationIrSocieteComponent } from './etat-declaration-ir-societe/etat-declaration-ir-societe.component';
import { TauxCnssCreateSocieteComponent } from './taux-cnss-societe/create-societe/taux-cnss-create-societe.component';
import { TauxCnssEditSocieteComponent } from './taux-cnss-societe/edit-societe/taux-cnss-edit-societe.component';
import { TauxCnssViewSocieteComponent } from './taux-cnss-societe/view-societe/taux-cnss-view-societe.component';
import { TauxCnssListSocieteComponent } from './taux-cnss-societe/list-societe/taux-cnss-list-societe.component';
import { TauxCnssSocieteComponent } from './taux-cnss-societe/taux-cnss-societe.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {RippleModule} from 'primeng/ripple';
import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
    declarations: [
        TauxIsConfigCreateSocieteComponent,
        TauxIsConfigListSocieteComponent,
        TauxIsConfigViewSocieteComponent,
        TauxIsConfigEditSocieteComponent,
        TauxIsConfigSocieteComponent,
        EtatPaiementCreateSocieteComponent,
        EtatPaiementListSocieteComponent,
        EtatPaiementViewSocieteComponent,
        EtatPaiementEditSocieteComponent,
        EtatPaiementSocieteComponent,
        TypeOperationFactureCreateSocieteComponent,
        TypeOperationFactureListSocieteComponent,
        TypeOperationFactureViewSocieteComponent,
        TypeOperationFactureEditSocieteComponent,
        TypeOperationFactureSocieteComponent,
        CpcFactureCreateSocieteComponent,
        CpcFactureListSocieteComponent,
        CpcFactureViewSocieteComponent,
        CpcFactureEditSocieteComponent,
        CpcFactureSocieteComponent,
        DeclarationIsCreateSocieteComponent,
        DeclarationIsListSocieteComponent,
        DeclarationIsViewSocieteComponent,
        DeclarationIsEditSocieteComponent,
        DeclarationIsSocieteComponent,
        DeclarationIrEmployeCreateSocieteComponent,
        DeclarationIrEmployeListSocieteComponent,
        DeclarationIrEmployeViewSocieteComponent,
        DeclarationIrEmployeEditSocieteComponent,
        DeclarationIrEmployeSocieteComponent,
        PresidentSocieteCreateSocieteComponent,
        PresidentSocieteListSocieteComponent,
        PresidentSocieteViewSocieteComponent,
        PresidentSocieteEditSocieteComponent,
        PresidentSocieteSocieteComponent,
        DeclarationTvaCreateSocieteComponent,
        DeclarationTvaListSocieteComponent,
        DeclarationTvaViewSocieteComponent,
        DeclarationTvaEditSocieteComponent,
        DeclarationTvaSocieteComponent,
        CpcCreateSocieteComponent,
        CpcListSocieteComponent,
        CpcViewSocieteComponent,
        CpcEditSocieteComponent,
        CpcSocieteComponent,
        TypeSocieteCreateSocieteComponent,
        TypeSocieteListSocieteComponent,
        TypeSocieteViewSocieteComponent,
        TypeSocieteEditSocieteComponent,
        TypeSocieteSocieteComponent,
        CommentaireCreateSocieteComponent,
        CommentaireListSocieteComponent,
        CommentaireViewSocieteComponent,
        CommentaireEditSocieteComponent,
        CommentaireSocieteComponent,
        DeclarationCnssDetailCreateSocieteComponent,
        DeclarationCnssDetailListSocieteComponent,
        DeclarationCnssDetailViewSocieteComponent,
        DeclarationCnssDetailEditSocieteComponent,
        DeclarationCnssDetailSocieteComponent,
        TypeComptableCreateSocieteComponent,
        TypeComptableListSocieteComponent,
        TypeComptableViewSocieteComponent,
        TypeComptableEditSocieteComponent,
        TypeComptableSocieteComponent,
        PaiementDeclarationIsCreateSocieteComponent,
        PaiementDeclarationIsListSocieteComponent,
        PaiementDeclarationIsViewSocieteComponent,
        PaiementDeclarationIsEditSocieteComponent,
        PaiementDeclarationIsSocieteComponent,
        TypeDeclarationTvaCreateSocieteComponent,
        TypeDeclarationTvaListSocieteComponent,
        TypeDeclarationTvaViewSocieteComponent,
        TypeDeclarationTvaEditSocieteComponent,
        TypeDeclarationTvaSocieteComponent,
        TvaCreateSocieteComponent,
        TvaListSocieteComponent,
        TvaViewSocieteComponent,
        TvaEditSocieteComponent,
        TvaSocieteComponent,
        PaiementDeclarationIrCreateSocieteComponent,
        PaiementDeclarationIrListSocieteComponent,
        PaiementDeclarationIrViewSocieteComponent,
        PaiementDeclarationIrEditSocieteComponent,
        PaiementDeclarationIrSocieteComponent,
        DemandePieceJointeCreateSocieteComponent,
        DemandePieceJointeListSocieteComponent,
        DemandePieceJointeViewSocieteComponent,
        DemandePieceJointeEditSocieteComponent,
        DemandePieceJointeSocieteComponent,
        TypeTauxCnssCreateSocieteComponent,
        TypeTauxCnssListSocieteComponent,
        TypeTauxCnssViewSocieteComponent,
        TypeTauxCnssEditSocieteComponent,
        TypeTauxCnssSocieteComponent,
        DeclarationIrCreateSocieteComponent,
        DeclarationIrListSocieteComponent,
        DeclarationIrViewSocieteComponent,
        DeclarationIrEditSocieteComponent,
        DeclarationIrSocieteComponent,
        EmployeCreateSocieteComponent,
        EmployeListSocieteComponent,
        EmployeViewSocieteComponent,
        EmployeEditSocieteComponent,
        EmployeSocieteComponent,
        DeclarationCnssCreateSocieteComponent,
        DeclarationCnssListSocieteComponent,
        DeclarationCnssViewSocieteComponent,
        DeclarationCnssEditSocieteComponent,
        DeclarationCnssSocieteComponent,
        EtatDeclarationTvaCreateSocieteComponent,
        EtatDeclarationTvaListSocieteComponent,
        EtatDeclarationTvaViewSocieteComponent,
        EtatDeclarationTvaEditSocieteComponent,
        EtatDeclarationTvaSocieteComponent,
        PaiementDeclarationTvaCreateSocieteComponent,
        PaiementDeclarationTvaListSocieteComponent,
        PaiementDeclarationTvaViewSocieteComponent,
        PaiementDeclarationTvaEditSocieteComponent,
        PaiementDeclarationTvaSocieteComponent,
        PrelevementSocialEmployeCreateSocieteComponent,
        PrelevementSocialEmployeListSocieteComponent,
        PrelevementSocialEmployeViewSocieteComponent,
        PrelevementSocialEmployeEditSocieteComponent,
        PrelevementSocialEmployeSocieteComponent,
        FactureCreateSocieteComponent,
        FactureListSocieteComponent,
        FactureViewSocieteComponent,
        FactureEditSocieteComponent,
        FactureSocieteComponent,
        EtatFactureCreateSocieteComponent,
        EtatFactureListSocieteComponent,
        EtatFactureViewSocieteComponent,
        EtatFactureEditSocieteComponent,
        EtatFactureSocieteComponent,
        EtatDeclarationIsCreateSocieteComponent,
        EtatDeclarationIsListSocieteComponent,
        EtatDeclarationIsViewSocieteComponent,
        EtatDeclarationIsEditSocieteComponent,
        EtatDeclarationIsSocieteComponent,
        CompteComptableCreateSocieteComponent,
        CompteComptableListSocieteComponent,
        CompteComptableViewSocieteComponent,
        CompteComptableEditSocieteComponent,
        CompteComptableSocieteComponent,
        PrelevementSocialCreateSocieteComponent,
        PrelevementSocialListSocieteComponent,
        PrelevementSocialViewSocieteComponent,
        PrelevementSocialEditSocieteComponent,
        PrelevementSocialSocieteComponent,
        ChercheurCreateSocieteComponent,
        ChercheurListSocieteComponent,
        ChercheurViewSocieteComponent,
        ChercheurEditSocieteComponent,
        ChercheurSocieteComponent,
        SousClasseComptableCreateSocieteComponent,
        SousClasseComptableListSocieteComponent,
        SousClasseComptableViewSocieteComponent,
        SousClasseComptableEditSocieteComponent,
        SousClasseComptableSocieteComponent,
        SocieteCreateSocieteComponent,
        SocieteListSocieteComponent,
        SocieteViewSocieteComponent,
        SocieteEditSocieteComponent,
        SocieteSocieteComponent,
        ComptableCreateSocieteComponent,
        ComptableListSocieteComponent,
        ComptableViewSocieteComponent,
        ComptableEditSocieteComponent,
        ComptableSocieteComponent,
        TauxIrCreateSocieteComponent,
        TauxIrListSocieteComponent,
        TauxIrViewSocieteComponent,
        TauxIrEditSocieteComponent,
        TauxIrSocieteComponent,
        FacturePieceJointeCreateSocieteComponent,
        FacturePieceJointeListSocieteComponent,
        FacturePieceJointeViewSocieteComponent,
        FacturePieceJointeEditSocieteComponent,
        FacturePieceJointeSocieteComponent,
        EtatDemandeCreateSocieteComponent,
        EtatDemandeListSocieteComponent,
        EtatDemandeViewSocieteComponent,
        EtatDemandeEditSocieteComponent,
        EtatDemandeSocieteComponent,
        TypeEmployeCreateSocieteComponent,
        TypeEmployeListSocieteComponent,
        TypeEmployeViewSocieteComponent,
        TypeEmployeEditSocieteComponent,
        TypeEmployeSocieteComponent,
        TauxIsCreateSocieteComponent,
        TauxIsListSocieteComponent,
        TauxIsViewSocieteComponent,
        TauxIsEditSocieteComponent,
        TauxIsSocieteComponent,
        ClasseComptableCreateSocieteComponent,
        ClasseComptableListSocieteComponent,
        ClasseComptableViewSocieteComponent,
        ClasseComptableEditSocieteComponent,
        ClasseComptableSocieteComponent,
        AcompteCreateSocieteComponent,
        AcompteListSocieteComponent,
        AcompteViewSocieteComponent,
        AcompteEditSocieteComponent,
        AcompteSocieteComponent,
        DemandeCreateSocieteComponent,
        DemandeListSocieteComponent,
        DemandeViewSocieteComponent,
        DemandeEditSocieteComponent,
        DemandeSocieteComponent,
        EtatDeclarationIrCreateSocieteComponent,
        EtatDeclarationIrListSocieteComponent,
        EtatDeclarationIrViewSocieteComponent,
        EtatDeclarationIrEditSocieteComponent,
        EtatDeclarationIrSocieteComponent,
        TauxCnssCreateSocieteComponent,
        TauxCnssListSocieteComponent,
        TauxCnssViewSocieteComponent,
        TauxCnssEditSocieteComponent,
        TauxCnssSocieteComponent,
    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
        RippleModule,
        FileUploadModule
    ],
    exports: [
        TauxIsConfigCreateSocieteComponent,
        TauxIsConfigListSocieteComponent,
        TauxIsConfigViewSocieteComponent,
        TauxIsConfigEditSocieteComponent,
        TauxIsConfigSocieteComponent,
        EtatPaiementCreateSocieteComponent,
        EtatPaiementListSocieteComponent,
        EtatPaiementViewSocieteComponent,
        EtatPaiementEditSocieteComponent,
        EtatPaiementSocieteComponent,
        TypeOperationFactureCreateSocieteComponent,
        TypeOperationFactureListSocieteComponent,
        TypeOperationFactureViewSocieteComponent,
        TypeOperationFactureEditSocieteComponent,
        TypeOperationFactureSocieteComponent,
        CpcFactureCreateSocieteComponent,
        CpcFactureListSocieteComponent,
        CpcFactureViewSocieteComponent,
        CpcFactureEditSocieteComponent,
        CpcFactureSocieteComponent,
        DeclarationIsCreateSocieteComponent,
        DeclarationIsListSocieteComponent,
        DeclarationIsViewSocieteComponent,
        DeclarationIsEditSocieteComponent,
        DeclarationIsSocieteComponent,
        DeclarationIrEmployeCreateSocieteComponent,
        DeclarationIrEmployeListSocieteComponent,
        DeclarationIrEmployeViewSocieteComponent,
        DeclarationIrEmployeEditSocieteComponent,
        DeclarationIrEmployeSocieteComponent,
        PresidentSocieteCreateSocieteComponent,
        PresidentSocieteListSocieteComponent,
        PresidentSocieteViewSocieteComponent,
        PresidentSocieteEditSocieteComponent,
        PresidentSocieteSocieteComponent,
        DeclarationTvaCreateSocieteComponent,
        DeclarationTvaListSocieteComponent,
        DeclarationTvaViewSocieteComponent,
        DeclarationTvaEditSocieteComponent,
        DeclarationTvaSocieteComponent,
        CpcCreateSocieteComponent,
        CpcListSocieteComponent,
        CpcViewSocieteComponent,
        CpcEditSocieteComponent,
        CpcSocieteComponent,
        TypeSocieteCreateSocieteComponent,
        TypeSocieteListSocieteComponent,
        TypeSocieteViewSocieteComponent,
        TypeSocieteEditSocieteComponent,
        TypeSocieteSocieteComponent,
        CommentaireCreateSocieteComponent,
        CommentaireListSocieteComponent,
        CommentaireViewSocieteComponent,
        CommentaireEditSocieteComponent,
        CommentaireSocieteComponent,
        DeclarationCnssDetailCreateSocieteComponent,
        DeclarationCnssDetailListSocieteComponent,
        DeclarationCnssDetailViewSocieteComponent,
        DeclarationCnssDetailEditSocieteComponent,
        DeclarationCnssDetailSocieteComponent,
        TypeComptableCreateSocieteComponent,
        TypeComptableListSocieteComponent,
        TypeComptableViewSocieteComponent,
        TypeComptableEditSocieteComponent,
        TypeComptableSocieteComponent,
        PaiementDeclarationIsCreateSocieteComponent,
        PaiementDeclarationIsListSocieteComponent,
        PaiementDeclarationIsViewSocieteComponent,
        PaiementDeclarationIsEditSocieteComponent,
        PaiementDeclarationIsSocieteComponent,
        TypeDeclarationTvaCreateSocieteComponent,
        TypeDeclarationTvaListSocieteComponent,
        TypeDeclarationTvaViewSocieteComponent,
        TypeDeclarationTvaEditSocieteComponent,
        TypeDeclarationTvaSocieteComponent,
        TvaCreateSocieteComponent,
        TvaListSocieteComponent,
        TvaViewSocieteComponent,
        TvaEditSocieteComponent,
        TvaSocieteComponent,
        PaiementDeclarationIrCreateSocieteComponent,
        PaiementDeclarationIrListSocieteComponent,
        PaiementDeclarationIrViewSocieteComponent,
        PaiementDeclarationIrEditSocieteComponent,
        PaiementDeclarationIrSocieteComponent,
        DemandePieceJointeCreateSocieteComponent,
        DemandePieceJointeListSocieteComponent,
        DemandePieceJointeViewSocieteComponent,
        DemandePieceJointeEditSocieteComponent,
        DemandePieceJointeSocieteComponent,
        TypeTauxCnssCreateSocieteComponent,
        TypeTauxCnssListSocieteComponent,
        TypeTauxCnssViewSocieteComponent,
        TypeTauxCnssEditSocieteComponent,
        TypeTauxCnssSocieteComponent,
        DeclarationIrCreateSocieteComponent,
        DeclarationIrListSocieteComponent,
        DeclarationIrViewSocieteComponent,
        DeclarationIrEditSocieteComponent,
        DeclarationIrSocieteComponent,
        EmployeCreateSocieteComponent,
        EmployeListSocieteComponent,
        EmployeViewSocieteComponent,
        EmployeEditSocieteComponent,
        EmployeSocieteComponent,
        DeclarationCnssCreateSocieteComponent,
        DeclarationCnssListSocieteComponent,
        DeclarationCnssViewSocieteComponent,
        DeclarationCnssEditSocieteComponent,
        DeclarationCnssSocieteComponent,
        EtatDeclarationTvaCreateSocieteComponent,
        EtatDeclarationTvaListSocieteComponent,
        EtatDeclarationTvaViewSocieteComponent,
        EtatDeclarationTvaEditSocieteComponent,
        EtatDeclarationTvaSocieteComponent,
        PaiementDeclarationTvaCreateSocieteComponent,
        PaiementDeclarationTvaListSocieteComponent,
        PaiementDeclarationTvaViewSocieteComponent,
        PaiementDeclarationTvaEditSocieteComponent,
        PaiementDeclarationTvaSocieteComponent,
        PrelevementSocialEmployeCreateSocieteComponent,
        PrelevementSocialEmployeListSocieteComponent,
        PrelevementSocialEmployeViewSocieteComponent,
        PrelevementSocialEmployeEditSocieteComponent,
        PrelevementSocialEmployeSocieteComponent,
        FactureCreateSocieteComponent,
        FactureListSocieteComponent,
        FactureViewSocieteComponent,
        FactureEditSocieteComponent,
        FactureSocieteComponent,
        EtatFactureCreateSocieteComponent,
        EtatFactureListSocieteComponent,
        EtatFactureViewSocieteComponent,
        EtatFactureEditSocieteComponent,
        EtatFactureSocieteComponent,
        EtatDeclarationIsCreateSocieteComponent,
        EtatDeclarationIsListSocieteComponent,
        EtatDeclarationIsViewSocieteComponent,
        EtatDeclarationIsEditSocieteComponent,
        EtatDeclarationIsSocieteComponent,
        CompteComptableCreateSocieteComponent,
        CompteComptableListSocieteComponent,
        CompteComptableViewSocieteComponent,
        CompteComptableEditSocieteComponent,
        CompteComptableSocieteComponent,
        PrelevementSocialCreateSocieteComponent,
        PrelevementSocialListSocieteComponent,
        PrelevementSocialViewSocieteComponent,
        PrelevementSocialEditSocieteComponent,
        PrelevementSocialSocieteComponent,
        ChercheurCreateSocieteComponent,
        ChercheurListSocieteComponent,
        ChercheurViewSocieteComponent,
        ChercheurEditSocieteComponent,
        ChercheurSocieteComponent,
        SousClasseComptableCreateSocieteComponent,
        SousClasseComptableListSocieteComponent,
        SousClasseComptableViewSocieteComponent,
        SousClasseComptableEditSocieteComponent,
        SousClasseComptableSocieteComponent,
        SocieteCreateSocieteComponent,
        SocieteListSocieteComponent,
        SocieteViewSocieteComponent,
        SocieteEditSocieteComponent,
        SocieteSocieteComponent,
        ComptableCreateSocieteComponent,
        ComptableListSocieteComponent,
        ComptableViewSocieteComponent,
        ComptableEditSocieteComponent,
        ComptableSocieteComponent,
        TauxIrCreateSocieteComponent,
        TauxIrListSocieteComponent,
        TauxIrViewSocieteComponent,
        TauxIrEditSocieteComponent,
        TauxIrSocieteComponent,
        FacturePieceJointeCreateSocieteComponent,
        FacturePieceJointeListSocieteComponent,
        FacturePieceJointeViewSocieteComponent,
        FacturePieceJointeEditSocieteComponent,
        FacturePieceJointeSocieteComponent,
        EtatDemandeCreateSocieteComponent,
        EtatDemandeListSocieteComponent,
        EtatDemandeViewSocieteComponent,
        EtatDemandeEditSocieteComponent,
        EtatDemandeSocieteComponent,
        TypeEmployeCreateSocieteComponent,
        TypeEmployeListSocieteComponent,
        TypeEmployeViewSocieteComponent,
        TypeEmployeEditSocieteComponent,
        TypeEmployeSocieteComponent,
        TauxIsCreateSocieteComponent,
        TauxIsListSocieteComponent,
        TauxIsViewSocieteComponent,
        TauxIsEditSocieteComponent,
        TauxIsSocieteComponent,
        ClasseComptableCreateSocieteComponent,
        ClasseComptableListSocieteComponent,
        ClasseComptableViewSocieteComponent,
        ClasseComptableEditSocieteComponent,
        ClasseComptableSocieteComponent,
        AcompteCreateSocieteComponent,
        AcompteListSocieteComponent,
        AcompteViewSocieteComponent,
        AcompteEditSocieteComponent,
        AcompteSocieteComponent,
        DemandeCreateSocieteComponent,
        DemandeListSocieteComponent,
        DemandeViewSocieteComponent,
        DemandeEditSocieteComponent,
        DemandeSocieteComponent,
        EtatDeclarationIrCreateSocieteComponent,
        EtatDeclarationIrListSocieteComponent,
        EtatDeclarationIrViewSocieteComponent,
        EtatDeclarationIrEditSocieteComponent,
        EtatDeclarationIrSocieteComponent,
        TauxCnssCreateSocieteComponent,
        TauxCnssListSocieteComponent,
        TauxCnssViewSocieteComponent,
        TauxCnssEditSocieteComponent,
        TauxCnssSocieteComponent,
    ]
})
export class ImpotSocieteModule { }
