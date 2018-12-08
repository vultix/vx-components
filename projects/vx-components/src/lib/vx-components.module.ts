import {NgModule} from '@angular/core';
import {VxFormFieldModule} from './form-field';
import {VxRadioModule} from './radio';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule],
  exports: [VxFormFieldModule, VxRadioModule]
})
export class VxComponentsModule {

}
