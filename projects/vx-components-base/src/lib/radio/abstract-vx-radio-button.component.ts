import {ChangeDetectorRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {coerceBooleanProperty} from '../shared';
import {AbstractVxRadioGroupComponent} from './abstract-vx-radio-group.component';
import {VX_RADIO_GROUP_TOKEN} from './vx-radio-group.token';
import {Subject} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';

export abstract class AbstractVxRadioButtonComponent<T> implements OnDestroy, OnInit {
  protected abstract componentName: string;

  /** Whether the radio button is disabled */
  @Input()
  get disabled(): boolean { return this._disabled || this.group.disabled; }
  set disabled(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this._disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }
  protected _disabled = false;

  /** Whether the radio button is disabled */
  @Input()
  get checked(): boolean { return this.value === this.group.value }
  set checked(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value && value !== this.checked) {
      this.group.value = this.value;
    } else if (!value && value !== this.checked) {
      this.group.value = undefined as any as T;
    }
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  @Input() value!: T;

  @Input()
  get name(): string {
    return this._name || this.group.name;
  }

  set name(value: string) {
    this._name = value;
  }
  private _name = '';

  private onDestroy$ = new Subject<void>();
  private wasChecked = false;
  constructor(protected cdr: ChangeDetectorRef, public group: AbstractVxRadioGroupComponent<T>) {
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
}
