import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxAttachMenuDirective } from './vx-attach-menu.directive';
import { VxItemComponent } from './vx-item.component';
import { VxMenuComponent } from './vx-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxAttachMenuDirective, VxMenuComponent, VxItemComponent],
  exports: [VxAttachMenuDirective, VxMenuComponent, VxItemComponent]
})
export class VxMenuModule {

}
