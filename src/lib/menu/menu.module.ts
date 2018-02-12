import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxDropdownComponent, VxMenuComponent} from './menu.component';
import {VxItemComponent} from './item.component';
import {VxDropdownTriggerDirective, VxMenuTriggerDirective} from './menu-trigger.directive';
import {VxAttachDropdownDirective, VxAttachMenuDirective} from './attach-menu.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxMenuComponent, VxItemComponent, VxMenuTriggerDirective, VxAttachMenuDirective,
    VxDropdownComponent, VxAttachDropdownDirective, VxDropdownTriggerDirective],
  exports: [VxMenuComponent, VxItemComponent, VxMenuTriggerDirective, VxAttachMenuDirective,
    VxDropdownComponent, VxAttachDropdownDirective, VxDropdownTriggerDirective]
})
export class VxMenuModule {
}


/**
 * @deprecated VxDropdownModule is now deprecated and will soon be removed.  Use VxMenuModule instead.
 */
@NgModule({
  imports: [
    VxMenuModule
  ],
  exports: [VxMenuModule]
})
export class VxDropdownModule {
  constructor() {
    console.warn('You are using VxDropdownModule which has been deprecated in favor of VxMenuModule.' +
      ' VxDropdownModule will be removed from future versions of vx-components.')
  }
}
