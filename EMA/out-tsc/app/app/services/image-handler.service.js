import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
let ImageHandlerService = class ImageHandlerService {
    constructor(afStorage, afDB) {
        this.afStorage = afStorage;
        this.afDB = afDB;
        this.imgRef = this.afDB.collection('imageDB/');
    }
    /**
     * registers key in image database, which in hand is used to upload the file under that key to firestorage.
     * returns promise. resolve: returns Img object with download url and progress.
     * reject: something went wrong
     * @param image image data according to specs of Img class
     * @see Img
     *
     */
    uploadImage(image) {
        return new Promise((resolve, reject) => {
            this.imgRef.add({
                name: image.name,
                createdAt: image.createdAt,
                ownerId: image.ownerId,
            }).then(res => {
                image.$key = res.id.toString();
            }, err => {
                reject(err);
            }).then(() => {
                const task = this.afStorage.upload(image.$key, image.img);
                image.progress = task.percentageChanges();
                task.snapshotChanges().pipe(finalize(() => {
                    this.afStorage.ref(image.$key).getDownloadURL().subscribe(url => {
                        image.url = url;
                        this.imgRef.doc(image.$key).update({ url: image.url }).then(() => resolve(image));
                    });
                })).subscribe();
            });
        });
    }
    /**
     * retrieves the image location url as string from firestore vie image database
     * @param imagekey ImageID
     */
    getImageURL(imagekey) {
        return new Promise((resolve, reject) => {
            let url;
            this.imgRef.doc(imagekey).ref.get().then(doc => {
                url = doc.get('url');
                resolve(url);
            }, err => reject(err));
        });
    }
    /**
     * deletes image entry from image DB and file from storage
     * @param imagekey imageID of image to be deleted
     */
    deleteImage(imagekey) {
        return new Promise((resolve, reject) => {
            this.imgRef.doc(imagekey).delete().then(() => {
                this.afStorage.ref(imagekey).delete().pipe(finalize(() => {
                    resolve();
                })).subscribe();
            }, err => reject(err));
        });
    }
};
ImageHandlerService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFireStorage,
        AngularFirestore])
], ImageHandlerService);
export { ImageHandlerService };
//# sourceMappingURL=image-handler.service.js.map