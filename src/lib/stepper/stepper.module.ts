import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxStepperComponent} from './stepper.component';
import {VxStepComponent} from './step.component';
import {VxStepHeaderComponent} from './step-header/step-header.component';
import {VxBindOffsetHeightDirective, VxStepperNextDirective, VxStepperPreviousDirective} from './stepper.directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxStepperComponent, VxStepComponent, VxStepperNextDirective, VxStepperPreviousDirective,
    VxBindOffsetHeightDirective, VxStepHeaderComponent],
  exports: [VxStepperComponent, VxStepComponent, VxStepperNextDirective, VxStepperPreviousDirective]
})
export class VxStepperModule {
}