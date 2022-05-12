import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DemandePieceJointeVo} from '../model/DemandePieceJointe.model';
import {DemandeVo} from '../model/Demande.model';


@Injectable({
  providedIn: 'root'
})
export class DemandePieceJointeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/demandePieceJointe/';
        })
    }
     private _demandePieceJointes: Array<DemandePieceJointeVo> ;
     private _selectedDemandePieceJointe: DemandePieceJointeVo;
     private _demandePieceJointeSelections: Array<DemandePieceJointeVo>;
     private _createDemandePieceJointeDialog: boolean;
     private _editDemandePieceJointeDialog: boolean;
     private _viewDemandePieceJointeDialog: boolean;
     public editDemandePieceJointe$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDemandePieceJointe:DemandePieceJointeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DemandePieceJointeVo>>(this.API);
    }

    public save(): Observable<DemandePieceJointeVo> {
         return this.http.post<DemandePieceJointeVo>(this.API, this.selectedDemandePieceJointe);
    }

    delete(demandePieceJointe: DemandePieceJointeVo) {
         return this.http.delete<number>(this.API + 'id/' + demandePieceJointe.id);
    }


    public edit(): Observable<DemandePieceJointeVo> {
        return this.http.put<DemandePieceJointeVo>(this.API, this.selectedDemandePieceJointe);
    }


     public findByCriteria(demandePieceJointe:DemandePieceJointeVo):Observable<Array<DemandePieceJointeVo>>{
           return this.http.post<Array<DemandePieceJointeVo>>(this.API +'search', demandePieceJointe);
    }

   public findByIdWithAssociatedList(demandePieceJointe:DemandePieceJointeVo):Observable<DemandePieceJointeVo>{
         return this.http.get<DemandePieceJointeVo>(this.API + 'detail/id/' +demandePieceJointe.id);
    }

    // getters and setters


    get demandePieceJointes(): Array<DemandePieceJointeVo> {
    if(this._demandePieceJointes==null){
    this._demandePieceJointes=new Array<DemandePieceJointeVo>();
    }
return this._demandePieceJointes;
       }

    set demandePieceJointes(value: Array<DemandePieceJointeVo>) {
        this._demandePieceJointes = value;
       }

    get selectedDemandePieceJointe(): DemandePieceJointeVo {
    if(this._selectedDemandePieceJointe==null){
    this._selectedDemandePieceJointe=new DemandePieceJointeVo();
    }
           return this._selectedDemandePieceJointe;
       }

    set selectedDemandePieceJointe(value: DemandePieceJointeVo) {
        this._selectedDemandePieceJointe = value;
       }

    get demandePieceJointeSelections(): Array<DemandePieceJointeVo> {
    if(this._demandePieceJointeSelections==null){
    this._demandePieceJointeSelections=new Array<DemandePieceJointeVo>();
    }
        return this._demandePieceJointeSelections;
       }


    set demandePieceJointeSelections(value: Array<DemandePieceJointeVo>) {
        this._demandePieceJointeSelections = value;
       }

    get createDemandePieceJointeDialog(): boolean {
        return this._createDemandePieceJointeDialog;
       }

    set createDemandePieceJointeDialog(value: boolean) {
        this._createDemandePieceJointeDialog = value;
       }

    get editDemandePieceJointeDialog(): boolean {
        return this._editDemandePieceJointeDialog;
       }

    set editDemandePieceJointeDialog(value: boolean) {
        this._editDemandePieceJointeDialog = value;
       }

    get viewDemandePieceJointeDialog(): boolean {
        return this._viewDemandePieceJointeDialog;
       }

    set viewDemandePieceJointeDialog(value: boolean) {
        this._viewDemandePieceJointeDialog = value;
       }

     get searchDemandePieceJointe(): DemandePieceJointeVo {
     if(this._searchDemandePieceJointe==null){
    this._searchDemandePieceJointe=new DemandePieceJointeVo();
    }
        return this._searchDemandePieceJointe;
    }

    set searchDemandePieceJointe(value: DemandePieceJointeVo) {
        this._searchDemandePieceJointe = value;
       }

}
