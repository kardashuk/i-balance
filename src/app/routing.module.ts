import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent} from "./auth/callback/callback.component";
import {CatsComponent} from "./cats/cats.component";
import {AuthGuard} from "./auth/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        component: CallbackComponent,
        canActivate: [AuthGuard],
        data: {
            unauthorized: true
        }
    },
    {
        path: 'cats',
        component: CatsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class RoutingModule {
}
