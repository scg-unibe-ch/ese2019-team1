import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HomePage} from './home.page';
import {HomeRouter} from './home.router';
import {FeedPageModule} from '../pages/feed/feed.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeRouter,
        FeedPageModule,
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
