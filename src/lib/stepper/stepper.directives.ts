import {Directive} from '@angular/core';
import {VxStepperComponent} from './stepper.component';
import {TabbableController} from '../shared/tab-controller';
import {VxStepComponent} from './step.component';

@Directive({
  selector: '[vxStepperPrevious], [vxStepperBack]',
  host: {
    '(click)': '_stepper.previous()'
  }
})
export class VxStepperPreviousDirective {
  constructor(public _stepper: TabbableController<VxStepComponent>) {
  }
}

@Directive({
  selector: '[vxStepperNext]',
  host: {
    '(click)': '_stepper.next()'
  }
})
export class VxStepperNextDirective {
  constructor(public _stepper: TabbableController<VxStepComponent>) {
  }
}
