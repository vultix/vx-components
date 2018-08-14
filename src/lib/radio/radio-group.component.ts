import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList
} from '@angular/core';
import {VxRadioButtonComponent} from './radio-button.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RADIO_GROUP} from './radio-group.token';

@Component({
  selector: 'vx-radio-group',
  template: '<ng-content></ng-content>',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxRadioGroupComponent),
      multi: true
    },
    {
      provide: RADIO_GROUP,
      useExisting: forwardRef(() => VxRadioGroupComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxRadioGroupComponent<T = string> implements ControlValueAccessor {
  @ContentChildren(VxRadioButtonComponent) buttons: QueryList<VxRadioButtonComponent<T>>;

  /** Whether the radio group is disabled. */
  @HostBinding('class.disabled')
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<T>();

  private onTouchFn = () => {
  };
  private onChangeFn = (val: T) => {
  };

  constructor(private cdr: ChangeDetectorRef) {
  }

  private _value?: T;

  get value(): T | undefined {
    return this._value;
  }

  @Input()
  set value(value: T | undefined) {
    if (value !== this._value) {
      this._value = value;

      this.cdr.markForCheck();
      if (this.buttons)
        this.buttons.forEach(button => button._markForCheck());
    }
  }


  _setValue(value: T): void {
    this.value = value;

    this.valueChange.emit(value);
    this.onChangeFn(value);
    this.onTouchFn();
  }

  writeValue(obj: T): void {
    this.value = obj;
    this.valueChange.emit(obj);

  }

  registerOnChange(fn: (val: T) => any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  /** @--internal */
  @HostListener('keyup.ArrowRight')
  @HostListener('keyup.ArrowDown')
  _next(): void {
    const buttons = this.buttons.toArray();

    let selectedIndex = this.getSelectedIndex();
    if (selectedIndex === buttons.length - 1) {
      selectedIndex = 0;
    } else {
      selectedIndex++;
    }
    this._setValue(buttons[selectedIndex].value!);
  }

  /** @--internal */
  @HostListener('keyup.ArrowLeft')
  @HostListener('keyup.ArrowUp')
  _previous(): void {
    const buttons = this.buttons.toArray();
    let selectedIndex = this.getSelectedIndex();
    if (selectedIndex === 0) {
      selectedIndex = buttons.length - 1;
    } else {
      selectedIndex--;
    }
    this._setValue(buttons[selectedIndex].value!);
  }

  private getSelectedIndex(): number {
    const buttons = this.buttons.toArray();
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].value === this.value) {
        return i;
      }
    }
    return -1;
  }

}
