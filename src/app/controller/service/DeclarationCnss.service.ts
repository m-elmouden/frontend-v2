import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeclarationCnssVo} from '../model/DeclarationCnss.model';
import {SocieteVo} from '../model/Societe.model';
import {EmployeVo} from '../model/Employe.model';
import {DeclarationCnssDetailVo} from '../model/DeclarationCnssDetail.model';


@Injectable({
  providedIn: 'root'
})
export class DeclarationCnssService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/declarationCnss/';
        })
    }
     private _declarationCnsss: Array<DeclarationCnssVo> ;
     private _selectedDeclarationCnss: DeclarationCnssVo;
     private _declarationCnssSelections: Array<DeclarationCnssVo>;
     private _createDeclarationCnssDialog: boolean;
     private _editDeclarationCnssDialog: boolean;
     private _viewDeclarationCnssDialog: boolean;
     public editDeclarationCnss$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeclarationCnss:DeclarationCnssVo ;

    // methods
    public archiver(declarationCnss: DeclarationCnssVo): Observable<DeclarationCnssVo> {
        return this.http.put<DeclarationCnssVo>(this.API + 'archiver/' ,declarationCnss);
    }
    public desarchiver(declarationCnss: DeclarationCnssVo): Observable<DeclarationCnssVo> {
    return this.http.put<DeclarationCnssVo>(this.API + 'desarchiver/' ,declarationCnss);
    }

    public findAll(){
     return this.http.get<Array<DeclarationCnssVo>>(this.API);
    }

    public save(): Observable<DeclarationCnssVo> {
           return this.http.post<DeclarationCnssVo>(this.API, {...this.selectedDeclarationCnss,dateCreation: moment(this.selectedDeclarationCnss.dateCreation).format("YYYY-MM-DD")});
    }

    delete(declarationCnss: DeclarationCnssVo) {
         return this.http.delete<number>(this.API + 'id/' + declarationCnss.id);
    }


    public edit(): Observable<DeclarationCnssVo> {
        return this.http.put<DeclarationCnssVo>(this.API, this.selectedDeclarationCnss);
    }


     public findByCriteria(declarationCnss:DeclarationCnssVo):Observable<Array<DeclarationCnssVo>>{
           return this.http.post<Array<DeclarationCnssVo>>(this.API +'search', declarationCnss);
    }

   public findByIdWithAssociatedList(declarationCnss:DeclarationCnssVo):Observable<DeclarationCnssVo>{
         return this.http.get<DeclarationCnssVo>(this.API + 'detail/id/' +declarationCnss.id);
    }

    // getters and setters


    get declarationCnsss(): Array<DeclarationCnssVo> {
    if(this._declarationCnsss==null){
    this._declarationCnsss=new Array<DeclarationCnssVo>();
    }
return this._declarationCnsss;
       }

    set declarationCnsss(value: Array<DeclarationCnssVo>) {
        this._declarationCnsss = value;
       }

    get selectedDeclarationCnss(): DeclarationCnssVo {
    if(this._selectedDeclarationCnss==null){
    this._selectedDeclarationCnss=new DeclarationCnssVo();
    }
           return this._selectedDeclarationCnss;
       }

    set selectedDeclarationCnss(value: DeclarationCnssVo) {
        this._selectedDeclarationCnss = value;
       }

    get declarationCnssSelections(): Array<DeclarationCnssVo> {
    if(this._declarationCnssSelections==null){
    this._declarationCnssSelections=new Array<DeclarationCnssVo>();
    }
        return this._declarationCnssSelections;
       }


    set declarationCnssSelections(value: Array<DeclarationCnssVo>) {
        this._declarationCnssSelections = value;
       }

    get createDeclarationCnssDialog(): boolean {
        return this._createDeclarationCnssDialog;
       }

    set createDeclarationCnssDialog(value: boolean) {
        this._createDeclarationCnssDialog = value;
       }

    get editDeclarationCnssDialog(): boolean {
        return this._editDeclarationCnssDialog;
       }

    set editDeclarationCnssDialog(value: boolean) {
        this._editDeclarationCnssDialog = value;
       }

    get viewDeclarationCnssDialog(): boolean {
        return this._viewDeclarationCnssDialog;
       }

    set viewDeclarationCnssDialog(value: boolean) {
        this._viewDeclarationCnssDialog = value;
       }

     get searchDeclarationCnss(): DeclarationCnssVo {
     if(this._searchDeclarationCnss==null){
    this._searchDeclarationCnss=new DeclarationCnssVo();
    }
        return this._searchDeclarationCnss;
    }

    set searchDeclarationCnss(value: DeclarationCnssVo) {
        this._searchDeclarationCnss = value;
       }

}
