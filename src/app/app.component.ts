import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';
    profile: any;

    constructor(public auth: AuthService, public router: Router) {
        this.auth.handleAuthentication();
    }

    ngOnInit() {

        if (localStorage.getItem('isLoggedIn') === 'true') {
            this.auth.renewSession(this.initApp.bind(this));
        } else {
            this.initApp();
        }

    }

    initApp() {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['dashboard']);
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
            })
        } else {
            this.router.navigate(['auth']);
        }
    }
}
