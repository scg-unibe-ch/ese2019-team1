import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticateService} from './authentication.service';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


    constructor(
        private AuthService: AuthenticateService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.AuthService.isAuthenticated.pipe();
    }
}
