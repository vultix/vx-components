import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ElementRef, Input } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ErrorStateMatcher, VxFormComponent } from '../shared';


// VX_FORM_INPUTS: 'id', 'value', 'disabled', 'required'
// VX_FORM_FIELD_DIRECTIVE_INPUTS: 'placeholder', 'label', 'hideRequiredMarker', 'showRequiredMarker'

// VX_FORM_OUTPUTS: 'focusedChange', 'valueChange'
// VX_FORM_FIELD_DIRECTIVE_OUTPUTS


export abstract class AbstractVxFormFieldDirective<T> extends VxFormComponent<string> {
  /**
   * Notifies that our state may have changed, so that the parent field may respond accordingly
   */
  readonly stateChanges = new Subject<void>();
  protected _placeholder = '';
  protected _label = '';
  private _hideRequiredMarker = false;
  private _showRequiredMarker = false;

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

  // @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  // @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  /** Whether or not to hide the required marker */
  // @Input()
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

  get showRequiredMarker(): boolean {
    return this._showRequiredMarker;
  }

  set showRequiredMarker(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._showRequiredMarker) {
      this.cdr.markForCheck();
      this.stateChanges.next();
    }
  }

  abstract focus(): void;

  protected parseValueInput(value: string): string {
    if (!value) {
      value = '';
    }

     return value.toString();
  }
}
