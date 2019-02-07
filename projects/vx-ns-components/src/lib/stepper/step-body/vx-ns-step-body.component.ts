import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { VxNsStepComponent } from '../vx-ns-step.component';

@Component({
  selector: 'vx-ns-step-body',
  templateUrl: './vx-ns-step-body.component.html',
  styleUrls: ['./vx-ns-step-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VxNsStepBodyComponent {
  @Input() step!: VxNsStepComponent;
  @Input() last!: boolean;
  @Input() active!: boolean;
}
