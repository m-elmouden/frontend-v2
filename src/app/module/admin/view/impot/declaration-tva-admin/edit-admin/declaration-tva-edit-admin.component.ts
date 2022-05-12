import {Component, OnInit} from '@angular/core';
import {DeclarationTvaService} from '../../../../../../controller/service/DeclarationTva.service';
import {DeclarationTvaVo} from '../../../../../../controller/model/DeclarationTva.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SocieteVo} from '../../../../../../controller/model/Societe.model';
import {SocieteService} from '../../../../../../controller/service/Societe.service';
import {PaiementDeclarationTvaVo} from '../../../../../../controller/model/PaiementDeclarationTva.model';
import {PaiementDeclarationTvaService} from '../../../../../../controller/service/PaiementDeclarationTva.service';
import {EtatDeclarationTvaVo} from '../../../../../../controller/model/EtatDeclarationTva.model';
import {EtatDeclarationTvaService} from '../../../../../../controller/service/EtatDeclarationTva.service';
import {TypeDeclarationTvaVo} from '../../../../../../controller/model/TypeDeclarationTva.model';
import {TypeDeclarationTvaService} from '../../../../../../controller/service/TypeDeclarationTva.service';

@Component({
  selector: 'app-declaration-tva-edit-admin',
  templateUrl: './declaration-tva-edit-admin.component.html',
  styleUrls: ['./declaration-tva-edit-admin.component.css']
})
export class DeclarationTvaEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private declarationTvaService: DeclarationTvaService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private societeService: SocieteService
 ,       private paiementDeclarationTvaService: PaiementDeclarationTvaService
 ,       private etatDeclarationTvaService: EtatDeclarationTvaService
 ,       private typeDeclarationTvaService: TypeDeclarationTvaService
) {
}

// methods
ngOnInit(): void {
    this.selectedSociete = new SocieteVo();
    this.societeService.findAll().subscribe((data) => this.societes = data);
    this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();
    this.typeDeclarationTvaService.findAll().subscribe((data) => this.typeDeclarationTvas = data);
    this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();
    this.etatDeclarationTvaService.findAll().subscribe((data) => this.etatDeclarationTvas = data);
    this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();
    this.paiementDeclarationTvaService.findAll().subscribe((data) => this.paiementDeclarationTvas = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDeclarationTva.dateArchivage = DateUtils.toDate(this.selectedDeclarationTva.dateArchivage);
            this.selectedDeclarationTva.dateCreation = DateUtils.toDate(this.selectedDeclarationTva.dateCreation);
    this.declarationTvaService.edit().subscribe(declarationTva=>{
    const myIndex = this.declarationTvas.findIndex(e => e.id === this.selectedDeclarationTva.id);
    this.declarationTvas[myIndex] = this.selectedDeclarationTva;
    this.editDeclarationTvaDialog = false;
    this.selectedDeclarationTva = new DeclarationTvaVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatDeclarationTva(etatDeclarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDeclarationTva', 'add');
                       if(isPermistted){
         this.selectedEtatDeclarationTva = new EtatDeclarationTvaVo();
        this.createEtatDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesociete(societe: string) {
                      const isPermistted = await this.roleService.isPermitted('Societe', 'add');
                       if(isPermistted){
         this.selectedSociete = new SocieteVo();
        this.createSocieteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepaiementDeclarationTva(paiementDeclarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('PaiementDeclarationTva', 'add');
                       if(isPermistted){
         this.selectedPaiementDeclarationTva = new PaiementDeclarationTvaVo();
        this.createPaiementDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeDeclarationTva(typeDeclarationTva: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeDeclarationTva', 'add');
                       if(isPermistted){
         this.selectedTypeDeclarationTva = new TypeDeclarationTvaVo();
        this.createTypeDeclarationTvaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDeclarationTvaDialog  = false;
}

// getters and setters

get declarationTvas(): Array<DeclarationTvaVo> {
    return this.declarationTvaService.declarationTvas;
       }
set declarationTvas(value: Array<DeclarationTvaVo>) {
        this.declarationTvaService.declarationTvas = value;
       }

 get selectedDeclarationTva(): DeclarationTvaVo {
           return this.declarationTvaService.selectedDeclarationTva;
       }
    set selectedDeclarationTva(value: DeclarationTvaVo) {
        this.declarationTvaService.selectedDeclarationTva = value;
       }

   get editDeclarationTvaDialog(): boolean {
           return this.declarationTvaService.editDeclarationTvaDialog;

       }
    set editDeclarationTvaDialog(value: boolean) {
        this.declarationTvaService.editDeclarationTvaDialog = value;
       }

       get selectedEtatDeclarationTva(): EtatDeclarationTvaVo {
           return this.etatDeclarationTvaService.selectedEtatDeclarationTva;
       }
      set selectedEtatDeclarationTva(value: EtatDeclarationTvaVo) {
        this.etatDeclarationTvaService.selectedEtatDeclarationTva = value;
       }
       get etatDeclarationTvas(): Array<EtatDeclarationTvaVo> {
           return this.etatDeclarationTvaService.etatDeclarationTvas;
       }
       set etatDeclarationTvas(value: Array<EtatDeclarationTvaVo>) {
        this.etatDeclarationTvaService.etatDeclarationTvas = value;
       }
       get createEtatDeclarationTvaDialog(): boolean {
           return this.etatDeclarationTvaService.createEtatDeclarationTvaDialog;
       }
      set createEtatDeclarationTvaDialog(value: boolean) {
        this.etatDeclarationTvaService.createEtatDeclarationTvaDialog= value;
       }
       get selectedSociete(): SocieteVo {
           return this.societeService.selectedSociete;
       }
      set selectedSociete(value: SocieteVo) {
        this.societeService.selectedSociete = value;
       }
       get societes(): Array<SocieteVo> {
           return this.societeService.societes;
       }
       set societes(value: Array<SocieteVo>) {
        this.societeService.societes = value;
       }
       get createSocieteDialog(): boolean {
           return this.societeService.createSocieteDialog;
       }
      set createSocieteDialog(value: boolean) {
        this.societeService.createSocieteDialog= value;
       }
       get selectedPaiementDeclarationTva(): PaiementDeclarationTvaVo {
           return this.paiementDeclarationTvaService.selectedPaiementDeclarationTva;
       }
      set selectedPaiementDeclarationTva(value: PaiementDeclarationTvaVo) {
        this.paiementDeclarationTvaService.selectedPaiementDeclarationTva = value;
       }
       get paiementDeclarationTvas(): Array<PaiementDeclarationTvaVo> {
           return this.paiementDeclarationTvaService.paiementDeclarationTvas;
       }
       set paiementDeclarationTvas(value: Array<PaiementDeclarationTvaVo>) {
        this.paiementDeclarationTvaService.paiementDeclarationTvas = value;
       }
       get createPaiementDeclarationTvaDialog(): boolean {
           return this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog;
       }
      set createPaiementDeclarationTvaDialog(value: boolean) {
        this.paiementDeclarationTvaService.createPaiementDeclarationTvaDialog= value;
       }
       get selectedTypeDeclarationTva(): TypeDeclarationTvaVo {
           return this.typeDeclarationTvaService.selectedTypeDeclarationTva;
       }
      set selectedTypeDeclarationTva(value: TypeDeclarationTvaVo) {
        this.typeDeclarationTvaService.selectedTypeDeclarationTva = value;
       }
       get typeDeclarationTvas(): Array<TypeDeclarationTvaVo> {
           return this.typeDeclarationTvaService.typeDeclarationTvas;
       }
       set typeDeclarationTvas(value: Array<TypeDeclarationTvaVo>) {
        this.typeDeclarationTvaService.typeDeclarationTvas = value;
       }
       get createTypeDeclarationTvaDialog(): boolean {
           return this.typeDeclarationTvaService.createTypeDeclarationTvaDialog;
       }
      set createTypeDeclarationTvaDialog(value: boolean) {
        this.typeDeclarationTvaService.createTypeDeclarationTvaDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
