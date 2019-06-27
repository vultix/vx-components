import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Input, Output } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, VxFormComponent } from '../shared';

export abstract class AbstractVxCheckboxComponent extends VxFormComponent<boolean> {
  @Output() checkedChange = this.valueChange;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    control?: NgControl,
    parentForm?: NgForm,
    parentFormGroup?: FormGroupDirective
  ) {
    super(cdr, errorStateMatcher, control, parentForm, parentFormGroup);
  }

  @Input()
  set checked(value: boolean) {
    this.value = value;
  }
  get checked(): boolean {
    return this.value;
  }

  _toggleFromUser(): boolean {
    this.setValueFromUser(!this.checked);
    return false;
  }

  toggle(): void {
    this.checked = !this.checked;
  }

  writeValue(obj: boolean): void {
    obj = !!obj;
    super.writeValue(obj);
  }

  protected parseValueInput(value: boolean): boolean {
    return coerceBooleanProperty(value);
  }
}
