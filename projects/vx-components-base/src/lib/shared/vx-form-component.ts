import {Subject} from 'rxjs';
import {ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {ChangeDetectorRef, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {coerceBooleanProperty} from './coercion';
import {ErrorStateMatcher} from './error-options';

export abstract class VxFormComponent<T> implements ControlValueAccessor, OnDestroy, DoCheck, OnInit {
  protected _lastNativeValue?: T;

  errorState = false;

  focused = false;
  @Output() focusedChange = new EventEmitter<boolean>();

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
    this.handleValueSet(value);
  }

  /** Whether the component is disabled */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
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
    }
  }
  protected _required = false;

  @Output()
  readonly valueChange = new EventEmitter<T>();

  /** Stores the last known value of the ngControl, known through writeValue and the onChangeFn **/
  protected lastRegisteredValue?: T;

  protected readonly onDestroy$ = new Subject<void>();

  protected onTouchFn = () => {
  };
  protected onChangeFn = (_: T) => {
  };

  constructor(
    protected cdr: ChangeDetectorRef,
    protected errorStateMatcher: ErrorStateMatcher,
    protected ngControl?: NgControl,
    protected parentForm?: NgForm,
    protected parentFormGroup?: FormGroupDirective,
  ) {

  }

  protected checkErrorState(): void {
    const oldState = this.errorState;
    const parent = this.parentFormGroup || this.parentForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : undefined;
    const newState = this.errorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.cdr.markForCheck();
    }
  }

  protected abstract setNativeValue(val: T): void;
  protected abstract getNativeValue(): T;

  registerOnChange(fn: any): void {
    this.onChangeFn = (obj: T) => {
      debugger;
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
    this.setValueFromNative(obj);
  }

  _setHasFocus(hasFocus: boolean): void {
    this.focused = hasFocus;
    this.focusedChange.emit(hasFocus);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    // this._lastNativeValue = this.value;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.checkErrorState();
    }

    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    this._dirtyCheckNativeValue();
  }

  protected setValueFromNative(value: T): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onTouchFn();
  }

  protected _dirtyCheckNativeValue(): void {
    const val = this.value;

    if (this._lastNativeValue !== val) {
      this._lastNativeValue = val;
      this.setValueFromNative(val);
    }
  }

  protected handleValueSet(value: T): void {
    if (value !== this.value) {
      this._lastNativeValue = value;
      this.setNativeValue(value);

      // If the ngControl isn't aware of this value make it aware
      if (this.lastRegisteredValue !== value) {
        this.onChangeFn(value);
      }

      this.cdr.markForCheck();
    }
  }
}
