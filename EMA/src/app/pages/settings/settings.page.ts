import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonCheckbox, NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserHandler} from '../../services/user-handler';



@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit{

    private isAdmin: boolean;

    private showHintsChecked: boolean;

    private settingsHintHidden = true;
    private logoutHintHidden = true;
    private providerAccountHintHidden = true;
    private hintHintHidden = true;

    @ViewChild(IonCheckbox, null) checkbox: IonCheckbox;

    constructor(private navCtrl: NavController,
                private router: Router,
                private auth: AuthenticateService,
                private toastCtrl: ToastController,
                private userHandler: UserHandler,
                private events: Events) {
        const uid = this.auth.afAuth.auth.currentUser.uid;
        this.userHandler.readUser(uid).then(
            user => {
                this.isAdmin = user.isAdmin;
                this.checkbox.checked = user.showHints;
                this.showHintsChecked = user.showHints;
                if (user.showHints) {
                    this.setSettingsHintHidden(false);
                }
            }
        );
    }

    ngOnInit() {
    }

    logout() {
        console.log('button clicked');
        this.auth.logoutUser();
        this.presentToast('Logged out', 1000);
        this.navCtrl.navigateBack('');
    }

    private changeEmail() {

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
        await this.navCtrl.navigateForward('admin-page');
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



    private showingHint(): boolean {
        return !(this.settingsHintHidden && this.providerAccountHintHidden && this.logoutHintHidden && this.hintHintHidden);
    }

    private setSettingsHintHidden(hidden: boolean) {
        this.settingsHintHidden = hidden;

        this.hintHiddenChanged();

        if (this.settingsHintHidden) {
            this.setLogoutHintHidden(false);
        }
    }

    private setLogoutHintHidden(hidden: boolean) {
        this.logoutHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.logoutHintHidden) {
            document.getElementById('logout').style.zIndex = '95';
        } else {
            document.getElementById('logout').style.zIndex = 'auto';
        }

        if (this.logoutHintHidden) {
            this.setProviderAccountHintHidden(false);
        }
    }

    private setProviderAccountHintHidden(hidden: boolean) {
        this.providerAccountHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.providerAccountHintHidden) {
            document.getElementById('createProviderAccount').style.zIndex = '95';
        } else {
            document.getElementById('createProviderAccount').style.zIndex = 'auto';
        }

        if (this.providerAccountHintHidden) {
            this.setHintHintHidden(false);
        }
    }

    private setHintHintHidden(hidden: boolean) {
        this.hintHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.hintHintHidden) {
            document.getElementById('hintCheckbox').style.zIndex = '95';
        } else {
            document.getElementById('hintCheckbox').style.zIndex = 'auto';
        }
    }

    private hintHiddenChanged() {
        if (!this.showingHint()) {
            this.events.publish('hints-closed');
        } else {
            this.events.publish('hints-opened');
        }
    }

    private showHintsChanged(e) {
        if (this.showHintsChecked !== e.currentTarget.checked) {
            this.showHintsChecked = e.currentTarget.checked;
            this.userHandler.setShowHints(this.auth.afAuth.auth.currentUser.uid, this.showHintsChecked);
        }
    }
}
