import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxDropdownComponent} from './dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxDropdownComponent],
  exports: [VxDropdownComponent]
})
export class VxDropdownModule {
}
