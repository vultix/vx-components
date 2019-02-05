import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxPageComponent } from './vx-page.component';
import { VxPagerNextDirective } from './vx-pager-next.directive';
import { VxPagerPreviousDirective } from './vx-pager-previous.directive';
import { VxPagerComponent } from './vx-pager.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxPageComponent, VxPagerComponent, VxPagerPreviousDirective, VxPagerNextDirective],
  exports: [VxPageComponent, VxPagerComponent, VxPagerPreviousDirective, VxPagerNextDirective]
})
export class VxPagerModule {

}
