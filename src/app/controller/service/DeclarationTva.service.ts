import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeclarationTvaVo} from '../model/DeclarationTva.model';
import {SocieteVo} from '../model/Societe.model';
import {PaiementDeclarationTvaVo} from '../model/PaiementDeclarationTva.model';
import {EtatDeclarationTvaVo} from '../model/EtatDeclarationTva.model';
import {TypeDeclarationTvaVo} from '../model/TypeDeclarationTva.model';


@Injectable({
  providedIn: 'root'
})
export class DeclarationTvaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/declarationTva/';
        })
    }
     private _declarationTvas: Array<DeclarationTvaVo> ;
     private _selectedDeclarationTva: DeclarationTvaVo;
     private _declarationTvaSelections: Array<DeclarationTvaVo>;
     private _createDeclarationTvaDialog: boolean;
     private _editDeclarationTvaDialog: boolean;
     private _viewDeclarationTvaDialog: boolean;
     public editDeclarationTva$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeclarationTva:DeclarationTvaVo ;

    // methods
    public archiver(declarationTva: DeclarationTvaVo): Observable<DeclarationTvaVo> {
        return this.http.put<DeclarationTvaVo>(this.API + 'archiver/' ,declarationTva);
    }
    public desarchiver(declarationTva: DeclarationTvaVo): Observable<DeclarationTvaVo> {
    return this.http.put<DeclarationTvaVo>(this.API + 'desarchiver/' ,declarationTva);
    }

    public findAll(){
     return this.http.get<Array<DeclarationTvaVo>>(this.API);
    }

    public save(): Observable<DeclarationTvaVo> {
           return this.http.post<DeclarationTvaVo>(this.API, {...this.selectedDeclarationTva,dateCreation: moment(this.selectedDeclarationTva.dateCreation).format("YYYY-MM-DD")});
    }

    delete(declarationTva: DeclarationTvaVo) {
         return this.http.delete<number>(this.API + 'id/' + declarationTva.id);
    }


    public edit(): Observable<DeclarationTvaVo> {
        return this.http.put<DeclarationTvaVo>(this.API, this.selectedDeclarationTva);
    }


     public findByCriteria(declarationTva:DeclarationTvaVo):Observable<Array<DeclarationTvaVo>>{
           return this.http.post<Array<DeclarationTvaVo>>(this.API +'search', declarationTva);
    }

   public findByIdWithAssociatedList(declarationTva:DeclarationTvaVo):Observable<DeclarationTvaVo>{
         return this.http.get<DeclarationTvaVo>(this.API + 'detail/id/' +declarationTva.id);
    }

    // getters and setters


    get declarationTvas(): Array<DeclarationTvaVo> {
    if(this._declarationTvas==null){
    this._declarationTvas=new Array<DeclarationTvaVo>();
    }
return this._declarationTvas;
       }

    set declarationTvas(value: Array<DeclarationTvaVo>) {
        this._declarationTvas = value;
       }

    get selectedDeclarationTva(): DeclarationTvaVo {
    if(this._selectedDeclarationTva==null){
    this._selectedDeclarationTva=new DeclarationTvaVo();
    }
           return this._selectedDeclarationTva;
       }

    set selectedDeclarationTva(value: DeclarationTvaVo) {
        this._selectedDeclarationTva = value;
       }

    get declarationTvaSelections(): Array<DeclarationTvaVo> {
    if(this._declarationTvaSelections==null){
    this._declarationTvaSelections=new Array<DeclarationTvaVo>();
    }
        return this._declarationTvaSelections;
       }


    set declarationTvaSelections(value: Array<DeclarationTvaVo>) {
        this._declarationTvaSelections = value;
       }

    get createDeclarationTvaDialog(): boolean {
        return this._createDeclarationTvaDialog;
       }

    set createDeclarationTvaDialog(value: boolean) {
        this._createDeclarationTvaDialog = value;
       }

    get editDeclarationTvaDialog(): boolean {
        return this._editDeclarationTvaDialog;
       }

    set editDeclarationTvaDialog(value: boolean) {
        this._editDeclarationTvaDialog = value;
       }

    get viewDeclarationTvaDialog(): boolean {
        return this._viewDeclarationTvaDialog;
       }

    set viewDeclarationTvaDialog(value: boolean) {
        this._viewDeclarationTvaDialog = value;
       }

     get searchDeclarationTva(): DeclarationTvaVo {
     if(this._searchDeclarationTva==null){
    this._searchDeclarationTva=new DeclarationTvaVo();
    }
        return this._searchDeclarationTva;
    }

    set searchDeclarationTva(value: DeclarationTvaVo) {
        this._searchDeclarationTva = value;
       }

}
