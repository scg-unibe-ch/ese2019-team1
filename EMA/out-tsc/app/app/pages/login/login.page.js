import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
let LoginPage = class LoginPage {
    constructor(toastController, navCtrl, authService, formBuilder) {
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required
            ])),
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
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.loginUser(value)
            .then(res => {
            this.navCtrl.navigateForward('/home/feed').then(result => {
                this.presentToast('logged in successfuly', 1000);
            });
        }, error => {
            console.log('Error:' + error);
            this.presentToast('no user with these credentials', 1000);
        });
    }
};
LoginPage = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ToastController,
        NavController,
        AuthenticateService,
        FormBuilder])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map