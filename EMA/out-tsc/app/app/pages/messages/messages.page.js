import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
let MessagesPage = class MessagesPage {
    constructor() {
        this.messages = [
            {
                user: 'simon',
                createdAt: 1554090856000,
                msg: 'Hey whats up?'
            },
            {
                user: 'tina',
                createdAt: 1554090856000,
                msg: 'Nothing much. Just working on this site. You?'
            },
            {
                user: 'simon',
                createdAt: 1554090856000,
                msg: 'Same same'
            },
        ];
        this.currentUser = 'simon';
        this.newMsg = '';
    }
    ngOnInit() {
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
};
tslib_1.__decorate([
    ViewChild(IonContent),
    tslib_1.__metadata("design:type", IonContent)
], MessagesPage.prototype, "content", void 0);
MessagesPage = tslib_1.__decorate([
    Component({
        selector: 'app-messages',
        templateUrl: './messages.page.html',
        styleUrls: ['./messages.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], MessagesPage);
export { MessagesPage };
//# sourceMappingURL=messages.page.js.map