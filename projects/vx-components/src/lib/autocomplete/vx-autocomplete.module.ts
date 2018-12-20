import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxButtonModule } from '../button';
import { VxFormFieldModule } from '../form-field';
import { VxItemComponent, VxMenuModule } from '../menu';
import { VxAutocompleteComponent } from './vx-autocomplete.component';

@NgModule({
  imports: [CommonModule, VxMenuModule, VxFormFieldModule, VxButtonModule],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent, VxItemComponent]
})
export class VxAutocompleteModule {

}
