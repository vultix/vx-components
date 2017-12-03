import {AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {VxStepComponent} from './step.component';
import {TabbableController} from '../shared/tab-controller';
import {coerceBooleanProperty} from '../shared/util';

@Component({
  selector: 'vx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: TabbableController, useExisting: VxStepperComponent}]
})
export class VxStepperComponent extends TabbableController<VxStepComponent> implements AfterContentInit {
  @ContentChildren(VxStepComponent) steps: QueryList<VxStepComponent>;

  private _linear = false;

  @Input()
  get linear(): boolean {
    return this._linear;
  }

  set linear(value: boolean) {
    this._linear = coerceBooleanProperty(value);
  }

  private _vertical = false;

  @Input()
  get vertical(): boolean {
    return this._vertical;
  }

  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  next(): void {
    if (this.selectedIndex < this.steps.length - 1) {
      this.selectStep(this.selectedIndex + 1);
    }
  }

  previous(): void {
    if (this.selectedIndex > 0) {
      this.selectStep(this.selectedIndex - 1);
    }
  }

  ngAfterContentInit(): void {
    this.setTabbables(this.steps);
  }

  selectStep(stepIdx: number): void {
    const step = this.steps.toArray()[stepIdx];
    if (!this.shouldDisable(step, true))
      this.setSelectedIndex(stepIdx);
  }

  /** @--internal */
  shouldDisable(curStep: VxStepComponent, markAsTouched = false): boolean {
    const steps = this.steps.toArray();
    for (const step of steps) {
      if (step === curStep)
        return false;
      else {
        if (markAsTouched)
          step.markAsTouched();

        if (this.linear && !step.valid())
          return true;
      }
    }
    return false;
  }
}
