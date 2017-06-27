import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutocompleteComponent} from './autocomplete.component';
import {InputModule} from '../input/input.module';
import {DropdownModule} from '../dropdown/dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    DropdownModule
  ],
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule {
}
