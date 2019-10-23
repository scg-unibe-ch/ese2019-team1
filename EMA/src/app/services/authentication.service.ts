import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestore} from "@angular/fire/firestore";



@Injectable(
)
export class AuthenticateService {
    constructor() {

    }
    db = new FirestoreService(AngularFirestore.prototype);

    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => {
                        resolve(res);
                        return this.db.createUserProfile({uid: res.user.uid, email: value.email, username: value.username});
                    },
                    err => reject(err));

        });
    }

    loginUser(value) {
        console.log(value);
        return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(() => {
                        console.log('LOG Out');
                        resolve();
                    }).catch((error) => {
                    reject();
                });
            }
        });
    }

    userDetails() {
        return firebase.auth().currentUser;
    }

    get isAuthenticated(): boolean {
        const user = firebase.auth().currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
    }

}

