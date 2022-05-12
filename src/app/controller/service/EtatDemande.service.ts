import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatDemandeVo} from '../model/EtatDemande.model';


@Injectable({
  providedIn: 'root'
})
export class EtatDemandeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatDemande/';
        })
    }
     private _etatDemandes: Array<EtatDemandeVo> ;
     private _selectedEtatDemande: EtatDemandeVo;
     private _etatDemandeSelections: Array<EtatDemandeVo>;
     private _createEtatDemandeDialog: boolean;
     private _editEtatDemandeDialog: boolean;
     private _viewEtatDemandeDialog: boolean;
     public editEtatDemande$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatDemande:EtatDemandeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatDemandeVo>>(this.API);
    }

    public save(): Observable<EtatDemandeVo> {
         return this.http.post<EtatDemandeVo>(this.API, this.selectedEtatDemande);
    }

    delete(etatDemande: EtatDemandeVo) {
         return this.http.delete<number>(this.API + 'id/' + etatDemande.id);
    }


    public edit(): Observable<EtatDemandeVo> {
        return this.http.put<EtatDemandeVo>(this.API, this.selectedEtatDemande);
    }


     public findByCriteria(etatDemande:EtatDemandeVo):Observable<Array<EtatDemandeVo>>{
           return this.http.post<Array<EtatDemandeVo>>(this.API +'search', etatDemande);
    }

   public findByIdWithAssociatedList(etatDemande:EtatDemandeVo):Observable<EtatDemandeVo>{
         return this.http.get<EtatDemandeVo>(this.API + 'detail/id/' +etatDemande.id);
    }

    // getters and setters


    get etatDemandes(): Array<EtatDemandeVo> {
    if(this._etatDemandes==null){
    this._etatDemandes=new Array<EtatDemandeVo>();
    }
return this._etatDemandes;
       }

    set etatDemandes(value: Array<EtatDemandeVo>) {
        this._etatDemandes = value;
       }

    get selectedEtatDemande(): EtatDemandeVo {
    if(this._selectedEtatDemande==null){
    this._selectedEtatDemande=new EtatDemandeVo();
    }
           return this._selectedEtatDemande;
       }

    set selectedEtatDemande(value: EtatDemandeVo) {
        this._selectedEtatDemande = value;
       }

    get etatDemandeSelections(): Array<EtatDemandeVo> {
    if(this._etatDemandeSelections==null){
    this._etatDemandeSelections=new Array<EtatDemandeVo>();
    }
        return this._etatDemandeSelections;
       }


    set etatDemandeSelections(value: Array<EtatDemandeVo>) {
        this._etatDemandeSelections = value;
       }

    get createEtatDemandeDialog(): boolean {
        return this._createEtatDemandeDialog;
       }

    set createEtatDemandeDialog(value: boolean) {
        this._createEtatDemandeDialog = value;
       }

    get editEtatDemandeDialog(): boolean {
        return this._editEtatDemandeDialog;
       }

    set editEtatDemandeDialog(value: boolean) {
        this._editEtatDemandeDialog = value;
       }

    get viewEtatDemandeDialog(): boolean {
        return this._viewEtatDemandeDialog;
       }

    set viewEtatDemandeDialog(value: boolean) {
        this._viewEtatDemandeDialog = value;
       }

     get searchEtatDemande(): EtatDemandeVo {
     if(this._searchEtatDemande==null){
    this._searchEtatDemande=new EtatDemandeVo();
    }
        return this._searchEtatDemande;
    }

    set searchEtatDemande(value: EtatDemandeVo) {
        this._searchEtatDemande = value;
       }

}
