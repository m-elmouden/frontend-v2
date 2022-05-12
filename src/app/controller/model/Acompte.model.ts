import {SocieteVo} from './Societe.model';



export class AcompteVo {

    public id: number;

     public numero: number;
     public annee: number;
     public montant: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public numeroMax: string ;
                public numeroMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
                public montantMax: string ;
                public montantMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public societeVo: SocieteVo ;

}
