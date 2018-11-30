import {FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {ErrorStateMatcher} from '../error-options';
import {Constructor} from './constructor';

export interface FormComponentMixin {
  readonly stateChanges: Subject<void>;
  errorState: boolean;
  checkErrorState(): void;
}

export type FormComponentMixingCtor = Constructor<FormComponentMixin>;

export interface FormComponentMixinRequirements {
  errorStateMatcher: ErrorStateMatcher;
  _parentFormGroup: FormGroupDirective;
  _parentForm: NgForm;
  ngControl: NgControl;
}

export function formComponentMixin<T extends Constructor<FormComponentMixinRequirements>>(classToMix: T): FormComponentMixingCtor & T {
  return class extends classToMix {
    errorState: boolean;

    readonly stateChanges = new Subject<void>();

    checkErrorState(): void {
      // TODO: How to fix typings on this?
      const that = this as FormComponentMixinRequirements;
      const oldState = this.errorState;
      const parent = that._parentFormGroup || that._parentForm;
      const matcher = that.errorStateMatcher;
      const control = that.ngControl ? that.ngControl.control as FormControl : null;
      const newState = matcher.isErrorState(control, parent);

      if (newState !== oldState) {
        this.errorState = newState;
        this.stateChanges.next();
      }
    }
  };
}
