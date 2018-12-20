import { ChangeDetectorRef, Directive, ElementRef, Input, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AbstractVxFormFieldDirective, ErrorStateMatcher, coerceBooleanProperty } from 'vx-components-base';

@Directive({
  selector: '[vxNsFormField]',
  exportAs: 'vxNsFormField',
  host: {
    '(blur)': '_setHasFocus(false)',
    '(focus)': '_setHasFocus(true)',
    '[hint]': 'placeholder || label',
    '[editable]': 'editable && !disabled',
    '(textChange)': '_handleChange()',
    '[class.vx-ns-form-field-input]': 'true',
    '[class.vx-ns-show-placeholder]': '_showPlaceholder'
  }
})
export class VxNsFormFieldDirective extends AbstractVxFormFieldDirective<TextField> {
  @Input()
  get editable(): boolean {
    return this._editable;
  }

  set editable(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this._editable) {
      this._editable = value;
      this.cdr.markForCheck();
    }
  }
  private _editable = true;

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

  _handleChange(): void {
    this._dirtyCheckNativeValue();
  }

  protected getNativeValue(): string {
    return this.elementRef.nativeElement.text;
  }

  protected setNativeValue(val: string): void {
    this.elementRef.nativeElement.text = val;
  }
}
