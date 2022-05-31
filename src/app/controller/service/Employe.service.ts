import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EmployeVo} from '../model/Employe.model';
import {SocieteVo} from '../model/Societe.model';
import {DeclarationCnssVo} from '../model/DeclarationCnss.model';
import {TypeEmployeVo} from '../model/TypeEmploye.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/employe/';
        })
    }
     private _employes: Array<EmployeVo> ;
     private _selectedEmploye: EmployeVo;
     private _employeSelections: Array<EmployeVo>;
     private _createEmployeDialog: boolean;
     private _editEmployeDialog: boolean;
     private _viewEmployeDialog: boolean;
     public editEmploye$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEmploye:EmployeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EmployeVo>>(this.API);
    }

    public save(): Observable<EmployeVo> {
         return this.http.post<EmployeVo>(this.API, this.selectedEmploye);
    }

    delete(employe: EmployeVo) {
         return this.http.delete<number>(this.API + 'id/' + employe.id);
    }


    public edit(): Observable<EmployeVo> {
        return this.http.put<EmployeVo>(this.API, this.selectedEmploye);
    }


     public findByCriteria(employe:EmployeVo):Observable<Array<EmployeVo>>{
           return this.http.post<Array<EmployeVo>>(this.API +'search', employe);
    }

   public findByIdWithAssociatedList(employe:EmployeVo):Observable<EmployeVo>{
         return this.http.get<EmployeVo>(this.API + 'detail/id/' +employe.id);
    }

    // getters and setters


    get employes(): Array<EmployeVo> {
    if(this._employes==null){
    this._employes=new Array<EmployeVo>();
    }
return this._employes;
       }

    set employes(value: Array<EmployeVo>) {
        this._employes = value;
       }

    get selectedEmploye(): EmployeVo {
    if(this._selectedEmploye==null){
    this._selectedEmploye=new EmployeVo();
    }
           return this._selectedEmploye;
       }

    set selectedEmploye(value: EmployeVo) {
        this._selectedEmploye = value;
       }

    get employeSelections(): Array<EmployeVo> {
    if(this._employeSelections==null){
    this._employeSelections=new Array<EmployeVo>();
    }
        return this._employeSelections;
       }


    set employeSelections(value: Array<EmployeVo>) {
        this._employeSelections = value;
       }

    get createEmployeDialog(): boolean {
        return this._createEmployeDialog;
       }

    set createEmployeDialog(value: boolean) {
        this._createEmployeDialog = value;
       }

    get editEmployeDialog(): boolean {
        return this._editEmployeDialog;
       }

    set editEmployeDialog(value: boolean) {
        this._editEmployeDialog = value;
       }

    get viewEmployeDialog(): boolean {
        return this._viewEmployeDialog;
       }

    set viewEmployeDialog(value: boolean) {
        this._viewEmployeDialog = value;
       }

     get searchEmploye(): EmployeVo {
     if(this._searchEmploye==null){
    this._searchEmploye=new EmployeVo();
    }
        return this._searchEmploye;
    }

    set searchEmploye(value: EmployeVo) {
        this._searchEmploye = value;
       }

    public importExcel(formData: FormData){
        console.log(formData);
        return this.http.post('http://localhost:8036/api/excel/upload-employes', formData);
    }
}
