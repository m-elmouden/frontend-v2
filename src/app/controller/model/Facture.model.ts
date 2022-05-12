import {SocieteVo} from './Societe.model';
import {DeclarationTvaVo} from './DeclarationTva.model';
import {CpcFactureVo} from './CpcFacture.model';
import {DemandeVo} from './Demande.model';
import {TypeOperationFactureVo} from './TypeOperationFacture.model';
import {ClasseComptableVo} from './ClasseComptable.model';
import {CompteComptableVo} from './CompteComptable.model';
import {EtatFactureVo} from './EtatFacture.model';
import {DeclarationIsVo} from './DeclarationIs.model';
import {EtatPaiementVo} from './EtatPaiement.model';
import {TvaVo} from './Tva.model';
import {FacturePieceJointeVo} from './FacturePieceJointe.model';



export class FactureVo {

    public id: number;

    public reference: string;
    public libelle: string;
     public montantHorsTaxe: number;
    public dateOperation: Date;
     public annee: number;
     public mois: number;
     public trimestre: number;
     public montantTtc: number;
     public montantTva: number;
    public credit: string;
    public debit: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public montantHorsTaxeMax: string ;
                public montantHorsTaxeMin: string ;
                public dateOperationMax: string ;
                public dateOperationMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
                public moisMax: string ;
                public moisMin: string ;
                public trimestreMax: string ;
                public trimestreMin: string ;
                public montantTtcMax: string ;
                public montantTtcMin: string ;
                public montantTvaMax: string ;
                public montantTvaMin: string ;
                public facturePieceJointeMax: string ;
                public facturePieceJointeMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public tvaVo: TvaVo ;
      public typeOperationFactureVo: TypeOperationFactureVo ;
      public etatFactureVo: EtatFactureVo ;
      public etatPaiementVo: EtatPaiementVo ;
      public societeVo: SocieteVo ;
      public compteComptableVo: CompteComptableVo ;
      public declarationIsVo: DeclarationIsVo ;
      public declarationTvaVo: DeclarationTvaVo ;
      public demandeVo: DemandeVo ;
      public classeComptableVo: ClasseComptableVo ;
      public cpcFactureVo: CpcFactureVo ;
      public facturePieceJointeVo: FacturePieceJointeVo;

}
