import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CatsComponent} from './cats/cats.component';
import {GraphQLModule} from "./graphql.module";
import {CallbackComponent} from './auth/callback/callback.component';
import {AuthService} from "./auth/auth.service";
import {RoutingModule} from "./routing.module";
import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
    imports: [
        BrowserModule,
        GraphQLModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        CatsComponent,
        CallbackComponent,
        DashboardComponent
    ],
    providers: [
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
