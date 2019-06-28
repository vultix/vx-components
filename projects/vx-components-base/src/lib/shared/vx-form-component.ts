import { ChangeDetectorRef, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ErrorStateMatcher } from './error-options';

// A counter for the unique id for the form element
let _idCounter = 0;

// VX_FORM_INPUTS: 'id', 'value', 'disabled', 'required'
// VX_FORM_OUTPUTS: 'focusedChange', 'valueChange'

export abstract class VxFormComponent<T> implements ControlValueAccessor, OnDestroy, DoCheck, OnInit {
  errorState = false;
  focused = false;
  // @Output()
  readonly focusedChange = new EventEmitter<boolean>();
  // @Output()
  readonly valueChange = new EventEmitter<T>();

  // TODO:: readonly
  // /** Whether the element is readonly. */
  // @Input()
  // get readonly(): boolean { return this._readonly; }
  // set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  // protected _readonly = false;

  protected _lastNativeValue?: T;
  protected _disabled = false;
  protected _required = false;
  protected _id = `vx-form-element-${_idCounter++}`;

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
    protected parentFormGroup?: FormGroupDirective
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  // @Input()
  set id(id: string) {
    if (id !== this._id) {
      this._id = id;
      this.cdr.markForCheck();
    }
  }

  get id(): string {
    return this._id;
  }

  /**
   * The value of this form component
   */
  // @Input()
  get value(): T {
    return this.getNativeValue();
  }

  set value(value: T) {
    this.handleValueSet(value);
  }

  /** Whether the component is disabled */
  // @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }

  /** Whether the component is required */
  // @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._required) {
      this._required = value;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = (obj: T) => {
      this.lastRegisteredValue = this.cloneValue(obj);
      fn(obj);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(obj: T): void {
    this.lastRegisteredValue = this.cloneValue(obj);
    this.value = obj;
  }

  _setHasFocus(hasFocus: boolean): void {
    this.focused = hasFocus;
    this.focusedChange.emit(hasFocus);

    if (!hasFocus) {
      this.onTouchFn();
    }
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this._lastNativeValue = this.value;
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

  protected setValueFromUser(value: T): void {
    this.value = value;
    this.valueChange.emit(this.value);
    this.onTouchFn();
  }

  protected _dirtyCheckNativeValue(): void {
    const val = this.value;

    if (this._lastNativeValue !== val) {
      this._lastNativeValue = val;
      this.setValueFromUser(val);
    }
  }

  protected handleValueSet(value: T): void {
    value = this.parseValueInput(value);

    // If the ngControl isn't aware of this value make it aware
    if (this.lastRegisteredValue !== value) {
      this.onChangeFn(value);
    }

    if (value !== this.value) {
      this._lastNativeValue = value;
      this.setNativeValue(value);

      this.cdr.markForCheck();
    }
  }

  /**
   * If T is an array or object this function should be overridden and return a clone.
   */
  protected cloneValue(value: T): T {
    return value;
  }

  /**
   * Should verify the inputted value and turn it into something we are expecting.
   */
  protected abstract parseValueInput(value: T): T;
}
