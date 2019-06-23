import { coerceNumberProperty } from '@angular/cdk/coercion';
import { DoCheck, Input } from '@angular/core';
import { clampNumber, roundTo, VxFormComponent } from '../shared';

export abstract class AbstractVxSliderComponent extends VxFormComponent<number> implements DoCheck {
  /**
   * Flag that says we need to verify the value's position during this change detection cycle.
   */
  protected _verifyValue = false;
  protected _value = 0;

  percentage = 0;

  @Input()
  get min(): number {
    return this._min;
  }

  set min(v: number) {
    this._min = coerceNumberProperty(v, this._min);

    // Since this also modifies the percentage, we need to let the change detection know.
    this.cdr.markForCheck();
    this._verifyValue = true;
  }

  private _min = 0;

  @Input()
  get max(): number {
    return this._max;
  }

  set max(v: number) {
    this._max = coerceNumberProperty(v, this._max);

    // Since this also modifies the percentage, we need to let the change detection know.
    this.cdr.markForCheck();
    this._verifyValue = true;
  }

  private _max = 100;

  @Input()
  get step(): number {
    return this._step;
  }

  set step(v: number) {
    this._step = coerceNumberProperty(v, this._step);

    const split = this._step.toString().split('.');
    // If we have decimals
    if (split.length === 2) {
      this._decimalCount = split[1].length;
    } else {
      this._decimalCount = 0;
    }


    // Since this also modifies the percentage, we need to let the change detection know.
    this.cdr.markForCheck();
    this._verifyValue = true;
  }

  private _decimalCount = 0; // How many decimals to truncate to.  In the case of a weird number like 1.777777777778
  private _step = 1;

  protected handleValueSet(value: number): void {
    value = coerceNumberProperty(value, this.min);
    value = this.clampValue(value);
    this.percentage = (value - this.min) / (this.max - this.min) * 100;

    super.handleValueSet(value);
  }

  protected clampValue(value: number): number {
    if (value <= this.min) {
      return this.min;
    }
    if (value >= this.max) {
      return this.max;
    }

    value = roundTo(value - this.min, this.step) + this.min;

    return parseFloat(clampNumber(value, this.min, this.max).toFixed(this._decimalCount));
  }

  ngDoCheck(): void {
    // Because min, max, and step can affect the value this updates the value using those numbers
    // when any (or all) are changed.
    if (this._verifyValue) {
      this._verifyValue = false;
      this.value = this.clampValue(this.value);
    }
  }

  protected setNativeValue(val: number): void {
    this._value = val;
  }

  protected getNativeValue(): number {
    return this._value;
  }

  protected updateValueForTouch(position: number, barWidth: number, barLeft: number) {
    const pct = (position - barLeft) / barWidth;
    const range = this.max - this.min;
    const newValue = pct * range + this.min;
    this.setValueFromUser(newValue);
  }
}
