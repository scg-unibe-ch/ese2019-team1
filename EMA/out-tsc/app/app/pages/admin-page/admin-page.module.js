import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminPagePage } from './admin-page.page';
import { AdminComponent } from '../../components/admin/admin.component';
import { AdminViewComponent } from '../../components/admin-view/admin-view.component';
const routes = [
    {
        path: '',
        component: AdminPagePage
    }
];
let AdminPagePageModule = class AdminPagePageModule {
};
AdminPagePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
        ],
        exports: [AdminViewComponent, AdminComponent],
        declarations: [AdminPagePage, AdminComponent, AdminViewComponent]
    })
], AdminPagePageModule);
export { AdminPagePageModule };
//# sourceMappingURL=admin-page.module.js.map