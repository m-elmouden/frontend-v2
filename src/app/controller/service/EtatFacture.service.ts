import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatFactureVo} from '../model/EtatFacture.model';


@Injectable({
  providedIn: 'root'
})
export class EtatFactureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatFacture/';
        })
    }
     private _etatFactures: Array<EtatFactureVo> ;
     private _selectedEtatFacture: EtatFactureVo;
     private _etatFactureSelections: Array<EtatFactureVo>;
     private _createEtatFactureDialog: boolean;
     private _editEtatFactureDialog: boolean;
     private _viewEtatFactureDialog: boolean;
     public editEtatFacture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatFacture:EtatFactureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatFactureVo>>(this.API);
    }

    public save(): Observable<EtatFactureVo> {
         return this.http.post<EtatFactureVo>(this.API, this.selectedEtatFacture);
    }

    delete(etatFacture: EtatFactureVo) {
         return this.http.delete<number>(this.API + 'id/' + etatFacture.id);
    }


    public edit(): Observable<EtatFactureVo> {
        return this.http.put<EtatFactureVo>(this.API, this.selectedEtatFacture);
    }


     public findByCriteria(etatFacture:EtatFactureVo):Observable<Array<EtatFactureVo>>{
           return this.http.post<Array<EtatFactureVo>>(this.API +'search', etatFacture);
    }

   public findByIdWithAssociatedList(etatFacture:EtatFactureVo):Observable<EtatFactureVo>{
         return this.http.get<EtatFactureVo>(this.API + 'detail/id/' +etatFacture.id);
    }

    // getters and setters


    get etatFactures(): Array<EtatFactureVo> {
    if(this._etatFactures==null){
    this._etatFactures=new Array<EtatFactureVo>();
    }
return this._etatFactures;
       }

    set etatFactures(value: Array<EtatFactureVo>) {
        this._etatFactures = value;
       }

    get selectedEtatFacture(): EtatFactureVo {
    if(this._selectedEtatFacture==null){
    this._selectedEtatFacture=new EtatFactureVo();
    }
           return this._selectedEtatFacture;
       }

    set selectedEtatFacture(value: EtatFactureVo) {
        this._selectedEtatFacture = value;
       }

    get etatFactureSelections(): Array<EtatFactureVo> {
    if(this._etatFactureSelections==null){
    this._etatFactureSelections=new Array<EtatFactureVo>();
    }
        return this._etatFactureSelections;
       }


    set etatFactureSelections(value: Array<EtatFactureVo>) {
        this._etatFactureSelections = value;
       }

    get createEtatFactureDialog(): boolean {
        return this._createEtatFactureDialog;
       }

    set createEtatFactureDialog(value: boolean) {
        this._createEtatFactureDialog = value;
       }

    get editEtatFactureDialog(): boolean {
        return this._editEtatFactureDialog;
       }

    set editEtatFactureDialog(value: boolean) {
        this._editEtatFactureDialog = value;
       }

    get viewEtatFactureDialog(): boolean {
        return this._viewEtatFactureDialog;
       }

    set viewEtatFactureDialog(value: boolean) {
        this._viewEtatFactureDialog = value;
       }

     get searchEtatFacture(): EtatFactureVo {
     if(this._searchEtatFacture==null){
    this._searchEtatFacture=new EtatFactureVo();
    }
        return this._searchEtatFacture;
    }

    set searchEtatFacture(value: EtatFactureVo) {
        this._searchEtatFacture = value;
       }

}
