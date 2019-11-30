import {NgModule} from '@angular/core';
import {PreloadAllModules, Route, RouterModule} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {ProviderProfilePage} from './pages/provider-profile/provider-profile.page';
import {WelcomePage} from './pages/welcome/welcome.page';
import {LoginPage} from './pages/login/login.page';

export const routes: Route[] = [
    {
        path: '',

        component: WelcomePage,
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'feed',
        loadChildren: () => import('./pages/feed/feed.module').then(m => m.FeedPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
    },
    {
        path: 'signupprovider/',
        loadChildren: () => import('./pages/signupprovider/signupprovider.module').then(m => m.SignupproviderPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'home/provider-profile/:ppid',
        component: ProviderProfilePage,
        canActivate: [AuthGuardService]
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'admin-page',
        loadChildren: () => import('./pages/admin-page/admin-page.module').then(m => m.AdminPagePageModule),
    },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
