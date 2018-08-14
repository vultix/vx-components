import {fromEvent, Subject} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import {coerceBooleanProperty, findInArrayByDirection, getHighestZIdx} from '../shared/util';
import {VxItemComponent} from './item.component';
import {OverlayFactory} from '../shared/overlay-factory';
import {VX_MENU_TOKEN} from './menu.token';

@Component({
  selector: 'vx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[class.visible]': 'visible && _positioned',
    '[attr.tabindex]': 'visible ? 0 : -1'
  },
  providers: [
    {provide: VX_MENU_TOKEN, useExisting: forwardRef(() => VxMenuComponent)}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxMenuComponent<T = string> implements AfterContentInit, OnDestroy, AfterViewChecked, AfterViewInit {
  /** The dropdown's items */
  @ContentChildren(VxItemComponent, {descendants: true}) items: QueryList<VxItemComponent<T>>;

  @Input() element?: HTMLElement;

  @Input() offsetLeft = 0;
  @Input() offsetTop = 10;

  @Input() matchWidth = false;

  /** If true the dropdown will automatically close when an item is chosen, or when clicked off of the dropdown  */
  @Input() autoClose: boolean | MenuAutoclose = true;

  /** The default text to display if there are no items */
  @Input() defaultText: string;

  /** Event thrown when the dropdown's visibility changes. The value is the visibility (true or false) */
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Event thrown when an item is chosen.  Will emit the selected vx-item's value */
  @Output() itemSelect = new EventEmitter<T>();
  _positioned = false;
  _resetFocusedOnOpen = true;
  private _overlay = OverlayFactory.createOverlay();
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private enterDown: boolean;
  private focusedItem?: VxItemComponent<T>;

  /** @deprecated renamed to itemSelect */
  @Output() get itemClick(): EventEmitter<T> {
    return this.itemSelect;
  };

  private _visible = false;

  /** Whether the dropdown is visible */
  @Input()
  get visible(): boolean {
    return this._visible;
  };

  set visible(visible: boolean) {
    visible = coerceBooleanProperty(visible);
    if (visible !== this._visible) {
      this._visible = visible;
      this.visibleChange.emit(visible);

      if (this._resetFocusedOnOpen) {
        // When visibility changes focus the first item;
        this.clearFocusedItem();
      }

      if (visible) {
        this._positioned = false;
        this.enterDown = false;
        this._onOpen();
        this._overlay.showOverlay();
      } else {
        this._overlay.hideOverlay();
      }

      this.cdr.markForCheck();
    }

  };

  private _focusedIdx = -1;

  get focusedIdx(): number {
    return this._focusedIdx;
  }

  set focusedIdx(value: number) {
    const items = this.items.toArray();
    if (value >= items.length)
      value = items.length - 1;
    else if (value < 0)
      value = 0;

    const forward = value >= this.focusedIdx;
    const foundForward = findInArrayByDirection(items, value, item => !item.disabled, forward);
    if (foundForward) {
      this.focusItem(foundForward.item);
      this._focusedIdx = foundForward.idx;
      return;
    }

    const foundBackward = findInArrayByDirection(items, value, item => !item.disabled, !forward);
    if (foundBackward) {
      this.focusItem(foundBackward.item);
      this._focusedIdx = foundBackward.idx;
      return;
    }

    this.clearFocusedItem();
  }

  constructor(private _el: ElementRef, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this._overlay.overlayClick.subscribe(() => {
      this._autoClose('overlay');
    });

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll', {capture: true}).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
        this.repositionDropdown();
      });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._overlay.destroy();
  }

  ngAfterViewInit(): void {
    this._overlay.container.appendChild(this._el.nativeElement);
  }

  ngAfterContentInit(): void {
      this.items.changes.pipe(startWith(null)).subscribe(() => {
        this.clearFocusedItem();

        this.cdr.markForCheck();
      });
  }

  ngAfterViewChecked(): void {
    this.repositionDropdown();
  }

  toggle(): void {
    this.visible = !this.visible;
  }

  @HostListener('window:keydown.ArrowUp', ['true', '$event'])
  @HostListener('window:keydown.ArrowDown', ['false', '$event'])
  _onArrowDown(upKey: boolean, event: Event): void {
    if (this.visible) {
      if (this.focusedIdx === -1) {
        this.focusedIdx = upKey ? this.items.length - 1 : 0;
      } else {
        this.focusedIdx += upKey ? -1 : 1;
      }

      event.preventDefault();
    }
  }

  @HostListener('window:keydown.escape', ['"escape"'])
  @HostListener('window:keydown.tab', ['"tab"'])
  _autoClose(type: keyof MenuAutoclose): void {
    if (this.autoClose === false) {
      return;
    } else if (this.autoClose === true) {
      this.visible = false;
    } else if (this.autoClose[type] !== false) {
      this.visible = false;
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
      this._selectItem(this.focusedItem);
      event.preventDefault();
    }
  }

  hasFocus(): boolean {
    return document.activeElement === this._el.nativeElement;
  }

  @HostListener('window:resize')
  repositionDropdown(): void {
    if (this.element && this.visible) {
      const elementPosition = this.element.getBoundingClientRect();
      const dropdown: HTMLDivElement = this._el.nativeElement;

      let top = elementPosition.bottom + this.offsetTop;
      let left = elementPosition.left + this.offsetLeft;
      // if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream) {
      //   top += window.scrollY;
      //   left += window.scrollX;
      // }
      if (this.matchWidth)
        dropdown.style.width = `${elementPosition.width}px`;

      const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if ((top + dropdown.offsetHeight) > viewportHeight) {
        top = viewportHeight - dropdown.offsetHeight;
      }
      if (top < 0) {
        top = 0;
      }

      if ((left + dropdown.offsetWidth) > viewportWidth) {
        left = viewportWidth - dropdown.offsetWidth;
      }

      dropdown.style.top = `${top}px`;
      dropdown.style.left = `${left}px`;
    }
  }

  _hasFocus(): boolean {
    return document.activeElement === this._el.nativeElement;
  }

  _selectItem(item: VxItemComponent<T>): void {
    item._active = false;
    item.select.emit();
    this.itemSelect.emit(item.value);

    this._autoClose('itemSelect');
  }

  private _onOpen(): void {
    if (this.focusedItem) {
      this.focusedItem._active = false;
    }

    if (!this.element || !(this.element instanceof HTMLElement)) {
      throw new Error('Dropdown opened without an attached HTMLelement.');
    }

    this._overlay.container.style.zIndex = `${getHighestZIdx()}`;

    this.repositionDropdown();
    this._positioned = true;
  }

  private focusItem(item: VxItemComponent<T>): void {
    if (this.focusedItem) {
      this.focusedItem._focused = false;
    }

    const dropdown = this._el.nativeElement;

    const top = item._elementRef.nativeElement.offsetTop;
    dropdown.scrollTop = top - dropdown.offsetHeight / 4;

    item._focused = true;
    this.focusedItem = item;
  }

  private clearFocusedItem(): void {
    this._focusedIdx = -1;
    if (this.focusedItem) {
      this.focusedItem._focused = false;
    }
    this.focusedItem = undefined;

    this._el.nativeElement.scrollTop = 0;
  }
}

export interface MenuAutoclose {
  escape?: boolean;
  tab?: boolean;
  itemSelect?: boolean;
  overlay?: boolean;
}

/**
 * @deprecated renamed to MenuAutoclose
 */
export interface DropdownAutoclose extends MenuAutoclose {
}


/*
  @deprecated, changed to VxMenuComponent.
 */
@Component({
  selector: 'vx-dropdown',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class VxDropdownComponent<T = string> extends VxMenuComponent<T> {
  constructor(_el: ElementRef, cdr: ChangeDetectorRef, ngZone: NgZone) {
    super(_el, cdr, ngZone);

    console.warn('Use of VxDropdownComponent is deprecated and will soon be removed from vx-components. ' +
      'Please change all occurrences of VxDropdownComponent to VxMenuComponent and all uses of <vx-dropdown> to <vx-menu>.');
  }
}
