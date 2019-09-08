import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef, forwardRef,
  Inject,
  Input,
  Optional,
  QueryList,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import {
  AbstractVxAutocompleteComponent,
  AUTOCOMPLETE_FILTER_FUNCTION,
  AutocompleteFilterFunction,
  ErrorStateMatcher
} from 'vx-components-base';
import { VxItemComponent } from '../menu/vx-item.component';

@Component({
  selector: 'vx-autocomplete',
  templateUrl: 'vx-autocomplete.component.html',
  styleUrls: ['vx-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // VX_AUTOCOMPLETE_INPUTS
  inputs: ['id', 'value', 'disabled', 'required', 'multiple', 'filterFunction', 'placeholder',
    'label', 'searchable', 'defaultText'],
  // VX_AUTOCOMPLETE_OUTPUTS
  outputs: ['focusedChange', 'valueChange', 'search', 'itemSelect'],
  host: {
    'class': 'vx-autocomplete'
  }
})

export class VxAutocompleteComponent<T> extends AbstractVxAutocompleteComponent<T, VxItemComponent<T>> {
  @ContentChildren(VxItemComponent)
  _items!: QueryList<VxItemComponent<T>>;

  @ViewChild('focusEl', {static: false}) focusEl!: ElementRef<HTMLElement>;

  @Input() tabIndex = 0;

  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl?: NgControl,
    @Optional() parentForm?: NgForm,
    @Optional() parentFormGroup?: FormGroupDirective,
    @Optional() @Inject(AUTOCOMPLETE_FILTER_FUNCTION) filterFunction?: AutocompleteFilterFunction<T>
  ) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup, filterFunction);
  }

  focus(): void {
    if (this.searchable) {
      this._field.focus();
    } else {
      this.focusEl.nativeElement.focus();
    }
  }

  _handleBackspace(event: KeyboardEvent): void {
    const val = this.value;
    if (!this.multiple || !(val instanceof Array)) {
      return;
    }
    if (!this._field.value && val.length) {
      this._removeItem(val[val.length - 1]);
      event.stopPropagation();
    }
  }
}
