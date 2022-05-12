import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FactureVo} from '../model/Facture.model';
import {SocieteVo} from '../model/Societe.model';
import {DeclarationTvaVo} from '../model/DeclarationTva.model';
import {CpcFactureVo} from '../model/CpcFacture.model';
import {DemandeVo} from '../model/Demande.model';
import {TypeOperationFactureVo} from '../model/TypeOperationFacture.model';
import {ClasseComptableVo} from '../model/ClasseComptable.model';
import {CompteComptableVo} from '../model/CompteComptable.model';
import {EtatFactureVo} from '../model/EtatFacture.model';
import {DeclarationIsVo} from '../model/DeclarationIs.model';
import {EtatPaiementVo} from '../model/EtatPaiement.model';
import {TvaVo} from '../model/Tva.model';


@Injectable({
  providedIn: 'root'
})
export class FactureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/facture/';
        })
    }
     private _factures: Array<FactureVo> ;
     private _selectedFacture: FactureVo;
     private _factureSelections: Array<FactureVo>;
     private _createFactureDialog: boolean;
     private _editFactureDialog: boolean;
     private _viewFactureDialog: boolean;
     public editFacture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFacture:FactureVo ;

    // methods
    public archiver(facture: FactureVo): Observable<FactureVo> {
        return this.http.put<FactureVo>(this.API + 'archiver/' ,facture);
    }
    public desarchiver(facture: FactureVo): Observable<FactureVo> {
    return this.http.put<FactureVo>(this.API + 'desarchiver/' ,facture);
    }

    public findAll(){
     return this.http.get<Array<FactureVo>>(this.API);
    }

    public save(): Observable<FactureVo> {
           return this.http.post<FactureVo>(this.API, {...this.selectedFacture,dateCreation: moment(this.selectedFacture.dateCreation).format("YYYY-MM-DD")});
    }

    delete(facture: FactureVo) {
         return this.http.delete<number>(this.API + 'id/' + facture.id);
    }


    public edit(): Observable<FactureVo> {
        return this.http.put<FactureVo>(this.API, this.selectedFacture);
    }


     public findByCriteria(facture:FactureVo):Observable<Array<FactureVo>>{
           return this.http.post<Array<FactureVo>>(this.API +'search', facture);
    }

   public findByIdWithAssociatedList(facture:FactureVo):Observable<FactureVo>{
         return this.http.get<FactureVo>(this.API + 'detail/id/' +facture.id);
    }

    // getters and setters


    get factures(): Array<FactureVo> {
    if(this._factures==null){
    this._factures=new Array<FactureVo>();
    }
return this._factures;
       }

    set factures(value: Array<FactureVo>) {
        this._factures = value;
       }

    get selectedFacture(): FactureVo {
    if(this._selectedFacture==null){
    this._selectedFacture=new FactureVo();
    }
           return this._selectedFacture;
       }

    set selectedFacture(value: FactureVo) {
        this._selectedFacture = value;
       }

    get factureSelections(): Array<FactureVo> {
    if(this._factureSelections==null){
    this._factureSelections=new Array<FactureVo>();
    }
        return this._factureSelections;
       }


    set factureSelections(value: Array<FactureVo>) {
        this._factureSelections = value;
       }

    get createFactureDialog(): boolean {
        return this._createFactureDialog;
       }

    set createFactureDialog(value: boolean) {
        this._createFactureDialog = value;
       }

    get editFactureDialog(): boolean {
        return this._editFactureDialog;
       }

    set editFactureDialog(value: boolean) {
        this._editFactureDialog = value;
       }

    get viewFactureDialog(): boolean {
        return this._viewFactureDialog;
       }

    set viewFactureDialog(value: boolean) {
        this._viewFactureDialog = value;
       }

     get searchFacture(): FactureVo {
     if(this._searchFacture==null){
    this._searchFacture=new FactureVo();
    }
        return this._searchFacture;
    }

    set searchFacture(value: FactureVo) {
        this._searchFacture = value;
       }

}
