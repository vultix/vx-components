import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Optional,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractVxStepComponent,
  AbstractVxStepperComponent,
  ErrorStateMatcher,
  VX_STEPPER_TOKEN
} from 'vx-components-base';

@Component({
  selector: 'vx-ns-step',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  providers: [{
    provide: ErrorStateMatcher,
    useExisting: forwardRef(() => VxNsStepComponent)
  }],
  // VX_STEP_INPUTS
  inputs: [
    'label', 'stepControl', 'invalid'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class VxNsStepComponent extends AbstractVxStepComponent {
  constructor(@SkipSelf() errorStateMatcher: ErrorStateMatcher, cdr: ChangeDetectorRef,
              @Inject(VX_STEPPER_TOKEN) @Optional() stepper: AbstractVxStepperComponent) {
    super(errorStateMatcher, cdr, stepper);

    if (!stepper) {
      throw new Error('Tried using a vx-ns-step outside of a vx-ns-stepper');
    }
  }
}
