import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SettingsPage} from './settings.page';
import {AuthenticateService} from '../../services/authentication.service';

import {ComponentsModules} from '../../components/components.modules';

const routes: Routes = [
    {
        path: '',
        component: SettingsPage,
        children: [
            {
                path: 'signupprovider'
            },
            {
                path: 'admin-page'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModules,
        RouterModule.forChild(routes)
    ],
    declarations: [SettingsPage],
    providers: [AuthenticateService]
})
export class SettingsPageModule {
}
