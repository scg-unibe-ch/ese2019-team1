import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let EventComponent = class EventComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    getService() {
        return this.event.service;
    }
    navigateTo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.router.navigate(['home/provider-profile/', this.event.ppid.toString()]);
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EventComponent.prototype, "event", void 0);
EventComponent = tslib_1.__decorate([
    Component({
        selector: 'app-event',
        templateUrl: './event.component.html',
        styleUrls: ['./event.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], EventComponent);
export { EventComponent };
//# sourceMappingURL=event.component.js.map