import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommentaireVo} from '../model/Commentaire.model';
import {DemandeVo} from '../model/Demande.model';


@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/commentaire/';
        })
    }
     private _commentaires: Array<CommentaireVo> ;
     private _selectedCommentaire: CommentaireVo;
     private _commentaireSelections: Array<CommentaireVo>;
     private _createCommentaireDialog: boolean;
     private _editCommentaireDialog: boolean;
     private _viewCommentaireDialog: boolean;
     public editCommentaire$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommentaire:CommentaireVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommentaireVo>>(this.API);
    }

    public save(): Observable<CommentaireVo> {
           return this.http.post<CommentaireVo>(this.API, {...this.selectedCommentaire,dateCommentaire: moment(this.selectedCommentaire.dateCommentaire).format("YYYY-MM-DD")});
    }

    delete(commentaire: CommentaireVo) {
         return this.http.delete<number>(this.API + 'id/' + commentaire.id);
    }


    public edit(): Observable<CommentaireVo> {
        return this.http.put<CommentaireVo>(this.API, this.selectedCommentaire);
    }


     public findByCriteria(commentaire:CommentaireVo):Observable<Array<CommentaireVo>>{
           return this.http.post<Array<CommentaireVo>>(this.API +'search', commentaire);
    }

   public findByIdWithAssociatedList(commentaire:CommentaireVo):Observable<CommentaireVo>{
         return this.http.get<CommentaireVo>(this.API + 'detail/id/' +commentaire.id);
    }

    // getters and setters


    get commentaires(): Array<CommentaireVo> {
    if(this._commentaires==null){
    this._commentaires=new Array<CommentaireVo>();
    }
return this._commentaires;
       }

    set commentaires(value: Array<CommentaireVo>) {
        this._commentaires = value;
       }

    get selectedCommentaire(): CommentaireVo {
    if(this._selectedCommentaire==null){
    this._selectedCommentaire=new CommentaireVo();
    }
           return this._selectedCommentaire;
       }

    set selectedCommentaire(value: CommentaireVo) {
        this._selectedCommentaire = value;
       }

    get commentaireSelections(): Array<CommentaireVo> {
    if(this._commentaireSelections==null){
    this._commentaireSelections=new Array<CommentaireVo>();
    }
        return this._commentaireSelections;
       }


    set commentaireSelections(value: Array<CommentaireVo>) {
        this._commentaireSelections = value;
       }

    get createCommentaireDialog(): boolean {
        return this._createCommentaireDialog;
       }

    set createCommentaireDialog(value: boolean) {
        this._createCommentaireDialog = value;
       }

    get editCommentaireDialog(): boolean {
        return this._editCommentaireDialog;
       }

    set editCommentaireDialog(value: boolean) {
        this._editCommentaireDialog = value;
       }

    get viewCommentaireDialog(): boolean {
        return this._viewCommentaireDialog;
       }

    set viewCommentaireDialog(value: boolean) {
        this._viewCommentaireDialog = value;
       }

     get searchCommentaire(): CommentaireVo {
     if(this._searchCommentaire==null){
    this._searchCommentaire=new CommentaireVo();
    }
        return this._searchCommentaire;
    }

    set searchCommentaire(value: CommentaireVo) {
        this._searchCommentaire = value;
       }

}
