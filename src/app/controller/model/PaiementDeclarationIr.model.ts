import {DeclarationIrVo} from './DeclarationIr.model';



export class PaiementDeclarationIrVo {

    public id: number;

    public reference: string;
    public datePaiement: Date;
     public total: number;
     public montantCptTraiteur: number;
     public montantCptValidateur: number;
     public reste: number;
                public datePaiementMax: string ;
                public datePaiementMin: string ;
                public totalMax: string ;
                public totalMin: string ;
                public montantCptTraiteurMax: string ;
                public montantCptTraiteurMin: string ;
                public montantCptValidateurMax: string ;
                public montantCptValidateurMin: string ;
                public resteMax: string ;
                public resteMin: string ;
      public declarationIrVo: DeclarationIrVo ;

}
