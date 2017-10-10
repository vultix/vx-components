import {Component} from '@angular/core';
import {VxDialogComponent} from '../../../lib/dialog/dialog.component';
import {VxDialog} from '../../../lib/dialog';
import {DialogDemoDialogComponent} from './dialog-demo-dialog.component';

@Component({
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.scss']
})
export class DialogDemoComponent {
  constructor(private vxDialog: VxDialog) {

  }

  showDialog(): void {
    this.vxDialog.open(DialogDemoDialogComponent);
  }
  showDialog2(): void {
    this.vxDialog.open({
      title: 'Dialog Title',
      body: 'Here is the nice scrollable body.',
      buttons: [{
        text: 'Close'
      }, {
        text: 'Close 2'
      }],
      defaultButtonIdx: 1
    });
  }
}
