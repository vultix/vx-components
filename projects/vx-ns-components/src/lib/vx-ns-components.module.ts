import { NgModule } from '@angular/core';
import { VxNsAutocompleteModule } from './autocomplete';
import { VxNsButtonModule } from './button';
import { VxNsFormFieldModule } from './form-field';
import { VxNsMenuModule } from './menu/vx-ns-menu.module';
import { VxNsPagerModule } from './pager';
import { VxNsRadioModule } from './radio';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule, VxNsButtonModule, VxNsPagerModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule, VxNsButtonModule, VxNsPagerModule]
})
export class VxNsComponentsModule {

}
