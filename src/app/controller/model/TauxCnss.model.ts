import {TypeTauxCnssVo} from './TypeTauxCnss.model';



export class TauxCnssVo {

    public id: number;

    public ref: string;
    public dateApplicationMin: Date;
    public dateApplicationMax: Date;
     public plafond: number;
     public pourcentage: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateApplicationMinMax: string ;
                public dateApplicationMinMin: string ;
                public dateApplicationMaxMax: string ;
                public dateApplicationMaxMin: string ;
                public plafondMax: string ;
                public plafondMin: string ;
                public pourcentageMax: string ;
                public pourcentageMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public typeTauxCnssVo: TypeTauxCnssVo ;

}
