import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatDeclarationTvaVo} from '../model/EtatDeclarationTva.model';


@Injectable({
  providedIn: 'root'
})
export class EtatDeclarationTvaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatDeclarationTva/';
        })
    }
     private _etatDeclarationTvas: Array<EtatDeclarationTvaVo> ;
     private _selectedEtatDeclarationTva: EtatDeclarationTvaVo;
     private _etatDeclarationTvaSelections: Array<EtatDeclarationTvaVo>;
     private _createEtatDeclarationTvaDialog: boolean;
     private _editEtatDeclarationTvaDialog: boolean;
     private _viewEtatDeclarationTvaDialog: boolean;
     public editEtatDeclarationTva$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatDeclarationTva:EtatDeclarationTvaVo ;

    // methods
    public archiver(etatDeclarationTva: EtatDeclarationTvaVo): Observable<EtatDeclarationTvaVo> {
        return this.http.put<EtatDeclarationTvaVo>(this.API + 'archiver/' ,etatDeclarationTva);
    }
    public desarchiver(etatDeclarationTva: EtatDeclarationTvaVo): Observable<EtatDeclarationTvaVo> {
    return this.http.put<EtatDeclarationTvaVo>(this.API + 'desarchiver/' ,etatDeclarationTva);
    }

    public findAll(){
     return this.http.get<Array<EtatDeclarationTvaVo>>(this.API);
    }

    public save(): Observable<EtatDeclarationTvaVo> {
           return this.http.post<EtatDeclarationTvaVo>(this.API, {...this.selectedEtatDeclarationTva,dateCreation: moment(this.selectedEtatDeclarationTva.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etatDeclarationTva: EtatDeclarationTvaVo) {
         return this.http.delete<number>(this.API + 'id/' + etatDeclarationTva.id);
    }


    public edit(): Observable<EtatDeclarationTvaVo> {
        return this.http.put<EtatDeclarationTvaVo>(this.API, this.selectedEtatDeclarationTva);
    }


     public findByCriteria(etatDeclarationTva:EtatDeclarationTvaVo):Observable<Array<EtatDeclarationTvaVo>>{
           return this.http.post<Array<EtatDeclarationTvaVo>>(this.API +'search', etatDeclarationTva);
    }

   public findByIdWithAssociatedList(etatDeclarationTva:EtatDeclarationTvaVo):Observable<EtatDeclarationTvaVo>{
         return this.http.get<EtatDeclarationTvaVo>(this.API + 'detail/id/' +etatDeclarationTva.id);
    }

    // getters and setters


    get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
    if(this._etatDeclarationTvas==null){
    this._etatDeclarationTvas=new Array<EtatDeclarationTvaVo>();
    }
return this._etatDeclarationTvas;
       }

    set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this._etatDeclarationTvas = value;
       }

    get selectedEtatDeclarationTva(): EtatDeclarationTvaVo {
    if(this._selectedEtatDeclarationTva==null){
    this._selectedEtatDeclarationTva=new EtatDeclarationTvaVo();
    }
           return this._selectedEtatDeclarationTva;
       }

    set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this._selectedEtatDeclarationTva = value;
       }

    get etatDeclarationTvaSelections(): Array<EtatDeclarationTvaVo> {
    if(this._etatDeclarationTvaSelections==null){
    this._etatDeclarationTvaSelections=new Array<EtatDeclarationTvaVo>();
    }
        return this._etatDeclarationTvaSelections;
       }


    set etatDeclarationTvaSelections(value: Array<EtatDeclarationTvaVo>) {
        this._etatDeclarationTvaSelections = value;
       }

    get createEtatDeclarationTvaDialog(): boolean {
        return this._createEtatDeclarationTvaDialog;
       }

    set createEtatDeclarationTvaDialog(value: boolean) {
        this._createEtatDeclarationTvaDialog = value;
       }

    get editEtatDeclarationTvaDialog(): boolean {
        return this._editEtatDeclarationTvaDialog;
       }

    set editEtatDeclarationTvaDialog(value: boolean) {
        this._editEtatDeclarationTvaDialog = value;
       }

    get viewEtatDeclarationTvaDialog(): boolean {
        return this._viewEtatDeclarationTvaDialog;
       }

    set viewEtatDeclarationTvaDialog(value: boolean) {
        this._viewEtatDeclarationTvaDialog = value;
       }

     get searchEtatDeclarationTva(): EtatDeclarationTvaVo {
     if(this._searchEtatDeclarationTva==null){
    this._searchEtatDeclarationTva=new EtatDeclarationTvaVo();
    }
        return this._searchEtatDeclarationTva;
    }

    set searchEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this._searchEtatDeclarationTva = value;
       }

}
