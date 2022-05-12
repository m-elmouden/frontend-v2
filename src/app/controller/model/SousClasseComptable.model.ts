import {ClasseComptableVo} from './ClasseComptable.model';
import {CompteComptableVo} from './CompteComptable.model';



export class SousClasseComptableVo {

    public id: number;

     public numero: number;
    public libelle: string;
                public numeroMax: string ;
                public numeroMin: string ;
      public classeComptableVo: ClasseComptableVo ;
      public compteComptablesVo: Array<CompteComptableVo>;

}
