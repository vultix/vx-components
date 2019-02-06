import { ChangeDetectorRef, Input, Output } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty, ErrorStateMatcher, VxFormComponent } from '../shared';

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
    if (control) {
      control.valueAccessor = this;
    }
  }

  @Input()
  set checked(value: boolean) {
    this.value = coerceBooleanProperty(value);
  }
  get checked(): boolean {
    return this.value;
  }

  _toggleFromNative(): boolean {
    this.setValueFromNative(!this.checked);
    return false;
  }

  toggle(): void {
    this.checked = !this.checked;
  }

}
