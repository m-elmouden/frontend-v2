import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeclarationIsVo} from '../model/DeclarationIs.model';
import {SocieteVo} from '../model/Societe.model';
import {EtatDeclarationIsVo} from '../model/EtatDeclarationIs.model';
import {TauxIsConfigVo} from '../model/TauxIsConfig.model';
import {TauxIsVo} from '../model/TauxIs.model';
import {PaiementDeclarationIsVo} from '../model/PaiementDeclarationIs.model';


@Injectable({
  providedIn: 'root'
})
export class DeclarationIsService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/declarationIs/';
        })
    }
     private _declarationIss: Array<DeclarationIsVo> ;
     private _selectedDeclarationIs: DeclarationIsVo;
     private _declarationIsSelections: Array<DeclarationIsVo>;
     private _createDeclarationIsDialog: boolean;
     private _editDeclarationIsDialog: boolean;
     private _viewDeclarationIsDialog: boolean;
     public editDeclarationIs$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeclarationIs:DeclarationIsVo ;

    // methods
    public archiver(declarationIs: DeclarationIsVo): Observable<DeclarationIsVo> {
        return this.http.put<DeclarationIsVo>(this.API + 'archiver/' ,declarationIs);
    }
    public desarchiver(declarationIs: DeclarationIsVo): Observable<DeclarationIsVo> {
    return this.http.put<DeclarationIsVo>(this.API + 'desarchiver/' ,declarationIs);
    }

    public findAll(){
     return this.http.get<Array<DeclarationIsVo>>(this.API);
    }

    public save(): Observable<DeclarationIsVo> {
           return this.http.post<DeclarationIsVo>(this.API, {...this.selectedDeclarationIs,dateCreation: moment(this.selectedDeclarationIs.dateCreation).format("YYYY-MM-DD")});
    }

    delete(declarationIs: DeclarationIsVo) {
         return this.http.delete<number>(this.API + 'id/' + declarationIs.id);
    }


    public edit(): Observable<DeclarationIsVo> {
        return this.http.put<DeclarationIsVo>(this.API, this.selectedDeclarationIs);
    }


     public findByCriteria(declarationIs:DeclarationIsVo):Observable<Array<DeclarationIsVo>>{
           return this.http.post<Array<DeclarationIsVo>>(this.API +'search', declarationIs);
    }

   public findByIdWithAssociatedList(declarationIs:DeclarationIsVo):Observable<DeclarationIsVo>{
         return this.http.get<DeclarationIsVo>(this.API + 'detail/id/' +declarationIs.id);
    }

    // getters and setters


    get declarationIss(): Array<DeclarationIsVo> {
    if(this._declarationIss==null){
    this._declarationIss=new Array<DeclarationIsVo>();
    }
return this._declarationIss;
       }

    set declarationIss(value: Array<DeclarationIsVo>) {
        this._declarationIss = value;
       }

    get selectedDeclarationIs(): DeclarationIsVo {
    if(this._selectedDeclarationIs==null){
    this._selectedDeclarationIs=new DeclarationIsVo();
    }
           return this._selectedDeclarationIs;
       }

    set selectedDeclarationIs(value: DeclarationIsVo) {
        this._selectedDeclarationIs = value;
       }

    get declarationIsSelections(): Array<DeclarationIsVo> {
    if(this._declarationIsSelections==null){
    this._declarationIsSelections=new Array<DeclarationIsVo>();
    }
        return this._declarationIsSelections;
       }


    set declarationIsSelections(value: Array<DeclarationIsVo>) {
        this._declarationIsSelections = value;
       }

    get createDeclarationIsDialog(): boolean {
        return this._createDeclarationIsDialog;
       }

    set createDeclarationIsDialog(value: boolean) {
        this._createDeclarationIsDialog = value;
       }

    get editDeclarationIsDialog(): boolean {
        return this._editDeclarationIsDialog;
       }

    set editDeclarationIsDialog(value: boolean) {
        this._editDeclarationIsDialog = value;
       }

    get viewDeclarationIsDialog(): boolean {
        return this._viewDeclarationIsDialog;
       }

    set viewDeclarationIsDialog(value: boolean) {
        this._viewDeclarationIsDialog = value;
       }

     get searchDeclarationIs(): DeclarationIsVo {
     if(this._searchDeclarationIs==null){
    this._searchDeclarationIs=new DeclarationIsVo();
    }
        return this._searchDeclarationIs;
    }

    set searchDeclarationIs(value: DeclarationIsVo) {
        this._searchDeclarationIs = value;
       }

}
