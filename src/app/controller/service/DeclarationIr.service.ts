import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeclarationIrVo} from '../model/DeclarationIr.model';
import {SocieteVo} from '../model/Societe.model';
import {PaiementDeclarationIrVo} from '../model/PaiementDeclarationIr.model';
import {EtatDeclarationIrVo} from '../model/EtatDeclarationIr.model';
import {DeclarationIrEmployeVo} from '../model/DeclarationIrEmploye.model';
import {PrelevementSocialEmployeVo} from '../model/PrelevementSocialEmploye.model';
import {DeclarationirStatVo} from '../model/DeclarationirStatVo.model';


@Injectable({
  providedIn: 'root'
})
export class DeclarationIrService {
    private API = '';
     constructor(private http: HttpClient, private roleService: RoleService) {
        this._role$ = this.roleService.role$;
        this._role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/declarationIr/';
        })
    }
     private _declarationIrs: Array<DeclarationIrVo> ;
     private _selectedDeclarationIr: DeclarationIrVo;
     private _declarationIrSelections: Array<DeclarationIrVo>;
     private _createDeclarationIrDialog: boolean;
     private _editDeclarationIrDialog: boolean;
     private _viewDeclarationIrDialog: boolean;
     public editDeclarationIr$ = new BehaviorSubject<boolean>(false);
     private _role$: Observable<string>;
     private _searchDeclarationIr: DeclarationIrVo ;


    get role$(): Observable<string> {
        return this._role$;
    }

    set role$(value: Observable<string>) {
        this._role$ = value;
    }

    

// methods
    public archiver(declarationIr: DeclarationIrVo): Observable<DeclarationIrVo> {
        return this.http.put<DeclarationIrVo>(this.API + 'archiver/' , declarationIr);
    }
    public desarchiver(declarationIr: DeclarationIrVo): Observable<DeclarationIrVo> {
    return this.http.put<DeclarationIrVo>(this.API + 'desarchiver/' , declarationIr);
    }

    public findAll(){
     return this.http.get<Array<DeclarationIrVo>>(this.API);
    }

    public findStatByDateDeclarationAndDemande(declarationIr: DeclarationIrVo){
        // tslint:disable-next-line:max-line-length
        // @ts-ignore
        return this.http.get<Array<number>>(this.API + 'demande/date/' + declarationIr.dateCreationMin + '/date/' + declarationIr.dateCreationMax + '/' , declarationIr.demande);
    }

    public findStatByDateDeclarationAndEtatDeclaration(declarationIr: DeclarationIrVo): Observable<Array<DeclarationirStatVo>>{
        return this.http.get<Array<DeclarationirStatVo>>(this.API + 'date/' + declarationIr.dateCreationMin + '/date/' + declarationIr.dateCreationMax );
    }
    public save(): Observable<DeclarationIrVo> {

           return this.http.post<DeclarationIrVo>(this.API, {...this.selectedDeclarationIr, dateCreation: moment(this.selectedDeclarationIr.dateCreation).format('YYYY-MM-DD')});
    }

    delete(declarationIr: DeclarationIrVo) {
         return this.http.delete<number>(this.API + 'id/' + declarationIr.id);
    }


    public edit(): Observable<DeclarationIrVo> {
        return this.http.put<DeclarationIrVo>(this.API, this.selectedDeclarationIr);
    }


     public findByCriteria(declarationIr: DeclarationIrVo): Observable<Array<DeclarationIrVo>>{
           return this.http.post<Array<DeclarationIrVo>>(this.API + 'search', declarationIr);
    }

   public findByIdWithAssociatedList(declarationIr: DeclarationIrVo): Observable<DeclarationIrVo>{
         return this.http.get<DeclarationIrVo>(this.API + 'detail/id/' + declarationIr.id);
    }

    public findByEtatDEclarationIrReference(reference): Observable<Array<DeclarationIrVo>>{
        return this.http.get<Array<DeclarationIrVo>>(this.API + 'etatDeclarationIr/reference/' + reference);
}
    // getters and setters


    get declarationIrs(): Array<DeclarationIrVo> {
    if(this._declarationIrs==null){
    this._declarationIrs=new Array<DeclarationIrVo>();
    }
return this._declarationIrs;
       }

    set declarationIrs(value: Array<DeclarationIrVo>) {
        this._declarationIrs = value;
       }

    get selectedDeclarationIr(): DeclarationIrVo {
    if(this._selectedDeclarationIr==null){
    this._selectedDeclarationIr=new DeclarationIrVo();
    }
           return this._selectedDeclarationIr;
       }

    set selectedDeclarationIr(value: DeclarationIrVo) {
        this._selectedDeclarationIr = value;
       }

    get declarationIrSelections(): Array<DeclarationIrVo> {
    if(this._declarationIrSelections==null){
    this._declarationIrSelections=new Array<DeclarationIrVo>();
    }
        return this._declarationIrSelections;
       }


    set declarationIrSelections(value: Array<DeclarationIrVo>) {
        this._declarationIrSelections = value;
       }

    get createDeclarationIrDialog(): boolean {
        return this._createDeclarationIrDialog;
       }

    set createDeclarationIrDialog(value: boolean) {
        this._createDeclarationIrDialog = value;
       }

    get editDeclarationIrDialog(): boolean {
        return this._editDeclarationIrDialog;
       }

    set editDeclarationIrDialog(value: boolean) {
        this._editDeclarationIrDialog = value;
       }

    get viewDeclarationIrDialog(): boolean {
        return this._viewDeclarationIrDialog;
       }

    set viewDeclarationIrDialog(value: boolean) {
        this._viewDeclarationIrDialog = value;
       }

     get searchDeclarationIr(): DeclarationIrVo {
     if(this._searchDeclarationIr==null){
    this._searchDeclarationIr=new DeclarationIrVo();
    }
        return this._searchDeclarationIr;
    }

    set searchDeclarationIr(value: DeclarationIrVo) {
        this._searchDeclarationIr = value;
       }



    public importExcel(formData: FormData){
        console.log(formData);
        return this.http.post('http://localhost:8036/api/excel/upload/', formData);
    }

}
