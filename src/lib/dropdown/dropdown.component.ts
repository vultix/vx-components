import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {coerceBooleanProperty} from '../Util';
import {VxItemComponent} from './item.component';

@Component({
  selector: 'vx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class VxDropdownComponent implements AfterContentInit {
  private _el: ElementRef;
  _visible = false;
  @ViewChild('dropdown') private _dropdown: ElementRef;

  /** The dropdown's items */
  @ContentChildren(VxItemComponent) items: QueryList<VxItemComponent>;

  @Input() autocompleteItems: QueryList<VxItemComponent>;
  @Input() itemsFiltered: EventEmitter<void>;

  _focusedIdx: number;
  private subscriptions: {[key: string]: any} = {};

  /** Whether the dropdown is visible */
  @Input()
  get visible(): boolean {
    return this._visible;
  };

  set visible(visible: boolean) {
    this._visible = coerceBooleanProperty(visible);

    // When visibility changes focus the first item;
    setTimeout(() => this._setFocusedIdx(0));
  };

  /** The default text to display if there are no items */
  @Input() defaultText: string;

  /** If true the dropdown will automatically close when an item is chosen, or when clicked off of the dropdown  */
  @Input() autoClose = true;

  /** Event thrown when the dropdown's visibility changes. The value is the visibility (true or false) */
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Event thrown when an item is chosen.  Will emit the selected vx-item's value */
  @Output() itemClick = new EventEmitter();

  get _visibleItems(): VxItemComponent[] {
    return this.items ? this.items.filter(item => item.visible) : [];
  }

  private activeItem?: VxItemComponent;
  constructor(el: ElementRef) {
    this._el = el;

  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      if (this.autocompleteItems)
        this.items = this.autocompleteItems;

      this.items.changes.subscribe(() => {
        // When items change focus the first item
        setTimeout(() => {
          this._setFocusedIdx(0);
          this.updateItemListeners();
        });

      });

      this._setFocusedIdx(0);
      this.updateItemListeners();

      if (this.itemsFiltered) {
        this.itemsFiltered.subscribe(() => {
            this._setFocusedIdx(0);
            this.updateItemListeners();
        })
      }
    });
  }

  /** Sets the visibility of the dropdown */
  public setVisible(visible: boolean): void {
    if (visible !== this._visible) {
      this._visible = visible;
      this.visibleChange.emit(visible);
      if (this.activeItem) {
        this.activeItem.active = false;
        this.activeItem = undefined;
      }

      this._focusedIdx = 0;
    }
  }

  /** Toggles the visibility of the dropdown */
  public toggle(): void {
    this.setVisible(!this._visible);
  }

  /** Returns whether or not the dropdown has focus */
  public hasFocus(): boolean {
    return this._dropdown.nativeElement === document.activeElement;
  }

  @HostListener('keydown.ArrowUp', ['_focusedIdx - 1'])
  @HostListener('keydown.ArrowDown', ['_focusedIdx + 1'])
  _setFocusedIdx(idx: number): boolean | undefined {
    if (!this.items)
      return;

    if (idx < 0 || idx > (this._visibleItems.length - 1)) {
      return;
    }
    this._focusedIdx = idx;

    if (this._el && this._dropdown) {
      // Scroll inside the container
      this._visibleItems.forEach((item, i) => {
        item.focused = false;
        if (i === this._focusedIdx) {
          item.focused = true;

          const dropdown = this._dropdown.nativeElement;

          const top = item._elementRef.nativeElement.offsetTop;
          dropdown.scrollTop = top - dropdown.offsetHeight / 4;
        }
      });

    }

    return false;
  }

  _selectItem(item: VxItemComponent): void {
    if (item.disabled)
      return;

    this.itemClick.emit(item.value);

    if (this._dropdown && this._dropdown.nativeElement) {
      this._dropdown.nativeElement.focus();
    }

    this._closeIfAutoClose();
  }

  @HostListener('keydown.escape')
  @HostListener('keydown.tab')
  @HostListener('window:mousedown', ['$event'])
  @HostListener('window:touchstart', ['$event'])
  _closeIfAutoClose(event?: MouseEvent): void {
    if (this.autoClose && this.visible) {
      if (event && event.srcElement && isDescendant(this._dropdown.nativeElement, event.srcElement)) {
        return;
      }
      this.setVisible(false);
    }
  }

  //noinspection JSUnusedLocalSymbols
  @HostListener('keydown.enter')
  private _enterKeyDown(): boolean {
    if (this._visible) {
      if (this.activeItem)
        this.activeItem.active = false;

      this.activeItem = this._visibleItems[this._focusedIdx];
      if (!this.activeItem.disabled)
        this.activeItem.active = true;
    }

    return false;
  }

  //noinspection JSUnusedLocalSymbols
  @HostListener('keyup.enter')
  private _enterKeyUp(): boolean {
    if (this._visible) {

      if (this.activeItem) {
        this.activeItem.active = false;
        this.activeItem = undefined;
      }

      const curItem = this._visibleItems[this._focusedIdx];
      curItem.handleClick();

    }

    return false;
  }

  private updateItemListeners(): void {
    this.items.forEach(item => {
      if (!this.subscriptions[item.value]) {
        this.subscriptions[item.value] = item.onSelect.subscribe(() => {
          this._selectItem(item);
        });
      }
    })
  }

}

function isDescendant(parent: Element, child: Element): boolean {
  let node = child.parentNode;
  while (node) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
