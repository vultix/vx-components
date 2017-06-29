import {Component, Output, EventEmitter, forwardRef, Input, ViewChild, ElementRef, HostBinding} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'vx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxInputComponent),
      multi: true
    }
  ]
})
export class VxInputComponent implements ControlValueAccessor {
  /** The type attribute to pass to the input.  If type is numeric will add a number spinner. */
  @Input() type = 'text';
  /** The name attribute to pass to the input */
  @Input() name: string;
  /** The placeholder attribute to pass to the input */
  @Input() placeholder: string;
  /** The tabIndex attribute to pass to the input */
  @Input() tabIndex: number;
  /** Whether or not the input is disabled */
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean;

  /** Whether or not the input has focus */
  @HostBinding('class.hasFocus')
  hasFocus = false;

  /** Event emitted when the focus changes */
  @Output() hasFocusChange = new EventEmitter();

  /** if input[type=number] the minimum allowed value */
  @Input() min = 0;
  /** if input[type=number] the maximum allowed value */
  @Input() max: number;


  @ViewChild('input') input: ElementRef;

  /** The input's current value */
  public value: string|number = null;

  private _onChangeFn = (_a: any) => _a;
  private _onTouchedFn = () => {};

  /** Call to set focus to the input */
  public setHasFocus(focus: boolean) {
    this.hasFocus = focus;
    this.hasFocusChange.emit(focus);
    this._onTouchedFn();

    if (focus) {
      this.input.nativeElement.focus();
    } else {
      this.input.nativeElement.blur();
    }
  }

  _onChange(val: string, fromSpinner = false) {
    if (this.type === 'number') {
      if (fromSpinner) {
        this.value = val;
        this.input.nativeElement.value = this.value;
        this._onChangeFn(this.value);
      }
    } else {
      this.value = val;
      this._onChangeFn(this.value);
    }
  }

  _blockLoseFocus() {
    // Something other than the input was clicked, but was still inside the container.  Return focus to the input
    setTimeout(() => this.input.nativeElement.focus());
  }

  _labelMouseDown(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();

    setTimeout(() => (<HTMLInputElement> document.activeElement).blur());
    return false;
  }

  //  ----- Interface functions -----

  writeValue(val: string|number): void {
    if (this.type === 'number' && isNaN(<number>val)) {
      val = null;
      this._onChangeFn(val);
    }
      this.value = val;
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

}
