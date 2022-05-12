import {PrelevementSocialVo} from './PrelevementSocial.model';
import {EmployeVo} from './Employe.model';
import {DeclarationIrVo} from './DeclarationIr.model';



export class PrelevementSocialEmployeVo {

    public id: number;

     public salaireBrutImposable: number;
     public montantCalculer: number;
                public salaireBrutImposableMax: string ;
                public salaireBrutImposableMin: string ;
                public montantCalculerMax: string ;
                public montantCalculerMin: string ;
      public prelevementSocialVo: PrelevementSocialVo ;
      public employeVo: EmployeVo ;
      public declarationIrVo: DeclarationIrVo ;

}
