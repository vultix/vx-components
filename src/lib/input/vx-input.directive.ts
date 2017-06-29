import {Directive, ElementRef, Input, Optional, Renderer2, Self} from '@angular/core';
import {FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';


@Directive({
  selector: '[vxInput]',
  host: {
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()'
  }
})
export class VxInputDirective {
  /** Whether the element is disabled. */
  @Input()
  get disabled(): boolean {
    return this._ngControl ? this._ngControl.disabled : this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }


  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this._renderer.setProperty(this._elementRef.nativeElement, 'placeholder', value);
  }

  /** Input type of the element. */
  @Input()
  get type() { return this._type; }
  set type(value: string) {
    this._type = value || 'text';

    this._renderer.setProperty(this._elementRef.nativeElement, 'type', this._type);
  }

  /** The input element's value. */
  get value() {
    let val = this._elementRef.nativeElement.value;
    if (this.type === 'number')
      val = +val || 0;
    return  val
  }
  set value(value: string | number) { this._elementRef.nativeElement.value = value; }

  _disabled: boolean;
  focused: boolean;

  private _type: string;
  private _placeholder: string;
  constructor(private _renderer: Renderer2, @Optional() @Self() public _ngControl: NgControl, @Optional() private _parentForm: NgForm,
              @Optional() private _parentFormGroup: FormGroupDirective, public _elementRef: ElementRef) {
  }

  _onFocus() {
    this.focused = true;
  }

  _onBlur() {
    this.focused = false;
  }

  /** Whether the input is in an error state. */
  _isInvalid(): boolean {
    const control = this._ngControl;
    const form = this._parentFormGroup || this._parentForm;
    if (control) {
      const isSubmitted = form && form.submitted;
      return !!(control.invalid && (control.touched || isSubmitted));
    }

    return false;
  }

}
