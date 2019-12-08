import {Component, OnInit, ViewChild } from '@angular/core';
import {EventViewComponent} from '../../components/event-view/event-view.component';
import {Events} from '@ionic/angular';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {UserHandler} from '../../services/user-handler';
import {AuthenticateService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

    private select;

    private welcomeHintHidden = true;
    private tabBarHintHidden = true;
    private filterHintHidden = true;
    private feedHintHidden = true;

    @ViewChild(EventViewComponent, null) eventView: EventViewComponent;

    constructor(private profileHandler: ProfileHandlerService,
                private userHandler: UserHandler,
                private authService: AuthenticateService,
                private router: Router,
                private events: Events) {
        const uid = this.authService.afAuth.auth.currentUser.uid;
        this.userHandler.readUser(uid).then(
            user => {
                if (user.showHints === undefined) {
                    this.userHandler.setShowHints(uid, true);
                }
                if (user.showHints) {
                    this.setWelcomeHintHidden(false);
                }
            }
        );
    }

    ngOnInit() {
           this.select = document.getElementById('select');
    }

    onFilterChanged(services) {
        if (services.length < 1) {
            this.eventView.selectService('');
        } else {
            this.eventView.selectService(services);
        }
    }

    private showingHint(): boolean {
        return !(this.welcomeHintHidden && this.filterHintHidden && this.tabBarHintHidden && this.feedHintHidden);
    }

    private setWelcomeHintHidden(hidden: boolean) {
        this.welcomeHintHidden = hidden;

        this.hintHiddenChanged();

        if (this.welcomeHintHidden) {
            this.setTabBarHintHidden(false);
        }
    }

    private setTabBarHintHidden(hidden: boolean) {
        this.tabBarHintHidden = hidden;

        this.hintHiddenChanged();

        if (this.tabBarHintHidden) {
            this.setFilterHintHidden(false);
        }
    }

    private setFilterHintHidden(hidden: boolean) {
        this.filterHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.filterHintHidden) {
            document.getElementById('filter').style.zIndex = '95';
        } else {
            document.getElementById('filter').style.zIndex = '5';
        }

        if (this.filterHintHidden) {
            this.setFeedHintHidden(false);
        }
    }

    private setFeedHintHidden(hidden: boolean) {
        this.feedHintHidden = hidden;

        this.hintHiddenChanged();

        /*this.userHandler.readUser(this.authService.afAuth.auth.currentUser.uid).then(
            thisUser => {
                this.userHandler.setShowHints(this.authService.afAuth.auth.currentUser.uid, false);
            }
        );*/
    }

    private hintHiddenChanged() {
        if (!this.showingHint()) {
            this.events.publish('hints-closed');
        } else if (!this.tabBarHintHidden) {
            this.events.publish('hints-closed');
        } else {
            this.events.publish('hints-opened');
        }
    }
}
