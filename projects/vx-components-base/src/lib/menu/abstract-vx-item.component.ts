import {
  AfterViewInit, ChangeDetectorRef,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {coerceBooleanProperty} from '../shared';
import {AbstractVxMenuComponent} from './abstract-vx-menu.component';

export abstract class AbstractVxItemComponent<T> {
  @ViewChild(TemplateRef) _template!: TemplateRef<any>;

  /**
   * Emits when the item is selected
   */
  @Output() select = new EventEmitter<T>();

  @Input()
  get value(): T {
    return this._value;
  }

  set value(value: T) {
    if (value !== this.value) {
      this._value = value;
      this.cdr.markForCheck();
    }
  }

  private _value!: T;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    disabled = coerceBooleanProperty(disabled);
    if (disabled !== this.disabled) {
      this._disabled = disabled;
      this.cdr.markForCheck();
    }
  }

  private _disabled = false;

  protected constructor(protected cdr: ChangeDetectorRef, public _menu?: AbstractVxMenuComponent<T, any>) {

  }

  _handleSelect(): void {
    if (this.disabled) {
      return;
    }

    this.select.emit(this.value);

    if (this._menu) {
      this._menu.itemSelect.emit(this.value);
    }
  }

  abstract getTextContent(): string;
}
