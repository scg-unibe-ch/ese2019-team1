import {Component, OnInit, ViewChild} from '@angular/core';
import {EventViewComponent} from '../../components/event-view/event-view.component';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

    private select;


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
}
