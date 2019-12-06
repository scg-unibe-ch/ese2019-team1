import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {Categories, Profile} from '../../services/profile';
import {ImageHandlerService} from '../../services/image-handler.service';

@Component({
    selector: 'app-event-view',
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.scss'],
})
export class EventViewComponent implements OnInit, AfterViewInit {

    private events = new Array();

    private profiles = new Array<Profile>();
    private dataLoaded = false;

    private width;
    private aspectRatio;

    private ready;

    @Input() self: EventViewComponent;

    constructor(private profileHandler: ProfileHandlerService,
                private imageHander: ImageHandlerService
    ) {
        this.loadEvents();
    }


    ngOnInit() {
    }

    ngAfterViewInit() {
        this.reFit();
        this.selectService('');
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
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
        const events = document.getElementsByClassName('event');
        let i = 0;
        this.width = 100 / (Math.floor(this.aspectRatio + 1));
        for (i = 0; i < events.length; i++) {
            events[i].setAttribute('style', 'width: ' + this.width + '%;');
        }
    }

    public selectService(services) {
        if (services === '') {
            let i = 0;
            for (i = 0; i < this.events.length; i++) {
                this.events[i].show = true;
            }
        } else {
            let i = 0;
            for (i = 0; i < this.events.length; i++) {
                this.events[i].show = false;
            }
            let e = 0;
            for (e = 0; e < services.length; e++) {
                for (i = 0; i < this.events.length; i++) {
                    if (this.events[i].service as Categories === services[e] as Categories) {
                        this.events[i].show = true;
                    }
                }
            }
        }
    }

    /**
     * loads all profiles from database and converts them into events to be viewed in the feed page.
     */

     private async loadEvents() {
        await this.profileHandler.getAllProfiles().then(
            async res => {
                this.profiles = res;
            }).then(
            () => this.dataLoaded = true).then(
            async () => {
                let
                    i = 0;
                for (i = 0; i < this.profiles.length; i++) {
                    this.events.push({
                        ppid: this.profiles[i].ppid,
                        title: this.profiles[i].companyName,
                        text: this.profiles[i].serviceDescription,
                        image: this.profiles[i].mainImgID !== undefined ?
                            await this.imageHander.getImageURL(this.profiles[i].mainImgID) as string :
                            '',
                        service: Categories[this.profiles[i].category.valueOf()],
                        show: true
                    });
                }
            });
    }
}
