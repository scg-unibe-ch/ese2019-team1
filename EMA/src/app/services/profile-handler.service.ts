import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from './user';
import {FirestoreCRUDService} from './firestore-crud.service';
import {Categories, Profile} from './profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileHandlerService {
    private docRef: AngularFirestoreCollection;

    constructor(private fs: AngularFirestore,
                private crudService: FirestoreCRUDService) {
        this.docRef = this.fs.collection('ProviderProfiles/');
    }

    /**
     * updates user to an provider. updates first user database and stores provider-flag. it then opens up a new entry
     * with user-ID in the profile database and returns profile-ID which in turn is then also stored in the user DB.
     * @param user user data as defined in user-interface
     */
    createProvider(user: User) {
        return new Promise<any>(async (resolve, reject) => {
            user.isProvider = true;
            await this.crudService.updateUser(user).then(async () => {
                await this.docRef.add({uid: user.uid}).then(async res => {
                    user.ppid = res.id;
                    await this.docRef.doc(user.ppid).update({ppid: user.ppid});
                    await this.crudService.updateUser(user).then(() => {
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
                this.crudService.readUser(pprofile.uid).then((user) => {
                    usr = user;
                }, err => reject(err));
            }, err => reject(err));
            if (usr !== null) {
                usr.isProvider = false;
                usr.ppid = null;
            }
            this.crudService.updateUser(usr).then((res) => resolve(res));
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
                if (doc.get('companyName') !== null) {
                    pprofile.companyName = doc.get('companyName') as string;
                }
                if (doc.get('category') !== null) {
                    pprofile.category = doc.get('category') as Categories;
                }
                resolve(pprofile);
            },
                err => reject(err));
        });
    }
}
