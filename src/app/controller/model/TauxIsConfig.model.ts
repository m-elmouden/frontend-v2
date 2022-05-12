import {TauxIsVo} from './TauxIs.model';



export class TauxIsConfigVo {

    public id: number;

    public reference: string;
     public cotisationMinimale: number;
    public dateMin: Date;
    public dateMax: Date;
                public cotisationMinimaleMax: string ;
                public cotisationMinimaleMin: string ;
                public dateMinMax: string ;
                public dateMinMin: string ;
                public dateMaxMax: string ;
                public dateMaxMin: string ;
      public tauxIssVo: Array<TauxIsVo>;

}
