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
import { coerceBooleanProperty } from '../shared';
import { AbstractVxMenuComponent } from './abstract-vx-menu.component';

let _vxItemIdCounter = 0;

export abstract class AbstractVxItemComponent<T> implements OnDestroy, AfterViewInit {
  @ViewChild(TemplateRef) _template!: TemplateRef<any>;
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  /**
   * Emits when the item is selected
   */
  @Output() select = new EventEmitter<T>();
  embeddedView?: EmbeddedViewRef<any>;
  _id = `vx-item-${_vxItemIdCounter++}`;
  protected _child?: AbstractVxItemComponent<T>;
  protected __parent?: AbstractVxItemComponent<T>;
  protected onDestroy$ = new Subject<void>();
  private _value!: T;
  private _disabled = false;

  protected constructor(protected cdr: ChangeDetectorRef, public _menu?: AbstractVxMenuComponent<T, any>) {

  }

  @Input()
  get value(): T {
    return this._parent ? this._parent.value : this._value;
  }

  set value(value: T) {
    if (value !== this.value) {
      this._value = value;
      this.cdr.markForCheck();
    }
  }

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

  get _parent(): AbstractVxItemComponent<T> | undefined {
    return this.__parent;
  }

  @Input()
  set _parent(parent: AbstractVxItemComponent<T> | undefined) {
    if (!parent) {
      return;
    }

    parent._child = this;
    this._template = parent._template;
    this.__parent = parent;
    this.select.pipe(takeUntil(this.onDestroy$)).subscribe((value: T) => parent._handleSelect());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit(): void {
    if (this._child) {
      return; // Do not render
    }

    if (this.__parent && this.__parent.embeddedView && !this.__parent.embeddedView.destroyed) {
      this.container.insert(this.__parent.embeddedView, 0);
    } else {
      this.embeddedView = this._template.createEmbeddedView(null);
      this.container.insert(this.embeddedView, 0);
    }

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
