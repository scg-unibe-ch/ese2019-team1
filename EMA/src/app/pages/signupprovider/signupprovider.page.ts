import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {Categories} from '../../services/profile';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-signupprovider',
    templateUrl: './signupprovider.page.html',
    styleUrls: ['./signupprovider.page.scss'],
})
export class SignupproviderPage implements OnInit {

    private signupForm: FormGroup;
    private submitted = false;
    private readonly ppid: string;

    constructor(public toastController: ToastController,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private profileHandler: ProfileHandlerService,
                private route: ActivatedRoute,
                private router: Router) {
        this.ppid = this.route.snapshot.paramMap.get('ppid');
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
        this.submitted = true;
        const profileData = {
            category: Categories[value.service],
            companyName: value.name,
            companyEmail: value.email
        };
        this.profileHandler.createProfile(this.ppid, profileData).then(
            () => {
                this.router.navigate(['home/provider-profile/', this.ppid]);
                this.presentToast('created profile', 1000);
            },
            err => {
                this.presentToast(err, 1000);
            }
        );

        if (this.signupForm.invalid) {
            return;
        }


    }
}
