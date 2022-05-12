import {TauxIsConfigVo} from './TauxIsConfig.model';



export class TauxIsVo {

    public id: number;

    public reference: string;
     public resultatFiscalMin: number;
     public resultatFiscalMax: number;
     public pourcentage: number;
     public penalite: number;
                public resultatFiscalMinMax: string ;
                public resultatFiscalMinMin: string ;
                public resultatFiscalMaxMax: string ;
                public resultatFiscalMaxMin: string ;
                public pourcentageMax: string ;
                public pourcentageMin: string ;
                public penaliteMax: string ;
                public penaliteMin: string ;
      public tauxIsConfigVo: TauxIsConfigVo ;

}
