import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PresidentSocieteVo} from '../model/PresidentSociete.model';
import {SocieteVo} from '../model/Societe.model';


@Injectable({
  providedIn: 'root'
})
export class PresidentSocieteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/presidentSociete/';
        })
    }
     private _presidentSocietes: Array<PresidentSocieteVo> ;
     private _selectedPresidentSociete: PresidentSocieteVo;
     private _presidentSocieteSelections: Array<PresidentSocieteVo>;
     private _createPresidentSocieteDialog: boolean;
     private _editPresidentSocieteDialog: boolean;
     private _viewPresidentSocieteDialog: boolean;
     public editPresidentSociete$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPresidentSociete:PresidentSocieteVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PresidentSocieteVo>>(this.API);
    }

    public save(): Observable<PresidentSocieteVo> {
         return this.http.post<PresidentSocieteVo>(this.API, this.selectedPresidentSociete);
    }

    delete(presidentSociete: PresidentSocieteVo) {
         return this.http.delete<number>(this.API + 'id/' + presidentSociete.id);
    }


    public edit(): Observable<PresidentSocieteVo> {
        return this.http.put<PresidentSocieteVo>(this.API, this.selectedPresidentSociete);
    }


     public findByCriteria(presidentSociete:PresidentSocieteVo):Observable<Array<PresidentSocieteVo>>{
           return this.http.post<Array<PresidentSocieteVo>>(this.API +'search', presidentSociete);
    }

   public findByIdWithAssociatedList(presidentSociete:PresidentSocieteVo):Observable<PresidentSocieteVo>{
         return this.http.get<PresidentSocieteVo>(this.API + 'detail/id/' +presidentSociete.id);
    }

    // getters and setters


    get presidentSocietes(): Array<PresidentSocieteVo> {
    if(this._presidentSocietes==null){
    this._presidentSocietes=new Array<PresidentSocieteVo>();
    }
return this._presidentSocietes;
       }

    set presidentSocietes(value: Array<PresidentSocieteVo>) {
        this._presidentSocietes = value;
       }

    get selectedPresidentSociete(): PresidentSocieteVo {
    if(this._selectedPresidentSociete==null){
    this._selectedPresidentSociete=new PresidentSocieteVo();
    }
           return this._selectedPresidentSociete;
       }

    set selectedPresidentSociete(value: PresidentSocieteVo) {
        this._selectedPresidentSociete = value;
       }

    get presidentSocieteSelections(): Array<PresidentSocieteVo> {
    if(this._presidentSocieteSelections==null){
    this._presidentSocieteSelections=new Array<PresidentSocieteVo>();
    }
        return this._presidentSocieteSelections;
       }


    set presidentSocieteSelections(value: Array<PresidentSocieteVo>) {
        this._presidentSocieteSelections = value;
       }

    get createPresidentSocieteDialog(): boolean {
        return this._createPresidentSocieteDialog;
       }

    set createPresidentSocieteDialog(value: boolean) {
        this._createPresidentSocieteDialog = value;
       }

    get editPresidentSocieteDialog(): boolean {
        return this._editPresidentSocieteDialog;
       }

    set editPresidentSocieteDialog(value: boolean) {
        this._editPresidentSocieteDialog = value;
       }

    get viewPresidentSocieteDialog(): boolean {
        return this._viewPresidentSocieteDialog;
       }

    set viewPresidentSocieteDialog(value: boolean) {
        this._viewPresidentSocieteDialog = value;
       }

     get searchPresidentSociete(): PresidentSocieteVo {
     if(this._searchPresidentSociete==null){
    this._searchPresidentSociete=new PresidentSocieteVo();
    }
        return this._searchPresidentSociete;
    }

    set searchPresidentSociete(value: PresidentSocieteVo) {
        this._searchPresidentSociete = value;
       }

}
