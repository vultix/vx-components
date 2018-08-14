import {AfterViewChecked, Directive, ElementRef, Inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {VxStepperComponent} from './stepper.component';
import {STEPPER_TOKEN} from './stepper.token';

export interface IVxStepperComponent extends VxStepperComponent {

}

@Directive({
  selector: '[vxStepperPrevious], [vxStepperBack]',
  host: {
    '(click)': '_stepper.previous()'
  }
})
export class VxStepperPreviousDirective {
  constructor(@Inject(STEPPER_TOKEN) public _stepper: IVxStepperComponent) {
  }
}

@Directive({
  selector: '[vxStepperNext]',
  host: {
    '(click)': '_stepper.next()'
  }
})
export class VxStepperNextDirective {
  constructor(@Inject(STEPPER_TOKEN) public _stepper: IVxStepperComponent) {
  }
}

@Directive({
  selector: 'ng-template[vxStepLabel]'
})
export class VxStepLabelDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
