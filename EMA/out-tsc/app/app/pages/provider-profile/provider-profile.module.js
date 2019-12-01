import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProviderProfilePage } from './provider-profile.page';
const routes = [
    {
        path: '',
        component: ProviderProfilePage
    }
];
let ProviderProfilePageModule = class ProviderProfilePageModule {
};
ProviderProfilePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ProviderProfilePage]
    })
], ProviderProfilePageModule);
export { ProviderProfilePageModule };
//# sourceMappingURL=provider-profile.module.js.map