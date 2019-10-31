import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class FirestoreCRUDService {


    constructor(
        private aFs: AngularFirestore
    ) {
    }

    addUser(User) {
        return this.aFs.collection('UserDB/').doc(User.uid).set(User);
    }

    readUser(uid) {
        return this.aFs.doc('UserDB/' + uid).get();
    }

    updateUser(User) {
        return this.aFs.doc('UserDB/' + User.uid).update(User);
    }

    deleteUser(uid) {
        return this.aFs.doc('UserDB/' + uid).delete();
    }
}
