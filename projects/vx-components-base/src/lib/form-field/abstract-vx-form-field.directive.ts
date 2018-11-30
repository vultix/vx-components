import {ChangeDetectorRef, DoCheck, ElementRef, Input, OnChanges, OnDestroy, Optional, Self} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty, ErrorStateMatcher, VxFormComponent} from '../shared';

export abstract class AbstractVxFormFieldDirective<T> extends VxFormComponent<string> implements DoCheck {
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.handlePlaceholder();
  }

  protected _placeholder: string;

  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
    this.handlePlaceholder();
  }

  protected _label: string;

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

  constructor(
    protected elementRef: ElementRef<T>,
    cdr: ChangeDetectorRef,
    ngControl: NgControl,
    parentForm: NgForm,
    parentFormGroup: FormGroupDirective,
    errorStateMatcher: ErrorStateMatcher,
  ) {
    super(cdr, ngControl, parentForm, parentFormGroup, errorStateMatcher);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.checkErrorState();
    }

    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    // TODO:
    // this._dirtyCheckNativeValue();
  }


  protected handlePlaceholder(): void {
    this.setNativePlaceholder((this.label && this.placeholder) ? this.placeholder : '');
    // TODO: mobile hide hint
    // this._showHint = !!this.placeholder && !!this.label;
    this.cdr.markForCheck();
  }

  protected abstract setNativePlaceholder(placeholder: string);
}
