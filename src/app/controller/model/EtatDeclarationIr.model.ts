


export class EtatDeclarationIrVo {

    public id: number;

    public reference : string;
    public libelle : string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
    constructor() {
        this.reference = 'E2';
    }



}
