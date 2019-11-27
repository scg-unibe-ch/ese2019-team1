/**
 * Image class for image handler.
 */
import {Observable} from 'rxjs';

export class Img {
    $key: string;
    img: File;
    name: string;
    ownerId: string;
    url: string
    progress: Observable<number>;
    createdAt: Date = new Date();

    constructor(img: File) {
        this.img = img;
        this.name = img.name;
    }
}

