import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Img} from './img';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ImageHandlerService {

    constructor(
        private afStorage: AngularFireStorage,
        private afDB: AngularFirestore
    ) {
    }

    private imgRef = this.afDB.collection('imageDB/');

    /**
     * registers key in image database, which in hand is used to upload the file under that key to firestorage.
     * returns promise. resolve: returns Img object with download url and progress.
     * reject: something went wrong. key gets deleted in image db
     * @param image image data according to specs of Img class
     * @see Img
     *
     */

    uploadImage(image: Img): Promise<Img> {
        return new Promise<Img>(
            (resolve, reject) => {
                this.imgRef.add({
                    name: image.name as string,
                    createdAt: image.createdAt as Date,
                    ownerId: image.ownerId as string,
                }).then(
                    res => {
                        image.$key = res.id.toString();
                    },
                    err => {
                        reject(err);
                    }).then(
                    () => {
                        const task = this.afStorage.upload(image.$key, image.img);
                        image.progress = task.percentageChanges();
                        task.snapshotChanges().pipe(
                            finalize(() => {
                                this.afStorage.ref(image.$key).getDownloadURL().subscribe(
                                    url => {
                                        image.url = url as string;
                                        this.imgRef.doc(image.$key).update({url: image.url}).then(
                                            () => resolve(image));
                                    });
                            })).subscribe();
                    });
            });
    }

    /**
     * retrieves the image location url as string from firestore via image database
     * @param imagekey ImageID
     */

    getImageURL(imagekey: string): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {
                let url: string;
                this.imgRef.doc(imagekey).ref.get().then(
                    doc => {
                        url = doc.get('url') as string;
                        resolve(url);
                    },

                    err => reject(err)
                );
            });

    }

    /**
     * deletes image entry from image DB and file from storage
     * @param imagekey imageID of image to be deleted
     */

    deleteImage(imagekey: string): Promise<any> {
        return new Promise<any>(
            (resolve, reject) => {
                this.imgRef.doc(imagekey).delete().then(
                    () => {
                        this.afStorage.ref(imagekey).delete().pipe(
                            finalize(() => {
                                resolve();
                            })
                        ).subscribe();
                    },
                    err => reject(err)
                );
            });
    }
}
