import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TauxIsConfigVo} from '../model/TauxIsConfig.model';
import {TauxIsVo} from '../model/TauxIs.model';


@Injectable({
  providedIn: 'root'
})
export class TauxIsConfigService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tauxIsConfig/';
        })
    }
     private _tauxIsConfigs: Array<TauxIsConfigVo> ;
     private _selectedTauxIsConfig: TauxIsConfigVo;
     private _tauxIsConfigSelections: Array<TauxIsConfigVo>;
     private _createTauxIsConfigDialog: boolean;
     private _editTauxIsConfigDialog: boolean;
     private _viewTauxIsConfigDialog: boolean;
     public editTauxIsConfig$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTauxIsConfig:TauxIsConfigVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TauxIsConfigVo>>(this.API);
    }

    public save(): Observable<TauxIsConfigVo> {
           return this.http.post<TauxIsConfigVo>(this.API, {...this.selectedTauxIsConfig,dateMax: moment(this.selectedTauxIsConfig.dateMax).format("YYYY-MM-DD")});
    }

    delete(tauxIsConfig: TauxIsConfigVo) {
         return this.http.delete<number>(this.API + 'id/' + tauxIsConfig.id);
    }


    public edit(): Observable<TauxIsConfigVo> {
        return this.http.put<TauxIsConfigVo>(this.API, this.selectedTauxIsConfig);
    }


     public findByCriteria(tauxIsConfig:TauxIsConfigVo):Observable<Array<TauxIsConfigVo>>{
           return this.http.post<Array<TauxIsConfigVo>>(this.API +'search', tauxIsConfig);
    }

   public findByIdWithAssociatedList(tauxIsConfig:TauxIsConfigVo):Observable<TauxIsConfigVo>{
         return this.http.get<TauxIsConfigVo>(this.API + 'detail/id/' +tauxIsConfig.id);
    }

    // getters and setters


    get tauxIsConfigs(): Array<TauxIsConfigVo> {
    if(this._tauxIsConfigs==null){
    this._tauxIsConfigs=new Array<TauxIsConfigVo>();
    }
return this._tauxIsConfigs;
       }

    set tauxIsConfigs(value: Array<TauxIsConfigVo>) {
        this._tauxIsConfigs = value;
       }

    get selectedTauxIsConfig(): TauxIsConfigVo {
    if(this._selectedTauxIsConfig==null){
    this._selectedTauxIsConfig=new TauxIsConfigVo();
    }
           return this._selectedTauxIsConfig;
       }

    set selectedTauxIsConfig(value: TauxIsConfigVo) {
        this._selectedTauxIsConfig = value;
       }

    get tauxIsConfigSelections(): Array<TauxIsConfigVo> {
    if(this._tauxIsConfigSelections==null){
    this._tauxIsConfigSelections=new Array<TauxIsConfigVo>();
    }
        return this._tauxIsConfigSelections;
       }


    set tauxIsConfigSelections(value: Array<TauxIsConfigVo>) {
        this._tauxIsConfigSelections = value;
       }

    get createTauxIsConfigDialog(): boolean {
        return this._createTauxIsConfigDialog;
       }

    set createTauxIsConfigDialog(value: boolean) {
        this._createTauxIsConfigDialog = value;
       }

    get editTauxIsConfigDialog(): boolean {
        return this._editTauxIsConfigDialog;
       }

    set editTauxIsConfigDialog(value: boolean) {
        this._editTauxIsConfigDialog = value;
       }

    get viewTauxIsConfigDialog(): boolean {
        return this._viewTauxIsConfigDialog;
       }

    set viewTauxIsConfigDialog(value: boolean) {
        this._viewTauxIsConfigDialog = value;
       }

     get searchTauxIsConfig(): TauxIsConfigVo {
     if(this._searchTauxIsConfig==null){
    this._searchTauxIsConfig=new TauxIsConfigVo();
    }
        return this._searchTauxIsConfig;
    }

    set searchTauxIsConfig(value: TauxIsConfigVo) {
        this._searchTauxIsConfig = value;
       }

}
