import {Component, forwardRef, Input, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {VxDropdownComponent} from '../dropdown/dropdown.component';
import * as Fuse from 'fuse.js';
import {VxInputDirective} from '../input/vx-input.directive';

@Component({
  selector: 'vx-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxAutocompleteComponent),
      multi: true
    }
  ]
})
export class VxAutocompleteComponent implements ControlValueAccessor {
  _items: any[];
  _multiple: boolean;

  /** The selected item */
  value: any | any[];
  /** The placeholder to pass down to the input component */
  @Input() placeholder: string;
  /** The name to pass down to the input component */
  @Input() name: string;
  /** The tabIndex to forward down to the input component */
  @Input() tabIndex: number;
  /** Whether or not the component is disabled  */
  @Input() disabled: boolean;

  /** The items to show in the dropdown */
  @Input()
  get items() { return this._items; };
  set items(items: any[]) {
    this._items = items;
    if (items && this.value) {
      if (!this.getItemForValue(this.value)) {
        // If the selected value isn't in the new items, remove it
        this.value = null;
        this.input.value = '';
        this._filteredItems = null;
        this._onChangeFn(null);
      } else {
        this._filteredItems = null;
      }
    }
  };

  /** The nameField to pass to the dropdown */
  @Input() nameField: string;

  /** The valueField to pass to the dropdown */
  @Input() valueField: string;

  /** Whether or not to allow multiple selection */
  @Input()
  get multiple() { return this._multiple; };
  set multiple(multiple: boolean) {
    this._multiple = multiple;
    if (multiple) {
        this.value = [];
    } else {
      this.value = null;
    }
    this._onChangeFn(this.value);
  };

  @ViewChild('input') input: VxInputDirective;
  @ViewChild('dropdown') dropdown: VxDropdownComponent;

  _filteredItems: any[];

  _dropdownVisible = false;

  _handleInputFocusChange(hasFocus: boolean) {
    if (hasFocus) {
      setTimeout(() => this._dropdownVisible = true, 0);
    } else {
      setTimeout(() => {
        if (!this.dropdown.hasFocus()) {
          this._dropdownVisible = false;
        } else {
          // this.input.setHasFocus(true);
        }
      }, 0);
    }
  }

  constructor() {
  }

  _onSelectItem(item: any) {
    if (!item) {
      this.value = null;
      return;
    }

    this._onChangeFn(this.valueField ? item[this.valueField] : item);
    this.value = this.valueField ? item[this.valueField] : item;
    this.input.value = this.nameField ? item[this.nameField] : item;

    this._filter(this.nameField ? item[this.nameField] : item);

    setTimeout(() => {
      // this.input.setHasFocus(true);
      setTimeout(() => this._dropdownVisible = false);
    }, 0);

  }

  _filter(query: string) {
    const options = {
      keys: this.nameField ? [this.nameField] : null
    };
    this._filteredItems = new Fuse(this._items, options).search(query);
  }

  _onInputChange(value: any) {
    this._dropdownVisible = true;

    if (value) {
      this._filter(value);
    } else {
      this._filteredItems = null;
    }
  }

  _closeDropdown() {
    this._dropdownVisible = false;
  }

  _showDropdown() {
    this._dropdownVisible = true;
  }

  _onChangeFn = (v: any) => v;
  _onTouchedFn = () => {};

  writeValue(obj: any): void {
    this._onSelectItem(this.getItemForValue(obj));
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  private getItemForValue(value: any) {
    if (!this.valueField) {
      return value;
    } else {
      for (const item of this._items) {
        if (item[this.valueField] === value) {
          return item;
        }
      }
    }
  }
}
