import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorStateMatcher } from '../shared';
import { AbstractVxStepperComponent } from './abstract-vx-stepper.component';

export abstract class AbstractVxStepComponent extends ErrorStateMatcher implements OnChanges, OnDestroy {
  userSeenStep = false;
  userLeftStep = false;

  @ViewChild(TemplateRef, {static: false}) _template!: TemplateRef<any>;

  @Input() label?: string;

  protected _invalid = false;
  protected _stepControl?: AbstractControlDirective | AbstractControl;
  protected subscription?: Subscription;
  constructor(protected errorStateMatcher: ErrorStateMatcher,
              protected cdr: ChangeDetectorRef,
              protected stepper: AbstractVxStepperComponent) {
    super();
  }

  /** The top level abstract control of the step. */
  @Input()
  set stepControl(val: AbstractControlDirective | AbstractControl | undefined) {
    this._stepControl = val;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const control = this.getControl();
    if (control) {
      this.subscription = control.statusChanges.subscribe(() => {
        // Watch for changes to the underlying control to see if we need to update the step header
        this.stepper._markForCheck();
      })
    }
  }
  get stepControl(): AbstractControlDirective | AbstractControl | undefined {
    return this._stepControl;
  }

  @Input()
  set invalid(invalid: boolean) {
    invalid = coerceBooleanProperty(invalid);

    if (invalid !== this._invalid) {
      this._invalid = invalid;
      this.cdr.markForCheck();
    }
  }
  get invalid() {
    return this._invalid;
  }

  isValid(): boolean {
    const control = this.getControl();
    return this.invalid || (control ? !!(control.valid && !control.pending && this.userSeenStep) : this.userSeenStep);
  }

  isErrorState(control?: FormControl, form?: FormGroupDirective | NgForm): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);

    // All child elements (because this class provides itself as an ErrorStateMatcher)
    // will use this stepper to decide if they are in an error state.
    // If we try to interact with this step mark it as invalid.
    const customErrorState = !!(control && control.invalid && this.userLeftStep);

    return originalErrorState || customErrorState;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Since basically all inputs of the stepper get proxied through the view down to the
    // underlying step-header, we have to make sure that change detection runs correctly.
    this.stepper._markForCheck();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected getControl(): AbstractControl | undefined {
    let control: AbstractControl | undefined;
    if (this.stepControl instanceof AbstractControlDirective) {
      if (this.stepControl.control) {
        control = this.stepControl.control;
      }
    } else {
      control = this.stepControl;
    }
    return control;
  }
}
