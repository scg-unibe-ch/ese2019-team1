import {Component, Injectable, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {FirestoreCRUDService} from '../../services/firestore-crud.service';

@Injectable({
    providedIn: 'root'
})
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
                private authService: AuthenticateService,
                private fs: FirestoreCRUDService) {
    }

    ngOnInit() {
    }

    async presentToast(msg: string, time: number) {
        const toast = await this.toastController.create({
            message: msg,
            duration: time
        });
        await toast.present();
    }

    onSubmit(value) {
        this.submitted = true;
        this.authService.registerUser({email: this.email, password: this.password})
            .then(async res => {
                console.log(res);
                this.fs.addUser({uid: res.user.uid, username: this.username, email: this.email,
                }).then(r => console.log(r));
                this.navCtrl.navigateForward('/home');
                this.presentToast('signed in successfully', 2000);
            }, err => {
                console.log('Error:' + err);
            });
    }
}
