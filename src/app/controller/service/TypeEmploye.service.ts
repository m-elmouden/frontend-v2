import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeEmployeVo} from '../model/TypeEmploye.model';


@Injectable({
  providedIn: 'root'
})
export class TypeEmployeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeEmploye/';
        })
    }
     private _typeEmployes: Array<TypeEmployeVo> ;
     private _selectedTypeEmploye: TypeEmployeVo;
     private _typeEmployeSelections: Array<TypeEmployeVo>;
     private _createTypeEmployeDialog: boolean;
     private _editTypeEmployeDialog: boolean;
     private _viewTypeEmployeDialog: boolean;
     public editTypeEmploye$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeEmploye:TypeEmployeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeEmployeVo>>(this.API);
    }

    public save(): Observable<TypeEmployeVo> {
         return this.http.post<TypeEmployeVo>(this.API, this.selectedTypeEmploye);
    }

    delete(typeEmploye: TypeEmployeVo) {
         return this.http.delete<number>(this.API + 'id/' + typeEmploye.id);
    }


    public edit(): Observable<TypeEmployeVo> {
        return this.http.put<TypeEmployeVo>(this.API, this.selectedTypeEmploye);
    }


     public findByCriteria(typeEmploye:TypeEmployeVo):Observable<Array<TypeEmployeVo>>{
           return this.http.post<Array<TypeEmployeVo>>(this.API +'search', typeEmploye);
    }

   public findByIdWithAssociatedList(typeEmploye:TypeEmployeVo):Observable<TypeEmployeVo>{
         return this.http.get<TypeEmployeVo>(this.API + 'detail/id/' +typeEmploye.id);
    }

    // getters and setters


    get typeEmployes(): Array<TypeEmployeVo> {
    if(this._typeEmployes==null){
    this._typeEmployes=new Array<TypeEmployeVo>();
    }
return this._typeEmployes;
       }

    set typeEmployes(value: Array<TypeEmployeVo>) {
        this._typeEmployes = value;
       }

    get selectedTypeEmploye(): TypeEmployeVo {
    if(this._selectedTypeEmploye==null){
    this._selectedTypeEmploye=new TypeEmployeVo();
    }
           return this._selectedTypeEmploye;
       }

    set selectedTypeEmploye(value: TypeEmployeVo) {
        this._selectedTypeEmploye = value;
       }

    get typeEmployeSelections(): Array<TypeEmployeVo> {
    if(this._typeEmployeSelections==null){
    this._typeEmployeSelections=new Array<TypeEmployeVo>();
    }
        return this._typeEmployeSelections;
       }


    set typeEmployeSelections(value: Array<TypeEmployeVo>) {
        this._typeEmployeSelections = value;
       }

    get createTypeEmployeDialog(): boolean {
        return this._createTypeEmployeDialog;
       }

    set createTypeEmployeDialog(value: boolean) {
        this._createTypeEmployeDialog = value;
       }

    get editTypeEmployeDialog(): boolean {
        return this._editTypeEmployeDialog;
       }

    set editTypeEmployeDialog(value: boolean) {
        this._editTypeEmployeDialog = value;
       }

    get viewTypeEmployeDialog(): boolean {
        return this._viewTypeEmployeDialog;
       }

    set viewTypeEmployeDialog(value: boolean) {
        this._viewTypeEmployeDialog = value;
       }

     get searchTypeEmploye(): TypeEmployeVo {
     if(this._searchTypeEmploye==null){
    this._searchTypeEmploye=new TypeEmployeVo();
    }
        return this._searchTypeEmploye;
    }

    set searchTypeEmploye(value: TypeEmployeVo) {
        this._searchTypeEmploye = value;
       }

}
