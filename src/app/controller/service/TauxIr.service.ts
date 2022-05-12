import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TauxIrVo} from '../model/TauxIr.model';


@Injectable({
  providedIn: 'root'
})
export class TauxIrService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tauxIr/';
        })
    }
     private _tauxIrs: Array<TauxIrVo> ;
     private _selectedTauxIr: TauxIrVo;
     private _tauxIrSelections: Array<TauxIrVo>;
     private _createTauxIrDialog: boolean;
     private _editTauxIrDialog: boolean;
     private _viewTauxIrDialog: boolean;
     public editTauxIr$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTauxIr:TauxIrVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TauxIrVo>>(this.API);
    }

    public save(): Observable<TauxIrVo> {
           return this.http.post<TauxIrVo>(this.API, {...this.selectedTauxIr,dateMax: moment(this.selectedTauxIr.dateMax).format("YYYY-MM-DD")});
    }

    delete(tauxIr: TauxIrVo) {
         return this.http.delete<number>(this.API + 'id/' + tauxIr.id);
    }


    public edit(): Observable<TauxIrVo> {
        return this.http.put<TauxIrVo>(this.API, this.selectedTauxIr);
    }


     public findByCriteria(tauxIr:TauxIrVo):Observable<Array<TauxIrVo>>{
           return this.http.post<Array<TauxIrVo>>(this.API +'search', tauxIr);
    }

   public findByIdWithAssociatedList(tauxIr:TauxIrVo):Observable<TauxIrVo>{
         return this.http.get<TauxIrVo>(this.API + 'detail/id/' +tauxIr.id);
    }

    // getters and setters


    get tauxIrs(): Array<TauxIrVo> {
    if(this._tauxIrs==null){
    this._tauxIrs=new Array<TauxIrVo>();
    }
return this._tauxIrs;
       }

    set tauxIrs(value: Array<TauxIrVo>) {
        this._tauxIrs = value;
       }

    get selectedTauxIr(): TauxIrVo {
    if(this._selectedTauxIr==null){
    this._selectedTauxIr=new TauxIrVo();
    }
           return this._selectedTauxIr;
       }

    set selectedTauxIr(value: TauxIrVo) {
        this._selectedTauxIr = value;
       }

    get tauxIrSelections(): Array<TauxIrVo> {
    if(this._tauxIrSelections==null){
    this._tauxIrSelections=new Array<TauxIrVo>();
    }
        return this._tauxIrSelections;
       }


    set tauxIrSelections(value: Array<TauxIrVo>) {
        this._tauxIrSelections = value;
       }

    get createTauxIrDialog(): boolean {
        return this._createTauxIrDialog;
       }

    set createTauxIrDialog(value: boolean) {
        this._createTauxIrDialog = value;
       }

    get editTauxIrDialog(): boolean {
        return this._editTauxIrDialog;
       }

    set editTauxIrDialog(value: boolean) {
        this._editTauxIrDialog = value;
       }

    get viewTauxIrDialog(): boolean {
        return this._viewTauxIrDialog;
       }

    set viewTauxIrDialog(value: boolean) {
        this._viewTauxIrDialog = value;
       }

     get searchTauxIr(): TauxIrVo {
     if(this._searchTauxIr==null){
    this._searchTauxIr=new TauxIrVo();
    }
        return this._searchTauxIr;
    }

    set searchTauxIr(value: TauxIrVo) {
        this._searchTauxIr = value;
       }

}
