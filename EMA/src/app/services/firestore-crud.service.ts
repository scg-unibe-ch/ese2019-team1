import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {User} from './user';
import {map} from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class FirestoreCRUDService {

    private docRef: AngularFirestoreCollection;

    constructor(
        private aFs: AngularFirestore
    ) {
        this.docRef = this.aFs.collection('UserDB/');
    }

    /**
     *  creates a new user document on firestore with the user id given from firebase authentication
     *  @param user user data as defined in the user-interface
     */
    addUser(user: User) {
        return this.docRef.doc(user.uid).set(user);
    }

    /**
     * returns user data (as defined in user interface) as a promise from firestore database
     * @param uid user-ID as defined from firebase authentication
     */
    readUser(uid: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            let user: User;
            if (!this.docRef.doc(uid)) {
                reject();
            } else {
                await this.docRef.doc(uid).ref.get().then((doc) => {
                    user = {
                        uid: doc.get('uid') as string,
                        username: doc.get('username') as string,
                        name: doc.get('name') as string,
                        email: doc.get('email') as string,
                        isProvider: doc.get('isProvider') as boolean,
                    };
                    if (user.isProvider) {
                        user.ppid = doc.get('ppid') as string;
                    }
                    return user;

                });
                resolve(user);
            }


        });
    }

    /**
     * updates user data
     * @param user user data as defined in user interface
     */
    updateUser(user: User) {
        return new Promise<any>((resolve, reject) => {
            this.docRef.doc(user.uid).update(user).then(
                () => resolve(),
                err => reject(err));
        });
    }

    /**
     * Deletes user data on database
     * @param uid user-ID from firebase authentication
     */
    deleteUser(uid: string) {
        return this.aFs.doc('UserDB/' + uid).delete();
    }
}
