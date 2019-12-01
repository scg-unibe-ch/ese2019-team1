import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileHandlerService } from '../../services/profile-handler.service';
let AdminComponent = class AdminComponent {
    constructor(router, profileHandler) {
        this.router = router;
        this.profileHandler = profileHandler;
    }
    ngOnInit() {
        this.ppid = this.admin.ppid;
    }
    approveProfile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.profileHandler.approveProfile(this.ppid);
        });
    }
    deleteProfile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.profileHandler.deleteProfile(this.ppid);
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AdminComponent.prototype, "admin", void 0);
AdminComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ProfileHandlerService])
], AdminComponent);
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map