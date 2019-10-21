import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'basket', loadChildren: './pages/basket/basket.module#BasketPageModule' },  { path: 'signup-provider', loadChildren: './pages/signup-provider/signup-provider.module#SignupProviderPageModule' },
  { path: 'signup-provider', loadChildren: './pages/signup-provider/signup-provider.module#SignupProviderPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
