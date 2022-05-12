import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ComptableVo} from '../model/Comptable.model';
import {SocieteVo} from '../model/Societe.model';
import {DemandeVo} from '../model/Demande.model';
import {TypeComptableVo} from '../model/TypeComptable.model';


@Injectable({
  providedIn: 'root'
})
export class ComptableService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/comptable/';
        })
    }
     private _comptables: Array<ComptableVo> ;
     private _selectedComptable: ComptableVo;
     private _comptableSelections: Array<ComptableVo>;
     private _createComptableDialog: boolean;
     private _editComptableDialog: boolean;
     private _viewComptableDialog: boolean;
     public editComptable$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchComptable:ComptableVo ;
     private _switchChercheurDialog: boolean;

    // methods

    public findAll(){
     return this.http.get<Array<ComptableVo>>(this.API);
    }

    public save(): Observable<ComptableVo> {
           return this.http.post<ComptableVo>(this.API, {...this.selectedComptable,updatedAt: moment(this.selectedComptable.updatedAt).format("YYYY-MM-DD")});
    }

    delete(comptable: ComptableVo) {
         return this.http.delete<number>(this.API + 'id/' + comptable.id);
    }


    public edit(): Observable<ComptableVo> {
        return this.http.put<ComptableVo>(this.API, this.selectedComptable);
    }


     public findByCriteria(comptable:ComptableVo):Observable<Array<ComptableVo>>{
           return this.http.post<Array<ComptableVo>>(this.API +'search', comptable);
    }

   public findByIdWithAssociatedList(comptable:ComptableVo):Observable<ComptableVo>{
         return this.http.get<ComptableVo>(this.API + 'detail/id/' +comptable.id);
    }

    // getters and setters


    get comptables(): Array<ComptableVo> {
    if(this._comptables==null){
    this._comptables=new Array<ComptableVo>();
    }
return this._comptables;
       }

    set comptables(value: Array<ComptableVo>) {
        this._comptables = value;
       }

    get selectedComptable(): ComptableVo {
    if(this._selectedComptable==null){
    this._selectedComptable=new ComptableVo();
    }
           return this._selectedComptable;
       }

    set selectedComptable(value: ComptableVo) {
        this._selectedComptable = value;
       }

    get comptableSelections(): Array<ComptableVo> {
    if(this._comptableSelections==null){
    this._comptableSelections=new Array<ComptableVo>();
    }
        return this._comptableSelections;
       }


    set comptableSelections(value: Array<ComptableVo>) {
        this._comptableSelections = value;
       }

    get createComptableDialog(): boolean {
        return this._createComptableDialog;
       }

    set createComptableDialog(value: boolean) {
        this._createComptableDialog = value;
       }

    get editComptableDialog(): boolean {
        return this._editComptableDialog;
       }

    set editComptableDialog(value: boolean) {
        this._editComptableDialog = value;
       }

    get viewComptableDialog(): boolean {
        return this._viewComptableDialog;
       }

    set viewComptableDialog(value: boolean) {
        this._viewComptableDialog = value;
       }

     get searchComptable(): ComptableVo {
     if(this._searchComptable==null){
    this._searchComptable=new ComptableVo();
    }
        return this._searchComptable;
    }

    set searchComptable(value: ComptableVo) {
        this._searchComptable = value;
       }

   get switchChercheurDialog(): boolean {
    return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
    this._switchChercheurDialog = value;
    }
}
