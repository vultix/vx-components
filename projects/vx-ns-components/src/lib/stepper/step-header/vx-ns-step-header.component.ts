import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures';
import { VxNsStepComponent } from '../vx-ns-step.component';

@Component({
  selector: 'vx-ns-step-header',
  templateUrl: './vx-ns-step-header.component.html',
  styleUrls: ['./vx-ns-step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VxNsStepHeaderComponent {
  @Input() step!: VxNsStepComponent;
  @Input() active = false;
  @Input() number!: number;
  @Input() disabled = false;
  @Output() tap = new EventEmitter();

  fingerDown = false;

  handleTouch(event: TouchGestureEventData): void {
    this.fingerDown = event.action === 'down' || event.action === 'move';
  }
}
