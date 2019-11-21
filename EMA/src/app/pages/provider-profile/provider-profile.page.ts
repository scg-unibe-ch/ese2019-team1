import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Img} from '../../services/img';
import {AuthenticateService} from '../../services/authentication.service';
import {Profile} from '../../services/profile';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {UserHandler} from '../../services/user-handler';
import {ProfileGuardService} from '../../services/profile-guard.service';


@Component({
    selector: 'app-provider-profile',
    templateUrl: './provider-profile.page.html',
    styleUrls: ['./provider-profile.page.scss'],
})

export class ProviderProfilePage implements OnInit {
    profileData: Profile;
    private dataLoaded = false;
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
                private profileHandler: ProfileHandlerService,
                private userHandler: UserHandler,
                private profileGuard: ProfileGuardService) {

    }

     ngOnInit() {
         this.ownerButtonContent = 'Edit';
         this.serviceButtonContent = 'Edit';
         this.loadProfileData();
     }

    private loadProfileData() {
        this.userHandler.readUser(this.authGuard.afAuth.auth.currentUser.uid).then(
            user => {
                if (user.isProvider) {
                    this.profileHandler.readProfile(user.ppid).then(
                        p => {
                            this.profileData = p as Profile;
                            this.dataLoaded = true;
                        }
                    );
                }
            },
            err => {
                console.log(err);
            }
        );
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

    isOwner() {
        this.profileGuard.isProfileOwner(this.authGuard.afAuth.auth.currentUser.uid, this.profileData.ppid);
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
