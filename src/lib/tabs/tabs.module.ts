import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxTabsComponent, VxTabComponent} from './tabs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxTabsComponent, VxTabComponent],
  exports: [VxTabsComponent, VxTabComponent]
})
export class VxTabsModule {
}
