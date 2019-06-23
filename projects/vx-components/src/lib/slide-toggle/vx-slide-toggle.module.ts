import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxSlideToggleRequiredValidatorDirective } from './vx-slide-toggle-required-validator.directive';
import { VxSlideToggleComponent } from './vx-slide-toggle.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxSlideToggleComponent, VxSlideToggleRequiredValidatorDirective],
  exports: [VxSlideToggleComponent, VxSlideToggleRequiredValidatorDirective]
})
export class VxSlideToggleModule {

}
