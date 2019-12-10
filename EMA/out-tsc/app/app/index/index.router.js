import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexPage } from './index.page';
const routes = [
    {
        path: '',
        component: IndexPage,
        children: [
            {
                path: '',
                loadChildren: () => import('../pages/welcome/welcome.module').then(m => m.WelcomePageModule)
            },
            {
                path: 'login',
                loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
            },
            {
                path: 'signup',
                loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupPageModule)
            }
        ]
    }
];
let IndexRouter = class IndexRouter {
};
IndexRouter = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], IndexRouter);
export { IndexRouter };
//# sourceMappingURL=index.router.js.map