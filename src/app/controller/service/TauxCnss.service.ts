import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TauxCnssVo} from '../model/TauxCnss.model';
import {TypeTauxCnssVo} from '../model/TypeTauxCnss.model';


@Injectable({
  providedIn: 'root'
})
export class TauxCnssService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tauxCnss/';
        })
    }
     private _tauxCnsss: Array<TauxCnssVo> ;
     private _selectedTauxCnss: TauxCnssVo;
     private _tauxCnssSelections: Array<TauxCnssVo>;
     private _createTauxCnssDialog: boolean;
     private _editTauxCnssDialog: boolean;
     private _viewTauxCnssDialog: boolean;
     public editTauxCnss$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTauxCnss:TauxCnssVo ;

    // methods
    public archiver(tauxCnss: TauxCnssVo): Observable<TauxCnssVo> {
        return this.http.put<TauxCnssVo>(this.API + 'archiver/' ,tauxCnss);
    }
    public desarchiver(tauxCnss: TauxCnssVo): Observable<TauxCnssVo> {
    return this.http.put<TauxCnssVo>(this.API + 'desarchiver/' ,tauxCnss);
    }

    public findAll(){
     return this.http.get<Array<TauxCnssVo>>(this.API);
    }

    public save(): Observable<TauxCnssVo> {
           return this.http.post<TauxCnssVo>(this.API, {...this.selectedTauxCnss,dateCreation: moment(this.selectedTauxCnss.dateCreation).format("YYYY-MM-DD")});
    }

    delete(tauxCnss: TauxCnssVo) {
         return this.http.delete<number>(this.API + 'id/' + tauxCnss.id);
    }


    public edit(): Observable<TauxCnssVo> {
        return this.http.put<TauxCnssVo>(this.API, this.selectedTauxCnss);
    }


     public findByCriteria(tauxCnss:TauxCnssVo):Observable<Array<TauxCnssVo>>{
           return this.http.post<Array<TauxCnssVo>>(this.API +'search', tauxCnss);
    }

   public findByIdWithAssociatedList(tauxCnss:TauxCnssVo):Observable<TauxCnssVo>{
         return this.http.get<TauxCnssVo>(this.API + 'detail/id/' +tauxCnss.id);
    }

    // getters and setters


    get tauxCnsss(): Array<TauxCnssVo> {
    if(this._tauxCnsss==null){
    this._tauxCnsss=new Array<TauxCnssVo>();
    }
return this._tauxCnsss;
       }

    set tauxCnsss(value: Array<TauxCnssVo>) {
        this._tauxCnsss = value;
       }

    get selectedTauxCnss(): TauxCnssVo {
    if(this._selectedTauxCnss==null){
    this._selectedTauxCnss=new TauxCnssVo();
    }
           return this._selectedTauxCnss;
       }

    set selectedTauxCnss(value: TauxCnssVo) {
        this._selectedTauxCnss = value;
       }

    get tauxCnssSelections(): Array<TauxCnssVo> {
    if(this._tauxCnssSelections==null){
    this._tauxCnssSelections=new Array<TauxCnssVo>();
    }
        return this._tauxCnssSelections;
       }


    set tauxCnssSelections(value: Array<TauxCnssVo>) {
        this._tauxCnssSelections = value;
       }

    get createTauxCnssDialog(): boolean {
        return this._createTauxCnssDialog;
       }

    set createTauxCnssDialog(value: boolean) {
        this._createTauxCnssDialog = value;
       }

    get editTauxCnssDialog(): boolean {
        return this._editTauxCnssDialog;
       }

    set editTauxCnssDialog(value: boolean) {
        this._editTauxCnssDialog = value;
       }

    get viewTauxCnssDialog(): boolean {
        return this._viewTauxCnssDialog;
       }

    set viewTauxCnssDialog(value: boolean) {
        this._viewTauxCnssDialog = value;
       }

     get searchTauxCnss(): TauxCnssVo {
     if(this._searchTauxCnss==null){
    this._searchTauxCnss=new TauxCnssVo();
    }
        return this._searchTauxCnss;
    }

    set searchTauxCnss(value: TauxCnssVo) {
        this._searchTauxCnss = value;
       }

}
