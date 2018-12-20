import {ErrorStateMatcher, VxFormComponent} from '../shared';
import {ChangeDetectorRef, Injector, Input, OnChanges, OnInit, QueryList, SimpleChanges} from '@angular/core';
import {AbstractVxRadioButtonComponent} from './abstract-vx-radio-button.component';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';

let uniqueId = 0;

export abstract class AbstractVxRadioGroupComponent<T> extends VxFormComponent<T> implements OnChanges, OnInit {

  abstract buttons: QueryList<AbstractVxRadioButtonComponent<T>>;

  @Input()
  set name(value: string) {
    this._name = value;
    this.cdr.markForCheck();
  }
  get name(): string {
    return this._name;
  }
  private _name = `vxradio-${++uniqueId}`;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    control?: NgControl,
    parentForm?: NgForm,
    parentFormGroup?: FormGroupDirective,
  ) {
    super(cdr, errorStateMatcher, control, parentForm, parentFormGroup);
    if (control) {
      control.valueAccessor = this;
    }
  }

  private _value!: T;
  protected getNativeValue(): T {
    return this._value;
  }
  protected setNativeValue(val: T): void {
    this._value = val;
  }


  _next(): void {
    const buttons = this.buttons.toArray();

    let selectedIndex = this.getSelectedIndex();
    if (selectedIndex === buttons.length - 1) {
      selectedIndex = 0;
    } else {
      selectedIndex++;
    }
    this._handleButtonSelect(buttons[selectedIndex].value);
  }

  _previous(): void {
    const buttons = this.buttons.toArray();
    let selectedIndex = this.getSelectedIndex();
    if (selectedIndex === 0) {
      selectedIndex = buttons.length - 1;
    } else {
      selectedIndex--;
    }
    this._handleButtonSelect(buttons[selectedIndex].value);
  }

  protected getSelectedIndex(): number {
    const buttons = this.buttons.toArray();
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].value === this.value) {
        return i;
      }
    }
    return -1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.buttons) {
      // Ensures all changes to the group component are reflected on the underlying buttons
      this.buttons.forEach(button => button._markForCheck());
    }
  }

  _handleButtonSelect(value: T): void {
    this.setValueFromNative(value);
  }
}
