import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  AbstractVxRadioButtonComponent,
  AbstractVxRadioGroupComponent,
  VX_RADIO_GROUP_TOKEN
} from 'vx-components-base';

@Component({
  selector: 'vx-radio-button',
  templateUrl: 'vx-radio-button.component.html',
  styleUrls: ['vx-radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vx-radio-button]': 'true',
    '[class.vx-error]': 'group.errorState',
    '[class.vx-disabled]': 'disabled',
    '[class.vx-checked]': 'checked',
    '[class.vx-focused]': 'focused',
    '[attr.tabIndex]': 'tabIndex',
    '(focusin)': 'focused = true',
    '(focusout)': 'focused = false',
    '(keyup.space)': '_handleSelect($event)',
    '(click)': '_handleSelect($event)'
  }
})

export class VxRadioButtonComponent<T> extends AbstractVxRadioButtonComponent<T> {
  focused = false;
  @Input() tabIndex = 0;
  protected componentName = 'vx-radio-button';

  constructor(cdr: ChangeDetectorRef, @Inject(VX_RADIO_GROUP_TOKEN) group: AbstractVxRadioGroupComponent<T>) {
    super(cdr, group);
  }

  _handleSelect(event: Event): void {
    if (!this.checked) {
      this.group._handleButtonSelect(this.value);
      event.stopPropagation();
    }
  }
}
