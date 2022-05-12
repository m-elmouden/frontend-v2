import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {AcompteVo} from '../model/Acompte.model';
import {SocieteVo} from '../model/Societe.model';


@Injectable({
  providedIn: 'root'
})
export class AcompteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/acompte/';
        })
    }
     private _acomptes: Array<AcompteVo> ;
     private _selectedAcompte: AcompteVo;
     private _acompteSelections: Array<AcompteVo>;
     private _createAcompteDialog: boolean;
     private _editAcompteDialog: boolean;
     private _viewAcompteDialog: boolean;
     public editAcompte$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchAcompte:AcompteVo ;

    // methods
    public archiver(acompte: AcompteVo): Observable<AcompteVo> {
        return this.http.put<AcompteVo>(this.API + 'archiver/' ,acompte);
    }
    public desarchiver(acompte: AcompteVo): Observable<AcompteVo> {
    return this.http.put<AcompteVo>(this.API + 'desarchiver/' ,acompte);
    }

    public findAll(){
     return this.http.get<Array<AcompteVo>>(this.API);
    }

    public save(): Observable<AcompteVo> {
           return this.http.post<AcompteVo>(this.API, {...this.selectedAcompte,dateCreation: moment(this.selectedAcompte.dateCreation).format("YYYY-MM-DD")});
    }

    delete(acompte: AcompteVo) {
         return this.http.delete<number>(this.API + 'id/' + acompte.id);
    }


    public edit(): Observable<AcompteVo> {
        return this.http.put<AcompteVo>(this.API, this.selectedAcompte);
    }


     public findByCriteria(acompte:AcompteVo):Observable<Array<AcompteVo>>{
           return this.http.post<Array<AcompteVo>>(this.API +'search', acompte);
    }

   public findByIdWithAssociatedList(acompte:AcompteVo):Observable<AcompteVo>{
         return this.http.get<AcompteVo>(this.API + 'detail/id/' +acompte.id);
    }

    // getters and setters


    get acomptes(): Array<AcompteVo> {
    if(this._acomptes==null){
    this._acomptes=new Array<AcompteVo>();
    }
return this._acomptes;
       }

    set acomptes(value: Array<AcompteVo>) {
        this._acomptes = value;
       }

    get selectedAcompte(): AcompteVo {
    if(this._selectedAcompte==null){
    this._selectedAcompte=new AcompteVo();
    }
           return this._selectedAcompte;
       }

    set selectedAcompte(value: AcompteVo) {
        this._selectedAcompte = value;
       }

    get acompteSelections(): Array<AcompteVo> {
    if(this._acompteSelections==null){
    this._acompteSelections=new Array<AcompteVo>();
    }
        return this._acompteSelections;
       }


    set acompteSelections(value: Array<AcompteVo>) {
        this._acompteSelections = value;
       }

    get createAcompteDialog(): boolean {
        return this._createAcompteDialog;
       }

    set createAcompteDialog(value: boolean) {
        this._createAcompteDialog = value;
       }

    get editAcompteDialog(): boolean {
        return this._editAcompteDialog;
       }

    set editAcompteDialog(value: boolean) {
        this._editAcompteDialog = value;
       }

    get viewAcompteDialog(): boolean {
        return this._viewAcompteDialog;
       }

    set viewAcompteDialog(value: boolean) {
        this._viewAcompteDialog = value;
       }

     get searchAcompte(): AcompteVo {
     if(this._searchAcompte==null){
    this._searchAcompte=new AcompteVo();
    }
        return this._searchAcompte;
    }

    set searchAcompte(value: AcompteVo) {
        this._searchAcompte = value;
       }

}
