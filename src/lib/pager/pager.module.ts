import {NgModule} from '@angular/core';
import {VxPagerComponent} from './pager.component';
import {CommonModule} from '@angular/common';
import {VxPageComponent} from './page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxPagerComponent, VxPageComponent],
  exports: [VxPagerComponent, VxPageComponent]
})
export class VxPagerModule {

}
