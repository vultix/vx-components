import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, HostListener,
  Input,
  OnInit,
  Optional, Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AbstractVxCheckboxComponent, ErrorStateMatcher } from 'vx-components-base';
import { getTouchPos } from '../shared/util';

const MAX_HANDLE_LEFT = 13;
const MIN_HANDLE_LEFT = -3;

@Component({
  selector: 'vx-slide-toggle',
  templateUrl: 'vx-slide-toggle.component.html',
  styleUrls: ['vx-slide-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // VX_CHECKBOX_INPUTS
  inputs: [
    'id', 'value', 'disabled', 'required', 'checked'
  ],
  host: {
    'class': 'vx-slide-toggle',
    '[class.vx-checked]': 'checked',
    '[class.vx-disabled]': 'disabled',
    '[class.vx-error]': 'errorState',
    '[class.vx-focused]': 'focused',
    '[attr.tabIndex]': 'disabled ? -1 : tabIndex',
    '(focusin)': '_setHasFocus(true)',
    '(focusout)': '_setHasFocus(false)',
    '(keydown.space)': '_toggleFromUser()',
    '(keydown.enter)': '_toggleFromUser()',
    '(click)': '_toggleFromUser()'
  }
})

export class VxSlideToggleComponent extends AbstractVxCheckboxComponent {
  @Input() tabIndex = 0;

  @ViewChild('checkbox', {static: true}) _checkbox!: ElementRef<HTMLInputElement>;

  // TODO: Handle the name in a better way, also ensure that submitting a form submits natively, without angular.
  @Input() name!: string;

  _transitionHandle = true;
  _handleLeft = MIN_HANDLE_LEFT;

  private touchX = 0;
  private touchDown = false;
  private didMove = false;
  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);
  }

  public _toggleFromUser(): boolean {
    if (this.didMove) {
      this.didMove = false;

      return true;
    }

    return super._toggleFromUser();
  }


  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  _handleTouchStart(event: MouseEvent | TouchEvent): void {
    this.touchX = getTouchPos(event).x;
    this.touchDown = true;
    this.didMove = false;
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  _handleTouchMove(event: MouseEvent | TouchEvent): void {
    if (this.touchDown) {
      const newTouchX = getTouchPos(event).x;

      this._handleLeft += newTouchX - this.touchX;

      if (this._handleLeft < MIN_HANDLE_LEFT) {
        this._handleLeft = MIN_HANDLE_LEFT
      } else if (this._handleLeft > MAX_HANDLE_LEFT) {
        this._handleLeft = MAX_HANDLE_LEFT;
      }

      this.touchX = newTouchX;
      this._transitionHandle = false;
      this.didMove = true;

      event.preventDefault();
    }
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  handleTouchEnd(): void {
    if (this.touchDown) {
      this.touchDown = false;
      if (!this.didMove) {
        return;
      }

      this._transitionHandle = true;

      const dragArea = MAX_HANDLE_LEFT - MIN_HANDLE_LEFT;
      const dragPos = this._handleLeft - MIN_HANDLE_LEFT;

      if (dragPos >= (dragArea / 2) && !this.checked) {
        this.setValueFromUser(true);
      } else if (dragPos < (dragArea / 2) && this.checked) {
        this.setValueFromUser(false);
      } else {
        this.updateHandleLeft();
      }
    }
  }

  protected handleValueSet(value: boolean): void {
    super.handleValueSet(value);
    this.updateHandleLeft();
  }

  protected getNativeValue(): boolean {
    return this._checkbox.nativeElement.checked;
  }

  protected setNativeValue(val: boolean): void {
    this._checkbox.nativeElement.checked = val;
  }

  private updateHandleLeft(): void {
    this._handleLeft = this.checked ? MAX_HANDLE_LEFT : MIN_HANDLE_LEFT;
  }
}
