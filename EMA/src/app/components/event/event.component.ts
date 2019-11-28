import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input() event;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  getService() {
    return this.event.service;
  }

  navigateTo() {
  }
}
