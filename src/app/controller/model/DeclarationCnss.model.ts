import {SocieteVo} from './Societe.model';
import {EmployeVo} from './Employe.model';
import {DeclarationCnssDetailVo} from './DeclarationCnssDetail.model';



export class DeclarationCnssVo {

    public id: number;

    public ref: string;
     public salaireNet: number;
     public salaireBrut: number;
     public salaireImposable: number;
     public montantTotal: number;
     public mois: number;
     public annee: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public salaireNetMax: string ;
                public salaireNetMin: string ;
                public salaireBrutMax: string ;
                public salaireBrutMin: string ;
                public salaireImposableMax: string ;
                public salaireImposableMin: string ;
                public montantTotalMax: string ;
                public montantTotalMin: string ;
                public moisMax: string ;
                public moisMin: string ;
                public anneeMax: string ;
                public anneeMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public employeVo: EmployeVo ;
      public societeVo: SocieteVo ;
      public declarationCnssDetailsVo: Array<DeclarationCnssDetailVo>;

}
