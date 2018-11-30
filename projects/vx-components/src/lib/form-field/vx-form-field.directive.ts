import {ChangeDetectorRef, Directive, ElementRef, Optional, Self} from '@angular/core';
import {AbstractVxFormFieldDirective} from 'vx-components-base';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from 'vx-components-base';

@Directive({
  selector: '[vxFormField]',
  exportAs: 'vxFormField',
  host: {
    '(blur)': '_setHasFocus(false)',
    '(focus)': '_setHasFocus(true)',
    '[class.vx-form-field-input]': 'true'
  }
})
export class VxFormFieldDirective extends AbstractVxFormFieldDirective<HTMLInputElement> {

  constructor(
    elementRef: ElementRef<HTMLInputElement>,
    cdr: ChangeDetectorRef,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    errorStateMatcher: ErrorStateMatcher,
  ) {
    super(elementRef, cdr, ngControl, parentForm, parentFormGroup, errorStateMatcher);
  }

  protected getNativeValue(): string {
    return this.elementRef.nativeElement.value;
  }

  protected setNativePlaceholder(placeholder: string) {
    this.elementRef.nativeElement.placeholder = placeholder;
  }

  protected setNativeValue(val: string): void {
    this.elementRef.nativeElement.value = val;
  }

}
