import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-provider-profile',
    templateUrl: './provider-profile.page.html',
    styleUrls: ['./provider-profile.page.scss'],
})

export class ProviderProfilePage implements OnInit {

    tempOwnerDescription;
    ownerDescription;
    tempServiceDescription;
    serviceDescription;
    clickedOwner = false;
    clickedService = false;
    ownerButtonContent: string;
    serviceButtonContent: string;

    constructor() {
    }

    ngOnInit() {
        this.ownerButtonContent = 'Edit';
        this.serviceButtonContent = 'Edit';
    }

    editOwner() {
        this.clickedOwner = !this.clickedOwner;
        if (this.ownerButtonContent === 'Edit') {
            this.ownerButtonContent = 'Save';
        } else if (this.ownerButtonContent === 'Save') {
            this.ownerButtonContent = 'Edit';
            this.ownerDescription = this.tempOwnerDescription;
        }
    }

    editService() {
        this.clickedService = !this.clickedService;
        if (this.serviceButtonContent === 'Edit') {
            this.serviceButtonContent = 'Save';
        } else if (this.serviceButtonContent === 'Save') {
            this.serviceButtonContent = 'Edit';
            this.serviceDescription = this.tempServiceDescription;
        }
    }
}
