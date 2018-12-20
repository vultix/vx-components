import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { AbstractVxFormFieldComponent } from 'vx-components-base';
import { VxNsFormFieldDirective } from './vx-ns-form-field.directive';

@Component({
  selector: 'StackLayout[vx-ns-form-field]',
  templateUrl: './vx-ns-form-field.component.html',
  styleUrls: ['./vx-ns-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vx-ns-form-field]': 'true',
    '[class.vx-ns-error]': 'field.errorState',
    '[class.vx-ns-focused]': 'field.focused',
    '[class.vx-ns-disabled]': 'field.disabled'
  }
})
export class VxNsFormFieldComponent extends AbstractVxFormFieldComponent {

  @ContentChild(VxNsFormFieldDirective) field!: VxNsFormFieldDirective;
  protected componentName = 'vx-ns-form-field';
  protected fieldDirectiveName = 'vxNsFormField';

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

}
