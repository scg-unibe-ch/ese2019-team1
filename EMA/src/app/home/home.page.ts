import {Component, OnInit} from '@angular/core';
import {ProfileHandlerService} from '../services/profile-handler.service';
import {UserHandler} from '../services/user-handler';
import {AuthenticateService} from '../services/authentication.service';
import {Router, Routes} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    isProvider: boolean;
    ppid: string;

    constructor(private profileHandler: ProfileHandlerService,
                private userHandler: UserHandler,
                private authService: AuthenticateService,
                private router: Router) {
        this.userHandler.readUser(this.authService.afAuth.auth.currentUser.uid).then(
            user => {
                this.isProvider = user.isProvider.valueOf();
                if (user.isProvider.valueOf()) {
                    this.ppid = user.ppid;
                }
            }
        );
    }

   async pushPage() {
        await this.router.navigate(['home/provider-profile/', this.ppid]);

    }

    ngOnInit() {

    }

}
