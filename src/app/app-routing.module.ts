import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { AuthGuard } from './controller/guards/auth.guard';
import { AccessDeniedComponent } from './auth/access-denied/access-denied.component';
import { HomeComponent } from './demo/view/home/home.component';
import {LoginChercheurComponent} from './module/chercheur/login-chercheur/login-chercheur.component';
import {RegisterChercheurComponent} from './module/chercheur/register-chercheur/register-chercheur.component';
import {LoginAdminComponent} from './module/admin/login-admin/login-admin.component';
import {RegisterAdminComponent} from './module/admin/register-admin/register-admin.component';
import {LoginComptableComponent} from './module/comptable/login-comptable/login-comptable.component';
import {RegisterComptableComponent} from './module/comptable/register-comptable/register-comptable.component';
import {LoginSocieteComponent} from './module/societe/login-societe/login-societe.component';
import {RegisterSocieteComponent} from './module/societe/register-societe/register-societe.component';
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
          { path: '', component: HomeComponent },
        {path: 'chercheur/login', component: LoginChercheurComponent },
        {path: 'chercheur/register', component: RegisterChercheurComponent },
        {path: 'admin/login', component: LoginAdminComponent },
        {path: 'admin/register', component: RegisterAdminComponent },
        {path: 'comptable/login', component: LoginComptableComponent },
        {path: 'comptable/register', component: RegisterComptableComponent },
        {path: 'societe/login', component: LoginSocieteComponent },
        {path: 'societe/register', component: RegisterSocieteComponent },
         {
          path: 'app', // '\'' + root + '\'',
          component: AppMainComponent,
          children: [
            {
              path: 'chercheur',
              loadChildren: () => import('./module/chercheur/chercheur-routing.module').then(m => m.ChercheurRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'admin',
              loadChildren: () => import('./module/admin/admin-routing.module').then(m => m.AdminRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'comptable',
              loadChildren: () => import('./module/comptable/comptable-routing.module').then(m => m.ComptableRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'societe',
              loadChildren: () => import('./module/societe/societe-routing.module').then(m => m.SocieteRoutingModule),
              canActivate: [AuthGuard],
            },
            { path: 'denied', component: AccessDeniedComponent },
          ],
          canActivate: [AuthGuard]
        },
      ],
      { scrollPositionRestoration: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
