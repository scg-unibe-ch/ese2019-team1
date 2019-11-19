import {Injectable} from '@angular/core';
import {AuthenticateService} from './authentication.service';
import {UserHandler} from './user-handler';
import {ProfileHandlerService} from './profile-handler.service';
import {Profile} from './profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileGuardService {

    constructor(private authService: AuthenticateService,
                private userhandler: UserHandler,
                private profilehandler: ProfileHandlerService) {
    }

    isProfileOwner(uid: string, ppid: string): boolean {
        let isOwner = false;
        this.userhandler.readUser(uid).then(
            user => {
                isOwner = (user.isProvider && user.ppid === ppid);
            },
            err => {
                isOwner = false;
            }
        );
        return isOwner;
    }


    getProfile(uid: string): Promise<Profile> {
        return new Promise<Profile>(
            (resolve, reject) => {
                let profile: Profile;
                this.userhandler.readUser(uid).then(
                    user => {
                        if (!user.isProvider) {
                            reject();
                        } else {
                            this.profilehandler.readProfile(user.ppid).then(
                                providerProfile => {
                                    profile = providerProfile as Profile;
                                },
                                err => reject(err)
                            );
                        }
                    });

                if (profile != null) {
                    resolve(profile);
                } else {
                    reject();
                }
            });
    }
}
