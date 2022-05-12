
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginComptableComponent } from './login-comptable/login-comptable.component';
import { RegisterComptableComponent } from './register-comptable/register-comptable.component';

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
                                    component: LoginComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterComptableComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {

                            path: 'impot',
                            loadChildren: () => import('./view/impot/impot-comptable-routing.module').then(m => m.ImpotComptableRoutingModule),
                            canActivate: [AuthGuard],
                        },
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ComptableRoutingModule { }
