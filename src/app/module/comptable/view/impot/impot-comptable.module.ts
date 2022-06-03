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

import { TauxIsConfigCreateComptableComponent } from './taux-is-config-comptable/create-comptable/taux-is-config-create-comptable.component';
import { TauxIsConfigEditComptableComponent } from './taux-is-config-comptable/edit-comptable/taux-is-config-edit-comptable.component';
import { TauxIsConfigViewComptableComponent } from './taux-is-config-comptable/view-comptable/taux-is-config-view-comptable.component';
import { TauxIsConfigListComptableComponent } from './taux-is-config-comptable/list-comptable/taux-is-config-list-comptable.component';
import { TauxIsConfigComptableComponent } from './taux-is-config-comptable/taux-is-config-comptable.component';
import { EtatPaiementCreateComptableComponent } from './etat-paiement-comptable/create-comptable/etat-paiement-create-comptable.component';
import { EtatPaiementEditComptableComponent } from './etat-paiement-comptable/edit-comptable/etat-paiement-edit-comptable.component';
import { EtatPaiementViewComptableComponent } from './etat-paiement-comptable/view-comptable/etat-paiement-view-comptable.component';
import { EtatPaiementListComptableComponent } from './etat-paiement-comptable/list-comptable/etat-paiement-list-comptable.component';
import { EtatPaiementComptableComponent } from './etat-paiement-comptable/etat-paiement-comptable.component';
import { TypeOperationFactureCreateComptableComponent } from './type-operation-facture-comptable/create-comptable/type-operation-facture-create-comptable.component';
import { TypeOperationFactureEditComptableComponent } from './type-operation-facture-comptable/edit-comptable/type-operation-facture-edit-comptable.component';
import { TypeOperationFactureViewComptableComponent } from './type-operation-facture-comptable/view-comptable/type-operation-facture-view-comptable.component';
import { TypeOperationFactureListComptableComponent } from './type-operation-facture-comptable/list-comptable/type-operation-facture-list-comptable.component';
import { TypeOperationFactureComptableComponent } from './type-operation-facture-comptable/type-operation-facture-comptable.component';
import { CpcFactureCreateComptableComponent } from './cpc-facture-comptable/create-comptable/cpc-facture-create-comptable.component';
import { CpcFactureEditComptableComponent } from './cpc-facture-comptable/edit-comptable/cpc-facture-edit-comptable.component';
import { CpcFactureViewComptableComponent } from './cpc-facture-comptable/view-comptable/cpc-facture-view-comptable.component';
import { CpcFactureListComptableComponent } from './cpc-facture-comptable/list-comptable/cpc-facture-list-comptable.component';
import { CpcFactureComptableComponent } from './cpc-facture-comptable/cpc-facture-comptable.component';
import { DeclarationIsCreateComptableComponent } from './declaration-is-comptable/create-comptable/declaration-is-create-comptable.component';
import { DeclarationIsEditComptableComponent } from './declaration-is-comptable/edit-comptable/declaration-is-edit-comptable.component';
import { DeclarationIsViewComptableComponent } from './declaration-is-comptable/view-comptable/declaration-is-view-comptable.component';
import { DeclarationIsListComptableComponent } from './declaration-is-comptable/list-comptable/declaration-is-list-comptable.component';
import { DeclarationIsComptableComponent } from './declaration-is-comptable/declaration-is-comptable.component';
import { DeclarationIrEmployeCreateComptableComponent } from './declaration-ir-employe-comptable/create-comptable/declaration-ir-employe-create-comptable.component';
import { DeclarationIrEmployeEditComptableComponent } from './declaration-ir-employe-comptable/edit-comptable/declaration-ir-employe-edit-comptable.component';
import { DeclarationIrEmployeViewComptableComponent } from './declaration-ir-employe-comptable/view-comptable/declaration-ir-employe-view-comptable.component';
import { DeclarationIrEmployeListComptableComponent } from './declaration-ir-employe-comptable/list-comptable/declaration-ir-employe-list-comptable.component';
import { DeclarationIrEmployeComptableComponent } from './declaration-ir-employe-comptable/declaration-ir-employe-comptable.component';
import { PresidentSocieteCreateComptableComponent } from './president-societe-comptable/create-comptable/president-societe-create-comptable.component';
import { PresidentSocieteEditComptableComponent } from './president-societe-comptable/edit-comptable/president-societe-edit-comptable.component';
import { PresidentSocieteViewComptableComponent } from './president-societe-comptable/view-comptable/president-societe-view-comptable.component';
import { PresidentSocieteListComptableComponent } from './president-societe-comptable/list-comptable/president-societe-list-comptable.component';
import { PresidentSocieteComptableComponent } from './president-societe-comptable/president-societe-comptable.component';
import { DeclarationTvaCreateComptableComponent } from './declaration-tva-comptable/create-comptable/declaration-tva-create-comptable.component';
import { DeclarationTvaEditComptableComponent } from './declaration-tva-comptable/edit-comptable/declaration-tva-edit-comptable.component';
import { DeclarationTvaViewComptableComponent } from './declaration-tva-comptable/view-comptable/declaration-tva-view-comptable.component';
import { DeclarationTvaListComptableComponent } from './declaration-tva-comptable/list-comptable/declaration-tva-list-comptable.component';
import { DeclarationTvaComptableComponent } from './declaration-tva-comptable/declaration-tva-comptable.component';
import { CpcCreateComptableComponent } from './cpc-comptable/create-comptable/cpc-create-comptable.component';
import { CpcEditComptableComponent } from './cpc-comptable/edit-comptable/cpc-edit-comptable.component';
import { CpcViewComptableComponent } from './cpc-comptable/view-comptable/cpc-view-comptable.component';
import { CpcListComptableComponent } from './cpc-comptable/list-comptable/cpc-list-comptable.component';
import { CpcComptableComponent } from './cpc-comptable/cpc-comptable.component';
import { TypeSocieteCreateComptableComponent } from './type-societe-comptable/create-comptable/type-societe-create-comptable.component';
import { TypeSocieteEditComptableComponent } from './type-societe-comptable/edit-comptable/type-societe-edit-comptable.component';
import { TypeSocieteViewComptableComponent } from './type-societe-comptable/view-comptable/type-societe-view-comptable.component';
import { TypeSocieteListComptableComponent } from './type-societe-comptable/list-comptable/type-societe-list-comptable.component';
import { TypeSocieteComptableComponent } from './type-societe-comptable/type-societe-comptable.component';
import { CommentaireCreateComptableComponent } from './commentaire-comptable/create-comptable/commentaire-create-comptable.component';
import { CommentaireEditComptableComponent } from './commentaire-comptable/edit-comptable/commentaire-edit-comptable.component';
import { CommentaireViewComptableComponent } from './commentaire-comptable/view-comptable/commentaire-view-comptable.component';
import { CommentaireListComptableComponent } from './commentaire-comptable/list-comptable/commentaire-list-comptable.component';
import { CommentaireComptableComponent } from './commentaire-comptable/commentaire-comptable.component';
import { DeclarationCnssDetailCreateComptableComponent } from './declaration-cnss-detail-comptable/create-comptable/declaration-cnss-detail-create-comptable.component';
import { DeclarationCnssDetailEditComptableComponent } from './declaration-cnss-detail-comptable/edit-comptable/declaration-cnss-detail-edit-comptable.component';
import { DeclarationCnssDetailViewComptableComponent } from './declaration-cnss-detail-comptable/view-comptable/declaration-cnss-detail-view-comptable.component';
import { DeclarationCnssDetailListComptableComponent } from './declaration-cnss-detail-comptable/list-comptable/declaration-cnss-detail-list-comptable.component';
import { DeclarationCnssDetailComptableComponent } from './declaration-cnss-detail-comptable/declaration-cnss-detail-comptable.component';
import { TypeComptableCreateComptableComponent } from './type-comptable-comptable/create-comptable/type-comptable-create-comptable.component';
import { TypeComptableEditComptableComponent } from './type-comptable-comptable/edit-comptable/type-comptable-edit-comptable.component';
import { TypeComptableViewComptableComponent } from './type-comptable-comptable/view-comptable/type-comptable-view-comptable.component';
import { TypeComptableListComptableComponent } from './type-comptable-comptable/list-comptable/type-comptable-list-comptable.component';
import { TypeComptableComptableComponent } from './type-comptable-comptable/type-comptable-comptable.component';
import { PaiementDeclarationIsCreateComptableComponent } from './paiement-declaration-is-comptable/create-comptable/paiement-declaration-is-create-comptable.component';
import { PaiementDeclarationIsEditComptableComponent } from './paiement-declaration-is-comptable/edit-comptable/paiement-declaration-is-edit-comptable.component';
import { PaiementDeclarationIsViewComptableComponent } from './paiement-declaration-is-comptable/view-comptable/paiement-declaration-is-view-comptable.component';
import { PaiementDeclarationIsListComptableComponent } from './paiement-declaration-is-comptable/list-comptable/paiement-declaration-is-list-comptable.component';
import { PaiementDeclarationIsComptableComponent } from './paiement-declaration-is-comptable/paiement-declaration-is-comptable.component';
import { TypeDeclarationTvaCreateComptableComponent } from './type-declaration-tva-comptable/create-comptable/type-declaration-tva-create-comptable.component';
import { TypeDeclarationTvaEditComptableComponent } from './type-declaration-tva-comptable/edit-comptable/type-declaration-tva-edit-comptable.component';
import { TypeDeclarationTvaViewComptableComponent } from './type-declaration-tva-comptable/view-comptable/type-declaration-tva-view-comptable.component';
import { TypeDeclarationTvaListComptableComponent } from './type-declaration-tva-comptable/list-comptable/type-declaration-tva-list-comptable.component';
import { TypeDeclarationTvaComptableComponent } from './type-declaration-tva-comptable/type-declaration-tva-comptable.component';
import { TvaCreateComptableComponent } from './tva-comptable/create-comptable/tva-create-comptable.component';
import { TvaEditComptableComponent } from './tva-comptable/edit-comptable/tva-edit-comptable.component';
import { TvaViewComptableComponent } from './tva-comptable/view-comptable/tva-view-comptable.component';
import { TvaListComptableComponent } from './tva-comptable/list-comptable/tva-list-comptable.component';
import { TvaComptableComponent } from './tva-comptable/tva-comptable.component';
import { PaiementDeclarationIrCreateComptableComponent } from './paiement-declaration-ir-comptable/create-comptable/paiement-declaration-ir-create-comptable.component';
import { PaiementDeclarationIrEditComptableComponent } from './paiement-declaration-ir-comptable/edit-comptable/paiement-declaration-ir-edit-comptable.component';
import { PaiementDeclarationIrViewComptableComponent } from './paiement-declaration-ir-comptable/view-comptable/paiement-declaration-ir-view-comptable.component';
import { PaiementDeclarationIrListComptableComponent } from './paiement-declaration-ir-comptable/list-comptable/paiement-declaration-ir-list-comptable.component';
import { PaiementDeclarationIrComptableComponent } from './paiement-declaration-ir-comptable/paiement-declaration-ir-comptable.component';
import { DemandePieceJointeCreateComptableComponent } from './demande-piece-jointe-comptable/create-comptable/demande-piece-jointe-create-comptable.component';
import { DemandePieceJointeEditComptableComponent } from './demande-piece-jointe-comptable/edit-comptable/demande-piece-jointe-edit-comptable.component';
import { DemandePieceJointeViewComptableComponent } from './demande-piece-jointe-comptable/view-comptable/demande-piece-jointe-view-comptable.component';
import { DemandePieceJointeListComptableComponent } from './demande-piece-jointe-comptable/list-comptable/demande-piece-jointe-list-comptable.component';
import { DemandePieceJointeComptableComponent } from './demande-piece-jointe-comptable/demande-piece-jointe-comptable.component';
import { TypeTauxCnssCreateComptableComponent } from './type-taux-cnss-comptable/create-comptable/type-taux-cnss-create-comptable.component';
import { TypeTauxCnssEditComptableComponent } from './type-taux-cnss-comptable/edit-comptable/type-taux-cnss-edit-comptable.component';
import { TypeTauxCnssViewComptableComponent } from './type-taux-cnss-comptable/view-comptable/type-taux-cnss-view-comptable.component';
import { TypeTauxCnssListComptableComponent } from './type-taux-cnss-comptable/list-comptable/type-taux-cnss-list-comptable.component';
import { TypeTauxCnssComptableComponent } from './type-taux-cnss-comptable/type-taux-cnss-comptable.component';
import { DeclarationIrCreateComptableComponent } from './declaration-ir-comptable/create-comptable/declaration-ir-create-comptable.component';
import { DeclarationIrEditComptableComponent } from './declaration-ir-comptable/edit-comptable/declaration-ir-edit-comptable.component';
import { DeclarationIrViewComptableComponent } from './declaration-ir-comptable/view-comptable/declaration-ir-view-comptable.component';
import { DeclarationIrListComptableComponent } from './declaration-ir-comptable/list-comptable/declaration-ir-list-comptable.component';
import { DeclarationIrComptableComponent } from './declaration-ir-comptable/declaration-ir-comptable.component';
import { EmployeCreateComptableComponent } from './employe-comptable/create-comptable/employe-create-comptable.component';
import { EmployeEditComptableComponent } from './employe-comptable/edit-comptable/employe-edit-comptable.component';
import { EmployeViewComptableComponent } from './employe-comptable/view-comptable/employe-view-comptable.component';
import { EmployeListComptableComponent } from './employe-comptable/list-comptable/employe-list-comptable.component';
import { EmployeComptableComponent } from './employe-comptable/employe-comptable.component';
import { DeclarationCnssCreateComptableComponent } from './declaration-cnss-comptable/create-comptable/declaration-cnss-create-comptable.component';
import { DeclarationCnssEditComptableComponent } from './declaration-cnss-comptable/edit-comptable/declaration-cnss-edit-comptable.component';
import { DeclarationCnssViewComptableComponent } from './declaration-cnss-comptable/view-comptable/declaration-cnss-view-comptable.component';
import { DeclarationCnssListComptableComponent } from './declaration-cnss-comptable/list-comptable/declaration-cnss-list-comptable.component';
import { DeclarationCnssComptableComponent } from './declaration-cnss-comptable/declaration-cnss-comptable.component';
import { EtatDeclarationTvaCreateComptableComponent } from './etat-declaration-tva-comptable/create-comptable/etat-declaration-tva-create-comptable.component';
import { EtatDeclarationTvaEditComptableComponent } from './etat-declaration-tva-comptable/edit-comptable/etat-declaration-tva-edit-comptable.component';
import { EtatDeclarationTvaViewComptableComponent } from './etat-declaration-tva-comptable/view-comptable/etat-declaration-tva-view-comptable.component';
import { EtatDeclarationTvaListComptableComponent } from './etat-declaration-tva-comptable/list-comptable/etat-declaration-tva-list-comptable.component';
import { EtatDeclarationTvaComptableComponent } from './etat-declaration-tva-comptable/etat-declaration-tva-comptable.component';
import { PaiementDeclarationTvaCreateComptableComponent } from './paiement-declaration-tva-comptable/create-comptable/paiement-declaration-tva-create-comptable.component';
import { PaiementDeclarationTvaEditComptableComponent } from './paiement-declaration-tva-comptable/edit-comptable/paiement-declaration-tva-edit-comptable.component';
import { PaiementDeclarationTvaViewComptableComponent } from './paiement-declaration-tva-comptable/view-comptable/paiement-declaration-tva-view-comptable.component';
import { PaiementDeclarationTvaListComptableComponent } from './paiement-declaration-tva-comptable/list-comptable/paiement-declaration-tva-list-comptable.component';
import { PaiementDeclarationTvaComptableComponent } from './paiement-declaration-tva-comptable/paiement-declaration-tva-comptable.component';
import { PrelevementSocialEmployeCreateComptableComponent } from './prelevement-social-employe-comptable/create-comptable/prelevement-social-employe-create-comptable.component';
import { PrelevementSocialEmployeEditComptableComponent } from './prelevement-social-employe-comptable/edit-comptable/prelevement-social-employe-edit-comptable.component';
import { PrelevementSocialEmployeViewComptableComponent } from './prelevement-social-employe-comptable/view-comptable/prelevement-social-employe-view-comptable.component';
import { PrelevementSocialEmployeListComptableComponent } from './prelevement-social-employe-comptable/list-comptable/prelevement-social-employe-list-comptable.component';
import { PrelevementSocialEmployeComptableComponent } from './prelevement-social-employe-comptable/prelevement-social-employe-comptable.component';
import { FactureCreateComptableComponent } from './facture-comptable/create-comptable/facture-create-comptable.component';
import { FactureEditComptableComponent } from './facture-comptable/edit-comptable/facture-edit-comptable.component';
import { FactureViewComptableComponent } from './facture-comptable/view-comptable/facture-view-comptable.component';
import { FactureListComptableComponent } from './facture-comptable/list-comptable/facture-list-comptable.component';
import { FactureComptableComponent } from './facture-comptable/facture-comptable.component';
import { EtatFactureCreateComptableComponent } from './etat-facture-comptable/create-comptable/etat-facture-create-comptable.component';
import { EtatFactureEditComptableComponent } from './etat-facture-comptable/edit-comptable/etat-facture-edit-comptable.component';
import { EtatFactureViewComptableComponent } from './etat-facture-comptable/view-comptable/etat-facture-view-comptable.component';
import { EtatFactureListComptableComponent } from './etat-facture-comptable/list-comptable/etat-facture-list-comptable.component';
import { EtatFactureComptableComponent } from './etat-facture-comptable/etat-facture-comptable.component';
import { EtatDeclarationIsCreateComptableComponent } from './etat-declaration-is-comptable/create-comptable/etat-declaration-is-create-comptable.component';
import { EtatDeclarationIsEditComptableComponent } from './etat-declaration-is-comptable/edit-comptable/etat-declaration-is-edit-comptable.component';
import { EtatDeclarationIsViewComptableComponent } from './etat-declaration-is-comptable/view-comptable/etat-declaration-is-view-comptable.component';
import { EtatDeclarationIsListComptableComponent } from './etat-declaration-is-comptable/list-comptable/etat-declaration-is-list-comptable.component';
import { EtatDeclarationIsComptableComponent } from './etat-declaration-is-comptable/etat-declaration-is-comptable.component';
import { CompteComptableCreateComptableComponent } from './compte-comptable-comptable/create-comptable/compte-comptable-create-comptable.component';
import { CompteComptableEditComptableComponent } from './compte-comptable-comptable/edit-comptable/compte-comptable-edit-comptable.component';
import { CompteComptableViewComptableComponent } from './compte-comptable-comptable/view-comptable/compte-comptable-view-comptable.component';
import { CompteComptableListComptableComponent } from './compte-comptable-comptable/list-comptable/compte-comptable-list-comptable.component';
import { CompteComptableComptableComponent } from './compte-comptable-comptable/compte-comptable-comptable.component';
import {PrelevementSocialCreateComptableComponent } from './prelevement-social-comptable/create-comptable/prelevement-social-create-comptable.component';
import { PrelevementSocialEditComptableComponent } from './prelevement-social-comptable/edit-comptable/prelevement-social-edit-comptable.component';
import { PrelevementSocialViewComptableComponent } from './prelevement-social-comptable/view-comptable/prelevement-social-view-comptable.component';
import { PrelevementSocialListComptableComponent } from './prelevement-social-comptable/list-comptable/prelevement-social-list-comptable.component';
import { PrelevementSocialComptableComponent } from './prelevement-social-comptable/prelevement-social-comptable.component';
import { ChercheurCreateComptableComponent } from './chercheur-comptable/create-comptable/chercheur-create-comptable.component';
import { ChercheurEditComptableComponent } from './chercheur-comptable/edit-comptable/chercheur-edit-comptable.component';
import { ChercheurViewComptableComponent } from './chercheur-comptable/view-comptable/chercheur-view-comptable.component';
import { ChercheurListComptableComponent } from './chercheur-comptable/list-comptable/chercheur-list-comptable.component';
import { ChercheurComptableComponent } from './chercheur-comptable/chercheur-comptable.component';
import { SousClasseComptableCreateComptableComponent } from './sous-classe-comptable-comptable/create-comptable/sous-classe-comptable-create-comptable.component';
import { SousClasseComptableEditComptableComponent } from './sous-classe-comptable-comptable/edit-comptable/sous-classe-comptable-edit-comptable.component';
import { SousClasseComptableViewComptableComponent } from './sous-classe-comptable-comptable/view-comptable/sous-classe-comptable-view-comptable.component';
import { SousClasseComptableListComptableComponent } from './sous-classe-comptable-comptable/list-comptable/sous-classe-comptable-list-comptable.component';
import { SousClasseComptableComptableComponent } from './sous-classe-comptable-comptable/sous-classe-comptable-comptable.component';
import { SocieteCreateComptableComponent } from './societe-comptable/create-comptable/societe-create-comptable.component';
import { SocieteEditComptableComponent } from './societe-comptable/edit-comptable/societe-edit-comptable.component';
import { SocieteViewComptableComponent } from './societe-comptable/view-comptable/societe-view-comptable.component';
import { SocieteListComptableComponent } from './societe-comptable/list-comptable/societe-list-comptable.component';
import { SocieteComptableComponent } from './societe-comptable/societe-comptable.component';
import { ComptableCreateComptableComponent } from './comptable-comptable/create-comptable/comptable-create-comptable.component';
import { ComptableEditComptableComponent } from './comptable-comptable/edit-comptable/comptable-edit-comptable.component';
import { ComptableViewComptableComponent } from './comptable-comptable/view-comptable/comptable-view-comptable.component';
import { ComptableListComptableComponent } from './comptable-comptable/list-comptable/comptable-list-comptable.component';
import { ComptableComptableComponent } from './comptable-comptable/comptable-comptable.component';
import { TauxIrCreateComptableComponent } from './taux-ir-comptable/create-comptable/taux-ir-create-comptable.component';
import { TauxIrEditComptableComponent } from './taux-ir-comptable/edit-comptable/taux-ir-edit-comptable.component';
import { TauxIrViewComptableComponent } from './taux-ir-comptable/view-comptable/taux-ir-view-comptable.component';
import { TauxIrListComptableComponent } from './taux-ir-comptable/list-comptable/taux-ir-list-comptable.component';
import { TauxIrComptableComponent } from './taux-ir-comptable/taux-ir-comptable.component';
import { FacturePieceJointeCreateComptableComponent } from './facture-piece-jointe-comptable/create-comptable/facture-piece-jointe-create-comptable.component';
import { FacturePieceJointeEditComptableComponent } from './facture-piece-jointe-comptable/edit-comptable/facture-piece-jointe-edit-comptable.component';
import { FacturePieceJointeViewComptableComponent } from './facture-piece-jointe-comptable/view-comptable/facture-piece-jointe-view-comptable.component';
import { FacturePieceJointeListComptableComponent } from './facture-piece-jointe-comptable/list-comptable/facture-piece-jointe-list-comptable.component';
import { FacturePieceJointeComptableComponent } from './facture-piece-jointe-comptable/facture-piece-jointe-comptable.component';
import { EtatDemandeCreateComptableComponent } from './etat-demande-comptable/create-comptable/etat-demande-create-comptable.component';
import { EtatDemandeEditComptableComponent } from './etat-demande-comptable/edit-comptable/etat-demande-edit-comptable.component';
import { EtatDemandeViewComptableComponent } from './etat-demande-comptable/view-comptable/etat-demande-view-comptable.component';
import { EtatDemandeListComptableComponent } from './etat-demande-comptable/list-comptable/etat-demande-list-comptable.component';
import { EtatDemandeComptableComponent } from './etat-demande-comptable/etat-demande-comptable.component';
import { TypeEmployeCreateComptableComponent } from './type-employe-comptable/create-comptable/type-employe-create-comptable.component';
import { TypeEmployeEditComptableComponent } from './type-employe-comptable/edit-comptable/type-employe-edit-comptable.component';
import { TypeEmployeViewComptableComponent } from './type-employe-comptable/view-comptable/type-employe-view-comptable.component';
import { TypeEmployeListComptableComponent } from './type-employe-comptable/list-comptable/type-employe-list-comptable.component';
import { TypeEmployeComptableComponent } from './type-employe-comptable/type-employe-comptable.component';
import { TauxIsCreateComptableComponent } from './taux-is-comptable/create-comptable/taux-is-create-comptable.component';
import { TauxIsEditComptableComponent } from './taux-is-comptable/edit-comptable/taux-is-edit-comptable.component';
import { TauxIsViewComptableComponent } from './taux-is-comptable/view-comptable/taux-is-view-comptable.component';
import { TauxIsListComptableComponent } from './taux-is-comptable/list-comptable/taux-is-list-comptable.component';
import { TauxIsComptableComponent } from './taux-is-comptable/taux-is-comptable.component';
import { ClasseComptableCreateComptableComponent } from './classe-comptable-comptable/create-comptable/classe-comptable-create-comptable.component';
import { ClasseComptableEditComptableComponent } from './classe-comptable-comptable/edit-comptable/classe-comptable-edit-comptable.component';
import { ClasseComptableViewComptableComponent } from './classe-comptable-comptable/view-comptable/classe-comptable-view-comptable.component';
import { ClasseComptableListComptableComponent } from './classe-comptable-comptable/list-comptable/classe-comptable-list-comptable.component';
import { ClasseComptableComptableComponent } from './classe-comptable-comptable/classe-comptable-comptable.component';
import { AcompteCreateComptableComponent } from './acompte-comptable/create-comptable/acompte-create-comptable.component';
import { AcompteEditComptableComponent } from './acompte-comptable/edit-comptable/acompte-edit-comptable.component';
import { AcompteViewComptableComponent } from './acompte-comptable/view-comptable/acompte-view-comptable.component';
import { AcompteListComptableComponent } from './acompte-comptable/list-comptable/acompte-list-comptable.component';
import { AcompteComptableComponent } from './acompte-comptable/acompte-comptable.component';
import { DemandeCreateComptableComponent } from './demande-comptable/create-comptable/demande-create-comptable.component';
import { DemandeEditComptableComponent } from './demande-comptable/edit-comptable/demande-edit-comptable.component';
import { DemandeViewComptableComponent } from './demande-comptable/view-comptable/demande-view-comptable.component';
import { DemandeListComptableComponent } from './demande-comptable/list-comptable/demande-list-comptable.component';
import { DemandeComptableComponent } from './demande-comptable/demande-comptable.component';
import { EtatDeclarationIrCreateComptableComponent } from './etat-declaration-ir-comptable/create-comptable/etat-declaration-ir-create-comptable.component';
import { EtatDeclarationIrEditComptableComponent } from './etat-declaration-ir-comptable/edit-comptable/etat-declaration-ir-edit-comptable.component';
import { EtatDeclarationIrViewComptableComponent } from './etat-declaration-ir-comptable/view-comptable/etat-declaration-ir-view-comptable.component';
import { EtatDeclarationIrListComptableComponent } from './etat-declaration-ir-comptable/list-comptable/etat-declaration-ir-list-comptable.component';
import { EtatDeclarationIrComptableComponent } from './etat-declaration-ir-comptable/etat-declaration-ir-comptable.component';
import { TauxCnssCreateComptableComponent } from './taux-cnss-comptable/create-comptable/taux-cnss-create-comptable.component';
import { TauxCnssEditComptableComponent } from './taux-cnss-comptable/edit-comptable/taux-cnss-edit-comptable.component';
import { TauxCnssViewComptableComponent } from './taux-cnss-comptable/view-comptable/taux-cnss-view-comptable.component';
import { TauxCnssListComptableComponent } from './taux-cnss-comptable/list-comptable/taux-cnss-list-comptable.component';
import { TauxCnssComptableComponent } from './taux-cnss-comptable/taux-cnss-comptable.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
    declarations: [
        TauxIsConfigCreateComptableComponent,
        TauxIsConfigListComptableComponent,
        TauxIsConfigViewComptableComponent,
        TauxIsConfigEditComptableComponent,
        TauxIsConfigComptableComponent,
        EtatPaiementCreateComptableComponent,
        EtatPaiementListComptableComponent,
        EtatPaiementViewComptableComponent,
        EtatPaiementEditComptableComponent,
        EtatPaiementComptableComponent,
        TypeOperationFactureCreateComptableComponent,
        TypeOperationFactureListComptableComponent,
        TypeOperationFactureViewComptableComponent,
        TypeOperationFactureEditComptableComponent,
        TypeOperationFactureComptableComponent,
        CpcFactureCreateComptableComponent,
        CpcFactureListComptableComponent,
        CpcFactureViewComptableComponent,
        CpcFactureEditComptableComponent,
        CpcFactureComptableComponent,
        DeclarationIsCreateComptableComponent,
        DeclarationIsListComptableComponent,
        DeclarationIsViewComptableComponent,
        DeclarationIsEditComptableComponent,
        DeclarationIsComptableComponent,
        DeclarationIrEmployeCreateComptableComponent,
        DeclarationIrEmployeListComptableComponent,
        DeclarationIrEmployeViewComptableComponent,
        DeclarationIrEmployeEditComptableComponent,
        DeclarationIrEmployeComptableComponent,
        PresidentSocieteCreateComptableComponent,
        PresidentSocieteListComptableComponent,
        PresidentSocieteViewComptableComponent,
        PresidentSocieteEditComptableComponent,
        PresidentSocieteComptableComponent,
        DeclarationTvaCreateComptableComponent,
        DeclarationTvaListComptableComponent,
        DeclarationTvaViewComptableComponent,
        DeclarationTvaEditComptableComponent,
        DeclarationTvaComptableComponent,
        CpcCreateComptableComponent,
        CpcListComptableComponent,
        CpcViewComptableComponent,
        CpcEditComptableComponent,
        CpcComptableComponent,
        TypeSocieteCreateComptableComponent,
        TypeSocieteListComptableComponent,
        TypeSocieteViewComptableComponent,
        TypeSocieteEditComptableComponent,
        TypeSocieteComptableComponent,
        CommentaireCreateComptableComponent,
        CommentaireListComptableComponent,
        CommentaireViewComptableComponent,
        CommentaireEditComptableComponent,
        CommentaireComptableComponent,
        DeclarationCnssDetailCreateComptableComponent,
        DeclarationCnssDetailListComptableComponent,
        DeclarationCnssDetailViewComptableComponent,
        DeclarationCnssDetailEditComptableComponent,
        DeclarationCnssDetailComptableComponent,
        TypeComptableCreateComptableComponent,
        TypeComptableListComptableComponent,
        TypeComptableViewComptableComponent,
        TypeComptableEditComptableComponent,
        TypeComptableComptableComponent,
        PaiementDeclarationIsCreateComptableComponent,
        PaiementDeclarationIsListComptableComponent,
        PaiementDeclarationIsViewComptableComponent,
        PaiementDeclarationIsEditComptableComponent,
        PaiementDeclarationIsComptableComponent,
        TypeDeclarationTvaCreateComptableComponent,
        TypeDeclarationTvaListComptableComponent,
        TypeDeclarationTvaViewComptableComponent,
        TypeDeclarationTvaEditComptableComponent,
        TypeDeclarationTvaComptableComponent,
        TvaCreateComptableComponent,
        TvaListComptableComponent,
        TvaViewComptableComponent,
        TvaEditComptableComponent,
        TvaComptableComponent,
        PaiementDeclarationIrCreateComptableComponent,
        PaiementDeclarationIrListComptableComponent,
        PaiementDeclarationIrViewComptableComponent,
        PaiementDeclarationIrEditComptableComponent,
        PaiementDeclarationIrComptableComponent,
        DemandePieceJointeCreateComptableComponent,
        DemandePieceJointeListComptableComponent,
        DemandePieceJointeViewComptableComponent,
        DemandePieceJointeEditComptableComponent,
        DemandePieceJointeComptableComponent,
        TypeTauxCnssCreateComptableComponent,
        TypeTauxCnssListComptableComponent,
        TypeTauxCnssViewComptableComponent,
        TypeTauxCnssEditComptableComponent,
        TypeTauxCnssComptableComponent,
        DeclarationIrCreateComptableComponent,
        DeclarationIrListComptableComponent,
        DeclarationIrViewComptableComponent,
        DeclarationIrEditComptableComponent,
        DeclarationIrComptableComponent,
        EmployeCreateComptableComponent,
        EmployeListComptableComponent,
        EmployeViewComptableComponent,
        EmployeEditComptableComponent,
        EmployeComptableComponent,
        DeclarationCnssCreateComptableComponent,
        DeclarationCnssListComptableComponent,
        DeclarationCnssViewComptableComponent,
        DeclarationCnssEditComptableComponent,
        DeclarationCnssComptableComponent,
        EtatDeclarationTvaCreateComptableComponent,
        EtatDeclarationTvaListComptableComponent,
        EtatDeclarationTvaViewComptableComponent,
        EtatDeclarationTvaEditComptableComponent,
        EtatDeclarationTvaComptableComponent,
        PaiementDeclarationTvaCreateComptableComponent,
        PaiementDeclarationTvaListComptableComponent,
        PaiementDeclarationTvaViewComptableComponent,
        PaiementDeclarationTvaEditComptableComponent,
        PaiementDeclarationTvaComptableComponent,
        PrelevementSocialEmployeCreateComptableComponent,
        PrelevementSocialEmployeListComptableComponent,
        PrelevementSocialEmployeViewComptableComponent,
        PrelevementSocialEmployeEditComptableComponent,
        PrelevementSocialEmployeComptableComponent,
        FactureCreateComptableComponent,
        FactureListComptableComponent,
        FactureViewComptableComponent,
        FactureEditComptableComponent,
        FactureComptableComponent,
        EtatFactureCreateComptableComponent,
        EtatFactureListComptableComponent,
        EtatFactureViewComptableComponent,
        EtatFactureEditComptableComponent,
        EtatFactureComptableComponent,
        EtatDeclarationIsCreateComptableComponent,
        EtatDeclarationIsListComptableComponent,
        EtatDeclarationIsViewComptableComponent,
        EtatDeclarationIsEditComptableComponent,
        EtatDeclarationIsComptableComponent,
        CompteComptableCreateComptableComponent,
        CompteComptableListComptableComponent,
        CompteComptableViewComptableComponent,
        CompteComptableEditComptableComponent,
        CompteComptableComptableComponent,
        PrelevementSocialCreateComptableComponent,
        PrelevementSocialListComptableComponent,
        PrelevementSocialViewComptableComponent,
        PrelevementSocialEditComptableComponent,
        PrelevementSocialComptableComponent,
        ChercheurCreateComptableComponent,
        ChercheurListComptableComponent,
        ChercheurViewComptableComponent,
        ChercheurEditComptableComponent,
        ChercheurComptableComponent,
        SousClasseComptableCreateComptableComponent,
        SousClasseComptableListComptableComponent,
        SousClasseComptableViewComptableComponent,
        SousClasseComptableEditComptableComponent,
        SousClasseComptableComptableComponent,
        SocieteCreateComptableComponent,
        SocieteListComptableComponent,
        SocieteViewComptableComponent,
        SocieteEditComptableComponent,
        SocieteComptableComponent,
        ComptableCreateComptableComponent,
        ComptableListComptableComponent,
        ComptableViewComptableComponent,
        ComptableEditComptableComponent,
        ComptableComptableComponent,
        TauxIrCreateComptableComponent,
        TauxIrListComptableComponent,
        TauxIrViewComptableComponent,
        TauxIrEditComptableComponent,
        TauxIrComptableComponent,
        FacturePieceJointeCreateComptableComponent,
        FacturePieceJointeListComptableComponent,
        FacturePieceJointeViewComptableComponent,
        FacturePieceJointeEditComptableComponent,
        FacturePieceJointeComptableComponent,
        EtatDemandeCreateComptableComponent,
        EtatDemandeListComptableComponent,
        EtatDemandeViewComptableComponent,
        EtatDemandeEditComptableComponent,
        EtatDemandeComptableComponent,
        TypeEmployeCreateComptableComponent,
        TypeEmployeListComptableComponent,
        TypeEmployeViewComptableComponent,
        TypeEmployeEditComptableComponent,
        TypeEmployeComptableComponent,
        TauxIsCreateComptableComponent,
        TauxIsListComptableComponent,
        TauxIsViewComptableComponent,
        TauxIsEditComptableComponent,
        TauxIsComptableComponent,
        ClasseComptableCreateComptableComponent,
        ClasseComptableListComptableComponent,
        ClasseComptableViewComptableComponent,
        ClasseComptableEditComptableComponent,
        ClasseComptableComptableComponent,
        AcompteCreateComptableComponent,
        AcompteListComptableComponent,
        AcompteViewComptableComponent,
        AcompteEditComptableComponent,
        AcompteComptableComponent,
        DemandeCreateComptableComponent,
        DemandeListComptableComponent,
        DemandeViewComptableComponent,
        DemandeEditComptableComponent,
        DemandeComptableComponent,
        EtatDeclarationIrCreateComptableComponent,
        EtatDeclarationIrListComptableComponent,
        EtatDeclarationIrViewComptableComponent,
        EtatDeclarationIrEditComptableComponent,
        EtatDeclarationIrComptableComponent,
        TauxCnssCreateComptableComponent,
        TauxCnssListComptableComponent,
        TauxCnssViewComptableComponent,
        TauxCnssEditComptableComponent,
        TauxCnssComptableComponent,
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
        MultiSelectModule
    ],
    exports: [
        TauxIsConfigCreateComptableComponent,
        TauxIsConfigListComptableComponent,
        TauxIsConfigViewComptableComponent,
        TauxIsConfigEditComptableComponent,
        TauxIsConfigComptableComponent,
        EtatPaiementCreateComptableComponent,
        EtatPaiementListComptableComponent,
        EtatPaiementViewComptableComponent,
        EtatPaiementEditComptableComponent,
        EtatPaiementComptableComponent,
        TypeOperationFactureCreateComptableComponent,
        TypeOperationFactureListComptableComponent,
        TypeOperationFactureViewComptableComponent,
        TypeOperationFactureEditComptableComponent,
        TypeOperationFactureComptableComponent,
        CpcFactureCreateComptableComponent,
        CpcFactureListComptableComponent,
        CpcFactureViewComptableComponent,
        CpcFactureEditComptableComponent,
        CpcFactureComptableComponent,
        DeclarationIsCreateComptableComponent,
        DeclarationIsListComptableComponent,
        DeclarationIsViewComptableComponent,
        DeclarationIsEditComptableComponent,
        DeclarationIsComptableComponent,
        DeclarationIrEmployeCreateComptableComponent,
        DeclarationIrEmployeListComptableComponent,
        DeclarationIrEmployeViewComptableComponent,
        DeclarationIrEmployeEditComptableComponent,
        DeclarationIrEmployeComptableComponent,
        PresidentSocieteCreateComptableComponent,
        PresidentSocieteListComptableComponent,
        PresidentSocieteViewComptableComponent,
        PresidentSocieteEditComptableComponent,
        PresidentSocieteComptableComponent,
        DeclarationTvaCreateComptableComponent,
        DeclarationTvaListComptableComponent,
        DeclarationTvaViewComptableComponent,
        DeclarationTvaEditComptableComponent,
        DeclarationTvaComptableComponent,
        CpcCreateComptableComponent,
        CpcListComptableComponent,
        CpcViewComptableComponent,
        CpcEditComptableComponent,
        CpcComptableComponent,
        TypeSocieteCreateComptableComponent,
        TypeSocieteListComptableComponent,
        TypeSocieteViewComptableComponent,
        TypeSocieteEditComptableComponent,
        TypeSocieteComptableComponent,
        CommentaireCreateComptableComponent,
        CommentaireListComptableComponent,
        CommentaireViewComptableComponent,
        CommentaireEditComptableComponent,
        CommentaireComptableComponent,
        DeclarationCnssDetailCreateComptableComponent,
        DeclarationCnssDetailListComptableComponent,
        DeclarationCnssDetailViewComptableComponent,
        DeclarationCnssDetailEditComptableComponent,
        DeclarationCnssDetailComptableComponent,
        TypeComptableCreateComptableComponent,
        TypeComptableListComptableComponent,
        TypeComptableViewComptableComponent,
        TypeComptableEditComptableComponent,
        TypeComptableComptableComponent,
        PaiementDeclarationIsCreateComptableComponent,
        PaiementDeclarationIsListComptableComponent,
        PaiementDeclarationIsViewComptableComponent,
        PaiementDeclarationIsEditComptableComponent,
        PaiementDeclarationIsComptableComponent,
        TypeDeclarationTvaCreateComptableComponent,
        TypeDeclarationTvaListComptableComponent,
        TypeDeclarationTvaViewComptableComponent,
        TypeDeclarationTvaEditComptableComponent,
        TypeDeclarationTvaComptableComponent,
        TvaCreateComptableComponent,
        TvaListComptableComponent,
        TvaViewComptableComponent,
        TvaEditComptableComponent,
        TvaComptableComponent,
        PaiementDeclarationIrCreateComptableComponent,
        PaiementDeclarationIrListComptableComponent,
        PaiementDeclarationIrViewComptableComponent,
        PaiementDeclarationIrEditComptableComponent,
        PaiementDeclarationIrComptableComponent,
        DemandePieceJointeCreateComptableComponent,
        DemandePieceJointeListComptableComponent,
        DemandePieceJointeViewComptableComponent,
        DemandePieceJointeEditComptableComponent,
        DemandePieceJointeComptableComponent,
        TypeTauxCnssCreateComptableComponent,
        TypeTauxCnssListComptableComponent,
        TypeTauxCnssViewComptableComponent,
        TypeTauxCnssEditComptableComponent,
        TypeTauxCnssComptableComponent,
        DeclarationIrCreateComptableComponent,
        DeclarationIrListComptableComponent,
        DeclarationIrViewComptableComponent,
        DeclarationIrEditComptableComponent,
        DeclarationIrComptableComponent,
        EmployeCreateComptableComponent,
        EmployeListComptableComponent,
        EmployeViewComptableComponent,
        EmployeEditComptableComponent,
        EmployeComptableComponent,
        DeclarationCnssCreateComptableComponent,
        DeclarationCnssListComptableComponent,
        DeclarationCnssViewComptableComponent,
        DeclarationCnssEditComptableComponent,
        DeclarationCnssComptableComponent,
        EtatDeclarationTvaCreateComptableComponent,
        EtatDeclarationTvaListComptableComponent,
        EtatDeclarationTvaViewComptableComponent,
        EtatDeclarationTvaEditComptableComponent,
        EtatDeclarationTvaComptableComponent,
        PaiementDeclarationTvaCreateComptableComponent,
        PaiementDeclarationTvaListComptableComponent,
        PaiementDeclarationTvaViewComptableComponent,
        PaiementDeclarationTvaEditComptableComponent,
        PaiementDeclarationTvaComptableComponent,
        PrelevementSocialEmployeCreateComptableComponent,
        PrelevementSocialEmployeListComptableComponent,
        PrelevementSocialEmployeViewComptableComponent,
        PrelevementSocialEmployeEditComptableComponent,
        PrelevementSocialEmployeComptableComponent,
        FactureCreateComptableComponent,
        FactureListComptableComponent,
        FactureViewComptableComponent,
        FactureEditComptableComponent,
        FactureComptableComponent,
        EtatFactureCreateComptableComponent,
        EtatFactureListComptableComponent,
        EtatFactureViewComptableComponent,
        EtatFactureEditComptableComponent,
        EtatFactureComptableComponent,
        EtatDeclarationIsCreateComptableComponent,
        EtatDeclarationIsListComptableComponent,
        EtatDeclarationIsViewComptableComponent,
        EtatDeclarationIsEditComptableComponent,
        EtatDeclarationIsComptableComponent,
        CompteComptableCreateComptableComponent,
        CompteComptableListComptableComponent,
        CompteComptableViewComptableComponent,
        CompteComptableEditComptableComponent,
        CompteComptableComptableComponent,
        PrelevementSocialCreateComptableComponent,
        PrelevementSocialListComptableComponent,
        PrelevementSocialViewComptableComponent,
        PrelevementSocialEditComptableComponent,
        PrelevementSocialComptableComponent,
        ChercheurCreateComptableComponent,
        ChercheurListComptableComponent,
        ChercheurViewComptableComponent,
        ChercheurEditComptableComponent,
        ChercheurComptableComponent,
        SousClasseComptableCreateComptableComponent,
        SousClasseComptableListComptableComponent,
        SousClasseComptableViewComptableComponent,
        SousClasseComptableEditComptableComponent,
        SousClasseComptableComptableComponent,
        SocieteCreateComptableComponent,
        SocieteListComptableComponent,
        SocieteViewComptableComponent,
        SocieteEditComptableComponent,
        SocieteComptableComponent,
        ComptableCreateComptableComponent,
        ComptableListComptableComponent,
        ComptableViewComptableComponent,
        ComptableEditComptableComponent,
        ComptableComptableComponent,
        TauxIrCreateComptableComponent,
        TauxIrListComptableComponent,
        TauxIrViewComptableComponent,
        TauxIrEditComptableComponent,
        TauxIrComptableComponent,
        FacturePieceJointeCreateComptableComponent,
        FacturePieceJointeListComptableComponent,
        FacturePieceJointeViewComptableComponent,
        FacturePieceJointeEditComptableComponent,
        FacturePieceJointeComptableComponent,
        EtatDemandeCreateComptableComponent,
        EtatDemandeListComptableComponent,
        EtatDemandeViewComptableComponent,
        EtatDemandeEditComptableComponent,
        EtatDemandeComptableComponent,
        TypeEmployeCreateComptableComponent,
        TypeEmployeListComptableComponent,
        TypeEmployeViewComptableComponent,
        TypeEmployeEditComptableComponent,
        TypeEmployeComptableComponent,
        TauxIsCreateComptableComponent,
        TauxIsListComptableComponent,
        TauxIsViewComptableComponent,
        TauxIsEditComptableComponent,
        TauxIsComptableComponent,
        ClasseComptableCreateComptableComponent,
        ClasseComptableListComptableComponent,
        ClasseComptableViewComptableComponent,
        ClasseComptableEditComptableComponent,
        ClasseComptableComptableComponent,
        AcompteCreateComptableComponent,
        AcompteListComptableComponent,
        AcompteViewComptableComponent,
        AcompteEditComptableComponent,
        AcompteComptableComponent,
        DemandeCreateComptableComponent,
        DemandeListComptableComponent,
        DemandeViewComptableComponent,
        DemandeEditComptableComponent,
        DemandeComptableComponent,
        EtatDeclarationIrCreateComptableComponent,
        EtatDeclarationIrListComptableComponent,
        EtatDeclarationIrViewComptableComponent,
        EtatDeclarationIrEditComptableComponent,
        EtatDeclarationIrComptableComponent,
        TauxCnssCreateComptableComponent,
        TauxCnssListComptableComponent,
        TauxCnssViewComptableComponent,
        TauxCnssEditComptableComponent,
        TauxCnssComptableComponent,
    ]
})
export class ImpotComptableModule { }
