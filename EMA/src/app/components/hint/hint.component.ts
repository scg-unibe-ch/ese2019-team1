import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit {

  @Input() private text;
  @Input() private top;

  @Output() closed: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }
}
