import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonCheckbox, NavController, ToastController, IonContent, AlertController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserHandler} from '../../services/user-handler';
import {User} from '../../services/user';

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
    private user: User;

    @ViewChild(IonCheckbox, null) checkbox: IonCheckbox;

    @ViewChild('content', null) content: IonContent;

    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController,
                private router: Router,
                private auth: AuthenticateService,
                private toastCtrl: ToastController,
                private userHandler: UserHandler,
                private events: Events) {
        const uid = this.auth.afAuth.auth.currentUser.uid;
        this.userHandler.readUser(uid).then(
            user => {
                this.user = user;
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

    async changeEmail() {
        const alert = await this.alertCtrl.create({
            header: 'change Email',
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Your new email'
                }
            ],
            buttons: [
                {
                    text: 'cancel',
                    role: 'cancel'
                },
                {
                    text: 'change',
                    handler: async data => {
                        await this.auth.changeEmail(data.email).then(
                            () => {
                                this.user.email = data.email;
                                this.userHandler.updateUser(this.user).then(
                                    () => this.presentToast('Email successfully changed', 1000),
                                    err => this.presentToast('something went wrong, try again later', 1000)
                                );
                            }
                        );
                    }
                }
            ]
        });
        alert.present();
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

    /**
     * Presents a toast using {@link ToastController} displaying the
     * msg for the given time}.
     *
     * @param msg Message displayed on screen
     * @param time Duration of the toast
     */
    private async presentToast(msg, time) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: time
        });
        await toast.present();
    }

    /**
     * Presents a toast using {@link ToastController}, which asks the user
     * if he wants to delete the Account or not.
     */
    private async confirmDeleteAccount() {
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


    /**
     * @return true if a hint is currently displayed.
     */
    private showingHint(): boolean {
        return !(this.settingsHintHidden && this.providerAccountHintHidden && this.logoutHintHidden && this.hintHintHidden);
    }


    /**
     * Sets the {@link settingsHintHidden} value to the parameter hidden.
     * If hidden is 'true', the {@link setLogoutHintHidden} gets called with the
     * argument 'false' to display the next hint.
     *
     * @param hidden value to be assigned to {@link settingsHintHidden}
     */
    private setSettingsHintHidden(hidden: boolean) {
        this.settingsHintHidden = hidden;

        this.hintHiddenChanged();

        if (this.settingsHintHidden) {
            this.setLogoutHintHidden(false);
        }
    }

    /**
     * Sets the {@link logoutHintHidden} value to the parameter hidden.
     * If hidden is 'false', the Hint element gets positioned correctly
     * and the Logout Buttons zIndex is set to '95' making it visible.
     * Else the Logout Buttons zIndex is reset and the {@link setProviderAccountHintHidden}
     * is called to display the next hint.
     *
     * @param hidden value to be assigned to {@link logoutHintHidden}
     */
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
            this.setProviderAccountHintHidden(false);
        }
    }

    /**
     * Sets the {@link providerAccountHintHidden} value to the parameter hidden.
     * If hidden is 'false', the Hint element gets positioned correctly
     * and the create-Provider-Account-Buttons zIndex is set to '95' making it visible.
     * Else the create-Provider-Account-Buttons zIndex is reset and the
     * {@link setHintHintHidden} is called to display the next hint.
     *
     * @param hidden value to be assigned to {@link providerAccountHintHidden}
     */
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
            this.setHintHintHidden(false);
        }
    }

    /**
     * Sets the {@link hintHintHidden} value to the parameter hidden.
     * If hidden is 'false', the Hint element gets positioned correctly.
     * Else the showHints checkbox gets unchecked and the database value
     * 'showHints' of the user is set to false.
     *
     * @param hidden value to be assigned to {@link hintHintHidden}
     */
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

    /**
     * Publishes a event, to let the Homepage know if the tab bar needs to be darkened
     * due to a hint show on screen.
     */
    private hintHiddenChanged() {
        if (!this.showingHint()) {
            this.events.publish('hints-closed');
        } else {
            this.events.publish('hints-opened');
        }
    }

    /**
     * Sets the 'showHints' value of to user in the database to the value of the checkbox,
     * using the setShowHints method of the {@link UserHandler}.
     *
     * @param e ion-checkbox element
     */
    private showHintsChanged(e) {
        if (this.showHintsChecked !== e.currentTarget.checked) {
            this.showHintsChecked = e.currentTarget.checked;
            this.userHandler.setShowHints(this.auth.afAuth.auth.currentUser.uid, this.showHintsChecked);
        }
    }
}
