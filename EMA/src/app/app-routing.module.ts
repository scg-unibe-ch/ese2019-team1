import {NgModule} from '@angular/core';
import {PreloadAllModules, Route, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {IndexPage} from './index/index.page';

export const routes: Route[] = [
    {
        path: '',

        component: IndexPage,
        children: [

            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
                canActivate: [AuthGuardService]
            },
            {
                path: 'basket',
                loadChildren: () => import('./pages/basket/basket.module').then(m => m.BasketPageModule),
                canActivate: [AuthGuardService]
            },
            {
                path: 'signup',
                loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
            },
            {
                path: 'signupprovider',
                loadChildren: () => import('./pages/signupprovider/signupprovider.module').then(m => m.SignupproviderPageModule)
            },

            {
                path: 'provider-profile',
                loadChildren: () => import('./pages/provider-profile/provider-profile.module').then(m => m.ProviderProfilePageModule)
            }

        ],
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
