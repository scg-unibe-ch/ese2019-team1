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

    isProfileOwner(uid: string, ppid: string): Promise<boolean> {
        return new Promise<boolean>(
            async (resolve, reject) => {
                await this.userHandler.readUser(uid).then(
                    user => {
                        if (user.isProvider.valueOf() && user.ppid === ppid) {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    },
                    err => reject(false)
                );

            });
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
