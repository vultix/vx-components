import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef,
  Inject,
  Injector, Input, NgZone,
  Optional,
  QueryList, Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {VxItemComponent, VxMenuComponent} from '../menu';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {
  AbstractVxAutocompleteComponent,
  AUTOCOMPLETE_FILTER_FUNCTION,
  AutocompleteFilterFunction,
  ErrorStateMatcher
} from 'vx-components-base';

@Component({
  selector: 'vx-autocomplete',
  templateUrl: 'vx-autocomplete.component.html',
  styleUrls: ['vx-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxAutocompleteComponent<T> extends AbstractVxAutocompleteComponent<T, VxItemComponent<T>> {
  @ContentChildren(VxItemComponent)
  _items!: QueryList<VxItemComponent<T>>;

  @ViewChild('focusEl') focusEl!: ElementRef<HTMLElement>;

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

  test(event: any) {
    console.log(event);
  }
}
