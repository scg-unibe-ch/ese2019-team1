import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    submitted = false;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private authService: AuthenticateService,
                private formBuilder: FormBuilder,
                private alertCtrl: AlertController) {
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

    async presentToast(msg: string, time: number) {
        const toast = await this.toastController.create({
            message: msg,
            duration: time
        });
        toast.present();
    }

    onSubmit(value) {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.loginUser(value)
            .then(res => {
                this.navCtrl.navigateForward('/home/feed').then( result => {
                    this.presentToast('logged in successfuly', 1000);
                });
            }, error => {
                console.log('Error:' + error);
                this.presentToast('no user with these credentials', 1000);
            });
    }
    async presentPasswordResetPopUp() {
        const alert = await this.alertCtrl.create({
            header: 'reset password',
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Your Email'
                }
            ],
            buttons: [
                {
                    text: 'cancel',
                    role: 'cancel'
                },
                {
                    text: 'reset password',
                    handler: async data => {
                        await this.authService.resetPassword(data.email).then(
                            async res => (await this.presentToast('password reset, check Email', 1000)),
                            async err => (await this.presentToast('Error, no user with this E-mail', 1000))
                        );
                    }
                }
            ]
        });
        alert.present();
    }

}
