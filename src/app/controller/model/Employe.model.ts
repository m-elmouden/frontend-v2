import {SocieteVo} from './Societe.model';
import {DeclarationCnssVo} from './DeclarationCnss.model';
import {TypeEmployeVo} from './TypeEmploye.model';



export class EmployeVo {

    public id: number;

    public cin: string;
    public nom: string;
    public prenom: string;
     public totalSalaireNet: number;
     public nombreFamille: number;
                public totalSalaireNetMax: string ;
                public totalSalaireNetMin: string ;
                public nombreFamilleMax: string ;
                public nombreFamilleMin: string ;
      public typeEmployeVo: TypeEmployeVo ;
      public societeVo: SocieteVo ;
      public declarationCnssVo: DeclarationCnssVo ;

}
