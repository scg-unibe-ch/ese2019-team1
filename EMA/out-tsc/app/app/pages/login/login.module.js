import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { AuthenticateService } from '../../services/authentication.service';
const routes = [
    {
        path: '',
        component: LoginPage
    }
];
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        declarations: [LoginPage],
        providers: [AuthenticateService]
    })
], LoginPageModule);
export { LoginPageModule };
//# sourceMappingURL=login.module.js.map