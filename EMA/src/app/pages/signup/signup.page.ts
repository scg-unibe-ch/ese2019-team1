import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignUpPage implements OnInit {

    private signupForm: FormGroup;
    private submitted = false;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private authService: AuthenticateService,
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

        this.authService.registerUser({email: this.signupForm.get('email').value, password: this.signupForm.get('password').value})
            .then(res => {
                console.log(res);
                this.navCtrl.navigateForward('/home/feed');
                this.presentToast('signed up successfuly', 2000);
            }, err => {
                this.presentToast('failed to sign up', 2000);
                console.log('Error:' + err);
            });
    }

    /*
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
    */
}
