import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, Input} from '@angular/core';
import {RADIO_GROUP} from './radio-group.token';
import {VxRadioGroupComponent} from './radio-group.component';

export interface IVxRadioGroupComponent<T> extends VxRadioGroupComponent<T> {

}

@Component({
  selector: 'vx-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  host: {
    '(click)': 'onClick()',
    '(keyup.space)': 'onClick()',
    '(keyup.enter)': 'onClick()',
    '[attr.tabIndex]': '0'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxRadioButtonComponent<T> {
  /** Whether the radio button is disabled. */
  @HostBinding('class.disabled')
  @Input() disabled = false;

  @Input() value?: T; // TODO: strictPropertyInitialization!
  @Input() name: string;

  // TODO: is there another way to import without circular dependency?
  constructor(@Inject(RADIO_GROUP) public group: IVxRadioGroupComponent<T>, private cdr: ChangeDetectorRef) {
  }

  onClick(): void {
    if (this.value)
      this.group._setValue(this.value);
  }

  _markForCheck(): void {
    this.cdr.markForCheck();
  }

}
