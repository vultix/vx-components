import {ChangeDetectorRef, DoCheck, ElementRef, Input} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty, ErrorStateMatcher, VxFormComponent} from '../shared';
import {Subject} from 'rxjs';

export abstract class AbstractVxFormFieldDirective<T> extends VxFormComponent<string> {
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.handlePlaceholder();
  }

  protected _placeholder = '';

  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
    this.handlePlaceholder();
  }

  protected _label = '';

  @Input()
  get showLabel(): boolean {
    return this._showLabel;
  }

  set showLabel(value: boolean) {
    value = coerceBooleanProperty(value);

    if (value !== this.showLabel) {
      this._showLabel = value;
      this.cdr.markForCheck();
      this.stateChanges.next();
    }
  }

  protected _showLabel = true;

  /** Whether or not to hide the required marker */
  @Input()
  get hideRequiredMarker(): boolean { return this._hideRequiredMarker; }
  set hideRequiredMarker(value) {
    value = coerceBooleanProperty(value);
    if (value !== this._hideRequiredMarker) {
      this.cdr.markForCheck();
      this.stateChanges.next();
    }
  }
  private _hideRequiredMarker = false;

  /**
   * Notifies that our state may have changed, so that the parent field may respond accordingly
   */
  readonly stateChanges = new Subject<void>();

  constructor(
    protected elementRef: ElementRef<T>,
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    ngControl: NgControl,
    parentForm: NgForm,
    parentFormGroup: FormGroupDirective,
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);

    // Every time the cdr is told to check for changes we notify that our state may have changed
    const oldCheck = cdr.markForCheck.bind(cdr);
    cdr.markForCheck = () => {
      this.stateChanges.next();
      oldCheck();
    }
  }


  protected handlePlaceholder(): void {
    this.setNativePlaceholder((this.label && this.placeholder) ? this.placeholder : '');
    this.cdr.markForCheck();
  }

  protected abstract setNativePlaceholder(placeholder: string): void;
}
