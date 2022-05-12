import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeTauxCnssVo} from '../model/TypeTauxCnss.model';


@Injectable({
  providedIn: 'root'
})
export class TypeTauxCnssService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeTauxCnss/';
        })
    }
     private _typeTauxCnsss: Array<TypeTauxCnssVo> ;
     private _selectedTypeTauxCnss: TypeTauxCnssVo;
     private _typeTauxCnssSelections: Array<TypeTauxCnssVo>;
     private _createTypeTauxCnssDialog: boolean;
     private _editTypeTauxCnssDialog: boolean;
     private _viewTypeTauxCnssDialog: boolean;
     public editTypeTauxCnss$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeTauxCnss:TypeTauxCnssVo ;

    // methods
    public archiver(typeTauxCnss: TypeTauxCnssVo): Observable<TypeTauxCnssVo> {
        return this.http.put<TypeTauxCnssVo>(this.API + 'archiver/' ,typeTauxCnss);
    }
    public desarchiver(typeTauxCnss: TypeTauxCnssVo): Observable<TypeTauxCnssVo> {
    return this.http.put<TypeTauxCnssVo>(this.API + 'desarchiver/' ,typeTauxCnss);
    }

    public findAll(){
     return this.http.get<Array<TypeTauxCnssVo>>(this.API);
    }

    public save(): Observable<TypeTauxCnssVo> {
           return this.http.post<TypeTauxCnssVo>(this.API, {...this.selectedTypeTauxCnss,dateCreation: moment(this.selectedTypeTauxCnss.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeTauxCnss: TypeTauxCnssVo) {
         return this.http.delete<number>(this.API + 'id/' + typeTauxCnss.id);
    }


    public edit(): Observable<TypeTauxCnssVo> {
        return this.http.put<TypeTauxCnssVo>(this.API, this.selectedTypeTauxCnss);
    }


     public findByCriteria(typeTauxCnss:TypeTauxCnssVo):Observable<Array<TypeTauxCnssVo>>{
           return this.http.post<Array<TypeTauxCnssVo>>(this.API +'search', typeTauxCnss);
    }

   public findByIdWithAssociatedList(typeTauxCnss:TypeTauxCnssVo):Observable<TypeTauxCnssVo>{
         return this.http.get<TypeTauxCnssVo>(this.API + 'detail/id/' +typeTauxCnss.id);
    }

    // getters and setters


    get typeTauxCnsss(): Array<TypeTauxCnssVo> {
    if(this._typeTauxCnsss==null){
    this._typeTauxCnsss=new Array<TypeTauxCnssVo>();
    }
return this._typeTauxCnsss;
       }

    set typeTauxCnsss(value: Array<TypeTauxCnssVo>) {
        this._typeTauxCnsss = value;
       }

    get selectedTypeTauxCnss(): TypeTauxCnssVo {
    if(this._selectedTypeTauxCnss==null){
    this._selectedTypeTauxCnss=new TypeTauxCnssVo();
    }
           return this._selectedTypeTauxCnss;
       }

    set selectedTypeTauxCnss(value: TypeTauxCnssVo) {
        this._selectedTypeTauxCnss = value;
       }

    get typeTauxCnssSelections(): Array<TypeTauxCnssVo> {
    if(this._typeTauxCnssSelections==null){
    this._typeTauxCnssSelections=new Array<TypeTauxCnssVo>();
    }
        return this._typeTauxCnssSelections;
       }


    set typeTauxCnssSelections(value: Array<TypeTauxCnssVo>) {
        this._typeTauxCnssSelections = value;
       }

    get createTypeTauxCnssDialog(): boolean {
        return this._createTypeTauxCnssDialog;
       }

    set createTypeTauxCnssDialog(value: boolean) {
        this._createTypeTauxCnssDialog = value;
       }

    get editTypeTauxCnssDialog(): boolean {
        return this._editTypeTauxCnssDialog;
       }

    set editTypeTauxCnssDialog(value: boolean) {
        this._editTypeTauxCnssDialog = value;
       }

    get viewTypeTauxCnssDialog(): boolean {
        return this._viewTypeTauxCnssDialog;
       }

    set viewTypeTauxCnssDialog(value: boolean) {
        this._viewTypeTauxCnssDialog = value;
       }

     get searchTypeTauxCnss(): TypeTauxCnssVo {
     if(this._searchTypeTauxCnss==null){
    this._searchTypeTauxCnss=new TypeTauxCnssVo();
    }
        return this._searchTypeTauxCnss;
    }

    set searchTypeTauxCnss(value: TypeTauxCnssVo) {
        this._searchTypeTauxCnss = value;
       }

}
