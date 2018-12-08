import {NgModule} from '@angular/core';
import {VxNsFormFieldModule} from './form-field';
import {VxNsRadioModule} from './radio';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule]
})
export class VxNsComponentsModule {

}
