import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {Categories, Profile} from '../../services/profile';
import {User} from '../../services/user';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {ImageHandlerService} from '../../services/image-handler.service';
import {UserHandler} from '../../services/user-handler';

@Component({
    selector: 'app-admin-view',
    templateUrl: './admin-view.component.html',
    styleUrls: ['./admin-view.component.scss'],
})

export class AdminViewComponent implements OnInit, AfterViewInit {

    private adminEvents = new Array();
    private adminUsers = new Array();

    private profiles = new Array<Profile>();
    private users = new Array<User>();
    private dataLoaded = false;
    private dataLoad = false;

    private width;
    private aspectRatio;

    @Input() self: AdminViewComponent;

    constructor(
        private profileHandler: ProfileHandlerService,
        private imageHandler: ImageHandlerService,
        private userHandler: UserHandler
    ) {
        this.loadEvents();
        this.loadUsers();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.reFit();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.reFit();
    }

 /*   @HostListener('window:resize', ['$user'])
    onResized(user) {
        this.reFit();
    }
*/
    afterNgFor(last: boolean) {
        if (last) {
            this.reFit();
        }
    }

    private reFit() {
        const screenWidth = self.innerWidth;
        const screenHeight = self.innerHeight;
        this.aspectRatio = screenWidth / screenHeight;
        const events = document.getElementsByClassName('event');
        let i = 0;
        this.width = 100 / (Math.floor(this.aspectRatio + 1));
        for (i = 0; i < events.length; i++) {
            events[i].setAttribute('style', 'width: ' + this.width + '%;');
        }
        const users = document.getElementsByClassName('users');
        let j = 0;
        this.width = 100 / (Math.floor(this.aspectRatio + 1));
        for (j = 0; j < users.length; j++) {
            users[j].setAttribute('style', 'width: ' + this.width + '%;');
        }
    }

    private loadEvents() {
        this.profileHandler.getAllProfiles(false).then(
            async res => {
                this.profiles = res;
            }).then(
            () => this.dataLoaded = true).then(
            async () => {
                let
                    i = 0;
                for (i = 0; i < this.profiles.length; i++) {
                    this.adminEvents.push({
                        ppid: this.profiles[i].ppid,
                        title: this.profiles[i].companyName,
                        text: this.profiles[i].serviceDescription,
                        image: this.profiles[i].mainImgID !== undefined ?
                            await this.imageHandler.getImageURL(this.profiles[i].mainImgID) as string :
                            '',
                        service: Categories[this.profiles[i].category],
                        show: true
                    });
                }
            });
    }

    private loadUsers() {
        this.userHandler.getAllUserProfiles(false).then(
            async res => {
                this.users = res;
            }).then(
            () => this.dataLoad = true).then(
            async () => {
                let
                    i = 0;
                for (i = 0; i < this.users.length; i++) {
                    this.adminUsers.push({
                        uid: this.users[i].uid,
                        name: this.users[i].name,
                        username: this.users[i].username,
                        show: true
                    });
                }
            });
    }
}
