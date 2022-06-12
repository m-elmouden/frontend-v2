import {SocieteVo} from './Societe.model';
import {PaiementDeclarationIrVo} from './PaiementDeclarationIr.model';
import {EtatDeclarationIrVo} from './EtatDeclarationIr.model';
import {DeclarationIrEmployeVo} from './DeclarationIrEmploye.model';
import {PrelevementSocialEmployeVo} from './PrelevementSocialEmploye.model';
import {ComptableVo} from './Comptable.model';
import {DemandeVo} from './Demande.model';


export class DeclarationIrVo {

    public id: number;

    public refrerence: string;
    public annee: string;
    public mois: string;
    public montantIrCalcule: number;
    public montantIrAPaye: number;
    public totalAPaye: number;
    public totalSalaireNet: number;
    public totalSalaireBrut: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
    public commentaire: string;
    public anneeMax: string;
    public anneeMin: string;
    public moisMax: string;
    public moisMin: string;
    public montantIrCalculeMax: string;
    public montantIrCalculeMin: string;
    public montantIrAPayeMax: string;
    public montantIrAPayeMin: string;
    public totalAPayeMax: string;
    public totalAPayeMin: string;
    public totalSalaireNetMax: string;
    public totalSalaireNetMin: string;
    public totalSalaireBrutMax: string;
    public totalSalaireBrutMin: string;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public societeVo: SocieteVo;
    public etatDeclarationIrVo: EtatDeclarationIrVo;
    public paiementDeclarationIrVo: PaiementDeclarationIrVo;
    public declarationIrEmployesVo: Array<DeclarationIrEmployeVo>;
    public prelevementSocialEmployesVo: Array<PrelevementSocialEmployeVo>;
    public comptableTraiteurVo: ComptableVo;
    public comptableValidateurVo: ComptableVo;
    public demande: DemandeVo;
}
