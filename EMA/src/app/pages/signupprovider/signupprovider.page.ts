import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';

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

        if (this.signupForm.invalid) {
            return;
        }


    }
}
