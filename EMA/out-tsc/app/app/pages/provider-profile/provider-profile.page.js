import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Img } from '../../services/img';
import { AuthenticateService } from '../../services/authentication.service';
import { ProfileHandlerService } from '../../services/profile-handler.service';
import { UserHandler } from '../../services/user-handler';
import { ProfileGuardService } from '../../services/profile-guard.service';
import { ImageHandlerService } from '../../services/image-handler.service';
import { ActivatedRoute } from '@angular/router';
let ProviderProfilePage = class ProviderProfilePage {
    constructor(authGuard, profileHandler, userHandler, profileGuard, imageHandler, route) {
        this.authGuard = authGuard;
        this.profileHandler = profileHandler;
        this.userHandler = userHandler;
        this.profileGuard = profileGuard;
        this.imageHandler = imageHandler;
        this.route = route;
        this.dataLoaded = false;
        this.userIsOwner = false;
        this.clickedOwner = false;
        this.clickedService = false;
        this.editMode = false;
    }
    ngOnInit() {
        this.ownerButtonContent = 'Edit';
        this.serviceButtonContent = 'Edit';
        this.editProfileButtonContent = 'Edit your profile';
        this.loadProfile(this.route.snapshot.paramMap.get('ppid'));
    }
    loadProfile(ppid) {
        this.loadProfileData(ppid).then(res => {
            this.isOwner();
            this.loadMainProfileImage().then(() => {
                this.dataLoaded = res.valueOf();
            });
        });
    }
    loadProfileData(ppid) {
        return new Promise((resolve, reject) => {
            this.userHandler.readUser(this.authGuard.afAuth.auth.currentUser.uid).then(user => {
                if (user.isProvider) {
                    this.profileHandler.readProfile(ppid).then(p => {
                        this.profileData = p;
                        resolve(true);
                    });
                }
            }, err => {
                console.log(err);
                reject(false);
            });
        });
    }
    editOwner() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.clickedOwner = !this.clickedOwner;
            if (this.ownerButtonContent === 'Edit') {
                this.ownerButtonContent = 'Save';
            }
            else if (this.ownerButtonContent === 'Save') {
                this.ownerButtonContent = 'Edit';
                this.profileData.about = this.tempOwnerDescription;
                // Todo: let user know something went wrong in the catch statement
                yield this.profileHandler.updateProfile(this.profileData).catch();
            }
        });
    }
    editService() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.clickedService = !this.clickedService;
            if (this.serviceButtonContent === 'Edit') {
                this.serviceButtonContent = 'Save';
            }
            else if (this.serviceButtonContent === 'Save') {
                this.serviceButtonContent = 'Edit';
                this.profileData.serviceDescription = this.tempServiceDescription;
                // Todo: let user know something went wrong in the catch statement
                yield this.profileHandler.updateProfile(this.profileData).catch();
            }
        });
    }
    isOwner() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.profileGuard.isProfileOwner(this.authGuard.afAuth.auth.currentUser.uid, this.profileData.ppid).then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (this.userIsOwner = res.valueOf()); }));
        });
    }
    /**
     * uploads image for the profile
     * @param imageInput image data accorign to IMG class
     * @param isMainImage boolean if image is main profile image (shown on feed page) or secondary.
     */
    addProfilePicture(imageInput, isMainImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(imageInput.name);
            this.inputFile = new Img(imageInput);
            this.inputFile.ownerId = this.profileData.uid;
            // Todo: catch reject-case and let user know
            if (this.profileData.mainImgID !== undefined) {
                yield this.imageHandler.deleteImage(this.profileData.mainImgID);
            }
            this.imageHandler.uploadImage(this.inputFile).then(img => {
                if (isMainImage) {
                    this.profileData.mainImgID = img.$key;
                }
                else {
                    this.profileData.secondaryImgIDs.push(img.$key);
                }
                this.profileHandler.updateProfile(this.profileData);
                this.loadProfile(this.profileData.ppid);
            });
        });
    }
    /**
     * retrieves image url from database for the page to display
     */
    loadMainProfileImage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.imageHandler.getImageURL(this.profileData.mainImgID).then(url => this.mainProfileImageUrl = url, err => console.log(err));
        });
    }
    controlEditMode() {
        this.editMode = !this.editMode;
        if (this.editProfileButtonContent === 'Edit your profile') {
            this.editProfileButtonContent = 'Exit edit mode';
        }
        else if (this.editProfileButtonContent === 'Exit edit mode') {
            this.editProfileButtonContent = 'Edit your profile';
        }
    }
};
ProviderProfilePage = tslib_1.__decorate([
    Component({
        selector: 'app-provider-profile',
        templateUrl: './provider-profile.page.html',
        styleUrls: ['./provider-profile.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticateService,
        ProfileHandlerService,
        UserHandler,
        ProfileGuardService,
        ImageHandlerService,
        ActivatedRoute])
], ProviderProfilePage);
export { ProviderProfilePage };
//# sourceMappingURL=provider-profile.page.js.map