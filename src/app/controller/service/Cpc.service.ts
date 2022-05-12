import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CpcVo} from '../model/Cpc.model';
import {CpcFactureVo} from '../model/CpcFacture.model';


@Injectable({
  providedIn: 'root'
})
export class CpcService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/cpc/';
        })
    }
     private _cpcs: Array<CpcVo> ;
     private _selectedCpc: CpcVo;
     private _cpcSelections: Array<CpcVo>;
     private _createCpcDialog: boolean;
     private _editCpcDialog: boolean;
     private _viewCpcDialog: boolean;
     public editCpc$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCpc:CpcVo ;

    // methods
    public archiver(cpc: CpcVo): Observable<CpcVo> {
        return this.http.put<CpcVo>(this.API + 'archiver/' ,cpc);
    }
    public desarchiver(cpc: CpcVo): Observable<CpcVo> {
    return this.http.put<CpcVo>(this.API + 'desarchiver/' ,cpc);
    }

    public findAll(){
     return this.http.get<Array<CpcVo>>(this.API);
    }

    public save(): Observable<CpcVo> {
           return this.http.post<CpcVo>(this.API, {...this.selectedCpc,dateCreation: moment(this.selectedCpc.dateCreation).format("YYYY-MM-DD")});
    }

    delete(cpc: CpcVo) {
         return this.http.delete<number>(this.API + 'id/' + cpc.id);
    }


    public edit(): Observable<CpcVo> {
        return this.http.put<CpcVo>(this.API, this.selectedCpc);
    }


     public findByCriteria(cpc:CpcVo):Observable<Array<CpcVo>>{
           return this.http.post<Array<CpcVo>>(this.API +'search', cpc);
    }

   public findByIdWithAssociatedList(cpc:CpcVo):Observable<CpcVo>{
         return this.http.get<CpcVo>(this.API + 'detail/id/' +cpc.id);
    }

    // getters and setters


    get cpcs(): Array<CpcVo> {
    if(this._cpcs==null){
    this._cpcs=new Array<CpcVo>();
    }
return this._cpcs;
       }

    set cpcs(value: Array<CpcVo>) {
        this._cpcs = value;
       }

    get selectedCpc(): CpcVo {
    if(this._selectedCpc==null){
    this._selectedCpc=new CpcVo();
    }
           return this._selectedCpc;
       }

    set selectedCpc(value: CpcVo) {
        this._selectedCpc = value;
       }

    get cpcSelections(): Array<CpcVo> {
    if(this._cpcSelections==null){
    this._cpcSelections=new Array<CpcVo>();
    }
        return this._cpcSelections;
       }


    set cpcSelections(value: Array<CpcVo>) {
        this._cpcSelections = value;
       }

    get createCpcDialog(): boolean {
        return this._createCpcDialog;
       }

    set createCpcDialog(value: boolean) {
        this._createCpcDialog = value;
       }

    get editCpcDialog(): boolean {
        return this._editCpcDialog;
       }

    set editCpcDialog(value: boolean) {
        this._editCpcDialog = value;
       }

    get viewCpcDialog(): boolean {
        return this._viewCpcDialog;
       }

    set viewCpcDialog(value: boolean) {
        this._viewCpcDialog = value;
       }

     get searchCpc(): CpcVo {
     if(this._searchCpc==null){
    this._searchCpc=new CpcVo();
    }
        return this._searchCpc;
    }

    set searchCpc(value: CpcVo) {
        this._searchCpc = value;
       }

}
