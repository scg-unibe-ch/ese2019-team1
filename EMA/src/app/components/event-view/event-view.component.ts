import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
})
export class EventViewComponent implements OnInit {

  private events = new Array(2);

  constructor() {
    this.events = [
      {title: 'title_1', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im5_lowres.jpg'},
      {title: 'title_2', text: 'this is a text that needs to be shown on the card. It describes the event. This text will not' +
            'be rendered completely, since its way too long and would make this card much bigger than all the others. Therefor' +
            'only the first two lines are rendered.',
        image: '/assets/images/im7_lowres.jpg'},
      {title: 'title_3', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg'},
      {title: 'title_4', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg'},
      {title: 'title_5', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg'},
      {title: 'title_6', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg'},
      {title: 'title_7', text: 'this is a text that needs to be shown on the card. It describes the event.',
        image: '/assets/images/im7_lowres.jpg'}
    ];
  }

  ngOnInit() {}

}
