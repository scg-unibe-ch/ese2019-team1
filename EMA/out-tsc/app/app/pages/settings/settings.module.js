import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { AuthenticateService } from '../../services/authentication.service';
const routes = [
    {
        path: '',
        component: SettingsPage,
        children: [
            {
                path: 'signupprovider'
            }
        ]
    }
];
let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [SettingsPage],
        providers: [AuthenticateService]
    })
], SettingsPageModule);
export { SettingsPageModule };
//# sourceMappingURL=settings.module.js.map