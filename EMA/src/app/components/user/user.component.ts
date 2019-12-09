import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

    @Input() user;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    getService() {
        return this.user.service;
    }
//TODO: navigate to what?
    async navigateTo() {
        await this.router.navigate(['home/user-profile/', this.user.uid.toString()]);
    }
}
