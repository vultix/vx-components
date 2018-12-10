import {NgModule} from '@angular/core';
import {VxFormFieldModule} from './form-field';
import {VxRadioModule} from './radio';
import {VxMenuModule} from './menu';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule, VxMenuModule],
  exports: [VxFormFieldModule, VxRadioModule, VxMenuModule]
})
export class VxComponentsModule {

}
