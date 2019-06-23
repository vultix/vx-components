import { Directive, forwardRef } from '@angular/core';
import { CheckboxRequiredValidator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: `vx-slide-toggle[required][formControlName], vx-slide-toggle[required][formControl], vx-slide-toggle[required][ngModel]`,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => VxSlideToggleRequiredValidatorDirective),
    multi: true
  }],
  host: {'[attr.required]': 'required ? "" : null'}
})
export class VxSlideToggleRequiredValidatorDirective extends CheckboxRequiredValidator {}
