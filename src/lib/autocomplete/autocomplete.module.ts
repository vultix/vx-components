import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VxAutocompleteComponent} from './autocomplete.component';
import {VxInputModule} from '../input/input.module';
import {VxDropdownModule} from '../dropdown/dropdown.module';
import {VxItemComponent} from '../dropdown/item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VxInputModule,
    VxDropdownModule
  ],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent, VxItemComponent]
})
export class VxAutocompleteModule {
}
