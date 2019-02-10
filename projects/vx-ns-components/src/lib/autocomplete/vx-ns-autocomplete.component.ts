import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChildren,
  Inject,
  Optional,
  QueryList,
  Self
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
  AbstractVxAutocompleteComponent,
  AUTOCOMPLETE_FILTER_FUNCTION,
  AutocompleteFilterFunction,
  ErrorStateMatcher
} from 'vx-components-base';
import { VxNsItemComponent } from '../menu/vx-ns-item.component';

@Component({
  selector: 'StackLayout[vx-ns-autocomplete]',
  templateUrl: 'vx-ns-autocomplete.component.html',
  styleUrls: ['vx-ns-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxNsAutocompleteComponent<T> extends AbstractVxAutocompleteComponent<T, VxNsItemComponent<T>> {
  @ContentChildren(VxNsItemComponent)
  _items!: QueryList<VxNsItemComponent<T>>;

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
    this._field.focus();
    this._showMenu();
  }
}
