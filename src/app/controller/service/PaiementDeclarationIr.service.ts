import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaiementDeclarationIrVo} from '../model/PaiementDeclarationIr.model';
import {DeclarationIrVo} from '../model/DeclarationIr.model';


@Injectable({
  providedIn: 'root'
})
export class PaiementDeclarationIrService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paiementDeclarationIr/';
        })
    }
     private _paiementDeclarationIrs: Array<PaiementDeclarationIrVo> ;
     private _selectedPaiementDeclarationIr: PaiementDeclarationIrVo;
     private _paiementDeclarationIrSelections: Array<PaiementDeclarationIrVo>;
     private _createPaiementDeclarationIrDialog: boolean;
     private _editPaiementDeclarationIrDialog: boolean;
     private _viewPaiementDeclarationIrDialog: boolean;
     public editPaiementDeclarationIr$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaiementDeclarationIr:PaiementDeclarationIrVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaiementDeclarationIrVo>>(this.API);
    }

    public save(): Observable<PaiementDeclarationIrVo> {
           return this.http.post<PaiementDeclarationIrVo>(this.API, {...this.selectedPaiementDeclarationIr,datePaiement: moment(this.selectedPaiementDeclarationIr.datePaiement).format("YYYY-MM-DD")});
    }

    delete(paiementDeclarationIr: PaiementDeclarationIrVo) {
         return this.http.delete<number>(this.API + 'id/' + paiementDeclarationIr.id);
    }


    public edit(): Observable<PaiementDeclarationIrVo> {
        return this.http.put<PaiementDeclarationIrVo>(this.API, this.selectedPaiementDeclarationIr);
    }


     public findByCriteria(paiementDeclarationIr:PaiementDeclarationIrVo):Observable<Array<PaiementDeclarationIrVo>>{
           return this.http.post<Array<PaiementDeclarationIrVo>>(this.API +'search', paiementDeclarationIr);
    }

   public findByIdWithAssociatedList(paiementDeclarationIr:PaiementDeclarationIrVo):Observable<PaiementDeclarationIrVo>{
         return this.http.get<PaiementDeclarationIrVo>(this.API + 'detail/id/' +paiementDeclarationIr.id);
    }

    // getters and setters


    get paiementDeclarationIrs(): Array<PaiementDeclarationIrVo> {
    if(this._paiementDeclarationIrs==null){
    this._paiementDeclarationIrs=new Array<PaiementDeclarationIrVo>();
    }
return this._paiementDeclarationIrs;
       }

    set paiementDeclarationIrs(value: Array<PaiementDeclarationIrVo>) {
        this._paiementDeclarationIrs = value;
       }

    get selectedPaiementDeclarationIr(): PaiementDeclarationIrVo {
    if(this._selectedPaiementDeclarationIr==null){
    this._selectedPaiementDeclarationIr=new PaiementDeclarationIrVo();
    }
           return this._selectedPaiementDeclarationIr;
       }

    set selectedPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this._selectedPaiementDeclarationIr = value;
       }

    get paiementDeclarationIrSelections(): Array<PaiementDeclarationIrVo> {
    if(this._paiementDeclarationIrSelections==null){
    this._paiementDeclarationIrSelections=new Array<PaiementDeclarationIrVo>();
    }
        return this._paiementDeclarationIrSelections;
       }


    set paiementDeclarationIrSelections(value: Array<PaiementDeclarationIrVo>) {
        this._paiementDeclarationIrSelections = value;
       }

    get createPaiementDeclarationIrDialog(): boolean {
        return this._createPaiementDeclarationIrDialog;
       }

    set createPaiementDeclarationIrDialog(value: boolean) {
        this._createPaiementDeclarationIrDialog = value;
       }

    get editPaiementDeclarationIrDialog(): boolean {
        return this._editPaiementDeclarationIrDialog;
       }

    set editPaiementDeclarationIrDialog(value: boolean) {
        this._editPaiementDeclarationIrDialog = value;
       }

    get viewPaiementDeclarationIrDialog(): boolean {
        return this._viewPaiementDeclarationIrDialog;
       }

    set viewPaiementDeclarationIrDialog(value: boolean) {
        this._viewPaiementDeclarationIrDialog = value;
       }

     get searchPaiementDeclarationIr(): PaiementDeclarationIrVo {
     if(this._searchPaiementDeclarationIr==null){
    this._searchPaiementDeclarationIr=new PaiementDeclarationIrVo();
    }
        return this._searchPaiementDeclarationIr;
    }

    set searchPaiementDeclarationIr(value: PaiementDeclarationIrVo) {
        this._searchPaiementDeclarationIr = value;
       }

}
