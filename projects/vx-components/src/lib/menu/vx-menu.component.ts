import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef, forwardRef, HostListener, Input, NgZone, OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {AbstractVxMenuComponent, Pos, Size, VX_MENU_TOKEN, findInArrayByDirection} from 'vx-components-base';
import {VxItemComponent} from './vx-item.component';
import {OverlayRef} from '../shared/overlay-factory';
import {takeUntil} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';

@Component({
  selector: 'vx-menu',
  templateUrl: 'vx-menu.component.html',
  styleUrls: ['vx-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VX_MENU_TOKEN, useExisting: forwardRef(() => VxMenuComponent)
    }
  ],
  host: {
    '[class.vx-menu]': 'true',
    '[class.vx-menu-visible]': 'visible'
  }
})
export class VxMenuComponent<T> extends AbstractVxMenuComponent<T, HTMLElement> implements OnDestroy, AfterViewInit {

  @ContentChildren(VxItemComponent)
  set _vxItems(items: QueryList<VxItemComponent<T>>) {
    this.items = items;
  }

  /** If setting to true or false is the same as setting all properties of VxMenuAutoClose to true or false */
  @Input() autoClose: boolean | VxMenuAutoClose = true;

  get focusedItem(): VxItemComponent<T> | undefined {
    return this._focusedItem;
  }

  set focusedItem(value: VxItemComponent<T> | undefined) {
    if (value !== this.focusedItem) {
      if (this.focusedItem) {
        this.focusedItem._markForCheck();
      }

      this._focusedItem = value;
      if (value) {
        value._markForCheck();
        const dropdown = this.el.nativeElement;

        const top = value._el.nativeElement.offsetTop;
        dropdown.scrollTop = top - dropdown.offsetHeight / 4;
      }
    }
  }
  private _focusedItem?: VxItemComponent<T>;

  private _focusedIdx = -1;
  get focusedIdx(): number {
    return this._focusedIdx;
  }

  set focusedIdx(value: number) {
    const items = this.items.toArray();
    if (value >= items.length) {
      value = items.length - 1;
    } else if (value < 0) {
      value = 0;
    }

    const forward = value >= this.focusedIdx;
    const foundForward = findInArrayByDirection(items, value, item => !item.disabled, forward);

    if (foundForward) {
      this.focusedItem = foundForward.item as VxItemComponent<T>;
      this._focusedIdx = foundForward.idx;
      return;
    }

    const foundBackward = findInArrayByDirection(items, value, item => !item.disabled, !forward);
    if (foundBackward) {
      this.focusedItem = foundBackward.item as VxItemComponent<T>;
      this._focusedIdx = foundBackward.idx;
      return;
    }

    this.focusedItem = undefined;
  }

  private overlay = new OverlayRef(['vx-menu-overlay']);
  private enterDown = false;
  constructor(cdr: ChangeDetectorRef, private el: ElementRef<HTMLElement>, private zone: NgZone) {
    super(cdr);

    this.overlay.overlayClick.subscribe(() => {
      this._autoClose('overlay');
    });

    this.itemSelect.pipe(takeUntil(this.onDestroy$)).subscribe(val => {
      this._autoClose('itemSelect');
    });

    this.zone.runOutsideAngular(() => {
      merge(
        fromEvent(window, 'scroll', {capture: true}),
        fromEvent(window, 'resize', {capture: true})
      ).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
        this.position();
      });
    })
  }

  ngAfterViewInit(): void {
    this.overlay.container.appendChild(this.el.nativeElement);
  }

  hide(): void {
    if (this.visible) {
      this.visible = false;
      return;  // return because setting visible will re-call hide.
    }

    this.clearFocus();
    this.overlay.hideOverlay();
  }

  show(): void {
    if (!this.attachedTo) {
      throw new Error('Tried showing a vx-menu without an attached element.');
    }

    if (!this.visible) {
      this.visible = true;
      return; // return because setting visible will re-call show
    }

    if (this._shouldAutoclose('overlay')) {
      this.overlay.showOverlay();
    }

    this.position();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.overlay.destroy();
  }

  @HostListener('window:keydown.ArrowUp', ['true', '$event'])
  @HostListener('window:keydown.ArrowDown', ['false', '$event'])
  _onArrowDown(upKey: boolean, event: Event): void {
    console.log('Got in here!');
    if (this.visible) {
      if (this.focusedIdx === -1) {
        this.focusedIdx = upKey ? this.items.length - 1 : 0;
      } else {
        this.focusedIdx += upKey ? -1 : 1;
      }

      event.preventDefault();
    }
  }

  @HostListener('window:keydown.enter', ['$event'])
  _onEnterDown(event: Event): void {
    if (this.visible && this.focusedItem) {
      this.focusedItem._active = true;
      event.preventDefault();
    }
    this.enterDown = true;
  }

  @HostListener('window:keyup.enter', ['$event'])
  _onEnterUp(event: Event): void {
    if (this.visible && this.focusedItem && this.enterDown) {
      this.focusedItem._active = false;
      this.focusedItem._handleSelect();
      event.preventDefault();
    }
  }

  _autoClose(reason: keyof VxMenuAutoClose) {
    if (this._shouldAutoclose(reason)) {
      this.visible = false;
    }
  }

  protected _shouldAutoclose(reason: keyof VxMenuAutoClose): boolean {
    return this.autoClose === true ? true : this.autoClose === false ? false : this.autoClose[reason] === true;
  }

  protected getAttachedPosition(): Pos | undefined {
    if (!this.attachedTo) {
      return;
    }
    const rect = this.attachedTo.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width || this.attachedTo.offsetWidth,
      height: rect.height || this.attachedTo.offsetHeight
    };
  }

  protected getMenuPosition(): Pos | undefined {
    if (!this.el || !this.el.nativeElement) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width || this.el.nativeElement.offsetWidth,
      height: rect.height || this.el.nativeElement.offsetHeight
    };
  }

  protected getViewportSize(): Size | undefined {
    const viewportHeight = Math.max(document.documentElement ? document.documentElement.clientHeight : 0, window.innerHeight || 0);
    const viewportWidth = Math.max(document.documentElement ? document.documentElement.clientWidth : 0, window.innerWidth || 0);
    return {width: viewportWidth, height: viewportHeight};
  }

  protected setNativePosition(pos: Pos, autoWidth: boolean): void {
    if (!this.el || !this.el.nativeElement) {
      return;
    }

    const el = this.el.nativeElement;
    // el.style.left = `${pos.x}px`;
    // el.style.top = `${pos.y}px`;
    el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    el.style.maxHeight = `${pos.height}px`;
    el.style.width = autoWidth ? 'auto' : `${pos.width}px`;
    el.style.maxWidth = autoWidth ? 'none' : `${pos.width}px`;
  }

  private clearFocus(): void {
    this._focusedIdx = -1;
    this.focusedItem = undefined;
  }

  protected onItemsChanged(): void {
    super.onItemsChanged();
    this.clearFocus();
  }
}

export interface VxMenuAutoClose {
  escape?: boolean;
  tab?: boolean;
  itemSelect?: boolean;
  overlay?: boolean;
}
