import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProfileHandlerService} from './profile-handler.service';
import {Img} from './img';
import {AngularFirestore} from "@angular/fire/firestore";


@Injectable({
    providedIn: 'root'
})
export class ImageHandlerService {

    constructor(private afStorage: AngularFireStorage,
                private afDB: AngularFirestore) {
    }

    private storageRef = this.afStorage.ref('/profileImages/');
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
        return new Promise<Img>(
            (resolve, reject) => {
                const imgRef = this.storageRef.child(image.$key);
                imgRef.put(image.img).then(
                    (res) => {
                        image.progress = (res.bytesTransferred / res.totalBytes) * 100;
                    },
                    err => {
                        console.log(err);
                        reject(err);
                    }).finally(
                    () => {
                        image.url = imgRef.getDownloadURL();
                        resolve(image);
                    });
            });
    }
}
