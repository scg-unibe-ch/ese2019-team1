import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';
import {ProfileHandlerService} from '../../services/profile-handler.service';

@Component({
  selector: 'app-signupprovider',
  templateUrl: './signupprovider.page.html',
  styleUrls: ['./signupprovider.page.scss'],
})
export class SignupproviderPage implements OnInit {

    private signupForm: FormGroup;
    private submitted = false;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private authService: AuthenticateService,
                private fs: ProfileHandlerService,
                private formBuilder: FormBuilder) {
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
      toast.present();
    }

    onSubmit(value) {
        this.submitted = true;
        console.log('SIGNUP');

        if (this.signupForm.invalid) {
            return;
        }
        this.authService.registerProvider({
            email: this.signupForm.get('email').value,
            providerName: this.signupForm.get('providerName').value,
            category: this.signupForm.get('category').value


            this.navCtrl.navigateForward('/home/feed');


    }
}
