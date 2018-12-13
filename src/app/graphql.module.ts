import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {JwtModule} from '@auth0/angular-jwt';

const uri = 'graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
    return {
        link: httpLink.create({uri}),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    imports: [
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('access_token');
                },
                whitelistedDomains: ['i-balance.eu.auth0.com', 'localhost:4200'],
            }
        })],
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
