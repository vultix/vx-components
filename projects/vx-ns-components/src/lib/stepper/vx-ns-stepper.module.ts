import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsVerticalExpanderModule } from '../vertical-expander/vx-ns-vertical-expander.module';
import { VxNsStepBodyComponent } from './step-body/vx-ns-step-body.component';
import { VxNsStepHeaderComponent } from './step-header/vx-ns-step-header.component';
import { VxNsStepComponent } from './vx-ns-step.component';
import { VxNsStepperComponent } from './vx-ns-stepper.component';

@NgModule({
  imports: [CommonModule, VxNsVerticalExpanderModule],
  declarations: [VxNsStepBodyComponent, VxNsStepHeaderComponent, VxNsStepComponent, VxNsStepperComponent],
  exports: [VxNsStepComponent, VxNsStepperComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsStepperModule {

}
