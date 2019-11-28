import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {Profile} from '../../services/profile';
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

    @Input() self: EventViewComponent;

    constructor(private profileHandler: ProfileHandlerService,
                private imageHander: ImageHandlerService
    ) {
        this.loadEvents();
        /*this.events = [
              {
                  title: 'title_1', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im5_lowres.jpg', service: 'photo', show: this.dataLoaded
              },
              {
                  title: 'title_2', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im7_lowres.jpg', service: 'other', show: this.dataLoaded
              },
              {
                  title: 'title_3', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im7_lowres.jpg', service: 'music', show: this.dataLoaded
              },
              {
                  title: 'title_4', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im7_lowres.jpg', service: 'photo', show: this.dataLoaded
              },
              {
                  title: 'title_5', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im7_lowres.jpg', service: 'music', show: this.dataLoaded
              },
              {
                  title: 'title_6', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im7_lowres.jpg', service: 'venue', show: this.dataLoaded
              },
              {
                  title: 'title_7', text: 'this is a text that needs to be shown on the card. It describes the event.',
                  image: '/assets/images/im7_lowres.jpg', service: 'venue', show: this.dataLoaded
              }
          ];*/
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

  /**
   * loads all profiles from database and converts them into events to be viewed in the feed page.
   */

  private loadEvents() {
        this.profileHandler.getAllProfiles().then(
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
                        service: this.profiles[i].category,
                        show: true
                    });
                }

            });
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
                    if (this.events[i].service === services[e]) {
                        this.events[i].show = true;
                    }
                }
            }
        }
    }
}
