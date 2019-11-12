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

    addUser(user: User) {
        return this.docRef.doc(user.uid).set(user);
    }

    readUser(uid): Promise<User> {
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

    updateUser(user: User) {
        return new Promise<any>((resolve, reject) => {
            this.docRef.doc(user.uid).update(user).then(
                () => resolve(),
                err => reject(err));
        });
    }

    deleteUser(uid) {
        return this.aFs.doc('UserDB/' + uid).delete();
    }
}
