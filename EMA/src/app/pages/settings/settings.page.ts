import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonCheckbox, NavController, ToastController, IonContent} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserHandler} from '../../services/user-handler';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    private isAdmin: boolean;

    private headerBottom: number;

    private showHintsChecked: boolean;

    private settingsHintHidden = true;
    private logoutHintHidden = true;
    private providerAccountHintHidden = true;
    private hintHintHidden = true;

    @ViewChild(IonCheckbox, null) checkbox: IonCheckbox;

    @ViewChild('content', null) content: IonContent;

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

    private async setLogoutHintHidden(hidden: boolean) {
        this.logoutHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.logoutHintHidden) {
            const logout = document.getElementById('logout');
            const logoutHint = document.getElementById('logoutHint');
            this.headerBottom = document.getElementById('header').getBoundingClientRect().bottom;
            logout.style.zIndex = '95';

            await this.content.getScrollElement().then(res => {
                res.scrollTo(0, 0);
                res.scrollTo(0, logout.getBoundingClientRect().top - (3 * this.headerBottom / 2));
            });

            let top = logout.getBoundingClientRect().bottom;
            top = top + (logout.getBoundingClientRect().height / 10);
            logoutHint.style.top = top + 'px';
        } else {
            document.getElementById('logout').style.zIndex = 'auto';
        }

        if (this.logoutHintHidden) {
            await this.setProviderAccountHintHidden(false);
        }
    }

    private async setProviderAccountHintHidden(hidden: boolean) {
        this.providerAccountHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.providerAccountHintHidden) {
            const providerAccount = document.getElementById('createProviderAccount');
            const providerAccountHint = document.getElementById('providerAccountHint');
            this.headerBottom = document.getElementById('header').getBoundingClientRect().bottom;
            providerAccount.style.zIndex = '95';

            await this.content.getScrollElement().then(res => {
                res.scrollTo(0, 0);
                res.scrollTo(0, providerAccount.getBoundingClientRect().top - (3 * this.headerBottom / 2));
            });

            let top = providerAccount.getBoundingClientRect().bottom;
            top = top + (providerAccount.getBoundingClientRect().height / 10);
            providerAccountHint.style.top = top + 'px';
        } else {
            document.getElementById('createProviderAccount').style.zIndex = 'auto';
        }

        if (this.providerAccountHintHidden) {
            this.setHintHintHidden(false);
        }
    }

    private async setHintHintHidden(hidden: boolean) {
        this.hintHintHidden = hidden;

        this.hintHiddenChanged();

        if (!this.hintHintHidden) {
            const hintCheckbox = document.getElementById('hintCheckbox');
            const hintHint = document.getElementById('hintHint');
            hintCheckbox.style.zIndex = '95';
            const hintHeight = await hintHint.getBoundingClientRect().height;

            await this.content.getScrollElement().then(res => {
                res.scrollTo(0, 0);
                res.scrollTo(0, hintCheckbox.getBoundingClientRect().top - (3 * this.headerBottom / 2));
            });

            let top = hintCheckbox.getBoundingClientRect().top - hintHint.getBoundingClientRect().height;
            top = top - (hintCheckbox.getBoundingClientRect().height / 10);

            hintHint.style.top = top + 'px';
        } else {
            document.getElementById('hintCheckbox').style.zIndex = 'auto';

            await this.content.getScrollElement().then(res => {
                res.scrollTo(0, 0);
            });

            this.userHandler.readUser(this.auth.afAuth.auth.currentUser.uid).then(
                thisUser => {
                    this.userHandler.setShowHints(this.auth.afAuth.auth.currentUser.uid, false);
                    this.showHintsChecked = false;
                }
            );
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
