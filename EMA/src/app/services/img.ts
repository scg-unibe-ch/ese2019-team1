/**
 * Image class for image handler.
 */

export class Img {
    $key: string;
    img: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(img: File) {
        this.img = img;
    }
}

