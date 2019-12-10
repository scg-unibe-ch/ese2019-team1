import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserHandler } from './user-handler';
import { AuthenticateService } from './authentication.service';
let AdminGuardService = class AdminGuardService {
    constructor(userHandler, authService) {
        this.userHandler = userHandler;
        this.authService = authService;
    }
    canActivate(route, state) {
        return new Promise((resolve) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uid = this.authService.afAuth.auth.currentUser.uid;
            yield this.userHandler.readUser(uid).then(usr => {
                resolve(usr.isAdmin === true);
            });
        }));
    }
};
AdminGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [UserHandler,
        AuthenticateService])
], AdminGuardService);
export { AdminGuardService };
//# sourceMappingURL=admin-guard.service.js.map