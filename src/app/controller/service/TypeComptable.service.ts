import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeComptableVo} from '../model/TypeComptable.model';


@Injectable({
  providedIn: 'root'
})
export class TypeComptableService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeComptable/';
        })
    }
     private _typeComptables: Array<TypeComptableVo> ;
     private _selectedTypeComptable: TypeComptableVo;
     private _typeComptableSelections: Array<TypeComptableVo>;
     private _createTypeComptableDialog: boolean;
     private _editTypeComptableDialog: boolean;
     private _viewTypeComptableDialog: boolean;
     public editTypeComptable$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeComptable:TypeComptableVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeComptableVo>>(this.API);
    }

    public save(): Observable<TypeComptableVo> {
         return this.http.post<TypeComptableVo>(this.API, this.selectedTypeComptable);
    }

    delete(typeComptable: TypeComptableVo) {
         return this.http.delete<number>(this.API + 'id/' + typeComptable.id);
    }


    public edit(): Observable<TypeComptableVo> {
        return this.http.put<TypeComptableVo>(this.API, this.selectedTypeComptable);
    }


     public findByCriteria(typeComptable:TypeComptableVo):Observable<Array<TypeComptableVo>>{
           return this.http.post<Array<TypeComptableVo>>(this.API +'search', typeComptable);
    }

   public findByIdWithAssociatedList(typeComptable:TypeComptableVo):Observable<TypeComptableVo>{
         return this.http.get<TypeComptableVo>(this.API + 'detail/id/' +typeComptable.id);
    }

    // getters and setters


    get typeComptables(): Array<TypeComptableVo> {
    if(this._typeComptables==null){
    this._typeComptables=new Array<TypeComptableVo>();
    }
return this._typeComptables;
       }

    set typeComptables(value: Array<TypeComptableVo>) {
        this._typeComptables = value;
       }

    get selectedTypeComptable(): TypeComptableVo {
    if(this._selectedTypeComptable==null){
    this._selectedTypeComptable=new TypeComptableVo();
    }
           return this._selectedTypeComptable;
       }

    set selectedTypeComptable(value: TypeComptableVo) {
        this._selectedTypeComptable = value;
       }

    get typeComptableSelections(): Array<TypeComptableVo> {
    if(this._typeComptableSelections==null){
    this._typeComptableSelections=new Array<TypeComptableVo>();
    }
        return this._typeComptableSelections;
       }


    set typeComptableSelections(value: Array<TypeComptableVo>) {
        this._typeComptableSelections = value;
       }

    get createTypeComptableDialog(): boolean {
        return this._createTypeComptableDialog;
       }

    set createTypeComptableDialog(value: boolean) {
        this._createTypeComptableDialog = value;
       }

    get editTypeComptableDialog(): boolean {
        return this._editTypeComptableDialog;
       }

    set editTypeComptableDialog(value: boolean) {
        this._editTypeComptableDialog = value;
       }

    get viewTypeComptableDialog(): boolean {
        return this._viewTypeComptableDialog;
       }

    set viewTypeComptableDialog(value: boolean) {
        this._viewTypeComptableDialog = value;
       }

     get searchTypeComptable(): TypeComptableVo {
     if(this._searchTypeComptable==null){
    this._searchTypeComptable=new TypeComptableVo();
    }
        return this._searchTypeComptable;
    }

    set searchTypeComptable(value: TypeComptableVo) {
        this._searchTypeComptable = value;
       }

}
