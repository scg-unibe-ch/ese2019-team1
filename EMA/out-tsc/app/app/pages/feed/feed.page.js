import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EventViewComponent } from '../../components/event-view/event-view.component';
let FeedPage = class FeedPage {
    constructor() {
    }
    ngOnInit() {
        this.select = document.getElementById('select');
    }
    onFilterChanged(services) {
        if (services.length < 1) {
            this.eventView.selectService('');
        }
        else {
            this.eventView.selectService(services);
        }
    }
};
tslib_1.__decorate([
    ViewChild(EventViewComponent, null),
    tslib_1.__metadata("design:type", EventViewComponent)
], FeedPage.prototype, "eventView", void 0);
FeedPage = tslib_1.__decorate([
    Component({
        selector: 'app-feed',
        templateUrl: './feed.page.html',
        styleUrls: ['./feed.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], FeedPage);
export { FeedPage };
//# sourceMappingURL=feed.page.js.map