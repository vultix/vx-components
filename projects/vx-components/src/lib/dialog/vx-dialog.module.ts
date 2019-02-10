import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxDialog } from './vx-dialog';
import { VxDialogComponent } from './vx-dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxDialogComponent],
  entryComponents: [VxDialogComponent],
  providers: [VxDialog]
})
export class VxDialogModule {

}
