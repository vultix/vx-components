import {
  AfterContentInit,
  AfterViewChecked, AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {coerceBooleanProperty, getHighestZIdx, removeFromArray} from '../shared/util';
import {VxItemComponent} from './item.component';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import {OverlayFactory} from '../shared/overlay-factory';

@Component({
  selector: 'vx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[class.visible]': 'visible && _positioned',
    '[attr.tabindex]': 'visible ? 0 : -1'
  }
})
export class VxMenuComponent<T = string> implements AfterContentInit, OnDestroy, AfterViewChecked, AfterViewInit {
  /** The dropdown's items */
  @ContentChildren(VxItemComponent, {descendants: true}) items: QueryList<ItemWithSubscription<T>>;

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
        setTimeout(() => this.focusedIdx = 0);
      }
      if (visible) {
        this._positioned = false;
        this.enterDown = false;
        setTimeout(() => this._onOpen());
        this._overlay.showOverlay();
      } else {
        this._overlay.hideOverlay();
      }
    }

  };

  /** The default text to display if there are no items */
  @Input() defaultText: string;

  /** If true the dropdown will automatically close when an item is chosen, or when clicked off of the dropdown  */
  @Input() autoClose: boolean | DropdownAutoclose = true;

  /** Event thrown when the dropdown's visibility changes. The value is the visibility (true or false) */
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Event thrown when an item is chosen.  Will emit the selected vx-item's value */
  @Output() itemClick = new EventEmitter<T>();

  @Input() element?: HTMLElement;

  @Input() matchWidth = false;

  @Input() offsetLeft = 0;
  @Input() offsetTop = 10;

  get focusedIdx(): number {
    return this._focusedIdx;
  }

  set focusedIdx(value: number) {
    const items = this.items.toArray();
    if (value >= items.length)
      value = items.length - 1;
    else if (value < 0)
      value = 0;

    let idx = -1;
    let found = false;
    for (const item of items) {
      if (item.focused)
        item.focused = false;
      if (!item.filtered.getValue() && !item.disabled)
        idx++;

      if (idx === value && !found) {
        this.focusItem(item);
        found = true;
      }
    }
    this._focusedIdx = value;
    if (!found && idx > -1) {
      this.focusedIdx = idx;
    }
  }

  _positioned = false;
  _visible = false;
  _resetFocusedOnOpen = true;

  unFilteredItems: any[] = [];

  private _focusedIdx = 0;
  private _overlay = OverlayFactory.createOverlay();
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private enterDown: boolean;
  private focusedItem?: VxItemComponent<T>;

  constructor(private _el: ElementRef, private ngZone: NgZone) {
    this._overlay.overlayClick.subscribe(() => {
      this._autoClose('overlay');
    });

    this.ngZone.runOutsideAngular(() => {
      Observable.fromEvent(window, 'scroll', true).takeUntil(this.ngUnsubscribe).subscribe(() => {
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
    // Wrapped in a a timeout so that the autocomplete has time to set this.items.
    setTimeout(() => {
        this.items.changes.startWith(null).subscribe(() => {
            this.updateItemSubscriptions();
            // TODO: why is this timeout necessary?
            setTimeout(() => {
              this.focusedIdx = 0;
            });
        });
    });
  }

  ngAfterViewChecked(): void {
    this.repositionDropdown();
  }

  toggle(): void {
    this.visible = !this.visible;
  }

  updateItemSubscriptions(): void {
    this.items.forEach(item => {
      if (!item.subscriptions) {
        item.subscriptions = [];

        item.subscriptions[0] = item.onSelect.takeUntil(this.ngUnsubscribe).subscribe(() => {
          this.itemClick.emit(item.value);
          this._autoClose('itemSelect');
        });

        item.subscriptions[1] = item.filtered.subscribe(filtered => {
          if (filtered) {
            removeFromArray(this.unFilteredItems, item);
          } else if (this.unFilteredItems.indexOf(item) === -1) {
            this.unFilteredItems.push(item);
          }
        });
      }
    })
  }

  @HostListener('window:keydown.ArrowDown', ['focusedIdx + 1', '$event'])
  @HostListener('window:keydown.ArrowUp', ['focusedIdx - 1', '$event'])
  _onArrowDown(newIdx: number, event: Event): void {
    if (this.visible) {
      this.focusedIdx = newIdx;
      event.preventDefault();
    }
  }

  @HostListener('window:keydown.escape', ['"escape"'])
  @HostListener('window:keydown.tab', ['"tab"'])
  _autoClose(type: keyof DropdownAutoclose): void {
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
      this.focusedItem.active = true;
      event.preventDefault();
    }
    this.enterDown = true;
  }

  @HostListener('window:keyup.enter', ['$event'])
  _onEnterUp(event: Event): void {
    if (this.visible && this.focusedItem && this.enterDown) {
      this.focusedItem.active = false;
      this.focusedItem.onSelect.emit();
      event.preventDefault();
      this._autoClose('itemSelect');
    }
  }

  hasFocus(): boolean {
    return document.activeElement === this._el.nativeElement;
  }

  private _onOpen(): void {
    if (this.items) {
      this.items.forEach(item => {
        item.active = false;
      });
    }

    if (!this.element || !(this.element instanceof HTMLElement)) {
      throw new Error('Dropdown opened without an attached HTMLelement.');
    }

    this._overlay.container.style.zIndex = `${getHighestZIdx()}`;

    this.repositionDropdown();
    this._positioned = true;
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

      const viewportHeight =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const viewportWidth =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
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

  private focusItem(item: VxItemComponent<T>): void {
    const dropdown = this._el.nativeElement;

    const top = item._elementRef.nativeElement.offsetTop;
    dropdown.scrollTop = top - dropdown.offsetHeight / 4;

    item.focused = true;
    this.focusedItem = item;
  }
}

export interface ItemWithSubscription<T> extends VxItemComponent<T> {
  subscriptions?: Subscription[];
}

export interface DropdownAutoclose {
  escape?: boolean;
  tab?: boolean;
  itemSelect?: boolean;
  overlay?: boolean;
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
  constructor(_el: ElementRef, ngZone: NgZone) {
    super(_el, ngZone);

    console.warn('Use of VxDropdownComponent is deprecated and will soon be removed from vx-components. ' +
      'Please change all occurrences of VxDropdownComponent to VxMenuComponent and all uses of <vx-dropdown> to <vx-menu>.');
  }
}
