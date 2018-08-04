import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList, ViewChildren
} from '@angular/core';
import {VxStepComponent} from './step.component';
import {TabbableController} from '../shared/tabbable-controller';
import {coerceBooleanProperty} from '../shared/util';

@Component({
  selector: 'vx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: TabbableController, useExisting: VxStepperComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxStepperComponent extends TabbableController<VxStepComponent> implements AfterContentInit, AfterViewInit {
  @ContentChildren(VxStepComponent) steps: QueryList<VxStepComponent>;
  @ViewChildren('overflow') overflows: QueryList<ElementRef<HTMLDivElement>>;

  private _linear = false;

  @Input()
  get linear(): boolean {
    return this._linear;
  }

  set linear(value: boolean) {
    this._linear = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  @Input()
  set selectedStep(step: number) {
    this.setSelectedIndex(+step);
    this.cdr.markForCheck();
  }

  get selectedStep(): number {
    return this.selectedIndex;
  }

  @Output() selectedStepChange = new EventEmitter<number>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  private _vertical = false;

  @Input()
  get vertical(): boolean {
    return this._vertical;
  }

  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
    this.enforceSelectedTabbable = !(this._allowToggling && this._vertical);
    if (!this._vertical) this.ensureSelectedTab();
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }

  previous(): void {
    if (this.selectedIndex > 0) {
      this.selectStep(this.selectedIndex - 1);
    }
    this.cdr.markForCheck();
  }

  ngAfterContentInit(): void {
    this.setTabbables(this.steps);
  }

  ngAfterViewInit(): void {
    this.onSelectedIndexChanged(this.selectedStep, -1);
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
    this.cdr.markForCheck();
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

  onSelectedIndexChanged(idx: number, oldIdx: number): void {
    if (this.overflows && this.vertical) {
      const overflows = this.overflows.toArray();

      let oldEl: HTMLDivElement | null = null;
      let oldChild: HTMLDivElement | null = null;

      if (oldIdx !== -1) {
        oldEl = overflows[oldIdx].nativeElement;
        oldChild = oldEl.children[0] as HTMLDivElement
        oldEl.style.height = `${oldChild.offsetHeight}px`;
      }

      if (idx === -1 && oldEl) { // Toggled Shut
        setTimeout(() => oldEl!.style.height = '0');
        return;
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

    this.cdr.markForCheck();
  }
}
