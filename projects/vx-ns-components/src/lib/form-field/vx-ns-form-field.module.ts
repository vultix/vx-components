import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxNsFormFieldComponent} from './vx-ns-form-field.component';
import {VxNsFormFieldDirective} from './vx-ns-form-field.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsFormFieldComponent, VxNsFormFieldDirective],
  exports: [VxNsFormFieldComponent, VxNsFormFieldDirective],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsFormFieldModule {

}
