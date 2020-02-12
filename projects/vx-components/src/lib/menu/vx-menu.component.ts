import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostListener, Inject,
  Input,
  NgZone,
  OnDestroy, Optional, PLATFORM_ID,
  QueryList, Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractVxMenuComponent, findInArrayByDirection, Pos, Size, VX_MENU_TOKEN } from 'vx-components-base';
import { OverlayRef } from '../shared/overlay-factory';
import { VxItemComponent } from './vx-item.component';

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
  // VX_MENU_INPUTS
  inputs: [
    'width', 'maxHeight', 'defaultText', 'visible', 'positionStrategy', 'attachedTo'
  ],
  // VX_MENU_OUTPUTS
  outputs: [
    'itemSelect', 'visibleChange'
  ],
  host: {
    'class': 'vx-menu',
    '[class.vx-menu-visible]': 'visible'
  }
})
export class VxMenuComponent<T> extends AbstractVxMenuComponent<T, HTMLElement> implements OnDestroy, AfterViewInit {

  set _positionStrategyClass(className: string | undefined) {
    if (this.el) {
      if (this.__positionStrategyClass) {
        this.renderer.removeClass(this.el.nativeElement, this.__positionStrategyClass)
      }
      if (className) {
        this.renderer.addClass(this.el.nativeElement, className)
      }
    }

    this.__positionStrategyClass = className;
  }

  get _positionStrategyClass(): string | undefined {
    return this.__positionStrategyClass;
  }

  @ContentChildren(VxItemComponent)
  items!: QueryList<VxItemComponent<T>>;

  /** If setting to true or false is the same as setting all properties of VxMenuAutoClose to true or false */
  @Input() autoClose: boolean | VxMenuAutoClose = true;

  private __positionStrategyClass?: string;
  private _focusedItem?: VxItemComponent<T>;
  private _focusedIdx = -1;
  private overlay?: OverlayRef;
  private positioner?: HTMLDivElement;
  private enterDown = false;
  private isPlatformBrowser = false;

  constructor(cdr: ChangeDetectorRef, private el: ElementRef<HTMLElement>, private zone: NgZone,
              @Inject(PLATFORM_ID) platformId: Object, private renderer: Renderer2) {
    super(cdr);

    this.isPlatformBrowser = isPlatformBrowser(platformId);

    if (this.isPlatformBrowser) {
      this.overlay = new OverlayRef(['vx-menu-overlay'], []);

      this.overlay.overlayClick.subscribe(() => {
        this._autoClose('overlay');
      });

      this.positioner = document.createElement('div');
      this.positioner.className = 'vx-menu-positioner';
      this.overlay.container.appendChild(this.positioner);

      this.zone.runOutsideAngular(() => {
        merge(
          fromEvent(window, 'scroll', {capture: true}),
          fromEvent(window, 'resize', {capture: true})
        ).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
          this.position();
        });
      });
    } else {
      // Remove the menu element from angular universal builds.
      this.renderer.removeChild(this.renderer.parentNode(this.el.nativeElement), this.el.nativeElement)
    }


    this.itemSelect.pipe(takeUntil(this.onDestroy$)).subscribe(val => {
      this._autoClose('itemSelect');
    });

  }

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
      } else {
        this.el.nativeElement.scrollTop = 0;
      }
    }
  }

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

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if (this.positioner) {
      this.positioner.appendChild(this.el.nativeElement);
    }
  }

  hide(): void {
    if (this.visible) {
      this.visible = false;
      return;  // return because setting visible will re-call hide.
    }

    this._active = false;

    this.clearFocus();
    setTimeout(() => {
      if (this.overlay) {
        this.overlay.hideOverlay();
      }
    }, 300)
  }

  show(): void {
    if (!this.attachedTo) {
      throw new Error('Tried showing a vx-menu without an attached element.');
    }

    if (!this.visible) {
      this.visible = true;
      return; // return because setting visible will re-call show
    }

    if (this._shouldAutoclose('overlay') && this.overlay) {
      this.overlay.showOverlay();
    }

    this.position();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.overlay) {
      this.overlay.destroy();
    }
  }

  @HostListener('window:keydown.ArrowUp', ['true', '$event'])
  @HostListener('window:keydown.ArrowDown', ['false', '$event'])
  _onArrowDown(upKey: boolean, event: Event): void {
    if (this.visible && this.items.length) {
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

  @HostListener('window:keydown.escape', ['"escape"', '$event'])
  @HostListener('window:keydown.tab', ['"tab"'])
  _autoClose(reason: keyof VxMenuAutoClose, event?: Event) {
    if (this._shouldAutoclose(reason)) {
      this.visible = false;

      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }


  @HostListener('mousedown', ['true'])
  @HostListener('touchstart', ['true'])
  @HostListener('window:mouseup', ['false'])
  @HostListener('window:touchend', ['false'])
  _setActive(active: boolean) {
    this._active = active;
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
      height: this.el.nativeElement.scrollHeight + 2 // added 2 for the border
    };
  }

  protected getViewportSize(): Size | undefined {
    if (this.isPlatformBrowser) {
      const viewportHeight = Math.max(document.documentElement ? document.documentElement.clientHeight : 0,
        window.innerHeight || 0);
      const viewportWidth = Math.max(document.documentElement ? document.documentElement.clientWidth : 0, window.innerWidth || 0);
      return {width: viewportWidth, height: viewportHeight};
    }
  }

  protected setNativePosition(pos: Pos, autoWidth: boolean): void {
    if (!this.positioner) {
      return;
    }

    // el.style.top = `${pos.y}px`;
    this.positioner.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    const menuEl = this.el.nativeElement;
    menuEl.style.maxHeight = `${pos.height}px`;
    menuEl.style.width = autoWidth ? 'auto' : `${pos.width}px`;
    menuEl.style.maxWidth = autoWidth ? 'none' : `${pos.width}px`;
  }

  protected onItemsChanged(): void {
    super.onItemsChanged();
    this.clearFocus();
  }

  private clearFocus(): void {
    if (this.focusedIdx !== -1) {
      this._focusedIdx = -1;
      this.focusedItem = undefined;
    }
  }

  protected getExpectedHeight(menuPos: Pos): number {
    if (this.maxHeight === 'none') {
      const menu = this.el.nativeElement;
      if (!menu) {
        return 200; // TODO: Is there a better value that could go here?
      }


      return menu.scrollHeight + 2; // Plus 2 for the border
    }

    return Math.min(menuPos.height, this.maxHeight);
  }
}

export interface VxMenuAutoClose {
  escape?: boolean;
  tab?: boolean;
  itemSelect?: boolean;
  overlay?: boolean;
}
