import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticateService} from './services/authentication.service';
import {UserHandler} from './services/user-handler';

import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ImageHandlerService} from './services/image-handler.service';
import {ProfileHandlerService} from './services/profile-handler.service';
import {ProviderProfilePageModule} from './pages/provider-profile/provider-profile.module';
import {WelcomePageModule} from './pages/welcome/welcome.module';
import {LoginPageModule} from './pages/login/login.module';
import {AdminPagePageModule} from './pages/admin-page/admin-page.module';

@NgModule({
    declarations:
        [
            AppComponent
        ],
    entryComponents: [],
    imports: [
        WelcomePageModule,
        ProviderProfilePageModule,
        AdminPagePageModule,
        LoginPageModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthenticateService,
        UserHandler,
        ImageHandlerService,
        ProfileHandlerService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
