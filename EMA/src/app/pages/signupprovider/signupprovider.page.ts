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
            service: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
        this.navCtrl.setDirection('forward', true, 'forward')
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
