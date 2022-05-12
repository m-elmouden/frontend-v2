import {SocieteVo} from './Societe.model';
import {EtatDemandeVo} from './EtatDemande.model';
import {DemandePieceJointeVo} from './DemandePieceJointe.model';
import {FactureVo} from './Facture.model';
import {CommentaireVo} from './Commentaire.model';
import {ComptableVo} from './Comptable.model';



export class DemandeVo {

    public id: number;

    public reference: string;
    public operation: string;
    public dateDemande: Date;
     public annee: number;
     public mois: number;
     public trimestre: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateDemandeMax: string ;
                public dateDemandeMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
                public moisMax: string ;
                public moisMin: string ;
                public trimestreMax: string ;
                public trimestreMin: string ;
                public demandePieceJointesMax: string ;
                public demandePieceJointesMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public societeVo: SocieteVo ;
      public comptableVo: ComptableVo ;
      public etatDemandeVo: EtatDemandeVo ;
      public facturesVo: Array<FactureVo>;
      public demandePieceJointesVo: Array<DemandePieceJointeVo>;
      public commentairesVo: Array<CommentaireVo>;

}
