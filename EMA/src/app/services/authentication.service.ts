import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';


@Injectable(
    {providedIn: 'root'}
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

    get isAuthenticated(): boolean {
        const user = firebase.auth().currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
    }

}
