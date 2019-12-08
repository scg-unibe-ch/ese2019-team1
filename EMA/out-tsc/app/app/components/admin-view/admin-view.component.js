import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Categories } from '../../services/profile';
import { ProfileHandlerService } from '../../services/profile-handler.service';
import { ImageHandlerService } from '../../services/image-handler.service';
let AdminViewComponent = class AdminViewComponent {
    constructor(profileHandler, imageHandler) {
        this.profileHandler = profileHandler;
        this.imageHandler = imageHandler;
        this.adminEvents = [];
        this.profiles = new Array();
        this.dataLoaded = false;
    }
    loadEvents() {
        this.profileHandler.getAllProfiles(false).then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.profiles = res;
        })).then(() => this.dataLoaded = true).then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let i = 0;
            for (i = 0; i < this.profiles.length; i++) {
                this.adminEvents.push({
                    ppid: this.profiles[i].ppid,
                    title: this.profiles[i].companyName,
                    text: this.profiles[i].serviceDescription,
                    image: this.profiles[i].mainImgID !== undefined ?
                        yield this.imageHandler.getImageURL(this.profiles[i].mainImgID) :
                        '',
                    service: Categories[this.profiles[i].category.valueOf()],
                    show: true
                });
            }
        }));
    }
    ngOnInit() {
        this.loadEvents();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", AdminViewComponent)
], AdminViewComponent.prototype, "self", void 0);
AdminViewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin-view',
        templateUrl: './admin-view.component.html',
        styleUrls: ['./admin-view.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ProfileHandlerService,
        ImageHandlerService])
], AdminViewComponent);
export { AdminViewComponent };
//# sourceMappingURL=admin-view.component.js.map