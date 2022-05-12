import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PrelevementSocialEmployeVo} from '../model/PrelevementSocialEmploye.model';
import {PrelevementSocialVo} from '../model/PrelevementSocial.model';
import {EmployeVo} from '../model/Employe.model';
import {DeclarationIrVo} from '../model/DeclarationIr.model';


@Injectable({
  providedIn: 'root'
})
export class PrelevementSocialEmployeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/prelevementSocialEmploye/';
        })
    }
     private _prelevementSocialEmployes: Array<PrelevementSocialEmployeVo> ;
     private _selectedPrelevementSocialEmploye: PrelevementSocialEmployeVo;
     private _prelevementSocialEmployeSelections: Array<PrelevementSocialEmployeVo>;
     private _createPrelevementSocialEmployeDialog: boolean;
     private _editPrelevementSocialEmployeDialog: boolean;
     private _viewPrelevementSocialEmployeDialog: boolean;
     public editPrelevementSocialEmploye$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPrelevementSocialEmploye:PrelevementSocialEmployeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PrelevementSocialEmployeVo>>(this.API);
    }

    public save(): Observable<PrelevementSocialEmployeVo> {
         return this.http.post<PrelevementSocialEmployeVo>(this.API, this.selectedPrelevementSocialEmploye);
    }

    delete(prelevementSocialEmploye: PrelevementSocialEmployeVo) {
         return this.http.delete<number>(this.API + 'id/' + prelevementSocialEmploye.id);
    }


    public edit(): Observable<PrelevementSocialEmployeVo> {
        return this.http.put<PrelevementSocialEmployeVo>(this.API, this.selectedPrelevementSocialEmploye);
    }


     public findByCriteria(prelevementSocialEmploye:PrelevementSocialEmployeVo):Observable<Array<PrelevementSocialEmployeVo>>{
           return this.http.post<Array<PrelevementSocialEmployeVo>>(this.API +'search', prelevementSocialEmploye);
    }

   public findByIdWithAssociatedList(prelevementSocialEmploye:PrelevementSocialEmployeVo):Observable<PrelevementSocialEmployeVo>{
         return this.http.get<PrelevementSocialEmployeVo>(this.API + 'detail/id/' +prelevementSocialEmploye.id);
    }

    // getters and setters


    get prelevementSocialEmployes(): Array<PrelevementSocialEmployeVo> {
    if(this._prelevementSocialEmployes==null){
    this._prelevementSocialEmployes=new Array<PrelevementSocialEmployeVo>();
    }
return this._prelevementSocialEmployes;
       }

    set prelevementSocialEmployes(value: Array<PrelevementSocialEmployeVo>) {
        this._prelevementSocialEmployes = value;
       }

    get selectedPrelevementSocialEmploye(): PrelevementSocialEmployeVo {
    if(this._selectedPrelevementSocialEmploye==null){
    this._selectedPrelevementSocialEmploye=new PrelevementSocialEmployeVo();
    }
           return this._selectedPrelevementSocialEmploye;
       }

    set selectedPrelevementSocialEmploye(value: PrelevementSocialEmployeVo) {
        this._selectedPrelevementSocialEmploye = value;
       }

    get prelevementSocialEmployeSelections(): Array<PrelevementSocialEmployeVo> {
    if(this._prelevementSocialEmployeSelections==null){
    this._prelevementSocialEmployeSelections=new Array<PrelevementSocialEmployeVo>();
    }
        return this._prelevementSocialEmployeSelections;
       }


    set prelevementSocialEmployeSelections(value: Array<PrelevementSocialEmployeVo>) {
        this._prelevementSocialEmployeSelections = value;
       }

    get createPrelevementSocialEmployeDialog(): boolean {
        return this._createPrelevementSocialEmployeDialog;
       }

    set createPrelevementSocialEmployeDialog(value: boolean) {
        this._createPrelevementSocialEmployeDialog = value;
       }

    get editPrelevementSocialEmployeDialog(): boolean {
        return this._editPrelevementSocialEmployeDialog;
       }

    set editPrelevementSocialEmployeDialog(value: boolean) {
        this._editPrelevementSocialEmployeDialog = value;
       }

    get viewPrelevementSocialEmployeDialog(): boolean {
        return this._viewPrelevementSocialEmployeDialog;
       }

    set viewPrelevementSocialEmployeDialog(value: boolean) {
        this._viewPrelevementSocialEmployeDialog = value;
       }

     get searchPrelevementSocialEmploye(): PrelevementSocialEmployeVo {
     if(this._searchPrelevementSocialEmploye==null){
    this._searchPrelevementSocialEmploye=new PrelevementSocialEmployeVo();
    }
        return this._searchPrelevementSocialEmploye;
    }

    set searchPrelevementSocialEmploye(value: PrelevementSocialEmployeVo) {
        this._searchPrelevementSocialEmploye = value;
       }

}
