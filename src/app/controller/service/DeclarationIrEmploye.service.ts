import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeclarationIrEmployeVo} from '../model/DeclarationIrEmploye.model';
import {TauxIrVo} from '../model/TauxIr.model';
import {DeclarationIrVo} from '../model/DeclarationIr.model';
import {EmployeVo} from '../model/Employe.model';


@Injectable({
  providedIn: 'root'
})
export class DeclarationIrEmployeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/declarationIrEmploye/';
        })
    }
     private _declarationIrEmployes: Array<DeclarationIrEmployeVo> ;
     private _selectedDeclarationIrEmploye: DeclarationIrEmployeVo;
     private _declarationIrEmployeSelections: Array<DeclarationIrEmployeVo>;
     private _createDeclarationIrEmployeDialog: boolean;
     private _editDeclarationIrEmployeDialog: boolean;
     private _viewDeclarationIrEmployeDialog: boolean;
     public editDeclarationIrEmploye$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeclarationIrEmploye:DeclarationIrEmployeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeclarationIrEmployeVo>>(this.API);
    }

    public save(): Observable<DeclarationIrEmployeVo> {
         return this.http.post<DeclarationIrEmployeVo>(this.API, this.selectedDeclarationIrEmploye);
    }

    delete(declarationIrEmploye: DeclarationIrEmployeVo) {
         return this.http.delete<number>(this.API + 'id/' + declarationIrEmploye.id);
    }


    public edit(): Observable<DeclarationIrEmployeVo> {
        return this.http.put<DeclarationIrEmployeVo>(this.API, this.selectedDeclarationIrEmploye);
    }


     public findByCriteria(declarationIrEmploye:DeclarationIrEmployeVo):Observable<Array<DeclarationIrEmployeVo>>{
           return this.http.post<Array<DeclarationIrEmployeVo>>(this.API +'search', declarationIrEmploye);
    }

   public findByIdWithAssociatedList(declarationIrEmploye:DeclarationIrEmployeVo):Observable<DeclarationIrEmployeVo>{
         return this.http.get<DeclarationIrEmployeVo>(this.API + 'detail/id/' +declarationIrEmploye.id);
    }

    // getters and setters


    get declarationIrEmployes(): Array<DeclarationIrEmployeVo> {
    if(this._declarationIrEmployes==null){
    this._declarationIrEmployes=new Array<DeclarationIrEmployeVo>();
    }
return this._declarationIrEmployes;
       }

    set declarationIrEmployes(value: Array<DeclarationIrEmployeVo>) {
        this._declarationIrEmployes = value;
       }

    get selectedDeclarationIrEmploye(): DeclarationIrEmployeVo {
    if(this._selectedDeclarationIrEmploye==null){
    this._selectedDeclarationIrEmploye=new DeclarationIrEmployeVo();
    }
           return this._selectedDeclarationIrEmploye;
       }

    set selectedDeclarationIrEmploye(value: DeclarationIrEmployeVo) {
        this._selectedDeclarationIrEmploye = value;
       }

    get declarationIrEmployeSelections(): Array<DeclarationIrEmployeVo> {
    if(this._declarationIrEmployeSelections==null){
    this._declarationIrEmployeSelections=new Array<DeclarationIrEmployeVo>();
    }
        return this._declarationIrEmployeSelections;
       }


    set declarationIrEmployeSelections(value: Array<DeclarationIrEmployeVo>) {
        this._declarationIrEmployeSelections = value;
       }

    get createDeclarationIrEmployeDialog(): boolean {
        return this._createDeclarationIrEmployeDialog;
       }

    set createDeclarationIrEmployeDialog(value: boolean) {
        this._createDeclarationIrEmployeDialog = value;
       }

    get editDeclarationIrEmployeDialog(): boolean {
        return this._editDeclarationIrEmployeDialog;
       }

    set editDeclarationIrEmployeDialog(value: boolean) {
        this._editDeclarationIrEmployeDialog = value;
       }

    get viewDeclarationIrEmployeDialog(): boolean {
        return this._viewDeclarationIrEmployeDialog;
       }

    set viewDeclarationIrEmployeDialog(value: boolean) {
        this._viewDeclarationIrEmployeDialog = value;
       }

     get searchDeclarationIrEmploye(): DeclarationIrEmployeVo {
     if(this._searchDeclarationIrEmploye==null){
    this._searchDeclarationIrEmploye=new DeclarationIrEmployeVo();
    }
        return this._searchDeclarationIrEmploye;
    }

    set searchDeclarationIrEmploye(value: DeclarationIrEmployeVo) {
        this._searchDeclarationIrEmploye = value;
       }

    importExcel(formData: FormData) {
        console.log(formData);
        return this.http.post('http://localhost:8036/api/excel/upload-declaration-ir-employe', formData);

    }
}
