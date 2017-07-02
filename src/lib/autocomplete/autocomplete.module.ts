import {forwardRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {VxAutocompleteComponent} from './autocomplete.component';
import {VxInputModule} from '../input/input.module';
import {VxDropdownModule} from '../dropdown/dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VxInputModule,
    VxDropdownModule
  ],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent],

})
export class VxAutocompleteModule {
}
