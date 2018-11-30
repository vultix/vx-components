import {Subject} from 'rxjs';
import {ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {coerceBooleanProperty} from './coercion';
import {ErrorStateMatcher} from './error-options';

export abstract class VxFormComponent<T> implements ControlValueAccessor, OnDestroy {
  errorState = false;

  focused = false;

  // TODO:: readonly
  // /** Whether the element is readonly. */
  // @Input()
  // get readonly(): boolean { return this._readonly; }
  // set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  // protected _readonly = false;

  /**
   * The value of this form component
   */
  @Input()
  get value(): T { return this.getNativeValue(); }
  set value(value: T) {
    if (value !== this.value) {
      this.setNativeValue(value);
      this.valueChange.emit(value);

      // If the ngControl isn't aware of this value make it aware
      if (this.lastRegisteredValue !== value) {
        this.onChangeFn(value);
      }

      this.stateChanges.next();
      this.cdr.markForCheck();
    }
  }

  /** Whether the component is disabled */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
      this.stateChanges.next();
    }
  }
  protected _disabled = false;

  /** Whether the component is required */
  @Input()
  get required(): boolean { return this._required; }
  set required(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._required) {
      this._required = value;
      this.cdr.markForCheck();
      this.stateChanges.next();
    }
  }
  protected _required = false;

  @Output()
  readonly valueChange = new EventEmitter<T>();

  readonly stateChanges = new Subject<void>();

  /** Stores the last known value of the ngControl, known through writeValue and the onChangeFn **/
  protected lastRegisteredValue: T;

  protected readonly onDestroy$ = new Subject<void>();

  protected onTouchFn = () => {
  };
  protected onChangeFn = (val: T) => {
  };

  constructor(
    protected cdr: ChangeDetectorRef,
    protected ngControl: NgControl,
    protected parentForm: NgForm,
    protected parentFormGroup: FormGroupDirective,
    protected errorStateMatcher: ErrorStateMatcher,
  ) {

  }

  checkErrorState(): void {
    const oldState = this.errorState;
    const parent = this.parentFormGroup || this.parentForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = this.errorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }

  protected abstract setNativeValue(val: T): void;
  protected abstract getNativeValue(): T;

  registerOnChange(fn: any): void {
    this.onChangeFn = (obj: T) => {
      this.lastRegisteredValue = obj;
      fn(obj);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(obj: T): void {
    this.lastRegisteredValue = obj;
    this.value = obj;
  }

  _setHasFocus(hasFocus: boolean): void {
    this.focused = hasFocus;
    this.cdr.markForCheck();
    this.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
