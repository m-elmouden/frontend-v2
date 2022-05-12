import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CompteComptableVo} from '../model/CompteComptable.model';
import {SousClasseComptableVo} from '../model/SousClasseComptable.model';


@Injectable({
  providedIn: 'root'
})
export class CompteComptableService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/compteComptable/';
        })
    }
     private _compteComptables: Array<CompteComptableVo> ;
     private _selectedCompteComptable: CompteComptableVo;
     private _compteComptableSelections: Array<CompteComptableVo>;
     private _createCompteComptableDialog: boolean;
     private _editCompteComptableDialog: boolean;
     private _viewCompteComptableDialog: boolean;
     public editCompteComptable$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCompteComptable:CompteComptableVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CompteComptableVo>>(this.API);
    }

    public save(): Observable<CompteComptableVo> {
         return this.http.post<CompteComptableVo>(this.API, this.selectedCompteComptable);
    }

    delete(compteComptable: CompteComptableVo) {
         return this.http.delete<number>(this.API + 'id/' + compteComptable.id);
    }


    public edit(): Observable<CompteComptableVo> {
        return this.http.put<CompteComptableVo>(this.API, this.selectedCompteComptable);
    }


     public findByCriteria(compteComptable:CompteComptableVo):Observable<Array<CompteComptableVo>>{
           return this.http.post<Array<CompteComptableVo>>(this.API +'search', compteComptable);
    }

   public findByIdWithAssociatedList(compteComptable:CompteComptableVo):Observable<CompteComptableVo>{
         return this.http.get<CompteComptableVo>(this.API + 'detail/id/' +compteComptable.id);
    }

    // getters and setters


    get compteComptables(): Array<CompteComptableVo> {
    if(this._compteComptables==null){
    this._compteComptables=new Array<CompteComptableVo>();
    }
return this._compteComptables;
       }

    set compteComptables(value: Array<CompteComptableVo>) {
        this._compteComptables = value;
       }

    get selectedCompteComptable(): CompteComptableVo {
    if(this._selectedCompteComptable==null){
    this._selectedCompteComptable=new CompteComptableVo();
    }
           return this._selectedCompteComptable;
       }

    set selectedCompteComptable(value: CompteComptableVo) {
        this._selectedCompteComptable = value;
       }

    get compteComptableSelections(): Array<CompteComptableVo> {
    if(this._compteComptableSelections==null){
    this._compteComptableSelections=new Array<CompteComptableVo>();
    }
        return this._compteComptableSelections;
       }


    set compteComptableSelections(value: Array<CompteComptableVo>) {
        this._compteComptableSelections = value;
       }

    get createCompteComptableDialog(): boolean {
        return this._createCompteComptableDialog;
       }

    set createCompteComptableDialog(value: boolean) {
        this._createCompteComptableDialog = value;
       }

    get editCompteComptableDialog(): boolean {
        return this._editCompteComptableDialog;
       }

    set editCompteComptableDialog(value: boolean) {
        this._editCompteComptableDialog = value;
       }

    get viewCompteComptableDialog(): boolean {
        return this._viewCompteComptableDialog;
       }

    set viewCompteComptableDialog(value: boolean) {
        this._viewCompteComptableDialog = value;
       }

     get searchCompteComptable(): CompteComptableVo {
     if(this._searchCompteComptable==null){
    this._searchCompteComptable=new CompteComptableVo();
    }
        return this._searchCompteComptable;
    }

    set searchCompteComptable(value: CompteComptableVo) {
        this._searchCompteComptable = value;
       }

}
