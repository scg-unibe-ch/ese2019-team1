import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user';
import {UserHandler} from './user-handler';
import {Categories, Profile} from './profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileHandlerService {

    constructor(
        private fs: AngularFirestore,
        private userHandler: UserHandler
    ) {
    }

    private docRef = this.fs.collection('ProviderProfiles/');

    /**
     * This method first calls createProvider and sets a DB document with unique key. Once successful it will call
     * initProfile and set the data given from the sign up form
     * @param user User according to interface (retrieved from UserDB)
     * @param profileData profile-data given from sign up form
     */
    createProfile(user: User, profileData): Promise<string> {
        let ppid: string;
        return new Promise<string>(
            (resolve, reject) => {
                this.createProvider(user).then(
                    res => {
                        ppid = res.ppid;
                        this.initProfile(ppid, profileData).then(
                            r => {
                                resolve(ppid);
                            },
                            err => {
                                reject(err);
                            }
                        );
                    },
                    err => reject(err)
                );
            }
        );
    }

    /**
     * updates user to an provider. updates first user database and stores provider-flag. it then opens up a new entry
     * with user-ID in the profile database and returns profile-ID which in turn is then also stored in the user DB.
     * @param user user data as defined in user-interface
     */
    private createProvider(user: User): Promise<any> {
        return new Promise<User>(async (resolve, reject) => {
            user.isProvider = true;
            await this.userHandler.updateUser(user).then(async () => {
                await this.docRef.add({uid: user.uid, isApproved: false}).then(async res => {
                    user.ppid = res.id;
                    await this.docRef.doc(user.ppid).update({ppid: user.ppid});
                    await this.userHandler.updateUser(user).then(() => {
                            resolve(user);
                        },
                        err => reject(err));
                });
            });
        });
    }

    /**
     * updates provider profile with additional data
     * @param ppid profileID
     * @param profileData profile data (companyName, category, companyEmail)
     */
    private initProfile(ppid: string, profileData) {
        return new Promise<any>((resolve, reject) => {
            this.docRef.doc(ppid).update(profileData).then(
                res => resolve(res),
                err => reject(err)
            )
            ;

        });
    }

    /**
     * deletes profile and resets provider-user to a regular-user
     * @param ppid ID of profile to be deleted
     */
    async deleteProfile(ppid: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            let user: User;
            let uId: string;
            await this.docRef.doc(ppid).ref.get().then(
                doc => uId = doc.get('uid') as string,
                err => reject(err)
            ).then(
                async () => await this.userHandler.readUser(uId).then(
                    res => user = res,
                    err => reject(err)
                )
            );
            await this.docRef.doc(ppid).delete().then(
                async () => {
                    user.ppid = null;
                    user.isProvider = false;
                    await this.userHandler.updateUser(user).then(
                        res => resolve(),
                        err => reject(err)
                    );
                }
            );
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
                    if (doc.get('mainImgID') !== undefined) {
                        pprofile.mainImgID = doc.get('mainImgID') as string;
                    }
                    if (doc.get('secondaryImgIDs') !== undefined) {
                        pprofile.secondaryImgIDs = doc.get('secondaryImgIDs') as Array<string>;
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
    async getAllProfiles(approved: boolean = true): Promise<Array<Profile>> {
        return new Promise<Array<Profile>>(
            async resolve => {
                const profileList: Array<Profile> = [];
                await this.docRef.ref.get().then(
                    doc => doc.forEach(entry => {
                        if (entry.data().isApproved as boolean === approved) {
                            profileList.push(entry.data() as Profile);
                        }
                    }));
                await resolve(profileList);
            });
    }

    approveProfile(ppid: string): Promise<any> {
        return new Promise<any>(
            (resolve, reject) => {
                this.docRef.doc(ppid).update({isApproved: true}).then(
                    () => resolve,
                    err => reject(err));
            });
    }

    changeProviderEmail(ppid: string, newEmail: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.docRef.doc(ppid).update({companyEmail: newEmail}).then(
                () => resolve(),
                (err) => reject(err)
            );
        });
    }
}
