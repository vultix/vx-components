import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxCheckboxRequiredValidatorDirective } from './vx-checkbox-required-validator.directive';
import { VxCheckboxComponent } from './vx-checkbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxCheckboxComponent, VxCheckboxRequiredValidatorDirective],
  exports: [VxCheckboxComponent, VxCheckboxRequiredValidatorDirective]
})
export class VxCheckboxModule {

}
