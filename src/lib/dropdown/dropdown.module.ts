import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxDropdownComponent} from './dropdown.component';
import {VxItemComponent} from './item.component';
import {VxDropdownTriggerDirective} from './dropdown-trigger.directive';
import {VxAttachDropdownDirective} from './attach-dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxDropdownComponent, VxItemComponent, VxDropdownTriggerDirective, VxAttachDropdownDirective],
  exports: [VxDropdownComponent, VxItemComponent, VxDropdownTriggerDirective, VxAttachDropdownDirective]
})
export class VxDropdownModule {
}
