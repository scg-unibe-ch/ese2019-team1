import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {UserHandler} from '../../services/user-handler';

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-sign-up',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    private signupForm: FormGroup;
    private submitted = false;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private authService: AuthenticateService,
                private fs: UserHandler,
                private formBuilder: FormBuilder) {
        this.signupForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            username: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])),
            repeatpassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ]))
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

        if (this.signupForm.invalid) {
            return;
        }

        this.authService.registerUser({
            email: this.signupForm.get('email').value,
            username: this.signupForm.get('username').value,
            name: this.signupForm.get('name').value

        }, this.signupForm.get('password').value)
            .then(r => {
                    console.log(r);
                    this.navCtrl.navigateForward('/home/feed');
                    this.presentToast('signed up successfuly', 1000);
                },
                err => {
                    this.presentToast('failed to sign up', 1000);
                    console.log('Error:' + err
                    );
                }
            );
    }


}
