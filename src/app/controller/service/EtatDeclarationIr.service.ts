import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatDeclarationIrVo} from '../model/EtatDeclarationIr.model';


@Injectable({
  providedIn: 'root'
})
export class EtatDeclarationIrService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatDeclarationIr/';
        })
    }
     private _etatDeclarationIrs: Array<EtatDeclarationIrVo> ;
     private _selectedEtatDeclarationIr: EtatDeclarationIrVo;
     private _etatDeclarationIrSelections: Array<EtatDeclarationIrVo>;
     private _createEtatDeclarationIrDialog: boolean;
     private _editEtatDeclarationIrDialog: boolean;
     private _viewEtatDeclarationIrDialog: boolean;
     public editEtatDeclarationIr$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatDeclarationIr:EtatDeclarationIrVo ;

    // methods
    public archiver(etatDeclarationIr: EtatDeclarationIrVo): Observable<EtatDeclarationIrVo> {
        return this.http.put<EtatDeclarationIrVo>(this.API + 'archiver/' ,etatDeclarationIr);
    }
    public desarchiver(etatDeclarationIr: EtatDeclarationIrVo): Observable<EtatDeclarationIrVo> {
    return this.http.put<EtatDeclarationIrVo>(this.API + 'desarchiver/' ,etatDeclarationIr);
    }

    public findAll(){
     return this.http.get<Array<EtatDeclarationIrVo>>(this.API);
    }

    public save(): Observable<EtatDeclarationIrVo> {
           return this.http.post<EtatDeclarationIrVo>(this.API, {...this.selectedEtatDeclarationIr,dateCreation: moment(this.selectedEtatDeclarationIr.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etatDeclarationIr: EtatDeclarationIrVo) {
         return this.http.delete<number>(this.API + 'id/' + etatDeclarationIr.id);
    }


    public edit(): Observable<EtatDeclarationIrVo> {
        return this.http.put<EtatDeclarationIrVo>(this.API, this.selectedEtatDeclarationIr);
    }


     public findByCriteria(etatDeclarationIr:EtatDeclarationIrVo):Observable<Array<EtatDeclarationIrVo>>{
           return this.http.post<Array<EtatDeclarationIrVo>>(this.API +'search', etatDeclarationIr);
    }

   public findByIdWithAssociatedList(etatDeclarationIr:EtatDeclarationIrVo):Observable<EtatDeclarationIrVo>{
         return this.http.get<EtatDeclarationIrVo>(this.API + 'detail/id/' +etatDeclarationIr.id);
    }

    // getters and setters


    get etatDeclarationIrs(): Array<EtatDeclarationIrVo> {
    if(this._etatDeclarationIrs==null){
    this._etatDeclarationIrs=new Array<EtatDeclarationIrVo>();
    }
return this._etatDeclarationIrs;
       }

    set etatDeclarationIrs(value: Array<EtatDeclarationIrVo>) {
        this._etatDeclarationIrs = value;
       }

    get selectedEtatDeclarationIr(): EtatDeclarationIrVo {
    if(this._selectedEtatDeclarationIr==null){
    this._selectedEtatDeclarationIr=new EtatDeclarationIrVo();
    }
           return this._selectedEtatDeclarationIr;
       }

    set selectedEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this._selectedEtatDeclarationIr = value;
       }

    get etatDeclarationIrSelections(): Array<EtatDeclarationIrVo> {
    if(this._etatDeclarationIrSelections==null){
    this._etatDeclarationIrSelections=new Array<EtatDeclarationIrVo>();
    }
        return this._etatDeclarationIrSelections;
       }


    set etatDeclarationIrSelections(value: Array<EtatDeclarationIrVo>) {
        this._etatDeclarationIrSelections = value;
       }

    get createEtatDeclarationIrDialog(): boolean {
        return this._createEtatDeclarationIrDialog;
       }

    set createEtatDeclarationIrDialog(value: boolean) {
        this._createEtatDeclarationIrDialog = value;
       }

    get editEtatDeclarationIrDialog(): boolean {
        return this._editEtatDeclarationIrDialog;
       }

    set editEtatDeclarationIrDialog(value: boolean) {
        this._editEtatDeclarationIrDialog = value;
       }

    get viewEtatDeclarationIrDialog(): boolean {
        return this._viewEtatDeclarationIrDialog;
       }

    set viewEtatDeclarationIrDialog(value: boolean) {
        this._viewEtatDeclarationIrDialog = value;
       }

     get searchEtatDeclarationIr(): EtatDeclarationIrVo {
     if(this._searchEtatDeclarationIr==null){
    this._searchEtatDeclarationIr=new EtatDeclarationIrVo();
    }
        return this._searchEtatDeclarationIr;
    }

    set searchEtatDeclarationIr(value: EtatDeclarationIrVo) {
        this._searchEtatDeclarationIr = value;
       }

}
