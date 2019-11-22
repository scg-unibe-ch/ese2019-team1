import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Img} from './img';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class ImageHandlerService {

    constructor(
        private afStorage: AngularFireStorage,
        private afDB: AngularFirestore
    ) {
    }

    private storageRef = this.afStorage.ref('/profileImages');
    private imgRef = this.afDB.collection('imageDB');

    /**
     * uploads image to firestorage with a image key given from the firestore database.
     * returns promise. resolve: returns Img object with download url and progress.
     * reject: something went wrong
     * @param image image data according to specs of Img class
     * @see Img
     *
     */

    uploadImage(image: Img): Promise<Img> {
        return new Promise<Img>((resolve, reject) => {
                const task = this.storageRef.child('/img').put(image.img[0]);
                task.on('state_changed', snap => {
                        image.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                    },
                    err => {
                        console.log(err);
                        reject(err);
                    },
                    () => {
                        task.snapshot.ref.getDownloadURL().then(url => {
                                console.log('imageurl at:' + url);
                                image.url = url as string;
                                resolve(image);
                            }
                        );
                    });
            }
        );
    }
}
