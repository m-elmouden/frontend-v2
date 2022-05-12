import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatPaiementVo} from '../model/EtatPaiement.model';


@Injectable({
  providedIn: 'root'
})
export class EtatPaiementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatPaiement/';
        })
    }
     private _etatPaiements: Array<EtatPaiementVo> ;
     private _selectedEtatPaiement: EtatPaiementVo;
     private _etatPaiementSelections: Array<EtatPaiementVo>;
     private _createEtatPaiementDialog: boolean;
     private _editEtatPaiementDialog: boolean;
     private _viewEtatPaiementDialog: boolean;
     public editEtatPaiement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatPaiement:EtatPaiementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatPaiementVo>>(this.API);
    }

    public save(): Observable<EtatPaiementVo> {
         return this.http.post<EtatPaiementVo>(this.API, this.selectedEtatPaiement);
    }

    delete(etatPaiement: EtatPaiementVo) {
         return this.http.delete<number>(this.API + 'id/' + etatPaiement.id);
    }


    public edit(): Observable<EtatPaiementVo> {
        return this.http.put<EtatPaiementVo>(this.API, this.selectedEtatPaiement);
    }


     public findByCriteria(etatPaiement:EtatPaiementVo):Observable<Array<EtatPaiementVo>>{
           return this.http.post<Array<EtatPaiementVo>>(this.API +'search', etatPaiement);
    }

   public findByIdWithAssociatedList(etatPaiement:EtatPaiementVo):Observable<EtatPaiementVo>{
         return this.http.get<EtatPaiementVo>(this.API + 'detail/id/' +etatPaiement.id);
    }

    // getters and setters


    get etatPaiements(): Array<EtatPaiementVo> {
    if(this._etatPaiements==null){
    this._etatPaiements=new Array<EtatPaiementVo>();
    }
return this._etatPaiements;
       }

    set etatPaiements(value: Array<EtatPaiementVo>) {
        this._etatPaiements = value;
       }

    get selectedEtatPaiement(): EtatPaiementVo {
    if(this._selectedEtatPaiement==null){
    this._selectedEtatPaiement=new EtatPaiementVo();
    }
           return this._selectedEtatPaiement;
       }

    set selectedEtatPaiement(value: EtatPaiementVo) {
        this._selectedEtatPaiement = value;
       }

    get etatPaiementSelections(): Array<EtatPaiementVo> {
    if(this._etatPaiementSelections==null){
    this._etatPaiementSelections=new Array<EtatPaiementVo>();
    }
        return this._etatPaiementSelections;
       }


    set etatPaiementSelections(value: Array<EtatPaiementVo>) {
        this._etatPaiementSelections = value;
       }

    get createEtatPaiementDialog(): boolean {
        return this._createEtatPaiementDialog;
       }

    set createEtatPaiementDialog(value: boolean) {
        this._createEtatPaiementDialog = value;
       }

    get editEtatPaiementDialog(): boolean {
        return this._editEtatPaiementDialog;
       }

    set editEtatPaiementDialog(value: boolean) {
        this._editEtatPaiementDialog = value;
       }

    get viewEtatPaiementDialog(): boolean {
        return this._viewEtatPaiementDialog;
       }

    set viewEtatPaiementDialog(value: boolean) {
        this._viewEtatPaiementDialog = value;
       }

     get searchEtatPaiement(): EtatPaiementVo {
     if(this._searchEtatPaiement==null){
    this._searchEtatPaiement=new EtatPaiementVo();
    }
        return this._searchEtatPaiement;
    }

    set searchEtatPaiement(value: EtatPaiementVo) {
        this._searchEtatPaiement = value;
       }

}
