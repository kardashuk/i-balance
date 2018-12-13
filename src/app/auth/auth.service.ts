import {Injectable} from '@angular/core';
import {AUTH_CONFIG} from './auth0.variables';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    private _idToken: string;
    private _accessToken: string;
    private _expiresAt: number;
    userProfile: any;


    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: AUTH_CONFIG.callbackURL,
        scope: 'openid profile client_metadata'
    });

    constructor(public router: Router) {
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.router.navigateByUrl('/');
            } else if (err) {
                this.router.navigate(['']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    private setSession(authResult): void {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken;
        this._expiresAt = expiresAt;
    }

    public renewSession(cb): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
                this.logout();
            }
            if (cb) {
                cb()
            }
        });
    }

    public getProfile(cb): void {
        if (!this._accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(this._accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    public logout(): void {
        // Remove tokens and expiry time
        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        // Go back to the home route
        this.router.navigateByUrl('/auth');
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return new Date().getTime() < this._expiresAt;
    }


}