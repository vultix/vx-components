import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsAttachMenuDirective } from './vx-ns-attach-menu.directive';
import { VxNsItemComponent } from './vx-ns-item.component';
import { VxNsMenuComponent } from './vx-ns-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsMenuComponent, VxNsItemComponent, VxNsAttachMenuDirective],
  exports: [VxNsMenuComponent, VxNsItemComponent, VxNsAttachMenuDirective],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsMenuModule {

}
