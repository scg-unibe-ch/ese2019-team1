import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProfileHandlerService } from '../services/profile-handler.service';
import { UserHandler } from '../services/user-handler';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
let HomePage = class HomePage {
    constructor(profileHandler, userHandler, authService, router) {
        this.profileHandler = profileHandler;
        this.userHandler = userHandler;
        this.authService = authService;
        this.router = router;
        this.userHandler.readUser(this.authService.afAuth.auth.currentUser.uid).then(user => {
            this.isProvider = user.isProvider.valueOf();
            if (user.isProvider.valueOf()) {
                this.ppid = user.ppid;
            }
        });
    }
    pushPage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.router.navigate(['home/provider-profile/', this.ppid]);
        });
    }
    ngOnInit() {
    }
};
HomePage = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.page.html',
        styleUrls: ['./home.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ProfileHandlerService,
        UserHandler,
        AuthenticateService,
        Router])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map