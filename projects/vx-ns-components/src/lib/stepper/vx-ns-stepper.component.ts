import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, forwardRef,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxStepperComponent, VX_STEPPER_TOKEN } from 'vx-components-base';
import { VxNsStepComponent } from './vx-ns-step.component';

@Component({
  selector: 'StackLayout[vx-ns-stepper]',
  templateUrl: 'vx-ns-stepper.component.html',
  styleUrls: ['vx-ns-stepper.component.scss'],
  providers: [{
    provide: VX_STEPPER_TOKEN,
    useExisting: forwardRef(() => VxNsStepperComponent)
  }],
  // VX_STEPPER_INPUTS
  inputs: [
    'linear', 'selectedStep'
  ],
  // VX_STEPPER_OUTPUTS:
  outputs: ['selectedStepChange'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-ns-stepper'
  }
})

export class VxNsStepperComponent extends AbstractVxStepperComponent {
  @ContentChildren(VxNsStepComponent)
  _steps!: QueryList<VxNsStepComponent>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
