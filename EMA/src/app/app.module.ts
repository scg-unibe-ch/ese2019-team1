import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticateService} from './services/authentication.service';

import {SignUpPageModule} from './pages/signup/signup.module';


import * as firebase from 'firebase';
import {environment} from '../../../Ionic4FirbaseEmailLogin/src/environments/environment';

firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SignUpPageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthenticateService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
