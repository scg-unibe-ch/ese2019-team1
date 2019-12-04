import {Component, Input, OnInit} from '@angular/core';
import {Categories, Profile} from '../../services/profile';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {ImageHandlerService} from '../../services/image-handler.service';

@Component({
    selector: 'app-admin-view',
    templateUrl: './admin-view.component.html',
    styleUrls: ['./admin-view.component.scss'],
})

export class AdminViewComponent implements OnInit {

    private adminEvents = [];
    private profiles = new Array<Profile>();
    private dataLoaded = false;
    @Input() self: AdminViewComponent;

    constructor(
        private profileHandler: ProfileHandlerService,
        private imageHandler: ImageHandlerService
    ) {
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

    ngOnInit() {
        this.loadEvents();
    }

}
