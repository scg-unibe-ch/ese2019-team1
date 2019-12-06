import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedPage } from './feed.page';
import {EventComponent} from '../../components/event/event.component';
import {EventViewComponent} from '../../components/event-view/event-view.component';
import {HintComponent} from '../../components/hint/hint.component';

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        EventViewComponent,
        EventComponent,
        HintComponent
    ],
    declarations: [FeedPage, EventComponent, EventViewComponent, HintComponent]
})
export class FeedPageModule {}
