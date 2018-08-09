import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {VxStepComponent} from './step.component';
import {boundNumber, coerceBooleanProperty} from '../shared/util';
import {VxPagerComponent} from '../pager';
import {STEPPER_TOKEN} from './stepper.token';

@Component({
  selector: 'vx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: STEPPER_TOKEN, useExisting: VxStepperComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxStepperComponent {
  @ContentChildren(VxStepComponent) steps: QueryList<VxStepComponent>;

  @ViewChildren('overflow') overflows: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild(VxPagerComponent) set pager(pager: VxPagerComponent) {
    this.cdr.detectChanges();
  }

  @Output() selectedStepChange = new EventEmitter<number>();

  private _linear = false;

  @Input()
  get linear(): boolean {
    return this._linear;
  }

  set linear(value: boolean) {
    this._linear = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  private _selectedStep = -1;

  get selectedStep(): number {
    return this._selectedStep;
  }

  @Input()
  set selectedStep(stepIdx: number) {
    stepIdx = boundNumber(+stepIdx || 0, 0, this.steps ? this.steps.length - 1 : 0);
    if (this.steps) {
      const step = this.steps.toArray()[stepIdx];

      if (this._shouldDisable(step, true)) {
        return;
      }
    }

    if (this.selectedStep !== stepIdx) {
      this.animateStepChange(stepIdx, this.selectedStep);
      this._selectedStep = stepIdx;
      this.selectedStepChange.emit(stepIdx);
      this.cdr.markForCheck();
    }
  }

  private _vertical = false;

  @Input()
  get vertical(): boolean {
    return this._vertical;
  }

  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);

    if (this.vertical) {
      // The timeout allows the overflows to be created.
      setTimeout(() => {
        this.animateStepChange(this.selectedStep, -1);
      }, 0)
    }

    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.selectedStep = 0;
  }

  next(): void {
    this.selectedStep++;
  }

  previous(): void {
    this.selectedStep--;
  }


  /** @--internal */
  _shouldDisable(curStep: VxStepComponent, markAsTouched = false): boolean {
    if (!this.linear)
      return false;

    const steps = this.steps.toArray();
    for (const step of steps) {
      if (step === curStep)
        return false;
      else {
        if (markAsTouched)
          step.markAsTouched();

        if (!step.valid())
          return true;
      }
    }
    return false;
  }

  private animateStepChange(idx: number, oldIdx: number): void {
    if (this.overflows && this.vertical) {
      const overflows = this.overflows.toArray();

      let oldEl: HTMLDivElement | null = null;
      let oldChild: HTMLDivElement | null = null;

      if (oldIdx !== -1) {
        oldEl = overflows[oldIdx].nativeElement;
        oldChild = oldEl.children[0] as HTMLDivElement;
        oldEl.style.height = `${oldChild.offsetHeight}px`;
      }

      const el = overflows[idx].nativeElement;
      const child = el.children[0] as HTMLDivElement;

      el.style.height = '0';
      setTimeout(() => {
        el.style.height = `${child.offsetHeight}px`;
        if (oldEl)
          oldEl.style.height = '0';

        setTimeout(() => {
          el.style.height = 'auto';
        }, 300)
      })
    }
  }
}
