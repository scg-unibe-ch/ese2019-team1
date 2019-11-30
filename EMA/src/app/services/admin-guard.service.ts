import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserHandler} from './user-handler';
import {AuthenticateService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

    constructor(
        private userHandler: UserHandler,
        private authService: AuthenticateService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>(
            async (resolve) => {
              const uid = this.authService.afAuth.auth.currentUser.uid;
              await this.userHandler.readUser(uid).then(
                  usr => {
                    resolve(usr.isAdmin === true);
                  },
              );
            }
        );
    }
}
