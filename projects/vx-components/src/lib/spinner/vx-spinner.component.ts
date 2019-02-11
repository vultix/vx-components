import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { VxThemeColor } from '../shared/vx-theme-color';

@Component({
  selector: 'vx-spinner',
  templateUrl: './vx-spinner.component.html',
  styleUrls: ['./vx-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-spinner',
    '[class.vx-spinner-light]': `color === 'light'`,
    '[class.vx-spinner-dark]': `color === 'dark'`,
    '[class.vx-spinner-primary]': `color === 'primary'`,
    '[class.vx-spinner-accent]': `color === 'accent'`,
    '[class.vx-spinner-error]': `color === 'error'`,
    '[class.vx-spinner-success]': `color === 'success'`,
    '[class.vx-spinner-warn]': `color === 'warn'`
  }
})
export class VxSpinnerComponent {
  @Input() color: VxThemeColor = 'primary';
}
