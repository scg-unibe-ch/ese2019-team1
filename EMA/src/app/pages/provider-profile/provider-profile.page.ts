import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Img} from '../../services/img';
import {AuthenticateService} from '../../services/authentication.service';
import {Profile} from '../../services/profile';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {UserHandler} from '../../services/user-handler';
import {ProfileGuardService} from '../../services/profile-guard.service';
import {ImageHandlerService} from '../../services/image-handler.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';


@Component({
    selector: 'app-provider-profile',
    templateUrl: './provider-profile.page.html',
    styleUrls: ['./provider-profile.page.scss'],
})

export class ProviderProfilePage implements OnInit {
    profileData: Profile;
    mainProfileImageUrl: string;
    private dataLoaded = false;
    private userIsOwner = false;
    tempOwnerDescription;
    ownerDescription;
    tempServiceDescription;
    serviceDescription;
    clickedOwner = false;
    clickedService = false;
    ownerButtonContent: string;
    serviceButtonContent: string;
    inputFile: Img;
    editMode = false;
    editProfileButtonContent: string;

    constructor(private authGuard: AuthenticateService,
                private profileHandler: ProfileHandlerService,
                private userHandler: UserHandler,
                private profileGuard: ProfileGuardService,
                private imageHandler: ImageHandlerService,
                private route: ActivatedRoute,
                private navCtrl: NavController) {

    }


    ngOnInit() {
        this.ownerButtonContent = 'Edit';
        this.serviceButtonContent = 'Edit';
        this.editProfileButtonContent = 'Edit your profile';
        this.loadProfile(this.route.snapshot.paramMap.get('ppid'));
    }


    public loadProfile(ppid: string) {
        this.loadProfileData(ppid).then(
            res => {
                this.isOwner();
                this.loadMainProfileImage().then(
                    () => {
                        this.dataLoaded = res.valueOf();
                    }
                );
            }
        );
    }

    private loadProfileData(ppid: string): Promise<boolean> {
        return new Promise<boolean>(
            (resolve, reject) => {
                this.userHandler.readUser(this.authGuard.afAuth.auth.currentUser.uid).then(
                    user => {
                        if (user.isProvider) {
                            this.profileHandler.readProfile(ppid).then(
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

    async isOwner() {
       await this.profileGuard.isProfileOwner(this.authGuard.afAuth.auth.currentUser.uid, this.profileData.ppid).then(
            async res => (this.userIsOwner = res.valueOf())
        );
    }

    async addProfilePicture(imageInput: File) {
        console.log(imageInput.name);
        this.inputFile = new Img(imageInput);
        this.inputFile.ownerId = this.profileData.uid;
        // Todo: catch reject-case and let user know
        if (this.profileData.mainImgID !== undefined) {
            await this.imageHandler.deleteImage(this.profileData.mainImgID);
        }
        this.imageHandler.uploadImage(this.inputFile).then(
            img => {
                this.profileData.mainImgID = img.$key;
                this.profileHandler.updateProfile(this.profileData);
                this.loadProfile(this.profileData.ppid);
            }
        );

    }

    async loadMainProfileImage() {
        this.imageHandler.getImageURL(this.profileData.mainImgID).then(
            url => this.mainProfileImageUrl = url,
            err => console.log(err)
        );
    }

    controlEditMode() {
        this.editMode = !this.editMode;
        if (this.editProfileButtonContent === 'Edit your profile') {
            this.editProfileButtonContent = 'Exit edit mode';
        } else if (this.editProfileButtonContent === 'Exit edit mode') {
            this.editProfileButtonContent = 'Edit your profile';
        }
    }
}
