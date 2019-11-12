import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from './user';
import {FirestoreCRUDService} from './firestore-crud.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileHandlerService {
    private docRef: AngularFirestoreCollection;

    constructor(private fs: AngularFirestore,
                private crudService: FirestoreCRUDService) {
        this.docRef = this.fs.collection('ProviderProfiles/');
    }

    createProvider(user: User) {
        return new Promise<any>(async (resolve, reject) => {
            user.isProvider = true;
            await this.crudService.updateUser(user).then(async () => {
                await this.docRef.add({uid: user.uid}).then(async res => {
                    user.ppid = res.id;
                    await this.docRef.doc(user.ppid).update({ppid: user.ppid});
                    await this.crudService.updateUser(user).then(() => {
                            resolve();
                        },
                        err => reject(err));
                });
            });
        });
    }
}
