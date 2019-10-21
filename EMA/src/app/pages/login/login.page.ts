import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private loginForm: FormGroup;
    private submitted = false;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private authService: AuthenticateService,
                private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
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
                console.log(res);
                this.navCtrl.navigateForward('/home/feed');
                this.presentToast('logged in successfuly', 2000);
            }, err => {
                this.presentToast('invalid email or password', 2000);
                console.log('Error:' + err);
            });
    }

}
