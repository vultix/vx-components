import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxNsRadioButtonComponent} from './vx-ns-radio-button.component';
import {VxNsRadioGroupComponent} from './vx-ns-radio-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsRadioButtonComponent, VxNsRadioGroupComponent],
  exports: [VxNsRadioButtonComponent, VxNsRadioGroupComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsRadioModule {

}
