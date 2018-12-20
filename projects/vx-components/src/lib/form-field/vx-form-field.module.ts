import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxFormFieldComponent } from './vx-form-field.component';
import { VxFormFieldDirective } from './vx-form-field.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [VxFormFieldComponent, VxFormFieldDirective],
  exports: [VxFormFieldComponent, VxFormFieldDirective]
})
export class VxFormFieldModule {

}
