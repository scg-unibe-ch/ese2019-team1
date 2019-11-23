import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user';
import {UserHandler} from './user-handler';
import {Categories, Profile} from './profile';
import {Img} from './img';
import {ImageHandlerService} from './image-handler.service';
import * as firebase from 'firebase';


@Injectable({
    providedIn: 'root'
})
export class ProfileHandlerService {

    constructor(
        private fs: AngularFirestore,
        private userHandler: UserHandler,
        private imageHandler: ImageHandlerService
    ) {
    }

    private docRef = this.fs.collection('ProviderProfiles/');
    private imgRef = this.fs.collection('imgDB/');

    /**
     * updates user to an provider. updates first user database and stores provider-flag. it then opens up a new entry
     * with user-ID in the profile database and returns profile-ID which in turn is then also stored in the user DB.
     * @param user user data as defined in user-interface
     */
    createProvider(user: User) {
        return new Promise<any>(async (resolve, reject) => {
            user.isProvider = true;
            await this.userHandler.updateUser(user).then(async () => {
                await this.docRef.add({uid: user.uid}).then(async res => {
                    user.ppid = res.id;
                    await this.docRef.doc(user.ppid).update({ppid: user.ppid});
                    await this.userHandler.updateUser(user).then(() => {
                            resolve();
                        },
                        err => reject(err));
                });
            });
        });
    }

    /**
     * updates provider profile with additional data
     * @param profileData profile data as defined in profile-interface
     */
    createProfile(profileData: Profile) {
        return new Promise<any>((resolve, reject) => {
            this.docRef.doc(profileData.ppid).set(profileData).then(
                res => resolve(),
                err => reject(err)
            )
            ;

        });
    }

    /**
     * deletes profile and resets provider-user to a regular-user
     * @param pprofile profile-Data as defined in profile-interface
     */
    deleteProfile(pprofile: Profile) {
        return new Promise((resolve, reject) => {
            let usr: User = null;
            this.docRef.doc(pprofile.ppid).delete().then(() => {
                this.userHandler.readUser(pprofile.uid).then((user) => {
                    usr = user;
                }, err => reject(err));
            }, err => reject(err));
            if (usr !== null) {
                usr.isProvider = false;
                usr.ppid = null;
            }
            this.userHandler.updateUser(usr).then((res) => resolve(res));
        });

    }

    /**
     * updates provider Profile data.
     * @param profile provider profile with changed data
     */
    updateProfile(profile: Profile): Promise<any> {
        return new Promise<any>(
            (resolve, reject) => {
                this.docRef.doc(profile.ppid).update(profile).then(
                    () => {
                        resolve();
                    },
                    err => {
                        console.log(err);
                        reject(err);
                    });
            });
    }

    /**
     * returns profile Data as defined in profile-interface
     * @param ppid profile-ID from user DB
     */
    readProfile(ppid: string): Promise<Profile> {
        return new Promise<Profile>((resolve, reject) => {
            let pprofile: Profile = null;
            this.docRef.doc(ppid).ref.get().then((doc) => {
                    pprofile = {
                        ppid: doc.get('ppid') as string,
                        uid: doc.get('uid') as string
                    };
                    if (doc.get('companyName') !== undefined) {
                        pprofile.companyName = doc.get('companyName') as string;
                    }
                    if (doc.get('category') !== undefined) {
                        pprofile.category = doc.get('category') as Categories;
                    }
                    if (doc.get('serviceDescription') !== undefined) {
                        pprofile.serviceDescription = doc.get('serviceDescription') as string;
                    }
                    if (doc.get('about') !== undefined) {
                        pprofile.about = doc.get('about') as string;
                    }
                    if (doc.get('mainImgUrl') !== undefined) {
                        pprofile.mainImgUrl = doc.get('mainImgUrl') as string;
                    }
                    if (doc.get('secondaryImgUrls') !== undefined) {
                        pprofile.secondaryImgUrls = doc.get('secondaryImgUrls') as Array<string>;
                    }
                    resolve(pprofile);
                },
                err => reject(err));
        });
    }

    /**
     * returns all profiles in the Database as an Array
     *
     */
    getAllProfiles(): Array<Profile> {
        const profileList = Array<Profile>();
        this.docRef.get().subscribe(snapshot => {
            snapshot.forEach(doc => {
                profileList.push(doc.data() as Profile);
            });
        });
        return profileList;
    }
}