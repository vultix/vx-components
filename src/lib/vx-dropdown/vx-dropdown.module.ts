import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxDropdownComponent} from './vx-dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxDropdownComponent],
  exports: [VxDropdownComponent]
})
export class VxDropdownModule {
}
