import {CpcFactureVo} from './CpcFacture.model';



export class CpcVo {

    public id: number;

    public reference: string;
     public totalProdEx: number;
     public totalChargEx: number;
     public totalProdFin: number;
     public totalChargFin: number;
     public totalProdNCour: number;
     public totalChargNCour: number;
    public dateMinCpc: Date;
    public dateMaxCpc: Date;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public totalProdExMax: string ;
                public totalProdExMin: string ;
                public totalChargExMax: string ;
                public totalChargExMin: string ;
                public totalProdFinMax: string ;
                public totalProdFinMin: string ;
                public totalChargFinMax: string ;
                public totalChargFinMin: string ;
                public totalProdNCourMax: string ;
                public totalProdNCourMin: string ;
                public totalChargNCourMax: string ;
                public totalChargNCourMin: string ;
                public dateMinCpcMax: string ;
                public dateMinCpcMin: string ;
                public dateMaxCpcMax: string ;
                public dateMaxCpcMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public cpcFacturesVo: Array<CpcFactureVo>;

}
