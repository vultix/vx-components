import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective, FormControl, NgModel} from '@angular/forms';

@Component({
  selector: 'vx-step',
  template: '<ng-content></ng-content>',
  styleUrls: ['../shared/tabbable.component.scss'],
  host: {
    '[style.paddingTop]': '0'
  }
})
export class VxStepComponent {
  @Input() label?: string;
  @Input() stepControl?: AbstractControlDirective | AbstractControl | NgModel;

  /** Whether this tab is the active tab */
  @HostBinding('class.active') active = false;

  @HostBinding('class.left') left = false;
  @HostBinding('class.right') right = false;
  @HostBinding('class.visible') visible: boolean;

  valid(): boolean {
    return this.stepControl ? !!this.stepControl.valid : true;
  }

  /** @internal */
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
