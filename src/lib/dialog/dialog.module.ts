import {NgModule} from '@angular/core';
import {VxDialogComponent} from './dialog.component';
import {VxDialog} from './dialog.service';
import {CommonModule} from '@angular/common';
import {VxDialogActionsDirective, VxDialogContentDirective, VxDialogTitleDirective} from './dialog.directives';
import {VxButtonModule} from '../button';

const directives = [VxDialogActionsDirective, VxDialogContentDirective, VxDialogTitleDirective];
@NgModule({
  imports: [CommonModule, VxButtonModule],
  declarations: [VxDialogComponent, ...directives],
  exports: directives,
  entryComponents: [VxDialogComponent],
  providers: [VxDialog]
})
export class VxDialogModule {

}
