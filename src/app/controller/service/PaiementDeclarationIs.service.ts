import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaiementDeclarationIsVo} from '../model/PaiementDeclarationIs.model';
import {DeclarationIsVo} from '../model/DeclarationIs.model';


@Injectable({
  providedIn: 'root'
})
export class PaiementDeclarationIsService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paiementDeclarationIs/';
        })
    }
     private _paiementDeclarationIss: Array<PaiementDeclarationIsVo> ;
     private _selectedPaiementDeclarationIs: PaiementDeclarationIsVo;
     private _paiementDeclarationIsSelections: Array<PaiementDeclarationIsVo>;
     private _createPaiementDeclarationIsDialog: boolean;
     private _editPaiementDeclarationIsDialog: boolean;
     private _viewPaiementDeclarationIsDialog: boolean;
     public editPaiementDeclarationIs$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaiementDeclarationIs:PaiementDeclarationIsVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaiementDeclarationIsVo>>(this.API);
    }

    public save(): Observable<PaiementDeclarationIsVo> {
           return this.http.post<PaiementDeclarationIsVo>(this.API, {...this.selectedPaiementDeclarationIs,datePaiement: moment(this.selectedPaiementDeclarationIs.datePaiement).format("YYYY-MM-DD")});
    }

    delete(paiementDeclarationIs: PaiementDeclarationIsVo) {
         return this.http.delete<number>(this.API + 'id/' + paiementDeclarationIs.id);
    }


    public edit(): Observable<PaiementDeclarationIsVo> {
        return this.http.put<PaiementDeclarationIsVo>(this.API, this.selectedPaiementDeclarationIs);
    }


     public findByCriteria(paiementDeclarationIs:PaiementDeclarationIsVo):Observable<Array<PaiementDeclarationIsVo>>{
           return this.http.post<Array<PaiementDeclarationIsVo>>(this.API +'search', paiementDeclarationIs);
    }

   public findByIdWithAssociatedList(paiementDeclarationIs:PaiementDeclarationIsVo):Observable<PaiementDeclarationIsVo>{
         return this.http.get<PaiementDeclarationIsVo>(this.API + 'detail/id/' +paiementDeclarationIs.id);
    }

    // getters and setters


    get paiementDeclarationIss(): Array<PaiementDeclarationIsVo> {
    if(this._paiementDeclarationIss==null){
    this._paiementDeclarationIss=new Array<PaiementDeclarationIsVo>();
    }
return this._paiementDeclarationIss;
       }

    set paiementDeclarationIss(value: Array<PaiementDeclarationIsVo>) {
        this._paiementDeclarationIss = value;
       }

    get selectedPaiementDeclarationIs(): PaiementDeclarationIsVo {
    if(this._selectedPaiementDeclarationIs==null){
    this._selectedPaiementDeclarationIs=new PaiementDeclarationIsVo();
    }
           return this._selectedPaiementDeclarationIs;
       }

    set selectedPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this._selectedPaiementDeclarationIs = value;
       }

    get paiementDeclarationIsSelections(): Array<PaiementDeclarationIsVo> {
    if(this._paiementDeclarationIsSelections==null){
    this._paiementDeclarationIsSelections=new Array<PaiementDeclarationIsVo>();
    }
        return this._paiementDeclarationIsSelections;
       }


    set paiementDeclarationIsSelections(value: Array<PaiementDeclarationIsVo>) {
        this._paiementDeclarationIsSelections = value;
       }

    get createPaiementDeclarationIsDialog(): boolean {
        return this._createPaiementDeclarationIsDialog;
       }

    set createPaiementDeclarationIsDialog(value: boolean) {
        this._createPaiementDeclarationIsDialog = value;
       }

    get editPaiementDeclarationIsDialog(): boolean {
        return this._editPaiementDeclarationIsDialog;
       }

    set editPaiementDeclarationIsDialog(value: boolean) {
        this._editPaiementDeclarationIsDialog = value;
       }

    get viewPaiementDeclarationIsDialog(): boolean {
        return this._viewPaiementDeclarationIsDialog;
       }

    set viewPaiementDeclarationIsDialog(value: boolean) {
        this._viewPaiementDeclarationIsDialog = value;
       }

     get searchPaiementDeclarationIs(): PaiementDeclarationIsVo {
     if(this._searchPaiementDeclarationIs==null){
    this._searchPaiementDeclarationIs=new PaiementDeclarationIsVo();
    }
        return this._searchPaiementDeclarationIs;
    }

    set searchPaiementDeclarationIs(value: PaiementDeclarationIsVo) {
        this._searchPaiementDeclarationIs = value;
       }

}
