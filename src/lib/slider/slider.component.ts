import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {getTouchPos, roundTo} from '../shared/util';

@Component({
  selector: 'vx-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxSliderComponent),
      multi: true
    }
  ]
})
export class VxSliderComponent implements ControlValueAccessor {
  @Output() valueChange = new EventEmitter<number>();
  @ViewChild('bar') bar: ElementRef;
  private touching = false;
  private onChange = (a: number) => {
  };
  private onTouched = () => {
  };

  get handleLeft(): number {
    return (this.value - this.min) / (this.max - this.min) * 100;
  }

  private _stepSize = 0;

  get stepSize(): number {
    return this._stepSize;
  }

  @Input()
  set stepSize(value: number) {
    this._stepSize = +value || 0;
    this.value = roundTo(this.value, this.stepSize);
    this.valueChange.next(this.value);
  }

  private _value = 0;
  get value(): number {
    return this._value;
  }

  @Input()
  set value(value: number) {
    value = +value || 0;


    if (value !== this._value) {
      this._value = value;
      this.onTouched();
      this.onChange(value);
    }

    this.boundNumber();
  }


  private _min = 0;
  get min(): number {
    return this._min;
  }

  @Input()
  set min(value: number) {
    value = +value || 0;
    if (value > this.max) {
      throw new Error('VxSlider min cannot be greater than max.');
    }

    this._min = value;
    this.boundNumber();
  }


  private _max = 10;
  get max(): number {
    return this._max;
  }

  @Input()
  set max(value: number) {
    value = +value || 0;
    if (value < this.min) {
      throw new Error('VxSlider max cannot be less than min.');
    }

    this._max = value;
    this.boundNumber();
  }

  writeValue(val: number): void {
    if (val !== this.value) {
      this._value = val;
      this.valueChange.emit(val);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  handleTouchStart(event: TouchEvent | MouseEvent): void {
    this.touching = true;
  }

  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  handleTouchMove(event: TouchEvent | MouseEvent): void {
    if (this.touching) {
      const {x} = getTouchPos(event);
      this.updateValueForTouch(x);
    }

  }

  @HostListener('window:mouseup', ['$event'])
  @HostListener('window:touchend')
  @HostListener('click', ['$event'])
  handleTouchEnd(event?: TouchEvent | MouseEvent): void {
    if (this.touching && event) {
      const {x} = getTouchPos(event);
      this.updateValueForTouch(x);
    }

    this.touching = false;
  }

  private boundNumber(): void {
    if (this.value < this.min) {
      this.value = this.min;
      this.valueChange.emit(this.min);
    } else if (this.value > this.max) {
      this.value = this.max;
      this.valueChange.emit(this.max);
    }
  }

  private updateValueForTouch(x: number): void {
    const bar = this.bar.nativeElement as HTMLDivElement;
    const {left, width, right} = bar.getBoundingClientRect();
    if (x <= left && this.value !== this.min) {
      this.value = this.min;
      this.valueChange.next(this.min);
    } else if (x >= right && this.value !== this.max) {
      this.value = this.max;
      this.valueChange.next(this.max);
    } else if (x > left && x < right) {
      const pct = (x - left) / width;
      const range = this.max - this.min;
      const newValue = pct * range + this.min;
      this.value = roundTo(newValue, this.stepSize);
      this.valueChange.next(this.value);
    }
  }
}
