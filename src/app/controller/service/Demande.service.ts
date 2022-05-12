import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DemandeVo} from '../model/Demande.model';
import {SocieteVo} from '../model/Societe.model';
import {EtatDemandeVo} from '../model/EtatDemande.model';
import {DemandePieceJointeVo} from '../model/DemandePieceJointe.model';
import {FactureVo} from '../model/Facture.model';
import {CommentaireVo} from '../model/Commentaire.model';
import {ComptableVo} from '../model/Comptable.model';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/demande/';
        })
    }
     private _demandes: Array<DemandeVo> ;
     private _selectedDemande: DemandeVo;
     private _demandeSelections: Array<DemandeVo>;
     private _createDemandeDialog: boolean;
     private _editDemandeDialog: boolean;
     private _viewDemandeDialog: boolean;
     public editDemande$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDemande:DemandeVo ;

    // methods
    public archiver(demande: DemandeVo): Observable<DemandeVo> {
        return this.http.put<DemandeVo>(this.API + 'archiver/' ,demande);
    }
    public desarchiver(demande: DemandeVo): Observable<DemandeVo> {
    return this.http.put<DemandeVo>(this.API + 'desarchiver/' ,demande);
    }

    public findAll(){
     return this.http.get<Array<DemandeVo>>(this.API);
    }

    public save(): Observable<DemandeVo> {
           return this.http.post<DemandeVo>(this.API, {...this.selectedDemande,dateCreation: moment(this.selectedDemande.dateCreation).format("YYYY-MM-DD")});
    }

    delete(demande: DemandeVo) {
         return this.http.delete<number>(this.API + 'id/' + demande.id);
    }


    public edit(): Observable<DemandeVo> {
        return this.http.put<DemandeVo>(this.API, this.selectedDemande);
    }


     public findByCriteria(demande:DemandeVo):Observable<Array<DemandeVo>>{
           return this.http.post<Array<DemandeVo>>(this.API +'search', demande);
    }

   public findByIdWithAssociatedList(demande:DemandeVo):Observable<DemandeVo>{
         return this.http.get<DemandeVo>(this.API + 'detail/id/' +demande.id);
    }

    // getters and setters


    get demandes(): Array<DemandeVo> {
    if(this._demandes==null){
    this._demandes=new Array<DemandeVo>();
    }
return this._demandes;
       }

    set demandes(value: Array<DemandeVo>) {
        this._demandes = value;
       }

    get selectedDemande(): DemandeVo {
    if(this._selectedDemande==null){
    this._selectedDemande=new DemandeVo();
    }
           return this._selectedDemande;
       }

    set selectedDemande(value: DemandeVo) {
        this._selectedDemande = value;
       }

    get demandeSelections(): Array<DemandeVo> {
    if(this._demandeSelections==null){
    this._demandeSelections=new Array<DemandeVo>();
    }
        return this._demandeSelections;
       }


    set demandeSelections(value: Array<DemandeVo>) {
        this._demandeSelections = value;
       }

    get createDemandeDialog(): boolean {
        return this._createDemandeDialog;
       }

    set createDemandeDialog(value: boolean) {
        this._createDemandeDialog = value;
       }

    get editDemandeDialog(): boolean {
        return this._editDemandeDialog;
       }

    set editDemandeDialog(value: boolean) {
        this._editDemandeDialog = value;
       }

    get viewDemandeDialog(): boolean {
        return this._viewDemandeDialog;
       }

    set viewDemandeDialog(value: boolean) {
        this._viewDemandeDialog = value;
       }

     get searchDemande(): DemandeVo {
     if(this._searchDemande==null){
    this._searchDemande=new DemandeVo();
    }
        return this._searchDemande;
    }

    set searchDemande(value: DemandeVo) {
        this._searchDemande = value;
       }

}
