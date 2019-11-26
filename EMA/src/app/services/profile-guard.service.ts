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
                private userHandler: UserHandler,
                private profileHandler: ProfileHandlerService) {
    }

    isProfileOwner(uid: string, ppid: string): boolean {
        let isOwner = false;
        this.userHandler.readUser(uid).then(
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
                this.userHandler.readUser(uid).then(
                    user => {
                        if (!user.isProvider) {
                            reject();
                        } else {
                            this.profileHandler.readProfile(user.ppid).then(
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
