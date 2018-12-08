import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Injector,
  OnInit, Optional,
  QueryList
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
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxNsRadioGroupComponent),
      multi: true
    },
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
export class VxNsRadioGroupComponent<T> extends AbstractVxRadioGroupComponent<T> implements OnInit {
  @ContentChildren(VxNsRadioButtonComponent) buttons!: QueryList<AbstractVxRadioButtonComponent<T>>;

  constructor(
    protected injector: Injector,
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
  ) {
    super(cdr, errorStateMatcher, undefined, parentForm, parentFormGroup);
  }

  ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl);
    } catch (e) {}
  }
}