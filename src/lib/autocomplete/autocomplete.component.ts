import {Component, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {VxDropdownComponent} from '../dropdown/dropdown.component';
import * as Fuse from 'fuse.js';
import {VxInputDirective} from '../input/vx-input.directive';
import {coerceBooleanProperty} from '../Util';
import {FuseOptions} from 'fuse.js';

@Component({
  selector: 'vx-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
    '[class.invalid]': '_isInvalid()'
  }
})
export class VxAutocompleteComponent<T> implements ControlValueAccessor {
  _items: T[];
  _multiple: boolean;

  get value(): any {
    if (this.selectedItem)
      return this.valueField ? this.selectedItem[this.valueField] : this.selectedItem
    return null;
  }

  /** The selected item */
  selectedItem: T;

  /** If multiple, the selected items */
  selectedItems: T[];
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
  get items() {
    return this._items;
  };

  set items(items: T[]) {
    this._items = items;
    if (items && this.value && !this.multiple) {
      if (!this.getItemForValue(this.value)) {
        // If the selected value isn't in the new items, remove it
        this.selectedItem = null;
        this.input.value = '';
        this._filteredItems = null;
        debugger;
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
  get multiple() {
    return this._multiple;
  };

  set multiple(multiple: boolean) {
    this._multiple = multiple;
    this.selectedItem = null;
    this.selectedItems = [];
    this._onChangeFn(this.value);
  };

  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = coerceBooleanProperty(value); }

  @ViewChild(VxInputDirective) input: VxInputDirective;
  @ViewChild('dropdown') dropdown: VxDropdownComponent;

  _filteredItems: any[];

  _dropdownVisible = false;

  _required: boolean;
  constructor(@Optional() private _parentForm: NgForm,
              @Optional() private _parentFormGroup: FormGroupDirective, @Optional() @Self() public _ngControl: NgControl) {
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    }
  }

  _handleInputFocusChange(hasFocus: boolean) {
    if (hasFocus) {
      this._showDropdown();
    } else {
      // Wait until the dropdown can detect if it has focus.  If the dropdown is clicked on
      // we want the focus to remain on the textField
      setTimeout(() => {
        if (!this.dropdown.hasFocus()) {
          this._dropdownVisible = false;
          this._repopulateValue();
          this._onTouchedFn();
        } else {
          // this._focusInput();
          this.input.focused = true;
        }
      }, 0);
    }
  }

  _onSelectItem(item: any) {
    if (!item) {
      this.selectedItem = null;
      return;
    }

    this.selectedItem = item;
    this.input.value = this.nameField ? item[this.nameField] : item;
    this._filter(this.nameField ? item[this.nameField] : item);

    this._onChangeFn(this.value);


    setTimeout(() => {
      this._focusInput();
      this._repopulateValue();
      this._closeDropdown();
    }, 0);

  }

  _filter(query: string) {
    const options: FuseOptions = {
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

  _handleDropdownVisibility(visible: boolean) {
    if (!visible) {
      this.input.focused = false;
    }

  }

  _closeDropdown() {
    this._dropdownVisible = false;
    this._repopulateValue();
  }

  _showDropdown() {
    this._hideValue();
    this._dropdownVisible = true;
    this.input.focused = true;
  }

  _focusInput() {
    this.input.focused = true;
    this.input._elementRef.nativeElement.focus();
  }

  _onChangeFn = (v: any) => v;
  _onTouchedFn = () => {
  };

  /** Whether the input is in an error state. */
  _isInvalid(): boolean {
    const control = this._ngControl;
    const form = this._parentFormGroup || this._parentForm;
    if (control) {
      const isSubmitted = form && form.submitted;
      return !!(control.invalid && (control.touched || isSubmitted));
    }

    return false;
  }

  _repopulateValue(): void {
    if (this.selectedItem)
      this.input.value = this.nameField ? this.selectedItem[this.nameField] : this.selectedItem;
  }

  _hideValue(): void {
    if (this.selectedItem) {
      const inputEl: HTMLInputElement = this.input._elementRef.nativeElement;
      inputEl.placeholder = this.nameField ? this.selectedItem[this.nameField] : this.selectedItem;
      inputEl.value = '';
    }
  }

  writeValue(obj: T): void {
    this._onSelectItem(this.getItemForValue(obj));
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  private getItemForValue(value: T): T {
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
