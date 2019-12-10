import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WelcomePage } from './welcome.page';
const routes = [
    {
        path: '',
        component: WelcomePage
    }
];
let WelcomePageModule = class WelcomePageModule {
};
WelcomePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [WelcomePage]
    })
], WelcomePageModule);
export { WelcomePageModule };
//# sourceMappingURL=welcome.module.js.map