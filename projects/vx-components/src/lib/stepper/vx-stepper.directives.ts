import { Directive, HostListener, Inject } from '@angular/core';
import { VX_STEPPER_TOKEN } from 'vx-components-base';
import { VxStepperComponent } from './vx-stepper.component';

@Directive({selector: '[vxStepperNext]'})
export class VxStepperNextDirective {
  stepper: VxStepperComponent;
  constructor(@Inject(VX_STEPPER_TOKEN) stepper?: VxStepperComponent) {
    if (!stepper) {
      throw new Error('Found a vxStepperNext outside of a vx-stepper.')
    }
    this.stepper = stepper;
  }

  @HostListener('click')
  handleClick() {
    this.stepper.selectedStep++;
  }
}


@Directive({selector: '[vxStepperPrevious]'})
export class VxStepperPreviousDirective {
  stepper: VxStepperComponent;
  constructor(@Inject(VX_STEPPER_TOKEN) stepper?: VxStepperComponent) {
    if (!stepper) {
      throw new Error('Found a vxStepperPrevious outside of a vx-stepper.')
    }
    this.stepper = stepper;
  }

  @HostListener('click')
  handleClick() {
    this.stepper.selectedStep--;
  }
}
