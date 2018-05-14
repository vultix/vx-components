import {Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {coerceBooleanProperty} from '../shared/util';

const MAX_HANDLE_LEFT = 13;
const MIN_HANDLE_LEFT = -3;

@Component({
  selector: 'vx-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxSlideToggleComponent),
      multi: true
    }
  ]
})
export class VxSlideToggleComponent implements ControlValueAccessor {
  /** Whether the checkbox is disabled. */
  @HostBinding('class.disabled')
  @Input() disabled = false;
  /** Name value will be applied to the input element if present */
  @Input() name: string;
  /** Emitted when the checkbox's `checked` value changes. */
  @Output() checkedChange = new EventEmitter<boolean>();

  handleLeft = -3;
  transitionHandle = true;

  private touchX: number;
  private touchDown = false;
  private didMove = false;

  /** NgModel support */
  private _onChangeFn = (v: boolean) => v;
  private _onTouchedFn = () => {
  };

  private _tabIndex = 0;

  /** The checkbox's tabIndex */
  @HostBinding('attr.tabIndex')
  @Input()
  get tabIndex(): number {
    return this.disabled ? -1 : this._tabIndex;
  }

  set tabIndex(tabIndex: number) {
    this._tabIndex = tabIndex;
  };

  private _checked = false;

  /** Whether the checkbox is checked */
  @HostBinding('class.checked')
  @Input()
  get checked(): boolean {
    return this._checked;
  };

  set checked(checked: boolean) {
    checked = coerceBooleanProperty(checked);
    this._onChangeFn(checked);
    this._onTouchedFn();
    this._checked = checked;
    this.checkedChange.emit(checked);
    this.updateHandleLeft();
  };

  /** Toggles the `checked` state of the checkbox. */
  @HostListener('click')
  @HostListener('keydown.space')
  @HostListener('keydown.enter')
  public toggle(): boolean {
    if (this.didMove) {
      this.didMove = false;
      return;
    }

    this.checked = !this.checked;

    return false;
  }

  writeValue(checked: boolean): void {
    if (checked === true || checked === false && this._checked !== checked) {
      this._checked = checked;
      this.checkedChange.emit(checked);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  handleTouchStart(event: MouseEvent | TouchEvent): void {
    this.touchX = getTouchPos(event);
    this.touchDown = true;
    this.didMove = false;
  }

  handleTouchMove(event: MouseEvent | TouchEvent): void {
    if (this.touchDown) {
      const newTouchX = getTouchPos(event);

      this.handleLeft += newTouchX - this.touchX;

      if (this.handleLeft < MIN_HANDLE_LEFT) {
        this.handleLeft = MIN_HANDLE_LEFT
      } else if (this.handleLeft > MAX_HANDLE_LEFT) {
        this.handleLeft = MAX_HANDLE_LEFT;
      }

      this.touchX = newTouchX;
      this.transitionHandle = false;
      this.didMove = true;

      event.preventDefault();
    }
  }


  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  handleTouchEnd(): void {
    this.touchDown = false;
    this.transitionHandle = true;

    const dragArea = MAX_HANDLE_LEFT - MIN_HANDLE_LEFT;
    const dragPos = this.handleLeft - MIN_HANDLE_LEFT;

    if (dragPos >= (dragArea / 2) && !this.checked) {
      this.checked = true;
    } else if (dragPos < (dragArea / 2) && this.checked) {
      this.checked = false;
    } else {
      this.updateHandleLeft();
    }

  }

  private updateHandleLeft(): void {
    this.handleLeft = this.checked ? MAX_HANDLE_LEFT : MIN_HANDLE_LEFT;
  }
}


function getTouchPos(event: MouseEvent | TouchEvent): number {
  if (event instanceof TouchEvent) {
    return event.touches[0].clientX;
  } else {
    return event.clientX;
  }
}
