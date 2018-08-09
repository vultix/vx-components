import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxTabsComponent, VxTabComponent} from './tabs.component';
import {VxPagerModule} from '../pager';

@NgModule({
  imports: [
    CommonModule,
    VxPagerModule
  ],
  declarations: [VxTabsComponent, VxTabComponent],
  exports: [VxTabsComponent, VxTabComponent]
})
export class VxTabsModule {
}
