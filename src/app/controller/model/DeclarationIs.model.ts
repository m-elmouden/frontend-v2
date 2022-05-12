import {SocieteVo} from './Societe.model';
import {EtatDeclarationIsVo} from './EtatDeclarationIs.model';
import {TauxIsConfigVo} from './TauxIsConfig.model';
import {TauxIsVo} from './TauxIs.model';
import {PaiementDeclarationIsVo} from './PaiementDeclarationIs.model';



export class DeclarationIsVo {

    public id: number;

    public reference: string;
     public annee: number;
     public totalHtProduit: number;
     public totalHtCharge: number;
     public totalHtDifference: number;
     public montantIsCalcule: number;
     public montantIsAPaye: number;
     public totalAPaye: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public anneeMax: string ;
                public anneeMin: string ;
                public totalHtProduitMax: string ;
                public totalHtProduitMin: string ;
                public totalHtChargeMax: string ;
                public totalHtChargeMin: string ;
                public totalHtDifferenceMax: string ;
                public totalHtDifferenceMin: string ;
                public montantIsCalculeMax: string ;
                public montantIsCalculeMin: string ;
                public montantIsAPayeMax: string ;
                public montantIsAPayeMin: string ;
                public totalAPayeMax: string ;
                public totalAPayeMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public societeVo: SocieteVo ;
      public tauxIsVo: TauxIsVo ;
      public tauxIsConfigVo: TauxIsConfigVo ;
      public etatDeclarationIsVo: EtatDeclarationIsVo ;
      public paiementDeclarationIsVo: PaiementDeclarationIsVo ;

}
