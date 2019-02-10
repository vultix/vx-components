import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxButtonModule } from '../button/vx-button.module';
import { VxFormFieldModule } from '../form-field/vx-form-field.module';
import { VxItemComponent } from '../menu/vx-item.component';
import { VxMenuModule } from '../menu/vx-menu.module';
import { VxAutocompleteComponent } from './vx-autocomplete.component';

@NgModule({
  imports: [CommonModule, VxMenuModule, VxFormFieldModule, VxButtonModule],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent, VxItemComponent]
})
export class VxAutocompleteModule {

}
