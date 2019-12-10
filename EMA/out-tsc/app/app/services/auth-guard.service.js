import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthenticateService } from './authentication.service';
let AuthGuardService = class AuthGuardService {
    constructor(AuthService) {
        this.AuthService = AuthService;
    }
    canActivate(next, state) {
        return this.AuthService.isAuthenticated.pipe();
    }
};
AuthGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticateService])
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map