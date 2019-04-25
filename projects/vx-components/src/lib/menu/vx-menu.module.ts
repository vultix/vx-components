import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxAttachMenuDirective } from './vx-attach-menu.directive';
import { VxItemComponent } from './vx-item.component';
import { VxMenuTriggerDirective } from './vx-menu-trigger.directive';
import { VxMenuComponent } from './vx-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxAttachMenuDirective, VxMenuComponent, VxItemComponent, VxMenuTriggerDirective],
  exports: [VxAttachMenuDirective, VxMenuComponent, VxItemComponent, VxMenuTriggerDirective]
})
export class VxMenuModule {

}
