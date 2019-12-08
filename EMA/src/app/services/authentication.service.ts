import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {UserHandler} from './user-handler';

import {Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import * as firebase from 'firebase';


@Injectable(
    {providedIn: 'root'}
)
export class AuthenticateService {
    private userDetails: firebase.User = null;
    private user: Observable<firebase.User>;

    constructor(
        public afAuth: AngularFireAuth,
        private fs: UserHandler,
        private router: Router
    ) {
        this.user = afAuth.authState;
        this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
            () => {
                this.user.subscribe((user) => {
                    if (user) {
                        this.userDetails = user;
                        console.log('user logged in');
                    } else {
                        this.userDetails = null;
                        console.log('user NOT logged in');
                    }

                });
            });
    }

    /**
     * register user with firebase REST api and adds user data entry in firestore
     * @param value user data
     * @param password user password
     */
    registerUser(value, password) {
        return new Promise<any>(((resolve, reject) => {
            this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
                () => {
                    this.afAuth.auth.createUserWithEmailAndPassword(value.email, password).then(
                        result => {
                            this.userDetails = result.user;
                            this.fs.addUser({...value, uid: result.user.uid, isProvider: false, showHints: true}).then(
                                () => {
                                    resolve(result);
                                },
                                error => {
                                    reject(error);
                                });

                        },
                        error => {
                            console.log(error);
                            reject(error);
                        }
                    );
                });
        }));

    }


    /**
     * removes user token from session storage
     */
    logoutUser() {
        console.log('auth service reached');
        this.afAuth.auth.signOut().then(
            () => {
                console.log('signout activated');
                sessionStorage.removeItem('user');
            }
        );
    }

    /**
     * logs user in via firebase REST
     * @param value user-email and password
     */

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
                () => {
                    this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(
                        async result => {
                            await this.router.navigate(['/home/feed']);
                            resolve(result);
                        },
                        error => {
                            console.log(error);
                            reject(error);
                        });
                });
        });
    }

    /**
     * deletes user data from firestore and the account on firebase afterwards
     */
    deleteUser() {
        this.fs.deleteUser(this.userDetails.uid).then(
            () => {
                this.afAuth.auth.currentUser.delete().then(
                    () => {
                        this.logoutUser();
                        this.router.navigate(['login']);
                    }
                );
            });
    }


    /**
     * returns boolean if user token is found in session storage
     * @see auth-guard.service
     */

    get isAuthenticated(): Observable<boolean> {
        return new Observable<boolean>((obs) => {
            this.user.subscribe((user) => {
                if (user) {
                    obs.next(true);
                } else {
                    obs.next(false);
                }
                obs.complete();
            });
        });
    }

}
