import {AbstractVxItemComponent, AbstractVxMenuComponent, VX_MENU_TOKEN} from 'vx-components-base';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, Optional, ViewEncapsulation} from '@angular/core';
import {TouchGestureEventData} from 'tns-core-modules/ui/gestures';

@Component({
  selector: '[vx-ns-item]',
  templateUrl: 'vx-ns-item.component.html',
  styleUrls: ['vx-ns-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vx-ns-item]': 'true',
    '[class.vx-ns-disabled]': 'disabled',
    '[class.vx-ns-active]': '_active',
    '(tap)': '_handleSelect()',
    '(touch)': 'handleTouch($event)'
  }
})
export class VxNsItemComponent<T> extends AbstractVxItemComponent<T> {
  _active = false;

  @Input() text!: string;

  constructor(cdr: ChangeDetectorRef, @Inject(VX_MENU_TOKEN) @Optional() _menu?: AbstractVxMenuComponent<T, any>) {
    super(cdr, _menu);
  }

  getTextContent(): string {
    return '';
  }

  handleTouch(event: TouchGestureEventData): void {
    if (this.disabled) {
      this._active = false;
      return;
    }

    this._active = event.action === 'down' || event.action === 'move';
  }
}
