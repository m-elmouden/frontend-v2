import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TauxIsVo} from '../model/TauxIs.model';
import {TauxIsConfigVo} from '../model/TauxIsConfig.model';


@Injectable({
  providedIn: 'root'
})
export class TauxIsService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tauxIs/';
        })
    }
     private _tauxIss: Array<TauxIsVo> ;
     private _selectedTauxIs: TauxIsVo;
     private _tauxIsSelections: Array<TauxIsVo>;
     private _createTauxIsDialog: boolean;
     private _editTauxIsDialog: boolean;
     private _viewTauxIsDialog: boolean;
     public editTauxIs$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTauxIs:TauxIsVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TauxIsVo>>(this.API);
    }

    public save(): Observable<TauxIsVo> {
         return this.http.post<TauxIsVo>(this.API, this.selectedTauxIs);
    }

    delete(tauxIs: TauxIsVo) {
         return this.http.delete<number>(this.API + 'id/' + tauxIs.id);
    }


    public edit(): Observable<TauxIsVo> {
        return this.http.put<TauxIsVo>(this.API, this.selectedTauxIs);
    }


     public findByCriteria(tauxIs:TauxIsVo):Observable<Array<TauxIsVo>>{
           return this.http.post<Array<TauxIsVo>>(this.API +'search', tauxIs);
    }

   public findByIdWithAssociatedList(tauxIs:TauxIsVo):Observable<TauxIsVo>{
         return this.http.get<TauxIsVo>(this.API + 'detail/id/' +tauxIs.id);
    }

    // getters and setters


    get tauxIss(): Array<TauxIsVo> {
    if(this._tauxIss==null){
    this._tauxIss=new Array<TauxIsVo>();
    }
return this._tauxIss;
       }

    set tauxIss(value: Array<TauxIsVo>) {
        this._tauxIss = value;
       }

    get selectedTauxIs(): TauxIsVo {
    if(this._selectedTauxIs==null){
    this._selectedTauxIs=new TauxIsVo();
    }
           return this._selectedTauxIs;
       }

    set selectedTauxIs(value: TauxIsVo) {
        this._selectedTauxIs = value;
       }

    get tauxIsSelections(): Array<TauxIsVo> {
    if(this._tauxIsSelections==null){
    this._tauxIsSelections=new Array<TauxIsVo>();
    }
        return this._tauxIsSelections;
       }


    set tauxIsSelections(value: Array<TauxIsVo>) {
        this._tauxIsSelections = value;
       }

    get createTauxIsDialog(): boolean {
        return this._createTauxIsDialog;
       }

    set createTauxIsDialog(value: boolean) {
        this._createTauxIsDialog = value;
       }

    get editTauxIsDialog(): boolean {
        return this._editTauxIsDialog;
       }

    set editTauxIsDialog(value: boolean) {
        this._editTauxIsDialog = value;
       }

    get viewTauxIsDialog(): boolean {
        return this._viewTauxIsDialog;
       }

    set viewTauxIsDialog(value: boolean) {
        this._viewTauxIsDialog = value;
       }

     get searchTauxIs(): TauxIsVo {
     if(this._searchTauxIs==null){
    this._searchTauxIs=new TauxIsVo();
    }
        return this._searchTauxIs;
    }

    set searchTauxIs(value: TauxIsVo) {
        this._searchTauxIs = value;
       }

}
