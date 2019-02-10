import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsButtonModule } from '../button/vx-ns-button.module';
import { VxNsFormFieldModule } from '../form-field/vx-ns-form-field.module';
import { VxNsItemComponent } from '../menu/vx-ns-item.component';
import { VxNsMenuModule } from '../menu/vx-ns-menu.module';
import { VxNsAutocompleteComponent } from './vx-ns-autocomplete.component';

@NgModule({
  imports: [CommonModule, VxNsMenuModule, VxNsFormFieldModule, VxNsButtonModule],
  declarations: [VxNsAutocompleteComponent],
  exports: [VxNsAutocompleteComponent, VxNsItemComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsAutocompleteModule {

}
