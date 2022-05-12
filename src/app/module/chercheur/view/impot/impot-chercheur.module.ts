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

import { TauxIsConfigCreateChercheurComponent } from './taux-is-config-chercheur/create-chercheur/taux-is-config-create-chercheur.component';
import { TauxIsConfigEditChercheurComponent } from './taux-is-config-chercheur/edit-chercheur/taux-is-config-edit-chercheur.component';
import { TauxIsConfigViewChercheurComponent } from './taux-is-config-chercheur/view-chercheur/taux-is-config-view-chercheur.component';
import { TauxIsConfigListChercheurComponent } from './taux-is-config-chercheur/list-chercheur/taux-is-config-list-chercheur.component';
import { TauxIsConfigChercheurComponent } from './taux-is-config-chercheur/taux-is-config-chercheur.component';
import { EtatPaiementCreateChercheurComponent } from './etat-paiement-chercheur/create-chercheur/etat-paiement-create-chercheur.component';
import { EtatPaiementEditChercheurComponent } from './etat-paiement-chercheur/edit-chercheur/etat-paiement-edit-chercheur.component';
import { EtatPaiementViewChercheurComponent } from './etat-paiement-chercheur/view-chercheur/etat-paiement-view-chercheur.component';
import { EtatPaiementListChercheurComponent } from './etat-paiement-chercheur/list-chercheur/etat-paiement-list-chercheur.component';
import { EtatPaiementChercheurComponent } from './etat-paiement-chercheur/etat-paiement-chercheur.component';
import { TypeOperationFactureCreateChercheurComponent } from './type-operation-facture-chercheur/create-chercheur/type-operation-facture-create-chercheur.component';
import { TypeOperationFactureEditChercheurComponent } from './type-operation-facture-chercheur/edit-chercheur/type-operation-facture-edit-chercheur.component';
import { TypeOperationFactureViewChercheurComponent } from './type-operation-facture-chercheur/view-chercheur/type-operation-facture-view-chercheur.component';
import { TypeOperationFactureListChercheurComponent } from './type-operation-facture-chercheur/list-chercheur/type-operation-facture-list-chercheur.component';
import { TypeOperationFactureChercheurComponent } from './type-operation-facture-chercheur/type-operation-facture-chercheur.component';
import { CpcFactureCreateChercheurComponent } from './cpc-facture-chercheur/create-chercheur/cpc-facture-create-chercheur.component';
import { CpcFactureEditChercheurComponent } from './cpc-facture-chercheur/edit-chercheur/cpc-facture-edit-chercheur.component';
import { CpcFactureViewChercheurComponent } from './cpc-facture-chercheur/view-chercheur/cpc-facture-view-chercheur.component';
import { CpcFactureListChercheurComponent } from './cpc-facture-chercheur/list-chercheur/cpc-facture-list-chercheur.component';
import { CpcFactureChercheurComponent } from './cpc-facture-chercheur/cpc-facture-chercheur.component';
import { DeclarationIsCreateChercheurComponent } from './declaration-is-chercheur/create-chercheur/declaration-is-create-chercheur.component';
import { DeclarationIsEditChercheurComponent } from './declaration-is-chercheur/edit-chercheur/declaration-is-edit-chercheur.component';
import { DeclarationIsViewChercheurComponent } from './declaration-is-chercheur/view-chercheur/declaration-is-view-chercheur.component';
import { DeclarationIsListChercheurComponent } from './declaration-is-chercheur/list-chercheur/declaration-is-list-chercheur.component';
import { DeclarationIsChercheurComponent } from './declaration-is-chercheur/declaration-is-chercheur.component';
import { DeclarationIrEmployeCreateChercheurComponent } from './declaration-ir-employe-chercheur/create-chercheur/declaration-ir-employe-create-chercheur.component';
import { DeclarationIrEmployeEditChercheurComponent } from './declaration-ir-employe-chercheur/edit-chercheur/declaration-ir-employe-edit-chercheur.component';
import { DeclarationIrEmployeViewChercheurComponent } from './declaration-ir-employe-chercheur/view-chercheur/declaration-ir-employe-view-chercheur.component';
import { DeclarationIrEmployeListChercheurComponent } from './declaration-ir-employe-chercheur/list-chercheur/declaration-ir-employe-list-chercheur.component';
import { DeclarationIrEmployeChercheurComponent } from './declaration-ir-employe-chercheur/declaration-ir-employe-chercheur.component';
import { PresidentSocieteCreateChercheurComponent } from './president-societe-chercheur/create-chercheur/president-societe-create-chercheur.component';
import { PresidentSocieteEditChercheurComponent } from './president-societe-chercheur/edit-chercheur/president-societe-edit-chercheur.component';
import { PresidentSocieteViewChercheurComponent } from './president-societe-chercheur/view-chercheur/president-societe-view-chercheur.component';
import { PresidentSocieteListChercheurComponent } from './president-societe-chercheur/list-chercheur/president-societe-list-chercheur.component';
import { PresidentSocieteChercheurComponent } from './president-societe-chercheur/president-societe-chercheur.component';
import { DeclarationTvaCreateChercheurComponent } from './declaration-tva-chercheur/create-chercheur/declaration-tva-create-chercheur.component';
import { DeclarationTvaEditChercheurComponent } from './declaration-tva-chercheur/edit-chercheur/declaration-tva-edit-chercheur.component';
import { DeclarationTvaViewChercheurComponent } from './declaration-tva-chercheur/view-chercheur/declaration-tva-view-chercheur.component';
import { DeclarationTvaListChercheurComponent } from './declaration-tva-chercheur/list-chercheur/declaration-tva-list-chercheur.component';
import { DeclarationTvaChercheurComponent } from './declaration-tva-chercheur/declaration-tva-chercheur.component';
import { CpcCreateChercheurComponent } from './cpc-chercheur/create-chercheur/cpc-create-chercheur.component';
import { CpcEditChercheurComponent } from './cpc-chercheur/edit-chercheur/cpc-edit-chercheur.component';
import { CpcViewChercheurComponent } from './cpc-chercheur/view-chercheur/cpc-view-chercheur.component';
import { CpcListChercheurComponent } from './cpc-chercheur/list-chercheur/cpc-list-chercheur.component';
import { CpcChercheurComponent } from './cpc-chercheur/cpc-chercheur.component';
import { TypeSocieteCreateChercheurComponent } from './type-societe-chercheur/create-chercheur/type-societe-create-chercheur.component';
import { TypeSocieteEditChercheurComponent } from './type-societe-chercheur/edit-chercheur/type-societe-edit-chercheur.component';
import { TypeSocieteViewChercheurComponent } from './type-societe-chercheur/view-chercheur/type-societe-view-chercheur.component';
import { TypeSocieteListChercheurComponent } from './type-societe-chercheur/list-chercheur/type-societe-list-chercheur.component';
import { TypeSocieteChercheurComponent } from './type-societe-chercheur/type-societe-chercheur.component';
import { CommentaireCreateChercheurComponent } from './commentaire-chercheur/create-chercheur/commentaire-create-chercheur.component';
import { CommentaireEditChercheurComponent } from './commentaire-chercheur/edit-chercheur/commentaire-edit-chercheur.component';
import { CommentaireViewChercheurComponent } from './commentaire-chercheur/view-chercheur/commentaire-view-chercheur.component';
import { CommentaireListChercheurComponent } from './commentaire-chercheur/list-chercheur/commentaire-list-chercheur.component';
import { CommentaireChercheurComponent } from './commentaire-chercheur/commentaire-chercheur.component';
import { DeclarationCnssDetailCreateChercheurComponent } from './declaration-cnss-detail-chercheur/create-chercheur/declaration-cnss-detail-create-chercheur.component';
import { DeclarationCnssDetailEditChercheurComponent } from './declaration-cnss-detail-chercheur/edit-chercheur/declaration-cnss-detail-edit-chercheur.component';
import { DeclarationCnssDetailViewChercheurComponent } from './declaration-cnss-detail-chercheur/view-chercheur/declaration-cnss-detail-view-chercheur.component';
import { DeclarationCnssDetailListChercheurComponent } from './declaration-cnss-detail-chercheur/list-chercheur/declaration-cnss-detail-list-chercheur.component';
import { DeclarationCnssDetailChercheurComponent } from './declaration-cnss-detail-chercheur/declaration-cnss-detail-chercheur.component';
import { TypeComptableCreateChercheurComponent } from './type-comptable-chercheur/create-chercheur/type-comptable-create-chercheur.component';
import { TypeComptableEditChercheurComponent } from './type-comptable-chercheur/edit-chercheur/type-comptable-edit-chercheur.component';
import { TypeComptableViewChercheurComponent } from './type-comptable-chercheur/view-chercheur/type-comptable-view-chercheur.component';
import { TypeComptableListChercheurComponent } from './type-comptable-chercheur/list-chercheur/type-comptable-list-chercheur.component';
import { TypeComptableChercheurComponent } from './type-comptable-chercheur/type-comptable-chercheur.component';
import { PaiementDeclarationIsCreateChercheurComponent } from './paiement-declaration-is-chercheur/create-chercheur/paiement-declaration-is-create-chercheur.component';
import { PaiementDeclarationIsEditChercheurComponent } from './paiement-declaration-is-chercheur/edit-chercheur/paiement-declaration-is-edit-chercheur.component';
import { PaiementDeclarationIsViewChercheurComponent } from './paiement-declaration-is-chercheur/view-chercheur/paiement-declaration-is-view-chercheur.component';
import { PaiementDeclarationIsListChercheurComponent } from './paiement-declaration-is-chercheur/list-chercheur/paiement-declaration-is-list-chercheur.component';
import { PaiementDeclarationIsChercheurComponent } from './paiement-declaration-is-chercheur/paiement-declaration-is-chercheur.component';
import { TypeDeclarationTvaCreateChercheurComponent } from './type-declaration-tva-chercheur/create-chercheur/type-declaration-tva-create-chercheur.component';
import { TypeDeclarationTvaEditChercheurComponent } from './type-declaration-tva-chercheur/edit-chercheur/type-declaration-tva-edit-chercheur.component';
import { TypeDeclarationTvaViewChercheurComponent } from './type-declaration-tva-chercheur/view-chercheur/type-declaration-tva-view-chercheur.component';
import { TypeDeclarationTvaListChercheurComponent } from './type-declaration-tva-chercheur/list-chercheur/type-declaration-tva-list-chercheur.component';
import { TypeDeclarationTvaChercheurComponent } from './type-declaration-tva-chercheur/type-declaration-tva-chercheur.component';
import { TvaCreateChercheurComponent } from './tva-chercheur/create-chercheur/tva-create-chercheur.component';
import { TvaEditChercheurComponent } from './tva-chercheur/edit-chercheur/tva-edit-chercheur.component';
import { TvaViewChercheurComponent } from './tva-chercheur/view-chercheur/tva-view-chercheur.component';
import { TvaListChercheurComponent } from './tva-chercheur/list-chercheur/tva-list-chercheur.component';
import { TvaChercheurComponent } from './tva-chercheur/tva-chercheur.component';
import { PaiementDeclarationIrCreateChercheurComponent } from './paiement-declaration-ir-chercheur/create-chercheur/paiement-declaration-ir-create-chercheur.component';
import { PaiementDeclarationIrEditChercheurComponent } from './paiement-declaration-ir-chercheur/edit-chercheur/paiement-declaration-ir-edit-chercheur.component';
import { PaiementDeclarationIrViewChercheurComponent } from './paiement-declaration-ir-chercheur/view-chercheur/paiement-declaration-ir-view-chercheur.component';
import { PaiementDeclarationIrListChercheurComponent } from './paiement-declaration-ir-chercheur/list-chercheur/paiement-declaration-ir-list-chercheur.component';
import { PaiementDeclarationIrChercheurComponent } from './paiement-declaration-ir-chercheur/paiement-declaration-ir-chercheur.component';
import { DemandePieceJointeCreateChercheurComponent } from './demande-piece-jointe-chercheur/create-chercheur/demande-piece-jointe-create-chercheur.component';
import { DemandePieceJointeEditChercheurComponent } from './demande-piece-jointe-chercheur/edit-chercheur/demande-piece-jointe-edit-chercheur.component';
import { DemandePieceJointeViewChercheurComponent } from './demande-piece-jointe-chercheur/view-chercheur/demande-piece-jointe-view-chercheur.component';
import { DemandePieceJointeListChercheurComponent } from './demande-piece-jointe-chercheur/list-chercheur/demande-piece-jointe-list-chercheur.component';
import { DemandePieceJointeChercheurComponent } from './demande-piece-jointe-chercheur/demande-piece-jointe-chercheur.component';
import { TypeTauxCnssCreateChercheurComponent } from './type-taux-cnss-chercheur/create-chercheur/type-taux-cnss-create-chercheur.component';
import { TypeTauxCnssEditChercheurComponent } from './type-taux-cnss-chercheur/edit-chercheur/type-taux-cnss-edit-chercheur.component';
import { TypeTauxCnssViewChercheurComponent } from './type-taux-cnss-chercheur/view-chercheur/type-taux-cnss-view-chercheur.component';
import { TypeTauxCnssListChercheurComponent } from './type-taux-cnss-chercheur/list-chercheur/type-taux-cnss-list-chercheur.component';
import { TypeTauxCnssChercheurComponent } from './type-taux-cnss-chercheur/type-taux-cnss-chercheur.component';
import { DeclarationIrCreateChercheurComponent } from './declaration-ir-chercheur/create-chercheur/declaration-ir-create-chercheur.component';
import { DeclarationIrEditChercheurComponent } from './declaration-ir-chercheur/edit-chercheur/declaration-ir-edit-chercheur.component';
import { DeclarationIrViewChercheurComponent } from './declaration-ir-chercheur/view-chercheur/declaration-ir-view-chercheur.component';
import { DeclarationIrListChercheurComponent } from './declaration-ir-chercheur/list-chercheur/declaration-ir-list-chercheur.component';
import { DeclarationIrChercheurComponent } from './declaration-ir-chercheur/declaration-ir-chercheur.component';
import { EmployeCreateChercheurComponent } from './employe-chercheur/create-chercheur/employe-create-chercheur.component';
import { EmployeEditChercheurComponent } from './employe-chercheur/edit-chercheur/employe-edit-chercheur.component';
import { EmployeViewChercheurComponent } from './employe-chercheur/view-chercheur/employe-view-chercheur.component';
import { EmployeListChercheurComponent } from './employe-chercheur/list-chercheur/employe-list-chercheur.component';
import { EmployeChercheurComponent } from './employe-chercheur/employe-chercheur.component';
import { DeclarationCnssCreateChercheurComponent } from './declaration-cnss-chercheur/create-chercheur/declaration-cnss-create-chercheur.component';
import { DeclarationCnssEditChercheurComponent } from './declaration-cnss-chercheur/edit-chercheur/declaration-cnss-edit-chercheur.component';
import { DeclarationCnssViewChercheurComponent } from './declaration-cnss-chercheur/view-chercheur/declaration-cnss-view-chercheur.component';
import { DeclarationCnssListChercheurComponent } from './declaration-cnss-chercheur/list-chercheur/declaration-cnss-list-chercheur.component';
import { DeclarationCnssChercheurComponent } from './declaration-cnss-chercheur/declaration-cnss-chercheur.component';
import { EtatDeclarationTvaCreateChercheurComponent } from './etat-declaration-tva-chercheur/create-chercheur/etat-declaration-tva-create-chercheur.component';
import { EtatDeclarationTvaEditChercheurComponent } from './etat-declaration-tva-chercheur/edit-chercheur/etat-declaration-tva-edit-chercheur.component';
import { EtatDeclarationTvaViewChercheurComponent } from './etat-declaration-tva-chercheur/view-chercheur/etat-declaration-tva-view-chercheur.component';
import { EtatDeclarationTvaListChercheurComponent } from './etat-declaration-tva-chercheur/list-chercheur/etat-declaration-tva-list-chercheur.component';
import { EtatDeclarationTvaChercheurComponent } from './etat-declaration-tva-chercheur/etat-declaration-tva-chercheur.component';
import { PaiementDeclarationTvaCreateChercheurComponent } from './paiement-declaration-tva-chercheur/create-chercheur/paiement-declaration-tva-create-chercheur.component';
import { PaiementDeclarationTvaEditChercheurComponent } from './paiement-declaration-tva-chercheur/edit-chercheur/paiement-declaration-tva-edit-chercheur.component';
import { PaiementDeclarationTvaViewChercheurComponent } from './paiement-declaration-tva-chercheur/view-chercheur/paiement-declaration-tva-view-chercheur.component';
import { PaiementDeclarationTvaListChercheurComponent } from './paiement-declaration-tva-chercheur/list-chercheur/paiement-declaration-tva-list-chercheur.component';
import { PaiementDeclarationTvaChercheurComponent } from './paiement-declaration-tva-chercheur/paiement-declaration-tva-chercheur.component';
import { PrelevementSocialEmployeCreateChercheurComponent } from './prelevement-social-employe-chercheur/create-chercheur/prelevement-social-employe-create-chercheur.component';
import { PrelevementSocialEmployeEditChercheurComponent } from './prelevement-social-employe-chercheur/edit-chercheur/prelevement-social-employe-edit-chercheur.component';
import { PrelevementSocialEmployeViewChercheurComponent } from './prelevement-social-employe-chercheur/view-chercheur/prelevement-social-employe-view-chercheur.component';
import { PrelevementSocialEmployeListChercheurComponent } from './prelevement-social-employe-chercheur/list-chercheur/prelevement-social-employe-list-chercheur.component';
import { PrelevementSocialEmployeChercheurComponent } from './prelevement-social-employe-chercheur/prelevement-social-employe-chercheur.component';
import { FactureCreateChercheurComponent } from './facture-chercheur/create-chercheur/facture-create-chercheur.component';
import { FactureEditChercheurComponent } from './facture-chercheur/edit-chercheur/facture-edit-chercheur.component';
import { FactureViewChercheurComponent } from './facture-chercheur/view-chercheur/facture-view-chercheur.component';
import { FactureListChercheurComponent } from './facture-chercheur/list-chercheur/facture-list-chercheur.component';
import { FactureChercheurComponent } from './facture-chercheur/facture-chercheur.component';
import { EtatFactureCreateChercheurComponent } from './etat-facture-chercheur/create-chercheur/etat-facture-create-chercheur.component';
import { EtatFactureEditChercheurComponent } from './etat-facture-chercheur/edit-chercheur/etat-facture-edit-chercheur.component';
import { EtatFactureViewChercheurComponent } from './etat-facture-chercheur/view-chercheur/etat-facture-view-chercheur.component';
import { EtatFactureListChercheurComponent } from './etat-facture-chercheur/list-chercheur/etat-facture-list-chercheur.component';
import { EtatFactureChercheurComponent } from './etat-facture-chercheur/etat-facture-chercheur.component';
import { EtatDeclarationIsCreateChercheurComponent } from './etat-declaration-is-chercheur/create-chercheur/etat-declaration-is-create-chercheur.component';
import { EtatDeclarationIsEditChercheurComponent } from './etat-declaration-is-chercheur/edit-chercheur/etat-declaration-is-edit-chercheur.component';
import { EtatDeclarationIsViewChercheurComponent } from './etat-declaration-is-chercheur/view-chercheur/etat-declaration-is-view-chercheur.component';
import { EtatDeclarationIsListChercheurComponent } from './etat-declaration-is-chercheur/list-chercheur/etat-declaration-is-list-chercheur.component';
import { EtatDeclarationIsChercheurComponent } from './etat-declaration-is-chercheur/etat-declaration-is-chercheur.component';
import { CompteComptableCreateChercheurComponent } from './compte-comptable-chercheur/create-chercheur/compte-comptable-create-chercheur.component';
import { CompteComptableEditChercheurComponent } from './compte-comptable-chercheur/edit-chercheur/compte-comptable-edit-chercheur.component';
import { CompteComptableViewChercheurComponent } from './compte-comptable-chercheur/view-chercheur/compte-comptable-view-chercheur.component';
import { CompteComptableListChercheurComponent } from './compte-comptable-chercheur/list-chercheur/compte-comptable-list-chercheur.component';
import { CompteComptableChercheurComponent } from './compte-comptable-chercheur/compte-comptable-chercheur.component';
import { PrelevementSocialCreateChercheurComponent } from './prelevement-social-chercheur/create-chercheur/prelevement-social-create-chercheur.component';
import { PrelevementSocialEditChercheurComponent } from './prelevement-social-chercheur/edit-chercheur/prelevement-social-edit-chercheur.component';
import { PrelevementSocialViewChercheurComponent } from './prelevement-social-chercheur/view-chercheur/prelevement-social-view-chercheur.component';
import { PrelevementSocialListChercheurComponent } from './prelevement-social-chercheur/list-chercheur/prelevement-social-list-chercheur.component';
import { PrelevementSocialChercheurComponent } from './prelevement-social-chercheur/prelevement-social-chercheur.component';
import { ChercheurCreateChercheurComponent } from './chercheur-chercheur/create-chercheur/chercheur-create-chercheur.component';
import { ChercheurEditChercheurComponent } from './chercheur-chercheur/edit-chercheur/chercheur-edit-chercheur.component';
import { ChercheurViewChercheurComponent } from './chercheur-chercheur/view-chercheur/chercheur-view-chercheur.component';
import { ChercheurListChercheurComponent } from './chercheur-chercheur/list-chercheur/chercheur-list-chercheur.component';
import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';
import { SousClasseComptableCreateChercheurComponent } from './sous-classe-comptable-chercheur/create-chercheur/sous-classe-comptable-create-chercheur.component';
import { SousClasseComptableEditChercheurComponent } from './sous-classe-comptable-chercheur/edit-chercheur/sous-classe-comptable-edit-chercheur.component';
import { SousClasseComptableViewChercheurComponent } from './sous-classe-comptable-chercheur/view-chercheur/sous-classe-comptable-view-chercheur.component';
import { SousClasseComptableListChercheurComponent } from './sous-classe-comptable-chercheur/list-chercheur/sous-classe-comptable-list-chercheur.component';
import { SousClasseComptableChercheurComponent } from './sous-classe-comptable-chercheur/sous-classe-comptable-chercheur.component';
import { SocieteCreateChercheurComponent } from './societe-chercheur/create-chercheur/societe-create-chercheur.component';
import { SocieteEditChercheurComponent } from './societe-chercheur/edit-chercheur/societe-edit-chercheur.component';
import { SocieteViewChercheurComponent } from './societe-chercheur/view-chercheur/societe-view-chercheur.component';
import { SocieteListChercheurComponent } from './societe-chercheur/list-chercheur/societe-list-chercheur.component';
import { SocieteChercheurComponent } from './societe-chercheur/societe-chercheur.component';
import { ComptableCreateChercheurComponent } from './comptable-chercheur/create-chercheur/comptable-create-chercheur.component';
import { ComptableEditChercheurComponent } from './comptable-chercheur/edit-chercheur/comptable-edit-chercheur.component';
import { ComptableViewChercheurComponent } from './comptable-chercheur/view-chercheur/comptable-view-chercheur.component';
import { ComptableListChercheurComponent } from './comptable-chercheur/list-chercheur/comptable-list-chercheur.component';
import { ComptableChercheurComponent } from './comptable-chercheur/comptable-chercheur.component';
import { TauxIrCreateChercheurComponent } from './taux-ir-chercheur/create-chercheur/taux-ir-create-chercheur.component';
import { TauxIrEditChercheurComponent } from './taux-ir-chercheur/edit-chercheur/taux-ir-edit-chercheur.component';
import { TauxIrViewChercheurComponent } from './taux-ir-chercheur/view-chercheur/taux-ir-view-chercheur.component';
import { TauxIrListChercheurComponent } from './taux-ir-chercheur/list-chercheur/taux-ir-list-chercheur.component';
import { TauxIrChercheurComponent } from './taux-ir-chercheur/taux-ir-chercheur.component';
import { FacturePieceJointeCreateChercheurComponent } from './facture-piece-jointe-chercheur/create-chercheur/facture-piece-jointe-create-chercheur.component';
import { FacturePieceJointeEditChercheurComponent } from './facture-piece-jointe-chercheur/edit-chercheur/facture-piece-jointe-edit-chercheur.component';
import { FacturePieceJointeViewChercheurComponent } from './facture-piece-jointe-chercheur/view-chercheur/facture-piece-jointe-view-chercheur.component';
import { FacturePieceJointeListChercheurComponent } from './facture-piece-jointe-chercheur/list-chercheur/facture-piece-jointe-list-chercheur.component';
import { FacturePieceJointeChercheurComponent } from './facture-piece-jointe-chercheur/facture-piece-jointe-chercheur.component';
import { EtatDemandeCreateChercheurComponent } from './etat-demande-chercheur/create-chercheur/etat-demande-create-chercheur.component';
import { EtatDemandeEditChercheurComponent } from './etat-demande-chercheur/edit-chercheur/etat-demande-edit-chercheur.component';
import { EtatDemandeViewChercheurComponent } from './etat-demande-chercheur/view-chercheur/etat-demande-view-chercheur.component';
import { EtatDemandeListChercheurComponent } from './etat-demande-chercheur/list-chercheur/etat-demande-list-chercheur.component';
import { EtatDemandeChercheurComponent } from './etat-demande-chercheur/etat-demande-chercheur.component';
import { TypeEmployeCreateChercheurComponent } from './type-employe-chercheur/create-chercheur/type-employe-create-chercheur.component';
import { TypeEmployeEditChercheurComponent } from './type-employe-chercheur/edit-chercheur/type-employe-edit-chercheur.component';
import { TypeEmployeViewChercheurComponent } from './type-employe-chercheur/view-chercheur/type-employe-view-chercheur.component';
import { TypeEmployeListChercheurComponent } from './type-employe-chercheur/list-chercheur/type-employe-list-chercheur.component';
import { TypeEmployeChercheurComponent } from './type-employe-chercheur/type-employe-chercheur.component';
import { TauxIsCreateChercheurComponent } from './taux-is-chercheur/create-chercheur/taux-is-create-chercheur.component';
import { TauxIsEditChercheurComponent } from './taux-is-chercheur/edit-chercheur/taux-is-edit-chercheur.component';
import { TauxIsViewChercheurComponent } from './taux-is-chercheur/view-chercheur/taux-is-view-chercheur.component';
import { TauxIsListChercheurComponent } from './taux-is-chercheur/list-chercheur/taux-is-list-chercheur.component';
import { TauxIsChercheurComponent } from './taux-is-chercheur/taux-is-chercheur.component';
import { ClasseComptableCreateChercheurComponent } from './classe-comptable-chercheur/create-chercheur/classe-comptable-create-chercheur.component';
import { ClasseComptableEditChercheurComponent } from './classe-comptable-chercheur/edit-chercheur/classe-comptable-edit-chercheur.component';
import { ClasseComptableViewChercheurComponent } from './classe-comptable-chercheur/view-chercheur/classe-comptable-view-chercheur.component';
import { ClasseComptableListChercheurComponent } from './classe-comptable-chercheur/list-chercheur/classe-comptable-list-chercheur.component';
import { ClasseComptableChercheurComponent } from './classe-comptable-chercheur/classe-comptable-chercheur.component';
import { AcompteCreateChercheurComponent } from './acompte-chercheur/create-chercheur/acompte-create-chercheur.component';
import { AcompteEditChercheurComponent } from './acompte-chercheur/edit-chercheur/acompte-edit-chercheur.component';
import { AcompteViewChercheurComponent } from './acompte-chercheur/view-chercheur/acompte-view-chercheur.component';
import { AcompteListChercheurComponent } from './acompte-chercheur/list-chercheur/acompte-list-chercheur.component';
import { AcompteChercheurComponent } from './acompte-chercheur/acompte-chercheur.component';
import { DemandeCreateChercheurComponent } from './demande-chercheur/create-chercheur/demande-create-chercheur.component';
import { DemandeEditChercheurComponent } from './demande-chercheur/edit-chercheur/demande-edit-chercheur.component';
import { DemandeViewChercheurComponent } from './demande-chercheur/view-chercheur/demande-view-chercheur.component';
import { DemandeListChercheurComponent } from './demande-chercheur/list-chercheur/demande-list-chercheur.component';
import { DemandeChercheurComponent } from './demande-chercheur/demande-chercheur.component';
import { EtatDeclarationIrCreateChercheurComponent } from './etat-declaration-ir-chercheur/create-chercheur/etat-declaration-ir-create-chercheur.component';
import { EtatDeclarationIrEditChercheurComponent } from './etat-declaration-ir-chercheur/edit-chercheur/etat-declaration-ir-edit-chercheur.component';
import { EtatDeclarationIrViewChercheurComponent } from './etat-declaration-ir-chercheur/view-chercheur/etat-declaration-ir-view-chercheur.component';
import { EtatDeclarationIrListChercheurComponent } from './etat-declaration-ir-chercheur/list-chercheur/etat-declaration-ir-list-chercheur.component';
import { EtatDeclarationIrChercheurComponent } from './etat-declaration-ir-chercheur/etat-declaration-ir-chercheur.component';
import { TauxCnssCreateChercheurComponent } from './taux-cnss-chercheur/create-chercheur/taux-cnss-create-chercheur.component';
import { TauxCnssEditChercheurComponent } from './taux-cnss-chercheur/edit-chercheur/taux-cnss-edit-chercheur.component';
import { TauxCnssViewChercheurComponent } from './taux-cnss-chercheur/view-chercheur/taux-cnss-view-chercheur.component';
import { TauxCnssListChercheurComponent } from './taux-cnss-chercheur/list-chercheur/taux-cnss-list-chercheur.component';
import { TauxCnssChercheurComponent } from './taux-cnss-chercheur/taux-cnss-chercheur.component';

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
        TauxIsConfigCreateChercheurComponent,
        TauxIsConfigListChercheurComponent,
        TauxIsConfigViewChercheurComponent,
        TauxIsConfigEditChercheurComponent,
        TauxIsConfigChercheurComponent,
        EtatPaiementCreateChercheurComponent,
        EtatPaiementListChercheurComponent,
        EtatPaiementViewChercheurComponent,
        EtatPaiementEditChercheurComponent,
        EtatPaiementChercheurComponent,
        TypeOperationFactureCreateChercheurComponent,
        TypeOperationFactureListChercheurComponent,
        TypeOperationFactureViewChercheurComponent,
        TypeOperationFactureEditChercheurComponent,
        TypeOperationFactureChercheurComponent,
        CpcFactureCreateChercheurComponent,
        CpcFactureListChercheurComponent,
        CpcFactureViewChercheurComponent,
        CpcFactureEditChercheurComponent,
        CpcFactureChercheurComponent,
        DeclarationIsCreateChercheurComponent,
        DeclarationIsListChercheurComponent,
        DeclarationIsViewChercheurComponent,
        DeclarationIsEditChercheurComponent,
        DeclarationIsChercheurComponent,
        DeclarationIrEmployeCreateChercheurComponent,
        DeclarationIrEmployeListChercheurComponent,
        DeclarationIrEmployeViewChercheurComponent,
        DeclarationIrEmployeEditChercheurComponent,
        DeclarationIrEmployeChercheurComponent,
        PresidentSocieteCreateChercheurComponent,
        PresidentSocieteListChercheurComponent,
        PresidentSocieteViewChercheurComponent,
        PresidentSocieteEditChercheurComponent,
        PresidentSocieteChercheurComponent,
        DeclarationTvaCreateChercheurComponent,
        DeclarationTvaListChercheurComponent,
        DeclarationTvaViewChercheurComponent,
        DeclarationTvaEditChercheurComponent,
        DeclarationTvaChercheurComponent,
        CpcCreateChercheurComponent,
        CpcListChercheurComponent,
        CpcViewChercheurComponent,
        CpcEditChercheurComponent,
        CpcChercheurComponent,
        TypeSocieteCreateChercheurComponent,
        TypeSocieteListChercheurComponent,
        TypeSocieteViewChercheurComponent,
        TypeSocieteEditChercheurComponent,
        TypeSocieteChercheurComponent,
        CommentaireCreateChercheurComponent,
        CommentaireListChercheurComponent,
        CommentaireViewChercheurComponent,
        CommentaireEditChercheurComponent,
        CommentaireChercheurComponent,
        DeclarationCnssDetailCreateChercheurComponent,
        DeclarationCnssDetailListChercheurComponent,
        DeclarationCnssDetailViewChercheurComponent,
        DeclarationCnssDetailEditChercheurComponent,
        DeclarationCnssDetailChercheurComponent,
        TypeComptableCreateChercheurComponent,
        TypeComptableListChercheurComponent,
        TypeComptableViewChercheurComponent,
        TypeComptableEditChercheurComponent,
        TypeComptableChercheurComponent,
        PaiementDeclarationIsCreateChercheurComponent,
        PaiementDeclarationIsListChercheurComponent,
        PaiementDeclarationIsViewChercheurComponent,
        PaiementDeclarationIsEditChercheurComponent,
        PaiementDeclarationIsChercheurComponent,
        TypeDeclarationTvaCreateChercheurComponent,
        TypeDeclarationTvaListChercheurComponent,
        TypeDeclarationTvaViewChercheurComponent,
        TypeDeclarationTvaEditChercheurComponent,
        TypeDeclarationTvaChercheurComponent,
        TvaCreateChercheurComponent,
        TvaListChercheurComponent,
        TvaViewChercheurComponent,
        TvaEditChercheurComponent,
        TvaChercheurComponent,
        PaiementDeclarationIrCreateChercheurComponent,
        PaiementDeclarationIrListChercheurComponent,
        PaiementDeclarationIrViewChercheurComponent,
        PaiementDeclarationIrEditChercheurComponent,
        PaiementDeclarationIrChercheurComponent,
        DemandePieceJointeCreateChercheurComponent,
        DemandePieceJointeListChercheurComponent,
        DemandePieceJointeViewChercheurComponent,
        DemandePieceJointeEditChercheurComponent,
        DemandePieceJointeChercheurComponent,
        TypeTauxCnssCreateChercheurComponent,
        TypeTauxCnssListChercheurComponent,
        TypeTauxCnssViewChercheurComponent,
        TypeTauxCnssEditChercheurComponent,
        TypeTauxCnssChercheurComponent,
        DeclarationIrCreateChercheurComponent,
        DeclarationIrListChercheurComponent,
        DeclarationIrViewChercheurComponent,
        DeclarationIrEditChercheurComponent,
        DeclarationIrChercheurComponent,
        EmployeCreateChercheurComponent,
        EmployeListChercheurComponent,
        EmployeViewChercheurComponent,
        EmployeEditChercheurComponent,
        EmployeChercheurComponent,
        DeclarationCnssCreateChercheurComponent,
        DeclarationCnssListChercheurComponent,
        DeclarationCnssViewChercheurComponent,
        DeclarationCnssEditChercheurComponent,
        DeclarationCnssChercheurComponent,
        EtatDeclarationTvaCreateChercheurComponent,
        EtatDeclarationTvaListChercheurComponent,
        EtatDeclarationTvaViewChercheurComponent,
        EtatDeclarationTvaEditChercheurComponent,
        EtatDeclarationTvaChercheurComponent,
        PaiementDeclarationTvaCreateChercheurComponent,
        PaiementDeclarationTvaListChercheurComponent,
        PaiementDeclarationTvaViewChercheurComponent,
        PaiementDeclarationTvaEditChercheurComponent,
        PaiementDeclarationTvaChercheurComponent,
        PrelevementSocialEmployeCreateChercheurComponent,
        PrelevementSocialEmployeListChercheurComponent,
        PrelevementSocialEmployeViewChercheurComponent,
        PrelevementSocialEmployeEditChercheurComponent,
        PrelevementSocialEmployeChercheurComponent,
        FactureCreateChercheurComponent,
        FactureListChercheurComponent,
        FactureViewChercheurComponent,
        FactureEditChercheurComponent,
        FactureChercheurComponent,
        EtatFactureCreateChercheurComponent,
        EtatFactureListChercheurComponent,
        EtatFactureViewChercheurComponent,
        EtatFactureEditChercheurComponent,
        EtatFactureChercheurComponent,
        EtatDeclarationIsCreateChercheurComponent,
        EtatDeclarationIsListChercheurComponent,
        EtatDeclarationIsViewChercheurComponent,
        EtatDeclarationIsEditChercheurComponent,
        EtatDeclarationIsChercheurComponent,
        CompteComptableCreateChercheurComponent,
        CompteComptableListChercheurComponent,
        CompteComptableViewChercheurComponent,
        CompteComptableEditChercheurComponent,
        CompteComptableChercheurComponent,
        PrelevementSocialCreateChercheurComponent,
        PrelevementSocialListChercheurComponent,
        PrelevementSocialViewChercheurComponent,
        PrelevementSocialEditChercheurComponent,
        PrelevementSocialChercheurComponent,
        ChercheurCreateChercheurComponent,
        ChercheurListChercheurComponent,
        ChercheurViewChercheurComponent,
        ChercheurEditChercheurComponent,
        ChercheurChercheurComponent,
        SousClasseComptableCreateChercheurComponent,
        SousClasseComptableListChercheurComponent,
        SousClasseComptableViewChercheurComponent,
        SousClasseComptableEditChercheurComponent,
        SousClasseComptableChercheurComponent,
        SocieteCreateChercheurComponent,
        SocieteListChercheurComponent,
        SocieteViewChercheurComponent,
        SocieteEditChercheurComponent,
        SocieteChercheurComponent,
        ComptableCreateChercheurComponent,
        ComptableListChercheurComponent,
        ComptableViewChercheurComponent,
        ComptableEditChercheurComponent,
        ComptableChercheurComponent,
        TauxIrCreateChercheurComponent,
        TauxIrListChercheurComponent,
        TauxIrViewChercheurComponent,
        TauxIrEditChercheurComponent,
        TauxIrChercheurComponent,
        FacturePieceJointeCreateChercheurComponent,
        FacturePieceJointeListChercheurComponent,
        FacturePieceJointeViewChercheurComponent,
        FacturePieceJointeEditChercheurComponent,
        FacturePieceJointeChercheurComponent,
        EtatDemandeCreateChercheurComponent,
        EtatDemandeListChercheurComponent,
        EtatDemandeViewChercheurComponent,
        EtatDemandeEditChercheurComponent,
        EtatDemandeChercheurComponent,
        TypeEmployeCreateChercheurComponent,
        TypeEmployeListChercheurComponent,
        TypeEmployeViewChercheurComponent,
        TypeEmployeEditChercheurComponent,
        TypeEmployeChercheurComponent,
        TauxIsCreateChercheurComponent,
        TauxIsListChercheurComponent,
        TauxIsViewChercheurComponent,
        TauxIsEditChercheurComponent,
        TauxIsChercheurComponent,
        ClasseComptableCreateChercheurComponent,
        ClasseComptableListChercheurComponent,
        ClasseComptableViewChercheurComponent,
        ClasseComptableEditChercheurComponent,
        ClasseComptableChercheurComponent,
        AcompteCreateChercheurComponent,
        AcompteListChercheurComponent,
        AcompteViewChercheurComponent,
        AcompteEditChercheurComponent,
        AcompteChercheurComponent,
        DemandeCreateChercheurComponent,
        DemandeListChercheurComponent,
        DemandeViewChercheurComponent,
        DemandeEditChercheurComponent,
        DemandeChercheurComponent,
        EtatDeclarationIrCreateChercheurComponent,
        EtatDeclarationIrListChercheurComponent,
        EtatDeclarationIrViewChercheurComponent,
        EtatDeclarationIrEditChercheurComponent,
        EtatDeclarationIrChercheurComponent,
        TauxCnssCreateChercheurComponent,
        TauxCnssListChercheurComponent,
        TauxCnssViewChercheurComponent,
        TauxCnssEditChercheurComponent,
        TauxCnssChercheurComponent,
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
        TauxIsConfigCreateChercheurComponent,
        TauxIsConfigListChercheurComponent,
        TauxIsConfigViewChercheurComponent,
        TauxIsConfigEditChercheurComponent,
        TauxIsConfigChercheurComponent,
        EtatPaiementCreateChercheurComponent,
        EtatPaiementListChercheurComponent,
        EtatPaiementViewChercheurComponent,
        EtatPaiementEditChercheurComponent,
        EtatPaiementChercheurComponent,
        TypeOperationFactureCreateChercheurComponent,
        TypeOperationFactureListChercheurComponent,
        TypeOperationFactureViewChercheurComponent,
        TypeOperationFactureEditChercheurComponent,
        TypeOperationFactureChercheurComponent,
        CpcFactureCreateChercheurComponent,
        CpcFactureListChercheurComponent,
        CpcFactureViewChercheurComponent,
        CpcFactureEditChercheurComponent,
        CpcFactureChercheurComponent,
        DeclarationIsCreateChercheurComponent,
        DeclarationIsListChercheurComponent,
        DeclarationIsViewChercheurComponent,
        DeclarationIsEditChercheurComponent,
        DeclarationIsChercheurComponent,
        DeclarationIrEmployeCreateChercheurComponent,
        DeclarationIrEmployeListChercheurComponent,
        DeclarationIrEmployeViewChercheurComponent,
        DeclarationIrEmployeEditChercheurComponent,
        DeclarationIrEmployeChercheurComponent,
        PresidentSocieteCreateChercheurComponent,
        PresidentSocieteListChercheurComponent,
        PresidentSocieteViewChercheurComponent,
        PresidentSocieteEditChercheurComponent,
        PresidentSocieteChercheurComponent,
        DeclarationTvaCreateChercheurComponent,
        DeclarationTvaListChercheurComponent,
        DeclarationTvaViewChercheurComponent,
        DeclarationTvaEditChercheurComponent,
        DeclarationTvaChercheurComponent,
        CpcCreateChercheurComponent,
        CpcListChercheurComponent,
        CpcViewChercheurComponent,
        CpcEditChercheurComponent,
        CpcChercheurComponent,
        TypeSocieteCreateChercheurComponent,
        TypeSocieteListChercheurComponent,
        TypeSocieteViewChercheurComponent,
        TypeSocieteEditChercheurComponent,
        TypeSocieteChercheurComponent,
        CommentaireCreateChercheurComponent,
        CommentaireListChercheurComponent,
        CommentaireViewChercheurComponent,
        CommentaireEditChercheurComponent,
        CommentaireChercheurComponent,
        DeclarationCnssDetailCreateChercheurComponent,
        DeclarationCnssDetailListChercheurComponent,
        DeclarationCnssDetailViewChercheurComponent,
        DeclarationCnssDetailEditChercheurComponent,
        DeclarationCnssDetailChercheurComponent,
        TypeComptableCreateChercheurComponent,
        TypeComptableListChercheurComponent,
        TypeComptableViewChercheurComponent,
        TypeComptableEditChercheurComponent,
        TypeComptableChercheurComponent,
        PaiementDeclarationIsCreateChercheurComponent,
        PaiementDeclarationIsListChercheurComponent,
        PaiementDeclarationIsViewChercheurComponent,
        PaiementDeclarationIsEditChercheurComponent,
        PaiementDeclarationIsChercheurComponent,
        TypeDeclarationTvaCreateChercheurComponent,
        TypeDeclarationTvaListChercheurComponent,
        TypeDeclarationTvaViewChercheurComponent,
        TypeDeclarationTvaEditChercheurComponent,
        TypeDeclarationTvaChercheurComponent,
        TvaCreateChercheurComponent,
        TvaListChercheurComponent,
        TvaViewChercheurComponent,
        TvaEditChercheurComponent,
        TvaChercheurComponent,
        PaiementDeclarationIrCreateChercheurComponent,
        PaiementDeclarationIrListChercheurComponent,
        PaiementDeclarationIrViewChercheurComponent,
        PaiementDeclarationIrEditChercheurComponent,
        PaiementDeclarationIrChercheurComponent,
        DemandePieceJointeCreateChercheurComponent,
        DemandePieceJointeListChercheurComponent,
        DemandePieceJointeViewChercheurComponent,
        DemandePieceJointeEditChercheurComponent,
        DemandePieceJointeChercheurComponent,
        TypeTauxCnssCreateChercheurComponent,
        TypeTauxCnssListChercheurComponent,
        TypeTauxCnssViewChercheurComponent,
        TypeTauxCnssEditChercheurComponent,
        TypeTauxCnssChercheurComponent,
        DeclarationIrCreateChercheurComponent,
        DeclarationIrListChercheurComponent,
        DeclarationIrViewChercheurComponent,
        DeclarationIrEditChercheurComponent,
        DeclarationIrChercheurComponent,
        EmployeCreateChercheurComponent,
        EmployeListChercheurComponent,
        EmployeViewChercheurComponent,
        EmployeEditChercheurComponent,
        EmployeChercheurComponent,
        DeclarationCnssCreateChercheurComponent,
        DeclarationCnssListChercheurComponent,
        DeclarationCnssViewChercheurComponent,
        DeclarationCnssEditChercheurComponent,
        DeclarationCnssChercheurComponent,
        EtatDeclarationTvaCreateChercheurComponent,
        EtatDeclarationTvaListChercheurComponent,
        EtatDeclarationTvaViewChercheurComponent,
        EtatDeclarationTvaEditChercheurComponent,
        EtatDeclarationTvaChercheurComponent,
        PaiementDeclarationTvaCreateChercheurComponent,
        PaiementDeclarationTvaListChercheurComponent,
        PaiementDeclarationTvaViewChercheurComponent,
        PaiementDeclarationTvaEditChercheurComponent,
        PaiementDeclarationTvaChercheurComponent,
        PrelevementSocialEmployeCreateChercheurComponent,
        PrelevementSocialEmployeListChercheurComponent,
        PrelevementSocialEmployeViewChercheurComponent,
        PrelevementSocialEmployeEditChercheurComponent,
        PrelevementSocialEmployeChercheurComponent,
        FactureCreateChercheurComponent,
        FactureListChercheurComponent,
        FactureViewChercheurComponent,
        FactureEditChercheurComponent,
        FactureChercheurComponent,
        EtatFactureCreateChercheurComponent,
        EtatFactureListChercheurComponent,
        EtatFactureViewChercheurComponent,
        EtatFactureEditChercheurComponent,
        EtatFactureChercheurComponent,
        EtatDeclarationIsCreateChercheurComponent,
        EtatDeclarationIsListChercheurComponent,
        EtatDeclarationIsViewChercheurComponent,
        EtatDeclarationIsEditChercheurComponent,
        EtatDeclarationIsChercheurComponent,
        CompteComptableCreateChercheurComponent,
        CompteComptableListChercheurComponent,
        CompteComptableViewChercheurComponent,
        CompteComptableEditChercheurComponent,
        CompteComptableChercheurComponent,
        PrelevementSocialCreateChercheurComponent,
        PrelevementSocialListChercheurComponent,
        PrelevementSocialViewChercheurComponent,
        PrelevementSocialEditChercheurComponent,
        PrelevementSocialChercheurComponent,
        ChercheurCreateChercheurComponent,
        ChercheurListChercheurComponent,
        ChercheurViewChercheurComponent,
        ChercheurEditChercheurComponent,
        ChercheurChercheurComponent,
        SousClasseComptableCreateChercheurComponent,
        SousClasseComptableListChercheurComponent,
        SousClasseComptableViewChercheurComponent,
        SousClasseComptableEditChercheurComponent,
        SousClasseComptableChercheurComponent,
        SocieteCreateChercheurComponent,
        SocieteListChercheurComponent,
        SocieteViewChercheurComponent,
        SocieteEditChercheurComponent,
        SocieteChercheurComponent,
        ComptableCreateChercheurComponent,
        ComptableListChercheurComponent,
        ComptableViewChercheurComponent,
        ComptableEditChercheurComponent,
        ComptableChercheurComponent,
        TauxIrCreateChercheurComponent,
        TauxIrListChercheurComponent,
        TauxIrViewChercheurComponent,
        TauxIrEditChercheurComponent,
        TauxIrChercheurComponent,
        FacturePieceJointeCreateChercheurComponent,
        FacturePieceJointeListChercheurComponent,
        FacturePieceJointeViewChercheurComponent,
        FacturePieceJointeEditChercheurComponent,
        FacturePieceJointeChercheurComponent,
        EtatDemandeCreateChercheurComponent,
        EtatDemandeListChercheurComponent,
        EtatDemandeViewChercheurComponent,
        EtatDemandeEditChercheurComponent,
        EtatDemandeChercheurComponent,
        TypeEmployeCreateChercheurComponent,
        TypeEmployeListChercheurComponent,
        TypeEmployeViewChercheurComponent,
        TypeEmployeEditChercheurComponent,
        TypeEmployeChercheurComponent,
        TauxIsCreateChercheurComponent,
        TauxIsListChercheurComponent,
        TauxIsViewChercheurComponent,
        TauxIsEditChercheurComponent,
        TauxIsChercheurComponent,
        ClasseComptableCreateChercheurComponent,
        ClasseComptableListChercheurComponent,
        ClasseComptableViewChercheurComponent,
        ClasseComptableEditChercheurComponent,
        ClasseComptableChercheurComponent,
        AcompteCreateChercheurComponent,
        AcompteListChercheurComponent,
        AcompteViewChercheurComponent,
        AcompteEditChercheurComponent,
        AcompteChercheurComponent,
        DemandeCreateChercheurComponent,
        DemandeListChercheurComponent,
        DemandeViewChercheurComponent,
        DemandeEditChercheurComponent,
        DemandeChercheurComponent,
        EtatDeclarationIrCreateChercheurComponent,
        EtatDeclarationIrListChercheurComponent,
        EtatDeclarationIrViewChercheurComponent,
        EtatDeclarationIrEditChercheurComponent,
        EtatDeclarationIrChercheurComponent,
        TauxCnssCreateChercheurComponent,
        TauxCnssListChercheurComponent,
        TauxCnssViewChercheurComponent,
        TauxCnssEditChercheurComponent,
        TauxCnssChercheurComponent,
    ]
})
export class ImpotChercheurModule { }
