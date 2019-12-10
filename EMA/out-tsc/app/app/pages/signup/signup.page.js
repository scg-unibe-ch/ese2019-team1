import * as tslib_1 from "tslib";
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { UserHandler } from '../../services/user-handler';
let SignupPage = class SignupPage {
    constructor(toastController, navCtrl, authService, fs, formBuilder) {
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.fs = fs;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.signupForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            username: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])),
            repeatpassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
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
            toast.present();
        });
    }
    onSubmit(value) {
        this.submitted = true;
        if (this.signupForm.invalid) {
            return;
        }
        this.authService.registerUser({
            email: this.signupForm.get('email').value,
            username: this.signupForm.get('username').value,
            name: this.signupForm.get('name').value
        }, this.signupForm.get('password').value)
            .then(r => {
            console.log(r);
            this.navCtrl.navigateForward('/home/feed');
            this.presentToast('signed up successfuly', 1000);
        }, err => {
            this.presentToast('failed to sign up', 1000);
            console.log('Error:' + err);
        });
    }
};
SignupPage = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    Component({
        selector: 'app-sign-up',
        templateUrl: './signup.page.html',
        styleUrls: ['./signup.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ToastController,
        NavController,
        AuthenticateService,
        UserHandler,
        FormBuilder])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.page.js.map