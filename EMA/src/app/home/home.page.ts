import {Component, OnInit} from '@angular/core';
import {ProfileHandlerService} from '../services/profile-handler.service';
import {UserHandler} from '../services/user-handler';
import {AuthenticateService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    isProvider: boolean;
    ppid: string;

    private tabBarOverlayHidden = true;

    constructor(private profileHandler: ProfileHandlerService,
                private userHandler: UserHandler,
                private authService: AuthenticateService,
                private router: Router,
                private events: Events) {
        this.userHandler.readUser(this.authService.afAuth.auth.currentUser.uid).then(
            user => {
                this.isProvider = user.isProvider.valueOf();
                if (user.isProvider.valueOf()) {
                    this.ppid = user.ppid;
                }
            }
        );

        events.subscribe('hints-closed', () => {
            this.tabBarOverlayHidden = true;
        });
        events.subscribe('hints-opened', () => {
            this.tabBarOverlayHidden = false;
        });
    }

   async pushPage() {
        await this.router.navigate(['home/provider-profile/', this.ppid]);

    }

    ngOnInit() {

    }
}
