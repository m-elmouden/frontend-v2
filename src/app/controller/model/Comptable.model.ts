import {SocieteVo} from './Societe.model';
import {DemandeVo} from './Demande.model';
import {TypeComptableVo} from './TypeComptable.model';
import {User} from './User.model';



export class ComptableVo  extends User{


    public code: string;
    public nom: string;
    public telephone: string;
    public prenom: string;
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
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
      public typeComptableVo: TypeComptableVo ;
      public societesVo: Array<SocieteVo>;
      public demandesVo: Array<DemandeVo>;

}
