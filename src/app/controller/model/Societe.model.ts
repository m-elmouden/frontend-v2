import {TypeSocieteVo} from './TypeSociete.model';
import {DeclarationTvaVo} from './DeclarationTva.model';
import {AcompteVo} from './Acompte.model';
import {PresidentSocieteVo} from './PresidentSociete.model';
import {DemandeVo} from './Demande.model';
import {FactureVo} from './Facture.model';
import {DeclarationCnssVo} from './DeclarationCnss.model';
import {DeclarationIsVo} from './DeclarationIs.model';
import {DeclarationIrVo} from './DeclarationIr.model';
import {EmployeVo} from './Employe.model';
import {ComptableVo} from './Comptable.model';
import {User} from './User.model';



export class SocieteVo  extends User{


    public ice: string;
    public adresse: string;
    public fax: string;
     public telephone: number;
    public raisonSociale: string;
    public dateCreation: Date;
     public anneeExploitation: number;
     public capitalSocial: number;
    public description: string;
     public age: number;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public password: string;
    public equivalenceAvecPanelErc: string;
    public baseHorizon: string;
    public role: string;
                public telephoneMax: string ;
                public telephoneMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
                public anneeExploitationMax: string ;
                public anneeExploitationMin: string ;
                public capitalSocialMax: string ;
                public capitalSocialMin: string ;
                public ageMax: string ;
                public ageMin: string ;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
      public comptableVo: ComptableVo ;
      public presidentSocieteVo: PresidentSocieteVo ;
      public typeSocieteVo: TypeSocieteVo ;
      public demandesVo: Array<DemandeVo>;
      public declarationIrsVo: Array<DeclarationIrVo>;
      public declarationIssVo: Array<DeclarationIsVo>;
      public declarationTvasVo: Array<DeclarationTvaVo>;
      public declarationCnsssVo: Array<DeclarationCnssVo>;
      public acomptesVo: Array<AcompteVo>;
      public employesVo: Array<EmployeVo>;
      public facturesVo: Array<FactureVo>;

}
