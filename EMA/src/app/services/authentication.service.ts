import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';



@Injectable(
)
export class AuthenticateService {
    constructor() {
    }


    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => {
                        resolve(res);
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

    async addUserProfile(value) {
        const data = {
            Email: value.email,
            UserName: value.username,
        };
        // @ts-ignore
        await firebase.firestore().collection('https://eseproject2019team1.firebaseio.com/UserDB').doc(this.userDetails().uid).set(data);
    }

    get isAuthenticated(): boolean{
        const user = firebase.auth().currentUser;
        if (user) {return true; } else {return false; }
    }

}

