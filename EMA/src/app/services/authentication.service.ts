import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {FirestoreCRUDService} from './firestore-crud.service';

import {Router} from '@angular/router';


@Injectable(
    {providedIn: 'root'}
)
export class AuthenticateService {
    // tslint:disable-next-line:variable-name
    private userData: any;

    constructor(
        public afAuth: AngularFireAuth,
        private fs: FirestoreCRUDService,
        private router: Router
    ) {
        this.afAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.setUserData(user);
                sessionStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(sessionStorage.getItem('user'));
            } else {
                sessionStorage.setItem('user', null);
                JSON.parse(sessionStorage.getItem('user'));
            }
        });
    }

    registerUser(value, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(value.email, password).then(
            async result => {
                this.userData = {...value, uid: result.user.uid};
                await this.fs.addUser(this.userData);

            },
            error => console.log(error)
        );

    }

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
        return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(
            result => {
                this.userData = value;
                // maybe navigation here?
            },
            error => console.log(error)
        );
    }

    /**
     * returns boolean
     */

    get isAuthenticated(): boolean {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return user !== null;
    }

    setUserData(value: any) {
        this.userData = value;
    }
}
