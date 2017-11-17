import {Component, OnInit} from '@angular/core';
import {DialogDemoDialogComponent} from './dialog-demo-dialog.component';
import {VxDialog} from '../lib/dialog';
import {TitleService} from '../title.service';

@Component({
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.scss']
})
export class DialogDemoComponent implements OnInit {
  constructor(private vxDialog: VxDialog, private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.title = 'Dialog';
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
