import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CatsComponent} from './cats/cats.component';
import {GraphQLModule} from "./graphql.module";


@NgModule({
    declarations: [
        AppComponent,
        CatsComponent
    ],
    imports: [
        BrowserModule,
        GraphQLModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
