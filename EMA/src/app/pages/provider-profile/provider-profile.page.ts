import {Component, OnInit} from '@angular/core';
import {Img} from '../../services/img';
import {AuthenticateService} from '../../services/authentication.service';
import {Profile} from '../../services/profile';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {UserHandler} from '../../services/user-handler';
import {ProfileGuardService} from '../../services/profile-guard.service';
import {ImageHandlerService} from '../../services/image-handler.service';


@Component({
    selector: 'app-provider-profile',
    templateUrl: './provider-profile.page.html',
    styleUrls: ['./provider-profile.page.scss'],
})

export class ProviderProfilePage implements OnInit {
    profileData: Profile;
    mainProfileImageUrl: string;
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
                private profileGuard: ProfileGuardService,
                private imageHandler: ImageHandlerService) {

    }

    ngOnInit() {
        this.ownerButtonContent = 'Edit';
        this.serviceButtonContent = 'Edit';
        this.loadProfileData().then(
            res => {
                this.loadMainProfileImage().then(
                    () => {
                        this.dataLoaded = res.valueOf();
                    }
                );
            }
        );
    }

    private loadProfileData(): Promise<boolean> {
        return new Promise<boolean>(
            (resolve, reject) => {
                this.userHandler.readUser(this.authGuard.afAuth.auth.currentUser.uid).then(
                    user => {
                        if (user.isProvider) {
                            this.profileHandler.readProfile(user.ppid).then(
                                p => {
                                    this.profileData = p as Profile;
                                    resolve(true);
                                }
                            );
                        }
                    },
                    err => {
                        console.log(err);
                        reject(false);
                    }
                );
            });
    }

    async editOwner() {
        this.clickedOwner = !this.clickedOwner;
        if (this.ownerButtonContent === 'Edit') {
            this.ownerButtonContent = 'Save';
        } else if (this.ownerButtonContent === 'Save') {
            this.ownerButtonContent = 'Edit';
            this.profileData.about = this.tempOwnerDescription;
            // Todo: let user know something went wrong in the catch statement
            await this.profileHandler.updateProfile(this.profileData).catch();
        }
    }

    async editService() {
        this.clickedService = !this.clickedService;
        if (this.serviceButtonContent === 'Edit') {
            this.serviceButtonContent = 'Save';
        } else if (this.serviceButtonContent === 'Save') {
            this.serviceButtonContent = 'Edit';
            this.profileData.serviceDescription = this.tempServiceDescription;
            // Todo: let user know something went wrong in the catch statement
            await this.profileHandler.updateProfile(this.profileData).catch();
        }
    }

    isOwner() {
        this.profileGuard.isProfileOwner(this.authGuard.afAuth.auth.currentUser.uid, this.profileData.ppid);
    }

    async addProfilePicture(imageInput: File) {
        console.log(imageInput.name);
        this.inputFile = new Img(imageInput);
        this.inputFile.ownerId = this.profileData.uid;
        // Todo: catch reject-case and let user know
        this.imageHandler.uploadImage(this.inputFile).then(
            img => {
                this.profileData.mainImgID = img.$key;
                this.profileHandler.updateProfile(this.profileData);
            }
        );

    }

    async loadMainProfileImage() {
        this.imageHandler.getImageURL(this.profileData.mainImgID).then(
            url => this.mainProfileImageUrl = url,
            err => console.log(err)
        );
    }
}
