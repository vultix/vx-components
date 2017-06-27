import {Component, Input, ElementRef, Output, EventEmitter, ViewChild, HostListener} from '@angular/core';

@Component({
  selector: 'vx-dropdown',
  templateUrl: 'src/lib/vx-dropdown/vx-dropdown.component.html',
  styleUrls: ['src/lib/vx-dropdown/vx-dropdown.component.scss']
})
export class VxDropdownComponent {
  private _el: ElementRef;
  _visible = false;
  _items: any[] = [];
  @ViewChild('dropdown') private _dropdown: ElementRef;

  _activeIdx: number;
  _focusedIdx: number;

  /** Whether the dropdown is visible */
  @Input()
  get visible() { return this._visible; };
  set visible(visible: boolean) {
    this._visible = coerceBooleanProperty(visible);

    // When visibility changes focus the first item;
    this._setFocusedIdx(0);
  };

  /** The dropdown's items */
  @Input()
  set items(items: any[]) {
    this._items = items || [];

    // When items change focus the first item;
    this._setFocusedIdx(0);
  };

  /** If specified will display item[nameField] rather than the item itself */
  @Input() nameField: string;

  /** If specified the itemClick event will return item[valueField] rather than the item itself */
  @Input() valueField: string;

  /** The default text to display if there are no items */
  @Input() defaultText: string;

  /** If true the dropdown will automatically close when an item is chosen, or when clicked off of the dropdown  */
  @Input() autoClose = true;

  /** Event thrown when the dropdown's visibility changes. The value is the visibility (true or false) */
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Event thrown when an item is chosen.  Will either emit the chosen item or item[valueField] if valueField is specified */
  @Output() itemClick = new EventEmitter();

  constructor(el: ElementRef) {
    this._el = el;
  }

  /** Sets the visibility of the dropdown */
  public setVisible(visible: boolean) {
    if (visible !== this._visible) {
      this._visible = visible;
      this.visibleChange.emit(visible);
      this._activeIdx = null;
      this._focusedIdx = 0;
    }
  }

  /** Toggles the visibility of the dropdown */
  public toggle() {
    this.setVisible(!this._visible);
  }

  /** Returns whether or not the dropdown has focus */
  public hasFocus() {
    return this._dropdown.nativeElement === document.activeElement;
  }

  @HostListener('keydown.ArrowUp', ['_focusedIdx - 1'])
  @HostListener('keydown.ArrowDown', ['_focusedIdx + 1'])
  _setFocusedIdx(idx: number) {
    if (idx < 0 || idx > (this._items.length - 1)) {
      return;
    }
    this._focusedIdx = idx;

    if (this._el && this._dropdown) {
      // Scroll inside the container
      const elements = this._el.nativeElement.getElementsByClassName('item');
      const dropdown = this._dropdown.nativeElement;

      if (elements[idx]) {
        const top = elements[idx].offsetTop;
        dropdown.scrollTop = top - dropdown.offsetHeight / 4;
      }
    }

    return false;
  }

  _selectItem(item: any) {
    this.itemClick.emit(this.valueField ? item[this.valueField] : item);

    if (this._dropdown && this._dropdown.nativeElement) {
      this._dropdown.nativeElement.focus();
    }

    this._closeIfAutoClose();
  }

  @HostListener('keydown.escape')
  @HostListener('keydown.tab')
  _closeIfAutoClose() {
    if (this.autoClose) {
      this.setVisible(false);
    }
    return false;
  }

  //noinspection JSUnusedLocalSymbols
  @HostListener('keydown.enter')
  private _enterKeyDown() {
    if (this._visible) {
      this._activeIdx = this._focusedIdx;
    }
    return false;
  }

  //noinspection JSUnusedLocalSymbols
  @HostListener('keyup.enter')
  private _enterKeyUp() {
    if (this._visible) {
      this._activeIdx = null;
      this._selectItem(this._items[this._focusedIdx]);
    }
    return false;
  }
}

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
