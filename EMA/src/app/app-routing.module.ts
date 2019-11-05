import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'basket', loadChildren: './pages/basket/basket.module#BasketPageModule',
    canActivate: [AuthGuardService]},  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'signupprovider', loadChildren: './pages/signupprovider/signupprovider.module#SignupproviderPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
