import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
let WelcomePage = class WelcomePage {
    constructor(router) {
        this.router = router;
        this.slideOpts = {
            initialSlide: 0,
            speed: 400,
            updateAutoHeight: true,
        };
    }
    ngOnInit() {
    }
    navigateToLoginPage() {
        this.router.navigate(['/login']);
    }
    nextSlide() {
        this.slides.slideNext();
    }
    prevSlide() {
        this.slides.slidePrev();
    }
};
tslib_1.__decorate([
    ViewChild('slides'),
    tslib_1.__metadata("design:type", IonSlides)
], WelcomePage.prototype, "slides", void 0);
WelcomePage = tslib_1.__decorate([
    Component({
        selector: 'app-welcome',
        templateUrl: './welcome.page.html',
        styleUrls: ['./welcome.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], WelcomePage);
export { WelcomePage };
//# sourceMappingURL=welcome.page.js.map