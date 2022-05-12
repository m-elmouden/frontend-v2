import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {SocieteVo} from '../model/Societe.model';
import {TypeSocieteVo} from '../model/TypeSociete.model';
import {DeclarationTvaVo} from '../model/DeclarationTva.model';
import {AcompteVo} from '../model/Acompte.model';
import {PresidentSocieteVo} from '../model/PresidentSociete.model';
import {DemandeVo} from '../model/Demande.model';
import {FactureVo} from '../model/Facture.model';
import {DeclarationCnssVo} from '../model/DeclarationCnss.model';
import {DeclarationIsVo} from '../model/DeclarationIs.model';
import {DeclarationIrVo} from '../model/DeclarationIr.model';
import {EmployeVo} from '../model/Employe.model';
import {ComptableVo} from '../model/Comptable.model';


@Injectable({
  providedIn: 'root'
})
export class SocieteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/societe/';
        })
    }
     private _societes: Array<SocieteVo> ;
     private _selectedSociete: SocieteVo;
     private _societeSelections: Array<SocieteVo>;
     private _createSocieteDialog: boolean;
     private _editSocieteDialog: boolean;
     private _viewSocieteDialog: boolean;
     public editSociete$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchSociete:SocieteVo ;
     private _switchChercheurDialog: boolean;

    // methods

    public findAll(){
     return this.http.get<Array<SocieteVo>>(this.API);
    }

    public save(): Observable<SocieteVo> {
           return this.http.post<SocieteVo>(this.API, {...this.selectedSociete,updatedAt: moment(this.selectedSociete.updatedAt).format("YYYY-MM-DD")});
    }

    delete(societe: SocieteVo) {
         return this.http.delete<number>(this.API + 'id/' + societe.id);
    }


    public edit(): Observable<SocieteVo> {
        return this.http.put<SocieteVo>(this.API, this.selectedSociete);
    }


     public findByCriteria(societe:SocieteVo):Observable<Array<SocieteVo>>{
           return this.http.post<Array<SocieteVo>>(this.API +'search', societe);
    }

   public findByIdWithAssociatedList(societe:SocieteVo):Observable<SocieteVo>{
         return this.http.get<SocieteVo>(this.API + 'detail/id/' +societe.id);
    }

    // getters and setters


    get societes(): Array<SocieteVo> {
    if(this._societes==null){
    this._societes=new Array<SocieteVo>();
    }
return this._societes;
       }

    set societes(value: Array<SocieteVo>) {
        this._societes = value;
       }

    get selectedSociete(): SocieteVo {
    if(this._selectedSociete==null){
    this._selectedSociete=new SocieteVo();
    }
           return this._selectedSociete;
       }

    set selectedSociete(value: SocieteVo) {
        this._selectedSociete = value;
       }

    get societeSelections(): Array<SocieteVo> {
    if(this._societeSelections==null){
    this._societeSelections=new Array<SocieteVo>();
    }
        return this._societeSelections;
       }


    set societeSelections(value: Array<SocieteVo>) {
        this._societeSelections = value;
       }

    get createSocieteDialog(): boolean {
        return this._createSocieteDialog;
       }

    set createSocieteDialog(value: boolean) {
        this._createSocieteDialog = value;
       }

    get editSocieteDialog(): boolean {
        return this._editSocieteDialog;
       }

    set editSocieteDialog(value: boolean) {
        this._editSocieteDialog = value;
       }

    get viewSocieteDialog(): boolean {
        return this._viewSocieteDialog;
       }

    set viewSocieteDialog(value: boolean) {
        this._viewSocieteDialog = value;
       }

     get searchSociete(): SocieteVo {
     if(this._searchSociete==null){
    this._searchSociete=new SocieteVo();
    }
        return this._searchSociete;
    }

    set searchSociete(value: SocieteVo) {
        this._searchSociete = value;
       }

   get switchChercheurDialog(): boolean {
    return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
    this._switchChercheurDialog = value;
    }
}
