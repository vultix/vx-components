import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnInit,
  Optional, Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AbstractVxCheckboxComponent, ErrorStateMatcher } from 'vx-components-base';

@Component({
  selector: 'vx-checkbox',
  templateUrl: 'vx-checkbox.component.html',
  styleUrls: ['vx-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'vx-checkbox',
    '[class.vx-checked]': 'checked',
    '[class.vx-disabled]': 'disabled',
    '[class.vx-error]': 'errorState',
    '[class.vx-focused]': 'focused',
    '[attr.tabIndex]': 'tabIndex',
    '(focusin)': '_setHasFocus(true)',
    '(focusout)': '_setHasFocus(false)',
    '(keydown.space)': '_toggleFromNative()',
    '(keydown.enter)': '_toggleFromNative()',
    '(click)': '_toggleFromNative()'
  }
})

export class VxCheckboxComponent extends AbstractVxCheckboxComponent {
  @Input() tabIndex = 0;

  @ViewChild('checkbox', {static: true}) _checkbox!: ElementRef<HTMLInputElement>;

  // TODO: Handle the name in a better way, also ensure that submitting a form submits natively, without angular.
  @Input() name!: string;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);
  }

  protected getNativeValue(): boolean {
    return this._checkbox.nativeElement.checked;
  }

  protected setNativeValue(val: boolean): void {
    this._checkbox.nativeElement.checked = val;
  }
}
