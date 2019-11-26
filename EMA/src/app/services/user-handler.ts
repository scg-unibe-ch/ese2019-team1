import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from './user';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UserHandler {

    private userRef: AngularFirestoreCollection;
    constructor(
        private aFs: AngularFirestore
    ) {
        this.userRef = this.aFs.collection('UserDB/');
    }

    /**
     *  creates a new user document on firestore with the user id given from firebase authentication
     *  @param user user data as defined in the user-interface
     */
    addUser(user: User) {
        return this.userRef.doc(user.uid).set(user);
    }

    /**
     * returns user data (as defined in user interface) as a promise from firestore database
     * @param uid user-ID as defined from firebase authentication
     */
    readUser(uid: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            let user: User;
            if (!this.userRef.doc(uid)) {
                reject();
            } else {
                await this.userRef.doc(uid).ref.get().then((doc) => {
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
            this.userRef.doc(user.uid).update(user).then(
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
