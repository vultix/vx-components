import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, ViewEncapsulation} from '@angular/core';
import {AbstractVxRadioButtonComponent, AbstractVxRadioGroupComponent, VX_RADIO_GROUP_TOKEN} from 'vx-components-base';

@Component({
  selector: 'GridLayout[vx-ns-radio-button]',
  templateUrl: 'vx-ns-radio-button.component.html',
  styleUrls: ['vx-ns-radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[rows]': '"auto"',
    '[columns]': '"auto, *"',
    '[class.vx-ns-radio-button]': 'true',
    '[class.vx-ns-error]': 'group.errorState',
    '[class.vx-ns-disabled]': 'disabled',
    '[class.vx-ns-checked]': 'checked',
    '(tap)': '_handleTap()'
  }
})

export class VxNsRadioButtonComponent<T> extends AbstractVxRadioButtonComponent<T> {
  protected componentName = 'vx-ns-radio-button';

  @Input() text!: string;

  constructor(cdr: ChangeDetectorRef, @Inject(VX_RADIO_GROUP_TOKEN) group: AbstractVxRadioGroupComponent<T>) {
    super(cdr, group);
  }

  _handleTap(): void {
    this.group._handleButtonSelect(this.value);
  }
}
