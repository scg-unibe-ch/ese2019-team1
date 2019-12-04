import {Component, OnInit, ViewChild} from '@angular/core';
import {EventViewComponent} from '../../components/event-view/event-view.component';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

    private select;

    private tabBarHintHidden = false;
    private filterHintHidden = true;

    @ViewChild(EventViewComponent, null) eventView: EventViewComponent;

    constructor() {
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

    private setTabBarHintHidden(hidden: boolean) {
        this.tabBarHintHidden = hidden;

        if (this.tabBarHintHidden) {
            this.setFilterHintHidden(false);
        }
    }

    private setFilterHintHidden(hidden: boolean) {
        this.filterHintHidden = hidden;

        if (!this.filterHintHidden) {
            document.getElementById('filter').style.zIndex = '95';
        } else {
            document.getElementById('filter').style.zIndex = 'initial';
        }
    }
}
