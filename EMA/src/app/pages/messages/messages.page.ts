import { Component, OnInit } from '@angular/core';
import { IonContent} from '@ionic/angular';
import { ViewChild} from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor() {
  }
  messages = [
    {
      user: 'simon',
      createdAt: 1554090856000,
      msg: 'Hey whats up?'
    },
    {
      user: 'tina',
      createdAt: 1554090856000,
      msg: 'Trying to make the messangerfkt work. You?'
    },
    {
      user: 'simon',
      createdAt: 1554090856000,
      msg: 'Doing everything else'
    },
  ];
  currentUser = 'simon';
  newMsg = '';
  // @ts-ignore
  @ViewChild(IonContent) content: IonContent;
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  sendMessage() {
    this.messages.push({
      user: 'simon',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }
}


