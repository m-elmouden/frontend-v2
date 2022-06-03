import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PrelevementSocialVo} from '../model/PrelevementSocial.model';


@Injectable({
  providedIn: 'root'
})
export class PrelevementSocialService {
    private API = '';
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/prelevementSocial/';
        });
    }
     private _prelevementSocials: Array<PrelevementSocialVo> ;
     private _selectedPrelevementSocial: PrelevementSocialVo;
     private _prelevementSocialSelections: Array<PrelevementSocialVo>;
     private _createPrelevementSocialDialog: boolean;
     private _editPrelevementSocialDialog: boolean;
     private _viewPrelevementSocialDialog: boolean;
     public editPrelevementSocial$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPrelevementSocial: PrelevementSocialVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PrelevementSocialVo>>(this.API);
    }

    public save(): Observable<PrelevementSocialVo> {
           return this.http.post<PrelevementSocialVo>(this.API, {...this.selectedPrelevementSocial,dateMin: moment(this.selectedPrelevementSocial.dateMin).format("YYYY-MM-DD")});
    }

    delete(prelevementSocial: PrelevementSocialVo) {
         return this.http.delete<number>(this.API + 'id/' + prelevementSocial.id);
    }


    public edit(): Observable<PrelevementSocialVo> {
        return this.http.put<PrelevementSocialVo>(this.API, this.selectedPrelevementSocial);
    }


     public findByCriteria(prelevementSocial:PrelevementSocialVo):Observable<Array<PrelevementSocialVo>>{
           return this.http.post<Array<PrelevementSocialVo>>(this.API +'search', prelevementSocial);
    }

   public findByIdWithAssociatedList(prelevementSocial:PrelevementSocialVo):Observable<PrelevementSocialVo>{
         return this.http.get<PrelevementSocialVo>(this.API + 'detail/id/' +prelevementSocial.id);
    }

    // getters and setters


    get prelevementSocials(): Array<PrelevementSocialVo> {
    if(this._prelevementSocials == null){
    this._prelevementSocials = new Array<PrelevementSocialVo>();
    }
return this._prelevementSocials;
       }

    set prelevementSocials(value: Array<PrelevementSocialVo>) {
        this._prelevementSocials = value;
       }

    get selectedPrelevementSocial(): PrelevementSocialVo {
    if(this._selectedPrelevementSocial == null){
    this._selectedPrelevementSocial = new PrelevementSocialVo();
    }
           return this._selectedPrelevementSocial;
       }

    set selectedPrelevementSocial(value: PrelevementSocialVo) {
        this._selectedPrelevementSocial = value;
       }

    get prelevementSocialSelections(): Array<PrelevementSocialVo> {
    if(this._prelevementSocialSelections==null){
    this._prelevementSocialSelections=new Array<PrelevementSocialVo>();
    }
        return this._prelevementSocialSelections;
       }


    set prelevementSocialSelections(value: Array<PrelevementSocialVo>) {
        this._prelevementSocialSelections = value;
       }

    get createPrelevementSocialDialog(): boolean {
        return this._createPrelevementSocialDialog;
       }

    set createPrelevementSocialDialog(value: boolean) {
        this._createPrelevementSocialDialog = value;
       }

    get editPrelevementSocialDialog(): boolean {
        return this._editPrelevementSocialDialog;
       }

    set editPrelevementSocialDialog(value: boolean) {
        this._editPrelevementSocialDialog = value;
       }

    get viewPrelevementSocialDialog(): boolean {
        return this._viewPrelevementSocialDialog;
       }

    set viewPrelevementSocialDialog(value: boolean) {
        this._viewPrelevementSocialDialog = value;
       }

     get searchPrelevementSocial(): PrelevementSocialVo {
     if(this._searchPrelevementSocial==null){
    this._searchPrelevementSocial=new PrelevementSocialVo();
    }
        return this._searchPrelevementSocial;
    }

    set searchPrelevementSocial(value: PrelevementSocialVo) {
        this._searchPrelevementSocial = value;
       }

}
