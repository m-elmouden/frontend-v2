import {TypeTauxCnssVo} from './TypeTauxCnss.model';
import {DeclarationCnssVo} from './DeclarationCnss.model';



export class DeclarationCnssDetailVo {

    public id: number;

    public ref: string;
     public montantCalcule: number;
     public montantTotal: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public montantCalculeMax: string ;
                public montantCalculeMin: string ;
                public montantTotalMax: string ;
                public montantTotalMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public typeTauxCnssVo: TypeTauxCnssVo ;
      public declarationCnssVo: DeclarationCnssVo ;

}
