import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { ProviderProfilePage } from './pages/provider-profile/provider-profile.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { LoginPage } from './pages/login/login.page';
import { AdminGuardService } from './services/admin-guard.service';
export const routes = [
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
        canActivate: [AuthGuardService, AdminGuardService]
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map