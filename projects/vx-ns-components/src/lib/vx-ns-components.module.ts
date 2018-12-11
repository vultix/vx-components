import {NgModule} from '@angular/core';
import {VxNsFormFieldModule} from './form-field';
import {VxNsRadioModule} from './radio';
import {VxNsMenuModule} from './menu/vx-ns-menu.module';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule]
})
export class VxNsComponentsModule {

}
