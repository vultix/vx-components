import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxStepperComponent} from './stepper.component';
import {VxStepComponent} from './step.component';
import {VxStepHeaderComponent} from './step-header/step-header.component';
import {VxBindOffsetHeightDirective, VxStepLabelDirective, VxStepperNextDirective, VxStepperPreviousDirective} from './stepper.directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxStepperComponent, VxStepComponent, VxStepperNextDirective, VxStepperPreviousDirective,
    VxBindOffsetHeightDirective, VxStepHeaderComponent, VxStepLabelDirective],
  exports: [VxStepperComponent, VxStepComponent, VxStepperNextDirective, VxStepperPreviousDirective, VxStepLabelDirective]
})
export class VxStepperModule {
}
