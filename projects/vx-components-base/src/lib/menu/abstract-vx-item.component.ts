import {
  AfterViewInit,
  ChangeDetectorRef,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AbstractVxMenuComponent } from './abstract-vx-menu.component';

let _vxItemIdCounter = 0;

// VX_ITEM_INPUTS: 'value', 'disabled', '_transparentChild'
// VX_ITEM_OUTPUTS: 'select'
export abstract class AbstractVxItemComponent<T> implements OnDestroy {
  @ViewChild('template', {static: true, read: TemplateRef}) _template!: TemplateRef<any>;

  /**
   * Emits when the item is selected
   */
  // @Output()
  readonly select = new EventEmitter<T>();
  _id = `vx-item-${_vxItemIdCounter++}`;
  _transparentParent?: AbstractVxItemComponent<T>;
  protected __transparentChild?: AbstractVxItemComponent<T>;
  protected onDestroy$ = new Subject<void>();
  private _value!: T;
  private _disabled = false;

  protected constructor(protected cdr: ChangeDetectorRef, public _menu?: AbstractVxMenuComponent<T, any>) {
  }

  // @Input()
  get value(): T {
    return this._value;
  }

  set value(value: T) {
    if (this._transparentParent) {
      this._transparentParent.value = value;
      this._transparentParent.cdr.markForCheck();
    }

    if (value !== this.value) {
      this._value = value;
      this.cdr.markForCheck();
    }
  }

  // @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    disabled = coerceBooleanProperty(disabled);
    if (this._transparentParent) {
      this._transparentParent.disabled = disabled;
      this._transparentParent.cdr.markForCheck();
    }

    if (disabled !== this.disabled) {
      this._disabled = disabled;
      this.cdr.markForCheck();
    }
  }

  get _transparentChild(): AbstractVxItemComponent<T> | undefined {
    return this.__transparentChild;
  }

  set _transparentChild(wrappedItem: AbstractVxItemComponent<T> | undefined) {
    if (!wrappedItem) {
      return;
    }

    this.value = wrappedItem.value;
    this.disabled = wrappedItem.disabled;
    wrappedItem._transparentParent = this;
    wrappedItem.cdr.detectChanges();
    this.__transparentChild = wrappedItem;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  _handleSelect(): void {
    if (this._transparentChild) {
      this._transparentChild._handleSelect()
    }

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
