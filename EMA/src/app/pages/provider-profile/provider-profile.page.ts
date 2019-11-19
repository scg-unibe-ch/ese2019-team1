import {Component, OnInit} from '@angular/core';
import {Img} from '../../services/img';
import {AuthenticateService} from '../../services/authentication.service';
import {ProfileGuardService} from '../../services/profile-guard.service';
import {Profile} from '../../services/profile';
import {createJobHandler} from '@angular-devkit/core/src/experimental/jobs';
import {ProfileHandlerService} from '../../services/profile-handler.service';


@Component({
    selector: 'app-provider-profile',
    templateUrl: './provider-profile.page.html',
    styleUrls: ['./provider-profile.page.scss'],
})

export class ProviderProfilePage implements OnInit {

    tempOwnerDescription;
    ownerDescription;
    tempServiceDescription;
    serviceDescription;
    clickedOwner = false;
    clickedService = false;
    ownerButtonContent: string;
    serviceButtonContent: string;
    inputFile: Img;

    constructor(private authGuard: AuthenticateService,
                private profileGuard: ProfileGuardService,
                private profilehandler: ProfileHandlerService) {
    }

    ngOnInit() {
        this.ownerButtonContent = 'Edit';
        this.serviceButtonContent = 'Edit';
    }

    editOwner() {
        this.clickedOwner = !this.clickedOwner;
        if (this.ownerButtonContent === 'Edit') {
            this.ownerButtonContent = 'Save';
        } else if (this.ownerButtonContent === 'Save') {
            this.ownerButtonContent = 'Edit';
            this.ownerDescription = this.tempOwnerDescription;
        }
    }

    editService() {
        this.clickedService = !this.clickedService;
        if (this.serviceButtonContent === 'Edit') {
            this.serviceButtonContent = 'Save';
        } else if (this.serviceButtonContent === 'Save') {
            this.serviceButtonContent = 'Edit';
            this.serviceDescription = this.tempServiceDescription;
        }
    }

    addProfilePicture(imageInput: any) {
        console.log(imageInput.files[0]);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {

            this.inputFile = new Img(file);
            let pprofile;
            this.profileGuard.getProfile(this.authGuard.afAuth.auth.currentUser.uid).then(
                (profile) => {
                    pprofile = profile as Profile;
                },
                err => {
                    console.log(err);
                });


            reader.readAsDataURL(file);
        });
    }
}
