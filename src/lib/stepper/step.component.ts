import {AfterViewChecked, Component, ElementRef, HostBinding, Input, TemplateRef, ViewChild} from '@angular/core';
import {AbstractControl, AbstractControlDirective, FormControl, NgModel} from '@angular/forms';

@Component({
  selector: 'vx-step',
  template: '<ng-template><div #container><ng-content></ng-content></div></ng-template>',
})
export class VxStepComponent implements AfterViewChecked {
  @Input() label?: string;
  @Input() stepControl?: AbstractControlDirective | AbstractControl | NgModel;
  @Input() invalid = false;

  @ViewChild(TemplateRef) content: TemplateRef<any>;
  @ViewChild('container') container: ElementRef;

  /** Whether this tab is the active tab */
  @HostBinding('class.active') active = false;

  @HostBinding('class.left') left = false;
  @HostBinding('class.right') right = false;
  @HostBinding('class.visible') visible: boolean;

  contentHeight: number;

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

  ngAfterViewChecked(): void {
    this.contentHeight = this.container.nativeElement.offsetHeight;
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