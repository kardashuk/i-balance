interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'YZbAwDRPb6Hz6071BRn0YiS5EpqSi6Oj',
    domain: 'i-balance.eu.auth0.com',
    callbackURL: 'http://localhost:4200/auth'
};