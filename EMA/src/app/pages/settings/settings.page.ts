import {Component, ViewChild} from '@angular/core';
import {IonCheckbox, NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../services/user';
import {UserHandler} from '../../services/user-handler';



@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

    private isAdmin: boolean;

    private showHints: boolean;

    constructor(private navCtrl: NavController,
                private router: Router,
                private auth: AuthenticateService,
                private toastCtrl: ToastController,
                private userHandler: UserHandler) {
        const uid = this.auth.afAuth.auth.currentUser.uid;
        this.userHandler.readUser(uid).then(
            usr => this.isAdmin = usr.isAdmin,
            usr => this.showHints = usr.showHints
        );
    }

    logout() {
        console.log('button clicked');
        this.auth.logoutUser();
        this.presentToast('Logged out', 1000);
        this.navCtrl.navigateBack('');
    }

    async createProviderAccount() {
        await this.navCtrl.navigateForward('signupprovider/');
    }

    private deleteAccount(del) {
        if (del) {
            console.log('got to settings.ts');
            this.auth.deleteUser();
        } else {
            return;
        }
    }

    async adminPage() {
        await this.navCtrl.navigateForward('home/admin-page');
    }

    async presentToast(msg, time) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: time
        });
        await toast.present();
    }

    async confirmDeleteAccount() {
        const toast = await this.toastCtrl.create({
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
        await toast.present();
    }

    private showHintsChanged() {
        this.showHints = this.showHints === true ? false : true;
        this.userHandler.setShowHints(this.auth.afAuth.auth.currentUser.uid, this.showHints);
    }
}
