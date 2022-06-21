
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginSocieteComponent } from './login-societe/login-societe.component';
import { RegisterSocieteComponent } from './register-societe/register-societe.component';
import {DashboardAdminComponent} from '../admin/view/impot/dashboard-admin/dashboard-admin.component';
import {DashboardSocieteComponent} from './view/impot/dashboard-Societe/dashboard-societe.component';

@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterSocieteComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },

                        {
                            path:'',
                            component: DashboardSocieteComponent ,
                            canActivate: [AuthGuard]
                        },


                        {

                            path: 'impot',
                            loadChildren: () => import('./view/impot/impot-societe-routing.module').then(m => m.ImpotSocieteRoutingModule),
                            canActivate: [AuthGuard],
                        },
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class SocieteRoutingModule { }
