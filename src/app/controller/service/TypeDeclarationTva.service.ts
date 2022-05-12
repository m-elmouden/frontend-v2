import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeDeclarationTvaVo} from '../model/TypeDeclarationTva.model';


@Injectable({
  providedIn: 'root'
})
export class TypeDeclarationTvaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeDeclarationTva/';
        })
    }
     private _typeDeclarationTvas: Array<TypeDeclarationTvaVo> ;
     private _selectedTypeDeclarationTva: TypeDeclarationTvaVo;
     private _typeDeclarationTvaSelections: Array<TypeDeclarationTvaVo>;
     private _createTypeDeclarationTvaDialog: boolean;
     private _editTypeDeclarationTvaDialog: boolean;
     private _viewTypeDeclarationTvaDialog: boolean;
     public editTypeDeclarationTva$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeDeclarationTva:TypeDeclarationTvaVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeDeclarationTvaVo>>(this.API);
    }

    public save(): Observable<TypeDeclarationTvaVo> {
         return this.http.post<TypeDeclarationTvaVo>(this.API, this.selectedTypeDeclarationTva);
    }

    delete(typeDeclarationTva: TypeDeclarationTvaVo) {
         return this.http.delete<number>(this.API + 'id/' + typeDeclarationTva.id);
    }


    public edit(): Observable<TypeDeclarationTvaVo> {
        return this.http.put<TypeDeclarationTvaVo>(this.API, this.selectedTypeDeclarationTva);
    }


     public findByCriteria(typeDeclarationTva:TypeDeclarationTvaVo):Observable<Array<TypeDeclarationTvaVo>>{
           return this.http.post<Array<TypeDeclarationTvaVo>>(this.API +'search', typeDeclarationTva);
    }

   public findByIdWithAssociatedList(typeDeclarationTva:TypeDeclarationTvaVo):Observable<TypeDeclarationTvaVo>{
         return this.http.get<TypeDeclarationTvaVo>(this.API + 'detail/id/' +typeDeclarationTva.id);
    }

    // getters and setters


    get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
    if(this._typeDeclarationTvas==null){
    this._typeDeclarationTvas=new Array<TypeDeclarationTvaVo>();
    }
return this._typeDeclarationTvas;
       }

    set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this._typeDeclarationTvas = value;
       }

    get selectedTypeDeclarationTva(): TypeDeclarationTvaVo {
    if(this._selectedTypeDeclarationTva==null){
    this._selectedTypeDeclarationTva=new TypeDeclarationTvaVo();
    }
           return this._selectedTypeDeclarationTva;
       }

    set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this._selectedTypeDeclarationTva = value;
       }

    get typeDeclarationTvaSelections(): Array<TypeDeclarationTvaVo> {
    if(this._typeDeclarationTvaSelections==null){
    this._typeDeclarationTvaSelections=new Array<TypeDeclarationTvaVo>();
    }
        return this._typeDeclarationTvaSelections;
       }


    set typeDeclarationTvaSelections(value: Array<TypeDeclarationTvaVo>) {
        this._typeDeclarationTvaSelections = value;
       }

    get createTypeDeclarationTvaDialog(): boolean {
        return this._createTypeDeclarationTvaDialog;
       }

    set createTypeDeclarationTvaDialog(value: boolean) {
        this._createTypeDeclarationTvaDialog = value;
       }

    get editTypeDeclarationTvaDialog(): boolean {
        return this._editTypeDeclarationTvaDialog;
       }

    set editTypeDeclarationTvaDialog(value: boolean) {
        this._editTypeDeclarationTvaDialog = value;
       }

    get viewTypeDeclarationTvaDialog(): boolean {
        return this._viewTypeDeclarationTvaDialog;
       }

    set viewTypeDeclarationTvaDialog(value: boolean) {
        this._viewTypeDeclarationTvaDialog = value;
       }

     get searchTypeDeclarationTva(): TypeDeclarationTvaVo {
     if(this._searchTypeDeclarationTva==null){
    this._searchTypeDeclarationTva=new TypeDeclarationTvaVo();
    }
        return this._searchTypeDeclarationTva;
    }

    set searchTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this._searchTypeDeclarationTva = value;
       }

}
