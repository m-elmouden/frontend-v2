import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CpcFactureVo} from '../model/CpcFacture.model';
import {CpcVo} from '../model/Cpc.model';
import {FactureVo} from '../model/Facture.model';


@Injectable({
  providedIn: 'root'
})
export class CpcFactureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/cpcFacture/';
        })
    }
     private _cpcFactures: Array<CpcFactureVo> ;
     private _selectedCpcFacture: CpcFactureVo;
     private _cpcFactureSelections: Array<CpcFactureVo>;
     private _createCpcFactureDialog: boolean;
     private _editCpcFactureDialog: boolean;
     private _viewCpcFactureDialog: boolean;
     public editCpcFacture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCpcFacture:CpcFactureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CpcFactureVo>>(this.API);
    }

    public save(): Observable<CpcFactureVo> {
         return this.http.post<CpcFactureVo>(this.API, this.selectedCpcFacture);
    }

    delete(cpcFacture: CpcFactureVo) {
         return this.http.delete<number>(this.API + 'id/' + cpcFacture.id);
    }


    public edit(): Observable<CpcFactureVo> {
        return this.http.put<CpcFactureVo>(this.API, this.selectedCpcFacture);
    }


     public findByCriteria(cpcFacture:CpcFactureVo):Observable<Array<CpcFactureVo>>{
           return this.http.post<Array<CpcFactureVo>>(this.API +'search', cpcFacture);
    }

   public findByIdWithAssociatedList(cpcFacture:CpcFactureVo):Observable<CpcFactureVo>{
         return this.http.get<CpcFactureVo>(this.API + 'detail/id/' +cpcFacture.id);
    }

    // getters and setters


    get cpcFactures(): Array<CpcFactureVo> {
    if(this._cpcFactures==null){
    this._cpcFactures=new Array<CpcFactureVo>();
    }
return this._cpcFactures;
       }

    set cpcFactures(value: Array<CpcFactureVo>) {
        this._cpcFactures = value;
       }

    get selectedCpcFacture(): CpcFactureVo {
    if(this._selectedCpcFacture==null){
    this._selectedCpcFacture=new CpcFactureVo();
    }
           return this._selectedCpcFacture;
       }

    set selectedCpcFacture(value: CpcFactureVo) {
        this._selectedCpcFacture = value;
       }

    get cpcFactureSelections(): Array<CpcFactureVo> {
    if(this._cpcFactureSelections==null){
    this._cpcFactureSelections=new Array<CpcFactureVo>();
    }
        return this._cpcFactureSelections;
       }


    set cpcFactureSelections(value: Array<CpcFactureVo>) {
        this._cpcFactureSelections = value;
       }

    get createCpcFactureDialog(): boolean {
        return this._createCpcFactureDialog;
       }

    set createCpcFactureDialog(value: boolean) {
        this._createCpcFactureDialog = value;
       }

    get editCpcFactureDialog(): boolean {
        return this._editCpcFactureDialog;
       }

    set editCpcFactureDialog(value: boolean) {
        this._editCpcFactureDialog = value;
       }

    get viewCpcFactureDialog(): boolean {
        return this._viewCpcFactureDialog;
       }

    set viewCpcFactureDialog(value: boolean) {
        this._viewCpcFactureDialog = value;
       }

     get searchCpcFacture(): CpcFactureVo {
     if(this._searchCpcFacture==null){
    this._searchCpcFacture=new CpcFactureVo();
    }
        return this._searchCpcFacture;
    }

    set searchCpcFacture(value: CpcFactureVo) {
        this._searchCpcFacture = value;
       }

}
