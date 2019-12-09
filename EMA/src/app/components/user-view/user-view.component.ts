import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {User} from '../../services/user';
import {ImageHandlerService} from '../../services/image-handler.service';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, AfterViewInit {

    private users = new Array();

    private users = new Array<User>();
    private dataLoaded = false;

    private width;
    private aspectRatio;

    @Input() self: UserViewComponent;

    constructor(private userHandler: ProfileHandlerService,
    ) {
        this.loadUsers();
    }


    ngOnInit() {
    }

    ngAfterViewInit() {
        this.reFit();
        this.selectService('');
    }

    @HostListener('window:resize', ['$user'])
    onResize(user) {
        this.reFit();
    }

    afterNgFor(last: boolean) {
        if (last) {
            this.reFit();
        }
    }

    private reFit() {
        const screenWidth = self.innerWidth;
        const screenHeight = self.innerHeight;
        this.aspectRatio = screenWidth / screenHeight;
        const users = document.getElementsByClassName('user');
        let i = 0;
        this.width = 100 / (Math.floor(this.aspectRatio + 1));
        for (i = 0; i < users.length; i++) {
            users[i].setAttribute('style', 'width: ' + this.width + '%;');
        }
    }

    public selectService(services) {
        if (services === '') {
            let i = 0;
            for (i = 0; i < this.users.length; i++) {
                this.users[i].show = true;
            }
        } else {
            let i = 0;
            for (i = 0; i < this.users.length; i++) {
                this.users[i].show = false;
            }
            let e = 0;
            for (e = 0; e < services.length; e++) {
                for (i = 0; i < this.users.length; i++) {
                    if (this.users[i].service as Categories === services[e] as Categories) {
                        this.users[i].show = true;
                    }
                }
            }
        }
    }

    /**
     * loads all profiles from database and converts them into users to be viewed in the feed page.
     */

    private async loadUsers() {
        await this.userHandler.getAllUserProfiles().then(
            async res => {
                this.users = res;
            }).then(
            () => this.dataLoaded = true).then(
            async () => {
                let
                    i = 0;
                for (i = 0; i < this.users.length; i++) {
                    this.users.push({
                        ppid: this.users[i].ppid,
                        name: this.users[i].name,
                        username: this.users[i].username,
                    });
                }
            });
    }
}
