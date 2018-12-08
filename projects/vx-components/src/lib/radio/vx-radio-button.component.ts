import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {AbstractVxRadioButtonComponent} from 'vx-components-base';

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
  protected componentName = 'vx-radio-button';
  focused = false;

  @Input() tabIndex = 0;

  _handleSelect(event: Event): void {
    if (!this.checked) {
      this.checked = true;
      event.stopPropagation();
    }
  }
}
