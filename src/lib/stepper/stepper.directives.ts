import {AfterViewChecked, Directive, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {VxStepperComponent} from './stepper.component';
import {TabbableController} from '../shared/tab-controller';
import {VxStepComponent} from './step.component';

@Directive({
  selector: '[vxStepperPrevious], [vxStepperBack]',
  host: {
    '(click)': '_stepper.previous()'
  }
})
export class VxStepperPreviousDirective {
  constructor(public _stepper: TabbableController<VxStepComponent>) {
  }
}

@Directive({
  selector: '[vxStepperNext]',
  host: {
    '(click)': '_stepper.next()'
  }
})
export class VxStepperNextDirective {
  constructor(public _stepper: TabbableController<VxStepComponent>) {
  }
}

@Directive({
  selector: 'ng-template[vxStepLabel]'
})
export class VxStepLabelDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[vxBindOffsetHeight]'
})
export class VxBindOffsetHeightDirective implements AfterViewChecked {
  @Input() vxBindOffsetHeight: HTMLDivElement;

  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked(): void {
    if (this.el.nativeElement) {
      this.el.nativeElement.style.maxHeight = `${this.vxBindOffsetHeight.offsetHeight}px`;
    }
  }
}
