import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, Optional, QueryList, Self,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {VxDropdownComponent} from '../dropdown/dropdown.component';
import {VxInputDirective} from '../input/vx-input.directive';
import {coerceBooleanProperty} from '../Util';
import {VxItemComponent} from '../dropdown/item.component';

@Component({
  selector: 'vx-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
    '[class.invalid]': '_isInvalid()'
  }
})
export class VxAutocompleteComponent implements ControlValueAccessor, AfterContentInit {
  _multiple: boolean;

  get value(): any {
    if (this.selectedItem)
      return this.selectedItem.value;
    return null;
  }

  /** The selected item */
  selectedItem: VxItemComponent;

  /** If multiple, the selected items */
  selectedItems: VxItemComponent[];
  /** The placeholder to pass down to the input component */
  @Input() placeholder: string;
  /** The name to pass down to the input component */
  @Input() name: string;
  /** The tabIndex to forward down to the input component */
  @Input() tabIndex: number;
  /** Whether or not the component is disabled  */
  @Input() disabled: boolean;

  @ContentChildren(VxItemComponent) items: QueryList<VxItemComponent>;

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

  _dropdownVisible = false;
  _itemsFiltered = new EventEmitter();
  _required: boolean;
  constructor(@Optional() private _parentForm: NgForm,
              @Optional() private _parentFormGroup: FormGroupDirective, @Optional() @Self() public _ngControl: NgControl) {
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit() {
    this.items.changes.subscribe(() => {
      this.updateSelectedItem();
    });

    this.updateSelectedItem();
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

  _onSelectItem(value: any) {
    if (!value) {
      this.selectedItem = null;
      return;
    }

    const item = this.getItemForValue(value);
    this.selectedItem = item;
    this.input.value = item.searchTxt;
    this.items.forEach(item => item.visible = true);

    this._onChangeFn(this.value);


    setTimeout(() => {
      this._focusInput();
      this._repopulateValue();
      this._closeDropdown();
    }, 0);

  }

  _filter(query: string) {
    query = query.toUpperCase();
    this.items.forEach(item => {
      item.visible = !!(item.searchTxt && item.searchTxt.toUpperCase().indexOf(query) !== -1);
    });
    this._itemsFiltered.next();
  }

  _onInputChange(value: any) {
    this._dropdownVisible = true;

    if (value) {
      this._filter(value);
    } else {
      this.items.forEach(item => item.visible = true);
      this._itemsFiltered.next();
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
      this.input.value = this.selectedItem.searchTxt
  }

  _hideValue(): void {
    if (this.selectedItem) {
      const inputEl: HTMLInputElement = this.input._elementRef.nativeElement;
      inputEl.placeholder = this.selectedItem.searchTxt;
      inputEl.value = '';
    }
  }

  writeValue(obj: any): void {
    this._onSelectItem(this.getItemForValue(obj));
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  private getItemForValue(value: any): VxItemComponent {
    if (!this.items)
      return null;

    for (const item of this.items.toArray()) {
      if (item.value === value) {
        return item;
      }
    }
  }

  private updateSelectedItem() {
    if (this.value && !this.multiple) {
      if (!this.getItemForValue(this.value)) {
        // If the selected value isn't in the new items, remove it
        this.selectedItem = null;
        this.input.value = '';

        this._onChangeFn(null);
      }

      this.items.forEach(item => item.visible = true);
      this._itemsFiltered.next();
    }
  }

}
