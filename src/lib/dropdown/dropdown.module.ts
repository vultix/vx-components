import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxDropdownComponent} from './dropdown.component';
import {VxItemComponent} from './item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxDropdownComponent, VxItemComponent],
  exports: [VxDropdownComponent, VxItemComponent]
})
export class VxDropdownModule {
}
