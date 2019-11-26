import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    @ViewChild('slides') slides: IonSlides;
    constructor(private router: Router) {
    }

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        updateAutoHeight: true,
    };

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
}

