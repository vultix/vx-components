import {NgModule} from '@angular/core';
import {VxPagerComponent} from './pager.component';
import {CommonModule} from '@angular/common';
import {VxPageComponent} from './page.component';
import {VxPagerNextDirective, VxPagerPreviousDirective} from './pager.directives';

@NgModule({
  imports: [CommonModule],
  declarations: [VxPagerComponent, VxPageComponent, VxPagerNextDirective, VxPagerPreviousDirective],
  exports: [VxPagerComponent, VxPageComponent, VxPagerNextDirective, VxPagerPreviousDirective]
})
export class VxPagerModule {

}
