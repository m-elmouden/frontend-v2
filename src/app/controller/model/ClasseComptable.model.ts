import {SousClasseComptableVo} from './SousClasseComptable.model';



export class ClasseComptableVo {

    public id: number;

    public libelle: string;
     public numero: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public numeroMax: string ;
                public numeroMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public sousClasseComptablesVo: Array<SousClasseComptableVo>;

}
