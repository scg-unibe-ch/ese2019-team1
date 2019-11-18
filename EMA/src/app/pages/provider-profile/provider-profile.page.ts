import {Component, OnInit} from '@angular/core';
import {ImageHandlerService} from '../../services/image-handler.service';
import {Img} from '../../services/img';
import {ProfileHandlerService} from '../../services/profile-handler.service';

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
    inputFile: Img;

    constructor(private profileHandlerService: ProfileHandlerService) {
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

    addProfilePicture(imageInput: any) {
        console.log(imageInput.files[0]);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {

            this.inputFile = new Img(file);

            this.profileHandlerService.addMainImage( new Profile() , this.inputFile).then(
                (res) => { console.log(res);

                },
                (err) => {
                    console.log(err);
                });
        });

        reader.readAsDataURL(file);
    }
}
