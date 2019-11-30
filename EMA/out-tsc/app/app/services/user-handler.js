import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
let UserHandler = class UserHandler {
    constructor(aFs) {
        this.aFs = aFs;
        this.userRef = this.aFs.collection('UserDB/');
    }
    /**
     *  creates a new user document on firestore with the user id given from firebase authentication
     *  @param user user data as defined in the user-interface
     */
    addUser(user) {
        return this.userRef.doc(user.uid).set(user);
    }
    /**
     * returns user data (as defined in user interface) as a promise from firestore database
     * @param uid user-ID as defined from firebase authentication
     */
    readUser(uid) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let user;
            if (!this.userRef.doc(uid)) {
                reject();
            }
            else {
                yield this.userRef.doc(uid).ref.get().then((doc) => {
                    user = {
                        uid: doc.get('uid'),
                        username: doc.get('username'),
                        name: doc.get('name'),
                        email: doc.get('email'),
                        isProvider: doc.get('isProvider'),
                    };
                    if (user.isProvider) {
                        user.ppid = doc.get('ppid');
                    }
                    return user;
                });
                resolve(user);
            }
        }));
    }
    /**
     * updates user data
     * @param user user data as defined in user interface
     */
    updateUser(user) {
        return new Promise((resolve, reject) => {
            this.userRef.doc(user.uid).update(user).then(() => resolve(), err => reject(err));
        });
    }
    /**
     * Deletes user data on database
     * @param uid user-ID from firebase authentication
     */
    deleteUser(uid) {
        return this.aFs.doc('UserDB/' + uid).delete();
    }
};
UserHandler = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFirestore])
], UserHandler);
export { UserHandler };
//# sourceMappingURL=user-handler.js.map