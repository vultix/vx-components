/** Error state matcher that matches when a control is invalid and dirty. */
import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Injectable()
export class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control?: FormControl, form?: FormGroupDirective | NgForm): boolean {
    return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
  }
}

/** Provider that defines how form controls behave with regards to displaying error messages. */
@Injectable({providedIn: 'root'})
export class ErrorStateMatcher {
  isErrorState(control?: FormControl, form?: FormGroupDirective | NgForm): boolean {
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}

