import {Directive, DoCheck, ElementRef, Input, OnChanges, OnDestroy, Optional, Renderer2, Self} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty} from '../shared/util';
import {Subject, Subscription} from 'rxjs';

export type VxInputTypes = HTMLTextAreaElement | HTMLInputElement;

@Directive({
  selector: '[vxInput]',
  host: {
    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)'
  },
  exportAs: 'vxInput'
})
export class VxInputDirective implements OnChanges, OnDestroy, DoCheck {

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.handlePlaceholder();
  }

  private _placeholder: string;

  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
    this.handlePlaceholder();
  }

  private _label: string;

  @Input()
  showLabel = true;

  /** The input element's value. */
  get value(): string {
    return this._elementRef.nativeElement.value;
  }

  set value(value: string) {
    this._elementRef.nativeElement.value = value;
  }


  /** Whether the element is disabled. */
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled || this._disabled;
    }

    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _disabled = false;


  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  private _required: boolean;

  @Input() requiredLabel: boolean;

  readonly stateChanges = new Subject();

  focused = false;
  invalid = false;

  private subscription?: Subscription;

  constructor(@Optional() @Self() public ngControl: NgControl, @Optional() private _parentForm: NgForm,
              @Optional() private _parentFormGroup: FormGroupDirective, public _elementRef: ElementRef<VxInputTypes>) {
    if (this.ngControl && this.ngControl.valueChanges) {
      this.subscription = this.ngControl.valueChanges.subscribe(() => {
        this.checkIsInvalid();
      })
    }

  }

  _focusChanged(isFocused: boolean): void {
    if (isFocused !== this.focused) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  ngOnChanges(): void {
    this.stateChanges.next();
  }

  ngDoCheck(): void {
    this.checkIsInvalid();
  }

  /** Whether the input is in an error state. */
  private checkIsInvalid(): void {
    let invalid = false;
    const control = this.ngControl;
    const form = this._parentFormGroup || this._parentForm;
    if (control) {
      const isSubmitted = form && form.submitted;
      invalid = !!(control.invalid && (control.touched || isSubmitted));
    }

    if (invalid !== this.invalid) {
      this.invalid = invalid;
      this.stateChanges.next();
    }
  }

  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  private handlePlaceholder(): void {
    this._elementRef.nativeElement.placeholder = (this.label && this.placeholder) ? this.placeholder : '';
  }
}
