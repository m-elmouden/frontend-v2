import {TauxIrVo} from './TauxIr.model';
import {DeclarationIrVo} from './DeclarationIr.model';
import {EmployeVo} from './Employe.model';


export class DeclarationIrEmployeVo {

    public id: number;

    public salaireNet: number;
    public salaireBrut: number;
    public salaireNetImposable: number;
    public salaireBrutImposable: number;
    public salaireBase: number;
    public indemnite: number;
    public primes: number;
    public pourcentageAnciennete: number;
    public cotisation: number;
    public heuresSupplementaires: number;
    public avantage: number;

    public salaireNetMax: string;
    public salaireNetMin: string;
    public salaireBrutMax: string;
    public salaireBrutMin: string;
    public salaireNetImposableMax: string;
    public salaireNetImposableMin: string;
    public salaireBrutImposableMax: string;
    public salaireBrutImposableMin: string;
    public salaireBaseMax: string;
    public salaireBaseMin: string;
    public indemniteMax: string;
    public indemniteMin: string;
    public primesMax: string;
    public primesMin: string;
    public pourcentageAncienneteMax: string;
    public pourcentageAncienneteMin: string;
    public cotisationMax: string;
    public cotisationMin: string;
    public heuresSupplementairesMax: string;
    public heuresSupplementairesMin: string;
    public avantageMax: string;
    public avantageMin: string;
    public declarationIrVo: DeclarationIrVo;
    public employeVo: EmployeVo;
    public tauxIrVo: TauxIrVo;

}
