import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ProfileHandlerService } from '../../services/profile-handler.service';
import { Categories } from '../../services/profile';
import { UserHandler } from '../../services/user-handler';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
let SignupproviderPage = class SignupproviderPage {
    constructor(toastController, navCtrl, formBuilder, profileHandler, userHandler, authService, router) {
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.profileHandler = profileHandler;
        this.userHandler = userHandler;
        this.authService = authService;
        this.router = router;
        this.submitted = false;
        this.userHandler.readUser(this.authService.afAuth.auth.currentUser.uid).then(user => {
            this.user = user;
        });
        this.signupForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            service: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
    }
    ngOnInit() {
    }
    presentToast(msg, time) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: time
            });
            yield toast.present();
        });
    }
    onSubmit(value) {
        if (this.signupForm.invalid) {
            return;
        }
        this.submitted = true;
        const profileData = {
            category: Categories[value.service],
            companyName: value.name,
            companyEmail: value.email
        };
        this.profileHandler.createProfile(this.user, profileData).then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.presentToast('Profile created', 1000);
            yield this.router.navigate(['home/provider-profile/', res.toString()]);
        }), err => {
            this.presentToast(err, 1000);
        });
    }
};
SignupproviderPage = tslib_1.__decorate([
    Component({
        selector: 'app-signupprovider',
        templateUrl: './signupprovider.page.html',
        styleUrls: ['./signupprovider.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ToastController,
        NavController,
        FormBuilder,
        ProfileHandlerService,
        UserHandler,
        AuthenticateService,
        Router])
], SignupproviderPage);
export { SignupproviderPage };
//# sourceMappingURL=signupprovider.page.js.map