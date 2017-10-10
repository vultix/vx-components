import {NgModule} from '@angular/core';
import {VxDialogComponent} from './dialog.component';
import {VxDialog} from './dialog.service';
import {CommonModule} from '@angular/common';
import {VxDialogActionsDirective, VxDialogContentDirective, VxDialogTitleDirective} from './dialog.directives';

const directives = [VxDialogActionsDirective, VxDialogContentDirective, VxDialogTitleDirective];
@NgModule({
  imports: [CommonModule],
  declarations: [VxDialogComponent, ...directives],
  exports: directives,
  entryComponents: [VxDialogComponent],
  providers: [VxDialog]
})
export class VxDialogModule {

}
