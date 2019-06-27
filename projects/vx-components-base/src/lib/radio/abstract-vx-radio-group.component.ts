import { ChangeDetectorRef, Input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, VxFormComponent } from '../shared';
import { AbstractVxRadioButtonComponent } from './abstract-vx-radio-button.component';

let uniqueId = 0;

export abstract class AbstractVxRadioGroupComponent<T> extends VxFormComponent<T> implements OnChanges, OnInit {

  abstract buttons: QueryList<AbstractVxRadioButtonComponent<T>>;
  private _name = `vxradio-${++uniqueId}`;
  private _value!: T;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    control?: NgControl,
    parentForm?: NgForm,
    parentFormGroup?: FormGroupDirective
  ) {
    super(cdr, errorStateMatcher, control, parentForm, parentFormGroup);
  }

  get name(): string {
    return this._name;
  }

  @Input()
  set name(value: string) {
    this._name = value;
    this.cdr.markForCheck();
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.buttons) {
      // Ensures all changes to the group component are reflected on the underlying buttons
      this.buttons.forEach(button => button._markForCheck());
    }
  }

  _handleButtonSelect(value: T): void {
    this.setValueFromUser(value);
  }

  protected getNativeValue(): T {
    return this._value;
  }

  protected setNativeValue(val: T): void {
    this._value = val;
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

  // Nothing we can do to parse and verify because of the unknown type
  protected parseValueInput(value: T): T {
    return value;
  }
}
