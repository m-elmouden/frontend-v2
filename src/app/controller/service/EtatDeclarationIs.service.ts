import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatDeclarationIsVo} from '../model/EtatDeclarationIs.model';


@Injectable({
  providedIn: 'root'
})
export class EtatDeclarationIsService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatDeclarationIs/';
        })
    }
     private _etatDeclarationIss: Array<EtatDeclarationIsVo> ;
     private _selectedEtatDeclarationIs: EtatDeclarationIsVo;
     private _etatDeclarationIsSelections: Array<EtatDeclarationIsVo>;
     private _createEtatDeclarationIsDialog: boolean;
     private _editEtatDeclarationIsDialog: boolean;
     private _viewEtatDeclarationIsDialog: boolean;
     public editEtatDeclarationIs$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatDeclarationIs:EtatDeclarationIsVo ;

    // methods
    public archiver(etatDeclarationIs: EtatDeclarationIsVo): Observable<EtatDeclarationIsVo> {
        return this.http.put<EtatDeclarationIsVo>(this.API + 'archiver/' ,etatDeclarationIs);
    }
    public desarchiver(etatDeclarationIs: EtatDeclarationIsVo): Observable<EtatDeclarationIsVo> {
    return this.http.put<EtatDeclarationIsVo>(this.API + 'desarchiver/' ,etatDeclarationIs);
    }

    public findAll(){
     return this.http.get<Array<EtatDeclarationIsVo>>(this.API);
    }

    public save(): Observable<EtatDeclarationIsVo> {
           return this.http.post<EtatDeclarationIsVo>(this.API, {...this.selectedEtatDeclarationIs,dateCreation: moment(this.selectedEtatDeclarationIs.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etatDeclarationIs: EtatDeclarationIsVo) {
         return this.http.delete<number>(this.API + 'id/' + etatDeclarationIs.id);
    }


    public edit(): Observable<EtatDeclarationIsVo> {
        return this.http.put<EtatDeclarationIsVo>(this.API, this.selectedEtatDeclarationIs);
    }


     public findByCriteria(etatDeclarationIs:EtatDeclarationIsVo):Observable<Array<EtatDeclarationIsVo>>{
           return this.http.post<Array<EtatDeclarationIsVo>>(this.API +'search', etatDeclarationIs);
    }

   public findByIdWithAssociatedList(etatDeclarationIs:EtatDeclarationIsVo):Observable<EtatDeclarationIsVo>{
         return this.http.get<EtatDeclarationIsVo>(this.API + 'detail/id/' +etatDeclarationIs.id);
    }

    // getters and setters


    get etatDeclarationIss(): Array<EtatDeclarationIsVo> {
    if(this._etatDeclarationIss==null){
    this._etatDeclarationIss=new Array<EtatDeclarationIsVo>();
    }
return this._etatDeclarationIss;
       }

    set etatDeclarationIss(value: Array<EtatDeclarationIsVo>) {
        this._etatDeclarationIss = value;
       }

    get selectedEtatDeclarationIs(): EtatDeclarationIsVo {
    if(this._selectedEtatDeclarationIs==null){
    this._selectedEtatDeclarationIs=new EtatDeclarationIsVo();
    }
           return this._selectedEtatDeclarationIs;
       }

    set selectedEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this._selectedEtatDeclarationIs = value;
       }

    get etatDeclarationIsSelections(): Array<EtatDeclarationIsVo> {
    if(this._etatDeclarationIsSelections==null){
    this._etatDeclarationIsSelections=new Array<EtatDeclarationIsVo>();
    }
        return this._etatDeclarationIsSelections;
       }


    set etatDeclarationIsSelections(value: Array<EtatDeclarationIsVo>) {
        this._etatDeclarationIsSelections = value;
       }

    get createEtatDeclarationIsDialog(): boolean {
        return this._createEtatDeclarationIsDialog;
       }

    set createEtatDeclarationIsDialog(value: boolean) {
        this._createEtatDeclarationIsDialog = value;
       }

    get editEtatDeclarationIsDialog(): boolean {
        return this._editEtatDeclarationIsDialog;
       }

    set editEtatDeclarationIsDialog(value: boolean) {
        this._editEtatDeclarationIsDialog = value;
       }

    get viewEtatDeclarationIsDialog(): boolean {
        return this._viewEtatDeclarationIsDialog;
       }

    set viewEtatDeclarationIsDialog(value: boolean) {
        this._viewEtatDeclarationIsDialog = value;
       }

     get searchEtatDeclarationIs(): EtatDeclarationIsVo {
     if(this._searchEtatDeclarationIs==null){
    this._searchEtatDeclarationIs=new EtatDeclarationIsVo();
    }
        return this._searchEtatDeclarationIs;
    }

    set searchEtatDeclarationIs(value: EtatDeclarationIsVo) {
        this._searchEtatDeclarationIs = value;
       }

}
