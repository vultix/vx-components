import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Optional, SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractVxStepComponent,
  AbstractVxStepperComponent,
  ErrorStateMatcher,
  VX_STEPPER_TOKEN
} from 'vx-components-base';

@Component({
  selector: 'vx-step',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  providers: [{
    provide: ErrorStateMatcher,
    useExisting: forwardRef(() => VxStepComponent)
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class VxStepComponent extends AbstractVxStepComponent {
  constructor(@SkipSelf() errorStateMatcher: ErrorStateMatcher, cdr: ChangeDetectorRef,
              @Inject(VX_STEPPER_TOKEN) @Optional() stepper: AbstractVxStepperComponent) {
    super(errorStateMatcher, cdr, stepper);

    if (!stepper) {
      throw new Error('Tried using a vx-step outside of a vx-stepper');
    }
  }
}
