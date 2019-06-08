import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxPagerModule } from '../pager/vx-pager.module';
import { VxTabLabelDirective } from './vx-tab-label.directive';
import { VxTabComponent } from './vx-tab.component';
import { VxTabsComponent } from './vx-tabs.component';

@NgModule({
  imports: [CommonModule, VxPagerModule],
  declarations: [VxTabsComponent, VxTabComponent, VxTabLabelDirective],
  exports: [VxTabsComponent, VxTabComponent, VxTabLabelDirective]
})
export class VxTabsModule {

}
