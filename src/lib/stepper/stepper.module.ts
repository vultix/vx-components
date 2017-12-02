import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxStepperComponent} from './stepper.component';
import {VxStepComponent} from './step.component';
import {VxStepHeaderComponent} from './step-header/step-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxStepperComponent, VxStepComponent, VxStepHeaderComponent],
  exports: [VxStepperComponent, VxStepComponent]
})
export class VxStepperModule {
}
