import {Injectable} from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
    DocumentChangeAction,
    Action,
    DocumentSnapshotDoesNotExist,
    DocumentSnapshotExists,
} from '@angular/fire/firestore';

import {Observable} from 'rxjs';
import {map, tap, take, switchMap, mergeMap, expand, takeWhile, timestamp} from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {


    constructor(private afs: AngularFirestore) {
    }


    public user: {
        uid: string;
        username: string;
        email: string;
    };

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    createUserProfile(user) {
        const timeStamp = this.timestamp;
        return this.afs.collection('UserDB').doc(user.uid).set({
                ...user,
                createdAt: timeStamp,
                changedAt: timeStamp,
            }
        );
    }

    changeUserProfile(user) {
        return this.afs.collection('UserDB').doc(user.uid).update({
          ...user,
          changedAt: timestamp()
        });
    }

}
