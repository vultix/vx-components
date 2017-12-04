import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {VxStepComponent} from './step.component';
import {TabbableController} from '../shared/tabbable-controller';
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

  @Input()
  set selectedStep(step: number) {
    this.setSelectedIndex(+step);
  }

  get selectedStep(): number {
    return this.selectedIndex;
  }

  @Output() selectedStepChange = new EventEmitter<number>();

  private _vertical = false;

  @Input()
  get vertical(): boolean {
    return this._vertical;
  }

  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
    this.enforceSelectedTabbable = !(this._allowToggling && this._vertical);
    if (!this._vertical) this.ensureSelectedTab();
  }

  private _allowToggling = false;

  @Input()
  get allowToggling(): boolean {
    return this._allowToggling;
  }

  set allowToggling(value: boolean) {
    this._allowToggling = coerceBooleanProperty(value);
    this.enforceSelectedTabbable = !(this._allowToggling && this._vertical);
    if (!this._vertical) this.ensureSelectedTab();
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

    if (!this.enforceSelectedTabbable && step.active) {
      this.setSelectedIndex(-1);
      this.selectedStepChange.emit(-1);
    } else if (!this.shouldDisable(step, true)) {
      this.setSelectedIndex(stepIdx);
      this.selectedStepChange.emit(stepIdx);
    }
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
