import * as tslib_1 from "tslib";
import { Component, HostListener, Input } from '@angular/core';
import { ProfileHandlerService } from '../../services/profile-handler.service';
import { Categories } from '../../services/profile';
import { ImageHandlerService } from '../../services/image-handler.service';
let EventViewComponent = class EventViewComponent {
    constructor(profileHandler, imageHander) {
        this.profileHandler = profileHandler;
        this.imageHander = imageHander;
        this.events = new Array();
        this.profiles = new Array();
        this.dataLoaded = false;
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
  ng                 title: 'title_7', text: 'this is a text that needs to be shown on the card. It describes the event.',
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
    onResize(event) {
        this.reFit();
    }
    reFit() {
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
    selectService(services) {
        if (services === '') {
            let i = 0;
            for (i = 0; i < this.events.length; i++) {
                this.events[i].show = true;
            }
        }
        else {
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
    /**
     * loads all profiles from database and converts them into events to be viewed in the feed page.
     */
    loadEvents() {
        this.profileHandler.getAllProfiles().then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.profiles = res;
        })).then(() => this.dataLoaded = true).then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let i = 0;
            for (i = 0; i < this.profiles.length; i++) {
                this.events.push({
                    ppid: this.profiles[i].ppid,
                    title: this.profiles[i].companyName,
                    text: this.profiles[i].serviceDescription,
                    image: this.profiles[i].mainImgID !== undefined ?
                        yield this.imageHander.getImageURL(this.profiles[i].mainImgID) :
                        '',
                    service: Categories[this.profiles[i].category.valueOf()],
                    show: true
                });
            }
        }));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", EventViewComponent)
], EventViewComponent.prototype, "self", void 0);
tslib_1.__decorate([
    HostListener('window:resize', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EventViewComponent.prototype, "onResize", null);
EventViewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-event-view',
        templateUrl: './event-view.component.html',
        styleUrls: ['./event-view.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ProfileHandlerService,
        ImageHandlerService])
], EventViewComponent);
export { EventViewComponent };
//# sourceMappingURL=event-view.component.js.map