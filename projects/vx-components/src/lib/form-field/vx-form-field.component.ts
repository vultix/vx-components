import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ViewEncapsulation} from '@angular/core';
import {AbstractVxFormFieldComponent} from 'vx-components-base';
import {VxFormFieldDirective} from './vx-form-field.directive';

@Component({
  selector: 'vx-form-field',
  templateUrl: './vx-form-field.component.html',
  styleUrls: ['./vx-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vx-form-field]': 'true',
    '[class.vx-error]': 'field.errorState',
    '[class.vx-focused]': 'field.focused',
    '[class.vx-disabled]': 'field.disabled'
  }
})
export class VxFormFieldComponent extends AbstractVxFormFieldComponent {

  protected componentName = 'vx-form-field';
  protected fieldDirectiveName = 'vxFormField';

  @ContentChild(VxFormFieldDirective) field: VxFormFieldDirective;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

}
