import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TvaVo} from '../model/Tva.model';


@Injectable({
  providedIn: 'root'
})
export class TvaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tva/';
        })
    }
     private _tvas: Array<TvaVo> ;
     private _selectedTva: TvaVo;
     private _tvaSelections: Array<TvaVo>;
     private _createTvaDialog: boolean;
     private _editTvaDialog: boolean;
     private _viewTvaDialog: boolean;
     public editTva$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTva:TvaVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TvaVo>>(this.API);
    }

    public save(): Observable<TvaVo> {
         return this.http.post<TvaVo>(this.API, this.selectedTva);
    }

    delete(tva: TvaVo) {
         return this.http.delete<number>(this.API + 'id/' + tva.id);
    }


    public edit(): Observable<TvaVo> {
        return this.http.put<TvaVo>(this.API, this.selectedTva);
    }


     public findByCriteria(tva:TvaVo):Observable<Array<TvaVo>>{
           return this.http.post<Array<TvaVo>>(this.API +'search', tva);
    }

   public findByIdWithAssociatedList(tva:TvaVo):Observable<TvaVo>{
         return this.http.get<TvaVo>(this.API + 'detail/id/' +tva.id);
    }

    // getters and setters


    get tvas(): Array<TvaVo> {
    if(this._tvas==null){
    this._tvas=new Array<TvaVo>();
    }
return this._tvas;
       }

    set tvas(value: Array<TvaVo>) {
        this._tvas = value;
       }

    get selectedTva(): TvaVo {
    if(this._selectedTva==null){
    this._selectedTva=new TvaVo();
    }
           return this._selectedTva;
       }

    set selectedTva(value: TvaVo) {
        this._selectedTva = value;
       }

    get tvaSelections(): Array<TvaVo> {
    if(this._tvaSelections==null){
    this._tvaSelections=new Array<TvaVo>();
    }
        return this._tvaSelections;
       }


    set tvaSelections(value: Array<TvaVo>) {
        this._tvaSelections = value;
       }

    get createTvaDialog(): boolean {
        return this._createTvaDialog;
       }

    set createTvaDialog(value: boolean) {
        this._createTvaDialog = value;
       }

    get editTvaDialog(): boolean {
        return this._editTvaDialog;
       }

    set editTvaDialog(value: boolean) {
        this._editTvaDialog = value;
       }

    get viewTvaDialog(): boolean {
        return this._viewTvaDialog;
       }

    set viewTvaDialog(value: boolean) {
        this._viewTvaDialog = value;
       }

     get searchTva(): TvaVo {
     if(this._searchTva==null){
    this._searchTva=new TvaVo();
    }
        return this._searchTva;
    }

    set searchTva(value: TvaVo) {
        this._searchTva = value;
       }

}
