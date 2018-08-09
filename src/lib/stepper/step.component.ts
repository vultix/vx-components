import {AfterViewChecked, Component, ContentChild, ElementRef, HostBinding, Input, TemplateRef, ViewChild} from '@angular/core';
import {AbstractControl, AbstractControlDirective, FormControl, NgModel} from '@angular/forms';
import {VxStepLabelDirective} from './stepper.directives';

@Component({
  selector: 'vx-step',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class VxStepComponent {
  @Input() label?: string;
  @Input() stepControl?: AbstractControlDirective | AbstractControl | NgModel;
  @Input() invalid = false;
  @ContentChild(VxStepLabelDirective) stepLabel: VxStepLabelDirective;

  @ViewChild(TemplateRef) _template: TemplateRef<any>;

  valid(): boolean {
    return this.invalid || (this.stepControl ? !!this.stepControl.valid : true);
  }

  /** @--internal */
  markAsTouched(): void {
    const control = this.getControl();
    if (control) {
      markAllTouched(control);
    }
  }

  private getControl(): AbstractControl | undefined {
    let control: AbstractControl | undefined;
    if (this.stepControl instanceof NgModel || this.stepControl instanceof AbstractControlDirective) {
      if (this.stepControl.control) {
        control = this.stepControl.control;
      }
    } else {
      control = this.stepControl;
    }
    return control;
  }
}

function markAllTouched(control: AbstractControl): void {
  if (control.hasOwnProperty('controls')) {
    control.markAsTouched(); // mark group
    const ctrl = control as any;
    for (const inner in ctrl.controls) {
      if (ctrl.controls.hasOwnProperty(inner))
        markAllTouched(ctrl.controls[inner] as AbstractControl);
    }
  } else {
    ((control) as FormControl).markAsTouched();
  }
}
