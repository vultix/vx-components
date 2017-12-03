import {Component, HostBinding, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'vx-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  host: {
    '(click)': 'onClick.next()',
    '(keyup.space)': 'onClick.next()',
    '(keyup.enter)': 'onClick.next()',
    '[attr.tabIndex]': '0'
  }
})
export class VxRadioButtonComponent {
  /** Whether the radio button is disabled. */
  @HostBinding('class.disabled')
  @Input() disabled = false;

  @Input() value: any;
  @Input() name: string;
  selected = false;

  /** @--internal */
  onClick = new Subject();

}
