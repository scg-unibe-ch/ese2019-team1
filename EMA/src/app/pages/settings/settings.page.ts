import {Component, Injectable, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

    private profile = {'': false};
    private settings = {'': false};

    constructor(private navCtrl: NavController,
                private auth: AuthenticateService,
                private toastCtrl: ToastController,
    ) {
    }

    private items = new Array(10);


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
        this.navCtrl.navigateBack('/login');
    }

    createProviderAccount() {

    }

    deleteAccountClicked() {
        this.presentToastWithOptions('Are you sure want to delete your Account?');
    }

    private deleteAccount(del) {
        if (del) {
            console.log('got to settings.ts');
            this.auth.deleteUser();
        } else {
            return;
        }
    }

    async presentToast(msg, time) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: time
        });
        await toast.present();
    }

    async presentToastWithOptions(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
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
        await toast.present();
    }


}
