import {DemandeVo} from './Demande.model';



export class CommentaireVo {

    public id: number;

    public description: string;
    public dateCommentaire: Date;
    public auteur: string;
                public dateCommentaireMax: string ;
                public dateCommentaireMin: string ;
      public demandeVo: DemandeVo ;

}
