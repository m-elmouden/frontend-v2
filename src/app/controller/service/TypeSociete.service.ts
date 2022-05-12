import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeSocieteVo} from '../model/TypeSociete.model';


@Injectable({
  providedIn: 'root'
})
export class TypeSocieteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeSociete/';
        })
    }
     private _typeSocietes: Array<TypeSocieteVo> ;
     private _selectedTypeSociete: TypeSocieteVo;
     private _typeSocieteSelections: Array<TypeSocieteVo>;
     private _createTypeSocieteDialog: boolean;
     private _editTypeSocieteDialog: boolean;
     private _viewTypeSocieteDialog: boolean;
     public editTypeSociete$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeSociete:TypeSocieteVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeSocieteVo>>(this.API);
    }

    public save(): Observable<TypeSocieteVo> {
         return this.http.post<TypeSocieteVo>(this.API, this.selectedTypeSociete);
    }

    delete(typeSociete: TypeSocieteVo) {
         return this.http.delete<number>(this.API + 'id/' + typeSociete.id);
    }


    public edit(): Observable<TypeSocieteVo> {
        return this.http.put<TypeSocieteVo>(this.API, this.selectedTypeSociete);
    }


     public findByCriteria(typeSociete:TypeSocieteVo):Observable<Array<TypeSocieteVo>>{
           return this.http.post<Array<TypeSocieteVo>>(this.API +'search', typeSociete);
    }

   public findByIdWithAssociatedList(typeSociete:TypeSocieteVo):Observable<TypeSocieteVo>{
         return this.http.get<TypeSocieteVo>(this.API + 'detail/id/' +typeSociete.id);
    }

    // getters and setters


    get typeSocietes(): Array<TypeSocieteVo> {
    if(this._typeSocietes==null){
    this._typeSocietes=new Array<TypeSocieteVo>();
    }
return this._typeSocietes;
       }

    set typeSocietes(value: Array<TypeSocieteVo>) {
        this._typeSocietes = value;
       }

    get selectedTypeSociete(): TypeSocieteVo {
    if(this._selectedTypeSociete==null){
    this._selectedTypeSociete=new TypeSocieteVo();
    }
           return this._selectedTypeSociete;
       }

    set selectedTypeSociete(value: TypeSocieteVo) {
        this._selectedTypeSociete = value;
       }

    get typeSocieteSelections(): Array<TypeSocieteVo> {
    if(this._typeSocieteSelections==null){
    this._typeSocieteSelections=new Array<TypeSocieteVo>();
    }
        return this._typeSocieteSelections;
       }


    set typeSocieteSelections(value: Array<TypeSocieteVo>) {
        this._typeSocieteSelections = value;
       }

    get createTypeSocieteDialog(): boolean {
        return this._createTypeSocieteDialog;
       }

    set createTypeSocieteDialog(value: boolean) {
        this._createTypeSocieteDialog = value;
       }

    get editTypeSocieteDialog(): boolean {
        return this._editTypeSocieteDialog;
       }

    set editTypeSocieteDialog(value: boolean) {
        this._editTypeSocieteDialog = value;
       }

    get viewTypeSocieteDialog(): boolean {
        return this._viewTypeSocieteDialog;
       }

    set viewTypeSocieteDialog(value: boolean) {
        this._viewTypeSocieteDialog = value;
       }

     get searchTypeSociete(): TypeSocieteVo {
     if(this._searchTypeSociete==null){
    this._searchTypeSociete=new TypeSocieteVo();
    }
        return this._searchTypeSociete;
    }

    set searchTypeSociete(value: TypeSocieteVo) {
        this._searchTypeSociete = value;
       }

}
