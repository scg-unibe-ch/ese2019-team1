import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {Profile} from '../../services/profile';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
})
export class EventViewComponent implements OnInit, AfterViewInit {

  private events = new Array();

  private profiles = new Array<Profile>();

  private width;
  private aspectRatio;

  @Input() self: EventViewComponent;

  constructor(private profileHandler: ProfileHandlerService) {
    this.events = [
      {title: 'title_1', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im5_lowres.jpg', service: 'photo', show: true},
      {title: 'title_2', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'other', show: true},
      {title: 'title_3', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'music', show: true},
      {title: 'title_4', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'photo', show: true},
      {title: 'title_5', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'music', show: true},
      {title: 'title_6', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'venue', show: true},
      {title: 'title_7', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'venue', show: true}
    ];
    this.getProfiles();
  }

  private async getProfiles() {
      await this.profileHandler.getAllProfiles().then(res => this.profiles = res);
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

  private loadProfileDataInArray() {
      let i = 0;
      for (i = 0; i < this.profiles.length; i++) {
          this.events.push({title: this.profiles[i].companyName,
              text: this.profiles[i].serviceDescription,
              image: this.profiles[i].secondaryImgIDs,
              service: this.profiles[i].category,
              show: true});
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
          if (this.events[i].service === services[e]) {
            this.events[i].show = true;
          }
        }
      }
    }
  }
}
