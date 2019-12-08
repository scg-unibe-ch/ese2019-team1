import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
<<<<<<< HEAD
import {AuthenticateService} from '../../services/authentication.service';
import {ProfileHandlerService} from '../../services/profile-handler.service';
=======
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {Categories} from '../../services/profile';
import {UserHandler} from '../../services/user-handler';
import {AuthenticateService} from '../../services/authentication.service';
import {User} from '../../services/user';
import {Router} from '@angular/router';
>>>>>>> development

@Component({
    selector: 'app-signupprovider',
    templateUrl: './signupprovider.page.html',
    styleUrls: ['./signupprovider.page.scss'],
})
export class SignupproviderPage implements OnInit {

    private signupForm: FormGroup;
    private submitted = false;
    private user: User;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
<<<<<<< HEAD
                private authService: AuthenticateService,
                private fs: ProfileHandlerService,
                private formBuilder: FormBuilder) {
=======
                private formBuilder: FormBuilder,
                private profileHandler: ProfileHandlerService,
                private userHandler: UserHandler,
                private authService: AuthenticateService,
                private router: Router) {

        this.userHandler.readUser(this.authService.afAuth.auth.currentUser.uid).then(
            user => {
                this.user = user;
            }
        );
>>>>>>> development
        this.signupForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            service: new FormControl('', Validators.compose([
                Validators.required
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
        await toast.present();
    }

    onSubmit(value) {
<<<<<<< HEAD
        this.submitted = true;
        console.log('SIGNUP');

=======
>>>>>>> development
        if (this.signupForm.invalid) {
            return;
        }
    /*    this.authService.registerProvider({
            email: this.signupForm.get('email').value,
            providerName: this.signupForm.get('providerName').value,
            category: this.signupForm.get('category').value

        this.submitted = true;
        const profileData = {
            category: Categories[value.service],
            companyName: value.name,
            companyEmail: value.email
        };
        this.profileHandler.createProfile(this.user, profileData).then(
            async res => {
                this.presentToast('Profile created', 1000);
                await this.router.navigate(['home/provider-profile/', res.toString()]);
            },
            err => {
                this.presentToast(err, 1000);
            }
        );


            this.navCtrl.navigateForward('/home/feed');

*/
    }
}
