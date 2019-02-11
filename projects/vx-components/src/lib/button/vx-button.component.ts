import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from 'vx-components-base';
import { VxThemeColor } from '../shared/vx-theme-color';

@Component({
  selector: '[vx-button]', // tslint:disable-line
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['./vx-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vx-button]': 'true',
    '[class.vx-button-light]': `color === 'light'`,
    '[class.vx-button-dark]': `color === 'dark'`,
    '[class.vx-button-primary]': `color === 'primary'`,
    '[class.vx-button-accent]': `color === 'accent'`,
    '[class.vx-button-error]': `color === 'error'`,
    '[class.vx-button-success]': `color === 'success'`,
    '[class.vx-button-warn]': `color === 'warn'`,
    '[class.vx-button-flat]': `variation === 'flat'`,
    '[class.vx-button-raised]': `variation === 'raised'`,
    '[class.vx-button-stroked]': `variation === 'stroked'`,
    '[class.vx-disabled]': 'disabled'
  }
})
export class VxButtonComponent<T = any> {
  @Input() value!: T;
  @Input() color: VxThemeColor = 'light';

  private _variation: VxButtonVariations = 'flat';
  private _disabled = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input('vx-button')
  get variation(): VxButtonVariations {
    return this._variation;
  }

  set variation(value: VxButtonVariations) {
    if (!value) {
      value = 'flat';
    }
    this._variation = value;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this.disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }
}

export type VxButtonVariations = 'flat' | 'raised' | 'stroked';
