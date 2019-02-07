import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { VxStepComponent } from '../vx-step.component';

@Component({
  selector: 'vx-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-step-header',
    '[class.vx-active]': 'active',
    '[class.vx-disabled]': 'disabled'
  }
})
export class VxStepHeaderComponent {
  @Input() step!: VxStepComponent;
  @Input() number!: number;
  @Input() disabled = false;
  @Input() active!: boolean;
}
