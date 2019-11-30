import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
let SettingsPage = class SettingsPage {
    constructor(navCtrl, router, auth, toastCtrl) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.auth = auth;
        this.toastCtrl = toastCtrl;
        this.profile = { '': false };
        this.settings = { '': false };
        this.items = new Array(10);
    }
    changeState(card) {
        card[''] = card[''] !== true;
    }
    expanded(card) {
        return card[''] === true;
    }
    logout() {
        console.log('button clicked');
        this.auth.logoutUser();
        this.presentToast('Logged out', 1000);
        this.navCtrl.navigateBack('');
    }
    createProviderAccount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.navCtrl.navigateForward('signupprovider/');
        });
    }
    deleteAccount(del) {
        if (del) {
            console.log('got to settings.ts');
            this.auth.deleteUser();
        }
        else {
            return;
        }
    }
    presentToast(msg, time) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                message: msg,
                duration: time
            });
            yield toast.present();
        });
    }
    confirmDeleteAccount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                message: 'Are you sure want to delete your Account?',
                position: 'bottom',
                buttons: [
                    {
                        side: 'end',
                        icon: 'checkmark',
                        handler: () => {
                            this.deleteAccount(true);
                        }
                    },
                    {
                        side: 'end',
                        icon: 'close',
                        handler: () => {
                            this.deleteAccount(false);
                        }
                    }
                ]
            });
            yield toast.present();
        });
    }
};
SettingsPage = tslib_1.__decorate([
    Component({
        selector: 'app-settings',
        templateUrl: './settings.page.html',
        styleUrls: ['./settings.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [NavController,
        Router,
        AuthenticateService,
        ToastController])
], SettingsPage);
export { SettingsPage };
//# sourceMappingURL=settings.page.js.map