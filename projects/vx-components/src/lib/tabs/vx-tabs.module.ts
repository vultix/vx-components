import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxPagerModule } from '../pager';
import { VxTabComponent } from './vx-tab.component';
import { VxTabsComponent } from './vx-tabs.component';

@NgModule({
  imports: [CommonModule, VxPagerModule],
  declarations: [VxTabsComponent, VxTabComponent],
  exports: [VxTabsComponent, VxTabComponent]
})
export class VxTabsModule {

}
