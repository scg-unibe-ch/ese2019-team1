import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserHandler } from './user-handler';
let ProfileHandlerService = class ProfileHandlerService {
    constructor(fs, userHandler) {
        this.fs = fs;
        this.userHandler = userHandler;
        this.docRef = this.fs.collection('ProviderProfiles/');
    }
    /**
     * This method first calls createProvider and sets a DB document with unique key. Once successful it will call
     * initProfile and set the data given from the sign up form
     * @param user User according to interface (retrieved from UserDB)
     * @param profileData profile-data given from sign up form
     */
    createProfile(user, profileData) {
        let ppid;
        return new Promise((resolve, reject) => {
            this.createProvider(user).then(res => {
                ppid = res.ppid;
                this.initProfile(ppid, profileData).then(r => {
                    resolve(ppid);
                }, err => {
                    reject(err);
                });
            }, err => reject(err));
        });
    }
    /**
     * updates user to an provider. updates first user database and stores provider-flag. it then opens up a new entry
     * with user-ID in the profile database and returns profile-ID which in turn is then also stored in the user DB.
     * @param user user data as defined in user-interface
     */
    createProvider(user) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.isProvider = true;
            yield this.userHandler.updateUser(user).then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield this.docRef.add({ uid: user.uid, isApproved: false }).then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    user.ppid = res.id;
                    yield this.docRef.doc(user.ppid).update({ ppid: user.ppid });
                    yield this.userHandler.updateUser(user).then(() => {
                        resolve(user);
                    }, err => reject(err));
                }));
            }));
        }));
    }
    /**
     * updates provider profile with additional data
     * @param ppid profileID
     * @param profileData profile data (companyName, category, companyEmail)
     */
    initProfile(ppid, profileData) {
        return new Promise((resolve, reject) => {
            this.docRef.doc(ppid).update(profileData).then(res => resolve(res), err => reject(err));
        });
    }
    /**
     * deletes profile and resets provider-user to a regular-user
     * @param ppid ID of profile to be deleted
     */
    deleteProfile(ppid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let user;
                let uId;
                yield this.docRef.doc(ppid).ref.get().then(doc => uId = doc.get('uid'), err => reject(err)).then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield this.userHandler.readUser(uId).then(res => user = res, err => reject(err));
                }));
                yield this.docRef.doc(ppid).delete().then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    user.ppid = null;
                    user.isProvider = false;
                    yield this.userHandler.updateUser(user).then(res => resolve(), err => reject(err));
                }));
            }));
        });
    }
    /**
     * updates provider Profile data.
     * @param profile provider profile with changed data
     */
    updateProfile(profile) {
        return new Promise((resolve, reject) => {
            this.docRef.doc(profile.ppid).update(profile).then(() => {
                resolve();
            }, err => {
                console.log(err);
                reject(err);
            });
        });
    }
    /**
     * returns profile Data as defined in profile-interface
     * @param ppid profile-ID from user DB
     */
    readProfile(ppid) {
        return new Promise((resolve, reject) => {
            let pprofile = null;
            this.docRef.doc(ppid).ref.get().then((doc) => {
                pprofile = {
                    ppid: doc.get('ppid'),
                    uid: doc.get('uid')
                };
                if (doc.get('companyName') !== undefined) {
                    pprofile.companyName = doc.get('companyName');
                }
                if (doc.get('category') !== undefined) {
                    pprofile.category = doc.get('category');
                }
                if (doc.get('serviceDescription') !== undefined) {
                    pprofile.serviceDescription = doc.get('serviceDescription');
                }
                if (doc.get('about') !== undefined) {
                    pprofile.about = doc.get('about');
                }
                if (doc.get('mainImgID') !== undefined) {
                    pprofile.mainImgID = doc.get('mainImgID');
                }
                if (doc.get('secondaryImgIDs') !== undefined) {
                    pprofile.secondaryImgIDs = doc.get('secondaryImgIDs');
                }
                resolve(pprofile);
            }, err => reject(err));
        });
    }
    getAllProfiles(approved = true) {
        return new Promise((resolve) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profileList = [];
            yield this.docRef.ref.get().then(doc => doc.forEach(entry => {
                if (entry.data().isApproved === approved) {
                    profileList.push(entry.data());
                }
            }));
            yield resolve(profileList);
        }));
    }
    approveProfile(ppid) {
        return new Promise((resolve, reject) => {
            this.docRef.doc(ppid).update({ isApproved: true }).then(() => resolve, err => reject(err));
        });
    }
};
ProfileHandlerService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFirestore,
        UserHandler])
], ProfileHandlerService);
export { ProfileHandlerService };
//# sourceMappingURL=profile-handler.service.js.map