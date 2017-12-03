import {Component, Input} from '@angular/core';
import {VxStepComponent} from '../step.component';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'vx-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss']
})
export class VxStepHeaderComponent {
  @Input() step: VxStepComponent;
  @Input() number: number;
  @Input() disabled = false;
}
