import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsDialog } from './vx-ns-dialog';
import { VxNsDialogComponent } from './vx-ns-dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsDialogComponent],
  entryComponents: [VxNsDialogComponent],
  providers: [VxNsDialog],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsDialogModule {

}
