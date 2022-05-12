import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {SousClasseComptableVo} from '../model/SousClasseComptable.model';
import {ClasseComptableVo} from '../model/ClasseComptable.model';
import {CompteComptableVo} from '../model/CompteComptable.model';


@Injectable({
  providedIn: 'root'
})
export class SousClasseComptableService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/sousClasseComptable/';
        })
    }
     private _sousClasseComptables: Array<SousClasseComptableVo> ;
     private _selectedSousClasseComptable: SousClasseComptableVo;
     private _sousClasseComptableSelections: Array<SousClasseComptableVo>;
     private _createSousClasseComptableDialog: boolean;
     private _editSousClasseComptableDialog: boolean;
     private _viewSousClasseComptableDialog: boolean;
     public editSousClasseComptable$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchSousClasseComptable:SousClasseComptableVo ;

    // methods

    public findAll(){
     return this.http.get<Array<SousClasseComptableVo>>(this.API);
    }

    public save(): Observable<SousClasseComptableVo> {
         return this.http.post<SousClasseComptableVo>(this.API, this.selectedSousClasseComptable);
    }

    delete(sousClasseComptable: SousClasseComptableVo) {
         return this.http.delete<number>(this.API + 'id/' + sousClasseComptable.id);
    }


    public edit(): Observable<SousClasseComptableVo> {
        return this.http.put<SousClasseComptableVo>(this.API, this.selectedSousClasseComptable);
    }


     public findByCriteria(sousClasseComptable:SousClasseComptableVo):Observable<Array<SousClasseComptableVo>>{
           return this.http.post<Array<SousClasseComptableVo>>(this.API +'search', sousClasseComptable);
    }

   public findByIdWithAssociatedList(sousClasseComptable:SousClasseComptableVo):Observable<SousClasseComptableVo>{
         return this.http.get<SousClasseComptableVo>(this.API + 'detail/id/' +sousClasseComptable.id);
    }

    // getters and setters


    get sousClasseComptables(): Array<SousClasseComptableVo> {
    if(this._sousClasseComptables==null){
    this._sousClasseComptables=new Array<SousClasseComptableVo>();
    }
return this._sousClasseComptables;
       }

    set sousClasseComptables(value: Array<SousClasseComptableVo>) {
        this._sousClasseComptables = value;
       }

    get selectedSousClasseComptable(): SousClasseComptableVo {
    if(this._selectedSousClasseComptable==null){
    this._selectedSousClasseComptable=new SousClasseComptableVo();
    }
           return this._selectedSousClasseComptable;
       }

    set selectedSousClasseComptable(value: SousClasseComptableVo) {
        this._selectedSousClasseComptable = value;
       }

    get sousClasseComptableSelections(): Array<SousClasseComptableVo> {
    if(this._sousClasseComptableSelections==null){
    this._sousClasseComptableSelections=new Array<SousClasseComptableVo>();
    }
        return this._sousClasseComptableSelections;
       }


    set sousClasseComptableSelections(value: Array<SousClasseComptableVo>) {
        this._sousClasseComptableSelections = value;
       }

    get createSousClasseComptableDialog(): boolean {
        return this._createSousClasseComptableDialog;
       }

    set createSousClasseComptableDialog(value: boolean) {
        this._createSousClasseComptableDialog = value;
       }

    get editSousClasseComptableDialog(): boolean {
        return this._editSousClasseComptableDialog;
       }

    set editSousClasseComptableDialog(value: boolean) {
        this._editSousClasseComptableDialog = value;
       }

    get viewSousClasseComptableDialog(): boolean {
        return this._viewSousClasseComptableDialog;
       }

    set viewSousClasseComptableDialog(value: boolean) {
        this._viewSousClasseComptableDialog = value;
       }

     get searchSousClasseComptable(): SousClasseComptableVo {
     if(this._searchSousClasseComptable==null){
    this._searchSousClasseComptable=new SousClasseComptableVo();
    }
        return this._searchSousClasseComptable;
    }

    set searchSousClasseComptable(value: SousClasseComptableVo) {
        this._searchSousClasseComptable = value;
       }

}
