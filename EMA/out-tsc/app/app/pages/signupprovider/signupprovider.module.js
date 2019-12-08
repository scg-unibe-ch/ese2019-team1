import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SignupproviderPage } from './signupprovider.page';
const routes = [
    {
        path: '',
        component: SignupproviderPage
    }
];
let SignupproviderPageModule = class SignupproviderPageModule {
};
SignupproviderPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule
        ],
        declarations: [SignupproviderPage]
    })
], SignupproviderPageModule);
export { SignupproviderPageModule };
//# sourceMappingURL=signupprovider.module.js.map