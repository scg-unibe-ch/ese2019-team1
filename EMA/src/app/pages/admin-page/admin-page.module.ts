import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AdminPagePage} from './admin-page.page';
import {AdminComponent} from '../../components/admin/admin.component';
import {AdminViewComponent} from '../../components/admin-view/admin-view.component';

const routes: Routes = [
    {
        path: '',
        component: AdminPagePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    exports: [AdminViewComponent, AdminComponent],
    declarations: [AdminPagePage, AdminComponent, AdminViewComponent]
})
export class AdminPagePageModule {
}
