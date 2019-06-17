import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  DoCheck, EventEmitter,
  Input, Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs/operators';
import { AbstractVxFormFieldDirective } from '../form-field';
import { AbstractVxItemComponent, AbstractVxMenuComponent, AttachedPositionStrategy } from '../menu';
import { coerceBooleanProperty, ErrorStateMatcher, VxFormComponent } from '../shared';
import { AutocompleteFilterFunction, defaultAutocompleteFilterFunction } from './autocomplete-filter-function';

export abstract class AbstractVxAutocompleteComponent<T, I extends AbstractVxItemComponent<T>>
  extends VxFormComponent<T | T[]> implements AfterViewInit, DoCheck, AfterContentInit {
  abstract _items: QueryList<I>;

  @Output() search = new EventEmitter<string>();
  @Output() itemSelect = new EventEmitter<T>();

  @ViewChild('field')
  _field!: AbstractVxFormFieldDirective<any>;

  @ViewChild('menu')
  _menu!: AbstractVxMenuComponent<T, any>;

  _filteredItems: I[] = [];

  _positionStrategy: AttachedPositionStrategy = [{
    menuX: 'left',
    menuY: 'top',
    attachedX: 'left',
    attachedY: 'bottom',
    offsetX: 0,
    offsetY: -2.5,
    className: 'vx-autocomplete-menu-bottom'
  }, {
    menuX: 'left',
    menuY: 'bottom',
    attachedX: 'left',
    attachedY: 'top',
    offsetX: 0,
    offsetY: -2.5,
    className: 'vx-menu-attached-top'
  }];
  protected _defaultText = 'No results found.';
  protected _multiple = false;
  protected _filterFunction: AutocompleteFilterFunction<T> = defaultAutocompleteFilterFunction;
  protected _placeholder!: string;
  protected _label = '';
  protected _searchable = true;
  protected searchText = '';
  protected _value!: T | T[];
  protected keyedItems: Map<T, I> = new Map();
  /**
   * There are a number of things that can cause the need to filter,
   * so this flag tells us we need to filter this round.
   */
  protected needsFilter = false;
  /**
   * If set to true means we should verify the value is an array and that all of the items exist,
   * or if not multiple verify we have an item for the value.
   */
  protected shouldVerifyValue = false;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    ngControl?: NgControl,
    parentForm?: NgForm,
    parentFormGroup?: FormGroupDirective,
    filterFunction?: AutocompleteFilterFunction<T>
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);

    if (ngControl) {
      ngControl.valueAccessor = this;
    }

    if (filterFunction) {
      this.filterFunction = filterFunction;
    }

  }

  /** The text to show when there are no items */
  @Input()
  get defaultText(): string {
    return this._defaultText;
  }

  set defaultText(value: string) {
    if (value !== this._defaultText) {
      this._defaultText = value;
      this.cdr.markForCheck();
    }
  }

  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this._multiple) {
      this._multiple = value;

      this.shouldVerifyValue = true;
      this.filter();
    }
  }

  @Input()
  get filterFunction(): AutocompleteFilterFunction<T> {
    return this._filterFunction;
  }

  set filterFunction(value: AutocompleteFilterFunction<T>) {
    if (value && value !== this.filterFunction) {
      this._filterFunction = value;
      this.filter();
    }
  }

  @Input()
  get placeholder(): string {
    if (this._placeholder) {
      return this._placeholder;
    } else {
      const item = this.multiple ? null : this.getItemByValue(this.value as T);
      if (item) {
        return item.getTextContent();
      } else {
        return this.searchable ? 'Search...' : 'Select...';
      }
    }
  }

  set placeholder(value: string) {
    if (value !== this._placeholder) {
      this._placeholder = value;
      this.cdr.markForCheck();
    }
  }

  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    if (value !== this.label) {
      this._label = value;
      this.cdr.markForCheck();
    }
  }

  @Input()
  get searchable(): boolean {
    return this._searchable;
  }

  set searchable(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this._searchable) {
      this._searchable = value;

      this.cdr.markForCheck();
    }
  }

  get _selectedItems(): (AbstractVxItemComponent<T> | undefined)[] {
    if (this.multiple) {
      let val = this.value;
      if (!val || !(val instanceof Array)) {
        val = [];
      }
      return val.map(value => this.getItemByValue(value));
    } else {
      return [];
    }
  }

  ngAfterContentInit(): void {
    this._items.changes.pipe(startWith(null), takeUntil(this.onDestroy$)).subscribe(() => {
      this.keyedItems.clear();
      this._items.forEach(item => {
        this.keyedItems.set(item.value, item);
      });

      // Verify all
      this.shouldVerifyValue = true;
      this.filter();
    });
  }

  ngAfterViewInit(): void {
    this._field.valueChange.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      this.handleFieldSearchChange(value);
    });

    this._field.focusedChange.pipe(takeUntil(this.onDestroy$)).subscribe(focused => {
      this._handleFieldFocusChange(focused);
    });

    this._menu.itemSelect.pipe(takeUntil(this.onDestroy$)).subscribe(val => {
      this.handleItemSelect(val);
    });

    this._menu.visibleChange.pipe(takeUntil(this.onDestroy$)).subscribe(val => {
      this.handleMenuVisibilityChange(val);
    });
  }

  ngDoCheck(): void {
    // Before running change detection, if we need to filter we should filter.
    if (this.needsFilter) {
      this.filter(true);
    }

    super.ngDoCheck();
  }

  _showMenu(): void {
    this.onTouchFn();
    if (!this._menu.visible) {
      this._menu.visible = true;
    }
  }

  _hideMenu(): void {
    if (this._menu.visible) {
      this._menu.visible = false;
    }
  }

  _removeItem(value: T): void {
    if (this.multiple) {
      const existing = this.value as T[];
      const idx = existing.indexOf(value);
      if (idx !== -1) {
        existing.splice(idx, 1);
      }

      this.setValueFromNative(existing);
    }
  }

  _handleFieldFocusChange(focused: boolean): void {
    if (focused && !this._menu.visible) {
      this._showMenu();
      this._field.value = '';
    } else if (!focused && !this._menu._active && this._menu.visible) {
      this._hideMenu();
    } else if (!focused && this._menu._active) {
      this._field.focus();
    }
  }

  abstract focus(): void;

  protected filter(runImmediately = false): void {
    if (!runImmediately) {
      this.needsFilter = true;
      this.cdr.markForCheck();
      return;
    }

    // In the case that something triggers a filter before we have items
    if (!this._items) {
      return;
    }

    if (this.shouldVerifyValue && this.multiple) {
      if (!this.value || !(this.value instanceof Array)) {
        this.setValueFromNative([]);
      } else {
        // Ensure the selected value is still in the list of items
        const newVals: T[] = [];
        let changed = false;
        this.value.forEach(value => {
          if (!this.getItemByValue(value)) {
            changed = true;
          } else {
            newVals.push(value);
          }
        });

        if (changed) {
          this.setValueFromNative(newVals);
        }
      }
    } else if (this.shouldVerifyValue && !this.multiple && this.value) {
      const item = this.getItemByValue(this.value as T);

      if (!item) {
        this.setValueFromNative(undefined as any as T);
      }
    }

    this.shouldVerifyValue = false;

    this.needsFilter = false;
    this._filteredItems = this.filterFunction(this._items.toArray(), this.searchText, this.multiple ? this.value as T[] : undefined) as I[];
  }

  protected getNativeValue(): T[] | T {
    return this._value;
  }

  protected setNativeValue(val: T[] | T): void {
    this._value = val;
  }

  protected handleItemSelect(val: T) {
    this.itemSelect.emit(val);

    if (this.multiple) {
      const existing = this.value;
      (existing as T[]).push(val);
      this.setValueFromNative(this.value);
    } else {
      this.setValueFromNative(val);
    }

    this.handleFieldSearchChange('', false);
  }

  protected getItemByValue(val: T): I | undefined {
    if (!this._items || !val) {
      return;
    }

    return this.keyedItems.get(val);
  }

  protected handleFieldSearchChange(search: string, showMenu = true) {
    this.searchText = search;
    this.search.emit(search);

    this.filter();
    if (showMenu) {
      this._showMenu();
    }
  }

  protected handleMenuVisibilityChange(visible: boolean): void {
    if (!visible) {
      this._repopulateValue();
    }
  }

  protected _repopulateValue(): void {
    const item = this.getItemByValue(this.value as T);
    this._field.value = item ? item.getTextContent() : '';
  }

  // Every time our value is set we need to re filter our items
  protected handleValueSet(value: T): void {
    if (value !== this.value || this.multiple) {
      this._lastNativeValue = value;
      this.setNativeValue(value);

      // If the ngControl isn't aware of this value make it aware
      if (this.lastRegisteredValue !== value) {
        this.onChangeFn(value);
      }

      this.shouldVerifyValue = true;
      this._repopulateValue();

      // Need to refilter the list if multiple is set
      if (this.multiple) {
        this.filter();
      }

      this.cdr.markForCheck();
    }
  }
}
