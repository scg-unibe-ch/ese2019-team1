import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthenticateService } from './authentication.service';
import { UserHandler } from './user-handler';
import { ProfileHandlerService } from './profile-handler.service';
let ProfileGuardService = class ProfileGuardService {
    constructor(authService, userHandler, profileHandler) {
        this.authService = authService;
        this.userHandler = userHandler;
        this.profileHandler = profileHandler;
    }
    isProfileOwner(uid, ppid) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.userHandler.readUser(uid).then(user => {
                if (user.isProvider.valueOf() && user.ppid === ppid) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }, err => reject(false));
        }));
    }
    getProfile(uid) {
        return new Promise((resolve, reject) => {
            let profile;
            this.userHandler.readUser(uid).then(user => {
                if (!user.isProvider) {
                    reject();
                }
                else {
                    this.profileHandler.readProfile(user.ppid).then(providerProfile => {
                        profile = providerProfile;
                    }, err => reject(err));
                }
            });
            if (profile != null) {
                resolve(profile);
            }
            else {
                reject();
            }
        });
    }
};
ProfileGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticateService,
        UserHandler,
        ProfileHandlerService])
], ProfileGuardService);
export { ProfileGuardService };
//# sourceMappingURL=profile-guard.service.js.map