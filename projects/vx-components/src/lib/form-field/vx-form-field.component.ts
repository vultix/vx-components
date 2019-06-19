import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { AbstractVxFormFieldComponent } from 'vx-components-base';
import { VxFormFieldDirective } from './vx-form-field.directive';

@Component({
  selector: 'vx-form-field',
  templateUrl: './vx-form-field.component.html',
  styleUrls: ['./vx-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-form-field',
    '[class.vx-error]': 'field.errorState',
    '[class.vx-focused]': 'field.focused',
    '[class.vx-disabled]': 'field.disabled'
  }
})
export class VxFormFieldComponent extends AbstractVxFormFieldComponent {
  @ContentChild(VxFormFieldDirective, {static: false}) field!: VxFormFieldDirective;
  protected componentName = 'vx-form-field';
  protected fieldDirectiveName = 'vxFormField';

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

}
