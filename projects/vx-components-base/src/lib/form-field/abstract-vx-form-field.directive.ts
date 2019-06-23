import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ElementRef, Input } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ErrorStateMatcher, VxFormComponent } from '../shared';

export abstract class AbstractVxFormFieldDirective<T> extends VxFormComponent<string> {
  /**
   * Notifies that our state may have changed, so that the parent field may respond accordingly
   */
  readonly stateChanges = new Subject<void>();
  protected _placeholder = '';
  protected _label = '';
  private _hideRequiredMarker = false;

  constructor(
    protected elementRef: ElementRef<T>,
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    ngControl: NgControl,
    parentForm: NgForm,
    parentFormGroup: FormGroupDirective
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);

    // Every time the cdr is told to check for changes we notify that our state may have changed
    const oldCheck = cdr.markForCheck.bind(cdr);
    cdr.markForCheck = () => {
      this.stateChanges.next();
      oldCheck();
    };
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  /** Whether or not to hide the required marker */
  @Input()
  get hideRequiredMarker(): boolean {
    return this._hideRequiredMarker;
  }

  set hideRequiredMarker(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._hideRequiredMarker) {
      this.cdr.markForCheck();
      this.stateChanges.next();
    }
  }

  abstract focus(): void;
}
