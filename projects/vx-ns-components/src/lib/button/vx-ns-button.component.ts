import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures';
import { coerceBooleanProperty } from 'vx-components-base';

@Component({
  selector: '[vx-ns-button]', // tslint:disable-line
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['./vx-ns-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vx-ns-button]': 'true',
    '[class.vx-ns-button-light]': `c === 'light'`,
    '[class.vx-ns-button-dark]': `c === 'dark'`,
    '[class.vx-ns-button-primary]': `c === 'primary'`,
    '[class.vx-ns-button-accent]': `c === 'accent'`,
    '[class.vx-ns-button-error]': `c === 'error'`,
    '[class.vx-ns-button-success]': `c === 'success'`,
    '[class.vx-ns-button-warn]': `c === 'warn'`,
    '[class.vx-ns-button-flat]': `variation === 'flat'`,
    // '[class.vx-ns-button-raised]': `variation === 'raised'`,
    '[class.vx-ns-button-stroked]': `variation === 'stroked'`,
    '[class.vx-ns-disabled]': 'disabled',
    '[class.vx-ns-active]': '_active',
    '(touch)': 'handleTouch($event)'
  }
})
export class VxNsButtonComponent<T = any> {
  @Input() value!: T;
  @Input() c: VxNsButtonColor = 'light';

  _active = false;
  private _variation: VxNsButtonVariation = 'flat';
  private _disabled = false;

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef<View>) {
  }

  @Input('vx-ns-button')
  get variation(): VxNsButtonVariation {
    return this._variation;
  }

  set variation(value: VxNsButtonVariation) {
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

  handleTouch(event: TouchGestureEventData): void {
    if (this.disabled) {
      this._active = false;
      return;
    }

    this._active = event.action === 'down' || event.action === 'move';
  }
}

export type VxNsButtonColor = 'light' | 'dark' | 'primary' | 'error' | 'success' | 'warn' | 'accent';
export type VxNsButtonVariation = 'flat' | 'stroked';
