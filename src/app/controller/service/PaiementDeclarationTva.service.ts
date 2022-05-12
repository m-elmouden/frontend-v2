import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaiementDeclarationTvaVo} from '../model/PaiementDeclarationTva.model';
import {DeclarationTvaVo} from '../model/DeclarationTva.model';


@Injectable({
  providedIn: 'root'
})
export class PaiementDeclarationTvaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paiementDeclarationTva/';
        })
    }
     private _paiementDeclarationTvas: Array<PaiementDeclarationTvaVo> ;
     private _selectedPaiementDeclarationTva: PaiementDeclarationTvaVo;
     private _paiementDeclarationTvaSelections: Array<PaiementDeclarationTvaVo>;
     private _createPaiementDeclarationTvaDialog: boolean;
     private _editPaiementDeclarationTvaDialog: boolean;
     private _viewPaiementDeclarationTvaDialog: boolean;
     public editPaiementDeclarationTva$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaiementDeclarationTva:PaiementDeclarationTvaVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaiementDeclarationTvaVo>>(this.API);
    }

    public save(): Observable<PaiementDeclarationTvaVo> {
           return this.http.post<PaiementDeclarationTvaVo>(this.API, {...this.selectedPaiementDeclarationTva,datePaiement: moment(this.selectedPaiementDeclarationTva.datePaiement).format("YYYY-MM-DD")});
    }

    delete(paiementDeclarationTva: PaiementDeclarationTvaVo) {
         return this.http.delete<number>(this.API + 'id/' + paiementDeclarationTva.id);
    }


    public edit(): Observable<PaiementDeclarationTvaVo> {
        return this.http.put<PaiementDeclarationTvaVo>(this.API, this.selectedPaiementDeclarationTva);
    }


     public findByCriteria(paiementDeclarationTva:PaiementDeclarationTvaVo):Observable<Array<PaiementDeclarationTvaVo>>{
           return this.http.post<Array<PaiementDeclarationTvaVo>>(this.API +'search', paiementDeclarationTva);
    }

   public findByIdWithAssociatedList(paiementDeclarationTva:PaiementDeclarationTvaVo):Observable<PaiementDeclarationTvaVo>{
         return this.http.get<PaiementDeclarationTvaVo>(this.API + 'detail/id/' +paiementDeclarationTva.id);
    }

    // getters and setters


    get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
    if(this._paiementDeclarationTvas==null){
    this._paiementDeclarationTvas=new Array<PaiementDeclarationTvaVo>();
    }
return this._paiementDeclarationTvas;
       }

    set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this._paiementDeclarationTvas = value;
       }

    get selectedPaiementDeclarationTva(): PaiementDeclarationTvaVo {
    if(this._selectedPaiementDeclarationTva==null){
    this._selectedPaiementDeclarationTva=new PaiementDeclarationTvaVo();
    }
           return this._selectedPaiementDeclarationTva;
       }

    set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this._selectedPaiementDeclarationTva = value;
       }

    get paiementDeclarationTvaSelections(): Array<PaiementDeclarationTvaVo> {
    if(this._paiementDeclarationTvaSelections==null){
    this._paiementDeclarationTvaSelections=new Array<PaiementDeclarationTvaVo>();
    }
        return this._paiementDeclarationTvaSelections;
       }


    set paiementDeclarationTvaSelections(value: Array<PaiementDeclarationTvaVo>) {
        this._paiementDeclarationTvaSelections = value;
       }

    get createPaiementDeclarationTvaDialog(): boolean {
        return this._createPaiementDeclarationTvaDialog;
       }

    set createPaiementDeclarationTvaDialog(value: boolean) {
        this._createPaiementDeclarationTvaDialog = value;
       }

    get editPaiementDeclarationTvaDialog(): boolean {
        return this._editPaiementDeclarationTvaDialog;
       }

    set editPaiementDeclarationTvaDialog(value: boolean) {
        this._editPaiementDeclarationTvaDialog = value;
       }

    get viewPaiementDeclarationTvaDialog(): boolean {
        return this._viewPaiementDeclarationTvaDialog;
       }

    set viewPaiementDeclarationTvaDialog(value: boolean) {
        this._viewPaiementDeclarationTvaDialog = value;
       }

     get searchPaiementDeclarationTva(): PaiementDeclarationTvaVo {
     if(this._searchPaiementDeclarationTva==null){
    this._searchPaiementDeclarationTva=new PaiementDeclarationTvaVo();
    }
        return this._searchPaiementDeclarationTva;
    }

    set searchPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this._searchPaiementDeclarationTva = value;
       }

}
