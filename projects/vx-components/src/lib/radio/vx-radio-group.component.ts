import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef, Injector,
  OnInit, Optional,
  QueryList, Self,
  ViewEncapsulation
} from '@angular/core';
import {AbstractVxRadioGroupComponent, VX_RADIO_GROUP_TOKEN, ErrorStateMatcher} from 'vx-components-base';
import {VxRadioButtonComponent} from './vx-radio-button.component';
import {FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm} from '@angular/forms';

@Component({
  selector: 'vx-radio-group',
  template: `<ng-content></ng-content>`,
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
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxRadioGroupComponent),
      multi: true
    },
    {
      provide: VX_RADIO_GROUP_TOKEN,
      useExisting: forwardRef(() => VxRadioGroupComponent)
    }
  ],
})
export class VxRadioGroupComponent<T> extends AbstractVxRadioGroupComponent<T> implements OnInit {
  @ContentChildren(VxRadioButtonComponent) buttons!: QueryList<VxRadioButtonComponent<T>>;

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
    this.ngControl = this.injector.get(NgControl);
  }
}
