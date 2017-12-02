import {AfterContentInit, ChangeDetectorRef, Component, ContentChildren, QueryList} from '@angular/core';
import {VxStepComponent} from './step.component';
import {TabbableController} from '../shared/tab-controller';

@Component({
  selector: 'vx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class VxStepperComponent extends TabbableController<VxStepComponent> implements AfterContentInit {
  @ContentChildren(VxStepComponent) steps: QueryList<VxStepComponent>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngAfterContentInit(): void {
    this.setTabbables(this.steps);
  }

  selectStep(step: number): void {
    this.setSelectedIndex(step);
  }
}
