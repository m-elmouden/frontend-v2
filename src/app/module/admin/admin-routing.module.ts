// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';

import {LoginAdminComponent} from './login-admin/login-admin.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {DashboardAdminComponent} from './view/impot/dashboard-admin/dashboard-admin.component';

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
                                    component: LoginAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {
                            path: '',
                            component: DashboardAdminComponent ,
                            canActivate: [AuthGuard]
                        },

                        {

                            path: 'impot',
                            loadChildren: () => import('./view/impot/impot-admin-routing.module').then(m => m.ImpotAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
