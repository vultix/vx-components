import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxPagerModule } from '../pager/vx-pager.module';
import { VxVerticalExpanderModule } from '../vertical-expander/vx-vertical-expander.module';
import { VxStepHeaderComponent } from './step-header/vx-step-header.component';
import { VxStepComponent } from './vx-step.component';
import { VxStepperComponent } from './vx-stepper.component';

@NgModule({
  imports: [CommonModule, VxPagerModule, VxVerticalExpanderModule],
  declarations: [VxStepperComponent, VxStepComponent, VxStepHeaderComponent],
  exports: [VxStepperComponent, VxStepComponent]
})
export class VxStepperModule {
}