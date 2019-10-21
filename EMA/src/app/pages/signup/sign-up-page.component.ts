import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPage implements OnInit {

    private submitted = false;
    name: string;
    username: string;
    email: string;
    password: string;
    repeatpassword: string;


    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private authService: AuthenticateService) {
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

        this.authService.registerUser({email: this.email, password: this.password})
            .then(res => {
                console.log(res);
                this.navCtrl.navigateForward('/home');
                this.presentToast('signed in successfully', 2000);
            }, err => {
                console.log('Error:' + err);
            });
    }
}
