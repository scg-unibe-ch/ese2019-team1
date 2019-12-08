import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AdminGuardService } from '../services/admin-guard.service';
const routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'feed',
                loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedPageModule)
            },
            {
                path: 'notifications',
                loadChildren: () => import('../pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
            },
            {
                path: 'messages',
                loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesPageModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
            },
            {
                path: 'provider-profile/:ppid',
                loadChildren: () => import('../pages/provider-profile/provider-profile.module').then(m => m.ProviderProfilePageModule)
            },
            {
                path: 'admin-page',
                loadChildren: () => import('../pages/admin-page/admin-page.module').then(m => m.AdminPagePageModule),
                canActivate: [AdminGuardService]
            }
        ]
    }
];
let HomeRouter = class HomeRouter {
};
HomeRouter = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], HomeRouter);
export { HomeRouter };
//# sourceMappingURL=home.router.js.map