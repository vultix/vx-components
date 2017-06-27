import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VxAutocompleteComponent} from './vx-autocomplete.component';
import {VxInputModule} from '../vx-input/vx-input.module';
import {VxDropdownModule} from '../vx-dropdown/vx-dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VxInputModule,
    VxDropdownModule
  ],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent]
})
export class VxAutocompleteModule {
}
