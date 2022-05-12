import {SocieteVo} from './Societe.model';
import {PaiementDeclarationTvaVo} from './PaiementDeclarationTva.model';
import {EtatDeclarationTvaVo} from './EtatDeclarationTva.model';
import {TypeDeclarationTvaVo} from './TypeDeclarationTva.model';



export class DeclarationTvaVo {

    public id: number;

    public reference: string;
     public tvacollecter: number;
     public tvaperdue: number;
     public differenceTva: number;
     public montantTvaCalcule: number;
     public montantTvaAPaye: number;
     public annee: number;
     public mois: number;
     public trimestre: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public tvacollecterMax: string ;
                public tvacollecterMin: string ;
                public tvaperdueMax: string ;
                public tvaperdueMin: string ;
                public differenceTvaMax: string ;
                public differenceTvaMin: string ;
                public montantTvaCalculeMax: string ;
                public montantTvaCalculeMin: string ;
                public montantTvaAPayeMax: string ;
                public montantTvaAPayeMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
                public moisMax: string ;
                public moisMin: string ;
                public trimestreMax: string ;
                public trimestreMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public societeVo: SocieteVo ;
      public typeDeclarationTvaVo: TypeDeclarationTvaVo ;
      public etatDeclarationTvaVo: EtatDeclarationTvaVo ;
      public paiementDeclarationTvaVo: PaiementDeclarationTvaVo ;

}
