import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent, TabComponent} from './tabs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsComponent, TabComponent],
  exports: [TabsComponent, TabComponent]
})
export class TabsModule {
}
