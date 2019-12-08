import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FeedPage } from './feed.page';
import { EventComponent } from '../../components/event/event.component';
import { EventViewComponent } from '../../components/event-view/event-view.component';
const routes = [
    {
        path: '',
        component: FeedPage
    }
];
let FeedPageModule = class FeedPageModule {
};
FeedPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        exports: [
            EventViewComponent,
            EventComponent
        ],
        declarations: [FeedPage, EventComponent, EventViewComponent]
    })
], FeedPageModule);
export { FeedPageModule };
//# sourceMappingURL=feed.module.js.map