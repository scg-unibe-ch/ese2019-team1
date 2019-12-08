import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index.page';
import { IndexRouter } from './index.router';
let IndexPageModule = class IndexPageModule {
};
IndexPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            IndexRouter
        ],
        declarations: [IndexPage]
    })
], IndexPageModule);
export { IndexPageModule };
//# sourceMappingURL=index.module.js.map