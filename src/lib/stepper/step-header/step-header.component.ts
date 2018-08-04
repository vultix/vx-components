import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {VxStepComponent} from '../step.component';

@Component({
  selector: 'vx-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxStepHeaderComponent {
  @Input() step: VxStepComponent;
  @Input() number: number;
  @Input() disabled = false;
  @Input() active: boolean;

  @HostBinding('class.vertical')
  @Input() vertical: boolean;
}
