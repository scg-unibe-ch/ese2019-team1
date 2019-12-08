import { NgModule } from '@angular/core';
import { HintComponent } from './hint/hint.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [HintComponent],
    imports: [
        IonicModule
    ],
    exports: [HintComponent]
})
export class ComponentsModules {
}
