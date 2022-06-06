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

import { TauxIsConfigCreateAdminComponent } from './taux-is-config-admin/create-admin/taux-is-config-create-admin.component';
import { TauxIsConfigEditAdminComponent } from './taux-is-config-admin/edit-admin/taux-is-config-edit-admin.component';
import { TauxIsConfigViewAdminComponent } from './taux-is-config-admin/view-admin/taux-is-config-view-admin.component';
import { TauxIsConfigListAdminComponent } from './taux-is-config-admin/list-admin/taux-is-config-list-admin.component';
import { TauxIsConfigAdminComponent } from './taux-is-config-admin/taux-is-config-admin.component';
import { EtatPaiementCreateAdminComponent } from './etat-paiement-admin/create-admin/etat-paiement-create-admin.component';
import { EtatPaiementEditAdminComponent } from './etat-paiement-admin/edit-admin/etat-paiement-edit-admin.component';
import { EtatPaiementViewAdminComponent } from './etat-paiement-admin/view-admin/etat-paiement-view-admin.component';
import { EtatPaiementListAdminComponent } from './etat-paiement-admin/list-admin/etat-paiement-list-admin.component';
import { EtatPaiementAdminComponent } from './etat-paiement-admin/etat-paiement-admin.component';
import { TypeOperationFactureCreateAdminComponent } from './type-operation-facture-admin/create-admin/type-operation-facture-create-admin.component';
import { TypeOperationFactureEditAdminComponent } from './type-operation-facture-admin/edit-admin/type-operation-facture-edit-admin.component';
import { TypeOperationFactureViewAdminComponent } from './type-operation-facture-admin/view-admin/type-operation-facture-view-admin.component';
import { TypeOperationFactureListAdminComponent } from './type-operation-facture-admin/list-admin/type-operation-facture-list-admin.component';
import { TypeOperationFactureAdminComponent } from './type-operation-facture-admin/type-operation-facture-admin.component';
import { CpcFactureCreateAdminComponent } from './cpc-facture-admin/create-admin/cpc-facture-create-admin.component';
import { CpcFactureEditAdminComponent } from './cpc-facture-admin/edit-admin/cpc-facture-edit-admin.component';
import { CpcFactureViewAdminComponent } from './cpc-facture-admin/view-admin/cpc-facture-view-admin.component';
import { CpcFactureListAdminComponent } from './cpc-facture-admin/list-admin/cpc-facture-list-admin.component';
import { CpcFactureAdminComponent } from './cpc-facture-admin/cpc-facture-admin.component';
import { DeclarationIsCreateAdminComponent } from './declaration-is-admin/create-admin/declaration-is-create-admin.component';
import { DeclarationIsEditAdminComponent } from './declaration-is-admin/edit-admin/declaration-is-edit-admin.component';
import { DeclarationIsViewAdminComponent } from './declaration-is-admin/view-admin/declaration-is-view-admin.component';
import { DeclarationIsListAdminComponent } from './declaration-is-admin/list-admin/declaration-is-list-admin.component';
import { DeclarationIsAdminComponent } from './declaration-is-admin/declaration-is-admin.component';
import { DeclarationIrEmployeCreateAdminComponent } from './declaration-ir-employe-admin/create-admin/declaration-ir-employe-create-admin.component';
import { DeclarationIrEmployeEditAdminComponent } from './declaration-ir-employe-admin/edit-admin/declaration-ir-employe-edit-admin.component';
import { DeclarationIrEmployeViewAdminComponent } from './declaration-ir-employe-admin/view-admin/declaration-ir-employe-view-admin.component';
import { DeclarationIrEmployeListAdminComponent } from './declaration-ir-employe-admin/list-admin/declaration-ir-employe-list-admin.component';
import { DeclarationIrEmployeAdminComponent } from './declaration-ir-employe-admin/declaration-ir-employe-admin.component';
import { PresidentSocieteCreateAdminComponent } from './president-societe-admin/create-admin/president-societe-create-admin.component';
import { PresidentSocieteEditAdminComponent } from './president-societe-admin/edit-admin/president-societe-edit-admin.component';
import { PresidentSocieteViewAdminComponent } from './president-societe-admin/view-admin/president-societe-view-admin.component';
import { PresidentSocieteListAdminComponent } from './president-societe-admin/list-admin/president-societe-list-admin.component';
import { PresidentSocieteAdminComponent } from './president-societe-admin/president-societe-admin.component';
import { DeclarationTvaCreateAdminComponent } from './declaration-tva-admin/create-admin/declaration-tva-create-admin.component';
import { DeclarationTvaEditAdminComponent } from './declaration-tva-admin/edit-admin/declaration-tva-edit-admin.component';
import { DeclarationTvaViewAdminComponent } from './declaration-tva-admin/view-admin/declaration-tva-view-admin.component';
import { DeclarationTvaListAdminComponent } from './declaration-tva-admin/list-admin/declaration-tva-list-admin.component';
import { DeclarationTvaAdminComponent } from './declaration-tva-admin/declaration-tva-admin.component';
import { CpcCreateAdminComponent } from './cpc-admin/create-admin/cpc-create-admin.component';
import { CpcEditAdminComponent } from './cpc-admin/edit-admin/cpc-edit-admin.component';
import { CpcViewAdminComponent } from './cpc-admin/view-admin/cpc-view-admin.component';
import { CpcListAdminComponent } from './cpc-admin/list-admin/cpc-list-admin.component';
import { CpcAdminComponent } from './cpc-admin/cpc-admin.component';
import { TypeSocieteCreateAdminComponent } from './type-societe-admin/create-admin/type-societe-create-admin.component';
import { TypeSocieteEditAdminComponent } from './type-societe-admin/edit-admin/type-societe-edit-admin.component';
import { TypeSocieteViewAdminComponent } from './type-societe-admin/view-admin/type-societe-view-admin.component';
import { TypeSocieteListAdminComponent } from './type-societe-admin/list-admin/type-societe-list-admin.component';
import { TypeSocieteAdminComponent } from './type-societe-admin/type-societe-admin.component';
import { CommentaireCreateAdminComponent } from './commentaire-admin/create-admin/commentaire-create-admin.component';
import { CommentaireEditAdminComponent } from './commentaire-admin/edit-admin/commentaire-edit-admin.component';
import { CommentaireViewAdminComponent } from './commentaire-admin/view-admin/commentaire-view-admin.component';
import { CommentaireListAdminComponent } from './commentaire-admin/list-admin/commentaire-list-admin.component';
import { CommentaireAdminComponent } from './commentaire-admin/commentaire-admin.component';
import { DeclarationCnssDetailCreateAdminComponent } from './declaration-cnss-detail-admin/create-admin/declaration-cnss-detail-create-admin.component';
import { DeclarationCnssDetailEditAdminComponent } from './declaration-cnss-detail-admin/edit-admin/declaration-cnss-detail-edit-admin.component';
import { DeclarationCnssDetailViewAdminComponent } from './declaration-cnss-detail-admin/view-admin/declaration-cnss-detail-view-admin.component';
import { DeclarationCnssDetailListAdminComponent } from './declaration-cnss-detail-admin/list-admin/declaration-cnss-detail-list-admin.component';
import { DeclarationCnssDetailAdminComponent } from './declaration-cnss-detail-admin/declaration-cnss-detail-admin.component';
import { TypeComptableCreateAdminComponent } from './type-comptable-admin/create-admin/type-comptable-create-admin.component';
import { TypeComptableEditAdminComponent } from './type-comptable-admin/edit-admin/type-comptable-edit-admin.component';
import { TypeComptableViewAdminComponent } from './type-comptable-admin/view-admin/type-comptable-view-admin.component';
import { TypeComptableListAdminComponent } from './type-comptable-admin/list-admin/type-comptable-list-admin.component';
import { TypeComptableAdminComponent } from './type-comptable-admin/type-comptable-admin.component';
import { PaiementDeclarationIsCreateAdminComponent } from './paiement-declaration-is-admin/create-admin/paiement-declaration-is-create-admin.component';
import { PaiementDeclarationIsEditAdminComponent } from './paiement-declaration-is-admin/edit-admin/paiement-declaration-is-edit-admin.component';
import { PaiementDeclarationIsViewAdminComponent } from './paiement-declaration-is-admin/view-admin/paiement-declaration-is-view-admin.component';
import { PaiementDeclarationIsListAdminComponent } from './paiement-declaration-is-admin/list-admin/paiement-declaration-is-list-admin.component';
import { PaiementDeclarationIsAdminComponent } from './paiement-declaration-is-admin/paiement-declaration-is-admin.component';
import { TypeDeclarationTvaCreateAdminComponent } from './type-declaration-tva-admin/create-admin/type-declaration-tva-create-admin.component';
import { TypeDeclarationTvaEditAdminComponent } from './type-declaration-tva-admin/edit-admin/type-declaration-tva-edit-admin.component';
import { TypeDeclarationTvaViewAdminComponent } from './type-declaration-tva-admin/view-admin/type-declaration-tva-view-admin.component';
import { TypeDeclarationTvaListAdminComponent } from './type-declaration-tva-admin/list-admin/type-declaration-tva-list-admin.component';
import { TypeDeclarationTvaAdminComponent } from './type-declaration-tva-admin/type-declaration-tva-admin.component';
import { TvaCreateAdminComponent } from './tva-admin/create-admin/tva-create-admin.component';
import { TvaEditAdminComponent } from './tva-admin/edit-admin/tva-edit-admin.component';
import { TvaViewAdminComponent } from './tva-admin/view-admin/tva-view-admin.component';
import { TvaListAdminComponent } from './tva-admin/list-admin/tva-list-admin.component';
import { TvaAdminComponent } from './tva-admin/tva-admin.component';
import { PaiementDeclarationIrCreateAdminComponent } from './paiement-declaration-ir-admin/create-admin/paiement-declaration-ir-create-admin.component';
import { PaiementDeclarationIrEditAdminComponent } from './paiement-declaration-ir-admin/edit-admin/paiement-declaration-ir-edit-admin.component';
import { PaiementDeclarationIrViewAdminComponent } from './paiement-declaration-ir-admin/view-admin/paiement-declaration-ir-view-admin.component';
import { PaiementDeclarationIrListAdminComponent } from './paiement-declaration-ir-admin/list-admin/paiement-declaration-ir-list-admin.component';
import { PaiementDeclarationIrAdminComponent } from './paiement-declaration-ir-admin/paiement-declaration-ir-admin.component';
import { DemandePieceJointeCreateAdminComponent } from './demande-piece-jointe-admin/create-admin/demande-piece-jointe-create-admin.component';
import { DemandePieceJointeEditAdminComponent } from './demande-piece-jointe-admin/edit-admin/demande-piece-jointe-edit-admin.component';
import { DemandePieceJointeViewAdminComponent } from './demande-piece-jointe-admin/view-admin/demande-piece-jointe-view-admin.component';
import { DemandePieceJointeListAdminComponent } from './demande-piece-jointe-admin/list-admin/demande-piece-jointe-list-admin.component';
import { DemandePieceJointeAdminComponent } from './demande-piece-jointe-admin/demande-piece-jointe-admin.component';
import { TypeTauxCnssCreateAdminComponent } from './type-taux-cnss-admin/create-admin/type-taux-cnss-create-admin.component';
import { TypeTauxCnssEditAdminComponent } from './type-taux-cnss-admin/edit-admin/type-taux-cnss-edit-admin.component';
import { TypeTauxCnssViewAdminComponent } from './type-taux-cnss-admin/view-admin/type-taux-cnss-view-admin.component';
import { TypeTauxCnssListAdminComponent } from './type-taux-cnss-admin/list-admin/type-taux-cnss-list-admin.component';
import { TypeTauxCnssAdminComponent } from './type-taux-cnss-admin/type-taux-cnss-admin.component';
import { DeclarationIrCreateAdminComponent } from './declaration-ir-admin/create-admin/declaration-ir-create-admin.component';
import { DeclarationIrEditAdminComponent } from './declaration-ir-admin/edit-admin/declaration-ir-edit-admin.component';
import { DeclarationIrViewAdminComponent } from './declaration-ir-admin/view-admin/declaration-ir-view-admin.component';
import { DeclarationIrListAdminComponent } from './declaration-ir-admin/list-admin/declaration-ir-list-admin.component';
import { DeclarationIrAdminComponent } from './declaration-ir-admin/declaration-ir-admin.component';
import { EmployeCreateAdminComponent } from './employe-admin/create-admin/employe-create-admin.component';
import { EmployeEditAdminComponent } from './employe-admin/edit-admin/employe-edit-admin.component';
import { EmployeViewAdminComponent } from './employe-admin/view-admin/employe-view-admin.component';
import { EmployeListAdminComponent } from './employe-admin/list-admin/employe-list-admin.component';
import { EmployeAdminComponent } from './employe-admin/employe-admin.component';
import { DeclarationCnssCreateAdminComponent } from './declaration-cnss-admin/create-admin/declaration-cnss-create-admin.component';
import { DeclarationCnssEditAdminComponent } from './declaration-cnss-admin/edit-admin/declaration-cnss-edit-admin.component';
import { DeclarationCnssViewAdminComponent } from './declaration-cnss-admin/view-admin/declaration-cnss-view-admin.component';
import { DeclarationCnssListAdminComponent } from './declaration-cnss-admin/list-admin/declaration-cnss-list-admin.component';
import { DeclarationCnssAdminComponent } from './declaration-cnss-admin/declaration-cnss-admin.component';
import { EtatDeclarationTvaCreateAdminComponent } from './etat-declaration-tva-admin/create-admin/etat-declaration-tva-create-admin.component';
import { EtatDeclarationTvaEditAdminComponent } from './etat-declaration-tva-admin/edit-admin/etat-declaration-tva-edit-admin.component';
import { EtatDeclarationTvaViewAdminComponent } from './etat-declaration-tva-admin/view-admin/etat-declaration-tva-view-admin.component';
import { EtatDeclarationTvaListAdminComponent } from './etat-declaration-tva-admin/list-admin/etat-declaration-tva-list-admin.component';
import { EtatDeclarationTvaAdminComponent } from './etat-declaration-tva-admin/etat-declaration-tva-admin.component';
import { PaiementDeclarationTvaCreateAdminComponent } from './paiement-declaration-tva-admin/create-admin/paiement-declaration-tva-create-admin.component';
import { PaiementDeclarationTvaEditAdminComponent } from './paiement-declaration-tva-admin/edit-admin/paiement-declaration-tva-edit-admin.component';
import { PaiementDeclarationTvaViewAdminComponent } from './paiement-declaration-tva-admin/view-admin/paiement-declaration-tva-view-admin.component';
import { PaiementDeclarationTvaListAdminComponent } from './paiement-declaration-tva-admin/list-admin/paiement-declaration-tva-list-admin.component';
import { PaiementDeclarationTvaAdminComponent } from './paiement-declaration-tva-admin/paiement-declaration-tva-admin.component';
import { PrelevementSocialEmployeCreateAdminComponent } from './prelevement-social-employe-admin/create-admin/prelevement-social-employe-create-admin.component';
import { PrelevementSocialEmployeEditAdminComponent } from './prelevement-social-employe-admin/edit-admin/prelevement-social-employe-edit-admin.component';
import { PrelevementSocialEmployeViewAdminComponent } from './prelevement-social-employe-admin/view-admin/prelevement-social-employe-view-admin.component';
import { PrelevementSocialEmployeListAdminComponent } from './prelevement-social-employe-admin/list-admin/prelevement-social-employe-list-admin.component';
import { PrelevementSocialEmployeAdminComponent } from './prelevement-social-employe-admin/prelevement-social-employe-admin.component';
import { FactureCreateAdminComponent } from './facture-admin/create-admin/facture-create-admin.component';
import { FactureEditAdminComponent } from './facture-admin/edit-admin/facture-edit-admin.component';
import { FactureViewAdminComponent } from './facture-admin/view-admin/facture-view-admin.component';
import { FactureListAdminComponent } from './facture-admin/list-admin/facture-list-admin.component';
import { FactureAdminComponent } from './facture-admin/facture-admin.component';
import { EtatFactureCreateAdminComponent } from './etat-facture-admin/create-admin/etat-facture-create-admin.component';
import { EtatFactureEditAdminComponent } from './etat-facture-admin/edit-admin/etat-facture-edit-admin.component';
import { EtatFactureViewAdminComponent } from './etat-facture-admin/view-admin/etat-facture-view-admin.component';
import { EtatFactureListAdminComponent } from './etat-facture-admin/list-admin/etat-facture-list-admin.component';
import { EtatFactureAdminComponent } from './etat-facture-admin/etat-facture-admin.component';
import { EtatDeclarationIsCreateAdminComponent } from './etat-declaration-is-admin/create-admin/etat-declaration-is-create-admin.component';
import { EtatDeclarationIsEditAdminComponent } from './etat-declaration-is-admin/edit-admin/etat-declaration-is-edit-admin.component';
import { EtatDeclarationIsViewAdminComponent } from './etat-declaration-is-admin/view-admin/etat-declaration-is-view-admin.component';
import { EtatDeclarationIsListAdminComponent } from './etat-declaration-is-admin/list-admin/etat-declaration-is-list-admin.component';
import { EtatDeclarationIsAdminComponent } from './etat-declaration-is-admin/etat-declaration-is-admin.component';
import { CompteComptableCreateAdminComponent } from './compte-comptable-admin/create-admin/compte-comptable-create-admin.component';
import { CompteComptableEditAdminComponent } from './compte-comptable-admin/edit-admin/compte-comptable-edit-admin.component';
import { CompteComptableViewAdminComponent } from './compte-comptable-admin/view-admin/compte-comptable-view-admin.component';
import { CompteComptableListAdminComponent } from './compte-comptable-admin/list-admin/compte-comptable-list-admin.component';
import { CompteComptableAdminComponent } from './compte-comptable-admin/compte-comptable-admin.component';
import { PrelevementSocialCreateAdminComponent } from './prelevement-social-admin/create-admin/prelevement-social-create-admin.component';
import { PrelevementSocialEditAdminComponent } from './prelevement-social-admin/edit-admin/prelevement-social-edit-admin.component';
import { PrelevementSocialViewAdminComponent } from './prelevement-social-admin/view-admin/prelevement-social-view-admin.component';
import { PrelevementSocialListAdminComponent } from './prelevement-social-admin/list-admin/prelevement-social-list-admin.component';
import { PrelevementSocialAdminComponent } from './prelevement-social-admin/prelevement-social-admin.component';
import { ChercheurCreateAdminComponent } from './chercheur-admin/create-admin/chercheur-create-admin.component';
import { ChercheurEditAdminComponent } from './chercheur-admin/edit-admin/chercheur-edit-admin.component';
import { ChercheurViewAdminComponent } from './chercheur-admin/view-admin/chercheur-view-admin.component';
import { ChercheurListAdminComponent } from './chercheur-admin/list-admin/chercheur-list-admin.component';
import { ChercheurAdminComponent } from './chercheur-admin/chercheur-admin.component';
import { SousClasseComptableCreateAdminComponent } from './sous-classe-comptable-admin/create-admin/sous-classe-comptable-create-admin.component';
import { SousClasseComptableEditAdminComponent } from './sous-classe-comptable-admin/edit-admin/sous-classe-comptable-edit-admin.component';
import { SousClasseComptableViewAdminComponent } from './sous-classe-comptable-admin/view-admin/sous-classe-comptable-view-admin.component';
import { SousClasseComptableListAdminComponent } from './sous-classe-comptable-admin/list-admin/sous-classe-comptable-list-admin.component';
import { SousClasseComptableAdminComponent } from './sous-classe-comptable-admin/sous-classe-comptable-admin.component';
import { SocieteCreateAdminComponent } from './societe-admin/create-admin/societe-create-admin.component';
import { SocieteEditAdminComponent } from './societe-admin/edit-admin/societe-edit-admin.component';
import { SocieteViewAdminComponent } from './societe-admin/view-admin/societe-view-admin.component';
import { SocieteListAdminComponent } from './societe-admin/list-admin/societe-list-admin.component';
import { SocieteAdminComponent } from './societe-admin/societe-admin.component';
import { ComptableCreateAdminComponent } from './comptable-admin/create-admin/comptable-create-admin.component';
import { ComptableEditAdminComponent } from './comptable-admin/edit-admin/comptable-edit-admin.component';
import { ComptableViewAdminComponent } from './comptable-admin/view-admin/comptable-view-admin.component';
import { ComptableListAdminComponent } from './comptable-admin/list-admin/comptable-list-admin.component';
import { ComptableAdminComponent } from './comptable-admin/comptable-admin.component';
import { TauxIrCreateAdminComponent } from './taux-ir-admin/create-admin/taux-ir-create-admin.component';
import { TauxIrEditAdminComponent } from './taux-ir-admin/edit-admin/taux-ir-edit-admin.component';
import { TauxIrViewAdminComponent } from './taux-ir-admin/view-admin/taux-ir-view-admin.component';
import { TauxIrListAdminComponent } from './taux-ir-admin/list-admin/taux-ir-list-admin.component';
import { TauxIrAdminComponent } from './taux-ir-admin/taux-ir-admin.component';
import { FacturePieceJointeCreateAdminComponent } from './facture-piece-jointe-admin/create-admin/facture-piece-jointe-create-admin.component';
import { FacturePieceJointeEditAdminComponent } from './facture-piece-jointe-admin/edit-admin/facture-piece-jointe-edit-admin.component';
import { FacturePieceJointeViewAdminComponent } from './facture-piece-jointe-admin/view-admin/facture-piece-jointe-view-admin.component';
import { FacturePieceJointeListAdminComponent } from './facture-piece-jointe-admin/list-admin/facture-piece-jointe-list-admin.component';
import { FacturePieceJointeAdminComponent } from './facture-piece-jointe-admin/facture-piece-jointe-admin.component';
import { EtatDemandeCreateAdminComponent } from './etat-demande-admin/create-admin/etat-demande-create-admin.component';
import { EtatDemandeEditAdminComponent } from './etat-demande-admin/edit-admin/etat-demande-edit-admin.component';
import { EtatDemandeViewAdminComponent } from './etat-demande-admin/view-admin/etat-demande-view-admin.component';
import { EtatDemandeListAdminComponent } from './etat-demande-admin/list-admin/etat-demande-list-admin.component';
import { EtatDemandeAdminComponent } from './etat-demande-admin/etat-demande-admin.component';
import { TypeEmployeCreateAdminComponent } from './type-employe-admin/create-admin/type-employe-create-admin.component';
import { TypeEmployeEditAdminComponent } from './type-employe-admin/edit-admin/type-employe-edit-admin.component';
import { TypeEmployeViewAdminComponent } from './type-employe-admin/view-admin/type-employe-view-admin.component';
import { TypeEmployeListAdminComponent } from './type-employe-admin/list-admin/type-employe-list-admin.component';
import { TypeEmployeAdminComponent } from './type-employe-admin/type-employe-admin.component';
import { TauxIsCreateAdminComponent } from './taux-is-admin/create-admin/taux-is-create-admin.component';
import { TauxIsEditAdminComponent } from './taux-is-admin/edit-admin/taux-is-edit-admin.component';
import { TauxIsViewAdminComponent } from './taux-is-admin/view-admin/taux-is-view-admin.component';
import { TauxIsListAdminComponent } from './taux-is-admin/list-admin/taux-is-list-admin.component';
import { TauxIsAdminComponent } from './taux-is-admin/taux-is-admin.component';
import { ClasseComptableCreateAdminComponent } from './classe-comptable-admin/create-admin/classe-comptable-create-admin.component';
import { ClasseComptableEditAdminComponent } from './classe-comptable-admin/edit-admin/classe-comptable-edit-admin.component';
import { ClasseComptableViewAdminComponent } from './classe-comptable-admin/view-admin/classe-comptable-view-admin.component';
import { ClasseComptableListAdminComponent } from './classe-comptable-admin/list-admin/classe-comptable-list-admin.component';
import { ClasseComptableAdminComponent } from './classe-comptable-admin/classe-comptable-admin.component';
import { AcompteCreateAdminComponent } from './acompte-admin/create-admin/acompte-create-admin.component';
import { AcompteEditAdminComponent } from './acompte-admin/edit-admin/acompte-edit-admin.component';
import { AcompteViewAdminComponent } from './acompte-admin/view-admin/acompte-view-admin.component';
import { AcompteListAdminComponent } from './acompte-admin/list-admin/acompte-list-admin.component';
import { AcompteAdminComponent } from './acompte-admin/acompte-admin.component';
import { DemandeCreateAdminComponent } from './demande-admin/create-admin/demande-create-admin.component';
import { DemandeEditAdminComponent } from './demande-admin/edit-admin/demande-edit-admin.component';
import { DemandeViewAdminComponent } from './demande-admin/view-admin/demande-view-admin.component';
import { DemandeListAdminComponent } from './demande-admin/list-admin/demande-list-admin.component';
import { DemandeAdminComponent } from './demande-admin/demande-admin.component';
import { EtatDeclarationIrCreateAdminComponent } from './etat-declaration-ir-admin/create-admin/etat-declaration-ir-create-admin.component';
import { EtatDeclarationIrEditAdminComponent } from './etat-declaration-ir-admin/edit-admin/etat-declaration-ir-edit-admin.component';
import { EtatDeclarationIrViewAdminComponent } from './etat-declaration-ir-admin/view-admin/etat-declaration-ir-view-admin.component';
import { EtatDeclarationIrListAdminComponent } from './etat-declaration-ir-admin/list-admin/etat-declaration-ir-list-admin.component';
import { EtatDeclarationIrAdminComponent } from './etat-declaration-ir-admin/etat-declaration-ir-admin.component';
import { TauxCnssCreateAdminComponent } from './taux-cnss-admin/create-admin/taux-cnss-create-admin.component';
import { TauxCnssEditAdminComponent } from './taux-cnss-admin/edit-admin/taux-cnss-edit-admin.component';
import { TauxCnssViewAdminComponent } from './taux-cnss-admin/view-admin/taux-cnss-view-admin.component';
import { TauxCnssListAdminComponent } from './taux-cnss-admin/list-admin/taux-cnss-list-admin.component';
import { TauxCnssAdminComponent } from './taux-cnss-admin/taux-cnss-admin.component';

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
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';


@NgModule({
    declarations: [
        DashboardAdminComponent,
        TauxIsConfigCreateAdminComponent,
        TauxIsConfigListAdminComponent,
        TauxIsConfigViewAdminComponent,
        TauxIsConfigEditAdminComponent,
        TauxIsConfigAdminComponent,
        EtatPaiementCreateAdminComponent,
        EtatPaiementListAdminComponent,
        EtatPaiementViewAdminComponent,
        EtatPaiementEditAdminComponent,
        EtatPaiementAdminComponent,
        TypeOperationFactureCreateAdminComponent,
        TypeOperationFactureListAdminComponent,
        TypeOperationFactureViewAdminComponent,
        TypeOperationFactureEditAdminComponent,
        TypeOperationFactureAdminComponent,
        CpcFactureCreateAdminComponent,
        CpcFactureListAdminComponent,
        CpcFactureViewAdminComponent,
        CpcFactureEditAdminComponent,
        CpcFactureAdminComponent,
        DeclarationIsCreateAdminComponent,
        DeclarationIsListAdminComponent,
        DeclarationIsViewAdminComponent,
        DeclarationIsEditAdminComponent,
        DeclarationIsAdminComponent,
        DeclarationIrEmployeCreateAdminComponent,
        DeclarationIrEmployeListAdminComponent,
        DeclarationIrEmployeViewAdminComponent,
        DeclarationIrEmployeEditAdminComponent,
        DeclarationIrEmployeAdminComponent,
        PresidentSocieteCreateAdminComponent,
        PresidentSocieteListAdminComponent,
        PresidentSocieteViewAdminComponent,
        PresidentSocieteEditAdminComponent,
        PresidentSocieteAdminComponent,
        DeclarationTvaCreateAdminComponent,
        DeclarationTvaListAdminComponent,
        DeclarationTvaViewAdminComponent,
        DeclarationTvaEditAdminComponent,
        DeclarationTvaAdminComponent,
        CpcCreateAdminComponent,
        CpcListAdminComponent,
        CpcViewAdminComponent,
        CpcEditAdminComponent,
        CpcAdminComponent,
        TypeSocieteCreateAdminComponent,
        TypeSocieteListAdminComponent,
        TypeSocieteViewAdminComponent,
        TypeSocieteEditAdminComponent,
        TypeSocieteAdminComponent,
        CommentaireCreateAdminComponent,
        CommentaireListAdminComponent,
        CommentaireViewAdminComponent,
        CommentaireEditAdminComponent,
        CommentaireAdminComponent,
        DeclarationCnssDetailCreateAdminComponent,
        DeclarationCnssDetailListAdminComponent,
        DeclarationCnssDetailViewAdminComponent,
        DeclarationCnssDetailEditAdminComponent,
        DeclarationCnssDetailAdminComponent,
        TypeComptableCreateAdminComponent,
        TypeComptableListAdminComponent,
        TypeComptableViewAdminComponent,
        TypeComptableEditAdminComponent,
        TypeComptableAdminComponent,
        PaiementDeclarationIsCreateAdminComponent,
        PaiementDeclarationIsListAdminComponent,
        PaiementDeclarationIsViewAdminComponent,
        PaiementDeclarationIsEditAdminComponent,
        PaiementDeclarationIsAdminComponent,
        TypeDeclarationTvaCreateAdminComponent,
        TypeDeclarationTvaListAdminComponent,
        TypeDeclarationTvaViewAdminComponent,
        TypeDeclarationTvaEditAdminComponent,
        TypeDeclarationTvaAdminComponent,
        TvaCreateAdminComponent,
        TvaListAdminComponent,
        TvaViewAdminComponent,
        TvaEditAdminComponent,
        TvaAdminComponent,
        PaiementDeclarationIrCreateAdminComponent,
        PaiementDeclarationIrListAdminComponent,
        PaiementDeclarationIrViewAdminComponent,
        PaiementDeclarationIrEditAdminComponent,
        PaiementDeclarationIrAdminComponent,
        DemandePieceJointeCreateAdminComponent,
        DemandePieceJointeListAdminComponent,
        DemandePieceJointeViewAdminComponent,
        DemandePieceJointeEditAdminComponent,
        DemandePieceJointeAdminComponent,
        TypeTauxCnssCreateAdminComponent,
        TypeTauxCnssListAdminComponent,
        TypeTauxCnssViewAdminComponent,
        TypeTauxCnssEditAdminComponent,
        TypeTauxCnssAdminComponent,
        DeclarationIrCreateAdminComponent,
        DeclarationIrListAdminComponent,
        DeclarationIrViewAdminComponent,
        DeclarationIrEditAdminComponent,
        DeclarationIrAdminComponent,
        EmployeCreateAdminComponent,
        EmployeListAdminComponent,
        EmployeViewAdminComponent,
        EmployeEditAdminComponent,
        EmployeAdminComponent,
        DeclarationCnssCreateAdminComponent,
        DeclarationCnssListAdminComponent,
        DeclarationCnssViewAdminComponent,
        DeclarationCnssEditAdminComponent,
        DeclarationCnssAdminComponent,
        EtatDeclarationTvaCreateAdminComponent,
        EtatDeclarationTvaListAdminComponent,
        EtatDeclarationTvaViewAdminComponent,
        EtatDeclarationTvaEditAdminComponent,
        EtatDeclarationTvaAdminComponent,
        PaiementDeclarationTvaCreateAdminComponent,
        PaiementDeclarationTvaListAdminComponent,
        PaiementDeclarationTvaViewAdminComponent,
        PaiementDeclarationTvaEditAdminComponent,
        PaiementDeclarationTvaAdminComponent,
        PrelevementSocialEmployeCreateAdminComponent,
        PrelevementSocialEmployeListAdminComponent,
        PrelevementSocialEmployeViewAdminComponent,
        PrelevementSocialEmployeEditAdminComponent,
        PrelevementSocialEmployeAdminComponent,
        FactureCreateAdminComponent,
        FactureListAdminComponent,
        FactureViewAdminComponent,
        FactureEditAdminComponent,
        FactureAdminComponent,
        EtatFactureCreateAdminComponent,
        EtatFactureListAdminComponent,
        EtatFactureViewAdminComponent,
        EtatFactureEditAdminComponent,
        EtatFactureAdminComponent,
        EtatDeclarationIsCreateAdminComponent,
        EtatDeclarationIsListAdminComponent,
        EtatDeclarationIsViewAdminComponent,
        EtatDeclarationIsEditAdminComponent,
        EtatDeclarationIsAdminComponent,
        CompteComptableCreateAdminComponent,
        CompteComptableListAdminComponent,
        CompteComptableViewAdminComponent,
        CompteComptableEditAdminComponent,
        CompteComptableAdminComponent,
        PrelevementSocialCreateAdminComponent,
        PrelevementSocialListAdminComponent,
        PrelevementSocialViewAdminComponent,
        PrelevementSocialEditAdminComponent,
        PrelevementSocialAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        SousClasseComptableCreateAdminComponent,
        SousClasseComptableListAdminComponent,
        SousClasseComptableViewAdminComponent,
        SousClasseComptableEditAdminComponent,
        SousClasseComptableAdminComponent,
        SocieteCreateAdminComponent,
        SocieteListAdminComponent,
        SocieteViewAdminComponent,
        SocieteEditAdminComponent,
        SocieteAdminComponent,
        ComptableCreateAdminComponent,
        ComptableListAdminComponent,
        ComptableViewAdminComponent,
        ComptableEditAdminComponent,
        ComptableAdminComponent,
        TauxIrCreateAdminComponent,
        TauxIrListAdminComponent,
        TauxIrViewAdminComponent,
        TauxIrEditAdminComponent,
        TauxIrAdminComponent,
        FacturePieceJointeCreateAdminComponent,
        FacturePieceJointeListAdminComponent,
        FacturePieceJointeViewAdminComponent,
        FacturePieceJointeEditAdminComponent,
        FacturePieceJointeAdminComponent,
        EtatDemandeCreateAdminComponent,
        EtatDemandeListAdminComponent,
        EtatDemandeViewAdminComponent,
        EtatDemandeEditAdminComponent,
        EtatDemandeAdminComponent,
        TypeEmployeCreateAdminComponent,
        TypeEmployeListAdminComponent,
        TypeEmployeViewAdminComponent,
        TypeEmployeEditAdminComponent,
        TypeEmployeAdminComponent,
        TauxIsCreateAdminComponent,
        TauxIsListAdminComponent,
        TauxIsViewAdminComponent,
        TauxIsEditAdminComponent,
        TauxIsAdminComponent,
        ClasseComptableCreateAdminComponent,
        ClasseComptableListAdminComponent,
        ClasseComptableViewAdminComponent,
        ClasseComptableEditAdminComponent,
        ClasseComptableAdminComponent,
        AcompteCreateAdminComponent,
        AcompteListAdminComponent,
        AcompteViewAdminComponent,
        AcompteEditAdminComponent,
        AcompteAdminComponent,
        DemandeCreateAdminComponent,
        DemandeListAdminComponent,
        DemandeViewAdminComponent,
        DemandeEditAdminComponent,
        DemandeAdminComponent,
        EtatDeclarationIrCreateAdminComponent,
        EtatDeclarationIrListAdminComponent,
        EtatDeclarationIrViewAdminComponent,
        EtatDeclarationIrEditAdminComponent,
        EtatDeclarationIrAdminComponent,
        TauxCnssCreateAdminComponent,
        TauxCnssListAdminComponent,
        TauxCnssViewAdminComponent,
        TauxCnssEditAdminComponent,
        TauxCnssAdminComponent,
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
        TauxIsConfigCreateAdminComponent,
        TauxIsConfigListAdminComponent,
        TauxIsConfigViewAdminComponent,
        TauxIsConfigEditAdminComponent,
        TauxIsConfigAdminComponent,
        EtatPaiementCreateAdminComponent,
        EtatPaiementListAdminComponent,
        EtatPaiementViewAdminComponent,
        EtatPaiementEditAdminComponent,
        EtatPaiementAdminComponent,
        TypeOperationFactureCreateAdminComponent,
        TypeOperationFactureListAdminComponent,
        TypeOperationFactureViewAdminComponent,
        TypeOperationFactureEditAdminComponent,
        TypeOperationFactureAdminComponent,
        CpcFactureCreateAdminComponent,
        CpcFactureListAdminComponent,
        CpcFactureViewAdminComponent,
        CpcFactureEditAdminComponent,
        CpcFactureAdminComponent,
        DeclarationIsCreateAdminComponent,
        DeclarationIsListAdminComponent,
        DeclarationIsViewAdminComponent,
        DeclarationIsEditAdminComponent,
        DeclarationIsAdminComponent,
        DeclarationIrEmployeCreateAdminComponent,
        DeclarationIrEmployeListAdminComponent,
        DeclarationIrEmployeViewAdminComponent,
        DeclarationIrEmployeEditAdminComponent,
        DeclarationIrEmployeAdminComponent,
        PresidentSocieteCreateAdminComponent,
        PresidentSocieteListAdminComponent,
        PresidentSocieteViewAdminComponent,
        PresidentSocieteEditAdminComponent,
        PresidentSocieteAdminComponent,
        DeclarationTvaCreateAdminComponent,
        DeclarationTvaListAdminComponent,
        DeclarationTvaViewAdminComponent,
        DeclarationTvaEditAdminComponent,
        DeclarationTvaAdminComponent,
        CpcCreateAdminComponent,
        CpcListAdminComponent,
        CpcViewAdminComponent,
        CpcEditAdminComponent,
        CpcAdminComponent,
        TypeSocieteCreateAdminComponent,
        TypeSocieteListAdminComponent,
        TypeSocieteViewAdminComponent,
        TypeSocieteEditAdminComponent,
        TypeSocieteAdminComponent,
        CommentaireCreateAdminComponent,
        CommentaireListAdminComponent,
        CommentaireViewAdminComponent,
        CommentaireEditAdminComponent,
        CommentaireAdminComponent,
        DeclarationCnssDetailCreateAdminComponent,
        DeclarationCnssDetailListAdminComponent,
        DeclarationCnssDetailViewAdminComponent,
        DeclarationCnssDetailEditAdminComponent,
        DeclarationCnssDetailAdminComponent,
        TypeComptableCreateAdminComponent,
        TypeComptableListAdminComponent,
        TypeComptableViewAdminComponent,
        TypeComptableEditAdminComponent,
        TypeComptableAdminComponent,
        PaiementDeclarationIsCreateAdminComponent,
        PaiementDeclarationIsListAdminComponent,
        PaiementDeclarationIsViewAdminComponent,
        PaiementDeclarationIsEditAdminComponent,
        PaiementDeclarationIsAdminComponent,
        TypeDeclarationTvaCreateAdminComponent,
        TypeDeclarationTvaListAdminComponent,
        TypeDeclarationTvaViewAdminComponent,
        TypeDeclarationTvaEditAdminComponent,
        TypeDeclarationTvaAdminComponent,
        TvaCreateAdminComponent,
        TvaListAdminComponent,
        TvaViewAdminComponent,
        TvaEditAdminComponent,
        TvaAdminComponent,
        PaiementDeclarationIrCreateAdminComponent,
        PaiementDeclarationIrListAdminComponent,
        PaiementDeclarationIrViewAdminComponent,
        PaiementDeclarationIrEditAdminComponent,
        PaiementDeclarationIrAdminComponent,
        DemandePieceJointeCreateAdminComponent,
        DemandePieceJointeListAdminComponent,
        DemandePieceJointeViewAdminComponent,
        DemandePieceJointeEditAdminComponent,
        DemandePieceJointeAdminComponent,
        TypeTauxCnssCreateAdminComponent,
        TypeTauxCnssListAdminComponent,
        TypeTauxCnssViewAdminComponent,
        TypeTauxCnssEditAdminComponent,
        TypeTauxCnssAdminComponent,
        DeclarationIrCreateAdminComponent,
        DeclarationIrListAdminComponent,
        DeclarationIrViewAdminComponent,
        DeclarationIrEditAdminComponent,
        DeclarationIrAdminComponent,
        EmployeCreateAdminComponent,
        EmployeListAdminComponent,
        EmployeViewAdminComponent,
        EmployeEditAdminComponent,
        EmployeAdminComponent,
        DeclarationCnssCreateAdminComponent,
        DeclarationCnssListAdminComponent,
        DeclarationCnssViewAdminComponent,
        DeclarationCnssEditAdminComponent,
        DeclarationCnssAdminComponent,
        EtatDeclarationTvaCreateAdminComponent,
        EtatDeclarationTvaListAdminComponent,
        EtatDeclarationTvaViewAdminComponent,
        EtatDeclarationTvaEditAdminComponent,
        EtatDeclarationTvaAdminComponent,
        PaiementDeclarationTvaCreateAdminComponent,
        PaiementDeclarationTvaListAdminComponent,
        PaiementDeclarationTvaViewAdminComponent,
        PaiementDeclarationTvaEditAdminComponent,
        PaiementDeclarationTvaAdminComponent,
        PrelevementSocialEmployeCreateAdminComponent,
        PrelevementSocialEmployeListAdminComponent,
        PrelevementSocialEmployeViewAdminComponent,
        PrelevementSocialEmployeEditAdminComponent,
        PrelevementSocialEmployeAdminComponent,
        FactureCreateAdminComponent,
        FactureListAdminComponent,
        FactureViewAdminComponent,
        FactureEditAdminComponent,
        FactureAdminComponent,
        EtatFactureCreateAdminComponent,
        EtatFactureListAdminComponent,
        EtatFactureViewAdminComponent,
        EtatFactureEditAdminComponent,
        EtatFactureAdminComponent,
        EtatDeclarationIsCreateAdminComponent,
        EtatDeclarationIsListAdminComponent,
        EtatDeclarationIsViewAdminComponent,
        EtatDeclarationIsEditAdminComponent,
        EtatDeclarationIsAdminComponent,
        CompteComptableCreateAdminComponent,
        CompteComptableListAdminComponent,
        CompteComptableViewAdminComponent,
        CompteComptableEditAdminComponent,
        CompteComptableAdminComponent,
        PrelevementSocialCreateAdminComponent,
        PrelevementSocialListAdminComponent,
        PrelevementSocialViewAdminComponent,
        PrelevementSocialEditAdminComponent,
        PrelevementSocialAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        SousClasseComptableCreateAdminComponent,
        SousClasseComptableListAdminComponent,
        SousClasseComptableViewAdminComponent,
        SousClasseComptableEditAdminComponent,
        SousClasseComptableAdminComponent,
        SocieteCreateAdminComponent,
        SocieteListAdminComponent,
        SocieteViewAdminComponent,
        SocieteEditAdminComponent,
        SocieteAdminComponent,
        ComptableCreateAdminComponent,
        ComptableListAdminComponent,
        ComptableViewAdminComponent,
        ComptableEditAdminComponent,
        ComptableAdminComponent,
        TauxIrCreateAdminComponent,
        TauxIrListAdminComponent,
        TauxIrViewAdminComponent,
        TauxIrEditAdminComponent,
        TauxIrAdminComponent,
        FacturePieceJointeCreateAdminComponent,
        FacturePieceJointeListAdminComponent,
        FacturePieceJointeViewAdminComponent,
        FacturePieceJointeEditAdminComponent,
        FacturePieceJointeAdminComponent,
        EtatDemandeCreateAdminComponent,
        EtatDemandeListAdminComponent,
        EtatDemandeViewAdminComponent,
        EtatDemandeEditAdminComponent,
        EtatDemandeAdminComponent,
        TypeEmployeCreateAdminComponent,
        TypeEmployeListAdminComponent,
        TypeEmployeViewAdminComponent,
        TypeEmployeEditAdminComponent,
        TypeEmployeAdminComponent,
        TauxIsCreateAdminComponent,
        TauxIsListAdminComponent,
        TauxIsViewAdminComponent,
        TauxIsEditAdminComponent,
        TauxIsAdminComponent,
        ClasseComptableCreateAdminComponent,
        ClasseComptableListAdminComponent,
        ClasseComptableViewAdminComponent,
        ClasseComptableEditAdminComponent,
        ClasseComptableAdminComponent,
        AcompteCreateAdminComponent,
        AcompteListAdminComponent,
        AcompteViewAdminComponent,
        AcompteEditAdminComponent,
        AcompteAdminComponent,
        DemandeCreateAdminComponent,
        DemandeListAdminComponent,
        DemandeViewAdminComponent,
        DemandeEditAdminComponent,
        DemandeAdminComponent,
        EtatDeclarationIrCreateAdminComponent,
        EtatDeclarationIrListAdminComponent,
        EtatDeclarationIrViewAdminComponent,
        EtatDeclarationIrEditAdminComponent,
        EtatDeclarationIrAdminComponent,
        TauxCnssCreateAdminComponent,
        TauxCnssListAdminComponent,
        TauxCnssViewAdminComponent,
        TauxCnssEditAdminComponent,
        TauxCnssAdminComponent,
    ]
})
export class ImpotAdminModule { }
