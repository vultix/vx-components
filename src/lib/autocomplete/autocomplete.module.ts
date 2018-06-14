import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VxAutocompleteComponent} from './autocomplete.component';
import {VxInputModule} from '../input';
import {VxMenuModule, VxItemComponent} from '../menu';
import {VxButtonModule} from '../button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VxInputModule,
    VxMenuModule,
    VxButtonModule
  ],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent, VxItemComponent]
})
export class VxAutocompleteModule {
}
