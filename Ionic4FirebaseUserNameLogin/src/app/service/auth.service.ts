import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    constructor() {
    }

    //functions to register user
    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(
                res => resolve(res),
                err => reject(err))
        })
    }

    //login user, works with email/pass. maybe change to username/pass but then we need
    // to adapt the firebase api
    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.pass).then(
                res => resolve(res),
                err => reject(err))
        })
    }

    logoutUser(value) {
        return new Promise<any>((resolve, reject) => {
                return new Promise<any>((resolve, reject) => {
                    if (firebase.auth().currentUser) {
                        firebase.auth().signOut().then(() => {
                            console.log("Log out");
                            resolve();
                        }).catch((error) => {
                            reject();
                        });
                    }
                })
            }
        )
    }

    userDetails() {
        return firebase.auth().currentUser
    }
}
