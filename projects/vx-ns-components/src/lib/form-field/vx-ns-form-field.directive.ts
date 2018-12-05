import {ChangeDetectorRef, Directive, ElementRef, Input, Optional, Self} from '@angular/core';
import {AbstractVxFormFieldDirective, ErrorStateMatcher} from 'vx-components-base';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {TextField} from 'tns-core-modules/ui/text-field';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[vxNsFormField]',
  exportAs: 'vxFormField',
  host: {
    '(blur)': '_setHasFocus(false)',
    '(focus)': '_setHasFocus(true)',
    '[class.vx-ns-form-field-input]': 'true',
    '[class.vx-ns-show-placeholder]': '_showPlaceholder'
  }
})
export class VxNsFormFieldDirective extends AbstractVxFormFieldDirective<TextField> {
  @Input()
  set hint(hint: string) {
    this.placeholder = hint;
  }
  get hint(): string {
    return this.placeholder;
  }

  _showPlaceholder = false;

  constructor(
    elementRef: ElementRef<TextField>,
    cdr: ChangeDetectorRef,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    errorStateMatcher: ErrorStateMatcher,
  ) {
    super(elementRef, cdr, ngControl, parentForm, parentFormGroup, errorStateMatcher);

    if (this.ngControl && this.ngControl.valueChanges) {
      this.ngControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
        this.checkErrorState();
      })
    }
  }

  protected getNativeValue(): string {
    return this.elementRef.nativeElement.text;
  }

  protected setNativePlaceholder(placeholder: string) {
    this.elementRef.nativeElement.hint = placeholder;
  }

  protected setNativeValue(val: string): void {
    this.elementRef.nativeElement.text = val;
  }

  protected handlePlaceholder(): void {
    // Overridden from the parent so that the placeholder is always there but hidden.
    // This is for the benefit of iqkeyboardmanager.
    this.setNativePlaceholder(this.placeholder || this.label || '');
    this._showPlaceholder = !!this.placeholder && !!this.label;
    this.cdr.markForCheck();
  }

}
