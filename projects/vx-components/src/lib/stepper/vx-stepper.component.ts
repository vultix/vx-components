import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, forwardRef, Input,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxStepperComponent, VX_STEPPER_TOKEN, coerceBooleanProperty } from 'vx-components-base';
import { VxStepComponent } from './vx-step.component';

@Component({
  selector: 'vx-stepper',
  templateUrl: 'vx-stepper.component.html',
  styleUrls: ['vx-stepper.component.scss'],
  providers: [{
    provide: VX_STEPPER_TOKEN,
    useExisting: forwardRef(() => VxStepperComponent)
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-stepper',
    '[class.vx-horizontal-stepper]': '!vertical',
    '[class.vx-stepper-vertical]': 'vertical'
  }
})

export class VxStepperComponent extends AbstractVxStepperComponent {
  @ContentChildren(VxStepComponent)
  _steps!: QueryList<VxStepComponent>;

  private _vertical = false;
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  @Input()
  set vertical(vertical: boolean) {
    vertical = coerceBooleanProperty(vertical);
    if (vertical !== this.vertical) {
      this._vertical = vertical;
      this.cdr.markForCheck();
    }
  }
  get vertical(): boolean {
    return this._vertical;
  }
}
