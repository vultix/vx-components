import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChildren, DoCheck,
  ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Optional, Output,
  QueryList, Self,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {VxItemComponent, VxMenuComponent} from '../menu';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty} from '../shared/util';
import {VxInputDirective} from '../input';
import {Subject} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';
import * as fuzzysort from 'fuzzysort';

@Component({
  selector: 'vx-autocomplete, vx-select',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxAutocompleteComponent<T = string> implements AfterViewInit, AfterContentInit, OnDestroy, DoCheck, ControlValueAccessor {
  @ViewChild(VxInputDirective) field: VxInputDirective;
  @ViewChild(VxMenuComponent) menu: VxMenuComponent<T>;
  @ViewChild('focusEl') focusEl: ElementRef<HTMLDivElement>;

  @ContentChildren(VxItemComponent) items: QueryList<VxItemComponent<T>>;

  /** The text to show when there are no items */
  @Input() defaultText = 'No results found.';

  /** The name to pass down to the input component */
  @Input() name: string;
  /** The tabIndex to forward down to the input component */
  @Input() tabIndex: number;

  _filteredItems: VxItemComponent<T>[] = [];
  _focused = false;
  invalid: boolean;

  _onChange = (_t: T | T[] | undefined) => {
  };
  _onTouched = () => {
  };

  @Input() placeholder: string;

  /** Whether or not to allow searching **/
  @Input()
  get search(): boolean {
    return this._search;
  }

  set search(value: boolean) {
    value = coerceBooleanProperty(value);
    this._search = value;
    this.cdr.markForCheck();
  }

  private _search = true;

  get _placeholder(): string {
    if (this.value && !this.multiple) {
      return this.getItemByValue(this.value as T)!.searchTxt
    } else {
      return this.search ? 'Search...' : 'Select...';
    }
  }

  @Output()
  valueChange = new EventEmitter<T | T[] | undefined>();

  private onDestroy$ = new Subject<void>();
  private iqKeyboard: any;
  private keyedItems: Map<T, VxItemComponent<T>> = new Map();

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (this.ngControl && this.ngControl.valueChanges) {
      this.ngControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
        this.checkIsInvalid();
      })
    }

  }

  get _selectedItems(): VxItemComponent<T>[] {
    if (this.multiple) {
      return (this.value as T[]).map(value => this.getItemByValue(value)!);
    } else {
      return [];
    }
  }

  private _required = false;

  get required(): boolean {
    return this._required;
  }

  @Input()
  set required(required: boolean) {
    required = coerceBooleanProperty(required);
    if (required !== this._required) {
      this._required = required;
      this.cdr.markForCheck();
    }
  }

  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set disabled(disabled: boolean) {
    disabled = coerceBooleanProperty(disabled);
    if (disabled !== this._disabled) {
      this._disabled = disabled;
      this.cdr.markForCheck();
    }
  }

  private _multiple = false;

  get multiple(): boolean {
    return this._multiple;
  }

  @Input()
  set multiple(multiple: boolean) {
    multiple = coerceBooleanProperty(multiple);
    if (multiple !== this._multiple) {
      this._multiple = multiple;

      this.value = multiple ? [] : undefined;
      this._filter();

      this.cdr.markForCheck();
    }
  }

  private _value?: T | T[];


  @Input()
  set value(value: T | T[] | undefined) {
    if (value !== this._value) {
      this._value = value;

      this._filter();
      this._repopulateValue();

      this.cdr.markForCheck();
    }
  }

  get value(): T | T[] | undefined {
    return this._value;
  }

  ngAfterViewInit(): void {
    this.field.stateChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.items.changes.pipe(startWith(null)).subscribe(() => {
      this.keyedItems.clear();
      this.items.forEach(item => {
        this.keyedItems.set(item.value, item);
      });

      this._filter();
    });
  }

  _filter(): void {
    if (!this.items) {
      return;
    }

    const filterText = this.field.value;
    if (!filterText || !filterText.length) {
      this._filteredItems = this.items.toArray();
    } else {
      const filtered = fuzzysort.go<VxItemComponent<T>>(filterText, this.items.toArray(), {
        key: 'searchTxt'
      });
      this._filteredItems = filtered.map(item => item.obj);
    }

    if (this.multiple) {
      this._filteredItems = this._filteredItems.filter(item => {
        // Don't show already selected items
        return (this.value as T[]).indexOf(item.value) === -1;
      })
    }

    this.cdr.markForCheck();
  }

  _showMenu(): void {
    if (!this.menu.visible) {
      this.menu.visible = true;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngDoCheck(): void {
    this.checkIsInvalid();
  }

  _selectItem(value: T): void {
    this.value = this.multiple ? [...(this.value as T[]), value] : value;

    this.valueChange.emit(this.value);
    this._onChange(this.value);
    this._onTouched();

    this.menu.visible = false;
    this.field.focus();
  }

  _removeItem(value: T, event?: Event): void {
    if (this.multiple) {
      this.value = (this.value as T[]).filter(item => item !== value);
    }

    if (event) {
      event.preventDefault();
      event.stopPropagation()
    }

    this._onTouched();
    this.valueChange.emit(this.value);
    this._onChange(this.value);

    this.menu.visible = false;
  }


  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: T): void {
    this.value = obj;
    this.valueChange.emit(this.value);
  }

  _dropdownVisible(visible: boolean): void {
    if (!visible) {
      this._repopulateValue();
    }
  }

  _handleTap(): void {
    if (!this.menu.visible) {
      this.field.value = '';

      this.menu.visible = true;
    }

    if (!this.search) {
      this.focusEl.nativeElement.focus();
    }
  }

  _handleBlur(): void {
    // Timeout to allow the document.activeElement to shift
    setTimeout(() => {
      if (this.menu.hasFocus()) {
        this._focused = true;
        this.cdr.markForCheck();
      } else {
        this.menu.visible = false;
      }
    });
  }

  _handleBackspace(): void {
    if (!this.multiple) {
      return;
    }
    const val = this.value as T[];
    if (!this.field.value && val.length) {
      this._removeItem(val[val.length - 1]);
    }
  }

  _closeDropdown(): void {
    this.menu.visible = false;
  }

  private getItemByValue(val: T): VxItemComponent<T> | undefined {
    if (!this.items || !val)
      return;

    return this.keyedItems.get(val);
  }

  /** Whether the input is in an error state. */
  private checkIsInvalid(): void {
    let invalid = false;
    const control = this.ngControl;
    const form = this._parentFormGroup || this._parentForm;
    if (control) {
      const isSubmitted = form && form.submitted;
      invalid = !!(control.invalid && (control.touched || isSubmitted));
    }

    if (invalid !== this.invalid) {
      this.invalid = invalid;
      this.cdr.markForCheck();
    }
  }

  private _repopulateValue(): void {
    this.field.value = this.value && !this.multiple ? this.getItemByValue(this.value as T)!.searchTxt : '';
  }

}
