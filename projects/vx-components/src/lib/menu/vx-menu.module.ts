import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxAttachMenuDirective} from './vx-attach-menu.directive';
import {VxMenuComponent} from './vx-menu.component';
import {VxItemComponent} from './vx-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxAttachMenuDirective, VxMenuComponent, VxItemComponent],
  exports: [VxAttachMenuDirective, VxMenuComponent, VxItemComponent]
})
export class VxMenuModule {

}
