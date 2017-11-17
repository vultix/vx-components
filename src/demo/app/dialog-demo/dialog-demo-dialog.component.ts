import {Component} from '@angular/core';
import {VxDialogComponent} from '../lib/dialog/dialog.component';

@Component({
  template: `
    <h2 vx-dialog-title>Dialog Title</h2>
    <div vx-dialog-content>
      <div>Here is the nice scrollable body!</div>
      <vx-input-wrapper>
        <input vxInput placeholder="test">
      </vx-input-wrapper>
    </div>
    <div vx-dialog-actions>
      <button vx-button (click)="dialog.close()">Also Close!</button>
      <button vx-button (click)="dialog.close()">Close</button>
    </div>
  `
})
export class DialogDemoDialogComponent {
  dialog: VxDialogComponent;

  onDialogOpen(dialog: VxDialogComponent): void {
    this.dialog = dialog;
  }
}
