import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsFormFieldModule } from '../form-field';
import { VxNsItemComponent, VxNsMenuModule } from '../menu';
import { VxNsAutocompleteComponent } from './vx-ns-autocomplete.component';

@NgModule({
  imports: [CommonModule, VxNsMenuModule, VxNsFormFieldModule],
  declarations: [VxNsAutocompleteComponent],
  exports: [VxNsAutocompleteComponent, VxNsItemComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsAutocompleteModule {

}
