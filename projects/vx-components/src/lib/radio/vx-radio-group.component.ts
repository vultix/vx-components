import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  OnInit,
  Optional,
  QueryList,
  Self,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AbstractVxRadioGroupComponent, ErrorStateMatcher, VX_RADIO_GROUP_TOKEN } from 'vx-components-base';
import { VxRadioButtonComponent } from './vx-radio-button.component';

@Component({
  selector: 'vx-radio-group',
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['vx-radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vx-radio-group]': 'true',
    '[class.vx-error]': 'errorState',
    '[class.vx-disabled]': 'disabled',
    '(keyup.ArrowRight)': '_next()',
    '(keyup.ArrowDown)': '_next()',
    '(keyup.ArrowLeft)': '_previous()',
    '(keyup.ArrowUp)': '_previous()'
  },
  providers: [
    {
      provide: VX_RADIO_GROUP_TOKEN,
      useExisting: forwardRef(() => VxRadioGroupComponent)
    }
  ]
})
export class VxRadioGroupComponent<T> extends AbstractVxRadioGroupComponent<T> implements OnInit {
  @ContentChildren(VxRadioButtonComponent) buttons!: QueryList<VxRadioButtonComponent<T>>;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);
  }
}
