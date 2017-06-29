import {Component, forwardRef, Input, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'vx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxCheckboxComponent),
      multi: true
    }
  ]
})
export class VxCheckboxComponent implements ControlValueAccessor {
  private _tabIndex = 0;
  private _checked = false;

  /** The checkbox's tabIndex */
  @HostBinding('attr.tabIndex')
  @Input()
  get tabIndex() { return this.disabled ? -1 : this._tabIndex; }
  set tabIndex(tabIndex: number) {
    this._tabIndex = tabIndex;
  };

  /** Whether the checkbox is disabled. */
  @HostBinding('class.disabled')
  @Input() disabled = false;

  /** Name value will be applied to the input element if present */
  @Input() name: string = null;

  /** Whether the checkbox is checked */
  @HostBinding('class.checked')
  @Input()
  get checked() { return this._checked; };
  set checked(checked: boolean) {
    this._onChangeFn(checked);
    this._onTouchedFn();
    this._checked = checked;
  };

  /** Emitted when the checkbox's `checked` value changes. */
  @Output() checkedChange = new EventEmitter<boolean>();

  /** Toggles the `checked` state of the checkbox. */
  @HostListener('click')
  @HostListener('keydown.space')
  @HostListener('keydown.enter')
  public toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
    this._onChangeFn(this.checked);
    this._onTouchedFn();

    return false;
  }

  /** NgModel support */
  private _onChangeFn = (v: boolean) => v;
  private _onTouchedFn = () => {};

  writeValue(checked: boolean): void {
    if (checked === true || checked === false && this._checked !== checked) {
      this._checked = checked;
      this.checkedChange.emit(checked);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }
}
