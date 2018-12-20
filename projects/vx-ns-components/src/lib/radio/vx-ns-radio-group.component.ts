import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Injector,
  OnInit, Optional,
  QueryList, Self
} from '@angular/core';
import {FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm} from '@angular/forms';
import {
  AbstractVxRadioButtonComponent,
  AbstractVxRadioGroupComponent,
  VX_RADIO_GROUP_TOKEN,
  ErrorStateMatcher
} from 'vx-components-base';
import {VxNsRadioButtonComponent} from './vx-ns-radio-button.component';

@Component({
  selector: 'StackLayout[vx-ns-radio-group]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VX_RADIO_GROUP_TOKEN,
      useExisting: forwardRef(() => VxNsRadioGroupComponent)
    }
  ],
  host: {
    '[class.vx-ns-radio-group]': 'true',
    '[class.vx-ns-error]': 'errorState',
    '[class.vx-ns-disabled]': 'disabled',
  }
})
export class VxNsRadioGroupComponent<T> extends AbstractVxRadioGroupComponent<T> {
  @ContentChildren(VxNsRadioButtonComponent) buttons!: QueryList<AbstractVxRadioButtonComponent<T>>;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);

  }
}
