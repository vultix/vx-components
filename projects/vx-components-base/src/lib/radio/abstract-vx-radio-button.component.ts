import {
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '../shared';
import { AbstractVxRadioGroupComponent } from './abstract-vx-radio-group.component';

export abstract class AbstractVxRadioButtonComponent<T> implements OnDestroy, OnInit, OnChanges {
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() value!: T;
  protected abstract componentName: string;
  protected _disabled = false;
  private _name = '';
  private onDestroy$ = new Subject<void>();
  private wasChecked = false;

  constructor(protected cdr: ChangeDetectorRef, public group: AbstractVxRadioGroupComponent<T>) {
  }

  /** Whether the radio button is disabled */
  @Input()
  get disabled(): boolean {
    return this._disabled || this.group.disabled;
  }

  set disabled(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this._disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }

  /** Whether the radio button is disabled */
  @Input()
  get checked(): boolean {
    return this.value === this.group.value;
  }

  set checked(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value && value !== this.checked) {
      this.group.value = this.value;
    } else if (!value && value !== this.checked) {
      this.group.value = undefined as any as T;
    }
  }

  @Input()
  get name(): string {
    return this._name || this.group.name;
  }

  set name(value: string) {
    this._name = value;
  }

  ngOnInit(): void {
    if (!this.group) {
      throw new Error(`${this.componentName} without a surrounding group component`);
    }

    // Watches for the groups value changes to emit changes to this field's being checked
    this.group.valueChange.pipe(takeUntil(this.onDestroy$), startWith(this.group.value)).subscribe(value => {
      if (value !== value && this.wasChecked) {
        this.wasChecked = false;
        this.checkedChange.emit(false);
      } else if (value === this.value && !this.wasChecked) {
        this.wasChecked = true;
        this.checkedChange.emit(true);
      }
    });
  }

  _markForCheck(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('checked' in changes) {
      // In case the checked input was set before the value input.
      if (this.checked !== changes.checked.currentValue) {
        this.checked = changes.checked.currentValue;
      }
    }
  }
}
