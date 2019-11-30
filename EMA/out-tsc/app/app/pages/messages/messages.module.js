import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MessagesPage } from './messages.page';
import { AutosizeModule } from "ngx-autosize";
const routes = [
    {
        path: '',
        component: MessagesPage
    }
];
let MessagesPageModule = class MessagesPageModule {
};
MessagesPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            AutosizeModule
        ],
        declarations: [MessagesPage]
    })
], MessagesPageModule);
export { MessagesPageModule };
//# sourceMappingURL=messages.module.js.map