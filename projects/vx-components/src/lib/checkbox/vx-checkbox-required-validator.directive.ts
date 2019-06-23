import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, CheckboxRequiredValidator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: `vx-checkbox[required][formControlName], vx-checkbox[required][formControl], vx-checkbox[required][ngModel]`,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => VxCheckboxRequiredValidatorDirective),
    multi: true
  }],
  host: {'[attr.required]': 'required ? "" : null'}
})
export class VxCheckboxRequiredValidatorDirective extends CheckboxRequiredValidator {
  validate(control: AbstractControl): ValidationErrors | null {
    return super.validate(control);
  }
}
