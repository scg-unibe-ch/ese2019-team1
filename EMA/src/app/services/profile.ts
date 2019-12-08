export interface Profile {
    // ppid, uid will be assigned at creation
    ppid: string;
    uid: string;
<<<<<<< HEAD
    providerName: string;
=======

    // will be assigned through form
    companyName?: string;
>>>>>>> development
    category?: Categories;
    companyEmail?: string;

    // will be assigned on the profile page itself
    serviceDescription?: string;
    email: string;
}

export enum Categories {
    venue, music, photo, catering, other
}
