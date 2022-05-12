import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeclarationCnssDetailVo} from '../model/DeclarationCnssDetail.model';
import {TypeTauxCnssVo} from '../model/TypeTauxCnss.model';
import {DeclarationCnssVo} from '../model/DeclarationCnss.model';


@Injectable({
  providedIn: 'root'
})
export class DeclarationCnssDetailService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/declarationCnssDetail/';
        })
    }
     private _declarationCnssDetails: Array<DeclarationCnssDetailVo> ;
     private _selectedDeclarationCnssDetail: DeclarationCnssDetailVo;
     private _declarationCnssDetailSelections: Array<DeclarationCnssDetailVo>;
     private _createDeclarationCnssDetailDialog: boolean;
     private _editDeclarationCnssDetailDialog: boolean;
     private _viewDeclarationCnssDetailDialog: boolean;
     public editDeclarationCnssDetail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeclarationCnssDetail:DeclarationCnssDetailVo ;

    // methods
    public archiver(declarationCnssDetail: DeclarationCnssDetailVo): Observable<DeclarationCnssDetailVo> {
        return this.http.put<DeclarationCnssDetailVo>(this.API + 'archiver/' ,declarationCnssDetail);
    }
    public desarchiver(declarationCnssDetail: DeclarationCnssDetailVo): Observable<DeclarationCnssDetailVo> {
    return this.http.put<DeclarationCnssDetailVo>(this.API + 'desarchiver/' ,declarationCnssDetail);
    }

    public findAll(){
     return this.http.get<Array<DeclarationCnssDetailVo>>(this.API);
    }

    public save(): Observable<DeclarationCnssDetailVo> {
           return this.http.post<DeclarationCnssDetailVo>(this.API, {...this.selectedDeclarationCnssDetail,dateCreation: moment(this.selectedDeclarationCnssDetail.dateCreation).format("YYYY-MM-DD")});
    }

    delete(declarationCnssDetail: DeclarationCnssDetailVo) {
         return this.http.delete<number>(this.API + 'id/' + declarationCnssDetail.id);
    }


    public edit(): Observable<DeclarationCnssDetailVo> {
        return this.http.put<DeclarationCnssDetailVo>(this.API, this.selectedDeclarationCnssDetail);
    }


     public findByCriteria(declarationCnssDetail:DeclarationCnssDetailVo):Observable<Array<DeclarationCnssDetailVo>>{
           return this.http.post<Array<DeclarationCnssDetailVo>>(this.API +'search', declarationCnssDetail);
    }

   public findByIdWithAssociatedList(declarationCnssDetail:DeclarationCnssDetailVo):Observable<DeclarationCnssDetailVo>{
         return this.http.get<DeclarationCnssDetailVo>(this.API + 'detail/id/' +declarationCnssDetail.id);
    }

    // getters and setters


    get declarationCnssDetails(): Array<DeclarationCnssDetailVo> {
    if(this._declarationCnssDetails==null){
    this._declarationCnssDetails=new Array<DeclarationCnssDetailVo>();
    }
return this._declarationCnssDetails;
       }

    set declarationCnssDetails(value: Array<DeclarationCnssDetailVo>) {
        this._declarationCnssDetails = value;
       }

    get selectedDeclarationCnssDetail(): DeclarationCnssDetailVo {
    if(this._selectedDeclarationCnssDetail==null){
    this._selectedDeclarationCnssDetail=new DeclarationCnssDetailVo();
    }
           return this._selectedDeclarationCnssDetail;
       }

    set selectedDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this._selectedDeclarationCnssDetail = value;
       }

    get declarationCnssDetailSelections(): Array<DeclarationCnssDetailVo> {
    if(this._declarationCnssDetailSelections==null){
    this._declarationCnssDetailSelections=new Array<DeclarationCnssDetailVo>();
    }
        return this._declarationCnssDetailSelections;
       }


    set declarationCnssDetailSelections(value: Array<DeclarationCnssDetailVo>) {
        this._declarationCnssDetailSelections = value;
       }

    get createDeclarationCnssDetailDialog(): boolean {
        return this._createDeclarationCnssDetailDialog;
       }

    set createDeclarationCnssDetailDialog(value: boolean) {
        this._createDeclarationCnssDetailDialog = value;
       }

    get editDeclarationCnssDetailDialog(): boolean {
        return this._editDeclarationCnssDetailDialog;
       }

    set editDeclarationCnssDetailDialog(value: boolean) {
        this._editDeclarationCnssDetailDialog = value;
       }

    get viewDeclarationCnssDetailDialog(): boolean {
        return this._viewDeclarationCnssDetailDialog;
       }

    set viewDeclarationCnssDetailDialog(value: boolean) {
        this._viewDeclarationCnssDetailDialog = value;
       }

     get searchDeclarationCnssDetail(): DeclarationCnssDetailVo {
     if(this._searchDeclarationCnssDetail==null){
    this._searchDeclarationCnssDetail=new DeclarationCnssDetailVo();
    }
        return this._searchDeclarationCnssDetail;
    }

    set searchDeclarationCnssDetail(value: DeclarationCnssDetailVo) {
        this._searchDeclarationCnssDetail = value;
       }

}
