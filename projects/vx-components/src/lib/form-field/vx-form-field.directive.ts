import { ChangeDetectorRef, Directive, ElementRef, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AbstractVxFormFieldDirective, ErrorStateMatcher } from 'vx-components-base';

@Directive({
  selector: '[vxFormField]',
  exportAs: 'vxFormField',
  // VX_FORM_FIELD_DIRECTIVE_INPUTS
  inputs: ['id', 'value', 'disabled', 'required', 'placeholder', 'label', 'hideRequiredMarker', 'showRequiredMarker'],
  // VX_FORM_FIELD_DIRECTIVE_OUTPUTS
  outputs: ['focusedChange', 'valueChange'],
  host: {
    '(blur)': '_setHasFocus(false)',
    '(focus)': '_setHasFocus(true)',
    '(input)': '_onChange()',
    '[placeholder]': 'placeholder',
    '[class.vx-form-field-input]': 'true',
    '[attr.id]': 'id',
    '[attr.disabled]': 'disabled || undefined'
  }
})
export class VxFormFieldDirective extends AbstractVxFormFieldDirective<HTMLInputElement> {

  constructor(
    elementRef: ElementRef<HTMLInputElement>,
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective
  ) {
    super(elementRef, cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);
  }

  _onChange(): void {
    this._dirtyCheckNativeValue();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  protected getNativeValue(): string {
    return this.elementRef.nativeElement.value;
  }

  protected setNativeValue(val: string): void {
    this.elementRef.nativeElement.value = val;
  }
}
