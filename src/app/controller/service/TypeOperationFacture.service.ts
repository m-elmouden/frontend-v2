import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeOperationFactureVo} from '../model/TypeOperationFacture.model';


@Injectable({
  providedIn: 'root'
})
export class TypeOperationFactureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeOperationFacture/';
        })
    }
     private _typeOperationFactures: Array<TypeOperationFactureVo> ;
     private _selectedTypeOperationFacture: TypeOperationFactureVo;
     private _typeOperationFactureSelections: Array<TypeOperationFactureVo>;
     private _createTypeOperationFactureDialog: boolean;
     private _editTypeOperationFactureDialog: boolean;
     private _viewTypeOperationFactureDialog: boolean;
     public editTypeOperationFacture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeOperationFacture:TypeOperationFactureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeOperationFactureVo>>(this.API);
    }

    public save(): Observable<TypeOperationFactureVo> {
         return this.http.post<TypeOperationFactureVo>(this.API, this.selectedTypeOperationFacture);
    }

    delete(typeOperationFacture: TypeOperationFactureVo) {
         return this.http.delete<number>(this.API + 'id/' + typeOperationFacture.id);
    }


    public edit(): Observable<TypeOperationFactureVo> {
        return this.http.put<TypeOperationFactureVo>(this.API, this.selectedTypeOperationFacture);
    }


     public findByCriteria(typeOperationFacture:TypeOperationFactureVo):Observable<Array<TypeOperationFactureVo>>{
           return this.http.post<Array<TypeOperationFactureVo>>(this.API +'search', typeOperationFacture);
    }

   public findByIdWithAssociatedList(typeOperationFacture:TypeOperationFactureVo):Observable<TypeOperationFactureVo>{
         return this.http.get<TypeOperationFactureVo>(this.API + 'detail/id/' +typeOperationFacture.id);
    }

    // getters and setters


    get typeOperationFactures(): Array<TypeOperationFactureVo> {
    if(this._typeOperationFactures==null){
    this._typeOperationFactures=new Array<TypeOperationFactureVo>();
    }
return this._typeOperationFactures;
       }

    set typeOperationFactures(value: Array<TypeOperationFactureVo>) {
        this._typeOperationFactures = value;
       }

    get selectedTypeOperationFacture(): TypeOperationFactureVo {
    if(this._selectedTypeOperationFacture==null){
    this._selectedTypeOperationFacture=new TypeOperationFactureVo();
    }
           return this._selectedTypeOperationFacture;
       }

    set selectedTypeOperationFacture(value: TypeOperationFactureVo) {
        this._selectedTypeOperationFacture = value;
       }

    get typeOperationFactureSelections(): Array<TypeOperationFactureVo> {
    if(this._typeOperationFactureSelections==null){
    this._typeOperationFactureSelections=new Array<TypeOperationFactureVo>();
    }
        return this._typeOperationFactureSelections;
       }


    set typeOperationFactureSelections(value: Array<TypeOperationFactureVo>) {
        this._typeOperationFactureSelections = value;
       }

    get createTypeOperationFactureDialog(): boolean {
        return this._createTypeOperationFactureDialog;
       }

    set createTypeOperationFactureDialog(value: boolean) {
        this._createTypeOperationFactureDialog = value;
       }

    get editTypeOperationFactureDialog(): boolean {
        return this._editTypeOperationFactureDialog;
       }

    set editTypeOperationFactureDialog(value: boolean) {
        this._editTypeOperationFactureDialog = value;
       }

    get viewTypeOperationFactureDialog(): boolean {
        return this._viewTypeOperationFactureDialog;
       }

    set viewTypeOperationFactureDialog(value: boolean) {
        this._viewTypeOperationFactureDialog = value;
       }

     get searchTypeOperationFacture(): TypeOperationFactureVo {
     if(this._searchTypeOperationFacture==null){
    this._searchTypeOperationFacture=new TypeOperationFactureVo();
    }
        return this._searchTypeOperationFacture;
    }

    set searchTypeOperationFacture(value: TypeOperationFactureVo) {
        this._searchTypeOperationFacture = value;
       }

}
