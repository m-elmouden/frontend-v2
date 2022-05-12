import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FacturePieceJointeVo} from '../model/FacturePieceJointe.model';
import {FactureVo} from '../model/Facture.model';


@Injectable({
  providedIn: 'root'
})
export class FacturePieceJointeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/facturePieceJointe/';
        })
    }
     private _facturePieceJointes: Array<FacturePieceJointeVo> ;
     private _selectedFacturePieceJointe: FacturePieceJointeVo;
     private _facturePieceJointeSelections: Array<FacturePieceJointeVo>;
     private _createFacturePieceJointeDialog: boolean;
     private _editFacturePieceJointeDialog: boolean;
     private _viewFacturePieceJointeDialog: boolean;
     public editFacturePieceJointe$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFacturePieceJointe:FacturePieceJointeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FacturePieceJointeVo>>(this.API);
    }

    public save(): Observable<FacturePieceJointeVo> {
         return this.http.post<FacturePieceJointeVo>(this.API, this.selectedFacturePieceJointe);
    }

    delete(facturePieceJointe: FacturePieceJointeVo) {
         return this.http.delete<number>(this.API + 'id/' + facturePieceJointe.id);
    }


    public edit(): Observable<FacturePieceJointeVo> {
        return this.http.put<FacturePieceJointeVo>(this.API, this.selectedFacturePieceJointe);
    }


     public findByCriteria(facturePieceJointe:FacturePieceJointeVo):Observable<Array<FacturePieceJointeVo>>{
           return this.http.post<Array<FacturePieceJointeVo>>(this.API +'search', facturePieceJointe);
    }

   public findByIdWithAssociatedList(facturePieceJointe:FacturePieceJointeVo):Observable<FacturePieceJointeVo>{
         return this.http.get<FacturePieceJointeVo>(this.API + 'detail/id/' +facturePieceJointe.id);
    }

    // getters and setters


    get facturePieceJointes(): Array<FacturePieceJointeVo> {
    if(this._facturePieceJointes==null){
    this._facturePieceJointes=new Array<FacturePieceJointeVo>();
    }
return this._facturePieceJointes;
       }

    set facturePieceJointes(value: Array<FacturePieceJointeVo>) {
        this._facturePieceJointes = value;
       }

    get selectedFacturePieceJointe(): FacturePieceJointeVo {
    if(this._selectedFacturePieceJointe==null){
    this._selectedFacturePieceJointe=new FacturePieceJointeVo();
    }
           return this._selectedFacturePieceJointe;
       }

    set selectedFacturePieceJointe(value: FacturePieceJointeVo) {
        this._selectedFacturePieceJointe = value;
       }

    get facturePieceJointeSelections(): Array<FacturePieceJointeVo> {
    if(this._facturePieceJointeSelections==null){
    this._facturePieceJointeSelections=new Array<FacturePieceJointeVo>();
    }
        return this._facturePieceJointeSelections;
       }


    set facturePieceJointeSelections(value: Array<FacturePieceJointeVo>) {
        this._facturePieceJointeSelections = value;
       }

    get createFacturePieceJointeDialog(): boolean {
        return this._createFacturePieceJointeDialog;
       }

    set createFacturePieceJointeDialog(value: boolean) {
        this._createFacturePieceJointeDialog = value;
       }

    get editFacturePieceJointeDialog(): boolean {
        return this._editFacturePieceJointeDialog;
       }

    set editFacturePieceJointeDialog(value: boolean) {
        this._editFacturePieceJointeDialog = value;
       }

    get viewFacturePieceJointeDialog(): boolean {
        return this._viewFacturePieceJointeDialog;
       }

    set viewFacturePieceJointeDialog(value: boolean) {
        this._viewFacturePieceJointeDialog = value;
       }

     get searchFacturePieceJointe(): FacturePieceJointeVo {
     if(this._searchFacturePieceJointe==null){
    this._searchFacturePieceJointe=new FacturePieceJointeVo();
    }
        return this._searchFacturePieceJointe;
    }

    set searchFacturePieceJointe(value: FacturePieceJointeVo) {
        this._searchFacturePieceJointe = value;
       }

}
