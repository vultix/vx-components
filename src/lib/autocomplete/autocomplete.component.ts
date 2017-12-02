import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input, OnInit,
  Optional,
  QueryList, Renderer2,
  Self,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {VxDropdownComponent, VxItemComponent} from '../dropdown';
import {VxInputDirective} from '../input';
import {coerceBooleanProperty} from '../shared/util';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'vx-autocomplete, vx-select',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
    '[class.invalid]': '_isInvalid()'
  }
})
export class VxAutocompleteComponent<T = string> implements ControlValueAccessor, AfterContentInit, OnInit {
  /** The autocomplete's selected value **/
  get value(): T | T[] | undefined {
    if (!this.multiple && this.selectedItem)
      return this.selectedItem.value;
    else if (this.multiple && this.selectedItems)
      return this.selectedItems.map(item => item.value);
    else
      return;
  }

  /** @internal The selected item */
  selectedItem?: VxItemComponent<T>;

  /** @internal If multiple, the selected items */
  selectedItems: VxItemComponent<T>[] = [];

  /** The placeholder to pass down to the input component */
  @Input() placeholder: string;
  /** The name to pass down to the input component */
  @Input() name: string;
  /** The tabIndex to forward down to the input component */
  @Input() tabIndex: number;
  /** Whether or not the component is disabled  */
  @Input() disabled: boolean;
  /** The text to show when there are no items */
  @Input() defaultText = 'No results found.';

  /** Whether or not to allow searching **/
  @Input()
  get search(): boolean {
    return this._search;
  }

  set search(value: boolean) {
    value = coerceBooleanProperty(value);
    this._search = value;
  }

  /** @internal */
  @ContentChildren(VxItemComponent) items: QueryList<VxItemComponent<T>>;

  /** Whether or not to allow multiple selection */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  };

  set multiple(multiple: boolean) {
    this._multiple = coerceBooleanProperty(multiple);
    setTimeout(() => {
      if (this._multiple) {
        this.input._elementRef.nativeElement.placeholder = this.search ? 'Search...' : 'Select...';
        this.selectedItem = undefined;
      } else {
        this.input.placeholder = this.placeholder;
        this.selectedItems = [];
      }

      this.input.value = '';
    });
  };

  /** Whether or not the autocomplete is required */
  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  /** @internal */
  @ViewChild(VxInputDirective) input: VxInputDirective;
  /** @internal */
  @ViewChild('dropdown') dropdown: VxDropdownComponent<T>;
  /** @internal */
  @ViewChildren('button') buttons: QueryList<ElementRef>;

  /** @internal */
  _dropdownVisible = false;
  /** @internal */
  _itemsFiltered = new Subject();
  /** @internal */
  _required: boolean;
  /** @internal */
  _multiple = false;

  private _value: T | T[] | undefined;
  private touched = false;
  private _search = true;

  constructor(@Optional() private _parentForm: NgForm,
              @Optional() private _parentFormGroup: FormGroupDirective,
              @Optional() @Self() public _ngControl: NgControl,
              private el: ElementRef) {
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    }
    this._itemsFiltered.subscribe(() => {
      setTimeout(() => this.dropdown.focusedIdx = 0);
    })
  }

  /** @internal */
  ngAfterContentInit(): void {
    this.items.changes.subscribe(() => {
      setTimeout(() => this.updateSelectedItem());
    });
    setTimeout(() => {
      this.dropdown.items = this.items;
    });
    this.dropdown._resetFocusedOnOpen = false;

    this.updateSelectedItem();
  }

  /** @internal */
  ngOnInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    if (el.tagName === 'VX-SELECT') {
      this._search = false;
    }
  }

  /** @internal */
  _handleInputFocusChange(hasFocus: boolean): void {
    this.touched = true;
    this.input.focused = hasFocus;
    if (hasFocus) {
      this._showDropdown();
    } else {
      // Wait until the dropdown can detect if it has focus.  If the dropdown is clicked on
      // we want the focus to remain on the textField
      setTimeout(() => {
        if (!this.dropdown.hasFocus()) {
          this._dropdownVisible = false;
          this._repopulateValue();
        } else {
          this.input.focused = true;
        }
      }, 0);
    }
  }

  /** @internal */
  _onSelectItem(value: any, skipEmit = false): void {
    if (value === null || value === undefined) {
      this.selectedItem = undefined;
      this.input.value = '';
      this.input.placeholder = this.placeholder;

      return;
    }

    const item = this.getItemForValue(value);
    if (!item)
      return;

    if (this.multiple) {
      this.selectedItems.push(item);
      this.input.value = '';
    } else {
      this.selectedItem = item;
      this.input.value = item.searchTxt;
    }

    this.items.forEach(it => it.filtered.next(this.selectedItems.indexOf(it) !== -1));
    this._itemsFiltered.next();

    if (!skipEmit)
      this._onChangeFn(this.value);

    setTimeout(() => {
      if (this.touched)
        this._focusInput();
      this._repopulateValue();
      this._closeDropdown();
    }, 0);

  }

  /** @internal */
  _filter(query: string): void {
    query = query.toUpperCase();
    this.items.forEach(item => {
      const filtered = !(item.searchTxt && item.searchTxt.toUpperCase().indexOf(query) !== -1);
      // Does the actual search
      item.filtered.next(filtered);
      if (this._multiple && !filtered)
        item.filtered.next(this.selectedItems.indexOf(item) !== -1);
    });
    this._itemsFiltered.next();
  }

  /** @internal */
  _onInputChange(value: any): void {
    this._dropdownVisible = true;

    if (value) {
      this._filter(value);
    } else {
      this.items.forEach(item => item.filtered.next(this.selectedItems.indexOf(item) !== -1));
      this._itemsFiltered.next();
    }
  }

  /** @internal */
  _closeDropdown(): void {
    this._dropdownVisible = false;
    this._repopulateValue();
  }

  /** @internal */
  _showDropdown(): void {
    if (this._dropdownVisible)
      return;

    this._hideValue();
    this._dropdownVisible = true;
    this.input.focused = true;
    if (!this.multiple && this.selectedItem) {
      const item = this.selectedItem;
      // Timeout to give allow the dropdown to become visible
      setTimeout(() => {
        this.dropdown.focusedIdx = this.items.toArray().indexOf(item);
      })
    }
  }

  /** @internal */
  _focusInput(): void {
    this.input.focused = true;
    this.input._elementRef.nativeElement.focus();
    if (!this.search)
      this.input._elementRef.nativeElement.parentElement.focus();
  }

  /** @internal */
  _onChangeFn = (v: any) => v;
  /** @internal */
  _onTouchedFn = () => {
  };

  /** @internal Whether the input is in an error state. */
  _isInvalid(): boolean {
    const control = this._ngControl;
    const form = this._parentFormGroup || this._parentForm;
    if (control) {
      const isSubmitted = form && form.submitted;
      return !!(control.invalid && (control.touched || isSubmitted));
    }

    return false;
  }

  /** @internal */
  _repopulateValue(): void {
    if (this.selectedItem && !this.multiple)
      this.input.value = this.selectedItem.searchTxt
  }

  /** @internal */
  _hideValue(): void {
    if (this.selectedItem && !this.multiple) {
      const inputEl: HTMLInputElement = this.input._elementRef.nativeElement;
      inputEl.placeholder = this.selectedItem.searchTxt;
      inputEl.value = '';
    }
  }

  /** @internal */
  _removeItem(item: VxItemComponent<T>): void {
    this.selectedItems = this.selectedItems.filter(itm => itm !== item);
    item.filtered.next(false);
    this._itemsFiltered.next();
    this._onChangeFn(this.value);
    this._value = this.value;
    this._focusInput();
  }

  /** @internal */
  _arrowClicked(): void {
    this._focusInput();
    setTimeout(() => {
      this._showDropdown();
    });
  }

  /** @internal */
  _handleBackspace(): void {
    if (!this.multiple) {
      return;
    }
    if (!this.input.value && this.selectedItems.length) {
      this._removeItem(this.selectedItems[this.selectedItems.length - 1]);
    }
  }

  /** @internal */
  writeValue(obj: any): void {
    if (this.multiple && obj) {
      this.selectedItems = [];
      obj.forEach((val: any) => {
        this._onSelectItem(val, true);
      })
    } else {
      this._onSelectItem(obj, true);
    }
    this._value = obj;
  }

  /** @internal */
  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  /** @internal */
  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  private getItemForValue(value: any): VxItemComponent<T> | undefined {
    if (!this.items)
      return undefined;

    for (const item of this.items.toArray()) {
      if (item.value === value) {
        return item;
      }
    }

    return;
  }

  private updateSelectedItem(): void {
    if (this._value && !this.multiple) {
      if (!this.getItemForValue(this._value)) {
        // If the selected value isn't in the new items, remove it
        this.selectedItem = undefined;
        this.input.value = '';

        this._onChangeFn(undefined);
        this._value = undefined;
      }

      this.items.forEach(item => item.filtered.next(false));
      this._itemsFiltered.next();
      this._onSelectItem(this._value);
    } else if (this._value && this.multiple) {
      const newItems: VxItemComponent<T>[] = [];
      (this._value as T[]).forEach((val: any) => {
        const item = this.getItemForValue(val);
        if (item) {
          newItems.push(item)
        }
      });

      this.selectedItems = newItems;
      this._onChangeFn(this.value);
      this._value = this.value;
      this.items.forEach(item => item.filtered.next(newItems.indexOf(item) !== -1));
      this._itemsFiltered.next();
    }
  }

}
