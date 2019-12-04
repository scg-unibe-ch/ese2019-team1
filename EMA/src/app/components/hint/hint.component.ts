import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit, AfterViewInit {

  @Input() private text;
  @Input() private top;

  @Output() closed: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //document.getElementById('hintCard').style.top = this.top;
  }
}
