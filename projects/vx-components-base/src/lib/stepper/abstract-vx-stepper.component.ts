import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { clampNumber } from '../shared';
import { AbstractVxStepComponent } from './abstract-vx-step.component';

// VX_STEPPER_INPUTS: 'linear', 'selectedStep'
// VX_STEPPER_OUTPUTS: 'selectedStepChange'
export abstract class AbstractVxStepperComponent implements AfterContentInit {
  abstract _steps: QueryList<AbstractVxStepComponent>;

  // @Output()
  readonly selectedStepChange = new EventEmitter<number>();

  protected _linear = false;
  protected _selectedStep = -1;
  constructor(protected cdr: ChangeDetectorRef) {
  }


  // @Input()
  get linear(): boolean {
    return this._linear;
  }

  set linear(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this.linear) {
      this._linear = value;
      this.cdr.markForCheck();
    }
  }

  // @Input()
  get selectedStep(): number {
    return this._selectedStep;
  }

  set selectedStep(stepIdx: number) {
    stepIdx = clampNumber(+stepIdx || 0, 0, this._steps ? this._steps.length - 1 : 0);

    if (this._steps) {
      const steps = this._steps.toArray();
      const step = steps[stepIdx];
      const oldStep = steps[this.selectedStep];

      if (this.selectedStep !== stepIdx) {
        if (oldStep) {
          oldStep.userLeftStep = true;
        }

        if (!step || this._shouldDisable(step)) {
          return;
        }

        this._selectedStep = stepIdx;
        this.selectedStepChange.emit(stepIdx);
        step.userSeenStep = true;
        this.cdr.markForCheck();
      }
    }
  }


  /**
   * Walks through the steps to see if we can go on to the step requested.
   */
  _shouldDisable(stepToCheck: AbstractVxStepComponent): boolean {
    // We only disable steps if linear is true.
    if (!this.linear) {
      return false;
    }

    const steps = this._steps.toArray();
    for (const step of steps) {
      if (step === stepToCheck) {
        return false;
      } else if (!step.isValid()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Called by the steps when something about them changes so I can recheck
   */
  _markForCheck(): void {
    this.cdr.markForCheck();
  }

  ngAfterContentInit(): void {
    this.selectedStep = 0;
  }

}
