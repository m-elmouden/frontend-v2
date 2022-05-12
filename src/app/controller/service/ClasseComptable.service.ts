import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ClasseComptableVo} from '../model/ClasseComptable.model';
import {SousClasseComptableVo} from '../model/SousClasseComptable.model';


@Injectable({
  providedIn: 'root'
})
export class ClasseComptableService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/classeComptable/';
        })
    }
     private _classeComptables: Array<ClasseComptableVo> ;
     private _selectedClasseComptable: ClasseComptableVo;
     private _classeComptableSelections: Array<ClasseComptableVo>;
     private _createClasseComptableDialog: boolean;
     private _editClasseComptableDialog: boolean;
     private _viewClasseComptableDialog: boolean;
     public editClasseComptable$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchClasseComptable:ClasseComptableVo ;

    // methods
    public archiver(classeComptable: ClasseComptableVo): Observable<ClasseComptableVo> {
        return this.http.put<ClasseComptableVo>(this.API + 'archiver/' ,classeComptable);
    }
    public desarchiver(classeComptable: ClasseComptableVo): Observable<ClasseComptableVo> {
    return this.http.put<ClasseComptableVo>(this.API + 'desarchiver/' ,classeComptable);
    }

    public findAll(){
     return this.http.get<Array<ClasseComptableVo>>(this.API);
    }

    public save(): Observable<ClasseComptableVo> {
           return this.http.post<ClasseComptableVo>(this.API, {...this.selectedClasseComptable,dateCreation: moment(this.selectedClasseComptable.dateCreation).format("YYYY-MM-DD")});
    }

    delete(classeComptable: ClasseComptableVo) {
         return this.http.delete<number>(this.API + 'id/' + classeComptable.id);
    }


    public edit(): Observable<ClasseComptableVo> {
        return this.http.put<ClasseComptableVo>(this.API, this.selectedClasseComptable);
    }


     public findByCriteria(classeComptable:ClasseComptableVo):Observable<Array<ClasseComptableVo>>{
           return this.http.post<Array<ClasseComptableVo>>(this.API +'search', classeComptable);
    }

   public findByIdWithAssociatedList(classeComptable:ClasseComptableVo):Observable<ClasseComptableVo>{
         return this.http.get<ClasseComptableVo>(this.API + 'detail/id/' +classeComptable.id);
    }

    // getters and setters


    get classeComptables(): Array<ClasseComptableVo> {
    if(this._classeComptables==null){
    this._classeComptables=new Array<ClasseComptableVo>();
    }
return this._classeComptables;
       }

    set classeComptables(value: Array<ClasseComptableVo>) {
        this._classeComptables = value;
       }

    get selectedClasseComptable(): ClasseComptableVo {
    if(this._selectedClasseComptable==null){
    this._selectedClasseComptable=new ClasseComptableVo();
    }
           return this._selectedClasseComptable;
       }

    set selectedClasseComptable(value: ClasseComptableVo) {
        this._selectedClasseComptable = value;
       }

    get classeComptableSelections(): Array<ClasseComptableVo> {
    if(this._classeComptableSelections==null){
    this._classeComptableSelections=new Array<ClasseComptableVo>();
    }
        return this._classeComptableSelections;
       }


    set classeComptableSelections(value: Array<ClasseComptableVo>) {
        this._classeComptableSelections = value;
       }

    get createClasseComptableDialog(): boolean {
        return this._createClasseComptableDialog;
       }

    set createClasseComptableDialog(value: boolean) {
        this._createClasseComptableDialog = value;
       }

    get editClasseComptableDialog(): boolean {
        return this._editClasseComptableDialog;
       }

    set editClasseComptableDialog(value: boolean) {
        this._editClasseComptableDialog = value;
       }

    get viewClasseComptableDialog(): boolean {
        return this._viewClasseComptableDialog;
       }

    set viewClasseComptableDialog(value: boolean) {
        this._viewClasseComptableDialog = value;
       }

     get searchClasseComptable(): ClasseComptableVo {
     if(this._searchClasseComptable==null){
    this._searchClasseComptable=new ClasseComptableVo();
    }
        return this._searchClasseComptable;
    }

    set searchClasseComptable(value: ClasseComptableVo) {
        this._searchClasseComptable = value;
       }

}
