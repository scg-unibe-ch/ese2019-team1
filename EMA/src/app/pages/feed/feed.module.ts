import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedPage } from './feed.page';
import {EventComponent} from '../../components/event/event.component';
import {EventViewComponent} from '../../components/event-view/event-view.component';

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
  declarations: [FeedPage, EventComponent, EventViewComponent]
})
export class FeedPageModule {}
