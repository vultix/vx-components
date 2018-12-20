import { ChangeDetectorRef, Directive, ElementRef, Input, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AbstractVxFormFieldDirective, ErrorStateMatcher } from 'vx-components-base';

@Directive({
  selector: '[vxNsFormField]',
  exportAs: 'vxFormField',
  host: {
    '(blur)': '_setHasFocus(false)',
    '(focus)': '_setHasFocus(true)',
    '[hint]': 'placeholder || label',
    '[class.vx-ns-form-field-input]': 'true',
    '[class.vx-ns-show-placeholder]': '_showPlaceholder'
  }
})
export class VxNsFormFieldDirective extends AbstractVxFormFieldDirective<TextField> {
  constructor(
    elementRef: ElementRef<TextField>,
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective
  ) {
    super(elementRef, cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);

    if (this.ngControl && this.ngControl.valueChanges) {
      this.ngControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
        this.checkErrorState();
      });
    }
  }

  get hint(): string {
    return this.placeholder;
  }

  @Input()
  set hint(hint: string) {
    this.placeholder = hint;
  }

  get _showPlaceholder(): boolean {
    return !!this.placeholder;
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  protected getNativeValue(): string {
    return this.elementRef.nativeElement.text;
  }

  protected setNativeValue(val: string): void {
    this.elementRef.nativeElement.text = val;
  }
}
