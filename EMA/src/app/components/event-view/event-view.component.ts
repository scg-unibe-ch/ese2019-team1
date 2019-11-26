import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
})
export class EventViewComponent implements OnInit {

  private events = new Array();
  private eventsShown = new Array();

  private width;
  private height;
  private aspectRatio;

  private columns = new Array();

  private services = new Array();

  @Input() self: EventViewComponent;

  constructor() {
    this.events = [
      {title: 'title_1', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im5_lowres.jpg', service: 'photo'},
      {title: 'title_2', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'other'},
      {title: 'title_3', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'music'},
      {title: 'title_4', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'photo'},
      {title: 'title_5', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'music'},
      {title: 'title_6', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'venue'},
      {title: 'title_7', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg', service: 'venue'}
    ];
    this.reFit();
    this.selectService('');
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reFit();
  }

  reFit() {
    this.width = self.innerWidth;
    this.height = self.innerHeight;
    this.aspectRatio = this.width / this.height;
    const events = document.getElementsByClassName('event');
    let i = 0;
    const eventWidth = 100 / (Math.floor(this.aspectRatio + 1));
    for (i = 0; i < events.length; i++) {
      events[i].setAttribute('style', 'width: ' + eventWidth + '%;');
    }
  }

  public selectService(services) {
    this.eventsShown = new Array();
    if (services === '') {
      let i = 0;
      for (i = 0; i < this.events.length; i++) {
        this.eventsShown.push(this.events[i]);
      }
    } else {
      let e = 0;
      for (e = 0; e < services.length; e++) {
        let i = 0;
        for (i = 0; i < this.events.length; i++) {
          if (this.events[i].service === services[e]) {
            this.eventsShown.push(this.events[i]);
          }
        }
      }
    }
  }
}
