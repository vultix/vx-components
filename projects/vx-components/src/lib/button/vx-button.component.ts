import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject, InjectionToken,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { VxButtonGroupComponent } from '../button-group/vx-button-group.component';
import { VxThemeColor } from '../shared/vx-theme-color';
import { VxButtonVariation } from './vx-button-variation';
import { VX_BUTTON_DEFAULT_COLOR, VX_BUTTON_DEFAULT_VARIATION, VX_BUTTON_GROUP } from './vx-button.tokens';

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
    '[class.vx-disabled]': 'disabled',
    '[class.vx-button-group-button]': '_hasButtonGroup',
    '[class.vx-button-group-selected-button]': '_isSelectedButtonGroupButton',
    '(click)': '_handleClick()'
  }
})
export class VxButtonComponent<T = any> {
  @Input() value!: T;
  @Input() color: VxThemeColor;

  private _variation: VxButtonVariation;
  private _disabled = false;

  constructor(private cdr: ChangeDetectorRef,
              @Inject(VX_BUTTON_DEFAULT_COLOR) @Optional() defaultColor?: VxThemeColor,
              @Inject(VX_BUTTON_DEFAULT_VARIATION) @Optional() defaultVariation?: VxButtonVariation,
              @Inject(VX_BUTTON_GROUP) @Optional() private buttonGroup?: any) {
    this.color = defaultColor || 'light';
    this._variation = defaultVariation || 'flat';
  }

  get _hasButtonGroup(): boolean {
    return !!this.buttonGroup
  }

  get _isSelectedButtonGroupButton(): boolean {
    return !!this.buttonGroup && this.buttonGroup.value !== undefined && this.buttonGroup.value === this.value;
  }

  @Input('vx-button')
  get variation(): VxButtonVariation {
    return this._variation;
  }

  set variation(value: VxButtonVariation) {
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

  _handleClick(): void {
    if (this.buttonGroup) {
      this.buttonGroup._handleButtonSelect(this.value);
    }
  }
}
