import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class FirestoreCRUDService {
    fs = firebase.firestore();

    constructor() {
    }

    addUser(User) {
        return this.fs.collection('UserDB/').doc(User.uid).set(User);
    }

    readUser(uid) {
        return this.fs.doc('UserDB/' + uid).get();
    }

    updateUser(User) {
        return this.fs.doc('UserDB/' + User.uid).update(User);
    }

    deleteUser(uid) {
        return this.fs.doc('UserDB/' + uid).delete();
    }
}
