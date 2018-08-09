import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxStepperComponent} from './stepper.component';
import {VxStepComponent} from './step.component';
import {VxStepHeaderComponent} from './step-header/step-header.component';
import {VxStepLabelDirective, VxStepperNextDirective, VxStepperPreviousDirective} from './stepper.directives';
import {VxPagerModule} from '../pager';

@NgModule({
  imports: [
    CommonModule,
    VxPagerModule
  ],
  declarations: [VxStepperComponent, VxStepComponent, VxStepperNextDirective, VxStepperPreviousDirective,
    VxStepHeaderComponent, VxStepLabelDirective],
  exports: [VxStepperComponent, VxStepComponent, VxStepperNextDirective, VxStepperPreviousDirective, VxStepLabelDirective]
})
export class VxStepperModule {
}
