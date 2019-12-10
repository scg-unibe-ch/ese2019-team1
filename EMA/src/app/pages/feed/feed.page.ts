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

    select;

    welcomeHintHidden = true;
    tabBarHintHidden = true;
    filterHintHidden = true;
    feedHintHidden = true;

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

    showingHint(): boolean {
        return !(this.welcomeHintHidden && this.filterHintHidden && this.tabBarHintHidden && this.feedHintHidden);
    }

    setWelcomeHintHidden(hidden: boolean) {
        this.welcomeHintHidden = hidden;

        this.hintHiddenChanged();

        if (this.welcomeHintHidden) {
            this.setTabBarHintHidden(false);
        }
    }

    setTabBarHintHidden(hidden: boolean) {
        this.tabBarHintHidden = hidden;

        this.hintHiddenChanged();

        if (this.tabBarHintHidden) {
            this.setFilterHintHidden(false);
        }
    }

    setFilterHintHidden(hidden: boolean) {
        this.filterHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.filterHintHidden) {
            const filter = document.getElementById('filter');
            filter.style.zIndex = '95';
            let top = filter.getBoundingClientRect().bottom;
            top = top + (filter.getBoundingClientRect().height / 10);
            document.getElementById('filterHint').style.top = top + 'px';
        } else {
            document.getElementById('filter').style.zIndex = '5';
        }

        if (this.filterHintHidden) {
            this.setFeedHintHidden(false);
        }
    }

    setFeedHintHidden(hidden: boolean) {
        this.feedHintHidden = hidden;

        this.hintHiddenChanged();
    }

    hintHiddenChanged() {
        if (!this.showingHint()) {
            this.events.publish('hints-closed');
        } else if (!this.tabBarHintHidden) {
            this.events.publish('hints-closed');
        } else {
            this.events.publish('hints-opened');
        }
    }
}
