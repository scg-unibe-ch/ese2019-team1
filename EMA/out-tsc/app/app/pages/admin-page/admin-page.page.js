import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AdminViewComponent } from '../../components/admin-view/admin-view.component';
let AdminPagePage = class AdminPagePage {
    constructor() { }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    ViewChild(AdminViewComponent, null),
    tslib_1.__metadata("design:type", AdminViewComponent)
], AdminPagePage.prototype, "adminView", void 0);
AdminPagePage = tslib_1.__decorate([
    Component({
        selector: 'app-admin-page',
        templateUrl: './admin-page.page.html',
        styleUrls: ['./admin-page.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AdminPagePage);
export { AdminPagePage };
//# sourceMappingURL=admin-page.page.js.map